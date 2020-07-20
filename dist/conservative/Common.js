/* Adds IRC <iframe> to the IRC page
 * By [[User:MateyY|MateyY]]
 */
$(window).load(function() {
     if (wgPageName === "Conservative_Wiki:IRC" || wgPageName === "Project:IRC") $("div#ircbox").html('<iframe src="http://webchat.freenode.net?channels=wikia-conservative&uio=Mj10cnVlJjExPTI1Ng39" width="100%" height="400"></iframe>');
});