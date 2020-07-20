/* ----------------------- CASUALTY WIKI COMMON JS ----------------------- */

/* ----------------------------- JS IMPORTS ------------------------------ */

/* AjaxRC */
importScriptPage('MediaWiki:AjaxRC.js', 'test.casualty');

/* Countdown */
importScriptPage('MediaWiki:Countdown.js', 'test.casualty');

/* Edit Summaries */
importScriptPage('MediaWiki:Summaries.js', 'test.casualty');


/* --------------------------- ADMIN CONTROLS ---------------------------- */

/* Enable Admin Controls */
function AdminControl() {
	if(window.wgUserGroups && (wgUserGroups.indexOf("sysop")) != -1) {
		$('.admin').css({"display": 'inline'});
	}
}
$(AdminControl);



/* -------------------------------- LINKS -------------------------------- */

/* Popup Chat Window Links */
$(".openchat").click(function() {
   window.open('/wiki/Special:Chat?useskin=Oasis', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});


/* ------------------------------- EDITOR -------------------------------- */

 if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/casualty/images/c/cf/Button.png",
     "speedTip": "Holby City Wiki link",
     "tagOpen": "[[hc:",
     "tagClose": "]]",
     "sampleText": "Link title"}
  }