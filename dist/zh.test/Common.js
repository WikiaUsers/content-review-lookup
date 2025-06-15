/* 此处的JavaScript将加载于所有用户每一个页面。 */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
importScriptPage('MediaWiki:AdminDashboard JS-Button/code.js', 'dev');
/* Any JavaScript here will be loaded for all users on every page load. */

if (mwCustomEditButtons) {
  if (wgAction == "edit" || wgAction == "submit") {
   /*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png?1",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
  }
}

/*** Auto-refreshing recent changes ***/

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:AbuseLog"];

importArticles({
    type: 'script',
    articles: [
        //...
        "w:c:dev:DISPLAYTITLE/code.js",
        "w:c:dev:AnswersAskAutocomplete/code.js",
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:Countdown/code.js",
        "MediaWiki:Common.js/calc.js",
        "MediaWiki:Calculators/GCD.js",
        "MediaWiki:Common.js/archive.js",
        "MediaWiki:Common.js/editedby.js",
        "MediaWiki:Common.js/resolution.js",
        "MediaWiki:Categorylist.js",
        "MediaWiki:ConversionCalc.js",
        "MediaWiki:Common.js/GUIcalc.js",
        "MediaWiki:Common.js/currencyconvert.js"

        //...
    ]
});

/*** Custom user rights tags ***/
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_blog" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
    importScript('MediaWiki:Common.js/mastheads.js');
}

mw.loader.using("mediawiki.user", function () {
  $('body').delegate('#hotcatCommitForm', 'submit', function () {
    // The variable "this" refers to the form. Its fields can be accessed directly, e.g.
    // this.wpTextbox1 gives you the textarea containing the page text of the edit.
    var submitType = this.wpDiff;
    if (submitType && (!this.oldid || this.oldid == '0')) {
      // Switch form submission from diff to save. Don't do this if "oldid" is set to anything but '0':
      // that indicates an edit conflict with yourself, and in that case you really, really do want
      // to see the diff!
      this.wpEditToken.value = mw.user.tokens.get("editToken");
      submitType.name = submitType.value = 'wpSave';
    }
    return true;
  });
});