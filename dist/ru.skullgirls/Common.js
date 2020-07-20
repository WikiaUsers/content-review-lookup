/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автообновление — начало; Spain Skullgirls Wiki */

window.ajaxPages = ["Служебная:WikiActivity", "Служебная:WikiActivity/watchlist", "Служебная:WikiActivity/activity", "Служебная:RecentChanges", "Служебная:NewFiles"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/skullgirls/images/f/fd/GIF_Ajax-loader_%28Skullgirls%29.gif/revision/latest?cb=20200112104141&path-prefix=ru';
window.ajaxRefresh = 1000;
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Включить автообновление страницы';
importScriptPage('AjaxRC/code.js', 'dev');

/* Автообновление — конец */

window.UserTagsJS = {
	modules: {},
	tags: {
		bot: { u: 'Дева Черепа' },
		botowner: { u: 'Сердце-Череп' }
	}
};
UserTagsJS.modules.custom = {
	'CinnamonZephyr': ['botowner'],
	'SkullgirlBot': ['bot']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;


/*WikiEditor/Викификатор*/
function addWikifButton() {
	var toolbar = document.getElementById('toolbar')
	if (!toolbar) return
	var i = document.createElement('img')
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
	i.alt = i.title = 'викификатор'
	i.onclick = Wikify
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
	addOnloadHook(addWikifButton)
}