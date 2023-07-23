/* Any JavaScript here will be loaded for all users on every page load. */
var bgm = [
   "url('https://static.wikia.nocookie.net/kaoruhana/images/0/0c/Main-Kaoruko.png/revision/latest?cb=20230723044502&format=original')",
    "url('https://static.wikia.nocookie.net/kaoruhana/images/6/64/Main-Subaru.png/revision/latest?cb=20230723044507&format=original')",
    "url('https://static.wikia.nocookie.net/kaoruhana/images/f/ff/Main-Rintaro.png/revision/latest?cb=20230723044506&format=original')",
    "url('https://static.wikia.nocookie.net/kaoruhana/images/c/c3/Main-Yorita.png/revision/latest?cb=20230723044510&format=original')",
    "url('https://static.wikia.nocookie.net/kaoruhana/images/4/40/Main-Natsusawa.png/revision/latest?cb=20230723044504&format=original')"
    ];

var random = Math.floor(Math.random() * bgm.length);
$('.welcome').attr('background-image',bgm[random]);