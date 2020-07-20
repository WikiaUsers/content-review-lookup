//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
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
			autoconfirmed: false,
			mwGroups: true, // Internal defaults
			metafilter: {
				sysop: ['bureaucrat', 'administrator', 'founder'],
				bureaucrat: ['founder'],
				chatmoderator: ['administrator','bureaucrat']
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

// </syntaxhighlight>