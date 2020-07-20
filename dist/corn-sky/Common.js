/* Any JavaScript here will be loaded for all users on every page load. */
 
// following script by w:user:joeyaa -- adds link to contribs for logged-out people's article/blog comments 
/*
$('.details span[title]').each(function(){
    var t = $(this),
    title = $(this).attr("title");
    t.html('Unregistered user (IP: <a href="/wiki/Special:Contributions/' + title + '"  target="_blank" rel="nofollow">' + title + ')</a>');
}); */


if (mwCustomEditButtons) {  
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Youtube_icon.svg/23px-Youtube_icon.svg.png",
		"speedTip": "Embed a YouTube Video",
		"tagOpen": "<nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><youtube>",
		"tagClose": "</youtube></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki>",
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

/*
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00 begin_of_the_skype_highlighting              01 2007 //00      end_of_the_skype_highlighting:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = '+';
  } else {
    var tpm = '';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
*/
/* for title templates */
// rewriteTitle();
 
 
// **************************************************
// "Username" template - from Bloons wiki
// **************************************************
 
$(function() {
  if (
    typeof wgUserName != 'undefined' && // user is logged in
    [1201,2001].indexOf(mw.config.get("wgNamespaceNumber")) === -1 // namespace != forum thread of board thread, due to template abuse
  ) {
     $('.insertusername').html(wgUserName);
  }
});
 
 
/* hoverimage */
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});


// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
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
 
 
// interactive CP buttons
 
function changeBgImage (image, id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = "url("+image+")";
}
function changeBgImage (image, id) {
	var element = document.getElementById(id);
	element.style.backgroundImage = "url("+image+")";
}
 
 
/* hiding the TOC for [[template:hidetoc]] */
if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}



/* fixing links to Club Penguin's RSS for [[Template:ClubPenguinRSS]] */
/* a big credit for Mathmagician for making the script loop */
(function() {
	var markup = ".cprss-links > .wikiaRssPlaceholder > .wikiaRss";
	$("body").on("DOMNodeInserted", markup, function() {
		$(markup).find("a").each(function() {
			$(this).attr("href", "http://www.clubpenguin.com/" + $(this).attr("href"));
		});
	});
}());


/* add [[Template:No license]] when the uploader skips the license selection */

$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form" || e.target.action == "http://clubpenguin.wikia.com/wikia.php?controller=UploadPhotos&method=Upload&format=html") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "No license");
	}
});

/* auto-download an example logo for [[Club Penguin Wiki:Logo Design]] */
// full support info at http://caniuse.com/download

$("a#wiki-logo-blank").attr("download","example_logo.png");


/* irc installation - code by Super Miron */
if (mw.config.get("wgUserName")) {
	$(".irc").html("<iframe src='http://webchat.freenode.net?nick=" + wgUserName.split(' ').join('_').split('.').join('-') + "&channels=ClubPenguin-wikia&uio=d4' width='647' height='400'></iframe>");
}


/* chat log search */

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


/* use the api to list the chat logs */
/* will not affect subpages of [[Club Penguin Wiki:Chat/Logs/misc]] (misc can begin with M) */

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


/* settings for DynamicImages - make gif images animated */

DynamicImages = {
	gifGalleryImages: true,
	gifImages: true,
	svgGalleryImages: false
};


/*
	import codes from other wiki pages
	before adding, it's recommended to move the pages to a
	subpage of Common.js
	also, make sure that you separate each page from the
	array with a comma (,)
*/

importArticles({
	type: "script",
	articles: [
		"u:dev:PurgeButton/code.js",
		"u:dev:AjaxRC/code.js",
		"u:dev:ShowHide/code.js",
		"u:dev:DisplayClock/code.js",
		"u:zh.pad.wikia.com:MediaWiki:CountDown.js",
		"u:dev:DupImageList/code.js",
		"MediaWiki:Common.js/closeThread.js",
		"MediaWiki:Common.js/ThreadAdminBadges-load.js",
		"MediaWiki:Common.js/profileTags.js",
		"u:dev:DynamicImages/code.js",
		mw.config.get("wgPageName").indexOf("Club_Penguin_Wiki:Chat/") == 0 ? "MediaWiki:Common.js/chatLogView.js" : ""
	]
}, {
	type: "style",
	articles: [
		"u:zh.pad.wikia.com:MediaWiki:CountDown.css"
	]
});


/* add to [[Template:Expansion]] a link to the incompleted section */
$("#mw-content-text").find("h1,h2,h3,h4,h5,h6").each(function(i) {
	if ($(this).next().hasClass("section-stub")) {
		$(this).next().find(".mbox-text > .expand").html('<a href="/wiki/' + encodeURIComponent(mw.config.get("wgPageName")) + '?action=edit&section=' + i + '">expanding it</a>');
	}
});


/* [[Special:CSS]] modifications for interfaceeditors and admins */
if (mw.config.get("wgCanonicalSpecialPageName") == "CSS" && (mw.config.get("wgUserGroups").indexOf("sysop") > -1 || mw.config.get("wgUserGroups").indexOf("interfaceeditor"))) {
	$(".css-editor-container .ace_indent-guide").css("opacity", "0.25");
	$('a[accesskey="a"]').attr("target", "_blank"); // open history in a new ticket
}


/* syntax for music templates */

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
				'\ttop: 41px;\n' +
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


/* adding SVG section to the article [[Color]] */

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


/* remove extra breaks from featured blog posts on the main page */

if (mw.config.get("wgPageName") == "Club_Penguin_Wiki") {
	$(".WikiaBlogListingPost blockquote p").each(function() {
		if ($(this).html() == "<br>") {
			$(this).remove();
		}
	});
	$(".WikiaBlogListingPost blockquote br + br").remove();
}


/* load JSON files of club penguin - loaded using JSONP */
/*
	example usage:

	cpJSON.get({
		file: "paper_items",
		lang: "en",
		success: function() {console.log("Success", cpJSON.values["en"]["paper_items"]);}
	});
*/

cpJSON = {};
cpJSON.values = {};
cpJSON.get = function(a) {
	var lang = a.lang == "pt" ? "pt" : a.lang == "fr" ? "fr" : a.lang == "es" ? "es" : a.lang == "de" ? "de" : a.lang == "ru" ? "ru" : "en",
		file = a.file;
		url = "http://media1." + (["characters", "worlds"].indexOf(a.file) > -1 ? "friends.go.com/content/disney-land-clubpenguin/" + lang + "/" : ["lands", "text"].indexOf(a.file) > -1 ? "friends.go.com/content/" + lang + "/" : ["markup", "images"].indexOf(a.file) > -1 ? "friends.go.com/content/" : "clubpenguin.com/play/" + lang + "/web_service/game_configs/") + a.file + ".jsonp?" + new Date().getTime(),
		cb = ["lands", "characters", "text", "markup", "images", "worlds"].indexOf(a.file) > -1 ? a.file + "Data" : "cp_" + a.file,
		onSuccess = typeof a.success === "function" ? a.success : function() {console.log("Finished loading '" + file + "' file as JSONP (" + lang + ")");};
	if (typeof cpJSON.values[lang] === "undefined") {
		// if language object is missing
		cpJSON.values[lang] = {};
	}
	if (typeof cpJSON.values[lang][file] === "undefined") {
		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonpCallback: cb,
			success: function(data) {
				cpJSON.values[lang][file] = data;
				onSuccess();
			}
		});
	} else {
		// file has already been loaded - execute onSuccess without reloading resource
		onSuccess();
	}
}


/* generate auto-updated table for listing clothing items from all types */

if ($("#mw-content-text span#number-of-clothing").length > 0) {
	$(function() {
		function apply() {
			var a = cpJSON.values.en["paper_items"],
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
		cpJSON.get({
			file: "paper_items",
			success: apply
		});
	});
}

/* highlight comments of the blog post's author */

if ( wgNamespaceNumber == 8 ) {
	var authorUsername = wgTitle.split('/')[0];
	appendCSS('\
	.comments li[data-user="' + authorUsername + '"] blockquote { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] .speech-bubble-message { background: lightgray; }\
	.comments li[data-user="' + authorUsername + '"] blockquote:after { border-color: transparent lightgray lightgray transparent !important; }\
	');
}

/* dynamically generate player card image 

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

/* remove video caption with file name if a caption was already specified */

$(function() {
	$(".wikia-gallery .title + .lightbox-caption, figcaption > .title + .caption").prev().hide();
});


/* when opening specialpagename#itemotherlangs */

if (location.hash == "#itemotherlangs" && mw.config.get("wgNamespaceNumber") == -1) {
$('<input />').attr({
	"id": "langnames",
	"disabled": "disabled",
	"placeholder": "Enter a clothing item&apos;s ID and hit Enter",
	"type": "text",
	"style": "outline: 2px solid #c00; background-image: url('https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif'); background-repeat: no-repeat; background-position: center; width: 100%;"
}).prependTo('#mw-content-text');
$("input#langnames").before('<textarea style="width: 100%; height: 300px; line-height: 18px; font-size: 16px; color: #666; font-family: monospace; resize: none;" readonly onclick="this.select();"></textarea>');

$(function() {
	var langs = ["pt", "fr", "es", "de", "ru"];
	function foo() {
		cpJSON.get({
			file: "paper_items",
			lang: langs.shift(),
			success: function() {
				if (langs.length > 0) {
					foo();
				} else {
					$("input#langnames").css({
						"background-image": "none",
						"outline": "none"
					}).removeAttr("disabled").keydown(function(e) {
						if (e.keyCode == 13) {
							var id = $(this).val(),
								lang = ["pt", "fr", "es", "de", "ru"],
								output = [];
							function foo(langName, id) {
								var a = JSON.stringify(cpJSON.values[langName].paper_items);
									b = a.split(new RegExp('"paper_item_id":' + id + ',\\S*,"label"\\:"'))[1];
								if (typeof b === "string") {
									return b.split('","prompt":')[0];
								} else {
									return "N/A";
								}
							}
							for (var i = 0; i < lang.length; i++) {
								output.push(
									"|" + lang[i] + "= " + foo(lang[i], id)
								);
								if (i + 1 == lang.length) {
									$(this).prev().val("==Names in Other Languages==\n{{Language\n" + output.join("\n") + "\n}}");
								}
							}
						}
					});
				}
			}
		});
	}
	foo();
});
}

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
	}
};
UserTagsJS.modules.mwGroups = ['rollback', 'chatmoderator', 'bot', 'sysop', 'bureaucrat'];
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = { days: 5, edits: 1 };

// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js"
    ]
});