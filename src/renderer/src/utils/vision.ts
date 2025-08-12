import type { FaceFeature } from "@/types/project";

/**
 * 评估手指功能是否有缺陷
 * @param {Array} data - 手势检测数据数组，包含type和value
 * @returns {Object} - 返回评估结果对象
 */
export function evaluateFingerFunction(data: { type: number, value: number }[]) {
    // 参数校验
    if (!Array.isArray(data) || data.length === 0) {
        return {
            hasDefect: true,
            confidence: 0,
            reasons: ['无有效检测数据'],
            details: null
        };
    }

    // 分离张开和握拳的数据
    const openHandData = data.filter(item => item.type === 1);
    const fistData = data.filter(item => item.type === 0);

    // 计算平均得分
    const avgOpenScore = openHandData.length > 0 ?
        openHandData.reduce((sum, item) => sum + item.value, 0) / openHandData.length : 0;
    const avgFistScore = fistData.length > 0 ?
        fistData.reduce((sum, item) => sum + item.value, 0) / fistData.length : 0;

    // 计算状态切换次数
    let stateChanges = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i].type !== data[i - 1].type) {
            stateChanges++;
        }
    }

    // 评估标准
    const OPEN_HAND_THRESHOLD = 70; // 张开手掌得分阈值
    const FIST_THRESHOLD = 70;      // 握拳得分阈值
    const MIN_STATE_CHANGES = 3;    // 最小状态切换次数

    // 缺陷判断
    const defects = [];

    if (openHandData.length === 0) {
        defects.push('未检测到张开手掌动作');
    }

    if (fistData.length === 0) {
        defects.push('未检测到握拳动作');
    }

    if (avgOpenScore < OPEN_HAND_THRESHOLD) {
        defects.push(`张开手掌平均得分(${avgOpenScore.toFixed(2)})低于阈值(${OPEN_HAND_THRESHOLD})`);
    }

    if (avgFistScore < FIST_THRESHOLD) {
        defects.push(`握拳平均得分(${avgFistScore.toFixed(2)})低于阈值(${FIST_THRESHOLD})`);
    }

    if (stateChanges < MIN_STATE_CHANGES) {
        defects.push(`状态切换次数(${stateChanges})不足(${MIN_STATE_CHANGES})`);
    }

    // 综合评估
    const hasDefect = defects.length > 0;
    const confidence = hasDefect ?
        Math.min(avgOpenScore, avgFistScore, (stateChanges / MIN_STATE_CHANGES) * 100) :
        Math.max(avgOpenScore, avgFistScore);

    return {
        hasDefect,
        confidence: Math.min(100, Math.max(0, confidence)), // 确保在0-100范围内
        reasons: hasDefect ? defects : ['手指功能正常'],
        details: {
            openHandDataCount: openHandData.length,
            fistDataCount: fistData.length,
            avgOpenScore,
            avgFistScore,
            stateChanges
        }
    };
}

type HeadPose = 'front' | 'left' | 'right';

/**
 * 检测头部姿态
 * @param features 脸部特征数据数组（持续视频流中的多帧数据）
 * @param minScore 最低识别得分阈值，低于此值的数据将被忽略
 * @param minFrames 需要连续检测到的最小帧数（避免瞬时抖动误判）
 * @param threshold 鼻尖移动的阈值比例（相对于两眼中心距离的比例）
 * @returns 检测到的头部姿态
 */
export function detectHeadPose(
    features: FaceFeature[],
    minScore: number = 0.8,
    minFrames: number = 3,
    threshold: number = 0.2
): HeadPose {
    // 过滤掉低质量的数据
    const validFeatures = features.filter(f => f.score >= minScore);

    if (validFeatures.length < minFrames) {
        return 'front';
    }

    // 计算基准位置（取前几帧的平均值作为初始位置）
    const baseFrames = Math.min(5, validFeatures.length);
    let baseLeftEye = { x: 0, y: 0 };
    let baseRightEye = { x: 0, y: 0 };
    let baseNose = { x: 0, y: 0 };

    for (let i = 0; i < baseFrames; i++) {
        const f = validFeatures[i];
        baseLeftEye.x += f.keypoints[0].x;
        baseLeftEye.y += f.keypoints[0].y;
        baseRightEye.x += f.keypoints[1].x;
        baseRightEye.y += f.keypoints[1].y;
        baseNose.x += f.keypoints[2].x;
        baseNose.y += f.keypoints[2].y;
    }

    baseLeftEye.x /= baseFrames;
    baseLeftEye.y /= baseFrames;
    baseRightEye.x /= baseFrames;
    baseRightEye.y /= baseFrames;
    baseNose.x /= baseFrames;
    baseNose.y /= baseFrames;

    // 计算两眼之间的基准距离
    const eyeDistance = Math.sqrt(
        Math.pow(baseRightEye.x - baseLeftEye.x, 2) +
        Math.pow(baseRightEye.y - baseLeftEye.y, 2)
    );

    // 跟踪检测到的姿态
    let leftFrames = 0;
    let rightFrames = 0;
    let frontFrames = 0;

    for (let i = baseFrames; i < validFeatures.length; i++) {
        const current = validFeatures[i];
        const currentNose = current.keypoints[2];
        const currentLeftEye = current.keypoints[0];
        const currentRightEye = current.keypoints[1];

        // 计算鼻尖相对于基准位置的偏移
        const noseOffset = currentNose.x - baseNose.x;
        const absNoseOffset = Math.abs(noseOffset);
        const normalizedOffset = absNoseOffset / eyeDistance;

        // 计算眼睛位置变化
        const rightEyeOffset = currentRightEye.x - baseRightEye.x;
        const leftEyeOffset = currentLeftEye.x - baseLeftEye.x;

        if (normalizedOffset > threshold) {
            if (noseOffset > 0) {
                // 鼻尖向右移动 - 可能左转头
                if (rightEyeOffset > 0 && leftEyeOffset < rightEyeOffset) {
                    leftFrames++;
                    rightFrames = 0;
                }
            } else {
                // 鼻尖向左移动 - 可能右转头
                if (leftEyeOffset < 0 && rightEyeOffset > leftEyeOffset) {
                    rightFrames++;
                    leftFrames = 0;
                }
            }
            frontFrames = 0;
        } else {
            // 视为正视状态
            frontFrames++;
            leftFrames = 0;
            rightFrames = 0;
        }

        // 如果连续检测到足够帧数，则返回对应姿态
        if (leftFrames >= minFrames) {
            return 'right';
        }
        if (rightFrames >= minFrames) {
            return 'left';
        }
        if (frontFrames >= minFrames) {
            return 'front';
        }
    }

    // 默认返回正视状态
    return 'front';
}

export function checkEyeBlock(score: number) {
    if (score <= 0.92) {
        return true
    }
    return false

}

const dirs = ['top', 'bottom', 'left', 'right']
export function testVisual(visualData: {
    level: number,
    dir: string,
    result: boolean,
}[]): {
    state: boolean,
    lever: number,
    data: {
        level: number,
        dir: string,
        result: boolean,
    }[]
} {
    // 有测试记录
    if (visualData.length > 0) {
        const lastData = visualData[visualData.length - 1];
        // 上一次测试正确
        if (lastData.result) {
            visualData.push({
                level: lastData.level + 1,
                dir: dirs[Math.floor(Math.random() * 4)],
                result: false
            })
            return {
                state: true,
                data: visualData,
                lever: lastData.level
            }
        } else {
            // 是否有俩次
            if (visualData.length > 1) {
                const lastLastData = visualData[visualData.length - 2];
                // 如果上上一次是正确的则已到最大视力
                if (lastLastData.result) {
                    return {
                        state: false,
                        lever: lastLastData.level,
                        data: []
                    }
                }
            }
            // 否则降低等级
            visualData.push({
                level: lastData.level - 1,
                dir: dirs[Math.floor(Math.random() * 4)],
                result: false
            })
            return {
                state: true,
                data: visualData,
                lever: lastData.level
            }

        }
    } else {
        // 没有测试记录
        visualData.push({
            level: 6,
            dir: dirs[Math.floor(Math.random() * 4)],
            result: false
        })
        return {
            state: true,
            data: visualData,
            lever: 6
        }
    }
}