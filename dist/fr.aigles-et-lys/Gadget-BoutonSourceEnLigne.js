//{{:Projet:JavaScript/Script|BoutonSourceEnLigne}}
//<nowiki>

/*
* BoutonSourceEnLigne
*
* Ajoute plusieurs boutons pour faciliter le � sour�age � lors de l'�dition d'un article
*
* Auteur : Arkanosis
* Derni�re r�vision : 23 octobre 2011
*/

$(function() {

  if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) == -1)
    return;

  $.each([
    // Format : pour chaque bouton
    // [
    //   'Texte � ins�rer avant la s�lection', 'Texte � ins�rer apr�s la s�lection',
    //   'Image du bouton (apr�s � commons/ � et sans � .png � � la fin)',
    //   'Texte apparaissant dans la bulle au survol du bouton',
    //   'Identifiant de l'image ; importance faible, mais il faut s'assurer que l'identifiant est unique, ne change pas et n'utilise ni espace, ni caract�res sp�ciaux'
    // ],
    [
      '', '<ref>{{lien web|url= |auteur= |titre= |�diteur= |ann�e= |site= |consult� le= }}</ref>',
      '0/0e/Button-web',
      'Lien web',
      'lienweb'
    ],
    [
      '', '<ref>{{ouvrage|langue= |auteur= |titre vo= |titre= |titre chapitre= |�diteur= |lieu= |pages= |ann�e= |isbn= | url= }}</ref>',
      '3/37/Button-livre',
      'Ouvrage',
      'ouvrage'
    ],
    [
      '', '<ref>{{harvsp|||p=}}</ref>',
      '3/31/Button-harv',
      'Harvard sans parenth�se',
      'harvsp'
    ]
  ], function(_, button) {
    mw.toolbar.addButton('//images.wikia.com/aigles-et-lys/fr/images' + button[2] + '.png', button[3], button[0], button[1], (button[0] ? button[4] : ''), 'mw-editbutton-' + button[4]);
  });

});

//</nowiki>