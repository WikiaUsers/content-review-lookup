/* == Рельса == */
/* === Кастомные блоки, настройка AddRailModule === */
window.AddRailModule = ['Template:Чаты_нашей_вики', 'Template:Случайная_статья_о_покемоне', 'Template:Новые статьи'];

/* == Предварительный просмотр страницы при наведении на ссылку (изменение для скрипта LinkPreview) == */
/* Изменяет изображение, отображаемое, когда на странице нет изображений (взято с англовики) */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';

/* == Для статей-списков изучаемых покемонами движений == */
mw.loader.using('mediawiki.util', function() {
    var pageTitle = mw.config.get('wgTitle');
    if (/Изучаемые|learnset/i.test(pageTitle)) {
        var style = document.createElement('style');
        style.textContent = `
.roundy img {
    width: 35px;
    height: auto;
}

.mw-file-element.mw-broken-media {
    background-image: url('https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png/revision/latest?cb=20211113135653');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 35px;
    height: 35px;
    display: inline-block;
    border: none;
    text-indent: -9999px;
}
        `;
        document.head.appendChild(style);
    }
});