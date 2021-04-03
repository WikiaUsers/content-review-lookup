/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//================================================================================

// Следующий код меняет фоновое изображение страницы в зависимости от тега. 
// Внимание: порядок кода важен! От него зависит приоритетность изображения по отношению к игре
$(function(){
function changingBackground() {
var body = document.getElementsByTagName("body")[0]
	if ($('.theme-fc6').length > 0) { // Far Cry 6
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/5/50/Wiki-background/revision/latest?cb=20201102155050&format=original&path-prefix=ru)')}
    else if ($('.theme-fcnd').length > 0) { // Far Cry New Dawn
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/4/44/FCND_BG.jpg/revision/latest?cb=20190125210416&format=original&path-prefix=ru)')}
    else if ($('.theme-fc5').length > 0) { // Far Cry 5
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/a/a5/FC5_BG.jpg/revision/latest?cb=20180315084300&format=original&path-prefix=ru)')}
    else if ($('.theme-fcp').length > 0) { // Far Cry Primal
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/3/33/FCP_BG.jpg/revision/latest?cb=20180315084303&format=original&path-prefix=ru)')}
    else if ($('.theme-fc4').length > 0) { // Far Cry 4
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/6/6d/FC4_BG.jpg/revision/latest?cb=20180315084259&format=original&path-prefix=ru)')}
    else if ($('.theme-fc3bd').length > 0) { // Far Cry 3: BD
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/6/68/FCBD_BG.jpg/revision/latest?cb=20180315084302&format=original&path-prefix=ru)')}
    else if ($('.theme-fc3').length > 0) { // Far Cry 3
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/d/d1/FC3_BG.jpg/revision/latest?cb=20180315084259&format=original&path-prefix=ru)')}
    else if ($('.theme-fc2').length > 0) { // Far Cry 2
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/1/1a/FC2_BG.jpg/revision/latest?cb=20180315084258&format=original&path-prefix=ru)')}
    else if ($('.theme-fc').length > 0) { // Far Cry
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/4/4c/FCI_BG.jpg/revision/latest?cb=20180315084303&format=original&path-prefix=ru)')}
    else { // Если нет тега, то Far Cry 6
		body.setAttribute("style", 'background-image:url(https://static.wikia.nocookie.net/farcry/images/5/50/Wiki-background/revision/latest?cb=20201102155050&format=original&path-prefix=ru)')}
}
$(changingBackground);
});

//================================================================================

// Следующий код добавляет возможность автоматически отслеживать изменения рейтинга WAM нашей вики
// Источник: https://dev.wikia.com/wiki/RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

//================================================================================

// Следующий код добавляет настройки скрипта "Standard Edit Summary"
// Источник: https://dev.fandom.com/wiki/Standard_Edit_Summary?uselang=ru

window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'Шаблон:Описание правки'
};

//================================================================================
// Источник: https://fallout.fandom.com/ru/wiki/MediaWiki:GetWikiStatistics.js
// Получение данных с других вики
/**
 * This script allows to obtain some stats from other Wikia wikis and insert this data into articles on the wiki.
 * @author: Wildream
 * Written for https://ru.wikies.wikia.com
 * Data you can obtain:
 * * Article count
 * * Active users count
 * * Number of admins
 * * Number of edits made on the wiki
 * * Images count on the wiki
 * Usage:
 * You can get data specified above by adding next tags into article text:
 * <span class="outwikistats-[TYPE]"><span class="outwikistats-hidden">[URL]</span></span>
 * Where [TYPE] can be:
 * * articles - for article count
 * * activeusers - for active users count
 * * admins - for admins count
 * * edits - for number of edits
 * * images - for number of images
 * And [URL] should be an address of the wiki.
 * Example:  <span class="outwikistats-articles"><span class="outwikistats-hidden">https://community.wikia.com</span></span>
 * This will return an articles count on Community Central.
 *
 */
function getWikiStatistics(targetClass, prop) {
	if ($(targetClass).length) {
		$(targetClass).each(function () {
			var $this = $(this);
			$this.children().hide();
			$this.append('<img src="https://images.wikia.nocookie.net/__cb1396606660/common/skins/common/images/ajax.gif" />');
			wiki = $this.text();
			if (wiki.indexOf('https://') === -1) {
				wiki = 'https://' + wiki;
			}
			if (wiki.indexOf('.fandom.com') === -1) {
				wiki = wiki + '.fandom.com';
			}
			$.ajax({
				url: wiki + '/api.php',
				data: {
					action: 'query',
					meta: 'siteinfo',
					siprop: 'statistics',
					format: 'json'
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				crossDomain: true,
				type: 'GET',
				success: function (data) {
					if ($this.length) {
						$this.html(data.query.statistics[prop]).show();
					}
				}
			});
		});
	}
}
 
$(function () {
	getWikiStatistics('.outwikistats-articles', 'articles');
	getWikiStatistics('.outwikistats-activeusers', 'activeusers');
	getWikiStatistics('.outwikistats-admins', 'admins');
	getWikiStatistics('.outwikistats-edits', 'edits');
	getWikiStatistics('.outwikistats-images', 'images');
});

//================================================================================