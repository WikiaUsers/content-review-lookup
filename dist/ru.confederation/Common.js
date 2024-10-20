/* == Локальная навигация == */
$(document).ready(function() {
    var wikiNames = [
        "Slavenska Konfederacija #🇭🇷 #🇧🇦",
		"Slovanská Konfederácia #🇸🇰",
		"Slovanská Konfederace #🇨🇿",
		"Slovanska Konfederacija #🇸🇮",
		"Słowiańska Konfederacja #🇵🇱",
		"Славянска Конфедерация #🇧🇬",
		"Славяноконфедерация #🇷🇺",
		"Словенска Конфедерација #🇷🇸",
		"Слов’яноконфедерація #🇺🇦",
		"Славянаканфедэрацыя #🇧🇾",
		"Slavianakanfederacyja #🇧🇾-latn",
		"Словјанска Конфедерација #isv-cyrl",
		"Slovjanska Konfederacija #isv-latn",
		"ⰔⰾⱁⰲⰬⰰⰍⰰ ⰍⱁⱀⱇⰵⰴⰵⱃⰰⱌⰻⰬⰰ #isv-glag"
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