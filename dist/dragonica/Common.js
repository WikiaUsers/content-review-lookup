// ****************************************************************************************
// ****************************************************************************************
// 
// Any JavaScript here will be loaded for all users on every page load
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
// 
// ****************************************************************************************
// ****************************************************************************************

// **************************************************************
// RevealAnonIP settings -- MUST be before the script is imported
// **************************************************************

window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};

// *****************************
// Beginning of Script importing
// *****************************

importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",             // Ajax Recent Changes
        "w:c:dev:BackToTopButton/code.js",    // Back-to-the-top Button
        "w:c:dev:Countdown/code.js",          // Countdown timer
        "w:c:dev:DisplayClock/code.js",       // Display-Clock with purge
        "w:c:dev:FixMultipleUpload/code.js",  // Fix Multiple Upload
        "w:c:dev:FixWantedFiles/code.js",     // Fix Wanted Files
        "w:c:dev:PurgeButton/code.js",        // Adds Purge to the bottom of Edit button options-list
        "w:c:dev:RevealAnonIP/code.js",       // Reveals Anonymous Users IP
        "w:c:dev:ShowHide/code.js",           // Show - Hide button
        "w:c:dev:SignatureCheck/code.js",     // Signature check for talk pages
        "MediaWiki:StandardEditSummaries.js", // Standard Edit Summaries
        "MediaWiki:UserRightsTitles.js"       // User Rights Titles
    ]
});

// ***********************
// End of Script importing
// ***********************

// ***************
// AjaxRC settings
// ***************

ajaxPages = [
     "Special:RecentChanges",
     "Special:Watchlist",
     "Special:Log",
     "Special:Contributions"
];

// *************************************************************************************************
// Display clock settings
// Display 12 hour time followed by day, month (English, full name) and year with "(UTC)" at the end
// *************************************************************************************************

window.DisplayClockJS = {
      format: "%2I:%2M:%2S %p %2d %B %Y (UTC)",
      location: "header"
};

// **************************************************************************************************
// Signature Check settings - This script is from Wiki Developers Wiki.
// For author attribution, please see http://dev.wikia.com/wiki/SignatureCheck/code.js?action=history
// **************************************************************************************************

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

// ******************************
// Settings for ShowHide function
// ******************************

var ShowHideConfig = {
     brackets: '[]', 
     autoCollapse: 3,
};

// **************************************************************
// The code marked below was taken from
// http://mel-green.com/2009/02/javascript-1337-speak-translator/
// with a few minor translation improvements and tweaks to fit
// the wiki framework.
// **************************************************************

var PhrasesEnglish = 
        new Array('the', 'dude', 'hacker',
                  'hacks', 'you', 'cool', 'oh my gosh',
                  'fear', 'power', 'own',
                  'what the heck', 'elite', 'for the win', 
                  'loser', 'good game', 'sucks',
                  'sucker', 'is', 'rocks', 'winner');
    var PhrasesLeet = 
        new Array('teh', 'dood', 'haxxor', 'hax', 'u',
                  '1337', 'zomg', 'ph43', 'powwah', 'pwn', 
                  'wth', 'leet', 'ftw', 'n00b', 'gg',
                  'sux', 'suxxor', 'iz', 'rox', 'pwnster');

    var LettersEnglish = 
        new Array('n', 'b', 'k', 'd', 'e', 'f', 'g', 'h',
                  'p', 'm', 'r', 'l', 'o', 'q', 's', 't',
                  'u', 'x', 'w', 'y', 'z', 'c', 'a', 'j', 
                  'i', 'v', ' ');
    var LettersLeet = 
        new Array('/\\/', '|3', '|<', '[)', '3', '|=', '6', '|-|',
                  '|*', '|\\/|', '|2', '|_', '0', '0.', '5', '+',
                  '|_|', '><', '\\/\\/', '\'/', '2', '(', '/\\', '_|', 
                  '1', '\\/', '  ');

    function translateText(inputString) {

            for (i = 0; i < PhrasesEnglish.length; ++i)
                inputString = inputString.replace(
                        new RegExp(PhrasesEnglish[i], "gi"),
                        PhrasesLeet[i]
                        );
 
            for (i = 0; i < LettersEnglish.length; ++i)
                inputString = inputString.replace(
                        new RegExp(LettersEnglish[i], "gi"),
                        LettersLeet[i]
                        );
 
            return inputString;
    }

// *********************************************************************************
// End of copied code, http://mel-green.com/2009/02/javascript-1337-speak-translator
// *********************************************************************************

 function LeetTrigger() {
   $(".leet").each(function () {
     var originalText = $(this).html();
     $(this).html(translateText(originalText));
   });
 }
 addOnloadHook(LeetTrigger);

// ************
// Facebook Box
// ************

// thanks Ciencia

function fBox() {
	$('#redwallfbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=118744998155977&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
$(fBox);

function fBoxx() {
	$('#redwallfboxx').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/plugins/likebox.php?id=118744998155977&width=292&connections=0&stream=0&header=0" allowTransparency="true" align="top" frameborder="0" width="292" height="80" scrolling="no" />');
}
$(fBox);