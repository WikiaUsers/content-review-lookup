// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );

var qqxLinkText = 'Interface aufdecken';
var qqxLinkTip = 'MediaWiki-Systemnachrichtsnamen anzeigen';
var qqxRemLinkText = 'Reguläre Ansicht';
var qqxRemLinkTip = 'MediaWiki-Systemnachrichten verbergen und die Seite normal neu laden';
var currHref = window.location.href;

if (wgNamespaceNumber != 8){
    if (currHref.indexOf('uselang=qqx') < 0 ) {
        var qqxToken = (currHref.indexOf('?') < 0 ? '?uselang=qqx' : '&uselang=qqx' );
        $('#right-navigation #p-cactions .menu ul').append('<li><a title="' + qqxLinkTip + '" href="' + currHref + qqxToken + '">' + qqxLinkText + '</a></li>');
    } else {
        var qqxRem = currHref.replace(/[\?|&]uselang=qqx/,'');
        $('#right-navigation #p-views ul').prepend('<li><span><a title="' + qqxRemLinkTip + '" href="' + qqxRem + '">' + qqxRemLinkText + '</a></span></li>');  
    }
}