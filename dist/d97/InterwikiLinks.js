/* allow further interwiki links */

// NOTE TO READER: I DO NOT KNOW WHERE THIS SCRIPT CAME FROM.
// IF YOU ARE THE AUTHOR, PLEASE CONTACT DRAGONFREE97
 
// define Widget
Widget = typeof Widget === "undefined" ? {} : Widget;
 
// define interwiki links feature
Widget.iwi = {};
 
// list of checked messages
Widget.iwi.checked = [];
 
// list links
Widget.iwi.sites = {
	"mw": "http://www.mediawiki.org",
	"mediawikiwiki": "http://www.mediawiki.org",
	"commons": "http://commons.wikimedia.org",
	"wikimedia": "http://wikimediafoundation.org",
	"wikipedia": "http://en.wikipedia.org",
	"wp": "http://en.wikipedia.org",
	"bulba": "http://bulbapedia.bulbagarden.net"
};
 
// apply check on a given node
Widget.iwi.apply = function(node) {
	$(node).find("a").each(function() {
		console.log("[WP] "+this);
		var href = $(this).attr("href"),
			regex = location.origin.replace(/[\.\/\:\-]/g, "\\$&") + "\\/wiki\\/(.+?)\\:(.+)",
			m = href.match(new RegExp(regex));
		if (m) {
			var domain = Widget.iwi.sites[m[1].toLowerCase()];
			if (domain) {
				$(this).attr("href", domain + "/wiki/" + m[2]);
			}
		}
	});
}
 
// observer
Widget.iwi.observer = new MutationObserver(function(mutations) {
	for (var i in mutations) {
		for (var j in mutations[i].addedNodes) {
			var curr = mutations[i].addedNodes[j];
			if (curr.nodeType == 1) {
				// html element node
				if (curr.nodeName.toLowerCase() == "li" && $(curr.parentNode.parentNode).hasClass("Chat") && !$(curr).hasClass("inline-alert")) {
					Widget.iwi.apply(curr);
				}
			}
		}
	}
});
 
// first check all existing messages when joining chat - usually 10 unless chat's dead (or usually < 10 unless chat's alive, if you know what i mean)
$(".Chat li").each(function() {
	Widget.iwi.apply(this);
});
 
// start observing
Widget.iwi.observer.observe(document.body, {
	childList: true,
	subtree: true
});