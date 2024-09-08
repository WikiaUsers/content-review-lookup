// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );

var qqxLinkText = "Révéler l'interface";
var qqxLinkTip = "Révéler les noms des messages de l'interface MediaWiki";
var qqxRemLinkText = 'Vue normale';
var qqxRemLinkTip = "Recharger cette page en vue normale (masquer les noms des messages de l'interface MediaWiki)";
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