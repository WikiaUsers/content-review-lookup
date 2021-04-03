/*jshint smarttabs:true jquery:true browser:true bitwise:false laxbreak:true */
/*global mediaWiki */
 
// ES5 requires Date.parse to support this, ES3 doesn't (i.e. IE8 chokes on it)
Date.parseISO8601 = function(text) {
	"use strict";
	// Decode MediaWiki ISO8601 Strict date and convert it to milliseconds
	// This regex only supports basic dates that MediaWiki produces, it isn't comprehensive.
	// It also doesn't support non UTC Timezones, I'm pretty sure MW never curveballs us
	// like that though so it should be fine.
	var when = (/^(\d{4})-?(\d\d)-?(\d\d)[T\s](\d\d):?(\d\d):?(\d\d)(?:\.?(\d+))?(?:Z|\+00(?::?00)?)$/).exec(text);
	if (!when) {
		return NaN;
	}
	return +new Date(when[1], when[2] - 1, when[3], when[4], when[5], when[6], ('.' + when[7]) * 1000 | 0);
};
 
/**
 * UserTags Loader script
 *
 * UserTags is quite large and complex which means that the page weight is too much to bear
 * on every page load since most pages ARE NOT user pages. This mini-script decides whether
 * or not the current page is a user page then loads the full UserTags script only on those
 * pages. This drastically reduces the weight since this is far lighter so represents a
 * more acceptable every-page cost.
 */
(function(window, $, mw, config) {
"use strict";
 
// Core logic, detect user page and determine the skin and user names
var loaderData = (function($, mw) {
	//
	// Figure out what skin we're on.
	//
	var siteSkin = mw.config.get('skin');
	if (({oasis:1, wikia:1})[siteSkin] === 1) {
		siteSkin = 'oasis';
	} else if (({wowwiki:1, uncyclopedia:1, monobook:1, vector:1})[siteSkin] === 1) {
		siteSkin = 'monobook';
	} else {
		if (window.console) {
			window.console.log('USERTAGS(Loader): Unsupported skin:', siteSkin);
		}
		return;
	}
 
	//
	// Grab the username (complicated) and decide if we are going to run or not.
	// NOTE: We could use mw.Title for this but it must be loaded using
	//	mw.loader.using('mediaWiki.Title') first and doesn't really give us the right tools.
	//
	var username = mw.config.get('wgTitle'),
	    namespace = mw.config.get('wgNamespaceNumber') | 0;
 
	if (siteSkin === 'oasis') {
		// We need to figure out if we're on a user page or not without a DOM query
		// since we want to launch the AJAX ASAP without waiting for the DOM.
		if (({'-1':1, 2:1, 3:1, 500:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// No masthead on edit pages
		// Message Walls are always in edit mode
		if (mw.config.get('wgAction') === 'edit' && namespace !== 1200) {
			return;
		}
 
		// MediaWiki disallows names from containing forward slashes which is very
		// useful since we need to check for subpages and forward slashes are the
		// only real way to do it.
		// (Subpages are lacking the masthead)
		if (({1200:1, 500:1, 2:1, 3:1})[namespace] === 1 && username.indexOf('/') !== -1) {
			return;
		}
 
		// Special pages need special handling...
		if (namespace === -1) {
			username = null;
			namespace = mw.config.get('wgCanonicalSpecialPageName');
			if (namespace === 'Contributions') {
				// wgPageName/wgTitle does not include the username, we need to pull
				// it directly from the window location.
				username = window.location.pathname;
 
				// Special:Contributions is dumb, here are the URL possibilities:
				// Special:Contributions = You
				// Special:Contributions/ = You
				// Special:Contributions/Username = Username
				// index.php?title=Special:Contributions = You
				// index.php?title=Special:Contributions&target= = You
				// index.php?title=Special:Contributions&target=Username = Username
				// Special:Contributions?target=Username = Username (*sigh*)
				// Special:Contributions/Username?target=OtherUser = OtherUser (*facepalm*)
 
				// Find /Username
				namespace = window.decodeURIComponent(username.substr(username.lastIndexOf('/') + 1));
				// No user name, it displays self
				namespace = (namespace !== mw.config.get('wgPageName') && namespace);
 
				// Find ?target=Username
				username = (/(?:^\?|&)target=([^&]*)/).exec(window.location.search);
				// If target is missing or has an empty string then it displays self
				username = (username && window.decodeURIComponent(username[1]));
 
				// Target param overrides the slash param
				username = username || namespace;
 
				// Canonicalise back to space instead of underscores
				username = (username && username.replace(/_/g, ' '));
			} else if (namespace !== 'Following') { // Following is self only
				return; // Some other special page.
			}
			// If the username is blank then they show self.
			username = username || mw.config.get('wgUserName');
		}
	} else {
		// User, User Talk, Message Wall
		if (({2:1, 3:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// If we're on a subpage, drop the subpage part
		username = username.match(/^[^\/]+/)[0];
	}
	// NOTE: We only get here if this IS a compatible user page
 
	return {
		skin: siteSkin,
		user: username
	};
})($, mw);
 
// Make sure the config exists and is usable
config = ($.isPlainObject(config) && config) || {};
 
// If it's a user page then we need to expose our data to the core
if (loaderData) {
	window.UserTagsJS = config;
	config.loader = loaderData;
 
	// Debugging hook for debugging arbitrary Wikis without having to modify
	// MediaWiki:Common.js to enable debug mode.
	if ((/(?:^\?|&)debugusertags=1(?:&|$)/i).test(window.location.search)) {
		config.debug = true;
	}
 
	// Default module configuration when one is not provided.
	// TODO: Maybe I should just force this always using $.extend()?
	//	[i.e. optout by false to disable instead of optin]
	config.modules = ($.isPlainObject(config.modules) && config.modules) || {};
	if ($.isEmptyObject(config.modules)) {
		config.modules = {
			inactive: true, // Internal defaults
			newuser: true, // Internal defaults
			autoconfirmed: true,
			mwGroups: true, // Internal defaults
			metafilter: {
				sysop: ['bureaucrat','founder'],
				bureaucrat: ['founder'],
				chatmoderator: ['sysop','bureaucrat']
			}
		};
	}
	// Force load the blocking modules unless they are manually disabled
	// (Manual disable means manually set to false/0/etc instead of just being undefined)
	config.modules.stopblocked = config.modules.stopblocked
		|| config.modules.stopblocked === void 0;
	// Only Monobook needs this, OasisTagsModule can scrape the blocked state from
	// the DOM instead.
	config.modules.isblocked = config.modules.isblocked
		|| (config.modules.isblocked === void 0 && loaderData.skin === 'monobook');
	// Force the i18n module to load
	config.modules.i18n = true;
}
 
// Dependency computations for loading modules
var importList = (function(config, alwaysOnly) {
	// These are core modules that have irregular features so need special handling
	// Most modules fit the "module.NAME.js" pattern
	var moduleMap = {
		explode: { s: 'w:dev:UserTags/module.implode.js' },
		prefLanguages: { s: 'w:dev:UserTags/module.prefLanguages.js', always: true }
	};
	moduleMap.prefCoding = moduleMap.prefLanguages;
 
	// Look for external module requests
	// NOTE: Disabled. Needs a design review for if this is the way I want to go or not.
	/*if ($.isArray(config.externals)) {
		data = config.externals;
		for (var i = 0, len = data.length ; i < len ; ++i) {
			module = data[i] + '';
			if (alwaysOnly) {
				if (module.substr(0, 5) !== 'meta.') {
					continue;
				}
			}
			module = 'w:dev:UserTags/' + module + '.js';
			if (hash[module] !== 1) {
				hash[module] = 1;
				list[list.length] = module;
			}
		}
	}*/
 
	// Check all the modules for matches in the above list.
	// Hash ensures that each one will only be imported once.
	/*jshint forin:true */
	var list = [], hash = {}, exts = config.extensions || {}, script, data, module;
	for (module in config.modules) {
		// Skip already loaded
		if (exts[module] !== void 0) { continue; }
 
		if (moduleMap.hasOwnProperty(module)) {
			data = moduleMap[module];
			if (alwaysOnly && !data.always) {
				continue;
			}
			script = data.s;
		} else if (!alwaysOnly) {
			// Attempt to load the module by name from the Dev page
			script = 'w:dev:UserTags/module.' + module + '.js';
		} else {
			continue;
		}
		if (hash[script] !== 1) {
			hash[script] = 1;
			list[list.length] = script;
		}
	}
	/*jshint forin:false */
 
	// Improve caching by ensuring list always has the same order
	list.sort();
 
	// Core script (must always be last, obviously)
	if (!alwaysOnly) {
		list[list.length] = 'w:dev:UserTags/core.js';
	}
	return list;
})(config, !loaderData);
 
// If we aren't going to load anything then we're done.
if (!importList.length) {
	// Tidy up to reduce memory usage
	window.UserTagsJS = null; // IE8 won't let you delete stuff from the window
	try { delete window.UserTagsJS; } catch(e) { /* IE8 throws just to increase it's crapness */ }
	return;
}
// If we are going to load modules despite not being on a user page then we
// need to honor the module contract by ensuring the global exists and has
// the extensions member. Everything else is unnecessary.
if (!loaderData) {
	window.UserTagsJS = config = {};
}
config.extensions = ($.isPlainObject(config.extensions) && config.extensions) || {};

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		//		: { u:'' },
		bureaucrat: { u:'B-U-R-E-U-A… wait how do you spell this???' },
		chatmoderator: { u:'CHETMOD XD' },
		patroller: { u:'Policy Patrol' }
		rollback: { u:'Backroll' },
		sysop: { u:'Admin' },
		bannedfromchat: { u:'Banished based on Confabulatory Prohibition' },
		bot: { u:'ROBOT!!! :O' },
		'bot-global': { u:'EVERYWHERE ROBOT!!! :O' },
		notautoconfirmed: { u:'just some user', m:'just some guy', f:'just some girl' },
		inactive: { u:'this user is gone', m:'this guy is gone', f:'this girl is gone' },
		nonuser: { u:'EVERYWHERE ROBO– wait nvm. carry on then' },
		newuser: { u:'Kinda lame' },
		newb: { u:'Kind of a newb' },
		founder: { u:'TEH REALIO DEALIO' },
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global',];
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.inactive = {
	days: 28,
	namespaces: [0, 3, 500, 1200, 1201, 2000, 2001, 2002],
	zeroIsInactive: false // 0 article edits = inactive
};
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.newuser = {
	namespace: 0, 3, 500, 1200, 1201, 2000, 2001, 2002 // [Optional] Edits must be made to articles to count
	computation: function(days, edits) {
		// If the expression is true then they will be marked as a new user
		// If the expression is false then they won't.
		// In this example, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first
		return days < 14 && edits < 100;
	}
};
UserTagsJS.modules.implode = {
	newb: ['notautoconfirmed', 'newuser'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive.
	'inactive-sysop': ['sysop', 'inactive'],
	'half-sysop': ['chatmoderator', 'patroller', 'rollback']
};
 
// Do the actual load. We also need to load the core script's dependencies from
// ResourceLoader as well.
var coreDeps = ['mediawiki.util'];
mw.loader.load(coreDeps, null, true);
if (config.debug !== 'noload') {
	mw.loader.using(coreDeps, function() {
		window.importArticles({ type:'script', articles: importList });
	});
} else {
	config.imports = importList;
}
 
// Done.
})(window, jQuery, mediaWiki, window.UserTagsJS);
 
//

/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

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
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
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
        if (!elem.className)
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

/**
 * Keep code in MediaWiki:Common.js to a minimum as it is unconditionally
 * loaded for all users on every wiki page. If possible create a gadget that is
 * enabled by default instead of adding it here (since gadgets are fully
 * optimized ResourceLoader modules with possibility to add dependencies etc.)
 *
 * Since Common.js isn't a gadget, there is no place to declare its
 * dependencies, so we have to lazy load them with mw.loader.using on demand and
 * then execute the rest in the callback. In most cases these dependencies will
 * be loaded (or loading) already and the callback will not be delayed. In case a
 * dependency hasn't arrived yet it'll make sure those are loaded before this.
 */
/*global mw, $, importStylesheet, importScript */
/*jshint curly:false eqnull:true, strict:false, browser:true, */
 
// Though VisualEditor is already available for all users (including anonymous users),
// many pages cached for anonymous users don't have the Edit tab. This ensures it is
// consistently available for all pages for anonymous users while the cache rolls over.
// It has no effect on logged-in users or pages edited after VE was enabled.
// This does NOT override namespace, skin and user conditions as those are evaluated
// inside the init module.
// * Remove after 1 September 2013.
// * Keep the below mw.loader.load call outside mw.loader.using!
// --
// Hi again, so yeah, mw.loader.load queue is cached for anonymous users and stuck
// in a state where VE isn't loaded yet. However the init script bravely checks the
// 'visualeditor-enable' preference which also didn't exist yet, so it still fails.
// Here we set that preference to 1 if it is undefined, which is only the case for
// anonymous users viewing pages that got last purged before July 2013.
// * Remove after 1 September 2013.
// * Keep mw.user.options.set before mw.loader.load
importArticles({
    type: 'script',
    articles: [
         'u:dev:View_Source/code.js'
    ]
});
 
PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');  
if ( mw.user.options.values['visualeditor-enable'] === undefined ) {
    mw.user.options.set( 'visualeditor-enable', 0 );
}
mw.loader.load( 'ext.visualEditor.viewPageTarget.init' );
 
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
/**
 * Main Page layout fixes
 *
 * Description: Adds an additional link to the complete list of languages available.
 * Maintainers: [[User:AzaToth]], [[User:R. Koot]], [[User:Alex Smotrov]]
 */
if ( mw.config.get( 'wgPageName' ) === 'Main_Page' || mw.config.get( 'wgPageName' ) === 'Talk:Main_Page' ) {
    $( document ).ready( function () {
        mw.util.addPortletLink( 'p-lang', '//meta.wikimedia.org/wiki/List_of_Wikipedias',
            'Complete list', 'interwiki-completelist', 'Complete list of Wikipedias' );
    } );
}
 
/**
 * Redirect User:Name/skin.js and skin.css to the current skin's pages
 * (unless the 'skin' page really exists)
 * @source: http://www.mediawiki.org/wiki/Snippets/Redirect_skin.js
 * @rev: 2
 */
if ( mw.config.get( 'wgArticleId' ) === 0 && mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
    var titleParts = mw.config.get( 'wgPageName' ).split( '/' );
    /* Make sure there was a part before and after the slash
       and that the latter is 'skin.js' or 'skin.css' */
    if ( titleParts.length == 2 ) {
        var userSkinPage = titleParts.shift() + '/' + mw.config.get( 'skin' );
        if ( titleParts.slice( -1 ) == 'skin.js' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.js' );
        } else if ( titleParts.slice( -1 ) == 'skin.css' ) {
            window.location.href = mw.util.wikiGetlink( userSkinPage + '.css' );
        }
    }
}
 
/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	}
}
 
/**
 * Import more specific scripts if necessary
 */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
    /* scripts specific to editing pages */
    importScript( 'MediaWiki:Common.js/edit.js' );
} else if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Watchlist' ) {
    /* watchlist scripts */
    importScript( 'MediaWiki:Common.js/watchlist.js' );
}
if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
    /* file description page scripts */
    importScript( 'MediaWiki:Common.js/file.js' );
}
 
/**
 * Load scripts specific to Internet Explorer
 */
if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
}
 
/**
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}
 
/**
 * WikiMiniAtlas
 *
 * Description: WikiMiniAtlas is a popup click and drag world map.
 *              This script causes all of our coordinate links to display the WikiMiniAtlas popup button.
 *              The script itself is located on meta because it is used by many projects.
 *              See [[Meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[User:Dschwen]]
 */
( function () {
    var require_wikiminiatlas = false;
    var coord_filter = /geohack/;
    $( document ).ready( function() {
        $( 'a.external.text' ).each( function( key, link ) {
            if ( link.href && coord_filter.exec( link.href ) ) {
                require_wikiminiatlas = true;
                // break from loop
                return false;
            }
        } );
        if ( $( 'div.kmldata' ).length ) {
            require_wikiminiatlas = true;
        }
        if ( require_wikiminiatlas ) {
            mw.loader.load( '//meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript' );
        }
    } );
} )();
 
/**
 * Interwiki links to featured articles ***************************************
 *
 * Description: Highlights interwiki links to featured articles (or
 *              equivalents) by changing the bullet before the interwiki link
 *              into a star.
 * Maintainers: [[User:R. Koot]]
 */
function LinkFA() {
    if ( document.getElementById( 'p-lang' ) ) {
        var InterwikiLinks = document.getElementById( 'p-lang' ).getElementsByTagName( 'li' );
 
        for ( var i = 0; i < InterwikiLinks.length; i++ ) {
            if ( document.getElementById( InterwikiLinks[i].className + '-fa' ) ) {
                InterwikiLinks[i].className += ' FA';
                InterwikiLinks[i].title = 'This is a featured article in this language.';
            } else if ( document.getElementById( InterwikiLinks[i].className + '-ga' ) ) {
                InterwikiLinks[i].className += ' GA';
                InterwikiLinks[i].title = 'This is a good article in this language.';
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( LinkFA );
 
/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[Wikipedia:NavFrame]].
 * Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
$( createNavigationBarToggleButton );
 
/**
 * Uploadwizard_newusers
 * Switches in a message for non-autoconfirmed users at [[Wikipedia:Upload]]
 *
 * Maintainers: [[User:Krimpet]]
 */
function uploadwizard_newusers() {
    if ( mw.config.get( 'wgNamespaceNumber' ) === 4 && mw.config.get( 'wgTitle' ) === 'Upload' && mw.config.get( 'wgAction' ) === 'view' ) {
        var oldDiv = document.getElementById( 'autoconfirmedusers' ),
            newDiv = document.getElementById( 'newusers' );
        if ( oldDiv && newDiv ) {
            var userGroups = mw.config.get( 'wgUserGroups' );
            if ( userGroups ) {
                for ( var i = 0; i < userGroups.length; i++ ) {
                    if ( userGroups[i] === 'autoconfirmed' ) {
                        oldDiv.style.display = 'block';
                        newDiv.style.display = 'none';
                        return;
                    }
                }
            }
            oldDiv.style.display = 'none';
            newDiv.style.display = 'block';
            return;
        }
    }
}
 
$(uploadwizard_newusers);
 
/**
 * Magic editintros ****************************************************
 *
 * Description: Adds editintros on disambiguation pages and BLP pages.
 * Maintainers: [[User:RockMFR]]
 */
function addEditIntro( name ) {
    $( '.mw-editsection, #ca-edit' ).find( 'a' ).each( function ( i, el ) {
        el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
    } );
}
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
}); 
 
if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
    $( function () {
        if ( document.getElementById( 'disambigbox' ) ) {
            addEditIntro( 'Template:Disambig_editintro' );
        }
    } );
 
    $( function () {
        var cats = document.getElementById( 'mw-normal-catlinks' );
        if ( !cats ) {
            return;
        }
        cats = cats.getElementsByTagName( 'a' );
        for ( var i = 0; i < cats.length; i++ ) {
            if ( cats[i].title === 'Category:Living people' || cats[i].title === 'Category:Possibly living people' ) {
                addEditIntro( 'Template:BLP_editintro' );
                break;
            }
        }
    } );
}
 
/**
 * Description: Stay on the secure server as much as possible
 * Maintainers: [[User:TheDJ]]
 */
if ( document.location && document.location.protocol  && document.location.protocol === 'https:' ) {
    /* New secure servers */
    importScript( 'MediaWiki:Common.js/secure new.js' );
}
 
/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */