for (i = 1; i < document.getElementById('triviaTemplate').getElementsByTagName('div').length + 1; i++) {
    document.getElementById('trivia' + i).style.display = 'none';
}

function randomNum() {
    var randomNum = Math.floor(Math.random() * (document.getElementById('triviaTemplate').getElementsByTagName('div').length) + 1);
    return randomNum;
}
document.getElementById('trivia' + randomNum()).style.display = 'block';