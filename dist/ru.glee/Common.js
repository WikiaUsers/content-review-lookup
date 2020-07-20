/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Language dropdown */
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:31px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/fallout/ru/images/thumb/8/8b/Icon_flag_en.png/16px-Icon_flag_en.png" alt="English">';
	flags['de'] = '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/fallout/images/e/e4/Icon_flag_de.png" alt="German">';
	flags['es'] = '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/fallout/images/c/c0/Icon_flag_es.png" alt="Spanish">';
	flags['ru'] = '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Russian">';
	flags['pl'] = '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/fallout/images/5/5e/Icon_flag_pl.png" alt="Polish">';
	flags['fr'] = '<img class="fr-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/fallout/images/4/4c/Icon_flag_fr.png" alt="Français">';
	flags['ja'] = '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japanese">';
	flags['pt-br'] = '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Brazilian Portuguese">';
	flags['zh'] = '<img class="zh-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/a/a1/Small-zh.png" alt="中文">';
	flags['uk'] = '<img class="uk-image" style="width:20px; height:15px; border-radius:3px" src="https://images.wikia.nocookie.net/wlb/images/a/a4/Small-uk.png" alt="Українська">';
	flags['it'] = '<img class="it-image" style="width:20px; height:15px; border-radius:3px" src="https://vignette.wikia.nocookie.net/masseffect/images/e/e9/Icon_it.png/revision/latest?cb=20151113180626&path-prefix=uk" alt="Italiano">';
 
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
		    case "Deutsch":
			    languages['de'] = href;
			    break;
			 case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
			case "Українська":
				languages['uk'] = href;
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
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});
 
/*Викификатор*/
(function() {
    if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
    }
})();