/* User Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		usermonth: { u:'User of the Month', order: -1/0 },
		discord: 'Discord Moderator',
		assistant: 'Assistant'
	}
};

UserTagsJS.modules.custom = {
    'The_Smarter,_Wiser_King_Dedede': ['assistant'],
    'FireMatch': ['assistant'],
    'Chickenkrispies': ['discord'],
    'Idroppedmypen': ['discord'],
    'Minnesotaman2007!': ['discord'],
    'TheJasbre202': ['discord']
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see https://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
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
 
 function collapseTable( tableIndex ) {
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
 
 function createCollapseButtons() {
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
  function toggleNavigationBar(indexNavigationBar) {
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
function createNavigationBarToggleButton() {
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
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });
 
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

/* AjaxRC */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* End of AjaxRC */

/* LockOldBlogs and LockOldComments */

window.LockOldBlogs = {
    expiryDays: 90
};

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.lockOldComments.addNoteAbove = true;

/* End of LockOldBlogs and LockOldComments */

/*
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});
*/

/* Message Wall User Tags */

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'AMK152': 'Wiki Adopter • Bureaucrat • Administrator',
        'Spongebob456': 'Bureaucrat • Administrator',
        
        'Anthony2306': 'Administrator',
        'Kandy_Katie': 'Administrator',
        'Koolkitty108': 'Administrator',
        'TheKorraFanatic': 'Administrator',
        'SPONGEBOBSUPERFANINFINITY': 'Administrator',
        'Stryker305': 'Administrator',
        'BSpongeSM02':  'Administrator',
        'The_gamer_987654321':  'Administrator',
        'Thelxinoe': 'Administrator',
    
        'The_Smarter,_Wiser_King_Dedede': 'Assistant',
        'FireMatch': 'Assistant',

        'Idroppedmypen': 'Discussion Moderator',
        'SpongeTron D': 'Discussion Moderator',
        'Arthur_Read_fan': 'Discussion Moderator',
        'Minnesotaman2007!': 'Discussion Moderator',

        'TheJasbre202': 'Rollback',
        'Arthur_Read_fan': 'Rollback',
    }
};

/* End of Message Wall User Tags */

var quizName = "The ESB SpongeBob Quiz";
var quizLang = "en";
var resultsTextArray = [
      "You need to watch more SpongeBob!",
      "Not bad. You have a decent knowledge of SpongeBob.",
      "You are a SpongeBob expert!"
       ];
var questions = [

       ["How old is the character SpongeBob SquarePants (as of June 2018)?",
       "31",
       "25",
       "17",
       "13"],

       ["How does Squidward know Squilliam?",
       "They met in high school.",
       "They are brothers.",
       "They met during a symphony.",
       "They are cousins."],

       ["What is the name of the worm SpongeBob bought in the episode 'Dumped?'",
       "Rex",
       "Jerry",
       "Max",
       "Lary"],
 
       ["What did Mr. Krabs sell to the Flying Dutchman in order to talk to money in the episode 'Money Talks?'",
       "His soul",
       "His golden tooth",
       "SpongeBob",
       "His daughter, Pearl"],
 
       ["Where is Bikini Bottom located?",
       "Pacific Ocean",
       "Atlantic Ocean",
       "Indian Ocean",
       "Middle of nowhere"],
 
       ["Why does SpongeBob come to the Krusty Krab at 3 AM?",
       "To count the sesame seeds",
       "To pre-fry the patties",
       "To check if the security alarm is working",
       "For a midnight snack"],
 
       ["Which song was sung in the first movie?",
       "'Now That We're Men'",
       "'Ripped Pants'",
       "'F.U.N. Song'",
       "'Campfire Song Song'"],
 
       ["What was the name of the tour fish in 'Mr. Krabs Takes a Vacation?'",
       "Bill",
       "Jim",
       "Buck",
       "Joe"],
 
       ["What's the name of Sandy's twin brother?",
       "Randy",
       "Earl",
       "Scott",
       "Brandy"],
 
       ["What is the date in the episode 'To SquarePants or Not to SquarePants?'",
       "January 10",
       "January 7",
       "January 14",
       "January 18"]
        
        ];

/* voting system begin */

var WorldCupIterators = document.getElementsByClassName("WorldCupIterate");

if ( WorldCupIterators.length > 0 ) {

	//declaring variables

	var HasAllowedUserRights = false;

	var AllowedUserRights = ["bureaucrat", "sysop", "assistant", "threadmoderator", "rollback"];

	//determining user rights

	for (var i = 0; i < AllowedUserRights.length; i++) {
		HasAllowedUserRights = wgUserGroups.includes(AllowedUserRights[i]);
		if (HasAllowedUserRights) break;
	}

	//hiding if neccessary

	if (!HasAllowedUserRights) {
		for (var i = 0; i < WorldCupIterators.length; i++) {
			if (!WorldCupIterators[i].innerHTML.includes("Maxed")) {
				WorldCupIterators[i].innerHTML = "<div>NoRights</div>";
			}
		}
	}

}


if ( document.getElementById("ScoreVoteCountContainer") !== null ) {

	//determining outputWord

	var outputWord = document.getElementsByClassName("Notice2")[0].innerHTML.includes("archive") ? "result" : "status";

	//collecting all votes

	var SupportVoteScores = document.getElementsByClassName("SupportVoteNum");
	var NeutralVoteScores = document.getElementsByClassName("NeutralVoteNum");
	var OpposeVoteScores = document.getElementsByClassName("OpposeVoteNum");

	var votesCount = SupportVoteScores.length + NeutralVoteScores.length + OpposeVoteScores.length;
	var votesNumSum = 0;

	//processing support votes

	for (var i = 0; i < SupportVoteScores.length; i++) {
		if (SupportVoteScores[i].innerHTML === "NaN") {
			votesCount--;
		} else {
			votesNumSum += parseInt(SupportVoteScores[i].innerHTML);
		}
	}

	//processing oppose votes

	for (var i = 0; i < OpposeVoteScores.length; i++) {
		if (OpposeVoteScores[i].innerHTML === "NaN") {
			votesCount--;
		} else {
			votesNumSum -= parseInt(OpposeVoteScores[i].innerHTML);
		}
	}

	//getting configuration

	var ScoreVoteCount = document.getElementById("ScoreVoteCount");

	var ScoreVoteConfig = ScoreVoteCount.className.split(" ");

	var PassScoreRaw = ScoreVoteConfig[0].substring(2);
	var PassScore = !isNaN(PassScoreRaw) ? parseInt(PassScoreRaw) / 100.00 : 0.00;

	var WordRaw = ScoreVoteConfig[1].substring(1).split(/[0-9]/).slice(1);
	var WordZero = WordRaw[0].replace("_"," ");
	var WordMinus = WordRaw[1].replace("_"," ");
	var WordPlus = WordRaw[2].replace("_"," ");

	var TargetNameRaw = ScoreVoteConfig[2].substring(2);
	var TargetName = TargetNameRaw.replace("_"," ");

	var ResultRaw = ScoreVoteConfig[3].substring(1).split(/[0-9]/).slice(1);
	var ResultTrue = ResultRaw[0].replace("_"," ");
	var ResultFalse = ResultRaw[1].replace("_"," ");

	var ExceptRaw = ScoreVoteConfig[4].substring(1).split(/[0-9]/).slice(1);
	var ExceptOne = ExceptRaw[0].toLowerCase();
	var ExceptTwo = ExceptRaw[1].toLowerCase();

	//vote status helpers

	var neutralIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/b3/Neutral.png/revision/latest/scale-to-width-down/15?cb=20140913201058" alt="Neutral" height="15" width="15">';
	var supportIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/a/ab/Support.png/revision/latest/scale-to-width-down/15?cb=20140913200712" alt="Support" height="15" width="15">';
	var opposeIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/bc/Oppose.png/revision/latest/scale-to-width-down/15?cb=20140913200954" alt="Oppose" width="15" height="15">';

	var CurrScore = Math.round( (votesNumSum / votesCount) * 100 ) / 100;

	var CurrScoreStr = !isNaN(CurrScore) ? CurrScore.toFixed(2) : 'ERROR';

	var passes = PassScore > 0.00 ? CurrScore >= PassScore : CurrScore > 0.00;

	var ExceptInfo = ["zeroicon"];

	var ExceptCombRaw = ExceptOne + ExceptTwo;
	var ExceptComb = [];

	for (var i = 0; i < ExceptInfo.length; i++) {
		ExceptComb.push(ExceptCombRaw.includes(ExceptInfo[i]));
	}

	//defining vote status

	var currentVoteStatus = "";

	if (ResultTrue !== "" && ResultFalse !== "") {
		if (ExceptComb[0]) {
			currentVoteStatus += passes ? supportIcon : (CurrScore >= 0.00 ? neutralIcon : opposeIcon);
		} else {
			currentVoteStatus += passes ? supportIcon : opposeIcon;
		}
	} else {
		currentVoteStatus += CurrScore > 0.00 ? supportIcon : (CurrScore === 0.00 ? neutralIcon : opposeIcon);
	}

	currentVoteStatus += ' Community';

	if (CurrScore < 0.00) {
		currentVoteStatus += ' ' + WordMinus;
		if (TargetName !== "") {
			currentVoteStatus += ' ' + TargetName;
		}
	} else if (CurrScore > 0.00) {
		currentVoteStatus += ' ' + WordPlus;
		if (TargetName !== "") {
			currentVoteStatus += ' ' + TargetName;
		}
	} else {
		currentVoteStatus += ' is ' + WordZero;
		if (TargetName !== "") {
			currentVoteStatus += ' towards ' + TargetName;
		}
	}

	if (!currentVoteStatus.includes(WordZero)) {
		currentVoteStatus += ' with score "' + CurrScoreStr + '"';
	}

	if (ResultTrue !== "" && ResultFalse !== "") {
		if (CurrScoreStr !== 'ERROR') {
			currentVoteStatus += ', ' + outputWord + ' is "' + (passes ? ResultTrue : ResultFalse) + '"';
		} else {
			currentVoteStatus += ', ' + outputWord + ' is "undefined"';
		}
	}

	currentVoteStatus += '.';

	//writing vote status to page

	ScoreVoteCount.innerHTML = currentVoteStatus;

}

if ( document.getElementById("ScoreVoteCountContainerMulti") !== null ) {

	//determining outputWord

	var outputWord = document.getElementsByClassName("Notice2")[0].innerHTML.includes("archive") ? "result" : "status";

	//getting configuration

	var ScoreVoteCount = document.getElementById("ScoreVoteCount");

	var ScoreVoteConfig = ScoreVoteCount.className.split(" ");

	var ResultRaw = ScoreVoteConfig[3].substring(1).split(/[0-9]/).slice(1);
	var ResultTrue = ResultRaw[0].replace("_"," ");
	var ResultNull = ResultRaw[2].replace("_"," ");

	var ExceptRaw = ScoreVoteConfig[4].substring(1).split(/[0-9]/).slice(1);
	var ExceptOne = ExceptRaw[0].toLowerCase();
	var ExceptTwo = ExceptRaw[1].toLowerCase();

	//collect exceptions

	var ExceptInfo = ["multiresult", "bluegreen", "colorprods"];

	var ExceptCombRaw = ExceptOne + ExceptTwo;
	var ExceptComb = [];

	for (var i = 0; i < ExceptInfo.length; i++) {
		ExceptComb.push(ExceptCombRaw.includes(ExceptInfo[i]));
	}

	//exception variables

	var resultExpr = "";

	var currProds = [];
	var currScores = [];

	var keyB = ExceptComb[1] ? document.getElementById("489bce").innerHTML : "";
	var keyG = ExceptComb[1] ? document.getElementById("5fa41e").innerHTML : "";

	var colorProdsSpan = document.getElementsByClassName("ffffcc");
	var colorProds = [];

	//collecting all votes

	var SupportVoteScores = document.getElementsByClassName("SupportVoteNum");
	var NeutralVoteScores = document.getElementsByClassName("NeutralVoteNum");
	var OpposeVoteScores = document.getElementsByClassName("OpposeVoteNum");

	var dictVotesCount = {};
	var dictVotesNumSum = {};

	if (ExceptComb[2]) {
		for (var keySpan in colorProdsSpan) {
			if (colorProdsSpan.hasOwnProperty(keySpan)) {
				var key = colorProdsSpan[keySpan].innerHTML; colorProds.push(key);
				dictVotesCount[key] = 0.00; dictVotesNumSum[key] = 0.00;
			}
		}
	} else if (ExceptComb[1]) {
		dictVotesCount[keyB] = 0.00; dictVotesCount[keyG] = 0.00;
		dictVotesNumSum[keyB] = 0.00; dictVotesNumSum[keyG] = 0.00;
	}

	//processing support votes

	for (var i = 0; i < SupportVoteScores.length; i++) {
		var key = SupportVoteScores[i].parentElement.className;

		if (key === "" && ExceptComb[1]) {
			key = SupportVoteScores[i].parentElement.parentElement.parentElement.innerHTML.includes("SupportBlue") ? keyB : keyG;
		}

		if (!dictVotesCount.hasOwnProperty(key)) {
			dictVotesCount[key] = 0;
			dictVotesNumSum[key] = 0;
		}

		if (SupportVoteScores[i].innerHTML !== "NaN") {
			dictVotesCount[key] += 1;
			dictVotesNumSum[key] += parseInt(SupportVoteScores[i].innerHTML);
		}
	}

	//processing neutral votes

	if (!ExceptComb[1]) {
		for (var i = 0; i < NeutralVoteScores.length; i++) {
			var key = NeutralVoteScores[i].parentElement.className;

			if (!dictVotesCount.hasOwnProperty(key)) {
				dictVotesCount[key] = 0;
				dictVotesNumSum[key] = 0;
			}

			if (NeutralVoteScores[i].innerHTML !== "NaN") {
				dictVotesCount[key] += 1;
			}
		}
	}

	//processing oppose votes

	for (var i = 0; i < OpposeVoteScores.length; i++) {
		var key = OpposeVoteScores[i].parentElement.className;

		if (!dictVotesCount.hasOwnProperty(key)) {
			dictVotesCount[key] = 0;
			dictVotesNumSum[key] = 0;
		}

		if (OpposeVoteScores[i].innerHTML !== "NaN") {
			dictVotesCount[key] += 1;
			dictVotesNumSum[key] -= parseInt(OpposeVoteScores[i].innerHTML);
		}
	}

	//defining vote status

	var counter = 0;

	var currentVoteStatus = "";

	var hasError = false;

	var tmpCollection = !ExceptComb[2] ? dictVotesCount : colorProds;

	for (var key in tmpCollection) {
		if (tmpCollection.hasOwnProperty(key)) {
			var tmpCurrScore = 0.00, tmpCurrScoreB = 0.00, tmpCurrScoreG = 0.00;
			if (ExceptComb[2]) key = colorProds[key];
			if (!ExceptComb[1]) {
				tmpCurrScore = Math.round( (dictVotesNumSum[key] / dictVotesCount[key]) * 100 ) / 100;
			} else if (counter === 0) {
				tmpCurrScoreB = dictVotesNumSum[keyB] * (parseFloat(dictVotesCount[keyB]) / (dictVotesCount[keyB] + dictVotesCount[keyG]));
				tmpCurrScoreG = dictVotesNumSum[keyG] * (parseFloat(dictVotesCount[keyG]) / (dictVotesCount[keyB] + dictVotesCount[keyG]));
			}
			if (!ExceptComb[1] && counter > 0) currentVoteStatus += ", ";
			if (!ExceptComb[1]) {
				currentVoteStatus += '"' + key + '" has score "' + (!isNaN(tmpCurrScore) ? tmpCurrScore.toFixed(2) : 'ERROR') + '"';
			} else if (counter === 0) {
				currentVoteStatus += '"' + keyB + '" has score "' + (!isNaN(tmpCurrScoreB) ? tmpCurrScoreB : 0.00).toFixed(2) + '", ';
				currentVoteStatus += '"' + keyG + '" has score "' + (!isNaN(tmpCurrScoreG) ? tmpCurrScoreG : 0.00).toFixed(2) + '"';
			}
			if (ExceptComb[0]) {
				if (!ExceptComb[1]) {
					currProds.push(key);
					currScores.push(tmpCurrScore);
				} else if (counter === 0) {
					currProds.push(keyB); currProds.push(keyG);
					currScores.push(tmpCurrScoreB); currScores.push(tmpCurrScoreG);
				}
			}
			if (isNaN(tmpCurrScore)) hasError = true;
			counter += 1;
		}
	}

	if (ExceptComb[0]) {
		var maxIX = 0;
		for (var i = 1; i < currScores.length; i++) {
			if (currScores[i] > currScores[maxIX]) maxIX = i;
		}

		var countMax = 0;
		for (var i = 0; i < currScores.length; i++) {
			if (currScores[i] === currScores[maxIX]) countMax += 1;
		}

		if (!hasError) {
			resultExpr = ', ' + outputWord + ' is "' + (countMax === 1 ? currProds[maxIX] + ' ' + ResultTrue : ResultNull) + '"';
		} else {
			resultExpr = ', ' + outputWord + ' is "undefined"';
		}
	}

	if (counter > 0) {
		currentVoteStatus += (ExceptComb[0] ? resultExpr : "") + '.';
	} else {
		currentVoteStatus += 'N/A';
	}

	//writing vote status to page

	document.getElementById("ScoreVoteCount").innerHTML = currentVoteStatus;

}

/* voting system end */


/* timeCircles begin - needs to be HTTPS compliant 
mw.hook('wikipage.content').add(function($content) {
    $content.find('.TimeCirclesDiv:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                scrolling: 'no',
                src: 'https://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' +
                     mw.html.escape($this.text().slice(1, -1)),
                width: '100%',
                height: Math.round($this.prop('offsetWidth') / 4) + 'px'
            })
        );
    });
});
/* timeCircles end */