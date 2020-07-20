/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

importScriptPage('ShowHide/code.js', 'dev');

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================


/* Portable Infobox subtheme overrides by Kopcap94
 * Permet de mettre des sous-themes pour l'infobox Livre
 * Origine : https://elderscrolls.wikia.com
 */
(function( $ ) {
    "use strict";
    var title_text;
    $( '.pi-theme-book .pi-header' ).each( function() {    
        title_text = $( this ).text();
        switch( title_text ) {
            case 'Online':
                $( this ).addClass( 'online' );
                break;
            case 'Skyrim':
                $( this ).addClass( 'skyrim' );
                break;
            case 'Dragonborn':
                $( this ).addClass( 'dragonborn' );
                break;
            case 'Dawnguard':
                $( this ).addClass( 'dawnguard' );
                break;
            case 'Oblivion':
                $( this ).addClass( 'oblivion' );
                break;
            case 'Shivering Isles':
                $( this ).addClass( 'shiveringIsles' );
                break;
            case 'Morrowind': 
                $( this ).addClass( 'morrowind' );
                break;
            case 'Daggerfall':
                $( this ).addClass( 'daggerfall' );
                break;
            case 'Bloodmoon':
                $( this ).addClass( 'bloodmoon' );
                break;
            case 'Tribunal':
                $( this ).addClass( 'tribunal' );
                break;
            default:
                return;
        }
    });
})( this.jQuery );