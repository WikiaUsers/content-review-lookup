//{{:Projet:JavaScript/Script|BoutonSourceEnLigne}}
//<nowiki>

/*
* BoutonSourceEnLigne
*
* Ajoute plusieurs boutons pour faciliter le « sourçage » lors de l'édition d'un article
*
* Auteur : Arkanosis
* Dernière révision : 23 octobre 2011
*/

$(function() {

  if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) == -1)
    return;

  $.each([
    // Format : pour chaque bouton
    // [
    //   'Texte à insérer avant la sélection', 'Texte à insérer après la sélection',
    //   'Image du bouton (après « commons/ » et sans « .png » à la fin)',
    //   'Texte apparaissant dans la bulle au survol du bouton',
    //   'Identifiant de l'image ; importance faible, mais il faut s'assurer que l'identifiant est unique, ne change pas et n'utilise ni espace, ni caractères spéciaux'
    // ],
    [
      '', '<ref>{{lien web|url= |auteur= |titre= |éditeur= |année= |site= |consulté le= }}</ref>',
      '0/0e/Button-web',
      'Lien web',
      'lienweb'
    ],
    [
      '', '<ref>{{ouvrage|langue= |auteur= |titre vo= |titre= |titre chapitre= |éditeur= |lieu= |pages= |année= |isbn= | url= }}</ref>',
      '3/37/Button-livre',
      'Ouvrage',
      'ouvrage'
    ],
    [
      '', '<ref>{{harvsp|||p=}}</ref>',
      '3/31/Button-harv',
      'Harvard sans parenthèse',
      'harvsp'
    ]
  ], function(_, button) {
    mw.toolbar.addButton('//images.wikia.com/aigles-et-lys/fr/images' + button[2] + '.png', button[3], button[0], button[1], (button[0] ? button[4] : ''), 'mw-editbutton-' + button[4]);
  });

});

//</nowiki>