/* == Предварительный просмотр страницы при наведении на ссылку (изменение для скрипта LinkPreview) == */
/* Изменяет изображение, отображаемое, когда на странице нет изображений (взято с английской Pokemon Wiki) */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';