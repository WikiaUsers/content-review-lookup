/* == Рельса == */
/* === Кастомные блоки, настройка AddRailModule === */
window.AddRailModule = ['Template:Случайная_статья_о_покемоне', 'Template:Новые статьи'];

/* === Предварительный просмотр страницы при наведении на ссылку (изменение для скрипта LinkPreview) === */
/* ==== Изменяет изображение, отображаемое, когда на странице нет изображений (взято с англовики) ==== */
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);
window.pPreview.defimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/pokemon/images/e/e3/No_Image.png';

/* === Фавикон для разных тем === */
const link = document.createElement('link');

link.rel = 'shortcut icon';
if ($('body').hasClass('theme-fandomdesktop-dark')) {
    link.href = 'https://pokemon.fandom.com/ru/wiki/Special:FilePath/Site-favicon-dark.ico';
} else if ($('body').hasClass('theme-fandomdesktop-light')) {
    link.href = 'https://pokemon.fandom.com/ru/wiki/Special:FilePath/Site-favicon-light.ico';
}

const head = document.getElementsByTagName('head')[0];
const existingLink = head.querySelector('link[rel="shortcut icon"]');

if (existingLink) {
  head.removeChild(existingLink);
}

head.appendChild(link);