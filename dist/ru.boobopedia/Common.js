/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* == Случайные названия == */
$(document).ready(function() {
    var wikiNames = [
        "Лучшая Вики по Бубе",
		"Куль!",
		"Бубопедия",
		"Буба Вики",
		"Веселье с 2014 года",
		"Также заходите на Буба Фанон Вики!",
		"Мы любим сыр",
		"Все о приключениях домовенка",
		"Не забудьте прочесть правила!"
    ];
    var randomIndex = Math.floor(Math.random() * wikiNames.length);
    var randomWikiName = wikiNames[randomIndex];
    var communityNameElements = document.getElementsByClassName('fandom-community-header__community-name');
    if (communityNameElements.length > 0) {
        communityNameElements[0].textContent = randomWikiName;
        communityNameElements[0].classList.add('noto-emoji');
    }
    var stickyHeaderElements = document.getElementsByClassName('fandom-sticky-header__sitename');
    if (stickyHeaderElements.length > 0) {
        stickyHeaderElements[0].textContent = randomWikiName;
        stickyHeaderElements[0].classList.add('noto-emoji');
    }
});