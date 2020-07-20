/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';

/** Language dropdown **/
function appendLanguageDropdown() {
    var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:31px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/a/ad/Small-en.png" alt="English">';
	flags['cs'] = '<img class="cs-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/cz.svg" alt="Czech">';
	flags['de'] = '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="German">';
	flags['es'] = '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/es.svg" alt="Spanish">';
	flags['fi'] = '<img class="fr-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/fi.svg" alt="Suomi">';
	flags['fr'] = '<img class="fr-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/siegenax/ru/images/9/95/Flag_France.gif" alt="Français">';
	flags['it'] = '<img class="it-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/b/bf/Small-it.png" alt="Italiano">';
	flags['ja'] = '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japanese">';
	flags['pl'] = '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pl.svg" alt="Polish">';
	flags['pt-br'] = '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Brazilian Portuguese">';
	flags['ru'] = '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Russian">';
	flags['uk'] = '<img class="uk-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/a/a4/Small-uk.png" alt="Українська">';
	flags['zh'] = '<img class="zh-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/a/a1/Small-zh.png" alt="中文">';
	$('.WikiaPageHeader .comments').after(html);
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
		    case "Česky":
			    languages['cs'] = href;
			    break;
		    case "Deutsch":
			    languages['de'] = href;
			    break;
			 case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Українська":
				languages['uk'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
	
}
//Неактивные пользователи. 
InactiveUsers = { 
    months: 3,
    text: 'Неактивен'
};

//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

// Запрет на создание тем в архиве
// Взято у MLP вики
$(function() {
    if (wgPageName == 'Главная_тема:Архив') {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">В этой теме запрещено писать.</blockquote>');
    }
});
 
document.addEventListener('DOMContentLoaded', function() {
    var apperanceBlocks = document.getElementsByClassName( 'appBlock_apperanceBlock' );
    for ( var i = 0; i < apperanceBlocks.length; i++ )//var i -> let
        new ApperanceBlock( apperanceBlocks[ i ] );
});