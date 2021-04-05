module.exports = function parallelDo(totalArr, func, parallel) {
    let doneParallel = 0;
    let doneIndex = 0;
    const totalLen = totalArr.length;
    const showLen = Math.floor(totalLen / 10);
    return new Promise((resolve, reject) => {
        for (let i = 0; i < parallel; i++) {
            (async (totalArr, parallel, i) => {
                for (let index = i; index < totalArr.length; index += parallel) {
                    await func(totalArr[index], index);
                    doneIndex++;
                    doneIndex % showLen || console.log(`parallel done: ${doneIndex}/${totalLen}`);
                }
                ++doneParallel;
                //console.log(`parallel exit ${doneParallel}/${parallel}`);
                if (doneParallel === parallel) {
                    resolve();
                }
            })(totalArr, parallel, i);
        }
    })
}
