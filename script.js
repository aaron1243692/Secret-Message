function encrypt() {
    const keyword = getKeyword();
    if (!keyword) return;

    const inputText = document.getElementById("inputmsg").value.trim();
    const result = vigenereCipher(inputText, keyword, true);
    document.getElementById("outputmsg").value = result;
}

function decrypt() {
    const keyword = getKeyword();
    if (!keyword) return;

    const inputText = document.getElementById("inputmsg").value.trim();
    const result = vigenereCipher(inputText, keyword, false);
    document.getElementById("outputmsg").value = result;
}

function getKeyword() {
    const keyword = document.getElementById("keyword").value.trim();
    if (keyword.length === 0 || !/^[a-zA-Z]+$/.test(keyword)) {
        alert("Please enter a valid keyword (letters only).");
        return null;
    }
    return keyword.toUpperCase();
}

function vigenereCipher(text, keyword, encrypt = true) {
    const textArr = text.toUpperCase().split('');
    const keywordArr = keyword.split('');
    let result = '';
    let keywordIndex = 0;

    textArr.forEach(char => {
        if (/[A-Z]/.test(char)) {
            const textCharCode = char.charCodeAt(0) - 65;
            const keyCharCode = keywordArr[keywordIndex % keywordArr.length].charCodeAt(0) - 65;
            const shift = encrypt ? keyCharCode : -keyCharCode;
            const newChar = String.fromCharCode(((textCharCode + shift + 26) % 26) + 65);

            result += newChar;
            keywordIndex++;
        } else {
            result += char;
        }
    });

    return result;
}