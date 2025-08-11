export function generateRandomBits(count: number = 3) {
    if (count < 2) {
        throw new Error("Count must be at least 2 to ensure variety");
    }

    const result = [];
    let allZeros = true;
    let allOnes = true;

    // 首先生成随机数组
    for (let i = 0; i < count; i++) {
        const bit = Math.round(Math.random());
        result.push(bit);

        if (bit === 1) allZeros = false;
        if (bit === 0) allOnes = false;
    }

    // 保底检查：如果全0或全1，随机修改一个元素
    if (allZeros) {
        const indexToChange = Math.floor(Math.random() * count);
        result[indexToChange] = 1;
    } else if (allOnes) {
        const indexToChange = Math.floor(Math.random() * count);
        result[indexToChange] = 0;
    }

    return result;
}
