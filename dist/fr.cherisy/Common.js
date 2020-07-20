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

addCustomButton('https://images.wikia.nocookie.net//central/images/4/4a/Button_table.png','Tableau','{|\n|-\n|\n|\n|}','','','mw-editbutton-array');
 
addCustomButton('https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png','Block quote','<blockquote style="border: 1px solid blue; padding: 2em;">','</blockquote>','Block quote');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/c9/Button_strike.png','Rayer','<s>','</s>','texte rayé');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//5/56/Button_big.png','Texte plus grand','<big>','</big>','texte agrandi');

addCustomButton('https://images.wikia.nocookie.net//central/images/5/58/Button_small.png','Texte plus petit','<small>','</small>','texte rapetissé');

addCustomButton('https://images.wikia.nocookie.net//central/images/a/aa/Button_sub_letter.png','Texte en indice','<sub>','</sub>','texte en indice');

addCustomButton('https://images.wikia.nocookie.net//central/images/6/6a/Button_sup_letter.png','Texte en exposant','<sub>','</sub>','texte en exposant');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//8/80/Button_upper_letter.png','Exposant','<sup>','</sup>','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//4/4b/Button_nbsp.png','Espace insécable','&nbsp\;','','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//8/8e/Button_shifting.png', 'Insérer un retrait',':','','' );
 
addCustomButton('https://images.wikia.nocookie.net//central/images//e/ea/Button_align_left.png','Aligner un texte à gauche','<div style="text-align: left; direction: ltr; margin-left: 1em;">','</div>','texte aligné à gauche');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//5/5f/Button_center.png','Centrer un texte','<div style="text-align: center;">','</div>','texte centré');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//a/a5/Button_align_right.png','Texte aligné à droite','<div style="text-align: right; direction: ltr; margin-left: 1em;">','</div>','texte aligné à droite');

addCustomButton('https://images.wikia.nocookie.net//central/images//2/29/Button_justify.png','Justifier texte','<div style="text-align: justify;">','</div>','texte justifié');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//1/13/Button_enter.png','Aller à la ligne','<br />','','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//5/59/Button_paint.png','Texte coloré','<span style="color: #Nom de la couleur;">','</span>','texte à colorer');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//1/1c/Button_advanced_image.png','Image avancée','[[Image:','|thumb|right|px|Légende]]','nom de la photo');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//7/74/Button_comment.png','Commentaire','<!--','-->','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/c8/Button_redirect.png','Redirection','#REDIRECT [[',']]','nom de la destination');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//3/3b/Button_template_alt.png','Modèle','{{','}}','nom du modèle');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//b/b4/Button_category03.png','Catégorie','[[Catégorie:',']]','nom de la catégorie');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//3/3c/Button_pre.png','Texte préformaté','<pre>','</pre>','texte préformaté');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/c4/Button_ref.png','Ajoute une référence','<ref>','</ref>','référence, citation ou lien');

addCustomButton('https://images.wikia.nocookie.net//central/images//8/8b/Button_ref_link.png','Index des références','==Notes et références==\n<references />','','');

addCustomButton('https://images.wikia.nocookie.net//central/images///c/cb/Button_wikipedia.png','Citation Wikipédia','<nowiki>{{OrigineWikipedia}}</nowiki>','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//c/ce/Button_no_include.png','Ne pas inclure','<noinclude>','</noinclude>','');
 
addCustomButton('https://images.wikia.nocookie.net//central/images//7/79/Button_include.png','Inclure seulement','<includeonly>','</includeonly>','');
 
var voirAussi = '==Notes et références==\n'
 + '<references/>\n'
 + '==Voir aussi==\n'
 + '===Articles connexes===\n'
 + '* [[À remplacer]]\n'
 + '*\n'
 + '===Liens et documents externes===\n'
 + '*\n';
addCustomButton('https://images.wikia.nocookie.net//central/images//b/bb/Seealso.png','Section Voir aussi',voirAussi,'','');

<a href="http://www.xiti.com/xiti.asp?s=390013" title="WebAnalytics" target="_top">
<script type="text/javascript">
<!--
Xt_param = 's=390013&p=cherisy';
try {Xt_r = top.document.referrer;}
catch(e) {Xt_r = document.referrer; }
Xt_h = new Date();
Xt_i = '<img width="39" height="25" border="0" alt="" ';
Xt_i += 'src="http://logv9.xiti.com/hit.xiti?'+Xt_param;
Xt_i += '&hl='+Xt_h.getHours()+'x'+Xt_h.getMinutes()+'x'+Xt_h.getSeconds();
if(parseFloat(navigator.appVersion)>=4)
{Xt_s=screen;Xt_i+='&r='+Xt_s.width+'x'+Xt_s.height+'x'+Xt_s.pixelDepth+'x'+Xt_s.colorDepth;}
document.write(Xt_i+'&ref='+Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$')+'" title="Internet Audience">');
//-->
</script>
<noscript>
Mesure d'audience ROI statistique webanalytics par <img width="39" height="25" src="http://logv9.xiti.com/hit.xiti?s=390013&p=cherisy" alt="WebAnalytics" />
</noscript></a>