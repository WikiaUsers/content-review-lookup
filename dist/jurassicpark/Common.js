/* Any JavaScript here will be loaded for all users on every page load. */

// Live Clock (Updated for modern Fandom UCP)
function liveClock() {
    var config = mw.config.get([ 'wgServer', 'wgScriptPath', 'wgPageName', 'skin' ]);
    var link = config.wgServer + config.wgScriptPath + '/index.php?title=' + encodeURIComponent(config.wgPageName) + '&action=purge';
    
    // Adapted for Fext (modern Fandom layout) and legacy skins
    if ($('#p-personal .pBody ul').length) {
        $('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
    } else if ($('.wiki-tools').length) {
        $('.wiki-tools').prepend('<div id="utcdate" style="margin-right:10px;"><a href="'+link+'"></a></div>');
    }
    
    $('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
    showTime();        
}

function showTime() {
    var now = new Date();
    var hh = now.getUTCHours();
    var mm = now.getUTCMinutes();
    var ss = now.getUTCSeconds();
    var dd = now.getUTCDate();
    var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var month  = months[now.getUTCMonth()];
    var year   = now.getUTCFullYear();
    var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
    $('#utcdate a').text(time);

    window.setTimeout(showTime, 1000);
}

$(liveClock);

window.MastheadRightsBadgeSettings = { 
    iconSize: '40px' 
};