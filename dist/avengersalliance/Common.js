// ! Configuration options for LockForums have to be before importArticles !
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Bringing back old conversations clutters the Forums. Please, let sleeping Threads lie.",
};

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
        "MediaWiki:Selector.js",
        "u:dev:ShowHide/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:SocialIcons/code.js",
        "w:c:dev:LockForums/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:MessageWallUserTags/code.js",
    ]
}, {
    type: "style",
    articles: [
        "MediaWiki:DropDownMenu.css",
        "MediaWiki:DropDownMenu2.css",
        "MediaWiki:Wikia.css/Highlight.css",
    ]
});

////////////////////////////////////////////////////////////////////////////////
// Social Icons (http://dev.wikia.com/wiki/SocialIcons)
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};

////////////////////////////////////////////////////////////////////////////////
// Custom User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
	csser: { u: 'CSS', order: 101 },
	templater: { u: 'Templates', order: 102, link:'Category:Templates',},
	imager: { u: 'Images',  order: 102, link:'Category:Images',},
	spriter: { u: 'Sprites', order: 103 },
	xmler: { u: 'XMLs', order: 104 },
	categ: { u:'Categorizer', },
	bureaucrat: { order: 1, link:'Marvel Avengers Alliance Wiki:Administrators', },
	sysop: { order: 1, link:'Marvel Avengers Alliance Wiki:Administrators',},
	rollback: { u: 'Special Officer (Rollback)', order: 1, link:'Marvel Avengers Alliance Wiki:Administrators',},
	chatmoderator: { order: 2, link:'Marvel Avengers Alliance Wiki:Administrators',},
// Custom Tags
	crypt: { u: 'Harbinger of Pestilence' },
	free: { u: 'Free Loader' },
	isk: { u: 'Master of Links' },
	jacob: { u: 'Dry Bones' },
	mottiy: { u: 'Overlord of Them All' },
	mrx: { u: 'IKÖN' },
	ouo: { u: 'ouo' },
	pkb: {u: 'Near-Encyclopedic Irascible Old Bastard' },
	scarl: { u: 'God of Mischief', order:-1/0 },
	shiz: {u: 'EXCELsior!' },
	jborg: {u: 'He-Man Moderator' },
	red: {u: 'Mad Stalker' },
	}
};
UserTagsJS.modules.custom = {
	'Agent nathan': ['imager',],
	'CrypTick Grey': ['crypt',],
	'Cyrus Annihilator': ['spriter',],
	'DemonicMRX11': ['rollback', 'mrx',],
	'Dr.Ghost': ['free',],
	'IronspeedKnight': ['rollback', 'isk',],
	'Jacobkoopa': ['jacob',],
	'Jborg007': ['jborg',],
	'Lycentia': ['csser', 'templater', 'spriter', 'categ',],
	'Mckrongs': ['imager', 'ouo',],
	'MGeffro': ['xmler',],
	'MottiYazata': ['mottiy',],
	'Potkettleblack': ['pkb',],
	'Red Madness': ['red',],
	'Scarlettolivia': ['scarl', 'templater',],
	'Shizoida': ['rollback','shiz',],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot']
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};

////////////////////////////////////////////////////////////////////////////////
// Message Wall / Forum Tags
window.MessageWallUserTags = {
    tagColor: 'brown',
    glow: true,
    glowSize: '12px',
    glowColor: 'black',
    users: {
        'Agent_nathan': 'Bureaucrat',
        'BlazeWu': 'Rollback',
        'CrypTick_Grey': 'Rollback • Harbinger of Pestilence',
        'Cyrus Annihilator': 'Admin • Sprites',
        'Dark_M_boT': 'Evilmost Bot',
        'Dark_M_clowN': 'Evilmost Bureaucrat',
        'DemonicMRX11': 'Chat Mod • Rollback',
        'Digopazdm': 'Admin',
        'Docbobm': 'Bureaucrat',
        'Dr.Ghost': 'Chat Mod • Free Loader',
        'Goldencahill': 'Rollback',
        'IronspeedKnight': 'Chat Mod • Rollback • Master of Links',
        'Jacobkoopa': 'Chat Mod • Dry Bones',
        'Jchn': 'Rollback',
        'Jeripengu': 'Bureaucrat',
        'Lycentia': 'Bureaucrat',
        'Mckrongs': 'Bureaucrat • ouo',
        'MGeffro': 'Bureaucrat',
        'MottiYazata': 'Chat Mod • Overlord of Them All',
        'Phtc': 'Admin',
        'Potkettleblack': 'Bureaucrat • Near-Encyclopedic Irascible Old Bastard',
        'Red Madness': 'Rollback',
        'Regulus22': 'Chat Mod • Rollback',
        'Scarlettolivia': 'Admin • God of Mischief',
        'Shadowhopeful': 'Admin',
        'Shizoida': 'Admin • EXCELsior!',
        'Tavarich': 'Chat Mod',
        'The5elements': 'Rollback',
        'WiiSage': 'Rollback',
        'Xobai': 'Admin'
    }
};

////////////////////////////////////////////////////////////////////////////////
// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
article = "";
 
var tooltipsOn = true;
 
var $tfb;
 
var $ttfb;
 
var $htt;
 
var activeHoverLink = null;
 
var tipCache = new Object;
 
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}
 
function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}
 
function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
    $ct.css({
        position: "fixed",
        top: newTop + "px",
        left: newLeft + "px"
    });
}
 
function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F").replace(/\+/g, "%2B") + "&action=render div.tooltip-content";
        if (tipCache[url] != null) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content module" style="background:#000000 !important; color:#ffffff"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}
 
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
    displayTip(e);
}
 
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F").replace("+", "%2B")).hover(showTip, hideTip).mousemove(moveTip);
    }
}
 
function ttMouseOver() {
    if (tooltipsOn) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        $(article + " span.ajaxttlink").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}
 
 
// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
        ttMouseOver();
});
// END OF TOOLTIP CODE
////////////////////////////////////////////////////////////////////////////////

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

/* Catch {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


////////////////////////////////////////////////////////////////////////////////
// START OF TOOGLE CODE
/* Toggles the display of elements on a page  */
/* Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che */
/* See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className || elem instanceof SVGElement)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);

/* 
////////////////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////////////////
*/
 
function fBox() {
    $('#fbox').append('<iframe scrolling="no" height="275" frameborder="0" align="top" width="290" src="https://www.facebook.com/connect/connect.php?id=TheMAAWiki&amp%3Bconnections=30" marginwidth="0" marginheight="0"></iframe>');
}
 
$(fBox);