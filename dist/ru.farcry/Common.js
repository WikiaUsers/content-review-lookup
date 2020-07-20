/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//================================================================================

// Следующий код меняет фоновое изображение страницы в зависимости от тега. 
// Внимание: порядок кода важен! От него зависит приоритетность изображения по отношению к игре

function changingBackground() {
    if ($('#WikiaPage').is(':has(.theme-fc6)')) { // Far Cry 6
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/d/df/FC6_Screenshot_03.jpg/revision/latest?cb=20200716151804&path-prefix=ru') fixed no-repeat center", opacity: "0.15" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fcnd)')) { // Far Cry New Dawn
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/4/44/FCND_BG.jpg/revision/latest?cb=20190125210416&path-prefix=ru') fixed no-repeat center", opacity: "0.15" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fc5)')) { // Far Cry 5
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/a/a5/FC5_BG.jpg/revision/latest?cb=20180315084300&path-prefix=ru') fixed no-repeat", opacity: "0.15" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fcp)')) { // Far Cry Primal
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/3/33/FCP_BG.jpg/revision/latest?cb=20180315084303&path-prefix=ru') fixed no-repeat", opacity: "0.15" });
    } 
    else if ($('#WikiaPage').is(':has(.theme-fc4)')) { // Far Cry 4
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/6/6d/FC4_BG.jpg/revision/latest?cb=20180315084259&path-prefix=ru') fixed no-repeat", opacity: "0.14" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fc3bd)')) { // Far Cry 3: BD
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/6/68/FCBD_BG.jpg/revision/latest?cb=20180315084302&path-prefix=ru') fixed no-repeat left", opacity: "0.15" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fc3)')) { // Far Cry 3
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/d/d1/FC3_BG.jpg/revision/latest?cb=20180315084259&path-prefix=ru') fixed no-repeat", opacity: "0.13" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fc2)')) { // Far Cry 2
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/1/1a/FC2_BG.jpg/revision/latest?cb=20180315084258&path-prefix=ru') fixed no-repeat", opacity: "0.15" });
    }
    else if ($('#WikiaPage').is(':has(.theme-fc)')) { // Far Cry
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/4/4c/FCI_BG.jpg/revision/latest?cb=20180315084303&path-prefix=ru') fixed no-repeat center", opacity: "0.15" });
    }
    else { // Если нет тега, то Far Cry 6
        $('.WikiaPageBackground').css({background: "url('https://vignette.wikia.nocookie.net/farcry/images/d/df/FC6_Screenshot_03.jpg/revision/latest?cb=20200716151804&path-prefix=ru') fixed no-repeat center", opacity: "0.15" });
    }
}
 
addOnloadHook(changingBackground);

//================================================================================

// Следующий код добавляет на служебные страницы переключатель «Автообновление страницы»
// Источник: http://ru.fallout.wikia.com/wiki/MediaWiki:Common.js
// Автообновление служебных страниц (AJAX Recent Changes)
var ajaxPages = ["Служебная:Contributions","Служебная:NewPages","Служебная:RecentChanges","Служебная:WikiActivity","Служебная:NewFiles","Служебная:Log","Служебная:Видео"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Включить автообновление';

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