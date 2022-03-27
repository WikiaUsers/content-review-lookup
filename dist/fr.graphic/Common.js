/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
}
 
addCustomButton('https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png','Liste numérotée','\n# élément 1\n# élément 2\n# élément 3','','');

addCustomButton('https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');

addCustomButton('https://images.wikia.nocookie.net/graphic/fr/images/5/55/Tutoriel_ic%C3%B4ne.png','Tutoriel','{{Tutoriel\n|logiciel= \n|version= \n|niveau= \n|prérequis= \n}}\n','','');

addCustomButton('https://images.wikia.nocookie.net/graphic/fr/images/5/55/Tutoriel_ic%C3%B4ne.png','Étapes','{{Étapes\n|num= \n|titre= \n|image= \n|contenu= \n}}\n','','');