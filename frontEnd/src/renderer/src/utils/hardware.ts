export default function callSound(dir: 'left' | 'right'): {
    success: boolean;
    message: string;
    result: {
        direction?: 'left' | 'right';
    },
    error?: Error;
} {
    if (dir === 'left') {
        // 调用左声道
    } else if (dir === 'right') {
        // 调用右声道
    }

    return {
        success: true,
        message: `Sound played successfully in ${dir} channel`,
        result: { direction: dir }
    }
}