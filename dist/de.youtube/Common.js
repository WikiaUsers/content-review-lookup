var Balken1=document.createElement("div");
Balken1.classList.add("BalkenGrau");
$(".wikiaPhotoGallery-slider-body .description-background").prepend(Balken1);

var Balken2=document.createElement("div");
Balken2.classList.add("Roterbalken");
$(".BalkenGrau").append(Balken2);

/* AjaxRC */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.AjaxRCRefreshText = 'Automatische Aktualisierung';
window.AjaxRCRefreshHoverText = 'Aktualisiert automatisch die Seite';

// Import [[MediaWiki:Onlyifuploading.js]] 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}