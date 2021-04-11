// Future socking.
// if (/Saness|SANESS|/g.test(wgUserName) && wgAction == 'edit'){
// alert('You have been suspected as a sock and therefore you edits will not be accepted. Please appeal to Ditto Creeper Bot, Doork, MasterSlenderTR or GlitchtaleFan123 if you have good intentions. You will be redirected to the Wiki Activity.');
// function out(){
// window.location.href = wgServer + '/wiki/Special:WikiActivity'
// }
// setTimeout(out(), 5000);
// }
/// @ DOORK YOU BUM ALWAYS MAKE SURE TO HAVE THE EMAIL TOKEN ATTACHED TO THE Summary before requesting such a script, ya BUM!!! EEeeeeeeeeeeeeeeeeeeeeeeeeeee

/*******************************************************************************
################ START GLITCHTALE WIKIA JAVASCRIPT ############################
*******************************************************************************/

///////////////////////////////////////////////////////////////////////////////
////////////////////////////// USER TAGS //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

window.UserTagsJS = {
    modules: {},
    tags: {
        Leader: {
            u: 'Leader',
            link: 'Category:Bureaucrats'
        },
        Series_Creator:{
            u: 'Series Creator',
            link: 'Category:Bureaucrats'
        },
        rollback: {
            link: 'Category:Wiki Staff'
        },
        newuser: {
            link: 'Special:Community'
        },
        bureaucrat: {
            link: 'Category:Bureaucrats'
        },
        sysop: {
            link: 'Category:Administrators'
        },
        'content-moderator': {
            link: 'Category:Content Moderators'
        },
        chatmoderator: {
            link: 'Category:Discussions Moderators'
        },
        bot: {
            link: 'Category:Wiki Staff'
        },
        founder: {
            link: 'Category:Wiki Staff'
        },
        threadmoderator: {
            link: 'Category:Discussions Moderators'
        },
        'moderator': {
           link: 'Category:Content Moderators',
           u: 'Moderator'
        }
    }
};
UserTagsJS.modules.custom = {
    'Acme Gamer': ['Leader'], 'Kindnessaj': ['Leader']
};
UserTagsJS.modules.userfilter = {
    'Acme Gamer': ['inactive'], 'Kindnessaj': ['inactive']
};

UserTagsJS.modules.newuser = {
    days: 7,
    edits: 10,
    namespaces: 0
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'threadmoderator',
    'patroller',
    'content-moderator',
    'rollback',
    'sysop',
    'bannedfromchat',
    'blocked',
    'bot',
    'bot-global',
    'staff',
    'vstf',
    'newuser',
    'helper'
];

UserTagsJS.modules.metafilter = {
    bureaucrat: ['bot'],
    sysop: ['bot'],
    newuser: [
        'bureaucrat',
        'chatmoderator',
        'threadmoderator',
        'patroller',
        'content-moderator',
        'rollback',
        'sysop',
        'bannedfromchat',
        'blocked',
        'bot',
        'bot-global',
        'staff',
        'vstf',
        'newuser',
        'helper'
    ],
    rollback: [
        'content-moderator',
        'sysop',
        'bureaucrat',
        'founder',
        'bot'
    ],
    'content-moderator': [
        'bot',
        'sysop',
        'bureaucrat'
    ],
    'moderator': [
        'bot',
        'sysop',
        'bureaucrat'
    ],
    bot: ['bot-global']
};
UserTagsJS.modules.implode = {
    // Combine all three moderator tags in one if a user has all three of them
	'moderator': [
        'content-moderator',
        'chatmoderator',
        'threadmoderator'
    ]
};

UserTagsJS.modules.inactive = 80; /* User is marked as inactive after 80 days
                                  of no activity */
UserTagsJS.modules.nonuser = true; // Tag users with no edits
UserTagsJS.modules.stopblocked = false; // Keep tags if user is banned
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.explode = {
    // Add Banned from Chat tag to all blocked users
    'bannedfromchat': ['blocked']
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////// END OF USER TAGS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// AjaxRC Configuration

window.ajaxSpecialPages = [
    "Recentchanges", 
    "Recentchangeslinked", 
    "WikiActivity", 
    "Watchlist", 
    "Log", 
    "Contributions", 
    "NewPages", 
    "Images", 
    "Following", 
    "UncategorizedPages",
    "Categories",
    "BlockList",
    "ListFiles",
    "Withoutimages",
    "DoubleRedirects",
    "Whatlinkshere"];
window.ajaxPages = ["Blog:Recent posts"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/glitchtale/images/6/60/Rainbow_Soul_Refresh.gif';

/*window.InactiveUsers = {
    months: 2,
    gone: ['Gebruiker1', 'Gebruiker2'],
    text: 'Inactive'
};*/

// setStyle("-fx-cursor:url('//vignette3.wikia.nocookie.net/undertale-rp/images/8/80/SoulBetter.png/revision/latest?cb=20151111100248'),auto");

// Locking Old Blogs

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Archived blogs"
};

// Allows one to update file-links across all pages when renaming an image
 
window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after renaming of image (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 1000
};
 
if (wgPageName.indexOf('Special:MovePage/File:') !== -1 || (wgCanonicalNamespace === 'File' && Storage)) {
    importScriptPage('FileUsageAuto-update/code.js', 'dev');
}
 
////////////////////////////////////////////////////////////////////////////////
///////////////// START CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS ///////////
////////////////////////////////////////////////////////////////////////////////

// Adds links to Special:WhatLinksHere to edit pages linked on it.

if (mw.config.get('wgCanonicalSpecialPageName') === 'Whatlinkshere') {
    $('#mw-whatlinkshere-list > li').each(function (ignore, element) {
        var link = new mw.Uri($(element).children('a').attr('href'));
        link.extend({action: 'edit'});
        $(element).find('.mw-whatlinkshere-tools > a:last-child')
            .after(' | ', $('<a>').attr('href', link.toString()).text('edit'));
    });
}

// Adds separate list of uncreated categories on Special:Categories.

if (mw.config.get('wgCanonicalSpecialPageName') === 'Categories') {
    var $newCats = $('<div>').css('float', 'right').text('Uncreated categories:');
    var $newCatsList = $('<ul>').appendTo($newCats);
    $('.mw-spcontent > ul').before($newCats);
    $('.mw-spcontent > ul > li').has('.newcategory').clone().appendTo($newCatsList);
}

// Adds a button to clear Deletion reasons

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

// Expand collapsed information on Recent Changes and Watchlist

if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Recentchanges', 'Recentchangeslinked', 'Watchlist']) !== -1) {
    $(window).load(function () {
        $('.mw-collapsible-toggle-collapsed').click();
    });
}

////////////////////////////////////////////////////////////////////////////////
///////////////// END CODES TAKEN FROM ONETWOTHREEFALL'S GLOBAL JS /////////////
////////////////////////////////////////////////////////////////////////////////

// Test if an element has a certain class.
// Increases general performance.
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
// Collapsible tables; allows tables to be collapsed, showing only the header.
// See [[Wikipedia:NavFrame]]. Taken from Wikipedia's Common.js.
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {return Boolean}
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) 
            Rows[i].style.display = "none";
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++)
            Rows[i].style.display = Rows[Number].style.display;
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[Number];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[Number];
            if (!Header) continue;
 
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
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[Number]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
 
addOnloadHook(createCollapseButtons);
 
// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
// Taken from Wikipedia's Common.js.
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar) {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {return Boolean}
 
     // if shown now
     if (NavToggle.firstChild.data === NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) 
                 NavChild.style.display = 'none';
             if (hasClass( NavChild, 'NavContent'))
                 NavChild.style.display = 'none';
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data === NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
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
             var i = 0; 
             i< divs.length; 
             i++
         ) {
             NavFrame = divs[i];
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild !== null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if (hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent')) {
                     if (NavChild.style.display === 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j = 0; 
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
  }
 
  addOnloadHook(createNavigationBarToggleButton);

// Purge Button Configuration
 
window.PurgeButtonText = 'RESET'; /* Reference to the power to reset in
                                           Undertale */

// Allows CSS to target pages with a specific template. Made by KockaAdmiralac upon request.
 
$('mw-content-text').attr('data-topic', $('#mw-content-text .article-topic').attr('data-topic'));
 
// Allows the entire box on Help:Contents to be clickable
 
if (wgPageName === 'Help:Contents') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/wiki/Help:' + $(this).attr('data-link');
    });
}
 
// Opens chat in a window when clicked through a page link or the homepage
 
$(".openchat a").click(function () {
    window.open(
        '/wiki/Special:Chat',
        'wikiachat',
        'width=600,height=600,menubar=no,status=no,location=no,'+
        'toolbar=no,scrollbars=no,resizable=yes'
    );return Boolean;
});

// Refresh Thread Script
 
window.RefreshThreads = {
    interval: 30000,
    auto_add: true
};

// Topic Block Log

TBL_GROUP = "undertale-en";

// SVG Image Scaling Script Config
 
window.dev = window.dev || {};
window.dev.DynamicImages = {
    svgGallery: true,
    svgLightbox: true,
    svgIncreaseSrc: 2
};

// UploadInPage Configuration
 
window.needsLicense = false;
window.allowMultiUpload = true;
window.maxFiles = 100;
window.uploadDetails = true;

// Allows text to be hidden in other text and revealed with a click

$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

// Reddit
importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditWidget.js',      // Adds reddit widget to id="reddit-widget"
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js' //Adds JS-Code for Admin Dashboard
	]
});


/** Extra toolbar options ******************************************************
*
*  Description: UNDOCUMENTED
*  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
*/

//This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
// This is based on the original code on Wikipedia:Tools/Editing tools
// To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
	"speedTip": "Redirect",
	"tagOpen": "#REDIRECT [[",
	"tagClose": "]]",
	"sampleText": "Insert text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
	"speedTip": "Strike",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
	"speedTip": "Superscript",
	"tagOpen": "<sup>",
	"tagClose": "</sup>",
	"sampleText": "Superscript text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
	"speedTip": "Subscript",
	"tagOpen": "<sub>",
	"tagClose": "</sub>",
	"sampleText": "Subscript text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
	"speedTip": "Small",
	"tagOpen": "<small>",
	"tagClose": "</small>",
	"sampleText": "Small Text"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
	"speedTip": "Insert hidden Comment",
	"tagOpen": "<!-- ",
	"tagClose": " -->",
	"sampleText": "Comment"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
	"speedTip": "Insert a picture gallery",
	"tagOpen": "\n<gallery>\n",
	"tagClose": "\n</gallery>",
	"sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
	"speedTip": "Insert block of quoted text",
	"tagOpen": "<blockquote>\n",
	"tagClose": "\n</blockquote>",
	"sampleText": "Block quote"};

mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
	"speedTip": "Insert a table",
	"tagOpen": '{| class="wikitable"\n|-\n',
	"tagClose": "\n|}",
	"sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};
}

//Redirect chat to a url if the chat isn't enabled
if (
    mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
    !mw.loader.getState('ext.Chat2')
) {
    window.location = 'https://glitchtale.fandom.com/wiki/Glitchtale_Wiki:Glitchtale_Discord';
}

//Discord
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'FQ2zStB',
    noRail: false,
    prependToRail: true
};


// (Sleep/Delay) Function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//Custom User Tags
function newwe(){
	var value = document.querySelector("#userProfileApp > div > section > div.user-identity-box__info > div > div.user-identity-header__attributes"); //> span:nth-child(4)

		//Creating a new Span Element
		var spanTag = document.createElement("span");
		spanTag.classList.add("user-identity-header__tag");
		//Creating a new Paragraph Element
		var pTag = document.createElement("p");

		//New Text Element Called Leader
		var text = document.createTextNode("Leader");

		//Appending Text to Paragraph
		pTag.appendChild(text);

		//Appending  Paragraph to Div as a child element
		spanTag.appendChild(pTag);

		//Tadaa, you got the answer ^^
		value.appendChild(spanTag);
}
	
switch (mw.config.values.profileUserName) {
    case 'Kindnessaj':
        // JS here will be applied to Kindnessaj-chan's Page
		sleep(5500).then(() => { newwe(); });
        break;
    case 'Acme Gamer':
        // JS here will be applied to Acme's Page
		sleep(5500).then(() => { newwe(); });
        break;
}