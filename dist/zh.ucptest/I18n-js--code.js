/* <nowiki>
 * Library for accessing i18n messages for use in Dev Wiki scripts.
 * See [[I18n-js]] for documentation.
 *
 * @author Cqm <https://dev.fandom.com/User:Cqm>
 * @author OneTwoThreeFall <https://dev.fandom.com/User:OneTwoThreeFall>
 *
 * @version 0.6.7
 * @branch zh.ucptest-1-beta
 *
 * @notes Also used by SOAP Wiki for their reporting forms (with a non-dev i18n.json page)
 * @notes This is apparently a commonly used library for a number of scripts and also
 *   includes a check to prevent double loading. This can make it painful to test from your
 *   JS console. To get around this, add ?usesitejs=0&useuserjs=0 to your URL.
 */

/*global mediaWiki */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    browser:true, devel:false, jquery:true,
    onevar:true
*/

(function (window, $, mw, undefined) {
    'use strict';

    window.dev = window.dev || {};
    window.dev.i18n = window.dev.i18n || {};

    // Prevent double loading and loss of cache
    if (window.dev.i18n.loadMessages !== undefined) {
        return;
    }

    /*
     * Cache of mw config variables.
     *
     * @var {object} conf Cache of mw config variables:
     * - {boolean} debug
     * - {string} wgContentLanguage Site language
     *     Be careful to use this:
     *     - In languages with variants, this will block the language conversion;
     *       see <https://www.mediawiki.org/wiki/Writing_systems>.
     *     - In multilingual wikis like "Feed The Beast", this will block both the
     *       multilingual content providing and language conversion.
     * - {string} wgPageContentLanguage Page Language or Content Modal Language
     *     or Site Language or 'en'
     *     Be careful to use this:
     *     - In Special: pages, this will be the user language.
     *       This behavior will be kept.
     *     - In Module: pages, this will be the content modal language 'en'.
     *       This behavior will be overridden below.
     * - {string} wgPageContentModel Page content modal. This is used to detect
     *     non-wikitext pages/namespaces
     * - {string} wgUserLanguage
     * - {(string|null)} wgUserVariant The language variant user currently using,
     *     'null' when the page lannguage doesn't have language variants.
     */
    var conf = mw.config.get([
        'debug',
        'wgContentLanguage',
        'wgPageContentLanguage',
        'wgPageContentModel',
        'wgUserLanguage',
        'wgUserVariant'
   ]),

        /*
         * @var {number} Current time in milliseconds, used to set and check cache age.
         */
        now = Date.now(),

        /*
         * @var {number} Length of one day in milliseconds, used in cache age calculations.
         */
        oneDay = 1000 * 60 * 60 * 24,

        /*
         * @var {string} Prefix used for localStorage keys that contain i18n-js cache data.
         */
        cachePrefix = 'i18n-cache-',

        /*
         * @var {boolean} Whether a fallback loop warning been shown
         */
        warnedAboutFallbackLoop = false,

        /*
         * @var {object} Cache of loaded I18n instances.
         */
        cache = {},

        /*
         * Initial overrides object, initialised below with the i18n global variable.
         * Allows end-users to override specific messages.
         * See documentation for how to use.
         *
         * @var {(null|object)} overrides
         */
        overrides = null,

        /*
         * Mapping of deprecated language codes that were used in previous
         * versions of MediaWiki to up-to-date, current language codes.
         *
         * These codes shouldn't be used to store translations unless there are
         * language changes to /includes/language/LanguageCode.php in mediawiki/core.
         *
         * These may or may not be valid BCP 47 codes; they are included here
         * because MediaWiki renamed these particular codes at some point.
         *
         * Note that 'als' is actually a valid ISO 639 code (Tosk Albanian), but it
         * was previously used in MediaWiki for Alsatian, which comes under 'gsw'.
         *
         * @var {object.<string, string>} Mapping from deprecated MediaWiki-internal
         *   language code to replacement MediaWiki-internal language code.
         *
         * @see /includes/language/LanguageCode.php in MediaWiki core
         * @see https://meta.wikimedia.org/wiki/Special_language_codes
         */
        deprecatedCodes = {
            'als': 'gsw', // T25215
            'bat-smg': 'sgs', // T27522
            'be-x-old': 'be-tarask', // T11823
            'fiu-vro': 'vro', // T31186
            'roa-rup': 'rup', // T17988
            'zh-classical': 'lzh', // T30443
            'zh-min-nan': 'nan', // T30442
            'zh-yue': 'yue' // T30441
        },


        /**
         * Mapping of non-standard language codes used in MediaWiki to
         * standardized BCP 47 codes.
         *
         * @var {object.<string, string>} Mapping from nonstandard
         *   MediaWiki-internal codes to BCP 47 codes
         *
         * @see /includes/language/LanguageCode.php in MediaWiki core
         * @see https://meta.wikimedia.org/wiki/Special_language_codes
         * @see https://phabricator.wikimedia.org/T125073
         */
        nonStandardCodes = {
            'cbk-zam': 'cbk', // T124657
            'de-formal': 'de-x-formal',
            'eml': 'egl', // T36217
            'en-rtl': 'en-x-rtl',
            'es-formal': 'es-x-formal',
            'hu-formal': 'hu-x-formal',
            'kk-cn': 'kk-Arab-CN',
            'kk-kz': 'kk-Cyrl-KZ',
            'kk-tr': 'kk-Latn-TR',
            'map-bms': 'jv-x-bms', // [[wikipedia:en:Banyumasan_dialect]] T125073
            'mo': 'ro-Cyrl-MD', // T125073
            'nrm': 'nrf', // [[wikipedia:en:Norman_language]] T25216
            'nl-informal': 'nl-x-informal',
            'roa-tara': 'nap-x-tara', // [[wikipedia:en:Tarantino_dialect]]
            'simple': 'en-x-simple',
            'sr-ec': 'sr-Cyrl', // T117845
            'sr-el': 'sr-Latn', // T117845
            'zh-cn': 'zh-Hans-CN',
            'zh-sg': 'zh-Hans-SG',
            'zh-my': 'zh-Hans-MY',
            'zh-tw': 'zh-Hant-TW',
            'zh-hk': 'zh-Hant-HK',
            'zh-mo': 'zh-Hant-MO'
        },

        /*
         * Language fallbacks for those that don't only fallback to 'en' or have no
         * fallbacks ('en').
         *
         * Shouldn't need updating unless there're language fallback chain changes
         * to /languages/messages files in mediawiki/core.
         *
         * To generate this, use `$ grep -R "fallback =" /path/to/messages/`,
         * pipe the result to a text file and format the result.
         *
         * Please note that there's bidirectional/multidirectional fallback in languages,
         * including 'cdo' <=> 'nan', 'pt' <=> 'pt-br', 'zh' <=> 'zh-hans' <=> 'zh-hant'
         *
         * @var {object.<string, string[]>} Mapping from language codes to fallback
         * language codes
         */
        fallbacks = {
            'ab': ['ru'],
            'abs': ['id'],
            'ace': ['id'],
            'ady': ['ady-cyrl'],
            'aeb': ['aeb-arab'],
            'aeb-arab': ['ar'],
            'aln': ['sq'],
            'alt': ['ru'],
            'ami': ['zh-tw', 'zh-hant', 'zh', 'zh-hans'],
            'an': ['es'],
            'anp': ['hi'],
            'arn': ['es'],
            'arq': ['ar'],
            'ary': ['ar'],
            'arz': ['ar'],
            'ast': ['es'],
            'atj': ['fr'],
            'av': ['ru'],
            'avk': ['fr', 'es', 'ru'],
            'awa': ['hi'],
            'ay': ['es'],
            'azb': ['fa'],
            'ba': ['ru'],
            'ban': ['id'],
            'ban-bali': ['ban'],
            'bar': ['de'],
            'bbc': ['bbc-latn'],
            'bbc-latn': ['id'],
            'bcc': ['fa'],
            'bci': ['fr'],
            'be-tarask': ['be'],
            'bgn': ['fa'],
            'bh': ['bho'],
            'bi': ['en'],
            'bjn': ['id'],
            'blk': ['my'],
            'bm': ['fr'],
            'bpy': ['bn'],
            'bqi': ['fa'],
            'br': ['fr'],
            'btm': ['id'],
            'bug': ['id'],
            'bxr': ['ru'],
            'ca': ['oc'],
            'cbk-zam': ['es'],
            'cdo': ['nan', 'zh-hant', 'zh', 'zh-hans'],
            'ce': ['ru'],
            'co': ['it'],
            'crh': ['crh-latn'],
            'crh-cyrl': ['ru'],
            'cs': ['sk'],
            'csb': ['pl'],
            'cv': ['ru'],
            'de-at': ['de'],
            'de-ch': ['de'],
            'de-formal': ['de'],
            'dsb': ['hsb', 'de'],
            'dtp': ['ms'],
            'dty': ['ne'],
            'egl': ['it'],
            'eml': ['it'],
            'es-formal': ['es'],
            'ext': ['es'],
            'ff': ['fr'],
            'fit': ['fi'],
            'fon': ['fr'],
            'frc': ['fr'],
            'frp': ['fr'],
            'frr': ['de'],
            'fur': ['it'],
            'gag': ['tr'],
            'gan': ['gan-hant', 'gan-hans', 'zh-hant', 'zh', 'zh-hans'],
            'gan-hans': ['gan', 'gan-hant', 'zh-hans', 'zh', 'zh-hant'],
            'gan-hant': ['gan', 'gan-hans', 'zh-hant', 'zh', 'zh-hans'],
            'gcr': ['fr'],
            'gl': ['pt'],
            'gld': ['ru'],
            'glk': ['fa'],
            'gn': ['es'],
            'gom': ['gom-deva'],
            'gom-deva': ['hi'],
            'gor': ['id'],
            'gsw': ['de'],
            'guc': ['es'],
            'hak': ['zh-hant', 'zh', 'zh-hans'],
            'hif': ['hif-latn'],
            'hrx': ['de'],
            'hsb': ['dsb', 'de'],
            'hsn': ['zh-cn', 'zh-hans', 'zh', 'zh-hant'],
            'ht': ['fr'],
            'hu-formal': ['hu'],
            'hyw': ['hy'],
            'ii': ['zh-cn', 'zh-hans', 'zh', 'zh-hant'],
            'inh': ['ru'],
            'io': ['eo'],
            'iu': ['ike-cans'],
            'jam': ['en'],
            'jut': ['da'],
            'jv': ['id'],
            'kaa': ['kk-latn', 'kk-cyrl'],
            'kab': ['fr'],
            'kbd': ['kbd-cyrl'],
            'kbp': ['fr'],
            'kea': ['pt'],
            'khw': ['ur'],
            'kiu': ['tr'],
            'kjp': ['my'],
            'kk': ['kk-cyrl'],
            'kk-arab': ['kk-cyrl'],
            'kk-cn': ['kk-arab', 'kk-cyrl'],
            'kk-kz': ['kk-cyrl'],
            'kk-latn': ['kk-cyrl'],
            'kk-tr': ['kk-latn', 'kk-cyrl'],
            'kl': ['da'],
            'koi': ['ru'],
            'ko-kp': ['ko'],
            'krc': ['ru'],
            'krl': ['fi'],
            'ks': ['ks-arab'],
            'ksh': ['de'],
            'ksw': ['my'],
            'ku': ['ku-latn'],
            'kum': ['ru'],
            'ku-arab': ['ckb'],
            'kv': ['ru'],
            'lad': ['es'],
            'lb': ['de'],
            'lbe': ['ru'],
            'lez': ['ru', 'az'],
            'li': ['nl'],
            'lij': ['it'],
            'liv': ['et'],
            'lki': ['fa'],
            'lld': ['it', 'rm', 'fur'],
            'lmo': ['pms', 'eml', 'lij', 'vec', 'it'],
            'ln': ['fr'],
            'lrc': ['fa'],
            'ltg': ['lv'],
            'luz': ['fa'],
            'lzh': ['zh-hant', 'zh', 'zh-hans'],
            'lzz': ['tr'],
            'mad': ['id'],
            'mai': ['hi'],
            'map-bms': ['jv', 'id'],
            'mdf': ['myv', 'ru'],
            'mg': ['fr'],
            'mhr': ['mrj', 'ru'],
            'min': ['id'],
            'mnw': ['my'],
            'mo': ['ro'],
            'mrj': ['mhr', 'ru'],
            'ms-arab': ['ms'],
            'mwl': ['pt'],
            'myv': ['mdf', 'ru'],
            'mzn': ['fa'],
            'nah': ['es'],
            'nan': ['cdo', 'zh-hant', 'zh', 'zh-hans'],
            'nap': ['it'],
            'nb': ['nn'],
            'nds': ['de'],
            'nds-nl': ['nl'],
            'nia': ['id'],
            'nl-informal': ['nl'],
            'nn': ['nb'],
            'nrm': ['nrf', 'fr'],
            'oc': ['ca', 'fr'],
            'olo': ['fi'],
            'os': ['ru'],
            'pcd': ['fr'],
            'pdc': ['de'],
            'pdt': ['de'],
            'pfl': ['de'],
            'pih': ['en'],
            'pms': ['it'],
            'pnt': ['el'],
            'pt': ['pt-br'],
            'pt-br': ['pt'],
            'pwn': ['zh-tw', 'zh-hant', 'zh', 'zh-hans'],
            'qu': ['qug', 'es'],
            'qug': ['qu', 'es'],
            'rgn': ['it'],
            'rmy': ['ro'],
            'roa-tara': ['it'],
            'rsk': ['sr-ec'],
            'rue': ['uk', 'ru'],
            'rup': ['ro'],
            'ruq': ['ruq-latn', 'ro'],
            'ruq-cyrl': ['mk'],
            'ruq-latn': ['ro'],
            'sa': ['hi'],
            'sah': ['ru'],
            'scn': ['it'],
            'sco': ['en'],
            'sdc': ['it'],
            'sdh': ['cbk', 'fa'],
            'se': ['nb', 'fi'],
            'ses': ['fr'],
            'se-fi': ['se', 'fi', 'sv'],
            'se-no': ['se', 'nb', 'nn'],
            'se-se': ['se', 'sv'],
            'sg': ['fr'],
            'sgs': ['lt'],
            'sh': ['bs', 'sr-el', 'hr'],
            'shi': ['fr'],
            'shy': ['shy-latn'],
            'shy-latn': ['fr'],
            'sjd': ['ru'],
            'sk': ['cs'],
            'skr': ['skr-arab'],
            'skr-arab': ['ur', 'pnb'],
            'sli': ['de'],
            'smn': ['fi'],
            'sr': ['sr-ec'],
            'srn': ['nl'],
            'stq': ['de'],
            'sty': ['ru'],
            'su': ['id'],
            'szl': ['pl'],
            'szy': ['zh-tw', 'zh-hant', 'zh', 'zh-hans'],
            'tay': ['zh-tw', 'zh-hant', 'zh', 'zh-hans'],
            'tcy': ['kn'],
            'tet': ['pt'],
            'tg': ['tg-cyrl'],
            'trv': ['zh-tw', 'zh-hant', 'zh', 'zh-hans'],
            'tt': ['tt-cyrl', 'ru'],
            'tt-cyrl': ['ru'],
            'ty': ['fr'],
            'tyv': ['ru'],
            'udm': ['ru'],
            'ug': ['ug-arab'],
            'vec': ['it'],
            'vep': ['et'],
            'vls': ['nl'],
            'vmf': ['de'],
            'vmw': ['pt'],
            'vot': ['fi'],
            'vro': ['et'],
            'wa': ['fr'],
            'wls': ['fr'],
            'wo': ['fr'],
            'wuu': ['zh-hans', 'zh', 'zh-hant'],
            'xal': ['ru'],
            'xmf': ['ka'],
            'yi': ['he'],
            'yue': ['zh-hk', 'zh-hant', 'zh', 'zh-hans'],
            'za': ['zh-hans', 'zh', 'zh-hant'],
            'zea': ['nl'],
            'zgh': ['kab'],
            'zh': ['zh-hans', 'zh-hant', 'zh-cn', 'zh-tw', 'zh-hk'],
            'zh-cn': ['zh-hans', 'zh', 'zh-hant'],
            'zh-hans': ['zh-cn', 'zh', 'zh-hant'],
            'zh-hant': ['zh-tw', 'zh-hk', 'zh', 'zh-hans'],
            'zh-hk': ['zh-hant', 'zh-tw', 'zh', 'zh-hans'],
            'zh-mo': ['zh-hk', 'zh-hant', 'zh-tw', 'zh', 'zh-hans'],
            'zh-my': ['zh-sg', 'zh-hans', 'zh-cn', 'zh', 'zh-hant'],
            'zh-sg': ['zh-hans', 'zh-cn', 'zh', 'zh-hant'],
            'zh-tw': ['zh-hant', 'zh-hk', 'zh', 'zh-hans']
        };

    /*
     * Override the if wgPageContentModel is not wikitext.
     * This is to fix the behavior in non-wikitext pages like Scribunto Lua
     * module pages
     *
     * - {string} conf.wgPageContentModel The content modal of the current page.
     * - {string} conf.wgPageContentLanguage The page language.
     * - {string} conf.wgContentLanguage The site language.
     */
    if ( conf.wgPageContentModel && conf.wgPageContentModel !== 'wikitext' ) {
    	conf.wgPageContentLanguage = conf.wgContentLanguage;
    }

    /*
     * Get the normalised IETF/BCP 47 language tag.
     * 
     * mediawiki.language.bcp47 doesn't handle deprecated language codes, and
     * some non-standard language codes are missed from LanguageCode.php, so
     * this function is added to override the behavior.
     *
     * @param {string} lang The language code to convert.
     * @return {string} The language code complying with BCP 47 standards.
     *
     * @see https://gerrit.wikimedia.org/r/c/mediawiki/core/+/376506/
     * @see /resources/src/mediawiki.language/mediawiki.language.js in MediaWiki core
     * @see /includes/language/LanguageCode.php in MediaWiki core
     */
    function bcp47(lang) {
        if (nonStandardCodes[lang]) {
            return nonStandardCodes[lang];
        }

        if (deprecatedCodes[lang]) {
            return bcp47(deprecatedCodes[lang]);
        }

        /*
         * @var {string[]} formatted
         * @var {boolean} isFirstSegment Whether is the first segment
         * @var {boolean} isPrivate Whether the code of the segment is private use
         * @var {string[]} segments The segments of language code
         */
        var formatted,
            isFirstSegment = true,
            isPrivate = false,
            segments = lang.split('-');

        formatted = segments.map(function (segment) {
            /*
             * @var {string} newSegment The converted segment of language code
             */
            var newSegment;

            // when previous segment is x, it is a private segment and should be lc
            if (isPrivate) {
                newSegment = segment.toLowerCase();
            // ISO 3166 country code
            } else if (segment.length === 2 && !isFirstSegment) {
                newSegment = segment.toUpperCase();
            // ISO 15924 script code
            } else if (segment.length === 4 && !isFirstSegment) {
                newSegment = segment.charAt(0).toUpperCase() + segment.substring(1).toLowerCase();
            // Use lowercase for other cases
            } else {
                newSegment = segment.toLowerCase();
            }

            isPrivate = segment.toLowerCase() === 'x';
            isFirstSegment = false;

            return newSegment;
        });

        return formatted.join('-');
    }

    /*
     * Log a warning message to the browser console if the language fallback chain is
     * about to start a loop. Only logs once to prevent flooding the browser console.
     *
     * @param {string} lang Language in use when loop was found.
     * @param {string[]} fallbackChain Array of languages involved in the loop.
     */
    function warnOnFallbackLoop(lang, fallbackChain) {
        if (warnedAboutFallbackLoop) {
            return;
        }
        warnedAboutFallbackLoop = true;

        fallbackChain.push(lang);
        console.error('[I18n-js] Duplicated fallback language found. Please leave a message at <https://dev.fandom.com/wiki/Talk:I18n-js> and include the following line: \nLanguage fallback chain:', fallbackChain.join(', '));
    }

    /*
     * Get a translation of a message from the messages object in the requested
     * language.
     *
     * - Missing `messages`, `msgName`, `lang` parameters: `return false;` .
     * - Didn't find message in the current language: Try the fallback list.
     * - Didn't find a fallback list for current language: Try to find `en` message.
     * - Didn't find message in the current fallback language: Try to find message
     *     in the next fallback language.
     * - Found duplicated language code in the fallback list:
     *     `warnOnFallbackLoop(lang, fallbackChain)`.
     * - Didn't find more language code in the fallback list: Try to find `en` message.
     * - Didn't find message in `en`: `return false;`.
     *
     * @param {object} messages The message object to look translations up in.
     * @param {string} msgName The name of the message to get.
     * @param {string} lang The language to get the message in.
     * @param {string[]} fallbackChain Array of languages that have already been checked.
     *     Used to detect if the fallback chain is looping.
     * @return {(string|boolean)} The requested translation or `false` if no message could be found.
     */
    function getMsg(messages, msgName, lang, fallbackChain) {
    	if (!lang || !messages || !msgName) {
    		return false;
    	}

        if (deprecatedCodes[lang]) {
            return getMsg(messages, msgName, deprecatedCodes[lang], fallbackChain);
        }

        if (messages[lang] && messages[lang][msgName]) {
            return messages[lang][msgName];
        }

        if (!fallbackChain) {
            fallbackChain = [];
        }

        /*
         * Try to find fallback messages by using the fallback chain.
         * We need to check whether the lang is defined in the fallback list before
         * trying to go through them.
         *
         * @var {number} i The current index in fallbacks[lang]
         */
        for (var i = 0; (fallbacks[lang] && i < fallbacks[lang].length); i += 1) {
            /*
             * @var {string} fallbackLang
             */
            var fallbackLang = fallbacks[lang][i];
            if (messages[fallbackLang] && messages[fallbackLang][msgName]) {
                return messages[fallbackLang][msgName];
            }

            if (fallbackChain.indexOf(fallbackLang) !== -1) {
                /*
                 * Duplicated language code in fallback list.
                 * Try to find next fallback language from list.
                 */
                warnOnFallbackLoop(fallbackLang, fallbackChain);
                continue;
            }
            fallbackChain.push(fallbackLang);
        }

        // "No language" or "no more languages" in fallback list - switch to 'en'
        if (messages.en && messages.en[msgName]) {
            return messages.en[msgName];
        }

        return false;
    }

    /*
     * Substitute arguments into the string, where arguments are represented
     * as $n where n > 0.
     *
     * @param {string} message The message to substitute arguments into
     * @param {array} arguments The arguments to substitute in.
     * @return {string} The resulting message.
     */
    function handleArgs(message, args) {
        args.forEach(function (elem, index) {
            /*
             * @var {RegExp} rgx
             */
            var rgx = new RegExp('\\$' + (index + 1), 'g');
            message = message.replace(rgx, elem);
        });

        return message;
    }

    /*
     * Generate a HTML link using the supplied parameters.
     *
     * @param {string} href The href of the link which will be converted to
     *     '/wiki/href'.
     * @param {string} text The text and title of the link. If this is not supplied, it
     *     will default to href.
     * @param {boolean} hasProtocol True if the href parameter already includes the
     *     protocol (i.e. it begins with 'http://', 'https://', or '//').
     * @return {string} The generated link.
     */
    function makeLink(href, text, hasProtocol) {
        text = text || href;
        href = hasProtocol ? href : mw.util.getUrl(href);

        text = mw.html.escape(text);
        href = mw.html.escape(href);

        return '<a href="' + href + '" title="' + text + '">' + text + '</a>';
    }

    /*
     * Allow basic inline HTML tags in wikitext.does not support <a> as that's handled by the
     * wikitext links instead.
     *
     * Supports the following tags:
     * - <i>
     * - <b>
     * - <s>
     * - <br>
     * - <em>
     * - <strong>
     * - <span>
     *
     * Supports the following tag attributes:
     * - title
     * - style
     * - class
     *
     * @param html
     * @return The sanitised HTML code.
     */
    function sanitiseHtml(html) {
        /*
         * @var context
         */
        var context = document.implementation.createHTMLDocument(''),
            $html = $.parseHTML(html, /* document */ context, /* keepscripts */ false),
            $div = $('<div>', context).append($html),
            allowedAttrs = [
                'title',
                'style',
                'class'
            ],
            allowedTags = [
                'i',
                'b',
                's',
                'br',
                'em',
                'strong',
                'span',
            ];

        $div.find('*').each(function () {
            var $this = $(this),
                tagname = $this.prop('tagName').toLowerCase(),
                attrs,
                array,
                style;

            if (allowedTags.indexOf(tagname) === -1) {
                mw.log('[I18n-js] Disallowed tag in message: ' + tagname);
                $this.remove();
                return;
            }

            attrs = $this.prop('attributes');
            array = Array.prototype.slice.call(attrs);

            array.forEach(function (attr) {
                if (allowedAttrs.indexOf(attr.name) === -1) {
                    mw.log('[I18n-js] Disallowed attribute in message: ' + attr.name + ', tag: ' + tagname);
                    $this.removeAttr(attr.name);
                    return;
                }

                // Make sure there's nothing nasty in style attributes
                if (attr.name === 'style') {
                    style = $this.attr('style');

                    if (style.indexOf('url(') > -1) {
                        mw.log('[I18n-js] Disallowed url() in style attribute');
                        $this.removeAttr('style');

                    // https://phabricator.wikimedia.org/T208881
                    } else if (style.indexOf('var(') > -1) {
                        mw.log('[I18n-js] Disallowed var() in style attribute');
                        $this.removeAttr('style');
                    }
                }
            });
        });

        return $div.prop('innerHTML');
    }

    /*
     * Parse some basic wikitext into HTML. Also supports basic inline HTML tags.
     *
     * Will process:
     * - [url text]
     * - [[pagename]]
     * - [[pagename|text]]
     * - {{PLURAL:count|singular|plural}}
     * - {{GENDER:gender|masculine|feminine|neutral}}
     *
     * @param {string} message The message to process.
     * @return {string} The resulting string.
     */
    function parse(message) {
        // [url text] -> [$1 $2]
        var urlRgx = /\[((?:https?:)?\/\/.+?) (.+?)\]/g,
            // [[pagename]] -> [[$1]]
            simplePageRgx = /\[\[([^|]*?)\]\]/g,
            // [[pagename|text]] -> [[$1|$2]]
            pageWithTextRgx = /\[\[(.+?)\|(.+?)\]\]/g,
            // {{PLURAL:count|singular|plural}} -> {{PLURAL:$1|$2}}
            pluralRgx = /\{\{PLURAL:(\d+)\|(.+?)\}\}/gi,
            // {{GENDER:gender|masculine|feminine|neutral}} -> {{GENDER:$1|$2}}
            genderRgx = /\{\{GENDER:([^|]+)\|(.+?)\}\}/gi;

        if (message.indexOf('<') > -1) {
            message = sanitiseHtml(message);
        }

        return message
            .replace(urlRgx, function (_match, href, text) {
                return makeLink(href, text, true);
            })
            .replace(simplePageRgx, function (_match, href) {
                return makeLink(href);
            })
            .replace(pageWithTextRgx, function (_match, href, text) {
                return makeLink(href, text);
            })
            .replace(pluralRgx, function (_match, count, forms) {
                return mw.language.convertPlural(Number(count), forms.split('|'));
            })
            .replace(genderRgx, function (_match, gender, forms) {
                return mw.language.gender(gender, forms.split('|'));
            });
    }

    /*
     * Create a new Message instance.
     *
     * @param {object} messages The message object to look translations up in.
     * @param {string} lang The language to get the message in.
     * @param {array} args Any arguments to substitute into the message, [0] is message name.
     * @param {string} name The name of the script the messages are for.
     * @return
     */
    function message(messages, lang, args, name) {
        if (!args.length) {
            return;
        }

        /*
         * @var msgName
         * @var {string} descriptiveMsgName
         * @var {object} msg
         * @var {boolean} msgExists
         */
        var msgName = args.shift(),
            descriptiveMsgName = 'i18njs-' + name + '-' + msgName,
            msg = getMsg(messages, msgName, lang),
            msgExists = msg !== false;

        if (!msgExists) {
            // use name wrapped in < > for missing message, per MediaWiki convention
            msg = '<' + descriptiveMsgName + '>';
        }

        if (conf.wgUserLanguage === 'qqx' && msgExists) {
            // https://www.mediawiki.org/wiki/Help:System_message#Finding_messages_and_documentation
            msg = '(' + descriptiveMsgName + ')';
        } else if (overrides[name] && overrides[name][msgName]) {
            // if the message has been overridden, use that without checking the language
            msg = overrides[name][msgName];
            msgExists = true;
        }

        if (args.length) {
            msg = handleArgs(msg, args);
        }

        return {
            /*
             * @return {boolean} Representing whether the message exists.
             */
            exists: msgExists,

            /*
             * Parse wikitext links in the message and return the result.
             *
             * @return {string} The resulting string.
             */
            parse: function () {
                /*
                 * Skip parsing if the message wasn't found; otherwise
                 * the sanitisation will mess with it.
                 */
                if (!this.exists) {
                    return this.escape();
                }

                return parse(msg);
            },

            /*
             * Escape any HTML in the message and return the result.
             *
             * @return {string} The resulting string.
             */
            escape: function () {
                return mw.html.escape(msg);
            },

            /*
             * Return the message as is.
             *
             * @return {string} The resulting string.
             */
            plain: function () {
                return msg;
            }
        };
    }

    /*
     * Create a new i18n object.
     *
     * @param {object} messages The message object to look translations up in.
     * @param {string} name The name of the script the messages are for.
     * @param {object} options Options set by the loading script.
     * @return {object}
     */
    function i18n(messages, name, options) {
        var defaultLang = options.language,
            tempLang = null;

        return {
            /*
             * Set the default language.
             *
             * @deprecated since v0.6 (2020-08-25), no longer supported.
             */
            useLang: function () {
                console.warn('[I18n-js] “useLang()” is no longer supported by I18n-js (used in “' + name + '”) - using user language.');
                this.useUserLang();
            },

            /*
             * Set the language for the next msg call.
             *
             * @param {string} lang The language code to use for the next `msg` call.
             *
             * @return {object} The current object for use in chaining.
             */
            inLang: function (lang) {
                if (!options.cacheAll) {
                    console.warn('[I18n-js] “inLang()” is not supported without configuring `options.cacheAll` (used in “' + name + '”) - using user language.');
                    lang = options.language;
                }
                tempLang = lang;
                return this;
            },

            /*
             * Set the default language to the content language.
             */
            useContentLang: function () {
                defaultLang = conf.wgContentLanguage;
            },

            /*
             * Set the language for the next `msg` call to the content language.
             *
             * @return {object} The current object for use in chaining.
             */
            inContentLang: function () {
                tempLang = conf.wgContentLanguage;
                return this;
            },

            /*
             * Set the default language to the page language.
             */
            usePageLang: function () {
                defaultLang = conf.wgPageContentLanguage;
            },

            /*
             * Set the language for the next `msg` call to the page language.
             *
             * @return {object} The current object for use in chaining.
             */
            inPageLang: function () {
                tempLang = conf.wgPageContentLanguage;
                return this;
            },

            /*
             * Set the default language to the page view language.
             * This is also known as the user language variant.
             */
            usePageViewLang: function () {
                defaultLang = conf.wgUserVariant || conf.wgPageContentLanguage || conf.wgContentLanguage;
            },

            /*
             * Set the language for the next `msg` call to the page view language.
             * This is also known as the user language variant.
             *
             * @return {object} The current object for use in chaining.
             */
            inPageViewLang: function () {
                tempLang = conf.wgUserVariant || conf.wgPageContentLanguage || conf.wgContentLanguage;
                return this;
            },

            /*
             * Set the default language to the user's language.
             */
            useUserLang: function () {
                defaultLang = options.language;
            },

            /*
             * Set the language for the next msg call to the user's language.
             *
             * @return {object} The current object for use in chaining.
             */
            inUserLang: function () {
                tempLang = options.language;
                return this;
            },

            /*
             * Create a new instance of Message.
             *
             * @return {object}
             */
            msg: function () {
                var args = Array.prototype.slice.call(arguments),
                    lang = defaultLang;

                if (tempLang !== null) {
                    lang = tempLang;
                    tempLang = null;
                }

                return message(messages, lang, args, name);
            },

            /*
             * For accessing the raw messages.
             * Scripts should not rely on it or any of its properties existing.
             */
            _messages: messages
        };
    }

    /*
     * Preprocess each message's fallback chain for the user and content languages.
     * This allows us to save only those messages needed to the cache.
     *
     * @param {string} name The name of the script the messages are for.
     * @param {object} messages The message object to look translations up in.
     * @param {object} options Options set by the loading script.
     */
    function optimiseMessages(name, messages, options) {
        var existingLangs = cache[name] && cache[name]._messages._isOptimised,
            langs = [options.language],
            msgKeys = Object.keys(messages.en || {}),
            optimised = {};

        if (!msgKeys.length) {
            // No English messages, don't bother optimising
            return messages;
        }

        /*
         * @var addMsgsForLanguage
         */
        var addMsgsForLanguage = function (lang) {
            if (optimised[lang]) {
                // Language already exists
                return;
            }

            optimised[lang] = {};

            msgKeys.forEach(function (msgName) {
                /*
                 * @var msg
                 */
                var msg = getMsg(messages, msgName, lang);

                if (msg !== false) {
                    optimised[lang][msgName] = msg;
                }
            });
        };

        if (langs.indexOf(conf.wgContentLanguage) === -1) {
            langs.push(conf.wgContentLanguage);
        }

        /*
         * If cache exists and is optimised, preserve existing languages.
         * This allows an optimised cache even when using different
         * language wikis on same domain (i.e. sharing same cache).
         */
        if (existingLangs) {
            existingLangs.forEach(function (lang) {
                if (langs.indexOf(lang) === -1) {
                    langs.push(lang);
                }
            });
        }

        langs.forEach(addMsgsForLanguage);

        /*
         * `cacheAll` is an array of message names for which translations
         * should not be optimised - save all translations of these messages
         */
        if (Array.isArray(options.cacheAll)) {
            msgKeys = options.cacheAll;
            Object.keys(messages).forEach(addMsgsForLanguage);
        }

        optimised._isOptimised = langs;

        return optimised;
    }

    /*
     * Check that the cache for a script exists and, if optimised, contains the
     * necessary languages.
     *
     * @param {string} name The name of the script to check for.
     * @param {object} options Options set by the loading script.
     * @return {boolean} Whether the cache should be used.
     */
    function cacheIsSuitable(name, options) {
        var messages = cache[name] && cache[name]._messages;

        // Nothing in cache
        if (!messages) {
            return false;
        }

        /*
         * Optimised messages missing user or content language.
         * We'll need to load from server in this case.
         */
        if (
            messages._isOptimised &&
            !(messages[options.language] && messages[conf.wgContentLanguage])
        ) {
            return false;
        }

        return true;
    }

    /*
     * Remove out-of-date entries in the i18n cache (those older than two days).
     *
     * This can never be perfect: it will only work on wikis that are visited.
     */
    function removeOldCacheEntries() {
        var isCacheKey = new RegExp('^(' + cachePrefix + '.+)-content$'),
            storageKeys = [];

        try {
            storageKeys = Object.keys(localStorage);
        } catch (e) {}

        storageKeys.filter(function (key) {
            return isCacheKey.test(key);
        }).forEach(function (key) {
            var keyPrefix = key.match(isCacheKey)[1],
                cacheTimestamp;

            try {
                cacheTimestamp = Number(localStorage.getItem(keyPrefix + '-timestamp'));
            } catch (e) {}

            if (now - cacheTimestamp < oneDay * 2) {
                // Cached within last two days, keep it
                return;
            }

            try {
                localStorage.removeItem(keyPrefix + '-content');
                localStorage.removeItem(keyPrefix + '-timestamp');
                localStorage.removeItem(keyPrefix + '-version');
            } catch (e) {}
        });
    }

    /*
     * Strip block comments from a JSON string which are illegal under the JSON spec.
     * This is a bit basic, so will remove comments inside strings too.
     *
     * @param {string} json The JSON string.
     * @return {string} The JSON string after any comments have been removed.
     */
    function stripComments(json) {
        json = json
            .trim()
            .replace(/\/\*[\s\S]*?\*\//g, '');
        return json;
    }

    /*
     * Save messages string to local storage for caching.
     *
     * @param {string} name The name of the script the messages are for.
     * @param {object} json The JSON object.
     * @param {number} cacheVersion Cache version requested by the loading script.
     */
    function saveToCache(name, json, cacheVersion) {
        /*
         * @var {string} keyPrefix
         */
        var keyPrefix = cachePrefix + name;

        // Don't cache empty JSON
        if (Object.keys(json).length === 0) {
            return;
        }

        try {
            localStorage.setItem(keyPrefix + '-content', JSON.stringify(json));
            localStorage.setItem(keyPrefix + '-timestamp', now);
            localStorage.setItem(keyPrefix + '-version', cacheVersion || 0);
        } catch (e) {}
    }

    /*
     * Parse JSON string loaded from page and create an i18n object.
     *
     * @param {string} name The name of the script the messages are for.
     * @param {string} res The JSON string.
     * @param {object} options Options set by the loading script.
     * @return {object} The resulting i18n object.
     */
    function parseMessagesToObject(name, res, options) {
        var json = {},
            obj,
            msg;

        // Handle parse errors gracefully
        try {
            res = stripComments(res);
            json = JSON.parse(res);
        } catch (e) {
            msg = e.message;

            if (msg === 'Unexpected end of JSON input') {
                msg += '. This may be caused by a non-existent i18n.json page.';
            }

            console.warn('[I18n-js] SyntaxError in messages: ' + msg);
        }

        if (
            options.useCache &&
            !options.loadedFromCache &&
            options.cacheAll !== true
       ) {
            json = optimiseMessages(name, json, options);
        }

        obj = i18n(json, name, options);

        // Cache the result in case it's used multiple times
        cache[name] = obj;

        if (!options.loadedFromCache) {
            saveToCache(name, json, options.cacheVersion);
        }

        return obj;
    }

    /*
     * Load messages string from local storage cache and add to cache object.
     *
     * @param {string} name The name of the script the messages are for.
     * @param {object} options Options set by the loading script.
     */
    function loadFromCache(name, options) {
        var keyPrefix = cachePrefix + name,
            cacheContent,
            cacheVersion;

        try {
            cacheContent = localStorage.getItem(keyPrefix + '-content');
            cacheVersion = Number(localStorage.getItem(keyPrefix + '-version'));
        } catch (e) {}

        // Cache exists, and its version is greater than or equal to requested version
        if (cacheContent && cacheVersion >= options.cacheVersion) {
            options.loadedFromCache = true;
            parseMessagesToObject(name, cacheContent, options);
        }
    }

    /*
     * Load messages stored as JSON on a page.
     *
     * @param {string} name The name of the script the messages are for. This will be
     *     used to get messages from
     *     https://dev.fandom.com/wiki/MediaWiki:Custom-name/i18n.json.
     *   Use `u:<subdomain>` or `u:<language-path>.<subdomain>` to set other Fandom
     *   wikis as the source.
     * @param {object} options Options set by the loading script:
     * - {string} apiEndpoint: Use `u:<subdomain>` or `u:<language-path>.<subdomain>`
     *     to set other sites as the API endpoint of the source. Currently only
     *     support Fandom wikis.
     * - {string} page: Set other format of the full page name for the i18n JSON.
     *     Use $1 for the placeholder of name.
     * - {(array|boolean)} cacheAll: Either an array of message names for which
     *     translations should not be optimised, or `true` to disable the optimised cache.
     * - {number} cacheVersion: Minimum cache version requested by the loading script.
     * - {string} language: Set a default language for the script to use, instead of wgUserLanguage.
     * - noCache: Never load i18n from cache (not recommended for general use).
     *
     * @return {object} A jQuery.Deferred instance.
     */
    function loadMessages(name, options) {
        /*
         * @var {object} deferred
         * @var {string} apiEndpoint
         * @var {RegExp} apiEndpointRgx
         * @var {string} page
         * @var {object} params
         */
        var deferred = $.Deferred(),
            customSource = name.match(/^u:(?:([a-z-]+)\.)?([a-z0-9-]+):/),
            apiEndpoint = 'https://dev.fandom.com/api.php',
            apiEndpointRgx = new RegExp(
                // '^(https:\/\/(([a-z0-9-]+)\.fandom\.com(?:\/([a-z-]+))?|(([a-z-]+)\.wikipedia\.org\/w))\/api\.php)$'
                '^(https:\/\/(([a-z0-9-]+)\.fandom\.com(?:\/([a-z-]+))?)\/api\.php)$'
           ),
            page = 'MediaWiki:Custom-' + name + '/i18n.json',
            params;

        options = options || {};
        if (options.apiEndpoint && apiEndpointRgx.test(options.apiEndpoint)) {
            options.apiEndpoint = options.apiEndpoint;
        } else {
            options.apiEndpoint = apiEndpoint;
        }
        options.page = (options.page && options.page.replace(/\$1/g, name)) || page;
        options.cacheVersion = Number(options.cacheVersion) || 0;
        options.language = options.language || conf.wgUserLanguage;
        options.useCache = (options.noCache || conf.debug) !== true;

        if (options.useCache) {
            loadFromCache(name, options);

            if (cacheIsSuitable(name, options)) {
                return deferred.resolve(cache[name]);
            }
        }

        // Cache isn't suitable - loading from server
        options.loadedFromCache = false;

        /*
         * Allow custom i18n pages to be specified on other wikis.
         * Mainly for SOAP Wiki to keep their own JSON file.
         * Note this only supports loading from wikis on fandom.com.
         */
        if (customSource) {
            apiEndpoint = apiEndpoint.replace('dev', customSource[2]);
            page = name.slice(customSource[0].length);

            // adjust endpoint when loading from interlanguage wiki
            if (customSource[1]) {
                apiEndpoint = apiEndpoint.replace(
                    /api\.php$/,
                    customSource[1] + '/$&'
                );
            }
        }

        params = {
            action: 'query',
            format: 'json',
            prop: 'revisions',
            rvprop: 'content',
            titles: page,
            indexpageids: 1,
            origin: '*',
            // Cache results for 5 minutes in CDN and browser
            maxage: 300,
            smaxage: 300
        };

        /*
         * 'site' and 'user' are dependencies so end-users can set overrides in their local JS
         * and have it take effect before we load the messages.
         * Generally, we will implicitly depend on those anyway due to where/when this is loaded.
         */
        mw.loader.using(['mediawiki.language', 'mediawiki.util'/*, 'site', 'user'*/], function () {
            $.ajax(apiEndpoint, {
                data: params,
            }).always(function (data) {
                var res = '',
                    revisionData = data.query && data.query.pages[data.query.pageids[0]].revisions;

                if (revisionData) {
                    res = revisionData[0]['*'];
                }

                deferred.resolve(parseMessagesToObject(name, res, options));
            });
        });

        return deferred;
    }

    // Expose under the dev global
    window.dev.i18n = $.extend(window.dev.i18n, {
        loadMessages: loadMessages,

        /*
         * "Hidden" functions to allow testing and debugging
         * they may be changed or removed without warning.
         * Scripts should not rely on these existing or their output being in any particular format.
         */
        _bcp47: bcp47,
        _stripComments: stripComments,
        _saveToCache: saveToCache,
        _getMsg: getMsg,
        _handleArgs: handleArgs,
        _parse: parse,
        _fallbacks: fallbacks,
        _cache: cache
    });

    // Initialise overrides object
    window.dev.i18n.overrides = window.dev.i18n.overrides || {};
    overrides = window.dev.i18n.overrides;

    /*
     * Fire an event on load.
     * Alternatively, use $.getScript (or mw.loader) and use the returned promise.
     */
    mw.hook('dev.i18n').fire(window.dev.i18n);

    // Tidy the localStorage cache of old entries
    removeOldCacheEntries();

} (this, jQuery, mediaWiki));