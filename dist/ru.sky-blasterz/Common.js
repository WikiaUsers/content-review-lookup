/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/sky-blasterz/images/4/42/Loading.gif/revision/latest?cb=20240109143108&format=original&path-prefix=ru';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/sky-blasterz/images/7/7c/Noimage.png/revision/latest?cb=20240109143010&format=original&path-prefix=ru';
window.pPreview.scale = {r: '?', t: '/scale-to-width-down/350?'};