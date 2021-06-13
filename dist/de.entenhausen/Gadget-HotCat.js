//<pre><nowiki>
/*
  HotCat V2.21
 Wenn du dieses Skript auch verwenden möchtest, dann lies bitte:
http://de.disney.wikia.com/wiki/Hilfe:HotCat

  Ajax-based simple Category manager. Allows adding/removing/changing categories on a page view.
  Supports multiple category changes, as well as redirect and disambiguation resolution. Also
  plugs into the upload form. Search engines to use for the suggestion list are configurable, and
  can be selected interactively.

  Documentation: https://commons.wikimedia.org/wiki/Help:Gadget-HotCat
  List of main authors: https://commons.wikimedia.org/wiki/Help:Gadget-HotCat/Version_history
  + "I am not me from" a.wikia.com

  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)

  Choose whichever license of these you like best :-)
*/

/*
  This code is MW version safe. It should run on any MediaWiki installation >= MW 1.15. Note: if
  running on MW >= 1.17 configured with $wgLegacyJavaScriptGlobals != true, it will still force
  publishing the wg* globals in the window object. Note that HotCat is supposed to run with or
  without jQuery, and also on older installations that do not yet have window.mediaWiki. If you
  use any of these newer features, make sure you qualify them by checking whether they exist at
  all, and by providing some meaningful fallback implementation if not. To start itself, HotCat
  uses either jQuery(document).ready(), if available (preferred), or the old addOnloadHook().
  If neither exists, HotCat won't start.
*/
(function () {
	var conf = window.mw ? mw.config.values : window;
 
	if (
		(window.HotCat && !window.HotCat.nodeName)
 
		|| conf.wgAction == 'edit'
 
	) {
		return;
	}
 
window.HotCat = {
	messages :
	{cat_removed  : 'Entfernt [[Category:$1]]'
	,template_removed  : 'Entfernt {{[[Category:$1]]}}'
	,cat_added    : 'Fügt [[Category:$1]] hinzu'
	,cat_keychange: 'Neuer Schlüssel für [[Category:$1]]: "$2"' 
	,cat_notFound : 'Category "$1" not found'
	,cat_exists   : 'Category "$1" already exists; not added.'
	,cat_resolved : ' (Weiterleitung [[Category:$1]] aufgehoben)'
	,uncat_removed: 'removed {{uncategorized}}'
	,separator    : '; '
	,prefix       : ""
	,using        : ' mit [[w:c:de.disney:Hilfe:HotCat|HotCat]]'
	,multi_change : '$1 Kategorien'
	,commit       : 'Speichern'
	,ok           : 'OK'
	,cancel       : 'Abbrechen'
	,multi_error  : 'Could not retrieve the page text from the server. Therefore, your category changes '
					+'cannot be saved. We apologize for the inconvenience.'
	,short_catchange : null
	}
 ,category_regexp    : '[Cc][Aa][Tt][Ee][Gg][Oo][Rr][Yy]'
 ,category_canonical : 'Category'
 ,categories         : 'Categories'
 ,disambig_category  : 'Disambiguation'
 ,redir_category     : 'Category redirects'
 ,links : {change: '(±)', remove: '(\u2212)', add: '(+)', restore: '(×)', undo: '(×)', down: '(\u2193)', up: '(\u2191)'}
 ,tooltips : {
	 change:  'Modify'
	,remove:  'Remove'
	,add:     'Add a new category'
	,restore: 'Undo changes'
	,undo:    'Undo changes'
	,down:    'Open for modifying and display subcategories'
	,up:      'Open for modifying and display parent categories'
  }
 ,addmulti           : '<span>+<sup>+</sup></span>'
 ,multi_tooltip      : 'Modify several categories'
 ,disable            :
		function () { 
			var ns = conf.wgNamespaceNumber;
			var nsIds = conf.wgNamespaceIds;
			return (   ns < 0     
					|| ns === 10  
					|| ns === 828 
					|| ns === 8   
					|| ns === 6 && conf.wgArticleId === 0 
					|| ns === 2 && /\.(js|css)$/.test(conf.wgTitle) 
					|| nsIds
						&& (   ns === nsIds['creator']
							|| ns === nsIds['timedtext']
							|| ns === nsIds['institution']
						   )
				   );
		}
 ,uncat_regexp : /\{\{\s*([Uu]ncat(egori[sz]ed( image)?)?|[Nn]ocat|[Nn]eedscategory)[^}]*\}\}\s*(<\!--.*?--\>)?/g
 ,existsYes    : '//upload.wikimedia.org/wikipedia/commons/thumb/b/be/P_yes.svg/20px-P_yes.svg.png'
 ,existsNo     : '//upload.wikimedia.org/wikipedia/commons/thumb/4/42/P_no.svg/20px-P_no.svg.png'
 ,template_regexp    : '[Tt][Ee][Mm][Pp][Ll][Aa][Tt][Ee]'
 ,template_categories : {}
 ,engine_names : {
	 searchindex : 'Search index'
	,pagelist    : 'Page list'
	,combined    : 'Combined search'
	,subcat      : 'Subcategories'
	,parentcat   : 'Parent categories'
  }
 ,capitalizePageNames : true
 ,upload_disabled : false
 ,blacklist : null
 ,bg_changed : '#F8CCB0'
 ,no_autocommit : false
 ,del_needs_diff : false
 ,suggest_delay : 100
 ,editbox_width : 40
 ,suggestions : 'combined'
 ,fixed_search : false
 ,use_up_down : true
 ,list_size : 5
 ,single_minor : true
 ,dont_add_to_watchlist : false
 ,shortcuts : null
 ,addShortcuts :
		function (map) {
			if (!map) return;
			window.HotCat.shortcuts = window.HotCat.shortcuts || {};
			for (var k in map) {
				if (!map.hasOwnProperty (k) || typeof k != 'string') continue;
				var v = map[k];
				if (typeof v != 'string') continue;
				k = k.replace (/^\s+|\s+$/g, "");
				v = v.replace (/^\s+|\s+$/g, "");
				if (k.length === 0 || v.length === 0) continue;
				window.HotCat.shortcuts[k] = v;
			}
		}
};
	var ua = navigator.userAgent.toLowerCase();
	var is_ie6 = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(ua) !== null && parseFloat(RegExp.$1) <= 6.0;
	var is_ie_lt8 = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(ua) !== null && parseFloat(RegExp.$1) < 8.0;
	var is_webkit = /applewebkit\/\d+/.test(ua) && ua.indexOf ('spoofer') < 0;
	var getJSON = (function () {
		function getRequest () {
			var request = null;
			try {
				request = new window.XMLHttpRequest();
			} catch (anything) {
				if (window.ActiveXObject) {
					try {
						request = new window.ActiveXObject('Microsoft.XMLHTTP');
					} catch (any) {
					}
				} 
			} 
			return request;
		}
 
		return function (settings) {
			var req = getRequest();
			if (!req && settings && settings.error) settings.error (req);
			if (!req || !settings || !settings.uri) return req;
			var uri = armorUri (settings.uri);
			var args = settings.data || null;
			var method;
			if (args && uri.length + args.length + 1 > 2000) {
				method = 'POST';
				req.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			} else {
				method = 'GET';
				if (args) uri += '?' + args;
				args = null;
			}
			req.open (method, uri, true);
			req.onreadystatechange = function () {
				if (req.readyState != 4) return;
				if (req.status != 200 || !req.responseText || !(/^\s*[\{\[]/.test(req.responseText))) {
					if (settings.error) settings.error (req);
				} else {
					if (settings.success) settings.success (eval ('(' + req.responseText + ')'));
				}
			};
			req.setRequestHeader ('Pragma', 'cache=yes');
			req.setRequestHeader ('Cache-Control', 'no-transform');
			req.send (args);
			return req;
		};
	})();
 
	function armorUri (uri) {
		if (uri.length >= 2 && uri.substring(0, 2) == '//') return document.location.protocol + uri;
		return uri;
	}
 
	function LoadTrigger (needed) {
		this.queue = [];
		this.toLoad = needed;
	}
	LoadTrigger.prototype = {
		register : function (callback) {
			if (this.toLoad <= 0) {
				callback (); // Execute directly
			} else {
				this.queue[this.queue.length] = callback;
			}
		},
 
		loaded : function () {
			if (this.toLoad > 0) {
				this.toLoad--;
				if (this.toLoad === 0) {
					// Run queued callbacks once
					for (var i = 0; i < this.queue.length; i++) this.queue[i]();
					this.queue = [];
				}
			}
		}
 
	};
 
	var setupCompleted = new LoadTrigger(1);
	HotCat.runWhenReady = function (callback) {setupCompleted.register(callback);};
 
	var loadTrigger = new LoadTrigger(2);
 
	function load (uri) {
		var head = document.getElementsByTagName ('head')[0];
		var s = document.createElement ('script');
		s.setAttribute ('src', armorUri(uri));
		s.setAttribute ('type', 'text/javascript');
		var done = false;
 
		function afterLoad () {
			if (done) return;
			done = true;
			s.onload = s.onreadystatechange = s.onerror = null; 
			if (head && s.parentNode) head.removeChild (s);
			loadTrigger.loaded();
		}
 
		s.onload = s.onreadystatechange = function () { 
			if (done) return;
			if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
				afterLoad ();
			}
		};
		s.onerror = afterLoad; 
		head.insertBefore (s, head.firstChild); 
	}
 
	function loadJS (page) {
		load (conf.wgServer + conf.wgScript + '?title=' + encodeURIComponent (page) + '&action=raw&ctype=text/javascript');
	}
 
	function loadURI (href) {
		var url = href;
		if (url.substring (0, 2) == '//') {
			url = window.location.protocol + url;
		} else if (url.substring (0, 1) == '/') {
			url = conf.wgServer + url;
		}
		load (url);
	}
 
	loadJS ('MediaWiki:Gadget-HotCat.js/local_defaults');
 
	if (conf.wgUserLanguage != 'en') {
		if (typeof window.hotcat_translations_from_commons == 'undefined') {
			window.hotcat_translations_from_commons = true;
		}
		// Localization hook to localize HotCat messages, tooltips, and engine names for wgUserLanguage.
		if (window.hotcat_translations_from_commons && conf.wgServer.indexOf('//commons') < 0) {
			loadURI ('//commons.wikimedia.org/w/index.php?title='
				+ 'MediaWiki:Gadget-HotCat.js/' + conf.wgUserLanguage
				+ '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400'
			);
		} else {
			// Load translations locally
			loadJS ('MediaWiki:Gadget-HotCat.js/' + conf.wgUserLanguage);
		}
	} else {
		loadTrigger.loaded();
	}
 
	var wikiTextBlank   = '[\\t _\\xA0\\u1680\\u180E\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000]+';
	var wikiTextBlankRE = new RegExp (wikiTextBlank, 'g');
	var wikiTextBlankOrBidi = '[\\t _\\xA0\\u1680\\u180E\\u2000-\\u200B\\u200E\\u200F\\u2028-\\u202F\\u205F\\u3000]*';
	var formattedNamespaces = conf.wgFormattedNamespaces;
	var namespaceIds = conf.wgNamespaceIds;
	if (formattedNamespaces) {
		function autoLocalize (namespaceNumber, fallback) {
			function create_regexp_str (name)
			{
				if (!name || name.length === 0) return "";
				var regex_name = "";
				for (var i = 0; i < name.length; i++){
					var initial = name.substr (i, 1);
					var ll = initial.toLowerCase ();
					var ul = initial.toUpperCase ();
					if (ll == ul){
						regex_name += initial;
					} else {
						regex_name += '[' + ll + ul + ']';
					}
				}
				return regex_name
							.replace(/([\\\^\$\.\?\*\+\(\)])/g, '\\$1')
							.replace (wikiTextBlankRE, wikiTextBlank);
			}
 
			fallback = fallback.toLowerCase();
			var canonical  = formattedNamespaces["" + namespaceNumber].toLowerCase();
			var regexp     = create_regexp_str (canonical);
			if (fallback && canonical != fallback) regexp += '|' + create_regexp_str(fallback);
			if (namespaceIds) {
				for (var cat_name in namespaceIds) {
					if (   typeof cat_name == 'string'
						&& cat_name.toLowerCase() != canonical
						&& cat_name.toLowerCase() != fallback
						&& namespaceIds[cat_name] == namespaceNumber)
					{
						regexp += '|' + create_regexp_str(cat_name);
					}
				}
			}
			return regexp;
		}
 
		if (formattedNamespaces['14']) {
			HotCat.category_canonical = formattedNamespaces['14'];
			HotCat.category_regexp = autoLocalize (14, 'category');
		}
		if (formattedNamespaces['10']) {
			HotCat.template_regexp = autoLocalize (10, 'template');
		}
	}
	function bind (func, target) {
		var f = func, tgt = target;
		return function () { return f.apply (tgt, arguments); };
	}
	function make (arg, literal) {
		if (!arg) return null;
		return literal ? document.createTextNode (arg) : document.createElement (arg);
	}
	function param (name, uri) {
		if (typeof uri == 'undefined' || uri === null) uri = document.location.href;
		var re = new RegExp ('[&?]' + name + '=([^&#]*)');
		var m = re.exec (uri);
		if (m && m.length > 1) return decodeURIComponent(m[1]);
		return null;
	}
	function title (href) {
		if (!href) return null;
		var script = conf.wgScript + '?';
		if (href.indexOf (script) === 0 || href.indexOf (conf.wgServer + script) === 0 || conf.wgServer.substring(0, 2) == '//' && href.indexOf (document.location.protocol + conf.wgServer + script) === 0) {
			// href="/w/index.php?title=..."
			return param ('title', href);
		} else {
			// href="/wiki/..."
			var prefix = conf.wgArticlePath.replace ('$1', "");
			if (href.indexOf (prefix) !== 0) prefix = conf.wgServer + prefix; // Fully expanded URL?
			if (href.indexOf (prefix) !== 0 && prefix.substring(0, 2) == '//') prefix = document.location.protocol + prefix; // Protocol-relative wgServer?
			if (href.indexOf (prefix) === 0)
				return decodeURIComponent (href.substring (prefix.length));
		}
		return null;
	}
	function hasClass (elem, name) {
		return (' ' + elem.className + ' ').indexOf (' ' + name + ' ') >= 0;
	}
	function capitalize (str) {
		if (!str || str.length === 0) return str;
		return str.substr(0, 1).toUpperCase() + str.substr (1);
	}
	function wikiPagePath (pageName) {
		return conf.wgArticlePath.replace('$1', encodeURIComponent (pageName).replace(/%3A/g, ':').replace(/%2F/g, '/'));
	}
	function escapeRE(str) {
		return str.replace(/([\\\^\$\.\?\*\+\(\)\[\]])/g, '\\$1');
	}
 
	function substituteFactory (options) {
		options = options || {};
		var lead = options.indicator || '$';
		var indicator = escapeRE (lead);
		var lbrace = escapeRE (options.lbrace || '{');
		var rbrace = escapeRE (options.rbrace || '}');
		var re;
 
		re = new RegExp(
			 '(?:' + indicator + '(' + indicator + '))|'                                           // $$
			+'(?:' + indicator + '(\\d+))|'                                                        // $0, $1
			+'(?:' + indicator + '(?:' + lbrace + '([^' + lbrace + rbrace + ']+)' + rbrace + '))|' // ${key}
			+'(?:' + indicator + '(?!(?:[' + indicator + lbrace + ']|\\d))(\\S+?)\\b)'             // $key (only if first char after $ is not $, digit, or { )
			,'g');
		return function (str, map) {
			if (!map) return str;
			return str.replace(re
				,function (match, prefix, idx, key, alpha) {
					if (prefix == lead) return lead;
					var k = alpha || key || idx;
					var replacement = typeof map[k] === 'function' ? map[k](match, k) : map[k];
					return typeof replacement === 'string' ? replacement : (replacement || match);
				}
			);
		};
	}
 
	var substitute = substituteFactory();
	var replaceShortcuts = (function () {
		var replaceHash = substituteFactory({indicator:'#',lbrace:'[',rbrace:']'});
		return function (str, map) {
			var s = replaceHash (str, map);
			return HotCat.capitalizePageNames ? capitalize(s) : s;
		};
	})();
 
	// Text modification
 
	var findCatsRE =
		new RegExp ('\\[\\[' + wikiTextBlankOrBidi + '(?:' + HotCat.category_regexp + ')' + wikiTextBlankOrBidi + ':[^\\]]+\\]\\]', 'g');
 
	function replaceByBlanks (match) {
		return match.replace(/(\s|\S)/g, ' '); // /./ doesn't match linebreaks. /(\s|\S)/ does.
	}
 
	function find_category (wikitext, category, once) {
		var cat_regex = null;
		if(HotCat.template_categories[category]){
			cat_regex = new RegExp ('\\{\\{' + wikiTextBlankOrBidi + '(' + HotCat.template_regexp + '(?=' + wikiTextBlankOrBidi + ':))?' + wikiTextBlankOrBidi
									+ '(?:' + HotCat.template_categories[category] + ')'
									+ wikiTextBlankOrBidi + '(\\|.*?)?\\}\\}', 'g'
			);
		} else {
			var cat_name  = escapeRE (category);
			var initial   = cat_name.substr (0, 1);
			cat_regex = new RegExp ('\\[\\[' + wikiTextBlankOrBidi + '(' + HotCat.category_regexp + ')' + wikiTextBlankOrBidi + ':' + wikiTextBlankOrBidi
									+ (initial == '\\' || !HotCat.capitalizePageNames
										? initial
										: '[' + initial.toUpperCase() + initial.toLowerCase() + ']')
									+ cat_name.substring (1).replace (wikiTextBlankRE, wikiTextBlank)
									+ wikiTextBlankOrBidi + '(\\|.*?)?\\]\\]', 'g'
			);
		}
		if (once) return cat_regex.exec (wikitext);
		var copiedtext = wikitext
							.replace(/<\!--(\s|\S)*?--\>/g, replaceByBlanks)
							.replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, replaceByBlanks);
		var result = [];
		var curr_match = null;
		while ((curr_match = cat_regex.exec (copiedtext)) !== null) {
			result.push ({match : curr_match});
		}
		result.re = cat_regex;
		return result; // An array containing all matches, with positions, in result[i].match
	}
 
	var interlanguageRE = null;
 
	function change_category (wikitext, toRemove, toAdd, key, is_hidden) {
 
		function find_insertionpoint (wikitext) {
			var copiedtext = wikitext
								.replace(/<\!--(\s|\S)*?--\>/g, replaceByBlanks)
								.replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, replaceByBlanks);
			var index = -1;
			findCatsRE.lastIndex = 0;
			while (findCatsRE.exec(copiedtext) !== null) index = findCatsRE.lastIndex;
			if (index < 0) {
				// Find the index of the first interlanguage link...
				var match = null;
				if (!interlanguageRE) {
					match = /((^|\n\r?)(\[\[\s*(([a-z]{2,3}(-[a-z]+)*)|simple|tokipona)\s*:[^\]]+\]\]\s*))+$/.exec (copiedtext);
				} else {
					match = interlanguageRE.exec(copiedtext);
				}
				if (match) index = match.index;
				return {idx : index, onCat : false};
			}
			return {idx : index, onCat : index >= 0};
		}
 
		var summary   = [];
		var nameSpace = HotCat.category_canonical;
		var cat_point = -1; // Position of removed category;
 
		if (key) key = '|' + key;
		var keyChange = (toRemove && toAdd && toRemove == toAdd && toAdd.length > 0);
		var matches;
		if (toRemove && toRemove.length > 0) {
			matches = find_category (wikitext, toRemove);
			if (!matches || matches.length === 0) {
				return {text: wikitext, 'summary': summary, error: HotCat.messages.cat_notFound.replace (/\$1/g, toRemove)};
			} else {
				var before = wikitext.substring (0, matches[0].match.index);
				var after  = wikitext.substring (matches[0].match.index + matches[0].match[0].length);
				if (matches.length > 1) {
 
					matches.re.lastIndex = 0;
					after = after.replace (matches.re, "");
				}
				if (toAdd) {
					nameSpace = matches[0].match[1] || nameSpace;
					if (key === null) key = matches[0].match[2]; // Remember the category key, if any.
				}
				var i = before.length - 1;
				while (i >= 0 && before.charAt (i) != '\n' && before.substr (i, 1).search (/\s/) >= 0) i--;
				var j = 0;
				while (j < after.length && after.charAt (j) != '\n' && after.substr (j, 1).search (/\s/) >= 0)
					j++;
				if (i >= 0 && before.charAt (i) == '\n' && (after.length === 0 || j < after.length && after.charAt (j) == '\n'))
					i--;
				if (i >= 0) before = before.substring (0, i+1); else before = "";
				if (j < after.length) after = after.substring (j); else after = "";
				if (before.length > 0 && before.substring (before.length - 1).search (/\S/) >= 0
						&& after.length > 0 && after.substr (0, 1).search (/\S/) >= 0)
					before += ' ';
				cat_point = before.length;
				if (cat_point === 0 && after.length > 0 && after.substr(0,1) == '\n') {
					after = after.substr(1);
				}
				wikitext = before + after;
				if (!keyChange) {
					if(HotCat.template_categories[toRemove]) {
						summary.push (HotCat.messages.template_removed.replace (/\$1/g, toRemove));
					} else {
						summary.push (HotCat.messages.cat_removed.replace (/\$1/g, toRemove));
					}
				}
			}
		}
		if (toAdd && toAdd.length > 0) {
			matches = find_category (wikitext, toAdd);
			if (matches && matches.length > 0) {
				return {text: wikitext, 'summary': summary, error : HotCat.messages.cat_exists.replace (/\$1/g, toAdd)};
			} else {
				var onCat = false;
				if (cat_point < 0) {
					var point = find_insertionpoint (wikitext);
					cat_point = point.idx;
					onCat = point.onCat;
				} else {
					onCat = true;
				}
				var newcatstring = '[[' + nameSpace + ':' + toAdd + (key || "") + ']]';
				if (cat_point >= 0) {
					var suffix = wikitext.substring (cat_point);
					wikitext = wikitext.substring (0, cat_point) + (cat_point > 0 ? '\n' : "") + newcatstring + (!onCat ? '\n' : "");
					if (suffix.length > 0 && suffix.substr(0, 1) != '\n') {
						wikitext += '\n' + suffix;
					} else {
						wikitext += suffix;
					}
				} else {
					if (wikitext.length > 0 && wikitext.substr (wikitext.length - 1, 1) != '\n')
						wikitext += '\n';
					wikitext += (wikitext.length > 0 ? '\n' : "") + newcatstring;
				}
				if (keyChange) {
					var k = key || "";
					if (k.length > 0) k = k.substr (1);
					summary.push (substitute (HotCat.messages.cat_keychange, [null, toAdd, k]));
				} else {
					summary.push (HotCat.messages.cat_added.replace (/\$1/g, toAdd));
				}
				if (HotCat.uncat_regexp && !is_hidden) {
					var txt = wikitext.replace (HotCat.uncat_regexp, ""); // Remove "uncat" templates
					if (txt.length != wikitext.length) {
						wikitext = txt;
						summary.push (HotCat.messages.uncat_removed);
					}
				}
			}
		}
		return {text: wikitext, 'summary': summary, error: null};
	}
 
	// The real HotCat UI
 
	function evtKeys (e) {
		e = e || window.event || window.Event; // W3C, IE, Netscape
		var code = 0;
		if (typeof e.ctrlKey != 'undefined') { // All modern browsers
			// Ctrl-click seems to be overloaded in FF/Mac (it opens a pop-up menu), so treat cmd-click
			// as a ctrl-click, too.
			if (e.ctrlKey || e.metaKey) code |= 1;
			if (e.shiftKey) code |= 2;
		} else if (typeof e.modifiers != 'undefined') { // Netscape...
			if (e.modifiers & (Event.CONTROL_MASK | Event.META_MASK)) code |= 1;
			if (e.modifiers & Event.SHIFT_MASK) code |= 2;
		}
		return code;
	}
	function evtKill (e) {
		e = e || window.event || window.Event; // W3C, IE, Netscape
		if (typeof e.preventDefault != 'undefined') {
			e.preventDefault ();
			e.stopPropagation ();
		} else
			e.cancelBubble = true;
		return false;
	}
	function addEvent (node, evt, f, capture) {
		if (window.jQuery && (!capture || !node.addEventListener)) window.jQuery (node).bind (evt, f);
		else if (node.addEventListener) node.addEventListener (evt, f, capture); // FF etc; IE >= 9
		else if (node.attachEvent) node.attachEvent ('on' + evt, f); // Older IE; Opera
		else node['on' + evt] = f; // Very old!
	}
 
	var catLine      = null;
	var onUpload     = false;
	var editors      = [];
 
	var commitButton = null;
	var commitForm   = null;
	var multiSpan    = null;
 
	var pageText     = null;
	var pageTime     = null;
	var pageWatched  = false;
	var watchCreate  = false;
	var watchEdit    = false;
	var minorEdits   = false;
	var editToken    = null;
 
	var is_rtl       = false;
	var serverTime   = null;
	var lastRevId    = null;
	var pageTextRevId = null;
	var conflictingUser = null;
 
	var newDOM       = false; // true if MediaWiki serves the new UL-LI DOM for categories
 
	function setMultiInput () {
		if (commitButton || onUpload) return;
		commitButton = make ('input');
		commitButton.type  = 'button';
		commitButton.value = HotCat.messages.commit;
		commitButton.onclick = multiSubmit;
		if (multiSpan) {
			multiSpan.parentNode.replaceChild (commitButton, multiSpan);
		} else {
			catLine.appendChild (commitButton);
		}
	}
 
	function checkMultiInput () {
		if (!commitButton) return;
		var has_changes = false;
		for (var i = 0; i < editors.length; i++) {
			if (editors[i].state != CategoryEditor.UNCHANGED) {
				has_changes = true;
				break;
			}
		}
		commitButton.disabled = !has_changes;
	}
 
	function currentTimestamp () {
		var now = new Date();
		var ts  = "" + now.getUTCFullYear();
		function two (s) { return s.substr (s.length - 2); }
		ts = ts
			+ two ('0' + (now.getUTCMonth() + 1))
			+ two ('0' + now.getUTCDate())
			+ two ('00' + now.getUTCHours())
			+ two ('00' + now.getUTCMinutes())
			+ two ('00' + now.getUTCSeconds());
		return ts;
	}
 
	var saveInProgress = false;
	function initiateEdit (doEdit, failure) {
		if (saveInProgress) return;
		saveInProgress = true;
		var oldButtonState;
		if (commitButton) {
			oldButtonState = commitButton.disabled;
			commitButton.disabled = true;
		}
 
		function fail() {
			saveInProgress = false;
			if (commitButton) commitButton.disabled = oldButtonState;
			failure.apply(this, arguments);
		}
 
		// Must use Ajax here to get the user options and the edit token.
 
		getJSON ({
			 uri : conf.wgServer + conf.wgScriptPath + '/api.php'
			,data : 'format=json&action=query&rawcontinue=&titles=' + encodeURIComponent (conf.wgPageName)
				+ '&prop=info%7Crevisions%7Clanglinks&inprop=watched&intoken=edit&rvprop=content%7Ctimestamp%7Cids%7Cuser&lllimit=500'
				+ '&rvlimit=2&rvdir=newer&rvstartid=' + conf.wgCurRevisionId
				+ '&meta=siteinfo%7Cuserinfo&uiprop=options'
			,success : function (json) { setPage(json); doEdit(fail); }
			,error : function (req) { fail(req.status + ' ' + req.statusText); }
		});
	}
 
	function multiChangeMsg (count) {
		var msg = HotCat.messages.multi_change;
		if (typeof msg != 'string' && msg.length) {
			if (window.mw && mw.language && mw.language.convertPlural) {
				msg = mw.language.convertPlural (count, msg);
			} else {
				msg = msg[msg.length-1];
			}
		}
		return substitute (msg, [null, "" + count]);
	}
 
	function performChanges (failure, singleEditor) {
		if (pageText === null) {
			failure (HotCat.messages.multi_error);
			return;
		}
		if (HotCat.messages.cat_keychange.indexOf ('$2') < 0) HotCat.messages.cat_keychange += '"$2"';
		if (!HotCat.messages.short_catchange) HotCat.messages.short_catchange = '[[' + HotCat.category_canonical + ':$1]]';
		var action;
		var editingOldVersion = lastRevId !== null && lastRevId != conf.wgCurRevisionId || pageTextRevId !== null && pageTextRevId != conf.wgCurRevisionId;
		var selfEditConflict = editingOldVersion && conflictingUser && conflictingUser == conf.wgUserName;
		if (singleEditor && !singleEditor.noCommit && !HotCat.no_autocommit && editToken && !selfEditConflict) {
			commitForm.wpEditToken.value = editToken;
			action = commitForm.wpDiff;
			if (action) action.name = action.value = 'wpSave';
		} else {
			action = commitForm.wpSave;
			if (action) action.name = action.value = 'wpDiff';
		}
		var result = { text : pageText };
		var changed = [], added = [], deleted = [], changes = 0;
		var toEdit = !!singleEditor ? [singleEditor] : editors;
		var error = null;
		var i;
		for (i=0; i < toEdit.length; i++) {
			if (toEdit[i].state == CategoryEditor.CHANGED) {
				result = change_category (
						result.text
					, toEdit[i].originalCategory
					, toEdit[i].currentCategory
					, toEdit[i].currentKey
					, toEdit[i].currentHidden
				);
				if (!result.error) {
					changes++;
					if (!toEdit[i].originalCategory || toEdit[i].originalCategory.length === 0) {
						added.push (toEdit[i].currentCategory);
					} else {
						changed.push ({from : toEdit[i].originalCategory, to : toEdit[i].currentCategory});
					}
				} else if (error === null) {
					error = result.error;
				}
			} else if (   toEdit[i].state == CategoryEditor.DELETED
					   && toEdit[i].originalCategory
					   && toEdit[i].originalCategory.length > 0)
			{
				result = change_category (result.text, toEdit[i].originalCategory, null, null, false);
				if (!result.error) {
					changes++;
					deleted.push (toEdit[i].originalCategory);
				} else if (error === null) {
					error = result.error;
				}
			}
		}
		if (error !== null) { // Do not commit if there were errors
			action = commitForm.wpSave;
			if (action) action.name = action.value = 'wpDiff';
		}
		commitForm.wpAutoSummary.value = 'd41d8cd98f00b204e9800998ecf8427e'; // MD5 hash of the empty string
		commitForm.wpMinoredit.checked = minorEdits;
		commitForm.wpWatchthis.checked = conf.wgArticleId === 0 && watchCreate || watchEdit || pageWatched;
		if (conf.wgArticleId > 0 || !!singleEditor) {
			if (changes == 1) {
				if (result.summary && result.summary.length > 0)
					commitForm.wpSummary.value = HotCat.messages.prefix + result.summary.join (HotCat.messages.separator) + HotCat.messages.using;
				commitForm.wpMinoredit.checked = HotCat.single_minor || minorEdits;
			} else if (changes > 1) {
				var summary = [];
				var shortSummary = [];
				// Deleted
				for (i = 0; i < deleted.length; i++) {
					summary.push ('-' + substitute (HotCat.messages.short_catchange, [null, deleted[i]]));
				}
				if (deleted.length == 1)
					shortSummary.push ('-' + substitute (HotCat.messages.short_catchange, [null, deleted[0]]));
				else if (deleted.length > 1)
					shortSummary.push ('- ' + multiChangeMsg (deleted.length));
				// Added
				for (i = 0; i < added.length; i++) {
					summary.push ('+' + substitute (HotCat.messages.short_catchange, [null, added[i]]));
				}
				if (added.length == 1)
					shortSummary.push ('+' + substitute (HotCat.messages.short_catchange, [null, added[0]]));
				else if (added.length > 1)
					shortSummary.push ('+ ' + multiChangeMsg (added.length));
				// Changed
				var arrow = is_rtl ? '\u2190' : '\u2192'; // left and right arrows. Don't use ← and → in the code.
				for (i = 0; i < changed.length; i++) {
					if (changed[i].from != changed[i].to) {
						summary.push ('±' + substitute (HotCat.messages.short_catchange, [null, changed[i].from]) + arrow
										+ substitute (HotCat.messages.short_catchange, [null, changed[i].to]));
					} else {
						summary.push ('±' + substitute (HotCat.messages.short_catchange, [null, changed[i].from]));
					}
				}
				if (changed.length == 1) {
					if (changed[0].from != changed[0].to) {
						shortSummary.push ('±' + substitute (HotCat.messages.short_catchange, [null, changed[0].from]) + arrow
											+ substitute (HotCat.messages.short_catchange, [null, changed[0].to]));
					} else {
						shortSummary.push ('±' + substitute (HotCat.messages.short_catchange, [null, changed[0].from]));
					}
				} else if (changed.length > 1) {
					shortSummary.push ('± ' + multiChangeMsg (changed.length));
				}
				if (summary.length > 0) {
					summary = summary.join (HotCat.messages.separator);
					if (summary.length > 200 - HotCat.messages.prefix.length - HotCat.messages.using.length) {
						summary = shortSummary.join (HotCat.messages.separator);
					}
					commitForm.wpSummary.value = HotCat.messages.prefix + summary + HotCat.messages.using;
				}
			}
		}
		commitForm.wpTextbox1.value = result.text;
		commitForm.wpStarttime.value = serverTime || currentTimestamp ();
		commitForm.wpEdittime.value = pageTime || commitForm.wpStarttime.value;
		if (selfEditConflict) commitForm.oldid.value = "" + (pageTextRevId || conf.wgCurRevisionId);
 
		commitForm.hcCommit.click();
	}
 
	function resolveMulti (toResolve, callback) {
		var i;
		for (i = 0; i < toResolve.length; i++) {
			toResolve[i].dab = null;
			toResolve[i].dabInput = toResolve[i].lastInput;
		}
		if (noSuggestions) {
			callback (toResolve);
			return;
		}
		var args = 'action=query&prop=info%7Clinks%7Ccategories%7Ccategoryinfo&plnamespace=14'
				+ '&pllimit=' + (toResolve.length * 10)
				+ '&cllimit=' + (toResolve.length * 10)
				+ '&format=json&titles=';
		for (i = 0; i < toResolve.length; i++) {
			var v = toResolve[i].dabInput;
			v = replaceShortcuts (v, HotCat.shortcuts);
			toResolve[i].dabInputCleaned = v;
			args += encodeURIComponent ('Category:' + v);
			if (i+1 < toResolve.length) args += '%7C';
		}
		getJSON({
			 uri : conf.wgServer + conf.wgScriptPath + '/api.php'
			,data : args
			,success: function (json) { resolveRedirects (toResolve, json); callback (toResolve); }
			,error: function (req) { if (!req) noSuggestions = true; callback (toResolve); }
		});
	}
 
	function resolveOne (page, toResolve) {
		var cats     = page.categories;
		var lks      = page.links;
		var is_dab   = false;
		var is_redir = typeof page.redirect == 'string'; // Hard redirect?
		var is_hidden = page.categoryinfo && typeof page.categoryinfo.hidden == 'string';
		var is_missing = typeof page.missing == 'string';
		var i;
		for (i = 0; i < toResolve.length; i++) {
			if (toResolve.length > 1 && toResolve[i].dabInputCleaned != page.title.substring (page.title.indexOf (':') + 1)) continue;
			toResolve[i].currentHidden = is_hidden;
			toResolve[i].inputExists = !is_missing;
			toResolve[i].icon.src = armorUri(is_missing ? HotCat.existsNo : HotCat.existsYes);
		}
		if (is_missing) return;
		if (!is_redir && cats && (HotCat.disambig_category || HotCat.redir_category)) {
			for (var c = 0; c < cats.length; c++) {
				var cat = cats[c]['title'];
				// Strip namespace prefix
				if (cat) {
					cat = cat.substring (cat.indexOf (':') + 1).replace(/_/g, ' ');
					if (cat == HotCat.disambig_category) {
						is_dab = true; break;
					} else if (cat == HotCat.redir_category) {
						is_redir = true; break;
					}
				}
			}
		}
		if (!is_redir && !is_dab) return;
		if (!lks || lks.length === 0) return;
		var titles = [];
		for (i = 0; i < lks.length; i++) {
			if (   lks[i]['ns'] == 14                             // Category namespace -- always true since we ask only for the category links
				&& lks[i]['title'] && lks[i]['title'].length > 0) // Name not empty
			{
				// Internal link to existing thingy. Extract the page name and remove the namespace.
				var match = lks[i]['title'];
				match = match.substring (match.indexOf (':') + 1);
				// Exclude blacklisted categories.
				if (!HotCat.blacklist || !HotCat.blacklist.test (match)) {
					titles.push (match);
				}
			}
		}
		if (titles.length === 0) {
			return;
		}
		for (i = 0; i < toResolve.length; i++) {
			if (toResolve.length > 1 && toResolve[i].dabInputCleaned != page.title.substring (page.title.indexOf (':') + 1)) continue;
			toResolve[i].inputExists = true; // Might actually be wrong if it's a redirect pointing to a non-existing category
			toResolve[i].icon.src = armorUri(HotCat.existsYes);
			if (titles.length > 1) {
				toResolve[i].dab = titles;
			} else {
				toResolve[i].text.value =
					titles[0] + (toResolve[i].currentKey !== null ? '|' + toResolve[i].currentKey : "");
			}
		}
	}
 
	function resolveRedirects (toResolve, params) {
		if (!params || !params.query || !params.query.pages) return;
		for (var p in params.query.pages) resolveOne (params.query.pages[p], toResolve);
	}
 
	function multiSubmit () {
		var toResolve = [];
		for (var i = 0; i < editors.length; i++) {
			if (editors[i].state == CategoryEditor.CHANGE_PENDING || editors[i].state == CategoryEditor.OPEN)
				toResolve.push (editors[i]);
		}
		if (toResolve.length === 0) {
			initiateEdit (function (failure) {performChanges (failure);}, function (msg) {alert (msg);});
			return;
		}
		resolveMulti (
			  toResolve
			, function (resolved) {
					var firstDab = null;
					var dontChange = false;
					for (var i = 0; i < resolved.length; i++) {
						if (resolved[i].lastInput != resolved[i].dabInput) {
							// We didn't disable all the open editors, but we did asynchronous calls. It is
							// theoretically possible that the user changed something...
							dontChange = true;
						} else {
							if (resolved[i].dab) {
								if (!firstDab) firstDab = resolved[i];
							} else {
								if (resolved[i].acceptCheck(true)) resolved[i].commit();
							}
						}
					}
					if (firstDab) {
						showDab (firstDab);
					} else if (!dontChange) {
						initiateEdit (function (failure) {performChanges (failure);}, function (msg) {alert (msg);});
					}
				}
		);
	}
 
	var cat_prefix = null;
	var noSuggestions = false;
	var suggestionEngines = {
		opensearch :
			{ uri     : '/api.php?format=json&action=opensearch&namespace=14&limit=30&search=Category:$1' // $1 = search term
			 ,handler : // Function to convert result of uri into an array of category names
				function (queryResult, queryKey) {
					if (queryResult && queryResult.length >= 2) {
						var key = queryResult[0].substring(queryResult[0].indexOf(':') + 1);
						var titles = queryResult[1];
						var exists = false;
						if (!cat_prefix) cat_prefix = new RegExp ('^(' + HotCat.category_regexp + ':)');
						for (var i = 0; i < titles.length; i++) {
							cat_prefix.lastIndex = 0;
							var m = cat_prefix.exec (titles[i]);
							if (m && m.length > 1) {
								titles[i] = titles[i].substring (titles[i].indexOf (':') + 1); // rm namespace
								if (key == titles[i]) exists = true;
							} else {
								titles.splice (i, 1); // Nope, it's not a category after all.
								i--;
							}
						}
						titles.exists = exists;
						if (queryKey != key) titles.normalized = key; // Remember the NFC normalized key we got back from the server
						return titles;
					}
					return null;
				}
			}
		,internalsearch :
			{ uri     : '/api.php?format=json&action=query&list=allpages&apnamespace=14&aplimit=30&apfrom=$1&apprefix=$1'
			 ,handler :
				function (queryResult, queryKey) {
					if (queryResult && queryResult.query && queryResult.query.allpages) {
						var titles = queryResult.query.allpages;
						for (var i = 0; i < titles.length; i++) {
							titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
						}
						return titles;
					}
					return null;
				}
			}
		,exists :
			{ uri     : '/api.php?format=json&action=query&prop=info&titles=Category:$1'
			 ,handler :
				function (queryResult, queryKey) {
					if (queryResult && queryResult.query && queryResult.query.pages && !queryResult.query.pages[-1]) {
						// Should have exactly 1
						for (var p in queryResult.query.pages) {
							var title = queryResult.query.pages[p].title;
							title = title.substring (title.indexOf (':') + 1);
							var titles = [title];
							titles.exists = true;
							if (queryKey != title) titles.normalized = title; // NFC
							return titles;
						}
					}
					return null;
				}
			} //to linia numer 1000 pozdro, znalazłeś(-aś) easter egga :) 
		,subcategories :
 
			{ uri     : '/api.php?format=json&action=query&list=categorymembers'
				+(function (version) {
					var m = version.match(/^(\d+)\.(\d+)/);
					var major = 0, minor = 0;
					if (m && m.length > 1) {
						major = parseInt (m[1], 10);
						minor = (m.length > 2 ? parseInt (m[2], 10) : 0);
					}
					if (major > 1 || major === 1 && minor > 17) return '&cmtype=subcat'; // Since MW1.18
					return '&cmnamespace=14';
				  }
				)(conf.wgVersion)
				+'&cmlimit=max&cmtitle=Category:$1'
			 ,handler :
				function (queryResult, queryKey) {
					if (queryResult && queryResult.query && queryResult.query.categorymembers) {
						var titles = queryResult.query.categorymembers;
						for (var i = 0; i < titles.length; i++) {
							titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
						}
						return titles;
					}
					return null;
				}
			}
		,parentcategories :
			{ uri     : '/api.php?format=json&action=query&prop=categories&titles=Category:$1&cllimit=max'
			 ,handler :
				function (queryResult, queryKey) {
					if (queryResult && queryResult.query && queryResult.query.pages) {
						for (var p in queryResult.query.pages) {
							if (queryResult.query.pages[p].categories) {
								var titles = queryResult.query.pages[p].categories;
								for (var i = 0; i < titles.length; i++) {
									titles[i] = titles[i].title.substring (titles[i].title.indexOf (':') + 1); // rm namespace
								}
								return titles;
							}
						}
					}
					return null;
				}
			}
	};
 
	var suggestionConfigs = {
		 searchindex : {name: 'Search index', engines: ['opensearch'], cache: {}, show: true, temp: false, noCompletion : false}
		,pagelist    : {name: 'Page list', engines: ['internalsearch', 'exists'], cache: {}, show: true, temp: false, noCompletion : false}
		,combined    : {name: 'Combined search', engines: ['opensearch', 'internalsearch'], cache: {}, show: true, temp: false, noCompletion : false}
		,subcat      : {name: 'Subcategories', engines: ['subcategories'], cache: {}, show: true, temp: true, noCompletion : true}
		,parentcat   : {name: 'Parent categories', engines: ['parentcategories'], cache: {}, show: true, temp: true, noCompletion : true}
	};
 
	function CategoryEditor () { this.initialize.apply (this, arguments); }
	CategoryEditor.UNCHANGED      = 0;
	CategoryEditor.OPEN           = 1; // Open, but no input yet
	CategoryEditor.CHANGE_PENDING = 2; // Open, some input made
	CategoryEditor.CHANGED        = 3;
	CategoryEditor.DELETED        = 4;
 
	var dummyElement = make ('\xa0', true);
 
	function forceRedraw () {
		if (!is_ie6) return;
		if (dummyElement.parentNode) {
			document.body.removeChild (dummyElement);
		} else {
			document.body.appendChild (dummyElement);
		}
	}
 
	// Event keyCodes that we handle in the text input field/suggestion list.
	var BS = 8, TAB = 9, RET = 13, ESC = 27, SPACE = 32, PGUP = 33, PGDOWN = 34, UP = 38, DOWN = 40, DEL = 46, IME = 229;
 
	function makeActive (which) {
		if (which.is_active) return;
		for (var i = 0; i < editors.length; i++) {
			if (editors[i] !== which) editors[i].inactivate ();
		}
		which.is_active = true;
		if (which.dab) {
			showDab (which);
		} else {
			var expectedInput = which.lastRealInput || which.lastInput || "";
			var actualValue = which.text.value || "";
			if (expectedInput.length === 0 && actualValue.length > 0 || expectedInput.length > 0 && actualValue.indexOf (expectedInput) !== 0) {
				which.showsList = false;
				var v = actualValue.split('|');
				which.lastRealInput = which.lastInput = v[0];
				if (v.length > 1) which.currentKey = v[1];
				if (which.lastSelection) which.lastSelection = {start: v[0].length, end: v[0].length};
			}
			if (which.showsList) which.displayList();
			if (which.lastSelection) {
				if (is_webkit) {
					window.setTimeout (
						 function () { which.setSelection (which.lastSelection.start, which.lastSelection.end); }
						,1
					);
				} else {
					which.setSelection (which.lastSelection.start, which.lastSelection.end);
				}
			}
		}
	}
 
	function showDab (which) {
		if (!which.is_active) {
			makeActive(which);
		} else {
			which.showSuggestions (which.dab, false, null, null); // do autocompletion, no key, no engine selector
			which.dab = null;
		}
	}
 
	CategoryEditor.prototype = {
 
		initialize : function (line, span, after, key, is_hidden) {
			if (!span) {
				this.isAddCategory = true;
				this.originalCategory = "";
				this.originalKey = null;
				this.originalExists   = false;
				if (!newDOM) {
					span = make ('span');
					span.className = 'noprint';
					if (key) {
						span.appendChild (make (' | ', true));
						if (after) {
							after.parentNode.insertBefore (span, after.nextSibling);
							after = after.nextSibling;
						} else {
							line.appendChild (span);
						}
					} else if (line.firstChild) {
						span.appendChild (make (' ', true));
						line.appendChild (span);
					}
				}
				this.linkSpan = make ('span');
				this.linkSpan.className = 'noprint nopopups hotcatlink';
				var lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.open, this);
				lk.appendChild (make (HotCat.links.add, true)); lk.title = HotCat.tooltips.add;
				this.linkSpan.appendChild (lk);
				span = make (newDOM ? 'li' : 'span');
				span.className = 'noprint';
				if (is_rtl) span.dir = 'rtl';
				span.appendChild (this.linkSpan);
				if (after)
					after.parentNode.insertBefore (span, after.nextSibling);
				else
					line.appendChild (span);
				this.normalLinks = null;
				this.undelLink = null;
				this.catLink = null;
			} else {
				if (is_rtl) span.dir = 'rtl';
				this.isAddCategory = false;
				this.catLink = span.firstChild;
				this.originalCategory = after;
				this.originalKey = (key && key.length > 1) ? key.substr(1) : null; // > 1 because it includes the leading bar
				this.originalExists   = !hasClass (this.catLink, 'new');
				this.makeLinkSpan ();
				if (!this.originalExists && this.upDownLinks) this.upDownLinks.style.display = 'none';
				span.appendChild (this.linkSpan);
			}
			this.originalHidden     = is_hidden;
			this.line               = line;
			this.engine             = HotCat.suggestions;
			this.span               = span;
			this.currentCategory    = this.originalCategory;
			this.currentExists      = this.originalExists;
			this.currentHidden      = this.originalHidden;
			this.currentKey         = this.originalKey;
			this.state              = CategoryEditor.UNCHANGED;
			this.lastSavedState     = CategoryEditor.UNCHANGED;
			this.lastSavedCategory  = this.originalCategory;
			this.lastSavedKey       = this.originalKey;
			this.lastSavedExists    = this.originalExists;
			this.lastSavedHidden    = this.originalHidden;
			if (this.catLink && this.currentKey) {
				this.catLink.title = this.currentKey;
			}
			editors[editors.length] = this;
		},
 
		makeLinkSpan : function () {
			this.normalLinks = make ('span');
			var lk = null;
			if (this.originalCategory && this.originalCategory.length > 0) {
				lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.remove, this);
				lk.appendChild (make (HotCat.links.remove, true)); lk.title = HotCat.tooltips.remove;
				this.normalLinks.appendChild (make (' ', true));
				this.normalLinks.appendChild (lk);
			}
			if (!HotCat.template_categories[this.originalCategory]) {
				lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.open, this);
				lk.appendChild (make (HotCat.links.change, true)); lk.title = HotCat.tooltips.change;
				this.normalLinks.appendChild (make (' ', true));
				this.normalLinks.appendChild (lk);
				if (!noSuggestions && HotCat.use_up_down) {
					this.upDownLinks = make ('span');
					lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.down, this);
					lk.appendChild (make (HotCat.links.down, true)); lk.title = HotCat.tooltips.down;
					this.upDownLinks.appendChild (make (' ', true));
					this.upDownLinks.appendChild (lk);
					lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.up, this);
					lk.appendChild (make (HotCat.links.up, true)); lk.title = HotCat.tooltips.up;
					this.upDownLinks.appendChild (make (' ', true));
					this.upDownLinks.appendChild (lk);
					this.normalLinks.appendChild (this.upDownLinks);
				}
			}
			this.linkSpan = make ('span');
			this.linkSpan.className = 'noprint nopopups hotcatlink';
			this.linkSpan.appendChild (this.normalLinks);
			this.undelLink = make ('span');
			this.undelLink.className = 'nopopups hotcatlink';
			this.undelLink.style.display = 'none';
			lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.restore, this);
			lk.appendChild (make (HotCat.links.restore, true)); lk.title = HotCat.tooltips.restore;
			this.undelLink.appendChild (make (' ', true));
			this.undelLink.appendChild (lk);
			this.linkSpan.appendChild (this.undelLink);
		},
 
		invokeSuggestions : function (dont_autocomplete) {
			if (this.engine && suggestionConfigs[this.engine] && suggestionConfigs[this.engine].temp && !dont_autocomplete) {
				this.engine = HotCat.suggestions; // Reset to a search upon input
			}
			this.state = CategoryEditor.CHANGE_PENDING;
			var self = this;
			window.setTimeout (function () {self.textchange (dont_autocomplete);}, HotCat.suggest_delay);
		},
 
		makeForm : function () {
			var form = make ('form');
			form.method = 'POST'; form.onsubmit = bind (this.accept, this);
			this.form = form;
			var self = this;
			var text = make ('input'); text.type = 'text'; text.size = HotCat.editbox_width;
			if (!noSuggestions) {
				text.onkeyup =
					function (evt) {
						evt = evt || window.event || window.Event; // W3C, IE, Netscape
						var key = evt.keyCode || 0;
						if (self.ime && self.lastKey === IME && !self.usesComposition && (key === TAB || key === RET || key == ESC || key === SPACE)) self.ime = false;
						if (self.ime) return true;
						if (key === UP || key === DOWN || key === PGUP || key === PGDOWN) {
 
							if (self.keyCount === 0) return self.processKey (evt);
						} else {
							if (key === ESC && self.lastKey !== IME) {
								if (!self.resetKeySelection ()) {
									self.cancel ();
									return;
								}
							}
							self.invokeSuggestions (key === BS || key === DEL || key === ESC);
						}
						return true;
					};
				text.onkeydown =
					function (evt) {
						evt = evt || window.event || window.Event; // W3C, IE, Netscape
						var key = evt.keyCode || 0;
						self.lastKey = key;
						self.keyCount = 0;
						// DOM Level < 3 IME input	
						if (!self.ime && key === IME && !self.usesComposition) {
							self.ime = true;
						} else if (self.ime && key !== IME && !(key >= 16 && key <= 20 || key >= 91 && key <= 93 || key === 144)) {
							self.ime = false;
						}
						if (self.ime) return true;
						// Handle return explicitly, to override the default form submission to be able to check for ctrl
						if (key === RET) return self.accept (evt);
						// Inhibit default behavior of ESC (revert to last real input in FF: we do that ourselves)
						return (key === ESC) ? evtKill(evt) : true;
					};
				// And handle continued pressing of arrow keys
				text.onkeypress = function (evt) {self.keyCount++; return self.processKey (evt);};
				addEvent (text, 'focus', function () { makeActive(self); });
				addEvent (text
					, (typeof text.onbeforedeactivate != 'undefined' && text.createTextRange) ? 'beforedeactivate' : 'blur'
					, bind (this.saveView, this)
				);
				try {
					addEvent(text, 'compositionstart', function (evt) { self.lastKey = IME; self.usesComposition = true; self.ime = true; });
					addEvent(text, 'compositionend', function (evt) { self.lastKey = IME; self.usesComposition = true; self.ime = false; });
					addEvent(text, 'textInput', function (evt) { self.ime = false; self.invokeSuggestions(false); });
				} catch (any) {
				}
				addEvent(text, 'blur', function (evt) { self.usesComposition = false; self.ime = false; });
			}
			this.text = text;
 
			this.icon = make ('img');
 
			var list = null;
			if (!noSuggestions) {
				list = make ('select');
				list.onclick    = function (e) { if (self.highlightSuggestion(0)) self.textchange (false, true); };
				list.ondblclick = function (e) { if (self.highlightSuggestion(0)) self.accept (e); };
				list.onchange = function (e) { self.highlightSuggestion(0); self.text.focus(); };
				list.onkeyup =
					function (evt) {
						evt = evt || window.event || window.Event; // W3C, IE, Netscape
						if (evt.keyCode === ESC) {
							self.resetKeySelection ();
							self.text.focus();
							window.setTimeout (function () {self.textchange (true);}, HotCat.suggest_delay);
						} else if (evt.keyCode === RET) {
							self.accept (evt);
						}
					};
				if (!HotCat.fixed_search) {
					var engineSelector = make ('select');
					for (var key in suggestionConfigs) {
						if (suggestionConfigs[key].show) {
							var opt = make ('option');
							opt.value = key;
							if (key == this.engine) opt.selected = true;
							opt.appendChild (make (suggestionConfigs[key].name, true));
							engineSelector.appendChild (opt);
						}
					}
					engineSelector.onchange =
						function () {
							self.engine = self.engineSelector.options[self.engineSelector.selectedIndex].value;
							self.text.focus();
							self.textchange (true, true); // Don't autocomplete, force re-display of list
						};
					this.engineSelector = engineSelector;
				}
			}
			this.list = list;
 
			function button_label (id, defaultText) {
				var label = null;
				if (   onUpload
					&& typeof UFUI != 'undefined'
					&& typeof UIElements != 'undefined'
					&& typeof UFUI.getLabel == 'function')
				{
					try {
						label = UFUI.getLabel (id, true);
						// Extract the plain text. IE doesn't know that Node.TEXT_NODE === 3
						while (label && label.nodeType != 3) label = label.firstChild;
					} catch (ex) {
						label = null;
					}
				}
				if (!label || !label.data) return defaultText;
				return label.data;
			}
 
			var OK = make ('input'); OK.type = 'button';
			OK.value = button_label ('wpOkUploadLbl', HotCat.messages.ok);
			OK.onclick = bind (this.accept, this);
			this.ok = OK;
 
			var cancel = make ('input'); cancel.type = 'button';
			cancel.value = button_label ('wpCancelUploadLbl', HotCat.messages.cancel);
			cancel.onclick = bind (this.cancel, this);
			this.cancelButton = cancel;
 
			var span = make ('span');
			span.className = 'hotcatinput';
			span.style.position = 'relative';
			span.appendChild (text);-
			span.appendChild (make ('\xa0', true));
			span.style.whiteSpace = 'nowrap';
 
			if (list) span.appendChild (list);
			if (this.engineSelector) span.appendChild (this.engineSelector);
			if (!noSuggestions) span.appendChild (this.icon);
			span.appendChild (OK);
			span.appendChild (cancel);
			form.appendChild(span);
			form.style.display = 'none';
			this.span.appendChild (form);
		},
 
		display : function (evt) {
			if (this.isAddCategory && !onUpload) {
				var newAdder = new CategoryEditor (this.line, null, this.span, true); // Create a new one
			}
			if (!commitButton && !onUpload) {
				for (var i = 0; i < editors.length; i++) {
					if (editors[i].state != CategoryEditor.UNCHANGED) {
						setMultiInput();
						break;
					}
				}
			}
			if (!this.form) {
				this.makeForm ();
			}
			if (this.list) this.list.style.display = 'none';
			if (this.engineSelector) this.engineSelector.style.display = 'none';
			this.currentCategory = this.lastSavedCategory;
			this.currentExists   = this.lastSavedExists;
			this.currentHidden   = this.lastSavedHidden;
			this.currentKey      = this.lastSavedKey;
			this.icon.src = armorUri(this.currentExists ? HotCat.existsYes : HotCat.existsNo);
			this.text.value = this.currentCategory + (this.currentKey !== null ? '|' + this.currentKey : "");
			this.originalState = this.state;
			this.lastInput     = this.currentCategory;
			this.inputExists   = this.currentExists;
			this.state         = this.state == CategoryEditor.UNCHANGED ? CategoryEditor.OPEN : CategoryEditor.CHANGE_PENDING;
			this.lastSelection = {start: this.currentCategory.length, end: this.currentCategory.length};
			this.showsList = false;
			if (this.catLink) this.catLink.style.display = 'none';
			this.linkSpan.style.display = 'none';
			this.form.style.display = 'inline';
			this.ok.disabled = false;
			var result = evtKill (evt);
			this.text.focus();
			this.text.readOnly = false;
			checkMultiInput ();
			return result;
		},
 
		show : function (evt, engine, readOnly) {
			var result = this.display (evt);
			var v = this.lastSavedCategory;
			if (v.length === 0) return result;
			this.text.readOnly = !!readOnly;
			this.engine = engine;
			this.textchange (false, true); // do autocompletion, force display of suggestions
			forceRedraw ();
			return result;
		},
 
		open : function (evt) {
			return this.show (evt, (this.engine && suggestionConfigs[this.engine].temp) ? HotCat.suggestions : this.engine);
		},
 
		down : function (evt) {
			return this.show (evt, 'subcat', true);
		},
 
		up : function (evt) {
			return this.show (evt, 'parentcat');
		},
 
		cancel : function () {
			if (this.isAddCategory && !onUpload) {
				this.removeEditor(); // We added a new adder when opening
				return;
			}
			this.inactivate();
			this.form.style.display = 'none';
			if (this.catLink) this.catLink.style.display = "";
			this.linkSpan.style.display = "";
			this.state = this.originalState;
			this.currentCategory = this.lastSavedCategory;
			this.currentKey      = this.lastSavedKey;
			this.currentExists   = this.lastSavedExists;
			this.currentHidden   = this.lastSavedHidden;
			if (this.catLink) {
				if (this.currentKey && this.currentKey.length > 0) {
					this.catLink.title = this.currentKey;
				} else {
					this.catLink.title = "";
				}
			}
			if (this.state == CategoryEditor.UNCHANGED) {
				if (this.catLink) this.catLink.style.backgroundColor = 'transparent';
			} else {
				if (!onUpload) {
					try {
						this.catLink.style.backgroundColor = HotCat.bg_changed;
					} catch (ex) {}
				}
			}
			checkMultiInput ();
			forceRedraw ();
		},
 
		removeEditor : function () {
			if (!newDOM) {
				var next = this.span.nextSibling;
				if (next) next.parentNode.removeChild (next);
			}
			this.span.parentNode.removeChild (this.span);
			for (var i = 0; i < editors.length; i++) {
				if (editors[i] == this) {
					editors.splice (i, 1);
					break;
				}
			}
			checkMultiInput ();
			var self = this;
			window.setTimeout (function () {delete self;}, 10);
		},
 
		rollback : function (evt) {
			this.undoLink.parentNode.removeChild (this.undoLink);
			this.undoLink = null;
			this.currentCategory = this.originalCategory;
			this.currentKey = this.originalKey;
			this.currentExists = this.originalExists;
			this.currentHidden = this.originalHidden;
			this.lastSavedCategory = this.originalCategory;
			this.lastSavedKey = this.originalKey;
			this.lastSavedExists = this.originalExists;
			this.lastSavedHidden = this.originalHidden;
			this.state = CategoryEditor.UNCHANGED;
			if (!this.currentCategory || this.currentCategory.length === 0) {
				this.removeEditor();
			} else {
				// Redisplay the link...
				this.catLink.removeChild (this.catLink.firstChild);
				this.catLink.appendChild (make (this.currentCategory, true));
				this.catLink.href = wikiPagePath (HotCat.category_canonical + ':' + this.currentCategory);
				this.catLink.title = this.currentKey || "";
				this.catLink.className = this.currentExists ? "" : 'new';
				this.catLink.style.backgroundColor = 'transparent';
				if (this.upDownLinks) this.upDownLinks.style.display = this.currentExists ? "" : 'none';
				checkMultiInput ();
			}
			return evtKill (evt);
		},
 
		inactivate : function () {
			if (this.list) this.list.style.display = 'none';
			if (this.engineSelector) this.engineSelector.style.display = 'none';
			this.is_active = false;
		},
 
		acceptCheck : function (dontCheck) {
			this.sanitizeInput ();
			var value = this.text.value.split('|');
			var key   = null;
			if (value.length > 1) key = value[1];
			var v = value[0].replace(/_/g, ' ').replace(/^\s+|\s+$/g, "");
			if (HotCat.capitalizePageNames) v = capitalize (v);
			this.lastInput = v;
			v = replaceShortcuts(v, HotCat.shortcuts);
			if (v.length === 0) {
				this.cancel ();
				return false;
			}
			if (!dontCheck
				&& (   conf.wgNamespaceNumber === 14 && v == conf.wgTitle
					|| HotCat.blacklist && HotCat.blacklist.test(v))
			   )
			{
				this.cancel ();
				return false;
			}
			this.currentCategory = v;
			this.currentKey = key;
			this.currentExists = this.inputExists;
			return true;
		},
 
		accept : function (evt) {
			this.noCommit = (evtKeys (evt) & 1) !== 0;
			var result = evtKill (evt);
			if (this.acceptCheck ()) {
				var toResolve = [this];
				var original  = this.currentCategory;
				resolveMulti (
					 toResolve
					,function (resolved) {
						if (resolved[0].dab) {
							showDab (resolved[0]);
						} else {
							if (resolved[0].acceptCheck(true)) {
								resolved[0].commit (
									(resolved[0].currentCategory != original)
										? HotCat.messages.cat_resolved.replace (/\$1/g, original)
										: null
								);
							}
						}
					 }
				);
			}
			return result;
		},
 
		close : function () {
			if (!this.catLink) {
				// Create a catLink
				this.catLink = make ('a');
				this.catLink.appendChild (make ('foo', true));
				this.catLink.style.display = 'none';
				this.span.insertBefore (this.catLink, this.span.firstChild.nextSibling);
			}
			this.catLink.removeChild (this.catLink.firstChild);
			this.catLink.appendChild (make (this.currentCategory, true));
			this.catLink.href = wikiPagePath (HotCat.category_canonical + ':' + this.currentCategory);
			this.catLink.className = this.currentExists ? "" : 'new';
			this.lastSavedCategory = this.currentCategory;
			this.lastSavedKey      = this.currentKey;
			this.lastSavedExists   = this.currentExists;
			this.lastSavedHidden   = this.currentHidden;
			this.inactivate();
			this.form.style.display = 'none';
			this.catLink.title = this.currentKey || "";
			this.catLink.style.display = "";
			if (this.isAddCategory) {
				if (onUpload) {
					var newAdder = new CategoryEditor (this.line, null, this.span, true); // Create a new one
				}
				this.isAddCategory = false;
				this.linkSpan.parentNode.removeChild (this.linkSpan);
				this.makeLinkSpan ();
				this.span.appendChild (this.linkSpan);
			}
			if (!this.undoLink) {
				// Append an undo link.
				var span = make ('span');
				var lk = make ('a'); lk.href = '#catlinks'; lk.onclick = bind (this.rollback, this);
				lk.appendChild (make (HotCat.links.undo, true)); lk.title = HotCat.tooltips.undo;
				span.appendChild (make (' ', true));
				span.appendChild (lk);
				this.normalLinks.appendChild (span);
				this.undoLink = span;
				if (!onUpload) {
					try {
						this.catLink.style.backgroundColor = HotCat.bg_changed;
					} catch (ex) {}
				}
			}
			if (this.upDownLinks) this.upDownLinks.style.display = this.lastSavedExists ? "" : 'none';
			this.linkSpan.style.display = "";
			this.state = CategoryEditor.CHANGED;
			checkMultiInput ();
			forceRedraw ();
		},
 
		commit : function (comment) {
			if (   (   this.currentCategory == this.originalCategory
					&& (this.currentKey == this.originalKey
						|| this.currentKey === null && this.originalKey.length === 0
					   )
				   )
				|| conf.wgNamespaceNumber == 14 && this.currentCategory == conf.wgTitle
				|| HotCat.blacklist && HotCat.blacklist.test (this.currentCategory)
			   )
			{
				this.cancel ();
				return;
			}
			if (commitButton || onUpload) {
				this.close ();
			} else {
				this.close ();
				var self = this;
				initiateEdit (function (failure) {performChanges (failure, self);}, function (msg) {alert (msg);});
			}
		},
 
		remove : function (evt) {
			this.doRemove (evtKeys (evt) & 1);
			return evtKill (evt);
		},
 
		doRemove : function (noCommit) {
			if (this.isAddCategory) { // Empty input on adding a new category
				this.cancel ();
				return;
			}
			if (!commitButton && !onUpload) {
				for (var i = 0; i < editors.length; i++) {
					if (editors[i].state != CategoryEditor.UNCHANGED) {
						setMultiInput();
						break;
					}
				}
			}
			if (commitButton) {
				this.catLink.title = "";
				this.catLink.style.cssText += '; text-decoration : line-through !important;';
				try {
					this.catLink.style.backgroundColor = HotCat.bg_changed;
				} catch (ex) {}
				this.originalState = this.state;
				this.state = CategoryEditor.DELETED;
				this.normalLinks.style.display = 'none';
				this.undelLink.style.display = "";
				checkMultiInput ();
			} else {
				if (onUpload) {
					// Remove this editor completely
					this.removeEditor ();
				} else {
					this.originalState = this.state;
					this.state = CategoryEditor.DELETED;
					this.noCommit = noCommit || HotCat.del_needs_diff;
					var self = this;
					initiateEdit (function (failure) {performChanges (failure, self);}, function (msg) {self.state = self.originalState; alert (msg);});
				}
			}
		},
 
		restore : function (evt) {
			this.catLink.title = this.currentKey || "";
			this.catLink.style.textDecoration = "";
			this.state = this.originalState;
			if (this.state == CategoryEditor.UNCHANGED) {
				this.catLink.style.backgroundColor = 'transparent';
			} else {
				try {
					this.catLink.style.backgroundColor = HotCat.bg_changed;
				} catch (ex) {}
			}
			this.normalLinks.style.display = "";
			this.undelLink.style.display = 'none';
			checkMultiInput ();
			return evtKill (evt);
		},
 
		// Internal operations
 
		selectEngine : function (engineName) {
			if (!this.engineSelector) return;
			for (var i = 0; i < this.engineSelector.options.length; i++) {
				this.engineSelector.options[i].selected = this.engineSelector.options[i].value == engineName;
			}
		},
 
		sanitizeInput : function () {
			var v = this.text.value || "";
			v = v.replace(/^(\s|_)+/, ""); // Trim leading blanks and underscores
			var re = new RegExp ('^(' + HotCat.category_regexp + '):');
			if (re.test (v)) {
				v = v.substring (v.indexOf (':') + 1).replace(/^(\s|_)+/, "");
			}
			if (HotCat.capitalizePageNames) v = capitalize (v);
			if (this.text.value !== null && this.text.value != v)
				this.text.value = v;
		},
 
		makeCall : function (url, callbackObj, engine, queryKey, cleanKey) {
			var cb = callbackObj;
			var e  = engine;
			var v  = queryKey;
			var z  = cleanKey;
			var thisObj = this;
 
			function done () {
				cb.callsMade++;
				if (cb.callsMade === cb.nofCalls) {
					if (cb.exists) cb.allTitles.exists = true;
					if (cb.normalized) cb.allTitles.normalized = cb.normalized;
					if (!cb.dontCache && !suggestionConfigs[cb.engineName].cache[z]) {
						suggestionConfigs[cb.engineName].cache[z] = cb.allTitles;
					}
					thisObj.text.readOnly = false;
					if (!cb.cancelled) thisObj.showSuggestions (cb.allTitles, cb.noCompletion, v, cb.engineName);
					if (cb === thisObj.callbackObj) thisObj.callbackObj = null;
					delete cb;
				}
			}
 
			getJSON ({
			  uri : url
			 ,success : function (json) {
				var titles = e.handler (json, z);
				if (titles && titles.length > 0) {
					if (cb.allTitles === null) {
						cb.allTitles = titles;
					} else {
						cb.allTitles = cb.allTitles.concat (titles);
					}
					if (titles.exists) cb.exists = true;
					if (titles.normalized) cb.normalized = titles.normalized;
				}
				done();
			  }
			 ,error : function (req) {if (!req) noSuggestions = true; cb.dontCache = true; done(); }
			});
		},
 
		callbackObj : null,
 
		textchange : function (dont_autocomplete, force) {
			makeActive (this);
			this.sanitizeInput ();
			var v = this.text.value;
 
			var pipe = v.indexOf ('|');
			if (pipe >= 0) {
				this.currentKey = v.substring (pipe+1);
				v = v.substring (0, pipe);
			} else {
				this.currentKey = null;
			}
			if (this.lastInput == v && !force) return; // No change
			if (this.lastInput != v) checkMultiInput ();
			this.lastInput = v;
			this.lastRealInput = v;
 
			// Mark blacklisted inputs.
			this.ok.disabled = v.length > 0 && HotCat.blacklist && HotCat.blacklist.test (v);
 
			if (noSuggestions) {
				if (this.list) this.list.style.display = 'none';
				if (this.engineSelector) this.engineSelector.style.display = 'none';
				if (this.icon) this.icon.style.display = 'none';
				return;
			}
 
			if (v.length === 0) { this.showSuggestions([]); return; }
			var cleanKey = v.replace(/[\u200E\u200F\u202A-\u202E]/g, "").replace(wikiTextBlankRE, ' ');
			cleanKey = replaceShortcuts(cleanKey, HotCat.shortcuts);
			cleanKey = cleanKey.replace(/^\s+|\s+$/g, '');
			if (cleanKey.length === 0) { this.showSuggestions([]); return; }
 
			if (this.callbackObj) this.callbackObj.cancelled = true;
			var engineName  = suggestionConfigs[this.engine] ? this.engine : 'combined';
 
			dont_autocomplete = dont_autocomplete || suggestionConfigs[engineName].noCompletion;
			if (suggestionConfigs[engineName].cache[cleanKey]) {
				this.showSuggestions (suggestionConfigs[engineName].cache[cleanKey], dont_autocomplete, v, engineName);
				return;
			}
 
			var engines = suggestionConfigs[engineName].engines;
			this.callbackObj =
				{allTitles: null, callsMade: 0, nofCalls: engines.length, noCompletion: dont_autocomplete, engineName: engineName};
			this.makeCalls (engines, this.callbackObj, v, cleanKey);
		},
 
		makeCalls : function (engines, cb, v, cleanKey) {
			for (var j = 0; j < engines.length; j++) {
				var engine = suggestionEngines[engines[j]];
				var url = conf.wgServer + conf.wgScriptPath + engine.uri.replace (/\$1/g, encodeURIComponent (cleanKey));
				this.makeCall (url, cb, engine, v, cleanKey);
			}
		},
 
		showSuggestions : function (titles, dontAutocomplete, queryKey, engineName) {
			this.text.readOnly = false;
			this.dab = null;
			this.showsList = false;
			if (!this.list) return;
			if (noSuggestions) {
				if (this.list) this.list.style.display = 'none';
				if (this.engineSelector) this.engineSelector.style.display = 'none';
				if (this.icon) this.icon.style.display = 'none';
				this.inputExists = true; // Default...
				return;
			}
			this.engineName = engineName;
			if (engineName) {
				if (!this.engineSelector) this.engineName = null;
			} else {
				if (this.engineSelector) this.engineSelector.style.display = 'none';
			}
			if (queryKey) {
				if (this.lastInput.indexOf (queryKey) !== 0) return;
				if (this.lastQuery && this.lastInput.indexOf (this.lastQuery) === 0 && this.lastQuery.length > queryKey.length)
					return;
			}
			this.lastQuery = queryKey;
 
			var v = this.text.value.split('|');
			var key = v.length > 1 ? '|' + v[1] : "";
			v = (HotCat.capitalizePageNames ? capitalize (v[0]) : v[0]);
			var vNormalized = v;
			var knownToExist = titles && titles.exists;
			var i;
			if (titles) {
				if (titles.normalized && v.indexOf(queryKey) === 0) {
					// We got back a different normalization than what is in the input field
					vNormalized = titles.normalized + v.substring(queryKey.length);
				}
				var vLow = vNormalized.toLowerCase ();
				// Strip blacklisted categories
				if (HotCat.blacklist) {
					for (i = 0; i < titles.length; i++) {
						if (HotCat.blacklist.test (titles[i])) {
							titles.splice(i, 1);
							i--;
						}
					}
				}
				titles.sort (
					function (a, b) {
						if (a == b) return 0;
						if (a.indexOf (b) === 0) return 1; // a begins with b: a > b
						if (b.indexOf (a) === 0) return -1; // b begins with a: a < b
						// Opensearch may return stuff not beginning with the search prefix!
						var prefixMatchA = (a.indexOf (vNormalized) === 0 ? 1 : 0);
						var prefixMatchB = (b.indexOf (vNormalized) === 0 ? 1 : 0);
						if (prefixMatchA != prefixMatchB) return prefixMatchB - prefixMatchA;
						// Case-insensitive prefix match!
						var aLow = a.toLowerCase(), bLow = b.toLowerCase();
						prefixMatchA = (aLow.indexOf (vLow) === 0 ? 1 : 0);
						prefixMatchB = (bLow.indexOf (vLow) === 0 ? 1 : 0);
						if (prefixMatchA != prefixMatchB) return prefixMatchB - prefixMatchA;
						if (a < b) return -1;
						if (b < a) return 1;
						return 0;
					}
				);
				// Remove duplicates and self-references
				for (i = 0; i < titles.length; i++) {
					if (   i+1 < titles.length && titles[i] == titles[i+1]
						|| conf.wgNamespaceNumber == 14 && titles[i] == conf.wgTitle
					   )
					{
						titles.splice (i, 1);
						i--;
					}
				}
			}
			if (!titles || titles.length === 0) {
				if (this.list) this.list.style.display = 'none';
				if (this.engineSelector) this.engineSelector.style.display = 'none';
				if (engineName && suggestionConfigs[engineName] && !suggestionConfigs[engineName].temp) {
					if (this.icon) this.icon.src = armorUri(HotCat.existsNo);
					this.inputExists = false;
				}
				return;
			}
 
			var firstTitle = titles[0];
			var completed = this.autoComplete (firstTitle, v, vNormalized, key, dontAutocomplete);
			var existing = completed || knownToExist || firstTitle == replaceShortcuts(v, HotCat.shortcuts);
			if (engineName && suggestionConfigs[engineName] && !suggestionConfigs[engineName].temp) {
				this.icon.src = armorUri(existing ? HotCat.existsYes : HotCat.existsNo);
				this.inputExists = existing;
			}
			if (completed) {
				this.lastInput = firstTitle;
				if (titles.length === 1) {
					this.list.style.display = 'none';
					if (this.engineSelector) this.engineSelector.style.display = 'none';
					return;
				}
			}
			// (Re-)fill the list
			while (this.list.firstChild) this.list.removeChild (this.list.firstChild);
			for (i = 0 ; i < titles.length ; i++) {
				var opt = make ('option') ;
				opt.appendChild (make (titles[i], true));
				opt.selected = completed && (i === 0);
				this.list.appendChild (opt);
			}
			this.displayList();
		},
 
		displayList : function () {
			this.showsList = true;
			if (!this.is_active) {
				this.list.style.display = 'none';
				if (this.engineSelector) this.engineSelector.style.display = 'none';
				return;
			}
			var nofItems = (this.list.options.length > HotCat.list_size ? HotCat.list_size : this.list.options.length);
			if (nofItems <= 1) nofItems = 2;
			this.list.size = nofItems;
			this.list.style.align    = is_rtl ? 'right' : 'left';
			this.list.style.zIndex   = 5;
			this.list.style.position = 'absolute';
			// Compute initial list position. First the height.
			var anchor = is_rtl ? 'right' : 'left';
			var listh = 0;
			if (this.list.style.display == 'none') {
				// Off-screen display to get the height
				this.list.style.top = this.text.offsetTop + 'px';
				this.list.style[anchor] = '-10000px';
				this.list.style.display = "";
				listh = this.list.offsetHeight;
				this.list.style.display = 'none';
			} else {
				listh = this.list.offsetHeight;
			}
			// Approximate calculation of maximum list size
			var maxListHeight = listh;
			if (nofItems < HotCat.list_size) maxListHeight = (listh / nofItems) * HotCat.list_size;
 
			function viewport (what) {
				if (is_webkit && !document.evaluate)
					return window['inner' + what]; // Safari < 3.0
				var s = 'client' + what;
				if (window.opera) return document.body[s];
				return (document.documentElement ? document.documentElement[s] : 0)
					|| document.body[s] || 0;
			}
			function scroll_offset (what) {
				var s = 'scroll' + what;
				var result = (document.documentElement ? document.documentElement[s] : 0)
							|| document.body[s] || 0;
				if (is_rtl && what == 'Left') {
					if (result < 0) result = - result;
					if (!is_webkit && !is_ie_lt8) {
						result = scroll_offset('Width') - viewport('Width') - result;
					}
					// Now all have webkit behavior, i.e. zero if at the leftmost edge.
				}
				return result;
			}
			function position (node) {
				if (node.getBoundingClientRect) {
					var box    = node.getBoundingClientRect ();
					return { x : Math.round (box.left + scroll_offset ('Left'))
							,y : Math.round (box.top + scroll_offset ('Top'))
						   };
				}
				var t = 0, l = 0;
				do {
					t = t + (node.offsetTop  || 0);
					l = l + (node.offsetLeft || 0);
					node = node.offsetParent;
				} while (node);
				return {x : l, y : t};
			}
 
			var textPos = position (this.text);
			var nl = 0;
			var nt = 0;
			var offset = 0;
			// Opera 9.5 somehow has offsetWidth = 0 here?? Use the next best value...
			var textBoxWidth = this.text.offsetWidth || this.text.clientWidth;
			if (this.engineName) {
				this.engineSelector.style.zIndex = 5;
				this.engineSelector.style.position = 'absolute';
				this.engineSelector.style.width = textBoxWidth + 'px';
				// Figure out the height of this selector: display it off-screen, then hide it again.
				if (this.engineSelector.style.display == 'none') {
					this.engineSelector.style[anchor] = '-10000px';
					this.engineSelector.style.top = '0px';
					this.engineSelector.style.display = "";
					offset = this.engineSelector.offsetHeight;
					this.engineSelector.style.display = 'none';
				} else {
					offset = this.engineSelector.offsetHeight;
				}
				this.engineSelector.style[anchor]  = nl + 'px';
			}
			if (textPos.y < maxListHeight + offset + 1) {
				nt = this.text.offsetHeight + offset + 1;
				if (this.engineName) this.engineSelector.style.top = this.text.offsetHeight + 'px';
			} else {
				nt = - listh - offset - 1;
				if (this.engineName) this.engineSelector.style.top = - (offset + 1) + 'px';
			}
			this.list.style.top = nt + 'px';
			this.list.style.width = ""; // No fixed width (yet)
			this.list.style[anchor] = nl + 'px';
			if (this.engineName) {
				this.selectEngine (this.engineName);
				this.engineSelector.style.display = "";
			}
			this.list.style.display = 'block';
			// Set the width of the list
			if (this.list.offsetWidth < textBoxWidth ) {
				this.list.style.width = textBoxWidth + 'px';
				return;
			}
			var scroll = scroll_offset ('Left');
			var view_w = viewport ('Width');
			var w      = this.list.offsetWidth;
			var l_pos  = position (this.list);
			var left   = l_pos.x;
			var right  = left + w;
			if (left < scroll || right > scroll + view_w) {
				if (w > view_w) {
					w = view_w;
					this.list.style.width = w + 'px';
					if (is_rtl) {
						left = right - w;
					} else {
						right = left + w;
					}
				}
				var relative_offset = 0;
				if (left < scroll) {
					relative_offset = scroll - left;
				} else if (right > scroll + view_w) {
					relative_offset = - (right - scroll - view_w);
				}
				if (is_rtl) relative_offset = - relative_offset;
				if (relative_offset !== 0) {
					this.list.style[anchor] = (nl + relative_offset) + 'px';
				}
			}
		},
 
		autoComplete : function (newVal, actVal, normalizedActVal, key, dontModify) {
			if (newVal == actVal) return true;
			if (dontModify || this.ime || !this.canSelect()) return false;
			// If we can't select properly or an IME composition is ongoing, autocompletion would be a major annoyance to the user.
			if (newVal.indexOf (actVal) !== 0) {
				// Maybe it'll work with the normalized value (NFC)?
				if (normalizedActVal && newVal.indexOf(normalizedActVal) === 0) {
					if (this.lastRealInput == actVal) this.lastRealInput = normalizedActVal;
					actVal = normalizedActVal;
				} else {
					return false;
				}
			}
			this.text.focus();
			this.text.value = newVal + key;
			this.setSelection (actVal.length, newVal.length);
			return true;
		},
 
		canSelect : function () {
			return this.text.setSelectionRange
				|| this.text.createTextRange
				||    typeof this.text.selectionStart != 'undefined'
				   && typeof this.text.selectionEnd != 'undefined';
		},
 
		setSelection : function (from, to) {
			// this.text must be focused (at least on IE)
			if (!this.text.value) return;
			if (this.text.setSelectionRange) {    // e.g. khtml
				this.text.setSelectionRange (from, to);
			} else if (typeof this.text.selectionStart != 'undefined') {
				if (from > this.text.selectionStart) {
					this.text.selectionEnd   = to;
					this.text.selectionStart = from;
				} else {
					this.text.selectionStart = from;
					this.text.selectionEnd   = to;
				}
			} else if (this.text.createTextRange) { // IE
				var new_selection = this.text.createTextRange();
				new_selection.move ('character', from);
				new_selection.moveEnd ('character', to - from);
				new_selection.select();
			}
		},
 
		getSelection : function () {
			var from = 0, to = 0;
			// this.text must be focused (at least on IE)
			if (!this.text.value) {
				// No text.
			} else if (typeof this.text.selectionStart != 'undefined') {
				from = this.text.selectionStart;
				to   = this.text.selectionEnd;
			} else if (document.selection && document.selection.createRange) { // IE
				var rng = document.selection.createRange().duplicate();
				if (rng.parentElement() === this.text) {
					try {
						var textRng = this.text.createTextRange();
						textRng.move('character', 0);
						textRng.setEndPoint('EndToEnd', rng);
						to = textRng.text.length;
						textRng.setEndPoint('EndToStart', rng);
						from = textRng.text.length;
					} catch (notFocused) {
						from = this.text.value.length; to = from; // At end of text
					}
				}
			}
			return {start: from, end: to};
		},
 
		saveView : function (evt) {
			this.lastSelection = this.getSelection ();
		},
 
		processKey : function (evt) {
			var dir = 0;
			switch (this.lastKey) {
				case UP: dir = -1;
				case DOWN: if (dir === 0) dir = 1; 
				case PGUP: if (dir === 0) dir = -HotCat.list_size;
				case PGDOWN: if (dir === 0) dir = HotCat.list_size;
					if (this.list.style.display != 'none') {
						// List is visible, so there are suggestions
						this.highlightSuggestion (dir);
						// Kill the event, otherwise some browsers (e.g., Firefox) may additionally treat an up-arrow
						// as "place the text cursor at the front", which we don't want here.
						return evtKill (evt);
					} else if (   this.keyCount <= 1
							   && (!this.callbackObj || this.callbackObj.callsMade == this.callbackObj.nofCalls)
							  )
					{
						// If no suggestions displayed, get them, unless we're already getting them.
						this.textchange ();
					}
					break;
				case ESC: // Inhibit default behavior (revert to last real input in FF: we do that ourselves)
					return evtKill (evt);
			}
			return true;
		},
 
		highlightSuggestion : function (dir) {
			if (noSuggestions || !this.list || this.list.style.display == 'none') return false;
			var curr = this.list.selectedIndex;
			var tgt  = -1;
			if (dir === 0) {
				if (curr < 0 || curr >= this.list.options.length) return false;
				tgt = curr;
			} else {
				tgt = curr < 0 ? 0 : curr + dir;
				tgt = tgt < 0 ? 0 : tgt;
				if (tgt >= this.list.options.length) tgt = this.list.options.length - 1;
			}
			if (tgt != curr || dir === 0) {
				if (curr >= 0 && curr < this.list.options.length && dir !== 0) this.list.options[curr].selected = false;
				this.list.options[tgt].selected = true;
				// Get current input text
				var v = this.text.value.split('|');
				var key = v.length > 1 ? '|' + v[1] : "";
				var completed = this.autoComplete (this.list.options[tgt].text, this.lastRealInput, null, key, false);
				if (!completed || this.list.options[tgt].text == this.lastRealInput) {
					this.text.value = this.list.options[tgt].text + key;
					if (this.canSelect()) this.setSelection (this.list.options[tgt].text.length, this.list.options[tgt].text.length);
				}
				this.lastInput = this.list.options[tgt].text;
				this.inputExists = true; // Might be wrong if from a dab list...
				if (this.icon) this.icon.src = armorUri(HotCat.existsYes);
				this.state = CategoryEditor.CHANGE_PENDING;
			}
			return true;
		},
 
		resetKeySelection : function () {
			if (noSuggestions || !this.list || this.list.style.display == 'none') return false;
			var curr = this.list.selectedIndex;
			if (curr >= 0 && curr < this.list.options.length) {
				this.list.options[curr].selected = false;
				// Get current input text
				var v = this.text.value.split('|');
				var key = v.length > 1 ? '|' + v[1] : "";
				var result = v[0] != this.lastInput;
				if (v[0] != this.lastRealInput) {
					this.text.value = this.lastRealInput + key;
					result = true;
				}
				this.lastInput = this.lastRealInput;
				return result;
			}
			return false;
		}
 
	}; // end CategoryEditor.prototype
 
	function initialize () {
		var config = (typeof JSconfig != 'undefined' && JSconfig.keys) ? JSconfig.keys : {};
		HotCat.dont_add_to_watchlist =
			(typeof window.hotcat_dont_add_to_watchlist != 'undefined'
				? !!window.hotcat_dont_add_to_watchlist
				: (typeof config.HotCatDontAddToWatchlist != 'undefined'
					? config.HotCatDontAddToWatchlist
					: HotCat.dont_add_to_watchlist
				  )
			);
		HotCat.no_autocommit =
			(typeof window.hotcat_no_autocommit != 'undefined'
				? !!window.hotcat_no_autocommit
				: (typeof config.HotCatNoAutoCommit != 'undefined'
					? config.HotCatNoAutoCommit
					: HotCat.no_autocommit
				  )
			);
		HotCat.del_needs_diff =
			(typeof window.hotcat_del_needs_diff != 'undefined'
				? !!window.hotcat_del_needs_diff
				: (typeof config.HotCatDelNeedsDiff != 'undefined'
					? config.HotCatDelNeedsDiff
					: HotCat.del_needs_diff
				  )
			);
		HotCat.suggest_delay = window.hotcat_suggestion_delay
							|| config['HotCatSuggestionDelay']
							|| HotCat.suggest_delay;
		HotCat.editbox_width = window.hotcat_editbox_width
							|| config['HotCatEditBoxWidth']
							|| HotCat.editbox_width;
		HotCat.suggestions   = window.hotcat_suggestions
							|| config['HotCatSuggestions']
							|| HotCat.suggestions;
		if (typeof HotCat.suggestions != 'string' || !suggestionConfigs[HotCat.suggestions])
			HotCat.suggestions = 'combined';
		HotCat.fixed_search  =
			(typeof window.hotcat_suggestions_fixed != 'undefined'
				? !!window.hotcat_suggestions_fixed
				: (typeof config.HotCatFixedSuggestions != 'undefined'
					? config.HotCatFixedSuggestions
					: HotCat.fixed_search
				  )
			);
		HotCat.single_minor =
			(typeof window.hotcat_single_changes_are_minor != 'undefined'
				? !!window.hotcat_single_changes_are_minor
				: (typeof config.HotCatMinorSingleChanges != 'undefined'
					? config.HotCatMinorSingleChanges
					: HotCat.single_minor
				  )
			);
		HotCat.bg_changed = window.hotcat_changed_background
							|| config.HotCatChangedBackground
							|| HotCat.bg_changed;
		HotCat.use_up_down =
			(typeof window.hotcat_use_category_links != 'undefined'
				? !!window.hotcat_use_category_links
				: (typeof config.HotCatUseCategoryLinks != 'undefined'
					? config.HotCatUseCategoryLinks
					: HotCat.use_up_down
				  )
			);
		HotCat.list_size = window.hotcat_list_size
							|| config.HotCatListSize
							|| HotCat.list_size;
		// Numeric input, make sure we have a numeric value
		HotCat.list_size = parseInt (HotCat.list_size, 10);
		if (isNaN (HotCat.list_size) || HotCat.list_size < 5) HotCat.list_size = 5;
		if (HotCat.list_size > 15) HotCat.list_size = 15;
		// Localize search engine names
		if (HotCat.engine_names) {
			for (var key in HotCat.engine_names) {
				if (suggestionConfigs[key] && HotCat.engine_names[key]) {
					suggestionConfigs[key].name = HotCat.engine_names[key];
				}
			}
		}
		// Catch both native RTL and "faked" RTL through [[MediaWiki:Rtl.js]]
		is_rtl = hasClass (document.body, 'rtl');
		if (!is_rtl) {
			if (document.defaultView && document.defaultView.getComputedStyle) { // Gecko etc.
				is_rtl = document.defaultView.getComputedStyle (document.body, null).getPropertyValue ('direction');
			} else if (document.body.currentStyle) { // IE, has subtle differences to getComputedStyle
				is_rtl = document.body.currentStyle['direction'];
			} else { // Not exactly right, but best effort
				is_rtl = document.body.style['direction'];
			}
			is_rtl = (is_rtl == 'rtl');
		}
	}
 
	function can_edit () {
		var container = null;
		switch (mw.config.get('skin')) {
			case 'cologneblue':
				container = document.getElementById ('quickbar');
				// Fall through
			case 'standard':
			case 'nostalgia':
				if (!container) container = document.getElementById ('topbar');
				var lks = container.getElementsByTagName ('a');
				for (var i = 0; i < lks.length; i++) {
					if (   param ('title', lks[i].href) == conf.wgPageName
						&& param ('action', lks[i].href) == 'edit')
						return true;
				}
				return false;
			default:
				// all modern skins:
				return document.getElementById ('ca-edit') !== null;
		}
		return false;
	}
 
	function setup_upload () {
		onUpload = true;
		// Add an empty category bar at the end of the table containing the description, and change the onsubmit handler.
		var ip = document.getElementById ('mw-htmlform-description') || document.getElementById ('wpDestFile');
		if (!ip) {
			ip = document.getElementById ('wpDestFile');
			while (ip && ip.nodeName.toLowerCase() != 'table') ip = ip.parentNode;
		}
		if (!ip) return;
		var reupload = document.getElementById ('wpForReUpload');
		var destFile = document.getElementById ('wpDestFile');
		if (   (reupload && !!reupload.value)
			|| (destFile && (destFile.disabled || destFile.readOnly)))
			return; // re-upload form...
		// Insert a table row with two fields (label and empty category bar)
		var labelCell = make ('td');
		var lineCell  = make ('td');
		// Create the category line
		catLine = make ('div');
		catLine.className = 'catlinks';
		catLine.id = 'catlinks';
		catLine.style.textAlign = is_rtl ? 'right' : 'left';
		// We'll be inside a table row. Make sure that we don't have margins or strange borders.
		catLine.style.margin = '0';
		catLine.style.border = 'none';
		lineCell.appendChild (catLine);
		// Create the label
		var label = null;
		if (   typeof UFUI != 'undefined'
			&& typeof UIElements != 'undefined'
			&& typeof UFUI.getLabel == 'function'
		   )
		{
			try {
				label = UFUI.getLabel('wpCategoriesUploadLbl');
			} catch (ex) {
				label = null;
			}
		}
		if (!label) {
			labelCell.id = 'hotcatLabel';
			labelCell.appendChild (make (HotCat.categories, true));
		} else {
			labelCell.id = 'hotcatLabelTranslated';
			labelCell.appendChild (label);
		}
		labelCell.className           = 'mw-label';
		labelCell.style.textAlign     = 'right';
		labelCell.style.verticalAlign = 'middle';
		// Change the onsubmit handler
		var form = document.getElementById('upload') || document.getElementById('mw-upload-form');
		if (form) {
			var newRow = ip.insertRow (-1);
			newRow.appendChild (labelCell);
			newRow.appendChild (lineCell);
			form.onsubmit = (function (oldSubmit) {
				return function () {
					var do_submit = true;
					if (oldSubmit) {
						if (typeof oldSubmit == 'string')
							do_submit = eval (oldSubmit);
						else if (typeof oldSubmit == 'function')
							do_submit = oldSubmit.apply (form, arguments);
					}
					if (!do_submit) return false;
					closeForm ();
					// Copy the categories
					var eb = document.getElementById ('wpUploadDescription')
						|| document.getElementById ('wpDesc');
					var addedOne = false;
					for (var i = 0; i < editors.length; i++) {
						var t = editors[i].currentCategory;
						if (!t) continue ;
						var key = editors[i].currentKey;
						var new_cat = '[[' + HotCat.category_canonical + ':' + t + (key ? '|' + key : "") + ']]';
						// Only add if not already present
						var cleanedText = eb.value
								.replace(/<\!--(\s|\S)*?--\>/g, "")
								.replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, "");
						if (!find_category (cleanedText, t, true)) {
							eb.value += '\n' + new_cat;
							addedOne = true;
						}
					}
					if (addedOne) {
						// Remove "subst:unc" added by Flinfo if it didn't find categories
						eb.value = eb.value.replace(/\{\{subst:unc\}\}/g, "");
					}
					return true;
				};
			}) (form.onsubmit);
		}
	}
 
	var cleanedText = null;
 
	function isOnPage (span) {
		var catTitle = title (span.firstChild.getAttribute ('href', 2));
		if (!catTitle) return null;
		catTitle = catTitle.substr (catTitle.indexOf (':') + 1).replace (/_/g, ' ');
		if (HotCat.blacklist && HotCat.blacklist.test (catTitle)) return null;
		var result = { title : catTitle, match : ["", "", ""] };
		if (pageText === null) return result;
		if (cleanedText === null) {
			cleanedText = pageText
				.replace(/<\!--(\s|\S)*?--\>/g, "")
				.replace(/<nowiki\>(\s|\S)*?<\/nowiki>/g, "");
		}
		result.match = find_category (cleanedText, catTitle, true);
		return result;
	}
 
	var initialized = false;
	var setupTimeout = null;
 
	function findByClass (scope, tag, className) {
		// Compatibility routine. Uses jQuery if available, otherwise works with older getElementsByClassName
		var result;
		if (window.jQuery) {
			result = window.jQuery(scope).find(tag + '.' + className);
		} else {
			result = getElementsByClassName(scope, tag, className);
		}
		return (result && result.length) ? result[0] : null;
	}
 
	function setup (additionalWork) {
		if (initialized) return;
		initialized = true;
		if (setupTimeout) {
			window.clearTimeout (setupTimeout);
			setupTimeout = null;
		}
		// Find the category bar, or create an empty one if there isn't one. Then add -/+- links after
		// each category, and add the + link.
		catLine =  catLine                                        // Special:Upload
				|| document.getElementById ('mw-normal-catlinks') // MW >= 1.13alpha
				|| findByClass (document , 'p' , 'catlinks');     // MW < 1.13
		var hiddenCats = document.getElementById ('mw-hidden-catlinks');
		if (!catLine) {
			var footer = null;
			if (!hiddenCats) {
				footer = findByClass (document , 'div' , 'printfooter');
				if (!footer) return; // Don't know where to insert the category line
			}
			catLine = make ('div');
			catLine.id = 'mw-normal-catlinks';
			catLine.style.textAlign = is_rtl ? 'right' : 'left';
			// Add a label
			var label = make ('a');
			label.href  = conf.wgArticlePath.replace ('$1', 'Special:Categories');
			label.title = HotCat.categories;
			label.appendChild (make (HotCat.categories, true));
			catLine.appendChild (label);
			catLine.appendChild (make (':', true));
			// Insert the new category line
			var container = (hiddenCats ? hiddenCats.parentNode : document.getElementById ('catlinks'));
			if (!container) {
				container = make ('div');
				container.id = 'catlinks';
				footer.parentNode.insertBefore (container, footer.nextSibling);
			}
			container.className = 'catlinks noprint';
			container.style.display = "";
			if (!hiddenCats) {
				container.appendChild (catLine);
			} else {
				container.insertBefore (catLine, hiddenCats);
			}
		} // end if catLine exists
		if (is_rtl) catLine.dir = 'rtl';
 
		// Create editors for all existing categories
 
		function createEditors (line, is_hidden) {
			var i;
			var cats = line.getElementsByTagName ('li');
			if (cats.length > 0) {
				newDOM = true; line = cats[0].parentNode;
			} else {
				cats = line.getElementsByTagName ('span');
			}
			// Copy cats, otherwise it'll also magically contain our added spans as it is a live collection!
			var copyCats = new Array (cats.length);
			for (i = 0; i < cats.length; i++) copyCats[i] = cats[i];
			var editor = null;
			for (i = 0; i < copyCats.length; i++) {
				var test = isOnPage (copyCats[i]);
				if (test !== null && test.match !== null) {
					editor = new CategoryEditor (line, copyCats[i], test.title, test.match[2], is_hidden);
				}
			}
			return copyCats.length > 0 ? copyCats[copyCats.length-1] : null;
		}
 
		var lastSpan = createEditors (catLine, false);
		// Create one to add a new category
		var editor = new CategoryEditor(newDOM ? catLine.getElementsByTagName('ul')[0] : catLine, null, null, lastSpan !== null, false);
		if (!onUpload) {
			if (pageText !== null && hiddenCats) {
				if (is_rtl) hiddenCats.dir = 'rtl';
				createEditors (hiddenCats, true);
			}
			// And finally add the "multi-mode" span. (Do this at the end, otherwise it ends up in the list above.)
			var enableMulti = make ('span');
			enableMulti.className = 'noprint';
			if (is_rtl) enableMulti.dir = 'rtl';
			catLine.insertBefore (enableMulti, catLine.firstChild.nextSibling);
			enableMulti.appendChild (make ('\xa0', true)); // nbsp
			multiSpan = make ('span');
			enableMulti.appendChild (multiSpan);
			multiSpan.innerHTML = '(<a>' + HotCat.addmulti + '</a>)';
			var lk = multiSpan.getElementsByTagName ('a')[0];
			lk.onclick = function (evt) {setMultiInput (); checkMultiInput (); return evtKill (evt);};
			lk.title = HotCat.multi_tooltip;
			lk.style.cursor = 'pointer';
		}
		cleanedText = null;
		if (typeof additionalWork == 'function') additionalWork();
		setupCompleted.loaded(); // Trigger signal; execute registered functions
		if (window.jQuery) jQuery('body').trigger('hotcatSetupCompleted');
	}
 
	function setPage (json) {
		var startTime = null;
		if (json && json.query) {
			if (json.query.pages) {
				var page = json.query.pages[conf.wgArticleId === 0 ? "-1" : "" + conf.wgArticleId];
				if (page) {
					if (page.revisions && page.revisions.length > 0) {
						// Revisions are sorted by revision ID, hence [0] is the one we asked for, and possibly there's a [1] if we're
						// not on the latest revision (edit conflicts and such).
						pageText = page.revisions[0]['*'];
						if (page.revisions[0].timestamp) pageTime = page.revisions[0].timestamp.replace (/\D/g, "");
						if (page.revisions[0].revid) pageTextRevId = page.revisions[0].revid;
						if (page.revisions.length > 1) conflictingUser = page.revisions[1].user;
					}
					if (page.lastrevid) lastRevId = page.lastrevid;
					if (page.starttimestamp) startTime = page.starttimestamp.replace (/\D/g, "");
					pageWatched = typeof page.watched == 'string';
					editToken = page.edittoken;
					if (page.langlinks && (!json['query-continue'] || !json['query-continue'].langlinks)) {
						// We have interlanguage links, and we got them all.
						var re = "";
						for (var i = 0; i < page.langlinks.length; i++) {
							re += (i > 0 ? '|' : "") + page.langlinks[i].lang.replace(/([\\\^\$\.\?\*\+\(\)])/g, '\\$1');
						}
						if (re.length > 0) {
							interlanguageRE = new RegExp ('((^|\\n\\r?)(\\[\\[\\s*(' + re + ')\\s*:[^\\]]+\\]\\]\\s*))+$');
						}
					}
 
				}
			}
			// Siteinfo
			if (json.query.general) {
				HotCat.capitalizePageNames = (json.query.general['case'] == 'first-letter');
				if (json.query.general.time && !startTime) startTime = json.query.general.time.replace (/\D/g, "");
			}
			serverTime = startTime;
			// Userinfo
			if (json.query.userinfo && json.query.userinfo.options) {
				watchCreate = !HotCat.dont_add_to_watchlist && json.query.userinfo.options.watchcreations == '1';
				watchEdit   = !HotCat.dont_add_to_watchlist && json.query.userinfo.options.watchdefault == '1';
				minorEdits  = json.query.userinfo.options.minordefault == 1;
				// If the user has the "All edits are minor" preference enabled, we should honor that
				// for single category changes, no matter what the site configuration is.
				if (minorEdits) HotCat.single_minor = true;
			}
		}
	}
 
	function createCommitForm () {
		if (commitForm) return;
		var formContainer = make ('div');
		formContainer.style.display = 'none';
		document.body.appendChild (formContainer);
		formContainer.innerHTML =
			'<form id="hotcatCommitForm" method="post" enctype="multipart/form-data" action="'
			+ conf.wgScript + '?title=' + encodeURIComponent (conf.wgPageName)
			+ '&action=edit">'
			+ '<input type="hidden" name="wpTextbox1" />'
			+ '<input type="hidden" name="model" value="wikitext" />'
			+ '<input type="hidden" name="format" value="text/x-wiki" />'
			+ '<input type="hidden" name="wpSummary" value="" />'
			+ '<input type="checkbox" name="wpMinoredit" value="1" />'
			+ '<input type="checkbox" name="wpWatchthis" value="1" />'
			+ '<input type="hidden" name="wpAutoSummary" value="" />'
			+ '<input type="hidden" name="wpEdittime" />'
			+ '<input type="hidden" name="wpStarttime" />'
			+ '<input type="hidden" name="wpDiff" value="wpDiff" />'
			+ '<input type="hidden" name="oldid" value="0" />'
			+ '<input type="submit" name="hcCommit" value="hcCommit" />'
			+ '<input type="hidden" name="wpEditToken" />'
			+ '<input type="hidden" name="wpUltimateParam" value="1" />'
			+ '</form>';
		commitForm = document.getElementById ('hotcatCommitForm');
	}
 
	function getPage () {
		// We know we have an article here.
		if (conf.wgArticleId === 0) {
			// Doesn't exist yet.
			if (conf.wgNamespaceNumber === 2) {
				// Disable on non-existing User pages -- might be a global user page.
				return;
			}
			pageText = "";
			pageTime = null;
			setup (createCommitForm);
		} else {
			var url = conf.wgServer + conf.wgScriptPath + '/api.php?format=json&callback=HotCat.start&action=query&rawcontinue=&titles='
					+ encodeURIComponent (conf.wgPageName)
					+ '&prop=info%7Crevisions&rvprop=content%7Ctimestamp%7Cids&meta=siteinfo&rvlimit=1&rvstartid='
					+ conf.wgCurRevisionId;
			var s = make ('script');
			s.src = armorUri(url);
			s.type = 'text/javascript';
			HotCat.start = function (json) { setPage (json); setup (createCommitForm); };
			document.getElementsByTagName ('head')[0].appendChild (s);
			setupTimeout = window.setTimeout (function () {setup (createCommitForm);}, 4000); // 4 sec, just in case getting the wikitext takes longer.
		}
	}
 
	function run () {
		if (HotCat.started) return;
		HotCat.started = true;
		loadTrigger.register(really_run);
	}
 
	function really_run () {
		initialize ();
 
		if (is_rtl && is_ie6) return; // Disabled! IE6 with RTL is just too broken...
		if (!HotCat.upload_disabled && conf.wgNamespaceNumber === -1 && conf.wgCanonicalSpecialPageName == 'Upload' && conf.wgUserName) {
			setup_upload ();
			setup (function () {
				// Check for state restoration once the setup is done otherwise, but before signalling setup completion
				if (   typeof UploadForm != 'undefined'
					&& typeof UploadForm.previous_hotcat_state != 'undefined'
					&& UploadForm.previous_hotcat_state !== null)
				{
					UploadForm.previous_hotcat_state = setState (UploadForm.previous_hotcat_state);
				}
			});
		} else {
			if (!conf.wgIsArticle || conf.wgAction != 'view' || param('diff') !== null || param('oldid') !== null || !can_edit() || HotCat.disable()) return;
			getPage ();
		}
	}
 
	// Legacy stuff
 
	function closeForm () {
		// Close all open editors without redirect resolution and other asynchronous stuff.
		for (var i = 0; i < editors.length; i++) {
			if (editors[i].state == CategoryEditor.OPEN) {
				editors[i].cancel();
			} else if (editors[i].state == CategoryEditor.CHANGE_PENDING) {
				editors[i].sanitizeInput ();
				var value = editors[i].text.value.split('|');
				var key   = null;
				if (value.length > 1) key = value[1];
				var v = value[0].replace(/_/g, ' ').replace(/^\s+|\s+$/g, "");
				if (v.length === 0) {
					editors[i].cancel ();
				} else {
					editors[i].currentCategory = v;
					editors[i].currentKey = key;
					editors[i].currentExists = this.inputExists;
					editors[i].close ();
				}
			}
		}
	}
 
	function getState () {
		var result = null;
		for (var i = 0; i < editors.length; i++) {
			var text = editors[i].currentCategory;
			var key  = editors[i].currentKey;
			if (text && text.length > 0) {
				if (key !== null) text += '|' + key;
				if (result === null)
					result = text;
				else
					result = result + '\n' + text;
			}
		}
		return result;
	}
 
	function setState (state) {
		var cats = state.split ('\n');
		if (cats.length === 0) return null;
		if (initialized && editors.length == 1 && editors[0].isAddCategory) {
			// Insert new spans and create new editors for them.
			var newSpans = [];
			var before = editors.length == 1 ? editors[0].span : null;
			var i;
			for (i = 0; i < cats.length; i++) {
				if (cats[i].length === 0) continue;
				var cat = cats[i].split ('|');
				var key = cat.length > 1 ? cat[1] : null;
				cat = cat[0];
				var lk = make ('a'); lk.href = wikiPagePath (HotCat.category_canonical + ':' + cat);
				lk.appendChild (make (cat, true));
				lk.title = cat;
				var span = make ('span');
				span.appendChild (lk);
				if (i === 0) catLine.insertBefore (make (' ', true), before);
				catLine.insertBefore (span, before);
				if (before && i+1 < cats.length) parent.insertBefore (make (' | ', true), before);
				newSpans.push ({element: span, title: cat, 'key': key});
			}
			// And change the last one...
			if (before) {
				before.parentNode.insertBefore (make (' | ', true), before);
			}
			var editor = null;
			for (i = 0; i < newSpans.length; i++) {
				editor = new CategoryEditor (catLine, newSpans[i].element, newSpans[i].title, newSpans[i].key);
			}
		}
		return null;
	}
 
	// Export legacy functions
	window.hotcat_get_state  = function () { return getState(); };
	window.hotcat_set_state  = function (state) { return setState (state); };
	window.hotcat_close_form = function () { closeForm (); };
 
	if (window.mw) {
		// Make sure we don't get conflicts with AjaxCategories (core development that should one day
		// replace HotCat).
		mw.config.set('disableAJAXCategories', true);
	}
	// Run as soon as possible. This varies depending on MediaWiki version;
	// window's 'load' event is always safe, but usually we can do better than that.
 
	// Check for version to avoid MediaWiki bug 32537.
	var mwVersion = conf.wgVersion.split('.');
	if (mwVersion[0] >= 1 && parseFloat(mwVersion[1]) > 20) {
		var startHotCat = function(){
			jQuery(document).ready(run);
		};
		mw.loader.using('user', startHotCat, startHotCat);
		if (parseFloat(mwVersion[1]) > 21) {
			// Reload HotCat after page is saved (bug T103285)
			mw.hook('postEdit').add( function () { 
				catLine = null;
				editors = [];
				initialized = false;
				HotCat.started = false;
				run ();
			} );
		}
	} else {
		// mw.loader.using('user', ...) could have unintended side-effects on MW <= 1.20. Fall back to dom-ready.
		jQuery(document).ready(run);
	}
})();
//</pre></nowiki>