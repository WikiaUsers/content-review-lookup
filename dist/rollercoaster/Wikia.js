/* Add namespace back to the header */
$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});

/* Adding links to On the Wiki tab */
/* This is allowed, as per http://runescape.wikia.com/wiki/User_talk:Ryan_PM?diff=prev&oldid=4890582 */
$(function() {
    if ( skin == 'oasis' ) {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Special:RecentChanges">Recent Changes</a></li>');
    }
});

/* Unmask "Anonymous Contributor" to reveal IP address */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:RevealAnonIP/code.js",   // adding RevealAnonIP/code.js to the array
    ]
});