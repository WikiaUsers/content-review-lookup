/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */

/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {	RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.ilinks = [new RegExp('^[A-Za-z_ ]*:[^\/\/][^\n]*$')];
window.pPreview.RegExp.iclasses = ['no-link-preview'];
window.pPreview.noimage = 'https://gamestation.com.br/wp-content/themes/game-station/images/image-not-found.png';

/* ReadProgressBar */
window.enableReadProgressBarOnArticles = true;