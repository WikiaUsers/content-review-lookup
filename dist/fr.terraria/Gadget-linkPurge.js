// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
    encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';
    
var linkPurgeElement = '<li><span><a title="Purge le cache du serveur de cette page" href="' + linkPurge + '">Purger</a></span></li>';
    
$('#left-navigation ul').append(linkPurgeElement);