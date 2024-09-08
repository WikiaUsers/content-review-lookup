/* 
 --------------------------------------------------------------------------------------
 ---------LLLL---------III--------------------------RRRRRRRRRR--------CCCCC------------
 ---------LLLL---------III--------------------------RRRRRRRRRRRR----CCCCCCCCC----------
 ---------LLLL--------------------------------------RRR------RRR---CCC-----CCC---------
 ---------LLLL---------III--VV-----VV--EEEEEEEEE----RRR------RRR--CCC------------------
 ---------LLLL---------III---VV---VV---EEE----------RRRRRRRRRRR---CCC------------------
 ---------LLLL---------III---VV---VV---EEEEEE-------RRRRRRRRRR----CCC------------------
 ---------LLLL---------III----VV-VV----EEEEEE-------RRR-----RRR----CCC-----CCC---------
 ---------LLLLLLLLLLL--III----VVVVV----EEE----------RRR------RRR----CCCCCCCCC----------
 ---------LLLLLLLLLLL--III-----VVV-----EEEEEEEEE----RRR-------RRR-----CCCCC------------
 --------------------------------------------------------------------------------------
 
'''Extension de LiveRC'''
 
Permet d'améliorer la prévisualisation avec les fonctions du Common.js : 
déplacement des liens [modifier],
{{m|Images}},
Géolocalisation multiple,
Boîtes déroulantes,
Palettes de navigation,
Affichage/Masquage du sommaire.
 
* Licence : ...?
* Documentation :
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF

function RunCommonJS(){
   var preview = document.getElementById("livePreview");
   if(!preview) return;
   if(typeof(tocHideText)=='undefined' || typeof(tocShowText)=='undefined'){ 
      try{
         tocHideText = lrcMediawikiMessages["hidetoc"];
         tocShowText = lrcMediawikiMessages["showtoc"];
      }catch(e){
         tocHideText = "masquer";
         tocShowText = "afficher"; 
      }
   }
   setModifySectionStyle(preview); // déplacement des liens [modifier]
   imageGroup(preview);            // Modèles {{Images}}
   GeoBox_Init(preview);           // Géolocalisation multiple
   BoiteDeroulante(preview);       // Boîtes déroulantes
   Palette(preview);               // Palettes de navigation
   var TOC = getElementWithId("toc", "table", preview); // Sommaire
   if(TOC){
      showTocToggle();
      if(TOC.getElementsByTagName('ul')[0].style.display != "none") TOC.getElementsByTagName('ul')[0].style.display = "none";
   }
}

////////////////////////////////////////// HOOKS

LiveRC_AddHook("AfterPreviewDiff", RunCommonJS);
LiveRC_AddHook("AfterPreviewArticle", RunCommonJS);
LiveRC_AddHook("AfterPreviewHistory", RunCommonJS);
LiveRC_AddHook("AfterPreviewContribs", RunCommonJS);
LiveRC_AddHook("AfterPreviewDeletedContribs", RunCommonJS);
LiveRC_AddHook("AfterPreviewEdit", RunCommonJS);
LiveRC_AddHook("AfterPreviewLog", RunCommonJS);
LiveRC_AddHook("AfterPreviewFilter", RunCommonJS);

/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>