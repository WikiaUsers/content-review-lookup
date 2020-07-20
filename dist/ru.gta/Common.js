/*Иконки*/
function addTitleIcons() {
	if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
		var insertTarget;
 
		switch (skin) {
			case 'monobook':
				insertTarget = $('#firstHeading');
				break;
			case 'oasis':
				if (wgAction != 'submit' && wgNamespaceNumber != 112) {
					insertTarget = $('#WikiaArticle');
				}
				break;
		}
		if (insertTarget) {
			$('#va-titleicons').css('display', 'block').prependTo(insertTarget);
		}
	}
}
jQuery(function($) {
	addTitleIcons();
});

function addWikifButton(){
 var toolbar = document.getElementById('toolbar')
 var textbox = document.getElementById('wpTextbox1')
 if (!textbox || !toolbar) return
 var i = document.createElement('img')
 i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
 i.alt = i.title = 'Викификатор'
 i.onclick = Wikify
 i.style.cursor = 'pointer'
 toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit'){
document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript"><\/script>')
 addOnloadHook(addWikifButton)
}
 
 
//TimedSlider
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});
 

window.DisplayClockJS = '%2H:%2M:%2S %2d %{ЯНВ;ФЕВ;МАР;АПР;МАЙ;ИЮН;ИЮЛ;АВГ;СЕН;ОКТ;НОЯ;ДЕК}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});
 
 
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.page-header .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html ='<nav style="background-color: #404040; border: 1px solid #4C4C4C; font-size: 12px;" class="wikia-menu-button secondary combined chooselanguage"> На других языках <img style="margin-top: 0px; margin-left: 2px; margin-right: 7px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"><ul style="min-width: 148px; margin-top: 0px; border: 1px solid '+borderColor+'; border-top: none; margin-left: 4px; text-align:left;" class="WikiaMenuElement" style="min-width:148px;"></ul></nav>';
	flags ={};
	flags['es'] = '<img class="es-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/9/9a/Flag_of_Spain.svg/27px-Flag_of_Spain.svg" alt="Испанский"> Испанский';
	flags['de'] = '<img class="de-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/9/96/Flag_of_Germany_2-3.svg/27px-Flag_of_Germany_2-3.svg" alt="Немецкий"> Немецкий';
	flags['en'] = '<img class="en-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/4/46/Flag_of_English_language.svg/27px-Flag_of_English_language.svg" alt="Английский"> Английский';
	flags['pl'] = '<img class="pl-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/8/82/Flag_of_Poland_2-3.svg/27px-Flag_of_Poland_2-3.svg" alt="Польський"> Польский';
	flags['pt'] = '<img class="pt-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/5/5c/Flag_of_Portugal.svg/27px-Flag_of_Portugal.svg" alt="Португальский"> Португальский';
	flags['fr'] = '<img class="fr-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/c/c3/Flag_of_France.svg/27px-Flag_of_France.svg" alt="Французкий"> Французский';
    flags['hu'] = '<img class="hu-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/b/bc/Civil_Ensign_of_Hungary.svg/27px-Civil_Ensign_of_Hungary.svg" alt="Венгерский"> Венгерский';
	flags['fi'] = '<img class="fi-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/5/50/Flag_of_Finland_2-3.svg/27px-Flag_of_Finland_2-3.svg" alt="Финский"> Финский';
	flags['uk'] = '<img class="uk-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/4/49/Flag_of_Ukraine.svg/27px-Flag_of_Ukraine.svg" alt="Украинский"> Украинский';
	flags['nl'] = '<img class="nl-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/2/20/Flag_of_the_Netherlands.svg/27px-Flag_of_the_Netherlands.svg" alt="Нидерландский"> Нидерландский';
	flags['zh'] = '<img class="zh-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/27px-Flag_of_the_People%27s_Republic_of_China.svg" alt="Китайский"> Китайский';
	flags['sv'] = '<img class="sv-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/9/9a/Flag_of_Sweden_2-3.svg/27px-Flag_of_Sweden_2-3.svg" alt="Шведский"> Шведский';
	flags['ar'] = '<img class="ar-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/b/bb/Arabic-Language-Flag.svg/27px-Arabic-Language-Flag.svg" alt="Арабский"> Арабский';
	flags['it'] = '<img class="it-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/0/03/Flag_of_Italy.svg/27px-Flag_of_Italy.svg" alt="Итальянский"> Итальянский';
	flags['ro'] = '<img class="ro-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/7/73/Flag_of_Romania.svg/27px-Flag_of_Romania.svg" alt="Румынский"> Румынский';
	flags['tr'] = '<img class="tr-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/b/b4/Flag_of_Turkey.svg/27px-Flag_of_Turkey.svg" alt="Турецкий"> Турецкий';
	flags['id'] = '<img class="vi-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/9/9f/Flag_of_Indonesia.svg/27px-Flag_of_Indonesia.svg" alt="Индонезийский"> Индонезийский';
	flags['vi'] = '<img class="vi-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/2/21/Flag_of_Vietnam.svg/27px-Flag_of_Vietnam.svg" alt="Вьетнамский"> Вьетнамский';
	flags['no'] = '<img class="no-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/f/f2/Flag_of_Norway_2-3.svg/27px-Flag_of_Norway_2-3.svg" alt="Норвежский"> Норвежский букмол';
    flags['et'] = '<img class="et-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/7/73/Flag_of_Estonia_2-3.svg/27px-Flag_of_Estonia_2-3.svg" alt="Эстонский"> Эстонский';
	flags['yue'] = '<img class="yue-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/5/5b/Flag_of_Hong_Kong.svg/27px-Flag_of_Hong_Kong.svg" alt="Кантонский"> Кантонский';
    flags['ja'] = '<img class="ja-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/9/9e/Flag_of_Japan.svg/27px-Flag_of_Japan.svg" alt="Японский"> Японский';
	flags['cs'] = '<img class="cs-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/c/cb/Flag_of_the_Czech_Republic.svg/27px-Flag_of_the_Czech_Republic.svg" alt="Чешский"> Чешский';
    flags['ka'] = '<img class="ka-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/0/0f/Flag_of_Georgia.svg/27px-Flag_of_Georgia.svg" alt="Грузинский"> Грузинский';
    flags['arc'] = '<img class="arc-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/2/25/Flag_of_Assyria.svg/27px-Flag_of_Assyria.svg" alt="Ассирийский"> Ассирийский';
    flags['el'] = '<img class="el-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/5/5c/Flag_of_Greece.svg/27px-Flag_of_Greece.svg" alt="Греческий"> Греческий';
    flags['be'] = '<img class="be-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/d/d9/Flag_of_Belarus_2-3.svg/27px-Flag_of_Belarus_2-3.svg" alt="Белорусский"> Белорусский';
	flags['he'] = '<img class="he-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/1/13/Flag_of_Israel_2-3.svg/27px-Flag_of_Israel_2-3.svg" alt="Иврит"> Иврит';
    flags['sr'] = '<img class="sr-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/f/ff/Flag_of_Serbia.svg/27px-Flag_of_Serbia.svg" alt="Сербский"> Сербский';
	flags['ca'] = '<img class="ca-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/c/ce/Flag_of_Catalonia.svg/27px-Flag_of_Catalonia.svg" alt="Каталанский"> Каталанский';
	flags['fa'] = '<img class="fa-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/8/85/Flag_of_Iran_2-3.svg/27px-Flag_of_Iran_2-3.svg" alt="Персидский"> Персидский';
	flags['af'] = '<img class="af-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/2/2a/Flag_of_South_Africa_%281928-1994%29.svg/27px-Flag_of_South_Africa_%281928-1994%29.svg" alt="Африкаанс"> Африкаанс';
    flags['da'] = '<img class="da-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/3/35/Flag_of_Denmark_2-3.svg/27px-Flag_of_Denmark_2-3.svg" alt="Датский"> Датский';
	flags['hy'] = '<img class="hy-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/e/e6/Flag_of_Armenia_2-3.svg/27px-Flag_of_Armenia_2-3.svg" alt="Армянский"> Армянский';
	flags['lt'] = '<img class="lt-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/2/28/Flag_of_Lithuania_2-3.svg/27px-Flag_of_Lithuania_2-3.svg" alt="Литовский"> Литовский';
    flags['ko'] = '<img class="ko-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/0/09/Flag_of_South_Korea.svg/27px-Flag_of_South_Korea.svg" alt="Корейский"> Корейский';
	flags['ru'] = '<img class="ru-image" width="27" height="18" src="https://images.wikia.nocookie.net/gta/ru/images/thumb/f/f3/Flag_of_Russia.svg/27px-Flag_of_Russia.svg" alt="Русский">';
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
            case "Português":
				languages['pt'] = href;
				break;
			case "Magyar":
				languages['hu'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Українська":
				languages['uk'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
            case "Svenska":
				languages['sv'] = href;
				break;
            case "العربية":
				languages['ar'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Română":
				languages['ro'] = href;
				break;
			case "Türkçe":
				languages['tr'] = href;
				break;
			case "Bahasa Indonesia":
				languages['id'] = href;
				break;				
			case "Tiếng Việt":
				languages['vi'] = href;
				break;
			case "‪Norsk (bokmål)‬":
				languages['no'] = href;
				break;
			case "Eesti":
				languages['et'] = href;
				break;
			case "粵語":
				languages['yue'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Česky":
				languages['cs'] = href;
				break;
			case "ქართული":
				languages['ka'] = href;
				break;
			case "ܐܪܡܝܐ":
				languages['arc'] = href;
				break;
			case "Ελληνικά":
				languages['el'] = href;
				break;
			case "Беларуская":
				languages['be'] = href;
				break;
			case "עברית":
				languages['he'] = href;
				break;
			case "Српски / Srpski":
				languages['sr'] = href;
				break;
			case "Català":
				languages['ca'] = href;
				break;
			case "فارسی":
				languages['fa'] = href;
				break;
			case "Afrikaans":
				languages['af'] = href;
				break;
			case "Dansk":
				languages['da'] = href;
				break;
			case "Հայերեն":
				languages['hy'] = href;
				break;
			case "Lietuvių":
				languages['lt'] = href;
				break;
			case "한국어":
				languages['ko'] = href;
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



function addTitleIcons() {
   if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
      var insertTarget;
 
      switch (skin) {
         case 'monobook':
            insertTarget = $('#firstHeading');
            break;
         case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
         case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
               insertTarget = $('#WikiaArticle');
            }
            break;
      }
 
      if (insertTarget) {
         $('#va-titleicons').css('display', 'block').prependTo(insertTarget);
      }
   }
}
 
jQuery(function($) {
   addTitleIcons();
});