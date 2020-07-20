/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

//============================================================
// Insertion de nouveaux boutons dans la barre d'outils
//============================================================

//Remplit la variable mwCustomEditButtons  pour ajouter des boutons à la barre d'outils

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
}
 
addCustomButton('https://images.wikia.nocookie.net//central/images/8/88/Btn_toolbar_enum.png','Liste numérotée','\n# élément 1\n# élément 2\n# élément 3','','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images/1/11/Btn_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');

addCustomButton('https://images.wikia.nocookie.net//central/images//c/c9/Button_strike.png','Rayer','<s>','</s>','texte rayé');

addCustomButton('https://images.wikia.nocookie.net//central/images//5/56/Button_big.png','Texte plus grand','<big>','</big>','texte agrandi');

addCustomButton('https://images.wikia.nocookie.net//central/images/5/58/Button_small.png','Texte plus petit','<small>','</small>','texte rapetissé');

addCustomButton('https://images.wikia.nocookie.net//central/images//e/ea/Button_align_left.png','Aligner un texte à gauche','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','texte aligné à gauche');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//5/5f/Button_center.png','Centrer un texte','<div style="text-align: center;">','</div>','texte centré');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//a/a5/Button_align_right.png','Texte aligné à droite','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','texte aligné à droite');

addCustomButton('https://images.wikia.nocookie.net//central/images//2/29/Button_justify.png','Justifier texte','<div style="text-align: justify;">','</div>','texte justifié');

addCustomButton('https://images.wikia.nocookie.net//central/images/4/4a/Button_table.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png','Block quote','<blockquote style="border: 1px solid blue; padding: 2em;">','</blockquote>','Block quote');

addCustomButton('https://images.wikia.nocookie.net//central/images//1/13/Button_enter.png','Aller à la ligne','<br />','','');

addCustomButton('https://images.wikia.nocookie.net//central/images//5/59/Button_paint.png','Texte coloré','<span style="color: #Nom de la couleur;">','</span>','texte à colorer');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/c8/Button_redirect.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//3/3b/Button_template_alt.png','Modèle','{{','}}','nom du modèle');

addCustomButton('https://images.wikia.nocookie.net//central/images//c/c4/Button_ref.png','Ajoute une référence','<ref>','</ref>','référence, citation ou lien');

addCustomButton('https://images.wikia.nocookie.net//central/images//8/8b/Button_ref_link.png','Index des références','==Notes et références==\n<references />','','');

addCustomButton('https://images.wikia.nocookie.net//central/images///c/cb/Button_wikipedia.png','Citation Wikipédia','<nowiki>{{Wikipediafr}}</nowiki>','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/ce/Button_no_include.png','Ne pas inclure','<nowiki><noinclude> </nowiki>','<nowiki></noinclude></nowiki>');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//7/79/Button_include.png','Inclure seulement','<nowiki><includeonly><nowiki>','</nowiki></includeonly></nowiki>','');