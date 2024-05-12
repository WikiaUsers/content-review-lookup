/**!
 *  _________________________________________________________________________________
 * |                                                                                 |
 * |                      === WARNING: GLOBAL GADGET FILE ===                        |
 * |                    Changes to this page affect many users.                      |
 * |  Please discuss changes on the talk page, [[wikipedia:zh:WP:VPT]] or GitHub before editing.  |
 * |_________________________________________________________________________________|
 *
 * Built from source code at HanAssist GitHub repository [https://github.com/diskdance/HanAssist].
 * All changes should be made in the repository, otherwise they will be lost.
 *
 * To update this script from GitHub, you must have a local repository set up. Then
 * follow the instructions at [https://github.com/diskdance/HanAssist/blob/main/CONTRIBUTING.MD].
 *
 * For license information, see [https://github.com/diskdance/HanAssist/blob/main/LICENSE].
 */
// <nowiki>

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.mw = global.mw || {}, global.mw.libs = global.mw.libs || {}, global.mw.libs.HanAssist = {})));
})(this, (function (exports) { 'use strict';

	/**
	 * Safely convert an object to string.
	 * @param val value to convert
	 * @return string
	 */
	function safelyToString(val) {
		try {
			if (typeof val === 'undefined' || val === null) {
				return '';
			}
			return String(val);
		}
		catch (_a) {
			return Object.prototype.toString.call(val);
		}
	}
	function isPlainObject(val) {
		return $.isPlainObject(val);
	}

	var FALLBACK_LIST = {
		zh: ['zh', 'hans', 'hant', 'cn', 'tw', 'hk', 'sg', 'mo', 'my', 'other'],
		'zh-hans': ['hans', 'cn', 'sg', 'my', 'zh', 'hant', 'tw', 'hk', 'mo', 'other'],
		'zh-hant': ['hant', 'tw', 'hk', 'mo', 'zh', 'hans', 'cn', 'sg', 'my', 'other'],
		'zh-cn': ['cn', 'hans', 'sg', 'my', 'zh', 'hant', 'tw', 'hk', 'mo', 'other'],
		'zh-sg': ['sg', 'hans', 'cn', 'my', 'zh', 'hant', 'tw', 'hk', 'mo', 'other'],
		'zh-my': ['my', 'hans', 'cn', 'sg', 'zh', 'hant', 'tw', 'hk', 'mo', 'other'],
		'zh-tw': ['tw', 'hant', 'hk', 'mo', 'zh', 'hans', 'cn', 'sg', 'my', 'other'],
		'zh-hk': ['hk', 'hant', 'mo', 'tw', 'zh', 'hans', 'cn', 'sg', 'my', 'other'],
		'zh-mo': ['mo', 'hant', 'hk', 'tw', 'zh', 'hans', 'cn', 'sg', 'my', 'other'],
	};
	var DEFAULT_FALLBACK = ['other', 'zh', 'hans', 'hant', 'cn', 'tw', 'hk', 'sg', 'mo', 'my'];
	function elect(candidates, locale) {
		var _a;
		var fallback = (_a = FALLBACK_LIST[locale]) !== null && _a !== void 0 ? _a : DEFAULT_FALLBACK;
		// Try every locale sequently
		for (var _i = 0, fallback_1 = fallback; _i < fallback_1.length; _i++) {
			var key = fallback_1[_i];
			var value = candidates[key];
			// Return if the value is neither null nor undefined
			if (value != null) {
				return value;
			}
		}
		return null;
	}
	/**
	 * A wrapper around `elect()` to ensure no non-string results are returned.
	 */
	function safeElect(candidates, locale) {
		// Guards to ensure types at runtime
		if (!isPlainObject(candidates)) {
			throw new TypeError('[HanAssist] Invalid parameter. Must be an object.');
		}
		if (typeof locale !== 'string') {
			mw.log.warn('[HanAssist] locale parameter must be a string. Please check your code.');
			locale = safelyToString(locale);
		}
		var result = elect(candidates, locale);
		if (typeof result !== 'string') {
			mw.log.warn('[HanAssist] Non-string conversion result detected. Please check your code.');
		}
		if (result === null) {
			return '';
		}
		// Wrap in another guard to ensure result is really string at runtime
		return safelyToString(result);
	}
	/**
	 * Select between candidates based on user language.
	 * @param candidates an object of candidates
	 * @param locale locale, defaults to `wgUserLanguage`
	 * @returns selected value
	 */
	function conv(candidates, locale) {
		if (locale === void 0) { locale = mw.config.get('wgUserLanguage'); }
		return safeElect(candidates, locale);
	}
	/**
	 * Select between candidates based on user variant.
	 * @param candidates an object of candidates
	 * @returns selected value
	 */
	function convByVar(candidates) {
		var _a;
		return safeElect(candidates, (_a = mw.config.get('wgUserVariant')) !== null && _a !== void 0 ? _a : mw.user.options.get('variant'));
	}
	/**
	 * Perform selection for each item in a candidates dictionary.
	 * @param candidatesDict the dictionary of candidates
	 * @param locale locale, defaults to `wgUserLanguage`
	 * @returns converted candidates dictionary
	 */
	function batchConv(candidatesDict, locale) {
		if (locale === void 0) { locale = mw.config.get('wgUserLanguage'); }
		if (!isPlainObject(candidatesDict)) {
			throw new TypeError('[HanAssist] Invalid parameter. Must be an object.');
		}
		var result = {};
		for (var key in candidatesDict) {
			var candidates = candidatesDict[key];
			var electionResult = isPlainObject(candidates)
				? safeElect(candidates, locale)
				: safelyToString(candidates);
			result[key] = electionResult;
		}
		return result;
	}

	{
		Promise.resolve().then(function () { return shims; });
	}

	function uxsShim(locale, hans, hant, cn, tw, hk, sg, zh, mo, my) {
		try {
			return elect({
				hans: hans,
				hant: hant,
				cn: cn,
				tw: tw,
				hk: hk,
				sg: sg,
				zh: zh,
				mo: mo,
				my: my,
			}, locale);
		}
		catch (_a) {
			return undefined;
		}
	}
	function generateUxsShim(configName) {
		return function (hans, hant, cn, tw, hk, sg, zh, mo, my) { return uxsShim(mw.config.get(configName), hans, hant, cn, tw, hk, sg, zh, mo, my); };
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function deprecate(root, name, func, replacement) {
		mw.log.deprecate(root, name, func, "Use ".concat(replacement, " instead."));
	}
	// Compatibility: redirect wgULS, wgUVS and wgUXS calls to HanAssist implementation
	deprecate(self, 'wgULS', generateUxsShim('wgUserLanguage'), 'HanAssist.conv');
	deprecate(self, 'wgUVS', generateUxsShim('wgUserVariant'), 'HanAssist.convByVar');
	deprecate(self, 'wgUXS', uxsShim, 'HanAssist.conv');
	// Compatibility: redirect HanAssist <= v3 calls to v4
	var globalMountPoint = (mw.libs.HanAssist = mw.libs.HanAssist || {});
	deprecate(globalMountPoint, 'localize', conv, 'conv');
	deprecate(globalMountPoint, 'vary', convByVar, 'convByVar');
	deprecate(globalMountPoint, 'parse', batchConv, 'batchConv');

	var shims = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	exports.batchConv = batchConv;
	exports.conv = conv;
	exports.convByVar = convByVar;

}));
// </nowiki>