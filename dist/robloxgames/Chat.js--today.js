* "!today" command for chat */
/*
	in order to operate, add in a new ling the following string:
	!today
*/
/*
	DOM inserted nodes function by Bobogoobo
	http://community.wikia.com/wiki/Thread:585950#9
*/
/*
	no parrots were harmed during the creation, testing and launch of	
	this feature
*/

// set / check Widget
Widget = typeof Widget === "undefined" ? {} : Widget;

// set objects
Widget.todayTrack = {};
Widget.todayTrack.functions = {};

// interface loop gap
Widget.todayTrack.delay = 150;

// interface trigger
Widget.todayTrack.trigger = "!today";

// interface is experimental
Widget.todayTrack.isBeta = false;

// interface markup
Widget.todayTrack.popup = '<section id=\"todaytrack\" style=\"z-index: 101; display: block; width: 100%; position: absolute; top: 190px; text-align: center; color: #333333;\">\
	<div style="width: 370px; min-height: 110px; margin: auto; padding: 3px 3px; background: #f6f6f6; background: -moz-linear-gradient(top, #ffffff 0%, #f6f6f6 47%, #ededed 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(47%,#f6f6f6), color-stop(100%,#ededed)); background: -webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%); background: -o-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%); background: -ms-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%); background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%); border: 1px solid #cccccc; border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px;\">\
		<h3 style=\"margin: 0px; position: relative; font-size: 16px; font-weight: bold; text-align: center;\">\
			Today's News\
			<span style=\"display: inline-block; width: 12px; height: 12px; position: absolute; top: 2px; right: 2px; background-color: #eeeeee; background-image: url(\'https://images.wikia.nocookie.net/clubpenguin/images/thumb/archive/8/87/20130201113045%21Bait_Item.svg/10px-Bait_Item.svg.png\') !important; background-position: center; background-repeat: no-repeat; border: 1px solid #bbbbbb; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; cursor: hand; cursor: pointer;\" onclick=\"Widget.todayTrack.functions.close();\"></span>\
		</h3>\
		<div style=\"text-align: left;\"></div>\
		<p style=\"width: 100%; position: absolute; left: 0px; bottom: 4px; text-align: center; font-size: 92%">\
			For any ROBLOX news which happened this day that we have missed out, feel free to contact us.</a>.<br />\
			' + (Widget.todayTrack.isBeta == true ? '<span style=\"color: #aaaaaa;\">Note! this feature is still on experimental stages.<br />Please contact <a href=\"/wiki/robloxgames:a" target=\"_new\">one of the wiki\'s admins</a> to report issues.</span>' : '') + '\
		</p>\
	</div>\
</section>';

// close interface
Widget.todayTrack.functions.close = function() {
	$("section#todaytrack").hide();
	$(".blackout").remove();
}

// open interface and purge
Widget.todayTrack.functions.track = function() {
	if ($("section#todaytrack").length == 0) {
		$.getJSON("/api.php?action=parse&format=json&page=" + Widget.todayTrack.sourcePage + "&cb=" + new Date().getTime(), function(data) {
			Widget.todayTrack.content = data.parse.text["*"];
			$("body").append(Widget.todayTrack.popup + '\n<div class="blackout" data-opacity="0.65" style="z-index: 100; opacity: 0.65; display: block;" onclick="Widget.todayTrack.functions.close();"></div>');
			$("section#todaytrack > div > div").html(Widget.todayTrack.content);
			$("section#todaytrack > div > div .floatright").each(function() {
				$(this).replaceWith($(this).find("img").addClass("floatright"));
			});
			$("section#todaytrack").show();
		});
	} else {
		$("body").append('<div class="blackout" data-opacity="0.65" style="z-index: 100; opacity: 0.65; display: block;" onclick="Widget.todayTrack.functions.close();"></div>');
		$("section#todaytrack > div > div").html(Widget.todayTrack.content);
		$(".floatright").each(function() {
			$(this).replaceWith($(this).find("img").addClass("floatright"));
		});
		$("section#todaytrack").show();
	}
}

// add css
mw.util.addCSS('section#todaytrack > div > div .floatright {\
	float: right;\
}\
section#todaytrack > div > div ul {\
	margin: 2px 3px;\
	padding: 1px 1px 1px 12px;\
}\
section#todaytrack > div > div ul li {\
	list-style-type: disc;\
}\
section#todaytrack > div > div img:not(.noresize) {\
	zoom: 0.8;\
}');

// apply on inserted nodes
$("body").on("DOMNodeInserted", "section.WikiaPage .Chat li.you", function(ev) {
	if ($(ev.target).children(".message").html() == Widget.todayTrack.trigger) {
		setTimeout(function() {
			Widget.todayTrack.functions.track();
		},Widget.todayTrack.delay);
	}
});