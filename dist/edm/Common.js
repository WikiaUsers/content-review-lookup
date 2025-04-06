/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
     type: "script",
     articles: ["w:c:dev:Countdown/code.js"]
 });

importArticles({
    type: 'script',
    articles: [
        'u:dev:UTCClock/code.js',
    ]
});

// Countdown.js script
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

    // Catch past events
    if (isNaN(diff) || diff < 0) {
        timers[i].firstChild.nodeValue = '00:00:00';
        return;
    }

    var seconds = diff % 60;
    diff = Math.floor(diff / 60);
    var minutes = diff % 60;
    diff = Math.floor(diff / 60);
    var hours = diff % 24;
    var days = Math.floor(diff / 24);

    timers[i].firstChild.nodeValue =
        (days > 0 ? days + 'd ' : '') +
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;

    timeouts[i] = setTimeout(function () { updatetimer(i); }, 1000);
}

function checktimers() {
    var countdownElements = document.getElementsByClassName('customcountdown');
    if (countdownElements.length === 0) return;

    timers = [];
    timeouts = [];
    for (var i = 0; i < countdownElements.length; i++) {
        timers[i] = countdownElements[i];
        var timeData = timers[i].getElementsByClassName('seedDate')[0].textContent.trim();
        timers[i].eventdate = new Date(timeData);
        updatetimer(i);
    }
}

mw.loader.load('/index.php?title=MediaWiki:Countdown.js&action=raw&ctype=text/javascript');

document.addEventListener('DOMContentLoaded', checktimers);

importScript('MediaWiki:Countdown.js');