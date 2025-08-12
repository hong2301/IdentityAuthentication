/**
 * 评估手指功能是否有缺陷
 * @param {Array} data - 手势检测数据数组，包含type和value
 * @returns {Object} - 返回评估结果对象
 */
export default function evaluateFingerFunction(data: { type: number, value: number }[]) {
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