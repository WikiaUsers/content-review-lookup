/*
$( document ).ready(function() {
    switch ( mw.config.get( 'wgPageName' ) ) {
        case 'User_Info':
            importScriptPage( 'MediaWiki:Wikia.js/UserInfo.js', 'shining-armor' );
            break;
        case 'Name':
            window.location.href = "http://camphalfbloodroleplay.wikia.com/wiki/Special:Chat?action=purge";
            break;
        case 'WikiDash':
            var node = document.createElement('script');
                node.setAttribute('src', '//shining-armor.wikia.com/index.php?title=MediaWiki:WikiDash.js&action=raw&ctype=text/javascript');
                node.onload = function() {
                    WikiDash.loadModule('UserInfo');
                };
                
            document.getElementsByTagName('head')[0].appendChild(node);
            break;
        case 'Doge':
            for(i=0;i<document.getElementsByClassName('re0').length;i++) {
                if(document.getElementsByClassName('re0')[i].innerHTML[0] == '#') {
                    document.getElementsByClassName('re0')[i].innerHTML = '<span style="color:' + document.getElementsByClassName('re0')[i].innerHTML + '">' + document.getElementsByClassName('re0')[i].innerHTML + '</span>';
                }
            }
            break;
    }
});
*/