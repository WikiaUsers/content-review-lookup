//                                                                                         
// Any JavaScript here will be loaded for all users on every page load.                    
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
//                                                                                          

// Prevents [[MediaWiki:ProfileTags]] from hidding any existing tags
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// RevealAnonIP settings -- MUST be before the script is imported
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};

// AjaxRC settings
ajaxPages = [
     "Special:RecentChanges",
     "Special:Watchlist",
     "Special:Log",
     "Special:Contributions"
];

// Display clock settings
// Display 12 hour time followed by day, month (English, full name) and year with "(UTC)" at the end
window.DisplayClockJS = {
      format: "%2I:%2M:%2S %p %2d %B %Y (UTC)",
      location: "header"
};

//
// Patching in changes to table sorting and alt rows
// Courtesy of Pcj from WoWPedia.org
//

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