/**
 * 19:29, May 18, 2015 (UTC)
 * http://springtimeofyouth.wikia.com/wiki/MediaWiki:Common.js
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Monobook).
 */

(function (window, $, mw) {
	"use strict";

	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];

					/* Scripts to be loaded everywhere */

	// Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
	scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

	// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');

	// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';
	scriptList.push('u:dev:ArchiveTool/code.js');

	// User tags
	window.UserTagsJS = {
		tags: {
			bureaucrat: {
				link: 'Project:Bureaucrat'
			},
			sysop: {
				link: 'Project:Sysop',
				title: 'System-Operator ( Administrator )'
			},
			rollback: {
				link: 'Project:Rollback'
			},
			forumop: {
				u: 'Forum Operator',
				title: 'Helps operate the forums'
			},
			inactive: {
				title: 'The user hasn\'t edited for last 30 days'
			}
		},
		modules: {
			inactive: 30,
			mwGroups: [
				'bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global'
			],
			autoconfirmed: false,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			userfilter: {
				TranClan: ['bureaucrat'] // Hide bureaucrat from inactive founder
			},
			custom: {
				WindStar7125: ['forumop']
			}
		}
	};
	scriptList.push('u:dev:UserTags/code.js');

	// Null Edit button
	// Conditionally load purge button if page cannot be edited
	if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
		scriptList.push('u:dev:NullEditButton/code.js');
	} else {
		scriptList.push('u:dev:PurgeButton/code.js');
	}

	// List Files. See [[Rock Lee's Springtime of Youth Wiki:ListFiles]]
	scriptList.push('u:dev:ListFiles/code.js');

	// Warnings
	scriptList.push('MediaWiki:Common.js/Warnings.js');

	// Reference Popups, like on Wikipedia
	scriptList.push('u:dev:ReferencePopups/code.js');
	
	//Displays time at top right of screen
	scriptList.push('u:dev:DisplayClock/code.js');

					/* Page specific scripts */

	// List Duplicate images
	if (mw.config.get('wgPageName') === 'Rock Lees Springtime of Youth Wiki:Duplicate_Images') {
		pageScriptList.push('u:dev:DupImageList/code.js');
	}

	// Various changes to the new forums
	if (({1201: 1, 2000: 1})[mw.config.get('wgNamespaceNumber')] === 1 || 
        mw.config.get('wgCanonicalSpecialPageName') === 'Forum'
    ) {
        // Lock forums if not commented for 60 days
        // Place a warning after 30 days
        window.LockForums = {
            expiryDays: 60,
            expiryMessage: "This thread hasn't been commented on for over <actualDays> days. There is no need to reply.",
            warningDays: 30,
            banners: true,
            ignoreDeletes: true,
            warningPopup: true,
        };
        pageScriptList.push('u:dev:LockForums/code.js');

        window.ArchiveBoards= {
            boards : ["Wiki Discussions Archive", "Chapter Archives"],
            groupCustom : ["forumadmin"]
        };
        pageScriptList.push('u:dev:ArchiveBoards/code.js');

        pageScriptList.push('MediaWiki:Common.js/ForumChanges.js');
	}

	// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
		);
	}

					/* Small scripts which donot need a seperate page (Snippets) */

	// Remove red-links (deleted pages) from Recent Changes
	// [They stay red, they just don't link to ?action=edit]
	if (({
		Recentchanges: 1,
		Log: 1
	})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function () {
				$('a.new').each(function () {
					this.href = this.href.replace(/\?[^?]*$/, '');
				});
			};
		$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}

	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {
		// Detach the AJAX feature from Image Creation/Upload
		// because the pop-up form does not obey the preloads and such.
		$(window).load(function() {
		});

		// Add link to ParentPage to Wiki-Nav
		// Idea from avatar wiki
		$("<li><a>").addClass('subnav-2-item')
			.find('a').attr({
					'href': '/wiki/Project:ParentPage',
					'class': 'subnav-2a'
				}).text('Parent Page').end()
		.appendTo($('.WikiHeader nav ul li.marked ul'));
	}

	// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Insert text',
			'mw-editbutton-redirect'
		);

		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'Add the ō character',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
		
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'Add the ū character',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);

		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Add a Chapter Reference',
			'<ref>',
			'</ref>',
			'Chapter 0, page 0',
			'mw-editbutton-ref'
		);
	}
    
	// HOOK: Verbatim imports embedded on particular pages.
	if ($.isArray(window.pageNeededScripts)) {
		pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
		try {
			delete window.pageNeededScripts;
		} catch (e) {
			window.pageNeededScripts = null;
		} // IE8 sucks.
	}

	// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});
}(window, jQuery, mediaWiki));

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
    var tpm = '';
  } else {
    var tpm = '';
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
 
importScriptPage('ShowHide/code.js', 'dev');
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************



// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
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
        if (typeof elem.className != 'string' || !elem.className) 
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
 
// </syntax>

/********************************/
    /* Tooltips for the icons */
    /********************************/

    $("#icons a").tooltip();