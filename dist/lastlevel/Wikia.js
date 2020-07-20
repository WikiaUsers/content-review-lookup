// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// START MastheadSearchbar
importScript('MediaWiki:Wikia.js/MastheadSearchbar.js');
// END MastheadSearchbar

// START ShowHide
importScriptPage('ShowHide/code.js', 'dev');
// END ShowHide

// START AjaxRC
importScriptPage('AjaxRC/code.js', 'dev');
// END AjaxRC

// START ChangeLogoLink
function ChangeLogoLink() {$('#p-logo a').attr('href', '/wiki/Special:RecentChanges')} addOnloadHook(ChangeLogoLink);
// END ChangeLogoLink

// START CountDown
importScriptPage('Countdown/code.js', 'dev');
// END CountDown

// START SkinChangeButtons
function CreateSkinChangeButtons() {
	//Oasis buttons
	$('div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook" accesskey="b" class="wikia-button secondary" id="skinChangeButton" data-id="monobookbutton">Monobook</a>');
	//Monobook buttons
	$('#p-cactions .pBody ul li:nth-last-child(1)').after('<li id="ca-nstab-main" class="skinChangeTab" style="margin:0 3px 0 36px"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li>');
}
addOnloadHook(CreateSkinChangeButtons);
// END SkinChangeButtons

// START PurgeButton
importScriptPage('PurgeButton/code.js', 'dev');
// END PurgeButton

// START PageTitle Rewrite
    $(function () {
        var newTitle = $("#title-meta").html();
        if (!newTitle) return;
        var edits = $("#user_masthead_since").text();
        $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
        $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
    });
// END PageTitle Rewrite