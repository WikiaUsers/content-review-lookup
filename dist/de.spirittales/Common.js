/**
 * Diese Funktion ändert markierte Elemente so um, dass die Sichtbarkeit der
 * enthaltenen (gegebenenfalls verlinkten) Bilder beim Überfahren mit dem Mauszeiger
 * gewechselt wird.
 */
function hoverchange() {
$('.onhover').each(function() {
    $(this)
        .bind('mouseenter', function() {
            $(this).find(' > a').hide();
            $(this).find(' > img').hide();
            $(this).find(' > span').show();
        })
        .bind('mouseleave', function(){
            $(this).find(' > a').show();
            $(this).find(' > img').show();
            $(this).find(' > span').hide();
        })
    })
}


/**
 * Diese Zeile sorgt dafür, dass der enthaltene Code ausgeführt wird, nachdem die
 * Seite fertig geladen wurde.
 */
$(document).ready(function() {
    hoverchange();
});



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