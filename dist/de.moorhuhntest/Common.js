/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Onlyifuploading.js",
        // "MediaWiki:Facebook.js",        deaktiviert
        // "MediaWiki:Vollbildschirm.js",  deaktiviert
        "MediaWiki:Button.js"               //Beachte: Letztes Element hat kein Komma (Aufzählung endet)
    ]
});

function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Back To Top" onClick="goToTop();">Zum Seitenanfang</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}

var Balken1=document.createElement("div");
Balken1.classList.add("BalkenGrau");
$(".wikiaPhotoGallery-slider-body .description-background").prepend(Balken1);

var Balken2=document.createElement("div");
Balken2.classList.add("Roterbalken");
$(".BalkenGrau").append(Balken2);