/*************************************************************************************************/
/*************************************************************************************************/
/**                                                                                             **/
/**  Any JavaScript here will be loaded for all users on every page load.                       **/
/**  A lot of this code has been taken from other Wikis, which follow the same copyright laws.  **/
/**                                                                                             **/
/*************************************************************************************************/
/*************************************************************************************************/

// RevealAnonIP settings -- MUST be before the script is imported
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};


/*********************************/
/* Beginning of Script importing */
/*********************************/

importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",             // Ajax Recent Changes
        "w:c:dev:BackToTopButton/code.js",    // Back-to-the-top Button
        "w:c:dev:DisplayClock/code.js",       // Clock
        "w:c:dev:SignatureCheck/code.js",     // Checks for signatures on talk page
        "w:c:dev:DupImageList/code.js",       // Duplicate Images
        "w:c:dev:RevealAnonIP/code.js",       // Reveals Anonomous Users IP
        "MediaWiki:StandardEditSummaries.js", // Standard Edit Summaries
        "MediaWiki:UserRightsTitles.js"       // User Rights Titles

    ]
});

/***************************/
/* End of Script importing */
/***************************/

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

// Signature Check settings
window.SignatureCheckJS = {
	// Parts of the confirm prompt
	preamble: "There are a few potential problems with your edit:\n\n",
	noSignature: "?? It looks like you forgot to sign your reply. Use 4 tilde's to sign.\n",
	epilogue: "\nAre you sure you want to post this anyway?\n[This will violate wiki policy if you do not sign your signaure.]"
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

//
// DisableArchiveEdit
// Curtesy of Porter21 from w:c:fallout
//

var DisableArchiveEditConfig = { 
   archiveSubpage: 'Archive',
   disableCompletely: false,
   textColor: '#DDD',
   userLang: true
};