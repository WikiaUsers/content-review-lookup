/*
	Codes on this page will affect Special:Chat.
	For stylesheets, use MediaWiki:Chat.css
*/
 
/* chat &lt;title&gt; modification */
$("head title").html("Wiki Chat - Corn Sky Wiki");
 
/* allow further interwiki links */
 
// define Widget
Widget = typeof Widget === "undefined" ? {} : Widget;
 
// define interwiki links feature
Widget.interwikiLinks = {};
 
// function with parameters for custom interwiki links
Widget.interwikiLinks.wikiSubDomain = $('link[rel="canonical"]').attr("href").split(".wikia.com/")[0].substr(7);
Widget.interwikiLinks.setInterwikiLinks = function(interwiki,url) {
	if ( $('a[href^="http://' + Widget.interwikiLinks.wikiSubDomain + '.wikia.com/wiki/' + interwiki + ':"]').length > 0 ) {
		$('a[href^="http://' + Widget.interwikiLinks.wikiSubDomain + '.wikia.com/wiki/' + interwiki + ':"]').each(function() {
			$(this).attr("href",url + "/wiki/" + $(this).attr("href").split("http://" + Widget.interwikiLinks.wikiSubDomain + ".wikia.com/wiki/" + interwiki + ":")[1]);
		});
	}
};
 
// apply when message inserted
$("body").on("DOMNodeInserted", "section.WikiaPage .Chat li:not(.inline-alert)", function() {
	Widget.interwikiLinks.setInterwikiLinks("mw","http://www.mediawiki.org");
	Widget.interwikiLinks.setInterwikiLinks("mediawikiwiki","http://www.mediawiki.org");
	Widget.interwikiLinks.setInterwikiLinks("commons","http://commons.wikimedia.org");
	Widget.interwikiLinks.setInterwikiLinks("wikimedia","http://wikimediafoundation.org");
	Widget.interwikiLinks.setInterwikiLinks("wikipedia","http://en.wikipedia.org");
});
 
 
/*
 
	auto refresh emoticons
	also load emoticons from [[MediaWiki:Emoticons/DataURI]]
	(DataURI loaded once per request size - might be changed at some point)
 
*/
 
$(function() {
	var dataURI = "";
	setInterval(function() {
		$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons&rvprop=content&cb=" + new Date().getTime(), function(info) {
			a = info.query.pages;
			for (var pageid in a) {
				var a = a[pageid].revisions[0]["*"].replace(/\\/g,"\\\\").replace(/</g,"\x3c").replace(/>/g,"\x3e").replace(/\"/g,"\\\"").replace(/\'/g,"\\\'");
				mw.config.set("EMOTICONS", a + "\n\n" + dataURI);
			}
		});
	},30000); // loop every 30 seconds
	function getDataURIEmoticons(d, n, w) {
		/*
			d: current attempt (starting at 0)
			n: top number of attempts (highest attempt is n-1)
			w: timeout if all attempts fail (ms)
		*/
		if (d < n) {
			$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons/DataURI&rvprop=content&cb=" + new Date().getTime(), function(data) {	
				var a = data.query.pages;
				for (var pageid in a) {
					var b = a[pageid].revisions[0]["*"];
					window.q = b; // for debugging
					mw.config.set(
						"EMOTICONS",
						mw.config.get("EMOTICONS") + "\n\n" + b
					);
					dataURI = b;
				}
			}).fail(function() {
				console.error("Attempt number #" + (d + 1) + " for getting Data URI emoticons resource failed");
				getDataURIEmoticons(d+1, n, w);
			});
		} else {
			console.error("All attempts for getting Data URI emoticons failed. Please reload chat in order to try again, or wait another " + (w / 1000) + " seconds for another automatic try");
			setTimeout(
			function() {
				getDataURIEmoticons(0, n, w)},
				w
			);
		}
	}
	getDataURIEmoticons(0, 5, 120000);
	$('textarea[name="message"]').keydown(function(e) {
		if (e.keyCode == 13 && $(this).val().toLowerCase().search(/^\u0021(datauri|data uri|uri)$/i) === 0) {
			$(this).val("");
			$("div.Chat:first ul").append('<li class="inline-alert">Attempting to reload DataURI-based emoticons</li>');
			$("div.Chat:first").scrollTop($("div.Chat:first ul").height());
			getDataURIEmoticons(0, 5, 120000);
		}
	});
});
 
 
/* resize emoticons */
 
importStylesheet("MediaWiki:ChatResizeEmoticons.css");
 
 
/* !pin command for chat */
 
importScriptPage("MediaWiki:Chat.js/pin.js");
 
 
/*
	the following script blocks certain works in certain conditions
	regex reduction suggested by Callofduty4 http://community.wikia.com/wiki/Thread:628738#7
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = " " + $('textarea[name="message"]').val().toLowerCase() + " ", // the padded spaces are to make sure that matches won't be located in the beginning or ending of the message
			b = [
				"ass",
				"asses",
				"bitch",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"fuck",
				"fucker",
				"fucking",
				"motherfucker",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"penis",
				"penises",
				"piss",
				"puss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"whore",
				"whores"
			],
			escape = "[\\n\\d \\?\\!\\.\\,]+(" + b.join("\n").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/\n/g,"|") + ")[\\n\\d \\?\\!\\.\\,]+"; // decoder from http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex#answer-6969486
		if (a.split(new RegExp(escape)).length > 1) { // 1 or more matches (no need to globally search)
			$('textarea[name="message"]').val("");
			ChatStringsBlocker.count++;
			if (ChatStringsBlocker.count < 2) {
				alert("Warning! You were caught using inappropriate language and your message has been blocked.");
			} else if (ChatStringsBlocker.count === 2) {
				alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would automatically kick you from the chat room!");
			} else if (ChatStringsBlocker.count === 3) {
				window.close(); // close on 3rd offense
			}
		}
	}
});
 
 
/* shorten long external url links */
 
$("body").on("DOMNodeInserted", function(el) {
	$(el.target).find(".message a").each(function() {
		if ($(this).text().length > 150 && $(this).attr("href").indexOf(location.origin) !== 0) {
			// external link with over 150 characters
			var a = $(this).text();
			$(this).text;
		}
	});
});