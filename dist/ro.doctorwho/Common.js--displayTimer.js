/* Any JavaScript here will be loaded for all users on every page load. */
 
var refreshDate;
 
function showTime() {
	var	now = new Date(),
		hh = now.getUTCHours(),
		mm = now.getUTCMinutes(),
		ss = now.getUTCSeconds(),
		time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
    $('#showdate').empty().append('<span class="barDate" style="text-transform: uppercase;"><a style="color:#FFF;font-family:\'Futura\', \'Gill Sans\', \'Helvetica Neue\',\'Trebuchet MS\', sans-serif" title="Purge the server cache and update the contents of this page." href="' + wgArticlePath.replace('$1', wgPageName.replace(/ /g, '_')) + '?action=purge">' + time + '</a></span>');
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(showTime, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li id="displayTimer"><span id="showdate"></span></li>').appendTo('#AccountNavigation');
    else
        $('#p-personal ul').prepend('<li><span id="showdate"></span></li>');
    showTime();
    refreshDate = window.setTimeout(showTime, 1000);
    $('#displayTimer').css({ color: '#FFF', fontWeight: 'normal', fontSize: '10px', letterSpacing: '2px', marginLeft: '3px' })
});