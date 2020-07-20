/* Any JavaScript here will be loaded for all users on every page load. */

// ===============================================================
// Add and store UTC date publish to Global Navigation header bar.
// ===============================================================
var UTCDateTime;
//todo: add localization
Date.prototype.getMonthName = function() {
          var monthNames = [ "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.","Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec." ];
          return monthNames[this.getMonth()];
     };
Date.prototype.getDow = function() {
          var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return  dayNames[this.getDay()];
};
 
function refreshUTCDateTime() {
    var now = new Date();
    var now_utc = new Date(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),now.getUTCSeconds());
    UTCDateTime = now_utc.getDow() + " " +  now_utc.getMonthName() + " " + now_utc.getDate() + " " + now_utc.getFullYear() + " " + ("00" + now_utc.getHours()).substr(-2) + ":" + ("00" + now_utc.getMinutes()).substr(-2) + ":" + ("00" + now_utc.getSeconds()).substr(-2) + " (UTC)";

    $('#idUTCDateTime').empty().append('<span align="center" style="font-size: 12px; font-weight: bold; text-transform: none; text-align=center"><a style="color:white;" title="Refresh with cache purge" href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + UTCDateTime + '</a></span>');
    window.clearTimeout(timerUTCDateTime);
    timerUTCDateTime = window.setTimeout(refreshUTCDateTime, 1000);
}
 
$(document).ready(function() {
$('<li id="liUTDDateTime"><span align="center" id="idUTCDateTime"></span></li><li><img src="https://images.wikia.nocookie.net/tribez/images/9/9c/Settler%5E.jpg" width="25" height="25" align="bottom"></img></li>').appendTo('#GlobalNavigation');
    timerUTCDateTime = window.setTimeout(refreshUTCDateTime, 1000);
    refreshUTCDateTime();
});