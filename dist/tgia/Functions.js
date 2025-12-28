window.randomChoice = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

window.regexClean = function (str) {
    return str.replace(/[\\^$.|?*+()[{]/g, function (match) {
        return '\\' + match;
    });
};