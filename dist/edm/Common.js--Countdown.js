// **************************************************
// Experimental javascript countdown timer By:Tono555
// Version 0.0.3
// Via http://sims.wikia.com/wiki/MediaWiki:Common.js
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

    // Catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // Determine past or future
    var tpm = diff < 0 ? 'T plus ' : '';

    // Convert time difference to components
    diff = Math.abs(diff);
    var months = Math.floor(diff / (30 * 24 * 60 * 60)); // Approximate months
    diff %= (30 * 24 * 60 * 60);
    var days = Math.floor(diff / (24 * 60 * 60));
    diff %= (24 * 60 * 60);
    var hours = Math.floor(diff / (60 * 60));
    diff %= (60 * 60);
    var minutes = Math.floor(diff / 60);
    var seconds = diff % 60;

    var left = 
        (months ? months + ' months, ' : '') +
        (days ? days + ' days, ' : '') +
        (hours ? hours + ' hours, ' : '') +
        (minutes ? minutes + ' minutes, ' : '') +
        seconds + ' seconds';

    timers[i].firstChild.nodeValue = tpm + left;
    timeouts[i] = setTimeout(() => updatetimer(i), 1000);
}
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************