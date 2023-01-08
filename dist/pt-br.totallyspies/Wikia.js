/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['en'] = '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="English">';
	flags['pt'] = '<img class="pt-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pt.svg" alt="Portuguese">';
	flags['pt-br'] = '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Brazilian Portuguese">';
 
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
			case "Português do Brasil":
				languages['pt-br'] = href;
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

/*** Click tracking ***/
jQuery( function($) {
	var track = Wikia.Tracker.buildTrackingFunction({
		category: 'interlanguage-nav',
		action: Wikia.Tracker.ACTIONS.CLICK,
		trackingMethod: 'ga'
	});
	/** Wikia Interlanguage Default Link **/
	var $WikiaInterlanguageDefaultLink = $('nav.WikiaArticleInterlang');
	$WikiaInterlanguageDefaultLink.on( 'mousedown', 'a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-deafult-link'
		});
	} );
	/** WikiaInterlanguageCustomLink **/
	var $WikiaInterlanguageCustomLink = $('.WikiaPageHeader');
	$WikiaInterlanguageCustomLink.on( 'mousedown', '.chooselanguage a', function(e) {
		track({
			browserEvent: e,
			label: 'interlanguage-custom-link'
		});
	} );
} );

var NewFilesModuleCompact = 2; //must be 0, 1, or 2.
var NewFilesModuleCount = 13; //any integer
 
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>Novas Imagens</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 2) NewFilesModuleCompact = Math.floor(Math.random()*2);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
    $('head').append('<style type="text/css">\n#gallery- { overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em; height:150px; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; padding: 5px; margin-top: 0;}\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
} /* End of custom "NewFilesModule " */
/*</nowiki></pre>*/