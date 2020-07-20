importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('FloatingToc/code.js', 'dev');
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
importScriptPage('AllPagesHideRedirect/code.js', 'dev');
importScriptPage('Highlight/code.css', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('MediaWiki:Common.js/StandardEditSummaries.js', 'terraria');
importScriptPage('HideRail/code.js', 'dev');
importScriptPage('PortableCSSPad/code.js', 'dev');
importScriptPage('SexyUserPage/code.js', 'dev');

// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
    //  Bureaucrats
    rights["Ultimate Dark Carnage"]     = ["Founder", "BoB", "Creator of the Androids"]
    rights["EmpressLucarneStar"]        = ["Co-Founder"]
    rights["Teengohanrocks"]            = ["Co-Founder"]
    rights["KamehamehaLFD"]             = ["Co-Founder"]
    rights["Miricle1778"]               = ["Bureaucrat"]
    rights["MASTER SPECTRA"]            = ["Bureaucrat"]
    rights["Super Saiyan 7 Somebody"]   = ["Bureaucrat"]   
    rights["Mr. Steal-Yo-Gurl"]         = ["Bureaucrat"]
    rights["XGlass Reflection"]         = ["Bureaucrat"]

    //  Administrators
    
    rights["IloveJeice"]                = ["Sysop"]   
   

if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});


 
//////////STATUS CHANGER
// Creator: Misza13
// Credits: Voyagerfan5761 for some minor improvements
// Modified by Xenocidic to simply use /Status as a one word indicator,
// Modified by Kraftlos to include Sleep status
// compatible with {{Statustop}} for display
 
addOnloadHook(function (){
  //Check if the config is defined
  if (typeof(statusChangerConfig) == 'undefined') {
    statusChangerConfig = {}
  }
 
  if (typeof(statusChangerConfig.statusList) == 'undefined') {
      statusChangerConfig.statusList = [ 'online', 'busy', 'around', 'offline', 'sleep' ];
  }
 
  if (typeof(statusChangerConfig.statusPage) == 'undefined') {
      statusChangerConfig.statusPage = 'User:' + wgUserName + '/Status';
  }
 
  //Add the links
  for (var i=0; i<statusChangerConfig.statusList.length; i++) {
    var stat = statusChangerConfig.statusList[i];
    var message = (stat === "sleep") ?  link = "asleep" : link = stat;
    addPortletLink(
      "p-personal", //target tab - personal links
      wgServer + wgScript + "?title=" + statusChangerConfig.statusPage + "&action=edit&newstatus=" + stat, //link URL
      stat, //link text
      "pt-status-" + stat, //id of new button
      "I'm " + message + "!", //hover text
      "", //???
      document.getElementById("pt-logout")); //add before logout button
  }
 
  if (location.href.indexOf("&action=edit&newstatus=") == -1) return; //Are we here to auto-edit the status?
  //Get new status
  statusRegExp = /&action=edit&newstatus=(.*)/;
  var status = statusRegExp.exec(location.href)[1];
  //Modify the form
  document.getElementById('wpTextbox1').value = status;
  if (status == "sleep")
  { status = "sleeping"; }
  document.getElementById('wpSummary').value = wgUserName + " is now " + status +".";
  document.getElementById('wpMinoredit').checked = true;
  //Submit it!
  document.getElementById('editform').submit();
});
 
// </source>

if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}

/* WIki Activity Button */
var sfwWikiActivity = document.createElement("a"); 
sfwWikiActivity.className = "wikia-button";
sfwWikiActivity.id = "SFWWikiActivitySwitch"; 
sfwWikiActivity.href = "/wiki/Special:WikiActivity"; 
sfwWikiActivity.innerHTML = "Wiki Activity"; 
document.getElementsByClassName('header-container')[0].appendChild(sfwWikiActivity);