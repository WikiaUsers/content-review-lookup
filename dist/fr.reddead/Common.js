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

addCustomButton('http://images.wikia.com/central/images/8/88/Btn_toolbar_enum.png','Liste numérotée','\n# élément 1\n# élément 2\n# élément 3','','');
 
addCustomButton('http://images.wikia.com/central/images/1/11/Btn_toolbar_liste.png','Liste','\n* élément A\n* élément B\n* élément C','','');
 
addCustomButton('http://images.wikia.com/central/images/4/4a/Button_table.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton('http://images.wikia.com/central/images/f/fd/Button_blockquote.png','Block quote','<blockquote style="border: 1px solid blue; padding: 2em;">','</blockquote>','Block quote');
 
addCustomButton('http://images.wikia.com/central/images/c/c9/Button_strike.png','Rayer','<s>','</s>','texte rayé');
 
addCustomButton('http://images.wikia.com/central/images/5/56/Button_big.png','Texte plus grand','<big>','</big>','texte agrandi');
 
addCustomButton('http://images.wikia.com/central/images/5/58/Button_small.png','Texte plus petit','<small>','</small>','texte rapetissé');
 
addCustomButton('http://images.wikia.com/central/images/a/aa/Button_sub_letter.png','Texte en indice','<sub>','</sub>','texte en indice');
 
addCustomButton('http://images.wikia.com/central/images/6/6a/Button_sup_letter.png','Texte en exposant','<sub>','</sub>','texte en exposant');
 
addCustomButton('http://images.wikia.com/central/images/4/4b/Button_nbsp.png','Espace insécable','&nbsp\;','','');
 
addCustomButton('http://images.wikia.com/central/images/e/ea/Button_align_left.png','Aligner texte à gauche','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','texte aligné à gauche');
 
addCustomButton('http://images.wikia.com/central/images/5/5f/Button_center.png','Centrer texte','<div style="text-align: center;">','</div>','texte centré');
 
addCustomButton('http://images.wikia.com/central/images/a/a5/Button_align_right.png','Aligner texte à droite','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','texte aligné à droite');
 
addCustomButton('http://images.wikia.com/central/images/2/29/Button_justify.png','Justifier texte','<div style="text-align: justify;">','</div>','texte justifié');
 
addCustomButton('http://images.wikia.com/central/images/1/13/Button_enter.png','Aller à la ligne','<br />','','');
 
addCustomButton('http://images.wikia.com/central/images/1/1c/Button_advanced_image.png','Image avancée','[[Fichier:','|thumb|right|px|Légende]]','nom de la photo');
 
addCustomButton('http://images.wikia.com/central/images/7/74/Button_comment.png','Commentaire','<!--','-->','');
 
addCustomButton('http://images.wikia.com/central/images/c/c8/Button_redirect.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton('http://images.wikia.com/central/images/3/3b/Button_template_alt.png','Modèle','{{','}}','nom du modèle');
 
addCustomButton('http://images.wikia.com/central/images/b/b4/Button_category03.png','Catégorie','['+'[Catégorie:',']]','nom de la catégorie');
 
<!-- remettre en forme la balise pre -->
addCustomButton('http://images.wikia.com/central/images/3/3c/Button_pre.png','Texte préformaté','<pre>','</pre>','texte préformaté');
 
 
addCustomButton('http://images.wikia.com/central/images/c/c4/Button_ref.png','Ajoute une référence','<ref>','</ref>','référence, citation ou lien');
 
addCustomButton('http://images.wikia.com/central/images/8/8b/Button_ref_link.png','Index des références','==Notes et références==\n<references />','','');
 
addCustomButton('http://images.wikia.com/central/images/c/cb/Button_wikipedia.png','Citation Wikipédia','<nowiki>{{wikipédia}}</nowiki>','');
 
addCustomButton('http://images.wikia.com/central/images/c/ce/Button_no_include.png','Ne pas inclure','<nowiki><noinclude> </nowiki>','<nowiki></noinclude></nowiki>');
 
addCustomButton('http://images.wikia.com/central/images/7/79/Button_include.png','Inclure seulement','<nowiki><includeonly><nowiki>','</nowiki></includeonly></nowiki>','');
 
var voirAussi = '==Notes et références==\n'
 + '<references/>\n'
 + '==Voir aussi==\n'
 + '===Articles connexes===\n'
 + '* [[À remplacer]]\n'
 + '*\n'
 + '===Liens et documents externes===\n'
 + '*\n';
addCustomButton('http://images.wikia.com/central/images/b/bb/Seealso.png','Section Voir aussi',voirAussi,'','')