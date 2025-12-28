/* Сюда добавляются скрипты, используемые вне основного блока (.mw-parser-output), */
/* т.е. зависящие от скина проекта                                                 */

/* [[MediaWiki:ImportJS]] для импорта скриптов */
/* [[MediaWiki:Common.js]] для скриптов в основном блоке (.mw-parser-output) */


//================================================================
// [[Template:Игры]]
if ( $('.va-titleicons').length ) {
	var previewCount = $('.va-titleicons-preview > a').length;
	var fullsizeCount = $('.va-titleicons-fullsize-content > a').length;
	
	if (previewCount < fullsizeCount) {
		$('.va-titleicons-preview').addClass('va-titleicons-showmore');
	}

    $('.va-titleicons').prependTo('.page-header__contribution > div:first-child');
    $('.va-titleicons').show();
}

//================================================================
// Новые статьи //
$(function(){
	if (
		$('#WikiaRail').length
		&& mw.config.values.wgCanonicalNamespace != 'Special'
		&& mw.config.values.wgCanonicalNamespace != 'MediaWiki'
	)
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModule&action=render');
});

//================================================================
// Простой генератор списка заголовков на [[Special:AchievementsCustomize]]

if(mw.config.values.wgPageName == 'Служебная:AchievementsCustomize' || 'Special:AchievementsCustomize') {
	$('.article-sidebar #AchievList').remove();
	$('<section class="module" id="AchievList" style="float: left;"><h2>Существующие треки</h2><ol></ol></section>').appendTo('.article-sidebar');

	var AchievHeaders = $('.customize-section h2');
	var AchievList = $('.customize-section h2');

	for (var n = AchievHeaders.length-1; n>=0; n--) {
		AchievList[n] = $(AchievHeaders[n]).text().replace(" трек изменён", "");
		$(AchievHeaders[n]).replaceWith('<h2>' + AchievList[n] + '</h2>');
	}

	AchievList.sort();

	for (var n = AchievList.length-1; n>=0; n--)
		$('<li>' + AchievList[n] + '</li>').prependTo('#AchievList ol');
}

//Снег
	
importArticle({
	
type: "script",
article: "MediaWiki:Snow.js"
	
});