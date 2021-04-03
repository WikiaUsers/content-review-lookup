/* 
This code is loaded on all skins.
*/
importArticle({
    type: "style",
    article: "MediaWiki:StaffHighlight.css"
});
importArticles({
    type: "script",
    articles: [
        "w:dev:ShowHide/code.js",
        "w:dev:LockOldBlogs/code.js"]
});
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {
 
    function disableOldForumEdit() {
        if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning')) {
            return;
        }
 
        if (skin == 'oasis') {
            $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
            return;
        }
        if (!document.getElementById('ca-edit')) {
            return;
        }
        var editLink = null;
        if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
        } else {
            return;
        }
 
        editLink.removeAttribute('href', 0);
        editLink.removeAttribute('title', 0);
        editLink.style.color = 'gray';
        editLink.innerHTML = 'Archived';
 
        $('span.editsection-upper').remove();
 
    }
    addOnloadHook(disableOldForumEdit);
}
 
/* Opens chat in a new window for homepage */
 
$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});
 
/*
$(function(){
	if ( wgNamespaceNumber === 112 || wgNamespaceNumber === 113 ||wgNamespaceNumber === 114 || wgNamespaceNumber === 115 ) {
		var FEurl = wgScript + '?title=Admin_Central:Main_Page';
		$('h1.wordmark.medium.graphic > a').attr('href', FEurl);
	}
});
*/
if (mw.config.get('wgPageName') == 'Blog:Darwin') {
    $('#mw-content-text').before('<table class="plainlinks" style="padding: 5px; color: #555555; background: #f9fafc; font-size: 14px; text-align: center; border: 1px solid black; margin: 0 auto 10px"><tr><th rowspan="3" style="width: 1px;"><img alt="Darwin logo" src="http://images3.wikia.nocookie.net/__cb20130817023136/darwin8086/images/7/75/Darwin_logo.png" width="150" height="92" data-image-name="Darwin logo.png" data-image-key="Darwin_logo.png"></th><th style="font-size:225%; color: #02518C; padding-top: 5px"><img alt="Project Darwin" src="http://images3.wikia.nocookie.net/darwin8086/images/thumb/f/f8/Project_Darwin.png/200px-Project_Darwin.png" width="200" height="36" data-image-name="Project Darwin.png" data-image-key="Project_Darwin.png"></th></tr><tr><td><table cellspacing="5" style="margin-top: -5px; padding: 5px; text-align: left"><tr><th style="text-align: right; padding-right: 10px"><i>Read more</i></th><td><a href="http://community.wikia.com/wiki/Blog:Darwin" class="extiw" title="w:Blog:Darwin">Staff Blog</a> • <a href="http://community.wikia.com/wiki/Board:Darwin" class="extiw" title="w:Board:Darwin">Forum</a> • <a href="http://community.wikia.com/wiki/Help:Darwin" class="extiw" title="w:Help:Darwin">Help Pages</a></td></tr><tr><th style="text-align: right; padding-right: 10px"><i>Try it out</i></th><td><a href="http://darwin.wikia.com/wiki/" class="extiw" title="w:c:darwin">Darwin Wikia</a> • <a href="http://communitytest.wikia.com/wiki/" class="extiw" title="w:c:ct">Community Test Wikia</a></td></tr></table></td></tr></table>');
}

Recent Wiki Activity

    User blog comment:TranStanley/Updates to the Wikia Mobile experience
    created by A Wikia contributor 27 minutes ago
    User blog comment:BertH/New VisualEditor now available in Labs
    created by UltimateSupreme 45 minutes ago
    User blog comment:BertH/New VisualEditor now available in Labs
    created by Ohmyn0 1 hour ago
    User blog comment:BertH/New VisualEditor now available in Labs
    created by Ohmyn0 1 hour ago

See more >	
Photos
Add a Photo	
17,931photos on this wiki	

    See all photos	

See all photos >

Around Wikia's network
Random Wiki