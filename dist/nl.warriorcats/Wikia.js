setTimeout(function() {

whenRailReadyStop = 1;
$(function whenRailReady() {
        if ($('#WikiaRail section').length > 0) {
                $('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="facebookmodule"><iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FNederlandse-Warrior-Cats-Wiki%2F1409134292720791&amp;width&amp;height=700&amp;colorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=true&amp;show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:300px;" allowTransparency="true"></iframe></section>'); 
              
$('#WikiaRail section.module:last').after('<section style="padding: 0;" class="module" id="twittermodule"><a class="twitter-timeline"  href="https://twitter.com/WarriorCatsWiki"  data-widget-id="551113513016754177">Tweets van @WarriorCatsWiki</a></section>');
 
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
 
        } else {
                if (whenRailReadyStop < 60) {
                        setTimeout(function() {
                                whenRailReady();
setTimeout(function() {
 
},5000);
                        },1000);
                }
                whenRailReadyStop++;
        }
});
}, 1000);

//Languages door http://shadowofmordor.wikia.com/wiki/MediaWiki:Wikia.js by MarkvA
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['fi'] = '<img class="fi-image" width="22" height="16" src="https://vignette.wikia.nocookie.net/flags/images/f/f9/Finland.svg/revision/latest?cb=20081220204314" alt="Finnish">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="French">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags['cs'] = '<img class="cs-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg" alt="Čeština">'; 
	flags['lt'] = '<img class="lt-image" width="22" height="16" src="http://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg" alt="Lietuvos">';
 
 
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
			case "Español":
				languages['es'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Lietuvos":
			    languages['lt'] = href;
				break;
			case "Čeština":
			    languages['cs'] = href;
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
				$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
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