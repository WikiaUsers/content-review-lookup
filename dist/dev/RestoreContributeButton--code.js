//RestoreContributeButton
//Created by HM100, minor fixes were made by JustLeafy

 $(function() {

    $('.wds-community-header__wiki-buttons').remove();
 
var config = mw.config.get([
        'wgPageName'
    ]);
 
    $('.wds-community-header__top-container').append(
'<div class="wds-community-header__contribute-button wds-button-group" style="margin:20px 20px auto 15px;">' +
'<div class="wds-dropdown">' +
'<div class="wds-button wds-is-secondary wds-is-squished" title="Contribute" href="">'+
'<svg xmlns="http://www.w3.org/2000/svg" class="wds-icon wds-icon-small" width="18" height="18" viewBox="0 0 18 18"><g fill-rule="evenodd"><path d="M4.667 11H8v1.333H4.667V11zm0-3.333h8V9h-8V7.667zm0-3.334h8v1.334h-8V4.333zM2.667 17H10v-4.667c0-.368.3-.666.667-.666h4.666v-10A.667.667 0 0 0 14.667 1h-12A.667.667 0 0 0 2 1.667v14.666c0 .368.3.667.667.667z"/><path d="M14.943 13h-3.61v3.61z"/></g></svg>' +
'<span class="contribute-tag">Contribute</span> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path d="M6 9l4-5H2" fill-rule="evenodd"></path></svg> </div>' +
'<div class="wds-is-not-scrollable wds-dropdown__content">' +
'<ul class="wds-list wds-is-linked">' +
'<li><a href="/wiki/' + config.wgPageName + '?action=edit">Edit this page</a></li>' +
'<li><a href="/wiki/Special:CreatePage">Add a Page</a></li>' +
'<li><a href="/wiki/Special:WikiaVideoAdd">Add an Video</a></li>' +
'<li><a href="/wiki/Special:Upload">Add an Image</a></li>' +
'<li><a href="/wiki/Special:WikiActivity">Wiki Activity</a></li>' +
'<li><a href="/wiki/Special:AdminDashboard" class="sysop-only">Admin Dashboard</a></li>' +
'<li><a href="/wiki/MediaWiki:Wikia.css?action=edit" class="sysop-only">Edit wiki CSS</a></li>' +
'<li><a href="/wiki/MediaWiki:Wiki-navigation?action=edit" class="sysop-only">Edit wiki navigation</a></li>' +
'</ul></div></div></div>');
 
    if(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('wiki-manager') > -1 || wgUserGroups.indexOf('helper') > -1) {
        return 0;
    } else {
        $('a.sysop-only').remove();
    }
});