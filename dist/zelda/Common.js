// Any JavaScript here will be loaded for all users on every page load. 

// --------------------------------------------------------
// Special:MovePage
// Uncheck "Leave a redirect behind" if moving a file
// --------------------------------------------------------
$(function() {
	
	var isMovingFile = mw.config.get("wgPageName").startsWith("Special:MovePage/File");
	if(isMovingFile) {
		var leaveRedirectCheckbox = $("input[name=wpLeaveRedirect]")[0];
		leaveRedirectCheckbox.checked = false;
	}
	
});

// --------------------------------------------------------
// Special:ExpandTemplates
// Check "Suppress <nowiki> tags in result" when using ExpandTemplates
// --------------------------------------------------------
$(function() {
	
	if (mw.config.get("wgPageName") == "Special:ExpandTemplates") {
		var suppressNowikiTagsCheckbox = $("input[name=wpRemoveNowiki]")[0];
		suppressNowikiTagsCheckbox.checked = true;
	}
	
});

// --------------------------------------------------
// Use altrow styling on Cargo tables
// --------------------------------------------------
$(function() {
	$(".cargoTable")
		.addClass('wikitable')
		.removeClass('cargoTable') //because the class overrides altrow styles
});

// --------------------------------------------------
/* Fix the wrong icons showing in the codeEditor buttons */
// --------------------------------------------------
$('#wpTextbox1').on('wikiEditor-toolbar-doneInitialSections',function(){
	$("#wikiEditor-section-main .group-codeeditor-main .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
});
mw.hook('codeEditor.configure').add(function(){
	$("#wikiEditor-section-main .group-codeeditor-format .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
	$("#wikiEditor-section-main .group-codeeditor-style .wikiEditor-toolbar-spritedButton").removeClass("wikiEditor-toolbar-spritedButton");
});

// --------------------------------------------------
// CrazyEgg Tracking
// --------------------------------------------------
setTimeout(function(){
	var a=document.createElement("script"),
	    b=document.getElementsByTagName("script")[0];
	a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0011/8371.js?"+Math.floor(new Date().getTime()/3600000);
	a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}
, 1);


// ------------------------------------------------
// Link to module dependencies 
// Author: RheingoldRiver
// ------------------------------------------------
$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Module:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.config.get('wgServer') + '/' + target;
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
});

// https://dev.fandom.com/wiki/OriginalImages
// Using thr original images, removing compression on images, notably pixel art
// and making .apng work again
(function(window, $) {
	if (window.imagesReplaced) {
		return;
	}
	
	window.imagesReplaced = true;
	
	//Infobox images
	$(".pi-image-thumbnail").each(function(){
		var srcsetvar = $(this).attr("srcset");
		var srcarray = srcsetvar.split(" ");
		$(this).attr("srcset", srcarray[0]+"&format=original");
	});

	//Other images
	function reload_imgs(target) {
		var srcvar = $(target).attr('src');
		var pattern = /(?:static|vignette|images)\.wikia\.nocookie\.net/;
		if (srcvar && !srcvar.endsWith('format=original') && pattern.exec(srcvar)) {
			if (srcvar.includes('?')) {
				$(target).attr('src', srcvar+'&format=original');
			} else {
				$(target).attr('src', srcvar+'?format=original');
			}
		}
		return;
	}
	document.body.addEventListener('load', function(event) {
		const target = event.target;
		if ($(target).is('img')) {
			reload_imgs(target);
		}
	}, true);
	$('.page__main img').each(function() {
		if(this.complete) { 
			reload_imgs(this);
		}
	});
})(this, jQuery);