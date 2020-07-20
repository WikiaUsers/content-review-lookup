/* Any JavaScript here will be loaded for all users on every page load. */

/* Clock by Monchoman v45.0 - used for Template:Clock */
var JS_clock = {
    clocks: [],
    interval: 0,
};
 
JS_clock.load = function() {
    if(window.skin == 'oasis') {var body = 'WikiaArticle';}
    else {var body = 'bodyContent';}
 
    var spans = document.getElementById(body).getElementsByTagName('span');
    for(var i = 0; i < spans.length; i++) {
        if(spans[i].classList.contains('js-clock')) {JS_clock.clocks.push(spans[i]);}
    }
    JS_clock.update();
    setInterval(JS_clock.update, 1000);
}
 
JS_clock.update = function() {
    for(var i = 0; i < JS_clock.clocks.length; i++) {
        var timezone = JS_clock.clocks[i].getAttribute('data-timezone') * 1;
        if(!timezone) {timezone = 0;}
        var date = new Date();
        date.setUTCHours(date.getUTCHours() + timezone);
 
        var hours = date.getUTCHours();
        if(hours < 10) {hours = '0' + hours;}
        var minutes = date.getUTCMinutes();
        if(minutes < 10) {minutes = '0' + minutes;}
        var seconds = date.getUTCSeconds();
        if(seconds < 10) {seconds = '0' + seconds;}
        var month = wgMonthNamesShort[date.getUTCMonth() + 1];
        var day = date.getUTCDay();
        var tz = '(UTC ';
        if(timezone < 0) {tz += timezone + ')';}
        else {tz += '+' + timezone + ')';}
 
        JS_clock.clocks[i].textContent = '' + hours + ':' + minutes + ':' + seconds + ', ' + month + ' ' + day + ' ' + tz;
    }
}
 
if(document.readyState == 'complete') {JS_clock.load();}
else {window.addEventListener('load', JS_clock.load);}