/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/hayday/images/b/ba/Нет_рисунка.png/revision/latest?cb=20231106172309&format=original&path-prefix=ru';
window.pPreview.RegExp.noinclude = ['.ignor', '.portable-infobox'];
window.pPreview.delay = 1;
window.pPreview.tlen = 200;
window.pPreview.RegExp.iimages = [/Help\.png/];
window.pPreview.RegExp.iparents = ['.portable-infobox'];