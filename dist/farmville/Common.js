// 
// Any JavaScript here will be loaded for all users on every page load
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
// Read https://farmville.fandom.com/wiki/Help:Including_additional_CSS_and_JS before importing scripts
// 

// Prevents [[MediaWiki:ProfileTags]] from hidding any existing tags
(window.dev = window.dev || {}).profileTags = { noHideTags: true };


// ************************
// Remove image attribution
// ************************

$('.attribution').remove();

// *******************************
// End of Remove image attribution
// *******************************

// **************************************************************
// RevealAnonIP settings -- MUST be before the script is imported
// **************************************************************

window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};

// ****************************
// End of RevealAnonIP settings 
// ****************************


// ***************
// AjaxRC settings
// ***************

ajaxPages = [
     "Special:RecentChanges",
     "Special:Watchlist",
     "Special:Log",
     "Special:Contributions"
];

// **********************************************************************************************
// Display clock settings
// Display 12 hour time followed by day, month (English, full name) and year with "(UTC)" at the end
// **********************************************************************************************

window.DisplayClockJS = {
      format: "%2I:%2M:%2S %p %2d %B %Y (UTC)",
      location: "header"
};

// **********************************************************************************************
// Signature Check settings - This script is from Wiki Developers Wiki.
// For author attribution, please see https://dev.wikia.com/wiki/SignatureCheck/code.js?action=history
// **********************************************************************************************

window.SignatureCheckJS = {
	// Settings for the text displayed
	// checkSignature: true,
	// preamble: "There are a few potential problems with your edit:\n\n",
	// noSignature: ""?? It looks like you forgot to sign your reply. Use ~~//~~ to sign.\n,
	// forumheader: "Forumheader",
	// epilogue: "\nAre you sure you want to post this anyway?\n[This will violate wiki policy if you do not sign your signature.]"
};

// ************************************************************************
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance
// Maintainers: User:Mike Dillon, User:R. Koot, User:SG
// ************************************************************************

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// *************************************************
// Patching in changes to table sorting and alt rows
// Courtesy of Pcj from WoWPedia.org
// *************************************************
 
function changeTS()
{ window['ts_alternate'] = function (table)
  { var tableBodies = table.getElementsByTagName("tbody");
  for (var i = 0; i < tableBodies.length; i++)
    {var tableRows = tableBodies[i].getElementsByTagName("tr");
    for (var j = 0; j < tableRows.length; j++)
      { var oldClasses = tableRows[j].className.split(" ");
      var newClassName = "";
      for (var k = 0; k < oldClasses.length; k++)
        { if (oldClasses[k] != "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
        } tableRows[j].className = newClassName + (j%2 == 0?"alt":"");
      }
    }
  }
}
 
addOnloadHook(changeTS);


// *********
// IRC thing
// *********

$(function() {
	var nick = (wgUserName == null) ? ('FVW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=#wikia-farmville&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="1000" height="400" style="border:0;"></iframe>');
});