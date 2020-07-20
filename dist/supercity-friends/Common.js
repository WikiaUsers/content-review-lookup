/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage( 'ShowHide/code.js', 'dev' );

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});



$wgExternalLinkTarget = '_blank';

/* Simply takes specified date in UTC and converts it to user's local time for display on the pages */
var jan = new Date((new Date()).getFullYear(), 0, 1);
var jul = new Date((new Date()).getFullYear(), 6, 1);

/* Determines whether DST is in effect or not */
var isDST = (new Date()).getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

if (isDST) {
    var localDate = new Date('2017-12-24T22:00:00.000Z');
} else {
    var localDate = new Date('2017-12-24T21:00:00.000Z');
}

var minutes = localDate.getMinutes() > 9 ? localDate.getMinutes() : '0' + localDate.getMinutes();
var amPM = localDate.getHours() > 12 ? localDate.getHours() - 12 : localDate.getHours();
amPM += ':' + minutes;
amPM += localDate.getHours() >= 12 ? ' PM' : ' AM';
var dateString = localDate.getHours() + ':' + minutes + ' (' + amPM + ')';
document.getElementById('inline-utc-converter').innerHTML = dateString;