//===================================
//        Skin Switch Buttons
//===================================
/* Aggiunge i pulsanti per cambaire skin */
/* Richiede pretty URLs */

function CreateSkinChangeButtons() {
	//Oasis buttons
        $('<li id="ca-skins"><a href="/wiki/' + wgPageName + '?useskin=monobook" title="Passa a Monobook">Monobook</a></li>').appendTo('#GlobalNavigation');
	//Monobook buttons
        $('<li id="ca-skins"><a title="Passa a Oasis" href="/wiki/' + wgPageName +'?useskin=oasis">Oasis</a></li>').appendTo('#p-cactions > .pBody > ul');
}
 
addOnloadHook(CreateSkinChangeButtons);