//============================================================
// Insertion de nouveaux boutons dans la barre d'outils
//============================================================

//Remplit la variable mwCustomEditButtons (voir /skins-1.5/commons/wikibits.js) pour ajouter des boutons à la barre d'outils

function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
   mwCustomEditButtons[mwCustomEditButtons.length] =
    {"imageId": imageId,
     "imageFile": imageFile,
     "speedTip": speedTip,
     "tagOpen": tagOpen,
     "tagClose": tagClose,
     "sampleText": sampleText};
}
 
addCustomButton('http://images.wikia.com/routes/images//f/f6/Button_toolbar_enum.png','Énumération','\n# élément 1\n# élément 2\n# élément 3','','');
 
addCustomButton('http://images.wikia.com/routes/images//b/b3/Button_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');

addCustomButton('http://images.wikia.com/routes/images//0/04/Button_array.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton('http://images.wikia.com/routes/images//f/fd/Button_blockquote.png','Block quote','<blockquote style="border: 1px solid blue; padding: 2em;">','</blockquote>','Block quote');
 
addCustomButton('http://images.wikia.com/routes/images//c/c9/Button_strike.png','Rayer','<s>','</s>','texte rayé');
 
addCustomButton('http://images.wikia.com/routes/images//5/58/Button_small.png','Texte plus petit','<small>','</small>','texte rapetissé');
 
addCustomButton('http://images.wikia.com/routes/images//5/56/Button_big.png','Texte plus grand','<big>','</big>','texte agrandi');
 
addCustomButton('http://images.wikia.com/routes/images//8/80/Button_upper_letter.png','Exposant','<sup>','</sup>','');
 
addCustomButton('http://images.wikia.com/routes/images//4/4b/Button_nbsp.png','Espace insécable','&nbsp\;','','');
 
addCustomButton('http://images.wikia.com/routes/images//8/8e/Button_shifting.png', 'Insérer un retrait',':','','' );
 
addCustomButton('http://images.wikia.com/routes/images//e/ea/Button_align_left.png','Texte centré','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','texte aligné à gauche');
 
addCustomButton('http://images.wikia.com/routes/images//f/f7/Button_align_center.png','Texte centré','<div style="text-align: center;">','</div>','texte centré');
 
addCustomButton('http://images.wikia.com/routes/images//a/a5/Button_align_right.png','Texte centré','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','texte aligné à droite');
 
addCustomButton('http://images.wikia.com/routes/images//1/13/Button_enter.png','Aller à la ligne','<br />','','');
 
addCustomButton('http://images.wikia.com/routes/images//5/59/Button_paint.png','Texte coloré','<span style="color: #Nom de la couleur;">','</span>','texte à colorer');
 
addCustomButton('http://images.wikia.com/routes/images//9/91/Button_toolbar_gallery.png','Galerie d\'images','\n<gallery>\nImage:Autoroute1.gif|[[Autoroute]]\nImage:VE1.gif|[[Voie express]]\nImage:Giratoire.gif|[[Giratoire]]\n</gallery>','','');
 
addCustomButton('http://images.wikia.com/routes/images//1/1c/Button_advanced_image.png','Image avancée','[[Image:','|thumb|right|px|Légende]]','nom de la photo');
 
addCustomButton('http://images.wikia.com/routes/images//7/74/Button_comment.png','Commentaire','<!--','-->','');
 
addCustomButton('http://images.wikia.com/routes/images//c/c8/Button_redirect.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton('http://images.wikia.com/routes/images//e/eb/Button_plantilla.png','Modèle','{{','}}','nom du modèle');
 
addCustomButton('http://images.wikia.com/routes/images//1/11/Button_category.png','Catégorie','[[Catégorie:',']]','nom de la catégorie');
 
addCustomButton('http://images.wikia.com/routes/images//3/3c/Button_pre.png','Texte préformaté','<pre>','</pre>','texte préformaté');
 
addCustomButton('http://images.wikia.com/routes/images//9/91/Button_ref1.png','Ajoute une référence','<ref>','</ref>','référence, citation ou lien');

addCustomButton('http://images.wikia.com/routes/images//f/f9/Button_ref2.png','Index des références','==Notes et références==\n<references />','','');
 
addCustomButton('http://images.wikia.com/routes/images//c/ce/Button_no_include.png','Ne pas inclure','<noinclude>','</noinclude>','');
 
addCustomButton('http://images.wikia.com/routes/images//7/79/Button_include.png','Inclure seulement','<includeonly>','</includeonly>','');
 
var voirAussi = '==Notes et références==\n'
 + '<references/>\n'
 + '==Voir aussi==\n'
 + '===Articles connexes===\n'
 + '* [[À remplacer]]\n'
 + '*\n'
 + '===Liens et documents externes===\n'
 + '*\n';
addCustomButton('http://images.wikia.com/routes/images//6/63/Button_seealso.png','Section Voir aussi',voirAussi,'','');

addCustomButton('http://images.wikia.com/routes/images//6/60/Button_red.png','Couleur rouge pour Carte Google Maps','#F30a2b','','');

addCustomButton('http://images.wikia.com/routes/images//5/5a/Button_yellow.png','Couleur jaune pour Carte Google Maps','#FCFF07','','');

addCustomButton('http://images.wikia.com/routes/images//8/88/Button_orange.png','Couleur orange pour Carte Google Maps','#F8B708','','');

addCustomButton('http://images.wikia.com/routes/images//6/68/Button_green.png','Couleur verte pour Carte Google Maps','#1EFB07','','');

addCustomButton('http://images.wikia.com/routes/images//0/07/Button_blue.png','Couleur bleue pour Carte Google Maps','#221EDA','','');

addCustomButton('http://images.wikia.com/routes/images//e/ec/Button_purple.png','Couleur mauve pour Carte Google Maps','#F412F1','','');