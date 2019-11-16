/**
 * Apply replaces to text
 * @param {string} text
 * @param {Object[]} replaces
 * @param {number} replaces[].position
 * @param {string} replaces[].oldWord
 * @param {string} replaces[].newWord
 * @returns {string}
 */
export const getTextWithReplaces = (text, replaces = []) => {
    if (replaces.length === 0) return text;
    let resultText = "";
    if (replaces[0].position > 0) resultText += text.substring(0, replaces[0].position);
    for (let i = 0; i < replaces.length; i++) {
        if (i > 0)
            resultText += text.substring(replaces[i-1].position + replaces[i-1].oldWord.length, replaces[i].position);
        resultText += `${replaces[i].newWord}`;
    }
    const lastReplace = replaces[replaces.length-1];
    if (lastReplace.position + lastReplace.oldWord.length < text.length)
        resultText += text.substring(lastReplace.position + lastReplace.oldWord.length);
    return resultText;
};