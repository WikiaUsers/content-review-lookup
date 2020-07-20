/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:Images","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
/* Scripts located at [[MediaWiki:ImportJS]]                          */ 
 
/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="French">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['pt'] = '<img class="pt-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/5/5c/Flag_of_Portugal.svg" alt="Portuguese">';
	flags['pt-br'] = '<img class="pt-br-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/05/Flag_of_Brazil.svg" alt="Brazilian Portuguese">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';
 
 
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
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
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
 
/*More JS*/
$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});
 
// Add template to the upload page
// @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Category:Images]]');
        });
    }
}
 
/* This needs to be changed to only affect pages it's needed on
var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    prop,
    el = document.createElement('div');
 
for(var i = 0, l = props.length; i < l; i++) {
    if(typeof el.style[props[i]] !== "undefined") {
        prop = props[i];
        break;
    }
}
 
var xAngle = 0, yAngle = 0;
$('body').keydown(function(evt) {
    switch(evt.keyCode) {
        case 37: // left
            yAngle -= 90;
            break;
 
        case 38: // up
            xAngle += 90;
            evt.preventDefault();
            break;
 
        case 39: // right
            yAngle += 90;
            break;
 
        case 40: // down
            xAngle -= 90;
            evt.preventDefault();
            break;
    };
    document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
});
*/

/*** Ensure image load ******************************************************
 * Forces an image to load on startup
 * Loads images designed to load when scrolled past
 * For tabbers and collapsible content where images can
    appear at the top due to things above collapsing
 * Written by JBed of FFWiki
 ****************************************************************************/
function loadImagesInTabber() {
    var tabber = getElementsByClassName(document,"div","tabbertab");
    for (var i = 0; i < tabber.length; i++) {
        var images = tabber[i].getElementsByTagName("img");
        for (var ii = 0; ii < images.length; ii++) {
            loadHiddenImage(images[ii]);
        }
    }
}
 
function loadHiddenImage(sender) {
    var source = sender.getAttribute("data-src");
    if (source) {
        sender.src = source;
        sender.style.opacity = 1;
    }
}
addOnloadHook(loadImagesInTabber);