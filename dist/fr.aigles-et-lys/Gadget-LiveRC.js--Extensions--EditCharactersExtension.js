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
 
Permet de rendre fonctionnels les caractères spéciaux lors de l'édition + autres boutons dans la toolbar
 
* Licence : ...?
* Documentation :
* Auteur : [[Wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 
if (wgPageName == LiveRC_PageTitle && (wgAction=="view"||wgAction=="purge")) {
    importScript("Mediawiki:Common.js/edit.js");
}
function LiveRC_EditCharactersExtension_Init(){
    if(typeof(addCharSubsetMenu)=="function") addCharSubsetMenu();
    if(typeof(changButtons)=="function") changButtons();
}

LiveRC_AddHook("AfterPreviewEdit", LiveRC_EditCharactersExtension_Init);
 

/* ************************************************************************************************************************************************ */
} // FIN IF
//</source>