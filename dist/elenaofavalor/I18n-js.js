/* <nowiki>
 * Library for accessing i18n messages for use in Dev Wiki scripts.
 * Modified from [[w:c:dev:MediaWiki:I18n-js/code.js]].
 *
 * @author Cqm <http://dev.wikia.com/User:Cqm>
 * @version 0.3.1
 */
 
/*global mediaWiki */
 
/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
	forin:true, immed:true, indent:4, latedef:true, newcap:true,
	noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
	undef:true, unused:true, strict:true, trailing:true,
	browser:true, devel:false, jquery:true,
	onevar:true
*/
 
;(function (window, $, mw, undefined) {
	'use strict';
 
	window.dev = window.dev || {};
 
	// prevent double loading and loss of cache
	if (window.dev.i18n !== undefined) {
		return;
	}
 
		/*
		 * Cache of mw config variables.
		 */
	var conf = mw.config.get([
			'wgContentLanguage',
			'wgUserLanguage'
		]),
 
		/*
		 * Cache of loaded I18n instances.
		 */
		cache = {},
 
		/*
		 * Language fallbacks for those that don't fallback to English.
		 * Shouldn't need updating unless Wikia change theirs.
		 *
		 * To generate this, use `$ grep -R "fallback =" /path/to/messages/`,
		 * pipe the result to a text file and format the result.
		 */
		fallbacks = {
			'ab': 'ru',
			'ace': 'id',
			'aln': 'sq',
			'als': 'gsw',
			'an': 'es',
			'anp': 'hi',
			'arn': 'es',
			'arz': 'ar',
			'av': 'ru',
			'ay': 'es',
			'ba': 'ru',
			'bar': 'de',
			'bat-smg': 'sgs',
			'bcc': 'fa',
			'be-x-old': 'be-tarask',
			'bh': 'bho',
			'bjn': 'id',
			'bm': 'fr',
			'bpy': 'bn',
			'bqi': 'fa',
			'bug': 'id',
			'cbk-zam': 'es',
			'ce': 'ru',
			'ckb': 'ckb-arab',
			'crh': 'crh-latn',
			'crh-cyrl': 'ru',
			'csb': 'pl',
			'cv': 'ru',
			'de-at': 'de',
			'de-ch': 'de',
			'de-formal': 'de',
			'dsb': 'de',
			'dtp': 'ms',
			'eml': 'it',
			'ff': 'fr',
			'fiu-vro': 'vro',
			'frc': 'fr',
			'frp': 'fr',
			'frr': 'de',
			'fur': 'it',
			'gag': 'tr',
			'gan': 'gan-hant',
			'gan-hans': 'zh-hans',
			'gan-hant': 'zh-hant',
			'gl': 'pt',
			'glk': 'fa',
			'gn': 'es',
			'gsw': 'de',
			'hif': 'hif-latn',
			'hsb': 'de',
			'ht': 'fr',
			'ii': 'zh-cn',
			'inh': 'ru',
			'iu': 'ike-cans',
			'jut': 'da',
			'jv': 'id',
			'kaa': 'kk-latn',
			'kbd': 'kbd-cyrl',
			'kbd-cyrl': 'ru',
			'khw': 'ur',
			'kiu': 'tr',
			'kk': 'kk-cyrl',
			'kk-arab': 'kk-cyrl',
			'kk-cn': 'kk-arab',
			'kk-kz': 'kk-cyrl',
			'kk-latn': 'kk-cyrl',
			'kk-tr': 'kk-latn',
			'kl': 'da',
			'koi': 'ru',
			'ko-kp': 'ko',
			'krc': 'ru',
			'ks': 'ks-arab',
			'ksh': 'de',
			'ku': 'ku-latn',
			'ku-arab': 'ckb',
			'kv': 'ru',
			'lad': 'es',
			'lb': 'de',
			'lbe': 'ru',
			'lez': 'ru',
			'li': 'nl',
			'lij': 'it',
			'liv': 'et',
			'lmo': 'it',
			'ln': 'fr',
			'ltg': 'lv',
			'lzz': 'tr',
			'mai': 'hi',
			'map-bms': 'jv',
			'mg': 'fr',
			'mhr': 'ru',
			'min': 'id',
			'mo': 'ro',
			'mrj': 'ru',
			'mwl': 'pt',
			'myv': 'ru',
			'mzn': 'fa',
			'nah': 'es',
			'nap': 'it',
			'nds': 'de',
			'nds-nl': 'nl',
			'nl-informal': 'nl',
			'no': 'nb',
			'os': 'ru',
			'pcd': 'fr',
			'pdc': 'de',
			'pdt': 'de',
			'pfl': 'de',
			'pms': 'it',
			// 'pt': 'pt-br',
			'pt-br': 'pt',
			'qu': 'es',
			'qug': 'qu',
			'rgn': 'it',
			'rmy': 'ro',
			'rue': 'uk',
			'ruq': 'ruq-latn',
			'ruq-cyrl': 'mk',
			'ruq-latn': 'ro',
			'sa': 'hi',
			'sah': 'ru',
			'scn': 'it',
			'sg': 'fr',
			'sgs': 'lt',
			'shi': 'ar',
			'simple': 'en',
			'sli': 'de',
			'sr': 'sr-ec',
			'srn': 'nl',
			'stq': 'de',
			'su': 'id',
			'szl': 'pl',
			'tcy': 'kn',
			'tg': 'tg-cyrl',
			'tt': 'tt-cyrl',
			'tt-cyrl': 'ru',
			'ty': 'fr',
			'udm': 'ru',
			'ug': 'ug-arab',
			'uk': 'ru',
			'vec': 'it',
			'vep': 'et',
			'vls': 'nl',
			'vmf': 'de',
			'vot': 'fi',
			'vro': 'et',
			'wa': 'fr',
			'wo': 'fr',
			'wuu': 'zh-hans',
			'xal': 'ru',
			'xmf': 'ka',
			'yi': 'he',
			'za': 'zh-hans',
			'zea': 'nl',
			'zh': 'zh-hans',
			'zh-classical': 'lzh',
			'zh-cn': 'zh-hans',
			'zh-hant': 'zh-hans',
			'zh-hk': 'zh-hant',
			'zh-min-nan': 'nan',
			'zh-mo':  'zh-hk',
			'zh-my':  'zh-sg',
			'zh-sg':  'zh-hans',
			'zh-tw':  'zh-hant',
			'zh-yue': 'yue'
		};
 
	/*
	 * Get a translation of a message from the messages object in the
	 * requested language.
	 *
	 * @param messages the message object to look the message up in.
	 * @param name The name of the message to get.
	 * @param lang The language to get the message in.
	 *
	 * @return The requested translation or the name wrapped in < ... > if no
	 *     message could be found.
	 */
	function getMsg(messages, name, lang) {
		if (messages[lang] && messages[lang][name]) {
			return messages[lang][name];
		}
 
		if (lang === 'en') {
			return '<' + name + '>';
		}
 
		lang = fallbacks[lang] || 'en';
		return getMsg(messages, name, lang);
	}
 
	/*
	 * Substitute arguments into the string, where arguments are represented
	 * as $n where n > 0.
	 *
	 * @param message The message to substitute arguments into
	 * @param arguments The arguments to substitute in.
	 *
	 * @return The resulting message.
	 */
	function handleArgs(message, args) {
		args.forEach(function (elem, index) {
			var rgx = new RegExp('\\$' + (index + 1), 'g');
			message = message.replace(rgx, elem);
		});
 
		return message;
	}
 
	/*
	 * Generate a HTML link using the supplied parameters.
	 *
	 * @param href The href of the link which will be converted to
	 *     '/wiki/href'.
	 * @param text The text and title of the link. If this is not supplied, it
	 *     will default to href.
	 *
	 * @return The generated link.
	 */
	function makeLink(href, text) {
		text = text || href;
		href = href.indexOf('http') === 0 ? href : mw.util.wikiGetlink(href);
 
		text = mw.html.escape(text);
		href = mw.html.escape(href);
 
		return '<a href="' + href + '" title="' + text + '">' + text + '</a>';
	}
 
	/*
	 * Parse basic wikitext links into HTML.
	 *
	 * Will process:
	 * - [url text]
	 * - [[pagename]]
	 * - [[pagename|text]]
	 *
	 * @param message The message to process.
	 *
	 * @return The resulting string.
	 */
	function parse(message) {
			// [url some text here] -> [$1 $2]
		var urlRgx = /\[(https?:\/\/.+?) (.+?)\]/g,
			// [[pagename]] -> [[$1]]
			simplePageRgx = /\[\[([^|]*?)\]\]/g,
			// [[pagename|text]] -> [[$1|$2]]
			pageWithTextRgx = /\[\[(.+?)\|(.+?)\]\]/g;
 
		return message
			.replace(urlRgx, function (_match, href, text) {
				return makeLink(href, text);
			})
			.replace(simplePageRgx, function (_match, href) {
				return makeLink(href);
			})
			.replace(pageWithTextRgx, function (_match, href, text) {
				return makeLink(href, text);
			});
	}
 
	/*
	 * Create a new Message instance.
	 *
	 * @param message The name of the message.
	 * @param arguments Any arguments to substitute into the message.
	 */
	function message(messages, defaultLang, args) {
		if (!args.length) {
			return;
		}
 
		var msg = args.shift();
		msg = getMsg(messages, msg, defaultLang);
 
		if (args.length) {
			msg = handleArgs(msg, args);
		}
 
		return {
			/*
			 * Parse wikitext links in the message and return the result.
			 *
			 * @return The resulting string.
			 */
			parse: function () {
				return parse(msg);
			},
 
			/*
			 * Escape any HTML in the message and return the result.
			 *
			 * @return The resulting string.
			 */
			escape: function () {
				return mw.html.escape(msg);
			},
 
			/*
			 * Return the message as is.
			 *
			 * @return The resulting string.
			 */
			plain: function () {
				return msg;
			}
		};
	}
 
	/*
	 * Create a new i18n object.
	 *
	 * @param messages The message object to look translations up in.
	 */
	function i18n(messages) {
		var defaultLang = conf.wgUserLanguage;
 
		return {
			/*
			 * Set the default language.
			 *
			 * @param lang the language code to use by default.
			 */
			useLang: function (lang) {
				defaultLang = lang;
			},
 
			/*
			 * Set the default language to the content language.
			 */
			useContentLang: function () {
				defaultLang = conf.wgContentLanguage;
			},
 
			/*
			 * Set the default language to the user's language.
			 */
			useUserLang: function () {
				defaultLang = conf.wgUserLanguage;
			},
 
			/*
			 * Create a new instance of Message.
			 */
			msg: function () {
				var args = Array.prototype.slice.call(arguments);
				return message(messages, defaultLang, args);
			},
 
			/*
			 * For accessing the raw messages.
			 */
			_messages: messages
		};
	}
 
	/*
	 * Strip comments from a JSON string which are illegal under the JSON spec.
	 *
	 * @param json The JSON string.
	 *
	 * @return The JSON string after any comments have been removed.
	 */
	function stripComments(json) {
		return json
			// inline comments
			.replace(/\/\/.*?(\n|$)/g, '$1')
			// block comments
			// this is a bit basic, so will break on comments inside strings
			.replace(/\/\*[\s\S]*?\*\//g, '');
	}
 
	/*
	 * Load a messages stored in as JSON on a page.
	 * Modified to access in VSTF Wiki.
	 *
	 * @param name The name of the script the messages are for. This will be
	 *     used to get messages from
	 *     http://vstf.wikia.com/wiki/MediaWiki:Custom-name/i18n.json.
	 *
	 * @return A jQuery.Deferred instance.
	 */
	function loadMessages(name) {
		var deferred = $.Deferred(),
			params;
 
		if (cache[name]) {
			deferred.resolve(cache[name]);
		} else {
			params = {
				mode: 'articles',
				articles: 'MediaWiki:Custom-' + name + '/i18n.json',
				only: 'styles',
				debug: '1'
			};
 
			mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
				$.get(mw.util.wikiScript('load'), params).done(function (res) {
					var json = JSON.parse(stripComments(res)),
						obj = i18n(json);
 
					// cache the result in case it's used multiple times
					cache[name] = obj;
					deferred.resolve(obj);
				});
			});
		}
 
		return deferred;
	}
 
	// expose under the dev global
	window.dev.i18n = {
		loadMessages: loadMessages,
 
		// 'hidden' functions to allow testing
		_stripComments: stripComments,
		_getMsg: getMsg,
		_handleArgs: handleArgs,
		_parse: parse,
		_fallbacks: fallbacks
	};
 
	// fire an event on load
	mw.hook('dev.i18n').fire(window.dev.i18n);
	// alternatively, use $.getScript (or mw.loader)
	// and use the returned promise
 
}(this, jQuery, mediaWiki));