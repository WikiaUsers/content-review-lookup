//{{:Projet:JavaScript/Script|DeluxeBar}}
//<nowiki>

/*
* Deluxe Bar
*
* Barre d'outils d'édition étendue
*
* Auteurs : Dake (version originale), Arkanosis (seconde version pour MediaWiki ≥ 1.18)
* Modifié par : Sanao
* Dernière révision : 7 mai 2012
*/

$(function() {

  if (['edit', 'submit'].indexOf(mw.config.get('wgAction')) == -1)
    return;

  $.each([
    // Format : pour chaque bouton
    // [
    //   'Texte à insérer',
    //   'Image du bouton (après « commons/ » et sans « .png » à la fin)',
    //   'Texte apparaissant dans la bulle au survol du bouton',
    //   'Identifiant de l'image ; importance faible, mais il faut s'assurer que l'identifiant est unique, ne change pas et n'utilise ni espace, ni caractères spéciaux'
    // ],
    [
      '{{subst:Bienvenu}} ~~~~',
      '1/12/Button_accueilA',
      'Bienvenue sur ta page !',
      'bienvenue_sur_ta_page'
    ],
    [
      '{{Bienvenue nouveau}}~~~~',
      'e/eb/Button_accueilB',
      'Bienvenue sur Wikipédia !',
      'bienvenue'
    ],
    [
      '{{subst:Bienvenue IP méritante}} ~~~~',
      '5/55/Button_accueilC',
      'Bienvenue IP méritante',
      'bienvenue_ip_meritante'
    ],
    [
      '{{subst:Merci IP}} ~~~~',
      'a/a9/Button_tournesol',
      'Merci IP',
      'merci_ip'
    ],
    [
      '{{Bloqué|1|jour}} ~~~~',
      '0/00/Button_vandale',
      'Blocage d\'un vandale',
      'blocage_vandale'
    ],
    [
      '{{subst:Vandalisme|article}} ~~~~',
      'a/a7/Button_smiley3',
      'Avertissement vandalisme',
      'avertissement_vandalisme'
    ],
    [
      '{{subst:Copieur|article|page copiée}} ~~~~',
      '5/58/Button_black_copyright',
      'Avertissement copyvio',
      'avertissement_copyvio'
    ],
    [
      '{{subst:Bienvenue spammeur|article}} ~~~~',
      'f/fb/Button_spam2',
      'Avertissement spam',
      'avertissement_spam'
    ],
    [
      '{{Fait}} ~~~~',
      'd/d9/Button_trait%C3%A9',
      'Fait',
      'fait'
    ]
  ], function(_, button) {
    mw.toolbar.addButton('//images.wikia.com/aigles-et-lys/images/' + button[1] + '.png', button[2], '', button[0], '', 'mw-editbutton-' + button[3]);
  });

});

//</nowiki>