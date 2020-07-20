var SocialMediaButtons = {
position: "top", 
colorScheme: "color", 
buttonSize: "35px", 
wikiTwitterAccount: "AngryBirdsWiki"
}; 
importScriptPage('SocialIcons/code.js','dev');
 
/* Color de Users especiales */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'sysop': '#ff0000',
        'staff': '#da0da0',
        'rollback': '#00bfff',
        'bot': '#5f5ese',
        'chatmoderator': '#01ff5f',
        'bureaucrat': '#ff0000',
    },
    styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal !important' ,
        'staff': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal !important' ,
    }
};
importArticles({ type: 'script', articles: [ 'u:dev:HighlightUsers/code.js' ] 
 });
 
var _wau = _wau || [];
_wau.push(["tab", "fc1rcmedcrqm", "2p4", "left-lower"]);
(function() {var s=document.createElement("script"); s.async=true;
s.src="http://widgets.amung.us/tab.js";
document.getElementsByTagName("head")[0].appendChild(s);
})();

function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // GROUP 2
 
  rights["Pikoaztlan"] = ["Fundador"];
 
 if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});