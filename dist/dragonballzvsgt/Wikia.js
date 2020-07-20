importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('SignatureCheck/code.js', 'dev');
importScriptPage('AutoEditDropdown/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('RevealAnonIP/code.js', 'dev');
importScriptPage('ListFiles/code.js', 'dev');
importScriptPage('View_Source/code.js', 'dev');
importScriptPage('ReferencePopups/code.js', 'dev');
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('FastDelete/code.js', 'dev');
importScriptPage('PortableCSSPad/code.js', 'dev');
importScriptPage('Wikimarks/code.js', 'dev');
importScriptPage('HideRail/code.js', 'dev');
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('Highlight/code.css', 'dev');
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
importScriptPage('MediaWiki:Common.js/accountNavigation.js', 'runescape');
importScriptPage('MediaWiki:Common.js/StandardEditSummaries.js', 'terraria');
importScript('MediaWiki:Wikia.js/editCount.js');
importScript('MediaWiki:Wikia.js/Ticker.js');
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
importScript('MediaWiki:Wikia.js/SubNav.js');
importScript('MediaWiki:Wikia.js/DisplayTimer.js');
importScript('MediaWiki:Wikia.js/aboutus.js');
 
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:Forum"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
 
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}
 
/* Monobook Button */
var sfwMonobookSwitch = document.createElement("a"); 
sfwMonobookSwitch.className = "wikia-button";
sfwMonobookSwitch.id = "SFWMonobookSwitch"; 
sfwMonobookSwitch.href = "?useskin=monobook"; 
sfwMonobookSwitch.innerHTML = "Monobook"; 
document.getElementsByClassName('header-container')[0].appendChild(sfwMonobookSwitch);
 
/* Insert username for {{USERNAME}} */
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "Category name"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
     "speedTip": "Support",
     "tagOpen": "{{Support}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
     "speedTip": "Oppose",
     "tagOpen": "{{Oppose}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
     "speedTip": "Neutral",
     "tagOpen": "{{Neutral}}",
     "sampleText": "Insert text"};
  }
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
    //  Bureaucrats
    rights["RealityKings4"]          = ["Commander"]
    rights["Ultimate Dark Carnage"]  = ["Lieutenant"] 
    rights["Miricle1778"],           
    rights["Mr. Steal-Yo-Gurl"],    
    rights["XGlass Reflection"],
    rights["OmegaFlawz"], 
    rights["MASTER SPECTRA"]         = ["Colonel"]

if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});