// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
    encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';
    
var linkPurgeElement = '<li><span><a title="Purge the server cache for this page" href="' + linkPurge + '">Purge</a></span></li>';
    
$('#left-navigation ul').append(linkPurgeElement);