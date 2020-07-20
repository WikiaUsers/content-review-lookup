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
	/* for [[Template:MusicPlay]] */
	$(function() {
		// <span class="MusicPlay" data-repeat="repeat">File:FILENAME</span>
		function MusicPlay() {
			if ($.cookie("embedmusic") != "disabled") { // MusicPlay function not disabled by the client
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

/* UserTags */

window.UserTagsJS = {
	modules: {},
	tags: {
                sysop: { u:'Admin', link:'Club Penguin Music Wiki:Administrators' },
                bureaucrat: { u:'Bureaucrat', link:'Club Penguin Music Wiki:Bureaucrats', order: 1 },
                rollback: { u:'Rollback', link:'Club Penguin Music Wiki:Rollbacks', order: 102 },
		coding: { u:'Templates & Coding', link:'Club Penguin Music Wiki:Templates & Coding', order: 100 },
		patroller: { u:'Patroller', link:'Club Penguin Music Wiki:Patroller', order: 101 },
                chatmoderator: { u:'Chat Moderator', link:'Club Penguin Music Wiki:Chatmod', order: 103 }
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'coding', 'patroller', 'rollback', 'chatmoderator', 'bot'];

UserTagsJS.modules.inactive = 30;

UserTagsJS.modules.autoconfirmed = false;

UserTagsJS.modules.newuser = {
	days: 5,
	edits: 10,
};

UserTagsJS.modules.userfilter = {
	'Batreeq_bot': ['newuser'],
	'CPMW_Administration': ['newuser'],
	'SpydarBot': ['newuser'],
	'SpydarTest': ['newuser'],
	'Syster': ['newuser'],
};

UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'],
};

UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');

UserTagsJS.modules.explode = {
	'patroller': ['rollback', 'chatmoderator']
};

/* END UserTags */

/* JukeBox Insert*/
$("#jukebox-loader").html('<!-- JukeBox and its associated scripts were made by Penguin-Pal http://community.wikia.com/wiki/User:Penguin-Pal --> <style type=\"text/css\"> body { font-family: arial; } nav#jukebox > table { width: 580px; height: 300px; margin: auto; padding: 0px; background: #fafafa; border: 1px solid #cccccc; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; color: #666666; } nav#jukebox > table td, nav#jukebox > table th { padding: 0px; } #jukebox-search { height: 20px; font-size: 16px; line-height: 20px; text-align: center; } input#jukebox-search-settings { width: 32px; height: 20px; background: url(\'http://upload.wikimedia.org/wikipedia/commons/8/8b/Settings_22.png\') center no-repeat; } input#jukebox-search-val { width: 480px; margin: 0px; padding-left: 3px; background: #ffffff; border: 1px solid #ccc; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; } input[type=\"radio\"] { display: none; } label[for] { width: 8px; height: 8px; margin-left: 2px; padding: 0px 0px 0px 14px; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAErSURBVCiRhZKxasJgFIW/K9l+JZMRxNldxF2Ksy/g2vahSldfwFmIm4OIuxkNgrgI+TMkJjldbGkX+8FdDudwz3BMEg9st9u9AnMzGwNI2gOryWTyCQjAJHE4HPpVVS2dc9Nut4tzDoA8z7ler+R5vgmCYDEajc4BYGVZLnu93rTf7/ObMAwJw5Dz+Ty9XC5L4MW22+1bu93+GA6HPON4POK9f29JmkdR9NQMEEURkuatpmnG352f4ZyjaZpxIAkzw8yeBswMSbTqut577//94L2nrut9C1ilafpv4OFZIcniOI6TJFFRFCrL8s8VRaEkSRTHcSzJAkD3+31xOp2Wt9ttOhgM6HQ6AGRZRpqmZFm2qapqAch+T2O9Xr+a2RwYP7S9pNVsNvuZxhfEC68AIOWGKAAAAABJRU5ErkJggg==\'); background-position: left center; background-repeat: no-repeat; font-size: 12px; } label[for].checked { background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFwSURBVCiRZZKxquIAEEXPPFIlSlBJAmIZ7EXsZbH2B2zf7kct2/oD1kJeZyFibzoNghGikKRITDLbuOJjD9xm5sIdhiuqyhPZbrefwFxExgCqugNWk8nkD6AAoqrs9/t+VVVLy7KmjuNgWRYAeZ5zvV7J8/zLMIzFaDQ6G4CUZbn0PG/a7/d5x7ZtbNvmfD5PL5fLEvghm83mZ6vV+j0cDlFVbrcbSZIA0O126XQ6iAiHw4Esy34Zqjp3XReAJEk4Ho+vhDRNUVV6vR6u65Km6fyjaZrxv5vjOKau62+K4xgAy7JommZsqCoigoi8TO/Udf3aqyofdV3vsiwDwPO8/xI8zwMgyzLqut59AKsoigBwHAff9zFNE9M08X0fx3EAeHpWqKoEQRCEYahFUWhZlt9UFIWGYahBEASqKgagj8djcTqdlvf7fToYDGi3268vRVFEmqZfVVUtAJX3aqzX608RmQPj52ynqqvZbPaqxl/KAeuV9HF+bQAAAABJRU5ErkJggg==\'); } nav#jukebox #jukebox-list { width: 172px; height: 202px; } nav#jukebox #jukebox-list ul { width: 170px; height: 244px; margin: 0px; padding: 0px; overflow-x: hidden; border: 1px solid #cccccc; list-style: none; font-size: 10px; } nav#jukebox #jukebox-list ul li { height: 15px; margin: 0px; padding-left: 3px; overflow-y: hidden; line-height: 15px; cursor: hand; cursor: pointer; } nav#jukebox #jukebox-list li.odd { background: rgba(0,0,0,0.05); } nav#jukebox #jukebox-list ul li:hover { background: rgba(0,0,0,0.1); } nav#jukebox #jukebox-controls { height: 70px; padding: 3px; border: 1px solid #cccccc; } nav#jukebox #jukebox-info { height: 160px; border: 1px solid #cccccc; padding: 2px 4px; } nav#jukebox tr { vertical-align: top; } nav#jukebox #jukebox-controls embed { width: 0px; height: 0px; } nav#jukebox #jukebox-info { font-size: 12px; } nav#jukebox #jukebox-info-current { font-style: italic; } nav#jukebox #jukebox-info-current span, nav#jukebox #jukebox-info-id span { font-style: normal; font-weight: bold; } nav#jukebox input[type=\"button\"] { background: #eeeeee; border: 1px solid #ccc; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; font-size: 13px; color: #666666; cursor: hand; cursor: pointer; } </style> <nav id=\"jukebox\"> <table> <thead> <th colspan=\"2\">Club Penguin Music Wiki JukeBox</th> </thead> <tbody> <tr> <td rowspan=\"2\" id=\"jukebox-list\"> <ul></ul> </td> <td id=\"jukebox-info\"> <span id=\"jukebox-info-current\"><span>Current song:</span> None selected</span><br /> <span id=\"jukebox-info-id\"><span>Song ID:</span> N/A</span> </td> </tr> <tr> <td id=\"jukebox-controls\"> <input type=\"button\" id=\"jukebox-controls-play\" value=\"&#x25ba;\" /> <input type=\"button\" id=\"jukebox-controls-stop\" value=\"&#x25a0;\" /> <embed src=\"\" data-src=\"\" type=\"application/x-shockwave-flash\" oncontextmenu=\"return false;\" /> </td> </tr> <tr> <td id=\"jukebox-search\" colspan=\"2\"> <input type=\"text\" id=\"jukebox-search-val\" placeholder=\"Search\" /> <input type=\"hidden\" value=\"id\" /><!-- search mode value - can be [\"id\",\"name\"] --> <!--<input type=\"radio\" name=\"jukebox-search-mode\" id=\"jukebox-search-mode-byid\" /> <input type=\"radio\" name=\"jukebox-search-mode\" id=\"jukebox-search-mode-byname\" /> <label for=\"jukebox-search-mode-byid\">ID</label> <label for=\"jukebox-search-mode-byname\" class=\"checked\">Name</label>--> <input type=\"button\" id=\"jukebox-search-go\" value=\"Go\" title=\"Go\" /> <!--<input type=\"button\" id=\"jukebox-search-settings\" value=\" \" title=\"Settings\" />--> <input type=\"button\" id=\"jukebox-search-clr\" value=\"Clr\" title=\"Clr\" /> </td> </tr> </tbody> </table> </nav>');

/* END JukeBox Insert*/

/* Importing JS files */
importArticles({
	type:'script',
	articles: [
		'w:c:dev:User Rights Reasons Dropdown/code.js',
		'w:c:dev:LockOldBlogs/code.js',
		'w:c:dev:UserTags/code.js',
		'w:c:dev:PurgeButton/code.js',
		'w:c:dev:AjaxRC/code.js',
		'w:c:dev:ShowHide/code.js',
		'w:c:dev:SignatureCheck/code.js',
		'w:c:dev:SpoilerAlert/code.js',
		'MediaWiki:Common.js/editbuttons.js',
		'MediaWiki:Common.js/jukebox.js'
	]
});

/* END Importing JS files */

/* Adds link to contribs for logged-out people's article/blog comments 
$('.details span[title]').each(function(){
 
        var t = $(this),
 
        title = $(this).attr("title");
 
        t.html('Unregistered user (IP: <a href="/wiki/Special:Contributions/' + title + '"  target="_blank" rel="nofollow">' + title + ')</a>');
 
});
/* END link to contribs for logged-out people */

/* For Template:USERNAME */
$(function() {
  if (typeof wgUserName != 'undefined') {
     $('.insertusername').html(wgUserName);
  }
});
/* END Template:USERNAME */

/* For Template:Hidetoc */
if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}
/* END Template:Hidetoc */


/* Escape HTML Entities for User Group 'coding' */
$(document).ready(function() {
if (mw.config.get("wgNamespaceNumber") == -1) {
	$('label[for="wpGroup-coding"]').html("Templates &amp; Coding");
	$('a[title="Club Penguin Music Wiki:Templates & Coding"]')
		.html("Templates &amp; Coding");
}
});
/* END Escape HTML Entities */


/* popup windows - currently only enabled in the project namespace */

if (mw.config.get("wgNamespaceNumber") == 4) {
mw.util.addCSS('.popup-container {\n\
		position: fixed;\n\
		top: 45px;\n\
		left: ' + Math.floor(($(window).width() - 1100) / 2) + 'px;\n\
		z-index: 20;\n\
		padding: 3px 5px;\n\
		background: #fafafa;\n\
		border: 1px solid #cccccc;\n\
		color: #333;\n\
	}\n\
	.popup-container > div {\n\
		width: 1100px;\n\
		max-height: 520px;\n\
		margin: 0px;\n\
		overflow: scroll;\n\
	}\n\
	.popup-container > h3 {\n\
		margin-bottom: 7px;\n\
		border-bottom: 1px solid #333;\n\
		font-family: arial;\n\
		font-size: 18px;\n\
			font-weight: bold;\n\
	}\n\
	.popup-container > h3 > span {\n\
		display: inline-block;\n\
		float: right;\n\
		width: 15px;\n\
		height: 15px;\n\
		background-color: rgba(0,102,0,0.3);\n\
		background-image: url(\'https://images.wikia.nocookie.net/common/skins/oasis/images/icon_close.png\');\n\
		background-position: center;\n\
		background-repeat: no-repeat;\n\
		cursor: hand;\n\
		cursor: pointer;\n\
	}\n\
	.popup-container > h3 > span:hover {\n\
		background-color: rgba(0,102,0,1);\n\
}');
function popupClear() {
	$("body > .popup-container, body > .blackout").remove();
}
function popupReady() {
	$('span.popup-button[id^="popup-button-for-"]').click(function() {
		$("body").append('<div class="popup-container">\
							<h3>\
								Content Overview<span></span>\
							</h3>\
							<div>\
							' + $(".popup")[$(this).attr("id").split("popup-button-for-")[1]].outerHTML + 
							'</div>\
						</div>\
						<div class="blackout" data-opacity="0.65" style="z-index: 19; opacity: 0.65; display: block;" onclick="popupClear();"></div>\
						');
		$("body > .popup-container div .popup-button").remove();
		$(".popup-container > h3 > span").click(function() {
			popupClear();
		});
	});
}
for (var i = 0; i < $(".popup").length; i++) {
	$($(".popup")[i]).before('<span class="button popup-button" id="popup-button-for-' + i + '">Full view</span>');
	if (i + 1 == $(".popup").length) {
		popupReady();
	}
}

}