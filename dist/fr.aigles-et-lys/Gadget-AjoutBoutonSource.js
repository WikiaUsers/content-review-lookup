//{{:Projet:JavaScript/Script|AjoutBoutonSource}}
//<nowiki>

/*
* AjoutBoutonSource (la version originale était basée sur DeluxeBar de Dake, mais le gadget a été redéveloppé lors du passage à MediaWiki 1.18)
*
* Ajoute plusieurs boutons pour faciliter le « sourçage » lors de l'édition d'un article, avec possibilité de cacher certains boutons.
*
* Auteurs : Sanao (version originale), Arkanosis (seconde version pour MediaWiki ≥ 1.18)
* Dernière révision : 8 octobre 2011
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
      '{{Citation|', '}}',
      '2/26/Button_latinas',
      'Citation française',
      'citation_francaise'
    ],
    [
      '{{Citation étrangère|langue=' + getVarValue('langue_citation_etrangere', 'en') + '|', '}}',
      '0/05/Button_Anführung',
      'Citation étrangère',
      'citation_etrangere'
    ],
    [
      '', '{{à sourcer|date=' + getStrDateToday('m a') + '}}',
      '1/1a/Button_fact',
      'Section ou article à sourcer',
      'a_sourcer'
    ],
    [
      '{{Référence nécessaire|', '|date=' + getStrDateToday('m a') + '}}',
      '3/33/Button_unreferenced',
      'Référence nécessaire',
      'ref_nec'
    ],
    [
      '', '<ref>{{Lien web\n|url=\n|titre=\n|id=\n|série=\n|auteur=\n|lien auteur=\n|coauteurs=\n|date=\n|année=\n|mois=\n|site=\n|éditeur=\n|page=\n|citation=\n|en ligne le=\n|consulté le=' + getStrDateToday('j m a') + '\n}}</ref>',
      '3/3c/Button_lienweb',
      'Lien web',
      'lien_web'
    ],
    [
      '', '<ref>{{Article\n|langue=\n|prénom1=\n|nom1=\n|lien auteur1=\n|titre=\n|périodique=\n|lien périodique=\n|jour=\n|mois=\n|année=\n|volume=\n|numéro=\n|pages=\n|issn=\n|url texte=\n|consulté le=\n}}</ref>',
      'b/b4/Button_lienjournal',
      'Article',
      'article'
    ],
    [
      '', '<ref>{{ouvrage\n|langue=\n|prénom1=\n|nom1=\n|lien auteur1=\n|titre=\n|sous-titre=\n|numéro d\'édition=\n|éditeur=\n|lien éditeur=\n|lieu=\n|jour=\n|mois=\n|année=\n|volume=\n|tome=\n|pages totales=\n|passage=\n|isbn=\n|lire en ligne=\n|consulté le=\n}}</ref>',
      'e/ef/Button_cite_book',
      'Livre',
      'livre'
    ]
  ], function(_, button) {
    mw.toolbar.addButton('//images.wikia.com/aigles-et-lys/fr/images/' + button[2] + '.png', button[3], button[0], button[1], (button[0] ? button[4] : ''), 'mw-editbutton-' + button[4]);
  });

});

//</nowiki>