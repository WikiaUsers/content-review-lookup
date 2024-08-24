/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/meaminecraft/images/4/40/SemImagem.png/revision/latest?cb=20231004234759&path-prefix=pt-br';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/meaminecraft/images/4/40/SemImagem.png/revision/latest?cb=20231004234759&path-prefix=pt-br';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];