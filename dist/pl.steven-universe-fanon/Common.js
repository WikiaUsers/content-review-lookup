// Pasek pokazujacy jaka czesc artykulu lub strony użytkownik zdazyl juz przeczytac; zimportowane poprzez dev:ReadProgressBar.js
window.enableReadProgressBarOnArticles = true;

// Podglad artykulu przy najechaniu kursorem na link; zimportowane poprzez dev:LinkPreview/code.js
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/steven-universe-fanon/images/e/e6/Site-logo.png/revision/latest?cb=20260705192804&path-prefix=pl';

// Oznaczenie nieaktywnego uzytkownika na profilu; zimportowane poprzez dev:InactiveUsers/code.js
InactiveUsers = {
	months: 12,
	text: 'Nieaktywny/a'
};
importScriptPage('InactiveUsers/code.js', 'dev');