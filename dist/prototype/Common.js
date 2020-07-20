/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:Common.js/snow.js');

//******************************************//
/* Opens chat in a new window for homepage */
//****************************************//

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

//**************//
/*  Era-icons  */
//************//
function loadFunc() {
	showEras('title-eraicons');
	showEras('title-shortcut');
}

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}

	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

//*****************//
/* Special:Upload */
//***************//

function Information() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Information\r| attention = \n| description = \n| source = \n| author = \n| filespecs = \n| licensing = \n}}';
	}
}
addOnloadHook(Information);

/* Replacing redirect page image */
function ChangeRedirectImage() {
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/prototype/images/2/24/Rdimg.png');
}
addOnloadHook(ChangeRedirectImage);

//**Auto-Refresh**//
importScriptPage('MediaWiki:Common.js/Autorefresh.js');

//**Duplicate images**//
importScriptPage('MediaWiki:Common.js/dupimage.js');

//**DisableArchiveEdit of talk pages**//
importScriptPage('DisableArchiveEdit/code.js', 'dev');

//**Information template**//
importScriptPage('MediaWiki:Common.js/custombuttons.js');

//**Show/Hide**//
importScriptPage('ShowHide2/code.js', 'dev');

//**Back to top**//
importScriptPage('MediaWiki:Common.js/top.js');

//**Countdown timer**//
importScriptPage('MediaWiki:Common.js/countdown.js');

//**Disable blog comments for blogs and Forums that haven't been commented on for more than 30 days.**//
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});