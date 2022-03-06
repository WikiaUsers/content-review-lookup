/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/* Prévisualisation des articles (paramètres de personnalisation) */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/lemondededisney/images/e/e6/Site-logo.png/revision/latest?cb=20210511194537&path-prefix=fr';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/lemondededisney/images/e/e6/Site-logo.png/revision/latest?cb=20210511194537&path-prefix=fr';