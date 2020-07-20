/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* Seitentitel */
function titleRewrite() {
    var neuerTitel = $('#neuer_Titel');
    if (neuerTitel.length == 0) {
        return;
    }
    var alterTitel = $('.WikiaPageHeader > h1');
    if (alterTitel.length == 0) {
        alterTitel = $('#firstHeading');
        neuerTitel.addClass('firstHeading');
        neuerTitel.attr('id', 'firstHeading');
    }
    alterTitel.replaceWith(neuerTitel);
    neuerTitel.show();
}
 
$(function() {
    titleRewrite();
});