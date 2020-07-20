/* Any JavaScript here will be loaded for all users on every page load. */

//////////STATUS CHANGER
// Creator: Misza13
// Credits: Voyagerfan5761 for some minor improvements
// Modified by Xenocidic to simply use /Status as a one word indicator,
// Modified by Kraftlos to include Sleep status
// compatible with {{Statustop}} for display
 
addOnloadHook(function() {
    //Check if the config is defined
    if (typeof(statusChangerConfig) == 'undefined') {
        statusChangerConfig = {};
    }

    if (typeof(statusChangerConfig.statusList) == 'undefined') {
        statusChangerConfig.statusList = ['online', 'busy', 'around', 'offline', 'sleep'];
    }

    if (typeof(statusChangerConfig.statusPage) == 'undefined') {
        statusChangerConfig.statusPage = 'User:' + wgUserName + '/Status';
    }

    //Add the links
    for (var i = 0; i < statusChangerConfig.statusList.length; i++) {
        var stat = statusChangerConfig.statusList[i];
        var message = (stat === "sleep") ? link = "asleep" : link = stat;
        addPortletLink(
            "p-personal", //target tab - personal links
            wgServer + wgScript + "?title=" + statusChangerConfig.statusPage + "&action=edit&newstatus=" + stat, //link URL
            stat, //link text
            "pt-status-" + stat, //id of new button
            "I'm " + message + "!", //hover text
            "", //???
            document.getElementById("pt-logout")); //add before logout button
    }

    if (location.href.indexOf("&action=edit&newstatus=") == -1) return; //Are we here to auto-edit the status?
    //Get new status
    statusRegExp = /&action=edit&newstatus=(.*)/;
    var status = statusRegExp.exec(location.href)[1];
    //Modify the form
    document.getElementById('wpTextbox1').value = status;
    if (status == "sleep") {
        status = "sleeping";
    }
    document.getElementById('wpSummary').value = wgUserName + " is now " + status + ".";
    document.getElementById('wpMinoredit').checked = true;
    //Submit it!
    document.getElementById('editform').submit();
});
 
// JS for the ProfileMastheads
// From User:Rappy 4187 (Aion wikia)
 
// Put Status Indicator (ATW:SI) in ProfileMasthead
$(function() {
 
  // Support for Template:Statustop2
  if ($('.status.helpcursor').length) {
    switch( skin ) {
      case 'monobook':
        $('.status.helpcursor').appendTo('#firstHeading').css({float: 'right', fontSize: '12px', marginRight: '10px'}).prepend('Status: ').css('font-weight','bold');
        break;
      case 'oasis':
      case 'wikia':
        $('<li id="mastheadstatus"><span>Status</span></li>').prependTo('.masthead-info .details');
        $('.status.helpcursor').appendTo('.details li:first');
        break;
    }
  }
});
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/profileRedesign.js',
        'u:dev:Toggler.js'
    ]
});
/* Any JavaScript here will be loaded for all users on every page load. */
 
/* ====================================================================== *\
	# contribs links on anon's blog comments
	# script by Joeyaa, [[w:user:Joeyaa]]
\* ====================================================================== *
 
$('.details span[title]').each(function(){
	var t = $(this),
	title = $(this).attr("title");
	t.html('Unregistered user (IP: <a href="/wiki/Special:Contributions/' + title + '"  target="_blank" rel="nofollow">' + title + ')</a>');
}); */
 
 
/* ====================================================================== *\
	# custom edit buttons
\* ====================================================================== */
 
if (mwCustomEditButtons) {  
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Youtube_icon.svg/23px-Youtube_icon.svg.png",
		"speedTip": "Embed a YouTube Video",
		"tagOpen": "<nowiki><youtube>",
		"tagClose": "</youtube></nowiki>",
		"sampleText": "Video ID"};
 
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAXNSR0IArs4c6QAAAk9QTFRFAAAAgAAAAIAAgIAAAACAgACAAICAwMDAwNzApsrwAAAAQ1l4SGB7a3uQdYijhpixkKO9k6bAl6rEmq3HnrHLo7bQqLvVrb/YsMPds8bgus3nvc/owdTuxNjzydz20uT91+f+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTECL3QDwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCQccCQrY7AcAAACHSURBVCjPfchZDsMgEATR+jfOhldsSLj/JdNJjIRHKE+IHhW5qSe/Whz52dKRU4Jk/ekxQrTU9x12S33bYLPUQ4Bgqa8rrJb6ssBiqc8zzJb6NMFUlEt9HGEsyqk+DMBwKKe6954TBa/+kFP/BPV7Tfm76rca/Fb9WuNY9UuLo3ddVz194vo3NB0oZdoKj8sAAAAASUVORK5CYII=",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
		"speedTip": "Highlight",
		"tagOpen": "<span style='background:yellow'>",
		"tagClose": "</span>",
		"sampleText": "Highlighted text here."};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
		"speedTip": "Large Text",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Insert Text Here"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
		"speedTip": "Small Text",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Insert Text Here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_underline.png",
		"speedTip": "<u>Underline Selected Text</u>",
		"tagOpen": "<u> ",
		"tagClose": " </u>",
		"sampleText": "Insert text to underline!"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCBEoGHtVh6UAAAAMaVRYdENvbW1lbnQAAAAAALyuspkAAAIYSURBVDjLtVW7ihRBFD13uvYxa2hmICIo4scIJgqCoOAPmAhGfoEYGGxiIisL/oCIoIEiGGhiZKDsKLg7jbrs4AxOd92HQVXPw77twqKVnOCcunWq7rkUmZnhP6w797YQBvuAmYGIXARwJO7j7jeEKI3xLjwaFytFr65qTKsai3j71k3cuHYFg8GgxTW4/eghrl+9jGdPn7gaM0MwSoct4mDnE0YHBxiPfyYvjmZv9yvK4R7KctihIQRmbXcj31DFIKJuw5oYqPoaMkNgjm6jAECUIcJuw8w0FxdXQ0QIIgwygxHN0LJ1ZYbEeombaVTzDdTXGBBULZ+GGc6dG1iXuQY139AMrgYwhLqOnW9elkMUYcV988lkkgyIIEZ2FIQgIl21sXn/7qGTmBrarkGE9OZd1s+eO4+NjWNu0S+fd7D/43t6c7cGchRzNmeYrV+4eAknT51e5jJubz3Am9cvoWpg0ZZGU/Ho7QUAMDNijC2OAGhOi6j4GjOEyJxanto8RwDCAo6xzRHBNMdV1NeAEIS5wzcgqnn62ndrhk3/oslp+WPjLAmak9DeOM+5uRoiQmARENJUNti4FxGIyBLX4Hz81deYITSNWVxFEVJWewRRcWPW6xVZW3RoCLT5+EXrm2NmqAhW19Y6h8dMUU0rrPf7Lv/81TuE0WjcWeDXNB46oVXt719dLxDevv/wzz/nlX7AmRPH8RuTxxRrcgmtcAAAAABJRU5ErkJggg==",
		"speedTip": "History table",
		"tagOpen": "{|class=\"wikitable sortable\"\n! scope=\"col\"| Catalog\n! scope=\"col\"| Available from\n! scope=\"col\"| Available until\n|-\n|catalog goes here\n|starting date\n|ending date\n|}",
	};
}
 
 
/* ====================================================================== *\
	# [[Template:USERNAME]]
	# from Bloons wiki [[w:c:bloons]]
\* ====================================================================== */
 
$(function() {
	if (
		typeof wgUserName != 'undefined' && // user is logged in
		[1201,2001].indexOf(mw.config.get("wgNamespaceNumber")) === -1 // namespace != forum thread of board thread, due to template abuse
	) {
		$('.insertusername').html(wgUserName);
	}
});
 
 
/* ====================================================================== *\
	# hoverimage
\* ====================================================================== */
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});
 
 
 
/* ====================================================================== *\
	# title rewrite - jquery version and new wikia skin fixes by Grunny
\* ====================================================================== */
// BEGIN JavaScript title rewrite
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
// END JavaScript title rewrite
addOnloadHook(rewriteTitle);
 
 
/* ====================================================================== *\
	# interactive cp buttons
\* ====================================================================== */
 
function changeBgImage (image, id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = "url("+image+")";
}
function changeBgImage (image, id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = "url("+image+")";
}
 
 
/* ====================================================================== *\
	# hide toc for [[template:hidetoc]]
\* ====================================================================== */
 
if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}
 
 
/* ====================================================================== *\
	# fixing links to Club Penguin's RSS for [[Template:ClubPenguinRSS]]
	# a big credit for Mathmagician for making the script loop
\* ====================================================================== */
 
(function() {
	var markup = ".cprss-links > .wikiaRssPlaceholder > .wikiaRss";
	$("body").on("DOMNodeInserted", markup, function() {
		$(markup).find("a").each(function() {
			$(this).attr("href", "http://www.clubpenguin.com/" + $(this).attr("href"));
		});
	});
}());
 
 
/* ====================================================================== *\
	# [[Template:No license]] when no license is specified
\* ====================================================================== */
 
$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form" || e.target.action == "http://clubpenguin.wikia.com/wikia.php?controller=UploadPhotos&method=Upload&format=html") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "No license");
	}
});
 
 
/* ====================================================================== *\
	# auto-download an example logo for [[Club Penguin Wiki:Logo Design]]
\* ====================================================================== */
$("a#wiki-logo-blank").attr("download","example_logo.png");
 
 
/* ====================================================================== *\
	# irc installation - code by Super Miron, [[User:Super Miron]]
\* ====================================================================== */
if (mw.config.get("wgUserName")) {
	$(".irc").html("<iframe src='http://webchat.freenode.net?nick=" + wgUserName.split(' ').join('_').split('.').join('-') + "&channels=ClubPenguin-wikia&uio=d4' width='647' height='400'></iframe>");
}
 
 
/* ====================================================================== *\
	# chat log search - using google search
\* ====================================================================== */
 
// when link is pressed
$("a#chatlogs-search-button").mouseover(function() {
	if ($("input#chatlogs-search-box").val().length > 0) {
		var google = "https://www.google.com/#q=site:",
			site = encodeURIComponent("http://clubpenguin.wikia.com/wiki/Club_Penguin_Wiki:Chat/Logs/"),
			string = encodeURIComponent($("input#chatlogs-search-box").val().replace(/ /g, "+")),
			searchPage = google + site + "+" + string;
		$(this).attr("href", searchPage);
	}
});
 
// when enter is pressed (on the text box)
$("input#chatlogs-search-box").on("keypress", function(k) {
	if (k.keyCode == 13 && $("input#chatlogs-search-box").val().length > 0) {
		// if enter is pressed
		$("a#chatlogs-search-button")[0].click();
	}
});
 
 
/* ====================================================================== *\
	# use the api to list the chat logs
	# will not affect subpages of [[Club Penguin Wiki:Chat/Logs/misc]] (misc can begin with M)
\* ====================================================================== */
 
// will affect <span class="ChatLogsList"></span> in subpages of [[Club Penguin Wiki:Chat]]
if (mw.config.get("wgPageName").indexOf("Club_Penguin_Wiki:Chat/") == 0) {
	mw.util.addCSS(
		'span.ChatLogsList {\n' +
			'\tdisplay: none;\n' +
		'}\n' +
		'div.ChatLogsList {\n' +
			'\twidth: 400px;\n' +
			'\theight: 230px;\n' +
			'\tmargin: 10px auto 5px auto;\n' +
			'\tpadding: 0px;\n' +
			'\tbackground: #fafafa;\n' +
			'\tborder: 1px solid #cccccc;\n' +
		'}\n' +
		'div.ChatLogsList > div {\n' +
			'\tbackground: #cccce8;\n' +
			'\ttext-align: center;\n' +
			'\tfont-size: 14px;\n' +
			'\tline-height: 22px;\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'div.ChatLogsList > ul {\n' +
			'\tlist-style: none;\n' +
			'\toverflow-y: scroll;\n' +
			'\theight: 200px;\n' +
			'\tmargin: 2px;\n' +
			'\tpadding: 2px;\n' +
		'}'
	);
	$.getJSON("/api.php?action=query&format=json&list=allpages&apnamespace=4&apprefix=Chat/Logs/&aplimit=5000&cb=" + new Date().getTime(), function(data) {
		var a = data.query.allpages,
			b = [],
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		for (var i = 0; i < a.length; i++) {
			if (a[i].title.search(/Club Penguin Wiki\:Chat\/Logs\/[Mm]isc\//) == -1) {
				var t = a[i].title.split("/Logs/")[1].split(" ");
				b.push(t[2] + "-" + (String(months.indexOf(t[1])).length == 1 ? "0" + months.indexOf(t[1]) : months.indexOf(t[1])) + "-" + t[0]);
				if (i + 1 == a.length) {
					var c = b.sort().reverse(), // sort() to sort by dates, reverse() to change it direction so it sorted by recent dates
						d = [];
					for (var j = 0; j < c.length; j++) {
						var t = c[j].split("-"),
							u = months[Number(t[1])] + ' ' + t[2] + ', ' + t[0];
						d.push(
							'<li>' +
							'<a href="/wiki/Club_Penguin_Wiki:Chat/Logs/' +
							t[2] + '_' + months[Number(t[1])] + '_' + t[0] +
							'" title="Chat logs for ' +
							u +
							'">' +
							u +
							'</a>' +
							'</li>'
						);
						if (j + 1 == c.length) {
							$("span.ChatLogsList").replaceWith('<div class="ChatLogsList">\n<div>Chat logs</div>\n<ul>\n' + d.join('\n') + '\n</ul></div>');
						}
					}
				}
			}
		}
	});
}
 
 
/* ====================================================================== *\
	# DynamicImages settings
\* ====================================================================== */
DynamicImages = {
	svgIncreaseSrc: 3
}
 
 
/* ====================================================================== *\
	# importArticles - import codes from other wiki pages
	# before adding, it's recommended to move the pages to a subpage of
	  Common.js
	# also, make sure that you separate each page from the
	  array with a comma (,)
\* ====================================================================== */
 
importArticles({
	type: "script",
	articles: [
		"u:dev:PurgeButton/code.js",
		"u:dev:AjaxRC/code.js",
		"u:dev:ShowHide/code.js",
		"u:dev:DisplayClock/code.js",
		"u:zh.pad.wikia.com:MediaWiki:CountDown.js",
		"MediaWiki:Common.js/crestriction.js",
		"u:dev:DupImageList/code.js",
		"MediaWiki:Common.js/closeThread.js",
		"MediaWiki:Common.js/ThreadAdminBadges-load.js",
		"MediaWiki:Common.js/profileTags.js",
		"u:dev:DynamicImages/code.js",
//		mw.config.get("wgPageName").indexOf("Club_Penguin_Wiki:Chat/") == 0 ? "MediaWiki:Common.js/chatLogView.js" : "",
		"MediaWiki:Common.js/licenseHelp.js",
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/dynamicvote.js" // was Roger's idea [insert lenny here cause it breaks tab characters in common.js]
	]
}, {
	type: "style",
	articles: [
		"u:zh.pad.wikia.com:MediaWiki:CountDown.css"
	]
});
 
 
/* ====================================================================== *\
	# add to [[Template:Expansion]] a link to the incompleted section
\* ====================================================================== */
 
$("#mw-content-text").find("h1,h2,h3,h4,h5,h6").each(function(i) {
	if ($(this).next().hasClass("section-stub")) {
		$(this).next().find(".mbox-text > .expand").html('<a href="/wiki/' + encodeURIComponent(mw.config.get("wgPageName")) + '?action=edit&section=' + (i + 1) + '">expanding it</a>');
	}
});
 
 
/* ====================================================================== *\
	# [[Special:CSS]] modifications for interfaceeditors and admins
\* ====================================================================== */
 
if (mw.config.get("wgCanonicalSpecialPageName") == "CSS" && (mw.config.get("wgUserGroups").indexOf("sysop") > -1 || mw.config.get("wgUserGroups").indexOf("interfaceeditor") > -1)) {
	$(".css-editor-container .ace_indent-guide").css("opacity", "0.25");
	$('a[accesskey="a"]').attr("target", "_blank"); // open history in a new ticket
}
 
 
/* ====================================================================== *\
	# music templates
\* ====================================================================== */
 
$(function() {
	$("body").on("DOMNodeInserted", "object.musictemplate", function() {
		$('<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Audio-volume-muted.svg/24px-Audio-volume-muted.svg.png" class="musictemplate button" title="Toggle music" />')
			.prependTo("body")
			.click(function() {
				var urls = ["http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Audio-volume-muted.svg/24px-Audio-volume-muted.svg.png", "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Audio-volume-high.svg/24px-Audio-volume-high.svg.png"],
					src = $(this).attr("src"),
					isOn = urls.indexOf(src) == 1;
				$(this).attr("src", isOn ? urls[0] : urls[1]);
				$("object.musictemplate").each(function() {
					if ($(this).hasClass("musictemplate-off")) {
						$(this).attr({
							"data": $(this).attr("data-data"),
							"data-data": ""
						});
						$(this).removeClass("musictemplate-off");
					} else {
						$(this).attr({
							"data-data": $(this).attr("data"),
							"data": ""
						});
						$(this).addClass("musictemplate-off");
					}
				});
			});
		mw.util.addCSS(
			'@-moz-keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}@-webkit-keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}@keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}\n' +
			'img.musictemplate {\n' +
				'\tposition: fixed;\n' +
				'\ttop: 60px;\n' +
				'\tleft: 4px;\n' +
				'\tz-index: 9999;\n' +
				'\tpadding: 1px;\n' +
				'\tcursor: hand;\n' +
				'\tcursor: pointer;\n' +
				'\t-moz-animation: embedcontrol 5s infinite linear;\n' +
				'\t-webkit-animation: embedcontrol 5s infinite linear;\n' +
				'\tanimation: embedcontrol 5s infinite linear;\n' +
			'}'
 
		);
	});
	/* for [[Template:EmbedMusic]] */
	function EmbedMusic() {
		if (
			$("#mw-content-text span.EmbedMusic").length > 0 && // music fragments exist
			Number($("#mw-content-text span.EmbedMusic").first().text()) != NaN && // music has a valid input
			[2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1 // namespace: ["User", "User talk", "Template", "User blog"]
		) {
			$("#mw-content-text span.EmbedMusic").first().replaceWith(
				'<object width="0" height="0" data="http://media1.clubpenguin.com/play/v2/content/global/music/' +
				Number($("#mw-content-text span.EmbedMusic").first().text()) +
				'.swf" class="musictemplate embedmusic"></object>'
			);
		} else if ($("#mw-content-text span.EmbedMusic").length > 0) {
			console.log("Your music ID input for [[Template:EmbedMusic]] was not valid. Please try again.");
		}
	}
 
	if (mw.config.get("wgAction") == "edit") {
		// when ?action=edit
		$("body").on("DOMNodeInserted", ".WikiaArticle", function() {
			EmbedMusic();
		});
	} else {
		// not in the editor
		EmbedMusic();
	}
	/* for [[Template:MusicPlay]] */
	$(function() {
		// <span class="MusicPlay" data-repeat="repeat">File:FILENAME</span>
		function MusicPlay() {
			if ([2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1 && $.cookie("embedmusic") != "disabled") { // namespace: ["User", "User talk", "Template", "User blog"], also MusicPlay function not disabled by the client
				// file names array (includes the File: prefix)
				var titles = [];
 
				// all elements that require
				$("span.MusicPlay").each(function() {
					var slash = $(this).html().replace(/_/g," ").split("/"); // for dealing with old syntax, at least for now
					$(this).html(slash.length == 1 ? slash[0] : "File:" + decodeURIComponent(slash[slash.length-1]));
					var a = encodeURIComponent($(this).html());
					if (titles.indexOf(a) == -1) {
						titles.push(a);
					}
					$(this).attr("data-src", a);
				});
				$.getJSON("/api.php?action=query&format=json&prop=imageinfo&iiprop=mime|metadata|url&titles=" + titles.join("|") + "&cb=" + new Date().getTime(), function(data) {
					var a = data.query.pages;
					window.a = a; // DEBUGGING */
					for (var pageid in a) {
						// if file exists
						if (pageid > 0) {
							// if is .ogg
							if (a[pageid].imageinfo[0].mime == "application/ogg") {
								var embed =
									$('<object />').attr({
										"data": a[pageid].imageinfo[0].url,
										"type": "application/ogg",
										"height": "0",
										"width": "0",
										"class": "musictemplate MusicPlay"
									});
								/*
									could use for looping, if specified:
									a[pageid].imageinfo[0].metadata.[i/* 'i' has property 'length'*\/].value
								*/
								$('span[data-src="' + encodeURIComponent(a[pageid].title.replace(/&/g,"&amp;")) + '"].MusicPlay').replaceWith(embed);
							}
						} else {
							// file doesn't exist- modify 'span.MusicPlay' element
							$('span[data-src="' + encodeURIComponent(a[pageid].title) + '"].MusicPlay').each(function() {
								var errorFilename = a[pageid].title.replace(/"/g,"\\");
								$(this).html(
									'<!-- MusicPlay Error: couldn\'t find file named "' + errorFilename + '" -->'
								);
								console.error('MusicPlay Error: couldn\'t find file named "' + errorFilename + '"');
							});
						}
					}
				});
			}
		}
		if (mw.config.get("wgAction") == "edit") {
			// when ?action=edit
			$(window).on("EditPageAfterRenderPreview", function() {
				MusicPlay();
			});
		} else if ($("span.MusicPlay").length > 0) {
			// not in the editor but 'span.MusicPlay' exists
			MusicPlay();
		}
	});
});
 
 
/* ====================================================================== *\
	# adding SVG section to the article [[Color]]
\* ====================================================================== */
 
if (mw.config.get("wgPageName") == "Color" && typeof window.SVGAElement !== "undefined") {
	// page is [[Color]] and the client supports SVG
	$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:ArticleColorInteractive&rvprop=content&cb=" + new Date().getTime(), function(data) {
		var a = data.query.pages;
		for (var pageid in a) {
			var content = a[pageid].revisions[0]["*"];
			$("table#color-table").after(
				'<h3><span class="mw-headline" id="color_svg">Interactive Color Preview</span></h3>\n' +
				content
			);
			$("svg#colors-cp-interactive").css({
				"display": "block",
				"margin": "auto"
			});
			$("svg#colors-cp-interactive .color-svg-icon-container").mouseover(function() {
				var fill = $(this).find(".color-svg-icon").css("fill");
				$("svg#colors-cp-interactive .color-svg-target").each(function() {
					$(this).css("fill", fill);
				});
			});
		}
	});
}
 
 
/* ====================================================================== *\
	# remove extra breaks from featured blog posts on the main page
\* ====================================================================== */
 
if (mw.config.get("wgPageName") == "Club_Penguin_Wiki") {
	$(".WikiaBlogListingPost blockquote p").each(function() {
		if ($(this).html() == "<br>") {
			$(this).remove();
		}
	});
	$(".WikiaBlogListingPost blockquote br + br").remove();
}
 
 
/* ====================================================================== *\
	# $cp api
\* ====================================================================== */
 
/* global object */
$cp = {};
 
/* json */
$cp.json = {};
 
// values
$cp.json.val = {};
 
// get function
$cp.json.get = function(a) {
	var lang = a.lang == "pt" ? "pt" : a.lang == "fr" ? "fr" : a.lang == "es" ? "es" : a.lang == "de" ? "de" : a.lang == "ru" ? "ru" : "en",
		file = a.file;
		url = "http://media1." + (["characters", "worlds"].indexOf(a.file) > -1 ? "friends.go.com/content/disney-land-clubpenguin/" + lang + "/" : ["lands", "text"].indexOf(a.file) > -1 ? "friends.go.com/content/" + lang + "/" : ["markup", "images"].indexOf(a.file) > -1 ? "friends.go.com/content/" : "clubpenguin.com/play/" + lang + "/web_service/game_configs/") + a.file + ".jsonp?" + new Date().getTime(),
		cb = ["lands", "characters", "text", "markup", "images", "worlds"].indexOf(a.file) > -1 ? a.file + "Data" : "cp_" + a.file,
		onSuccess = typeof a.success === "function" ? a.success : function() {console.log("Finished loading '" + file + "' file as JSONP (" + lang + ")");};
	if (typeof $cp.json.val[lang] === "undefined") {
		// if language object is missing
		$cp.json.val[lang] = {};
	}
	if (typeof $cp.json.val[lang][file] === "undefined") {
		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonpCallback: cb,
			success: function(data) {
				$cp.json.val[lang][file] = data;
				onSuccess(data);
			}
		});
	} else {
		// file has already been loaded - execute onSuccess without reloading resource
		onSuccess($cp.json.val[lang][file]);
	}
}
 
// get multiple resources
$cp.json.multi = function(a, b) {
	var arg = Array.prototype.slice.apply(arguments),
		toget = arg[0],
		onDone = arg[1];
	function get() {
		if (toget.length > 0) {
			var newReq = toget.shift();
			newReq.success = function() {
				if (toget.length == 0) {
					if (typeof onDone === "function") {
						onDone();
					}
				} else {
					get();
				}
			}
			$cp.json.get(newReq);
		}
	}
	get();
}
 
/*
	player card generator
	special thanks: [[User:Hey.youcp]], [[User:Kallie Jo]]
*/
$cp.card = {};
 
// core components
$cp.card.fn = {};
$cp.card.data = {};
 
// data
	// type ids by item ids
$cp.card.data.items = {};
	// order of items, from back to front
$cp.card.data.clothingTypes = {
	"1": "color",
	"2": "head",
	"3": "face",
	"4": "neck",
	"5": "body",
	"6": "hand",
	"7": "feet",
	"8": "pin",
	"9": "background"
};
	// array of back items, containing item ids
$cp.card.data.backItems = [];
	// layer depths by item ids
$cp.card.data.layer = {};
	// array of items with custom depth
$cp.card.data.layerItems = [];
	// dimensions limits for canvas
$cp.card.data.dimensions = {
	min: 10,
	def: 88
};
	// blank image - used if a given item has no image
$cp.card.data.blank = mw.config.get("wgBlankImgUrl");
	// puffle and puffle info-related data
$cp.card.data.puffle = {
	// puffle_filenames required as no jsonp or cross-domain json request are available
	puffle_filenames: {"0": "", "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "", "11": "", "1000": 2, "1001": 4, "1002": 5, "1003": 0, "1004": 6, "1005": 1, "1006": 0, "1007": 8, "1008": 3, "1009": 8, "1010": 1, "1011": 0, "1012": 3, "1013": 1, "1014": 7, "1015": 5, "1016": 0, "1017": 2, "1018": 5, "1019": 4, "1020": 6, "1021": 7, "1022": 4, "1023": 0},
	puffleitems: {}
}
 
// functions
	// create a new canvas node
$cp.card.fn.newCard = function(obj) {
	var canvas = document.createElement("canvas"),
		_sizes = [60, 88, 95, 300, 600], // sorted from in an ascending order (!!!)
		size = undefined,
		srcSize = undefined;
	// update the canvas element
	canvas.className = "player-card-gen" + (obj.transparent ? " player-card-gen-transparent" : "");
	canvas.innerHTML = 'Sorry! Your browser does not support the <span style="font-style: italic;">&lt;canvas&gt;</span> element';
	// take care for setting dimensions and source sizes
	for (var i in _sizes) {
		if (obj.size <= _sizes[i]) {
			size = obj.size;
			srcSize = _sizes[i];
			break;
		}
	}
	if (size && size < $cp.card.data.dimensions.min) {
		// if is set but is smaller than minimum permitted dimensions
		size = $cp.card.data.dimensions.min;
		srcSize = 60;
	} else if (!size) {
		// no size matched
		size = $cp.card.data.dimensions.def;
		srcSize = $cp.card.data.dimensions.def;
	}
	// give the element some data
	$(canvas).data({
		outfit: {},
		src: srcSize,
		size: size
	});
	for (var typeId in $cp.card.data.clothingTypes) {
		$(canvas).data().outfit[$cp.card.data.clothingTypes[typeId]] = null;
	}
	// add ids based on 'obj'
	for (var i in obj.items) {
		var id = obj.items[i];
		if ($cp.card.data.items[id]) {
			var type = $cp.card.data.items[id];
			$(canvas).data().outfit[$cp.card.data.clothingTypes[type]] = id;
		}
	}
	// puffle content
	$(canvas).data().puffle = {
		puffle: obj.puffle.puffle,
		items: {
			head: null
		}
	};
	for (var i in obj.puffle.items) {
		var id = obj.puffle.items[i];
		if ($cp.card.data.puffle.puffleitems[id] == "head") {
			$(canvas).data().puffle.items.head = id;
		}
	}
	// set blue color as default
	if (!$.isNumeric($(canvas).data().outfit.color)) {
		$(canvas).data().outfit.color = 1; // set outfit to blue by default
	}
	$(canvas).attr({
		width: size,
		height: size
	});
	return canvas;
}
	// update canvas content based on its data
$cp.card.fn.update = function(node) {
	$cp.card.fn.clear(node);
	var ids = [],
		existingIds = $cp.card.fn.layerify($cp.card.fn.getClothingIds(node)), // ordered by layers
		hasCheckedBackItems = false,
		data = $(node).data();
	for (var i in existingIds) {
		var id = existingIds[i];
		if ($.isNumeric(id)) {
			if ($cp.card.data.clothingTypes[$cp.card.data.items[id]] == "background") {
				ids.push(id);
			}
			if (
				data.outfit.neck && // neck item is defined
				$cp.card.data.backItems.indexOf(data.outfit.neck) > -1 && // nack item has a back version
				!hasCheckedBackItems && // back item has still not been added
				$cp.card.data.clothingTypes[existingIds[i]] != "background" // this isn't the background layer
			) {
				ids.push("http://mobcdn.clubpenguin.com/game/items/images/paper/image/" + data.src + "/" + data.outfit.neck + "_back.png");
				hasCheckedBackItems = true;
			}
			if ($cp.card.data.clothingTypes[$cp.card.data.items[id]] != "background") {
				// need to check before and after the back item, to make sure that it's not loaded behind the background
				ids.push(id);
			}
		}
	}
	function success() {
		if (ids.length > 0) {
			$cp.card.fn.loadImage(node, ids.shift(), success);
		} else {
			$cp.card.fn.updatePuffle(node);
		}
	}
	success();
}
	// update - puffle and puffle items version
$cp.card.fn.updatePuffle = function(node) {
	var data = $(node).data(),
		urls = [];
	// see what urls to get
	if ($.isNumeric(data.puffle.items.head)) { 
		// if puffle head item exist
		// start with the back of the hat
		urls.push("http://mobcdn.clubpenguin.com/game/items/images/puffles/hats/player_card/" + data.src + "/" + data.puffle.items.head + "_back.png");
		if ($.isNumeric(data.puffle.puffle)) {
			// if puffle specified, add image next
			var filedata = String($cp.card.data.puffle.puffle_filenames[data.puffle.puffle]);
			urls.push("http://mobcdn.clubpenguin.com/game/items/images/puffles/paper/" + data.src + "/" + (filedata.length > 0 ? filedata + "_" + data.puffle.puffle : data.puffle.puffle) + ".png");
		}
		// add front hat part
		urls.push("http://mobcdn.clubpenguin.com/game/items/images/puffles/hats/player_card/" + data.src + "/" + data.puffle.items.head + ".png");
	} else if ($.isNumeric(data.puffle.puffle)) {
		// if no puffle head item exists, but a puffle is specified
		var filedata = String($cp.card.data.puffle.puffle_filenames[data.puffle.puffle]);
		console.info("filedata: " + filedata + ", " + typeof filedata);
		urls.push("http://mobcdn.clubpenguin.com/game/items/images/puffles/paper/" + data.src + "/" + (filedata.length > 0 ? filedata + "_" + data.puffle.puffle : data.puffle.puffle) + ".png");
	}
	function success() {
		if (urls.length > 0) {
			$cp.card.fn.loadImage(node, urls.shift(), success);
		}
	}
	success();
}
	// clear canvas
$cp.card.fn.clear = function(node) {
	node.getContext("2d").clearRect(0, 0, 600, 600); // since 600 is the maximum possible width, no need to get the dimensions
}
	// add item
$cp.card.fn.addItem = function(node, type, id) {
	var data = $(node).data(),
		isChanged = true;
	switch (type) {
		case "clothing":
			var propType = $cp.card.data.clothingTypes[$cp.card.data.items[id]];
			if (propType) {
				data.outfit[propType] = Number(id);
			}
			break;
		case "puffle":
			var path = $cp.card.data.puffle.puffle_filenames[id];
			if (typeof path !== "undefined") {
				data.puffle.puffle = path.length > 0 ? path + "_" + id : id;
			}
			break;
		case "puffleitem":
			var propType = $cp.card.data.puffle.puffleitems[id];
			if (["head"].indexOf(propType) > -1 && typeof data.puffle.items[propType] !== "undefined") {
				data.puffle.items[propType] = Number(id);
			}
			break;
		default:
			isChanged = false;
	}
	if (isChanged) {
		$cp.card.fn.update(node);
	}
}
	// remove item
$cp.card.fn.removeItem = function(node, type, id) {
	var data = $(node).data(),
		isChanged = true;
	switch (type) {
		case "clothing":
			var propType = $cp.card.data.clothingTypes[$cp.card.data.items[id]];
			if (propType && data.outfit[propType] == Number(id)) {
				data.outfit[propType] = null;
			}
			break;
		case "puffle":
			data.puffle.puffle = null;
			break;
		case "puffleitem":
			var propType = $cp.card.data.puffle.puffleitems[id];
			if (["head"].indexOf(propType) > -1 && typeof data.puffle.items[propType] !== "undefined" && data.puffle.items[propType] == Number(id)) {
				data.puffle.items[propType] = null;
			}
			break;
		default:
			isChanged = false;
	}
	if (isChanged) {
		$cp.card.fn.update(node);
	}
}
	// load image using canvas.drawImage()
$cp.card.fn.loadImage = function(node, id, success) {
	var img = new Image,
		data = $(node).data();
	img.src = $.isNumeric(id) ? "http://mobcdn.clubpenguin.com/game/items/images/paper/image/" + data.src + "/" + id + ".png" : id;
	img.onload = function() {
		node.getContext("2d").drawImage(img, 0, 0, data.size, data.size);
		success();
	}
	img.onerror = function() {
		// loading eror / no image exists for that item
		$cp.card.fn.loadImage(node, $cp.card.data.blank, success);
	}
}
	// apply on <span> placeholder node
$cp.card.fn.apply = function(node) {
	$(node).addClass("player-card-gen-que");
	var obj = {
		puffle: {}
	};
	if ($.isNumeric($(node).attr("data-size"))) {
		obj.size = Number($(node).attr("data-size"));
	}
	if (typeof $(node).attr("data-items") === "string") {
		var temp = $(node).attr("data-items").split(","),
			items = [];
		for (var i in temp) {
			if ($.isNumeric(temp[i])) {
				items.push(Number(temp[i]));
			}
		}
		obj.items = items;
	}
	if (typeof $(node).attr("data-puffle") === "string") {
		var id = $(node).attr("data-puffle").match(/^ *(\d+)/);
		if ($.isArray(id)) {
			obj.puffle.puffle = id[1];
		}
	}
	if (typeof $(node).attr("data-puffle-items") === "string") {
		var temp = $(node).attr("data-puffle-items").split(","),
			items = [];
		for (var i in temp) {
			if ($.isNumeric(temp[i])) {
				items.push(Number(temp[i]));
			}
		}
		obj.puffle.items = items;
	}
	if (["1", "yes", "true", "transparent"].indexOf($(node).attr("data-transparent")) > -1) {
		obj.transparent = true;
	}
	var canvas = $cp.card.fn.newCard(obj);
	$(node).replaceWith(canvas);
	window.q = canvas; // debugging
	$cp.card.fn.update(canvas);
}
	// go through matching <span> nodes and update
$cp.card.fn.exe = function() {
	$("span.player-card-gen:not(.player-card-gen-que)").each(function() {
		if (!$(this).hasClass("player-card-gen-que")) { // in case its been called twice or more for some reason
			$cp.card.fn.apply(this);
		}
	});
}
 
	// order items by layers
$cp.card.fn.layerify = function(ids) {
	var layers = [],
		orderByLayers = [],
		idsByLayers = {};
	for (var i in ids) {
		layers.push($cp.card.data.layer[ids[i]]);
		idsByLayers[layers[i]] = ids[i];
	}
	layers = $cp.card.fn.ascend(layers);
	for (var i in layers) {
		orderByLayers.push(idsByLayers[layers[i]]);
	}
	return orderByLayers;
}
 
	// order numbers in an ascending order
$cp.card.fn.ascend = function(arr) {
	// from MDN, modified version https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	return arr.concat().sort(function(a, b) {
		return a - b;
	});
}
 
	// get list of clothing ids
$cp.card.fn.getClothingIds = function(node) {
	var ids = [],
		outfit = $(node).data().outfit;
		types = $cp.card.data.clothingTypes;
	for (var typeId in types) {
		if ($.isNumeric(outfit[$cp.card.data.clothingTypes[typeId]])) {
			ids.push(outfit[$cp.card.data.clothingTypes[typeId]]);
		}
	}
	return ids;
}
 
// load json data
$cp.json.multi(
	[
		{file: "paper_items"},
		{file: "puffle_items"}
	],
	function(data) {
		var clothing = $cp.json.val.en.paper_items,
			puffleitems = $cp.json.val.en.puffle_items;
		for (var i in clothing) {
			var a = clothing[i],
				id = a.paper_item_id,
				type = a.type;
			$cp.card.data.items[id] = type;
			if ([a.is_back, a.has_back].indexOf("1") > -1) {
				$cp.card.data.backItems.push(id);
			}
			if ([a.is_back, a.has_back].indexOf("1") > -1) {
				$cp.card.data.backItems.push(id);
			}
			$cp.card.data.layer[id] = a.layer;
			if (a.hasOwnProperty("customDepth")) {
				$cp.card.data.layerItems.push(id);
			}
		}
		for (var i in puffleitems) {
			var a = puffleitems[i];
			$cp.card.data.puffle.puffleitems[a.puffle_item_id] = a.type;
		}
		// now execute
		$cp.card.fn.exe();
		$("body").on("DOMNodeInserted", "span.player-card-gen, :has(span.player-card-gen)", function() {
			$cp.card.fn.exe();
		});
	}
);
 
 
/* ====================================================================== *\
	# generate auto-updated table for listing clothing items from all types
\* ====================================================================== */
 
if ($("#mw-content-text span#number-of-clothing").length > 0) {
	$(function() {
		function apply() {
			var a = $cp.json.val.en["paper_items"],
				b = {1: 0/* colors */, 2: 0/* head */, 3: 0/* face */, 4: 0/* neck */, 5: 0/* body */, 6: 0/* hand */, 7: 0/* feet */, 8: 0/* pin-flag */, 9: 0/* bg */, 10: 0/* award */};
			for (var i = 0; i < a.length; i++) {
				b[a[i].type]++;
				if (i + 1 == a.length) {
					var markup = '<table class="wikitable">' +
									'\t<tbody>' +
 
										'\t\t<tr>' +
											'\t\t\t<th colspan="2">Number of Clothing Items</th>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<th>Type</th>' +
											'\t\t\t<th>Amount</th>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Head</td>' +
											'\t\t\t<td>' + b[2] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Face</td>' +
											'\t\t\t<td>' + b[3] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Neck</td>' +
											'\t\t\t<td>' + b[4] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Body</td>' +
											'\t\t\t<td>' + b[5] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Hand</td>' +
											'\t\t\t<td>' + b[6] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Feet</td>' +
											'\t\t\t<td>' + b[7] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Pins/Flags</td>' +
											'\t\t\t<td>' + b[8] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Awards</td>' +
											'\t\t\t<td>' + b[10] + '</td>' +
										'\t\t</tr>' +
 
										'\t\t<tr>' +
											'\t\t\t<td>Backgrounds</td>' +
											'\t\t\t<td>' + b[9] + '</td>' +
										'\t\t</tr>' +
 
									'\t</tbody>' +
								'</table>';
					$("span#number-of-clothing").replaceWith(markup); // <span id="number-of-clothing"></span>
				}
			}
		}
		$cp.json.get({
			file: "paper_items",
			success: apply
		});
	});
}
 
/* ====================================================================== *\
	# highlight comments of the blog post's author
\* ====================================================================== */
 
if (mw.config.get("wgNamespaceNumber") == 500) {
	var authorUsername = wgTitle.split('/')[0];
	appendCSS('\
	.comments li[data-user="' + authorUsername + '"] blockquote { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] .speech-bubble-message { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] blockquote:after { border-color: transparent lightgray lightgray transparent !important; }\
	');
}
 
 
/* ====================================================================== *\
	# dynamically generate player card image
\* ====================================================================== 
 
(function() {
	function foo() {
		$("span.player-card-image").each(function() {
			var a = $.parseJSON($(this).attr("data-search")),
				b = Number(a.size) > 0 && Number(a.size) <= 600 ? Number(a.size) : 60;
			if (a.id != "undefined") {
				$(this).replaceWith(
					'<img src="http://cdn.avatar.clubpenguin.com/%7B' + a.id + '%7D/cp?size=600&language=' + a.lang + '&photo=' + a.bg + '&flag=' + a.pin + '" width="' + b + '" height="' + b + '" />'
				);
			} else {
				$(this).replaceWith('<span style="color: red; font-family: monospace, arial, calibri; font-weight: bold;">Thumb error</span>');
			}
		});
	}
	foo();
	if (window.mediaWiki.config.get('skin') === 'oasis' && window.mediaWiki.config.get('wgAction') === 'edit') { // apply on editor by [[User:UltimateSupreme]]
		$(window).on('EditPageAfterRenderPreview', function() {
			foo();
		});
	}
}());
*/
 
/* ====================================================================== *\
	# remove video caption with file name if a caption was already specified
\* ====================================================================== */
 
$(document).ready(function() {
	$(".wikia-gallery .title + .lightbox-caption, figcaption > .title + .caption").prev().hide();
});
 
 
/* ====================================================================== *\
	# tree list for [[List of Safe Chat Messages]]
\* ====================================================================== */
 
if (mw.config.get("wgArticleId") == 367219) {
	// affects #scm-list-preload
	$cp.json.get({
		file: "safe_chat_messages",
		success: function(data) {
			function parse(a) {
				var markup = "";
				for (var i in a) {
					markup += '<li>' + (typeof a[i].menu !== "undefined" ? '<span class="scm-list-hasmenu">' + a[i].message + '</span>' + parse(a[i].menu) : a[i].message) + '</li>';
				}
				return '<ul>' + markup + '</ul>';
			}
			var el = $(parse(data));
			$(el).attr("id", "scm-list").prepend(
				'<li><span class="wikia-menu-button" data-button="show">&nbsp;show all&nbsp;</span> <span class="wikia-menu-button" data-button="hide">&nbsp;hide all&nbsp;</span> <span class="wikia-menu-button" data-button="toggle">&nbsp;toggle all&nbsp;</span></li>'
			);
			mw.util.addCSS("#scm-list {margin-left: 20px; font-size: 88%;} #scm-list li {list-style: none;} #scm-list ul {display: none;} .scm-list-hasmenu {font-weight: bold;}");
			$("#scm-list-preload").html(el);
			$("#scm-list .scm-list-hasmenu").click(function() {
				$(this).next().toggle(80);
			});
			$("#scm-list .wikia-menu-button").click(function() {
				$("#scm-list ul")[$(this).attr("data-button")](80);
			});
		}
	});
}
 
 
/* ====================================================================== *\
	# syntax for [[Template:ArticleTags]]
\* ====================================================================== */
 
$(function() {
	if ($(".article-tags").length == 1 && mw.config.get("wgNamespaceNumber") == 0) {
		function enc(s) {
			return s.replace(/&<>/g, function(m) {
				var a = {
					"&": "amp",
					"<": "lt",
					">": "gt"
				};
				return "&" + a[m] + ";";
			});
		}
		var data = {
			faweek: {
				image: "https://images.wikia.nocookie.net/clubpenguin/images/6/61/MiniFeature.png",
				url: "http://clubpenguin.wikia.com/wiki/Club_Penguin_Wiki:Featured_Article_of_The_Week",
				title: "This is a featured article."
			},
			fa: {
				image: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/0/04/7119_icon.png/20px-7119_icon.png",
				url: "http://clubpenguin.wikia.com/wiki/Club_Penguin_Wiki:Featured_Article",
				title: "This is a featured article."
			},
			fi: {
				image: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/2/29/Yellow_Hoodie.PNG/20px-Yellow_Hoodie.PNG",
				url: "http://clubpenguin.wikia.com/wiki/Club_Penguin_Wiki:Item_of_the_Month",
				title: "This article is about an item that was chosen to be the featured item."
			}
		};
		var tags = $(".article-tags").attr("data-tags").split(","),
			el = $('<div class="article-tags" style="margin-right: 10px; float: left;"></div>');
		for (var i in tags) {
			if (typeof data[tags[i]] === "object") {
				var name = tags[i],
				link = $('<a />');
				$(link).attr({
					href: data[name].url,
					title: enc(data[name].title + "\u0020Click here for more information.")
				});
				$(link).html('<img src="' + data[name].image + '" />');
				$(el).append(link);
			}
		}
		mw.util.addCSS(
			'.article-tags img {\n' +
				'\tvertical-align: middle;\n' +
			'}'
		);
		$("#WikiaPageHeader .tally:first").prepend(el);
	}
});
 
 
/* ====================================================================== *\
	# player card generator interface
\* ====================================================================== */
 
$(function() {
	if ([4].indexOf(mw.config.get("wgNamespaceNumber")) > -1) {
		// add css
		mw.util.addCSS(
			'.pc-generator p {\n' +
				'\tpadding: 2px 8px;\n' +
			'}\n' +
			'.pc-generator-field input[type="button"] {\n' +
				'\tborder: 1px solid #ccc;\n' +
			'}\n' +
			'.pc-generator-field input:first-child {\n' +
				'\tborder-radius: 8px 0 0 8px;\n' +
			'}\n' +
			'.pc-generator-field input:last-child {\n' +
				'\tborder-radius: 0 8px 8px 0;\n' +
			'}\n' +
			'.pc-generator-field input[type="text"] {\n' +
				'\twidth: 100px;\n' +
				'\tpadding-left: 3px;\n' +
				'\tbackground: #f2fcf5;\n' +
				'\tborder-color: #ccc;\n' +
				'\tborder-style: solid;\n' +
				'\tborder-width: 1px 0;' +
			'}\n' +
			'.pc-generator .explain {\n' +
				'\tfont-weight: bold;\n' +
			'}' +
			'#pc-generator-transparent {\n' +
				'\tdisplay: none;\n' +
			'}' +
			'#pc-generator-transparent + label span {\n' +
				'\tdisplay: inline-block;\n' +
				'\twidth: 11px;\n' +
				'\theight: 11px;\n' +
				'\tbackground: linear-gradient(to bottom, #fafafa, #eee);\n' +
				'\tborder: 1px solid #ccc;\n' +
				'\tborder-radius: 4px;\n' +
			'}' +
			'#pc-generator-transparent:checked + label span {\n' +
				'\tbackground: linear-gradient(to bottom, #bbb, #ddd);\n' +
			'}'
		);
 
		// insert html
		$(".pc-generator").replaceWith('<div class="pc-generator" style="width: 400px; margin: auto; border: 1px solid #ccc; background: white; text-align: center;">\n' +
			'\t<h3 style="font-weight: bold; font-size: 20px;">Player Card Generator</h3>\n' +
			'\t<span style="display: inline-block; zoom: 0.5;"><span class="player-card-gen" style="width: 600px; height: 600px;" data-size="600"></span></span>\n' +
			'\t<table style="width: 390px; width: calc(100% - 20px); margin: auto; border-collapse: separate; border-spacing: 0; text-align: left;">\n' +
				'\t\t<tbody>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a clothing ID for adding an item to the player card generator">Clothing items</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-item" data-type="clothing">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Clothing ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a puffle item ID for adding an item for your puffle in the player card generator">Puffle items</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-pitem" data-type="puffleitem">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Puffle item ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
					'\t\t\t<tr>\n' +
						'\t\t\t\t<td><span class="explain" title="Use a puffle species ID for adding a puffle to the player card generator">Puffle</span></td>\n' +
						'\t\t\t\t<td class="pc-generator-field pc-generator-field-puffle" data-type="puffle">\n' +
							'\t\t\t\t\t<input type="button" class="button" value="remove" /><!--\n' +
							'\t\t\t\t\t--><input type="text" placeholder="Puffle ID" /><!--\n' +
							'\t\t\t\t\t--><input type="button" class="button" value="add" />\n' +
						'\t\t\t\t</td>\n' +
					'\t\t\t</tr>\n' +
				'\t\t</tbody>\n' +
			'\t</table>\n' +
			'\t<p style="text-align: left;">\n' +
				'\t\t<input type="checkbox" id="pc-generator-transparent" style="display: none;" />\n' +
				'\t\t<label for="pc-generator-transparent"><span class="pc-generator-checkbox"></span> Transparent background</label>\n' +
			'\t</p>\n' +
		'</div>');
 
		// toggle transparency
		$("#pc-generator-transparent + label").click(function() {
			$(".pc-generator canvas").toggleClass("player-card-gen-transparent");
		});
 
		// add item
		$('.pc-generator input[value="add"]').click(function() {
			var id = $(this).prev().val().match(/\d+/);
			if ($.isArray(id)) {
				var id = Number(id[0]);
				$cp.card.fn.addItem(
					document.querySelector(".pc-generator canvas"),
					$(this).parent().attr("data-type"),
					id
				);
				$(this).prev().val("");
			}
		});
 
		// remove item
		$('.pc-generator input[value="remove"]').click(function() {
			var id = $(this).next().val().match(/\d+/);
			if ($.isArray(id)) {
				var id = Number(id[0]);
				$cp.card.fn.removeItem(
					document.querySelector(".pc-generator canvas"),
					$(this).parent().attr("data-type"),
					id
				);
				$(this).next().val("");
			}
		});
	}
});
 
 
/* ====================================================================== *\
	# names in other languages generator
\* ====================================================================== */
 
$(function() {
if ([4].indexOf(mw.config.get("wgNamespaceNumber")) > -1 && $("#interlangcp").length == 1) {
	var il = {};
	il.fn = {};
	il.data = {items: {}};
 
	/* =============================== *\
		# data
	\* =============================== */
 
	// id properties
	il.data.idProps = {
		paper_items: "paper_item_id",
		furniture_items: "furniture_item_id",
		puffle_items: "puffle_item_id",
		igloos: "igloo_id",
		igloo_locations: "igloo_location_id",
		igloo_floors: "igloo_floor_id",
		rooms: "room_id",
		stamps: "stamp_id"
	};
 
	// item name properties
	il.data.nameProps = {
		paper_items: "label",
		furniture_items: "label",
		puffle_items: "label",
		igloos: "name",
		igloo_locations: "label",
		igloo_floors: "label",
		rooms: "short_name",
		stamps: "name"
	};
 
	// css
	il.data.css = (
		'nav#interlangcp {\n' +
			'\twidth: 500px;\n' +
			'\theight: 400px;\n' +
			'\tmargin: 0 auto;\n' +
			'\tpadding: 0;\n' +
			'\tborder: 1px solid #cccccc;\n' +
			'\ttext-align: center;\n' +
		'}\n' +
		'nav#interlangcp .interlangcp-title {\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'nav#interlangcp p {\n' +
			'\tmargin: 10px;\n' +
			'\tpadding: 0;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp textarea {\n' +
			'\twidth: 400px;\n' +
			'\theight: 300px;\n' +
			'\tresize: none;\n' +
			'\ttext-align: left;\n' +
		'}\n' +
		'nav#interlangcp input[type="text"] {\n' +
			'\twidth: 400px;\n' +
		'}'
	);
 
	/* =============================== *\
		# functions
	\* =============================== */
	// prepare list of resources
	il.fn.getFilesConst = function(file) {
		var langs = ["pt", "fr", "es", "de", "ru"],
			arr = [];
		while (langs.length > 0) {
			arr.push({
				file: file,
				lang: langs.shift()
			});
		}
		return arr;
	}
	// import resources
	il.fn.getFiles = function(file, id) {
		$cp.json.multi(
			il.fn.getFilesConst(file),
			function() {
				il.fn.parseContent(file, id);
			}
		);
	}
	// parse content
	il.fn.parseContent = function(file, id) {
		if (!il.data.items.hasOwnProperty(file)) {
			il.data.items[file] = {};
			if (file == "stamps") {
				// special case for stamps
				il.fn.parseStampContent();
			} else {
				for (var i in $cp.json.val) {
					var lang = $cp.json.val[i];
					if (i != "en") { // in case en file has already been loaded by something else
						for (var j in lang[file]) {
							var _id = lang[file][j][il.data.idProps[file]];
							if (!il.data.items[file].hasOwnProperty(_id)) {
								il.data.items[file][_id] = {};
							}
							il.data.items[file][_id][i] = lang[file][j][il.data.nameProps[file]];
						}
					}
				}
			}
		}
		if (il.data.items[file].hasOwnProperty(id)) {
			il.fn.makeTable(file, id);
		} else {
			il.fn.enable("Error: ID " + id + " for that item type could not found. Please enter a different ID or try a different type");
		}
	}
	// parse content for stamp files
	il.fn.parseStampContent = function() {
		var file = "stamps";
		for (var lang in $cp.json.val) {
			var locale = $cp.json.val[lang][file];
			if (lang != "en") { // in case en file has already been loaded by something else
				for (var category in locale) {
					for (var item in locale[category].stamps) {
						var curr = locale[category].stamps[item],
							_id = curr.stamp_id,
							_name = curr.name;
						if (!il.data.items[file].hasOwnProperty(_id)) {
							il.data.items[file][_id] = {};
						}
						il.data.items[file][_id][lang] = _name;
					}
				}
			}
		}
	}
	// make table
	il.fn.makeTable = function(file, id) {
		var output = "",
			a = il.data.items[file][id]
		for (var lang in a) {
			output += "\n|" + lang + "= " + a[lang];
		}
		var txt = output.length > 0 ? "==Names in other languages==\n{{Language" + output + "\n}}" : il.fn.error(id);
		console.log(txt);
		il.fn.enable(txt);
	}
	// generate error message
	il.fn.error = function(id) {
		return "ERROR: no item with ID " + id + " for the given type could be found. Please make sure that the ID and the item type are correct";
	}
	// trigger
	il.fn.generate = function(file, id) {
		il.fn.getFiles(file, id);
	}
	// process inputs
	il.fn.process = function(file, id) {
		$("#interlangcp input, #interlangcp textarea, #interlangcp select")
			.attr("disabled", "disabled")
			.filter("textarea").val("Preparing resources...\nThis may take a few seconds on the first time for each item type");
		if (id.length > 0) {
			return il.fn.generate(file, id);
		} else {
			il.fn.enable("Please enter a valid ID");
		}
	}
	// de-disable form
	il.fn.enable = function(newTextareaText) {
		$("#interlangcp [disabled]")
			.removeAttr("disabled")
			.filter("textarea").val(newTextareaText);
	}
	// activation function
	il.fn.activation = function() {
		il.fn.process(
			$("#interlangcp-select").val(),
			$("#interlangcp-id").val().replace(/[^\d]/g, "")
		);
	}
 
	/* =============================== *\
		# implementation
	\* =============================== */
	// css
	mw.util.addCSS(il.data.css);
 
	// markup
	$("#interlangcp").replaceWith(
		'<nav id="interlangcp">\n' +
			'\t<p>\n' +
				'\t\t<span class="interlangcp-title">Item ID:</span> <input type="text" id="interlangcp-id" /><br />\n' +
				'\t\t<span class="interlangcp-title">Item sort:</span>\n' +
				'\t\t<select id="interlangcp-select">\n' + // orid = original order, during the development. not important
					'\t\t\t<option data-orid="0" value="paper_items">Clothing</option>\n' +
					'\t\t\t<option data-orid="1" value="furniture_items">Furniture</option>\n' +
					'\t\t\t<option data-orid="6" value="puffle_items">Puffle item</option>\n' +
					'\t\t\t<option data-orid="2" value="igloos">Igloo</option>\n' +
					'\t\t\t<option data-orid="3" value="igloo_locations">Igloo location</option>\n' +
					'\t\t\t<option data-orid="4" value="igloo_floors">Flooring</option>\n' +
					'\t\t\t<option data-orid="7" value="rooms">Rooms</option>\n' +
					'\t\t\t<option data-orid="7" value="stamps">Stamps</option>\n' +
				'\t\t</select><br />\n' +
				'\t\t<input type="button" id="interlangcp-go" value="go" />\n' +
			'\t</p>\n' +
			'\t<textarea></textarea>\n' +
		'</nav>'
	);
 
	// activation
	$("#interlangcp-go").click(function() {
		il.fn.activation();
	});
	$("#interlangcp-id").keydown(function(e) {
		if (e.keyCode == 13) {
			il.fn.activation();
		}
	});
}
});