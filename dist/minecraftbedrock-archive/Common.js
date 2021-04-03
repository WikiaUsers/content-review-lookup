//User Tags
 
window.UserTagsJS = {
	modules: {},
	tags: {
        coder: { u:'Coder', order:3 },
        owner: { u:'Adopted Owner', order:-1/0 },
        ina: { u:'Retired staff', order:-1/0 },
        rollback: { u:'Rollback', order:1 },
        editprotected: { u:'Editprotected' },
        bot: { u:'Bot', order:-1/0 },
        bunny: { u:'Bunny', order:2 },
        zombie: { u:'Zombie', order:2 },
        ocelot: { u:'Ocelot', order:2 },
        wolf: { u:'Wolf', order:2 },
        zombiep: { u:'Zombie Pigman', order:2 },
        slime: { u:'Slime', order:2 },
        steve: { u:'Steve', order:2 },
        blaze: { u:'Coder', order:2 },
        snowgolem: { u:'Snow Golem', order:2 },
        irongolem: { u:'Iron Golem', order:2 },
        ghast: { u:'Ghast', order:2 },
        ws: { u:'Wither Skeleton', order:2 },
        enderman: { u:'Enderman', order:2 },
        creeper: { u:'Creeper', order:2 },
        enderd: { u:'Ender Dragon', order:2 },
        wither: { u:'Wither', order:2 },
                
	},
	oasisPlaceBefore:''
};
 
UserTagsJS.modules.custom = {
    'Dblcut3': ['owner'],
    'Darthwikia25': ['enderd', 'coder'],
    'Zombie Jockey of MCPE': ['zombiep'],
};


UserTagsJS.modules.metafilter = {
    'rollback': ['sysop'],
    'sysop': ['bot', 'bureaucrat'],
    'editprotected': ['bot', 'sysop', 'chatmoderator', 'threadmoderator'],
    'newuser': ['bot'],
    'notautoconfirmed': ['bot'],
    'inactive': ['bot', 'sysop']
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'chatmoderator',
    'threadmoderator',
    'editprotected',
    'bot'
];


UserTagsJS.modules.autoconfirmed = false;

//AjaxRC Config
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:WikiActivity"
];

//Replaces {{USERNAME}} with the name of the user browsing the page.
//For use with [[Template:Username]]
$(function() { if (wgUserName) { $('.insertusername').text(wgUserName); } });

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:The-buster-ZX, User:BlueJay11, User:BrickfilmNut
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
 *  Maintainers: [[User:The-buster-ZX]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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


//Skin change buttons
$(function CreateSkinChangeButtons() {
    //Monobook buttons
    $('#p-cactions .pBody ul').append('<li id="ca-nstab-main" class="skinChangeTab" style="margin-left:36px"><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li><li id="ca-nstab-main" class="skinChangeTab"><a href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=vector" title="Change to Vector [v]" id="skinChangeButton" accesskey="o">Vector</a></li>');
});

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
// The options need to be set before the import! Otherwise they may not work.
 
importArticles({
    type: 'script',
    articles: [
        'u:callofduty:User:Cakemix/AutoYoutube.js', 
        'u:dev:AjaxRC/code.js',                    
        'u:dev:MediaWiki:AjaxUndo/code.js',         
        'u:dev:CategoryRenameAuto-update/code.js',
        'u:dev:Countdown/code.js',              
        'u:dev:DisplayClock/code.js',               
        'u:dev:DynamicImages/code.js',              
        'u:dev:LockOldBlogs/code.js',               
        'u:dev:NullEditButton/code.js',             
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:Voice_Dictation/voice.js',       
        'u:dev:Voice_Output/code.js',               
        'u:dev:WallGreetingButton/code.js',         
    ]
});

// LockForums
window.LockForums = {
    expiryDays: 20,
    expiryMessage: 'This thread has been archived. Please don\'t reply to archived threads.',
    warningDays: 5,
    warningMessage: 'This thread has been inactive for <actualDays>. Please be sure a reply won\'t disturb other users.',
    disableOn: ['98921'],
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: 'Old threads are maintained for reference. Please don\'t reply to archived threads.',
    warningBannerMessage: 'This is an inactive thread. Please do not necropost unless absolutely necessary.',
    warningPopup: true,
    warningPopupMessage: 'This thread has been inactive for <actualDays>. By replying you will be giving user(s) unnecessary notifications. Note that necroposting is a bannable offense, and could result in your account being banned. Be sure that this is what you want to do.'
};


window.dev = window.dev || {};
window.dev.editSummaries = {
    select: [
        '(click to browse)',
        '1.Editing', [
            'Added Information',
            'Removed Information',
            'Updated Information',
            'Cleanup',
            'Removed fanon content',
            'Corrected spelling/grammar',
            'Formatted',
            'Added Categories',
            'Other (Please Specify Above)'
         ]
         /* etc. */
    ]
};

// Form Embed (Kudos to KockaAdmiral)
$(function() {
	$('.GoogleFormsField').each(function() {
		var el = $(this),
			data = el.data();
		el.html(mw.html.element('iframe', {
			src: 'https://docs.google.com/forms/d/e/' + data.id + '/viewform?embedded=true',
			width: data.width || 500,
			height: data.height || 500,
			frameborder: 0,
			marginheight: 0,
			marginwidth: 0
		}));
	})
});