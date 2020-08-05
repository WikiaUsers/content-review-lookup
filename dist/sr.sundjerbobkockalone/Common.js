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
    $("span.insertusername").html(wgUserName);
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

/* User Tags */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder', order: -1/0 },
		bureaucrat: { u:'Bureaucrat', order: -1/0 },
		adopter: { u:'Wiki Adopter', order: -1/0 },
		usermonth: { u:'User of the Month', order: -1/0 },
		facebook: 'Facebook Manager',
		twitter: 'Twitter Manager',
		google: 'Google+ Manager',
		assistant: 'Assistant',
		skype: 'Skype Admin',
		captures: 'SpongeBob Captures Manager',
		youtube: 'YouTube Manager',
		socialmedia: 'Social Media Manager',
		chatbotop: 'SpongeBobiaChatBot Operator',
		discorda: 'Discord Admin',
		discordm: 'Discord Manager',
		instagram: 'Instagram Manager'
	}
};

UserTagsJS.modules.custom = {
    '120d': ['youtube'],
    'Alex.sapre': ['skype', 'discordm'],
    'AMK152': ['adopter', 'skype', 'discorda', 'facebook'],
    'AW10': ['captures'],
    'Golfpecks256': ['instagram', 'discorda'],
    'Haldir': ['founder'],
    'Kingdevo215': ['usermonth'],
    'Spongebob456': ['skype', 'discorda', 'socialmedia'],
    'TheKorraFanatic': ['chatbotop', 'discorda']
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];

/* End of User Tags */

/* AjaxRC */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* End of AjaxRC */

/* LockForums and LockOldBlogs */

window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 90
};

window.LockOldBlogs = {
    expiryDays: 90
};

/* End of LockForums and LockOldBlogs */

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
        
        'Jackninja5DipperGravityFalls': 'Administrator',
        'Figmeister': 'Administrator',
        'Golfpecks256': 'Administrator',
        'Koolkitty108': 'Administrator',
        'Alex.sapre': 'Administrator',
        'TheKorraFanatic': 'Administrator',
    
        'DragonSpore18': 'Assistant',
        'The Smarter, Wiser King Dedede': 'Assistant',
        'EmilyHarmonizer02': 'Assistant',
        'Anthony2306': 'Assistant • Discussion Moderator',

        'Qwertyxp2000 the second': 'Discussion Moderator',
        'Chickenkrispies': 'Discussion Moderator',
        
        'Auron~Guardian': 'Chat Moderator',
        'BoopEsponja':    'Chat Moderator',
        
        'Plant Protecter': 'Rollback',
        'Expert at Terraria': 'Rollback',
        'FlyingDutchmen': 'Rollback',
        'Kandy Katie':    'Rollback'
    }
};

/* End of Message Wall User Tags */

var quizName = "The ESB SpongeBob Quiz";
var quizLang = "en";
var resultsTextArray = [
      "Требало би више да гледаш Сунђер Боба!",
      "Није лоше. Имате добро знање о Сунђер Бобу.",
      "Ви сте Сунђер Боб експерт!"
       ];
var questions = [

       ["Колико година има лик Сунђер Боб Коцкалоне (од јуна 2018)?",
       "31",
       "25",
       "17",
       "13"],

       ["Како је Лигњослав упознао Лигњорада?",
       "Упознали су се у средњој школи.",
       "Они су браћа.",
       "Упознали су се током симфоније.",
       "Они су рођаци."],

       ["Које је име црва ког је Сунђер Боб купио у епизоди 'Одбачен?'",
       "Рекс",
       "Џери",
       "Макс",
       "Лери"],
 
       ["Шта је гдин. Краба продао Летећем, Холанђанину какоби причао са новцем у епизоди 'Говор пара?'",
       "Своју душу",
       "Свој златни зуб",
       "Сунђер Боба",
       "Своју ћерку, Бисерку"],
 
       ["Где се налази Коралово?",
       "Тихи океан",
       "Атлантски океан",
       "Индијски океан",
       "Усред ничега"],
 
       ["Зашто је Сунђер Боб дошао у Код Кеба крабе у 3 ујутро?",
       "Да преброји семе сусама",
       "Да испече пљескавице",
       "Да би проврио да ли аларм ради",
       "На поноћну ужину"],
 
       ["Која је песма отпевана у првом филму?",
       "'Now That We're Men'",
       "'Ripped Pants'",
       "'F.U.N. Song'",
       "'Campfire Song Song'"],
 
       ["Како се звала риба водич у епизоди 'Госн' Крабин одмор?'",
       "Бил",
       "Џим",
       "Бак",
       "Џои"],
 
       ["Како се зове Сендин брат близанац?",
       "Ренди",
       "Ирл",
       "Скот",
       "Бренди"],
 
       ["Који је датум у епизоди 'Коцкалонити или не коцкалонити?'",
       "10. јануар",
       "7. јануар",
       "14. јануар",
       "18. јануар"]
        
        ];

/* voting system begin */

if ( document.getElementById("ScoreVoteCountContainer") !== null ) {

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

	var WordRaw = ScoreVoteConfig[1].substring(1).split(/[0-9]/).splice(1,3);
	var WordZero = WordRaw[0].replace("_"," ");
	var WordMinus = WordRaw[1].replace("_"," ");
	var WordPlus = WordRaw[2].replace("_"," ");

	var TargetNameRaw = ScoreVoteConfig[2].substring(2);
	var TargetName = TargetNameRaw.replace("_"," ");

	var ResultRaw = ScoreVoteConfig[3].substring(1).split(/[0-9]/).splice(1,2);
	var ResultTrue = ResultRaw[0].replace("_"," ");
	var ResultFalse = ResultRaw[1].replace("_"," ");

	var ExceptRaw = ScoreVoteConfig[4].substring(1).split(/[0-9]/).splice(1,2);
	var ExceptOne = ExceptRaw[0].toLowerCase();
	var ExceptTwo = ExceptRaw[1].toLowerCase();

	//vote status helpers

	var neutralIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/b3/Neutral.png/revision/latest/scale-to-width-down/15?cb=20140913201058" alt="Neutral" height="15" width="15">';
	var supportIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/a/ab/Support.png/revision/latest/scale-to-width-down/15?cb=20140913200712" alt="Support" height="15" width="15">';
	var opposeIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/bc/Oppose.png/revision/latest/scale-to-width-down/15?cb=20140913200954" alt="Oppose" width="15" height="15">';

	var CurrScore = Math.round( (votesNumSum / votesCount) * 100 ) / 100;

	if (isNaN(CurrScore)) CurrScore = 0.00;

	var CurrScoreStr = CurrScore.toFixed(2);

	var passes = PassScore > 0.00 ? CurrScore >= PassScore : CurrScore > 0.00;

	var ExceptInfo = ["zeroicon"];

	var ExceptCombRaw = ExceptOne + ExceptTwo;
	var ExceptComb = [];

	for (var i = 0; i < ExceptInfo.length; i++) {
		ExceptComb.push(ExceptCombRaw.includes(ExceptInfo[i]));
	}

	//defining vote status

	var currentVoteStatus = "";

	currentVoteStatus += '<span style="font-size:15px; font-weight:normal;">';

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
	}

	if (!currentVoteStatus.endsWith(WordZero)) {
		currentVoteStatus += ' with score "' + CurrScoreStr + '"';
	}

	if (ResultTrue !== "" && ResultFalse !== "") {
		currentVoteStatus += ', result is "' + (passes ? ResultTrue : ResultFalse) + '"';
	}

	currentVoteStatus += '.';

	currentVoteStatus += '</span>';

	//writing vote status to page

	ScoreVoteCount.innerHTML = currentVoteStatus;

}

if ( document.getElementById("ScoreVoteCountContainerMulti") !== null ) {

	//collecting all votes

	var SupportVoteScores = document.getElementsByClassName("SupportVoteNum");
	var NeutralVoteScores = document.getElementsByClassName("NeutralVoteNum");
	var OpposeVoteScores = document.getElementsByClassName("OpposeVoteNum");

	var dictVotesCount = {};
	var dictVotesNumSum = {};

	//processing support votes

	for (var i = 0; i < SupportVoteScores.length; i++) {
		var key = SupportVoteScores[i].parentElement.className;

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

	currentVoteStatus += '<span style="font-size:15px; font-weight:normal;">';

	for (var key in dictVotesCount) {
		if (dictVotesCount.hasOwnProperty(key)) {
			var tmpCurrScore = Math.round( (dictVotesNumSum[key] / dictVotesCount[key]) * 100 ) / 100;
			if (isNaN(tmpCurrScore)) tmpCurrScore = 0.00;
			if (counter > 0) currentVoteStatus += ", ";
			currentVoteStatus += '"' + key + '" has score "' + tmpCurrScore.toFixed(2) + '"';
			counter += 1;
		}
	}

	currentVoteStatus += counter === 0 ? 'N/A' : '.';

	currentVoteStatus += '</span>';

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
                src: 'http://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' +
                     mw.html.escape($this.text().slice(1, -1)),
                width: '100%',
                height: Math.round($this.prop('offsetWidth') / 4) + 'px'
            })
        );
    });
});
/* timeCircles end */