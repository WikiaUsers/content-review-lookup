/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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

/* Button Leiste unterm Slider */

SliderSymbolContainer = document.createElement("div");
SliderSymbolContainer.classList.add("SliderSymbolContainer");
$(".WikiaPhotoGalleryPreview").append(SliderSymbolContainer);
 
Hilfe = document.createElement("a");
Hilfe.href="/Hilfe:Einsteigertipps";
Hilfe.innerHTML="Hilfe";
Hilfe.classList.add("Hilfe");
$(".SliderSymbolContainer").append(Hilfe);
 
SymbolBild = document.createElement("a");
SymbolBild.classList.add("SymbolBild");
SymbolBild.href="/Hilfe:Einsteigertipps#Bilder_von_anderen_Internetseiten";
$(".SliderSymbolContainer").append(SymbolBild);
 
SymbolKamera = document.createElement("a");
SymbolKamera.classList.add("SymbolKamera");
SymbolKamera.href="/Hilfe:Einsteigertipps#Videos_importieren";
$(".SliderSymbolContainer").append(SymbolKamera);
 
SymbolAuge = document.createElement("a");
SymbolAuge.classList.add("SymbolAuge");
SymbolAuge.href="/Mobiltelefon_Wikia:Administratoren_und_Moderatoren";
$(".SliderSymbolContainer").append(SymbolAuge);
 
SymbolBuch = document.createElement("a");
SymbolBuch.classList.add("SymbolBuch");
SymbolBuch.href="/Hilfe:Beispielseite";
$(".SliderSymbolContainer").append(SymbolBuch);
 
SymbolUpload = document.createElement("a");
SymbolUpload.classList.add("SymbolUpload");
SymbolUpload.href="/Hilfe:Ein Foto hochladen";
$(".SliderSymbolContainer").append(SymbolUpload);