// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
    encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';
    
var linkPurgeElement = '<li><span><a title="Den Server-Cache dieser Seite löschen" href="' + linkPurge + '">Aktualisieren</a></span></li>';
    
$('#left-navigation ul').append(linkPurgeElement);