/* Οποιοσδήποτε κώδικας JavaScript εδώ θα φορτωθεί για όλους τους χρήστες σε κάθε φόρτωση σελίδας. */

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
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

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            /* only add button and increment count if there is a header row to work with */
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
addOnloadHook(createCollapseButtons);

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
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
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
    for (
        var i = 0; NavFrame = divs[i]; i++
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
            for (
                var j = 0; j < NavFrame.childNodes.length; j++
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
        for (
            var i = 1; i <= indexNavigationBar; i++
        ) {
            toggleNavigationBar(i);
        }
    }

}
addOnloadHook(createNavigationBarToggleButton);

// END Dynamic Navigation Bars
// ============================================================

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
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
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
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
        founder: {
            u: 'Founder',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'Bureaucrat',
            order: -1 / 0
        },
        adopter: {
            u: 'Wiki Adopter',
            order: -1 / 0
        },
        usermonth: {
            u: 'User of the Month',
            order: -1 / 0
        },
        facebook: 'Facebook Manager',
        twitter: 'Twitter Manager',
        google: 'Google+ Manager',
        assistant: 'Assistant',
        skype: 'Skype Admin',
        captures: 'SpongeBob Captures Manager',
        youtube: 'YouTube Manager',
        news: 'News Team',
    }
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'bannedfromchat',
    'bot',
    'bot-global',
    'assistant',
    'moderator'
];
/* End of User Tags */

/* AjaxRC */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* End of AjaxRC */

/* LockForums and LockOldBlogs */

window.LockForums = {
    expiryDays: 90,
};

window.LockOldBlogs = {
    expiryDays: 90,
    nonexpiryCategory: "Never archived blogs"
};
/* End of LockForums and LockOldBlogs */

/* Message Wall User Tags */

window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Nick mick': 'Wiki Adopter • Bureaucrat • Administrator',
    }
};

/* End of Message Wall User Tags */

var quizName = "Το Quiz Γνώσεων της Σφουγγαροπαίδειας";
var quizLang = "el";
var resultsTextArray = [
    "Χρειάζεσαι να δεις περισσότερο Μπομπ Σφουγγαράκη!",
    "Όχι κι άσχημα. Έχετε μια αξιοπρεπή γνώση για τη σειρά.",
    "Είσαι και ο πρώτος!"
];
var questions = [

    ["Πόση είναι η ηλικία του χαρακτήρα Μπομπ Σφουγγαράκη (από τον Μάιο του 2017);",
        "30 ετών",
        "25 ετών",
        "17 ετών",
        "13 ετών"
    ],

    ["Πως ξέρει ο Καλαμάρης τον Καλαμαρίλιαμ;",
        "Γνωρίστηκαν στο γυμνάσιο.",
        "Είναι αδέρφια.",
        "Γνωρίστηκαν κατά τη διάρκεια μιας συμφωνίας.",
        "Είναι ξαδέρφια."
    ],

    ["Ποιο είναι το όνομα του σκουληκιού που αγόρασε ο Μπομπ στο επεισόδιο 'Ο Παρατημένος';",
        "Ρεξ",
        "Τζέρι",
        "Μαξ",
        "Λάρι"
    ],

    ["Τι πούλησε ο Κύριος Καβούρης στον Ιπτάμενο Ολλανδό για να έχει τη δυνατότητα να μιλάει στα χρήματα, στο επεισόδιο 'Τα Λεφτά Μιλάνε';",
        "Τη ψυχή του",
        "Το χρυσό του δόντι",
        "Τον Μπομπ Σφουγγαράκη",
        "Την κόρη του, Πέρλα"
    ],

    ["Που βρίσκεται ο Βυθός του Μπικίνι;",
        "Ειρηνικός Ωκεανός",
        "Ατλαντικός Ωκεανός",
        "Ινδικός Ωκεανός",
        "Μέση του πουθενά"
    ],

    ["Γιατί έρχεται ο Μπομπ Σφουγγαράκης στον Τραγανό Κάβουρα στις 3 π.μ.;",
        "Για να μετρήσει τους σουσαμόσπορους",
        "Για να ψήσει Πάττυ",
        "Για να τσεκάρει εάν ο συναγερμός ασφαλείας δουλεύει",
        "Για ένα νυχτερινό κολατσιό"
    ],

    ["Ποιο τραγούδι είχε τραγουδηθεί στην πρώτη ταινία;",
        "'Είμαστε Άντρες'",
        "'Σκισμένα Παντελόνια'",
        "'Το Τραγούδι της Π.ΛΑ.ΚΑ.(Σ)'",
        "'Το Τραγούδι του Κάμπινγκ'"
    ],

    ["Ποιο ήταν το όνομα του ψαριού περιηγητή στο 'Ο Κύριος Καβούρης πάει Διακοπές';",
        "Μπιλ",
        "Τζιμ",
        "Μπακ",
        "Τζόου"
    ],

    ["Ποιο είναι το όνομα του δίδυμου αδελφού της Σάντυ;",
        "Ράντυ",
        "Ερλ",
        "Σκοτ",
        "Μπράντι"
    ],

    ["Ποια είναι η ημερομηνιά που παόιχτηκε το επεισόδιο 'Καρχαρίες εναντίον Καλαμαριών' στην Ελλάδα;",
        "26 Δεκεμβρίου",
        "12 Δεκεμβρίου",
        "24 Ιανουρίου",
        "1 Ιανουαρίου"
    ]

];

/* voting system begin */

if (document.getElementById("ScoreVoteCountContainer") !== null) {

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

    //prcessing oppose votes

    for (var i = 0; i < OpposeVoteScores.length; i++) {
        if (OpposeVoteScores[i].innerHTML === "NaN") {
            votesCount--;
        } else {
            votesNumSum -= parseInt(OpposeVoteScores[i].innerHTML);
        }
    }

    //defining vote status

    var currentVoteScore = Math.round((votesNumSum / votesCount) * 100) / 100;

    var currentVoteStatus = "";

    if (currentVoteScore >= 1.00) {
        currentVoteStatus = '<span style="font-size:15px; font-weight:normal;"><img src="https://vignette.wikia.nocookie.net/spongebob/images/a/ab/Support.png/revision/latest/scale-to-width-down/15?cb=20140913200712" alt="Support" height="15" width="15"> Community supports proposal with score "' + currentVoteScore.toFixed(2) + '".</span>';
    } else {
        currentVoteStatus = '<span style="font-size:15px; font-weight:normal;"><img src="https://vignette.wikia.nocookie.net/spongebob/images/b/bc/Oppose.png/revision/latest/scale-to-width-down/15?cb=20140913200954" alt="Oppose" width="15" height="15"> Community opposes proposal with score "' + currentVoteScore.toFixed(2) + '".</span>';
    }

    //writing vote status to page

    document.getElementById("ScoreVoteCount").innerHTML = currentVoteStatus;

}
/* voting system end */

/* timeCircles begin */
var timeCrirclesDivs = document.getElementsByClassName("TimeCirclesDiv");

for (var i = 0; i < timeCrirclesDivs.length; i++) {
    var dateTime = timeCrirclesDivs[i].innerHTML.substring(1).split("]")[0];

    var width = "100%";

    var height = Math.round(timeCrirclesDivs[i].offsetWidth / 4) + "px";

    timeCrirclesDivs[i].innerHTML = '<iframe scrolling="no" src="http://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' + dateTime + '" style="width:' + width + '; height:' + height + ';"></iframe>';
}

/* timeCircles end */

if (mwCustomEditButtons.length) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [" + "[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
        "speedTip": "Comment visible only for editors",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insert comment here"
    };
}

window.SpoilerAlert = {
    pages: ["Spoiler"],
};

importArticles({
    type: "script",
    articles: [
        'u:admintools:MediaWiki:Wikia.js/cancelButton.js',
        'u:ESB:JavaScripts/Standard_Edit_Summary.js',
    ]
});