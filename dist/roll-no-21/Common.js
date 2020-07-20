// <pre><nowiki>
// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "less";
 var expandCaption = "more";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
 addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars
// ============================================================
// </nowiki></pre>

 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* User Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder', order: -1/0 },
		adopter: { u:'Wiki Adopter', order: -1/0 },
		usermonth: { u:'User of the Month', order: -1/0 },
		facebook: 'Facebook Manager',
		twitter: 'Twitter Manager',
		google: 'Google+ Manager',
		assistant: 'Assistant',
		skype: 'Skype Admin',
		captures: 'SpongeBob Captures Manager'
	}
};

UserTagsJS.modules.custom = {
    'Haldir': ['founder'],
	'AMK152': ['adopter', 'facebook'],
	'Spongebob456': ['twitter', 'google', 'skype'],
	'President Dubstep': ['facebook', 'twitter', 'google', 'skype'],
	'SBCA': [ 'usermonth', 'facebook'],
	'AW10': ['captures']
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];

/* End of User Tags */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:UserTags/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:Quiz/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:MiniComplete/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:AjaxRC/code.js',
        'ESB:JavaScripts/Standard_Edit_Summary.js'
        // ...
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:PurgeBlogs/code.js",
        "w:c:dev:PageRenameAuto-update/code.js"
    ]
});

/* Message Wall User Tags */

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'AMK152': 'Wiki Adopter • Bureaucrat • Administrator',
        'JCM': 'Bureaucrat • Administrator',
        'Spongebob456': 'Bureaucrat • Administrator',
        'ZeoSpark': 'Bureaucrat • Administrator',
     
        'Nicko756': 'Administrator',
        'Tanhamman': 'Administrator',     
        'President_Dubstep': 'Administrator',
        'Tominator777': 'Administrator',
        'Dragonballgtgoku': 'Administrator',
        'TheGamingSponge': 'Administrator',
        'Spongebob2567': 'Administrator',
        '120d': 'Administrator',
        'AW10': 'Administrator',
        'SBCA': 'Administrator',
        
        'Jensonk': 'Assistant'
    }
};

/* End of Message Wall User Tags */

var quizName = "The Roll No.21 Quiz";
var quizLang = "en";
var resultsTextArray = [ 
	"Sorry, You got the least score, try to watch Roll No. 21 More",
	"Hmmm, Not Bad. Try to watch even more.",
	"Yay! You won the quiz!" 
	];
var questions = [
 
	["What is the age of the show?",
	"5",
	"4",
	"2",
	"3"], 
 
	["Who is the enemy of Kanishk who is the commander of Paatal lok?",
	"Himka",
	"Miss Girgiti",
	"Ranga"],
 
	["Kris has 5 best friends",
	"Yes",
	"No"],
	
	["What is Kris' favorite food?",
	"Butter",
	"Noodles",
	"Donuts",
	"Ice-Cream"],
	
	["Who is an asur who always carries a paint brush?",
	"Ranga",
	"Madhu",
	"Golu",
	"Mummyasur"],
	
	["Who is the librarian when the staffs of Mathura were younger?",
	"Miss Girgitti",
	"Suparna",
	"Pinky",
	"Bun Bun Mausi"],
	
	["What does Kris' friends like to do?",
	"Saying what they did on that day, at Night with Kris",
	"Butter",
	"Apple",
	"Chapathi"],
	
	["Who is the main minion of Kanishk?",
	"Doctor J",
	"Tarak",
	"Suparna",
	"Jwalasura"],
	
	["On Teachers' Day Episode, Tarak gave toffees to children. What did the toffees do to them?",
	"Changing Colors in their mouth",
	"They were changed into animals",
	"They became fat",
	"They became hypnotized"],
	
	["Who selled Tattoos in one episode who was the asur Ranga?",
	"Tony",
	"Ranga",
	"Jwalasur",
	"Sumosur"],
	
	
	
    
];