/* <nowiki>
 * Library for accessing i18n messages for use in Dev Wiki scripts.
 * See [[I18n-js]] for documentation.
 *
 * @author Cqm <https://dev.fandom.com/User:Cqm>
 * @author OneTwoThreeFall <https://dev.fandom.com/User:OneTwoThreeFall>
 *
 * @version 0.5.12
 *
 * @notes Also used by VSTF wiki for their reporting forms (with a non-dev i18n.json page)
 * @notes This is apparently a commonly used library for a number of scripts and also includes
 *        a check to prevent double loading. This can make it painful to test from your JS
 *        console. To get around this, add ?usesitejs=0&useuserjs=0 to your URL.
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

    // prevent double loading and loss of cache
    if (window.dev.i18n.loadMessages !== undefined) {
        return;
    }

        /*
         * Cache of mw config variables.
         */
    var conf = mw.config.get([
            'debug',
            'wgContentLanguage',
            'wgUserLanguage'
        ]),

        /*
         * Current time in milliseconds, used to set and check cache age.
         */
        now = Date.now(),

        /*
         * Length of one day in milliseconds, used in cache age calculations.
         */
        oneDay = 1000 * 60 * 60 * 24,

        /*
         * Prefix used for localStorage keys that contain i18n-js cache data.
         */
        cachePrefix = 'i18n-cache-',

        /*
         * Cache of loaded I18n instances.
         */
        cache = {},

        /*
         * Initial overrides object, initialised below with the i18n global variable.
         * Allows end-users to override specific messages. See documentation for how to use.
         */
        overrides = null,

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
     * @param messages The message object to look translations up in.
     * @param msgName The name of the message to get.
     * @param lang The language to get the message in.
     *
     * @return The requested translation or the name wrapped in < ... > if no
     *     message could be found.
     */
    function getMsg(messages, msgName, lang) {
        if (messages[lang] && messages[lang][msgName]) {
            return messages[lang][msgName];
        }

        if (lang === 'en') {
            return '<' + msgName + '>';
        }

        lang = fallbacks[lang] || 'en';
        return getMsg(messages, msgName, lang);
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
     * @param hasProtocol True if the href parameter already includes the
     *     protocol (i.e. it begins with 'http://', 'https://', or '//').
     *
     * @return The generated link.
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
     *
     * @return The sanitised HTML code.
     */
    function sanitiseHtml(html) {
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

                // make sure there's nothing nasty in style attributes
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
     * @param message The message to process.
     *
     * @return The resulting string.
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
     * @param messages The message object to look translations up in.
     * @param lang The language to get the message in.
     * @param args Any arguments to substitute into the message, [0] is message name.
     * @param name The name of the script the messages are for.
     */
    function message(messages, lang, args, name) {
        if (!args.length) {
            return;
        }

        var msgName = args.shift(),
            noMsg = '<' + msgName + '>',
            msg;

        if (conf.wgUserLanguage === 'qqx') {
            // https://www.mediawiki.org/wiki/Help:System_message#Finding_messages_and_documentation
            msg = '(i18njs-' + name + '-' + msgName + ')';
        } else if (overrides[name] && overrides[name][msgName]) {
            // if the message has been overridden, use that without checking the language
            msg = overrides[name][msgName];
        } else {
            msg = getMsg(messages, msgName, lang);
        }

        if (args.length) {
            msg = handleArgs(msg, args);
        }

        return {
            /*
             * Boolean representing whether the message exists.
             */
            exists: msg !== noMsg,

            /*
             * Parse wikitext links in the message and return the result.
             *
             * @return The resulting string.
             */
            parse: function () {
                // skip parsing if the message wasn't found otherwise
                // the sanitisation will mess with it
                if (!this.exists) {
                    return this.escape();
                }

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
     * @param name The name of the script the messages are for.
     * @param options Options set by the loading script.
     */
    function i18n(messages, name, options) {
        var defaultLang = options.language,
            tempLang = null;

        return {
            /*
             * Set the default language.
             *
             * @param lang The language code to use by default.
             */
            useLang: function (lang) {
                defaultLang = lang;
            },

            /*
             * Set the language for the next msg call.
             *
             * @param lang The language code to use for the next `msg` call.
             *
             * @return The current object for use in chaining.
             */
            inLang: function (lang) {
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
             * @return The current object for use in chaining.
             */
            inContentLang: function () {
                tempLang = conf.wgContentLanguage;
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
             * @return The current object for use in chaining.
             */
            inUserLang: function () {
                tempLang = options.language;
                return this;
            },

            /*
             * Create a new instance of Message.
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
             */
            _messages: messages
        };
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
                // cached within last two days, keep it
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
     * @param json The JSON string.
     *
     * @return The JSON string after any comments have been removed.
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
     * @param name The name of the script the messages are for.
     * @param json The JSON object.
     * @param cacheVersion Cache version requested by the loading script.
     */
    function saveToCache(name, json, cacheVersion) {
        var keyPrefix = cachePrefix + name;

        // don't cache empty JSON
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
     * @param name The name of the script the messages are for.
     * @param res The JSON string.
     * @param options Options set by the loading script.
     *
     * @return The resulting i18n object.
     */
    function parseMessagesToObject(name, res, options) {
        var json = {},
            obj,
            msg;

        // handle parse errors gracefully
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

        obj = i18n(json, name, options);

        // cache the result in case it's used multiple times
        cache[name] = obj;

        if (typeof options.cacheVersion === 'number') {
            saveToCache(name, json, options.cacheVersion);
        }

        return obj;
    }

    /*
     * Load messages string from local storage cache and add to cache object.
     *
     * @param name The name of the script the messages are for.
     * @param options Options set by the loading script.
     */
    function loadFromCache(name, options) {
        var keyPrefix = cachePrefix + name,
            cacheContent,
            cacheVersion;

        try {
            cacheContent = localStorage.getItem(keyPrefix + '-content');
            cacheVersion = Number(localStorage.getItem(keyPrefix + '-version'));
        } catch (e) {}

        // cache exists, and its version is greater than or equal to requested version
        if (cacheContent && cacheVersion >= options.cacheVersion) {
            delete options.cacheVersion;
            parseMessagesToObject(name, cacheContent, options);
        }
    }

    /*
     * Load messages stored as JSON on a page.
     *
     * @param name The name of the script the messages are for. This will be
     *     used to get messages from
     *     https://dev.fandom.com/wiki/MediaWiki:Custom-name/i18n.json.
     * @param options Options set by the loading script:
     *     cacheVersion: Minimum cache version requested by the loading script.
     *     language: Set a default language for the script to use, instead of wgUserLanguage.
     *     noCache: Never load i18n from cache (not recommended for general use).
     *
     * @return A jQuery.Deferred instance.
     */
    function loadMessages(name, options) {
        var deferred = $.Deferred(),
            customSource = name.match(/^u:(?:([a-z-]+)\.)?([a-z0-9-]+):/),
            apiEndpoint = 'https://dev.fandom.com/api.php',
            page = 'MediaWiki:Custom-' + name + '/i18n.json',
            params;

        options = options || {};
        options.cacheVersion = Number(options.cacheVersion) || 0;
        options.language = String(options.language) || conf.wgUserLanguage;
        options.useCache = (options.noCache || conf.debug) !== true;

        // if using the special 'qqx' language code, there's no need to load
        // the messages, so resolve with an empty i18n object and return early
        if (conf.wgUserLanguage === 'qqx') {
            return deferred.resolve(i18n({}, name, options));
        }

        if (options.useCache) {
            loadFromCache(name, options);

            if (cache[name]) {
                return deferred.resolve(cache[name]);
            }
        }

        // allow custom i18n pages to be specified on other wikis
        // mainly for VSTF wiki to keep their own JSON file
        // note this only supports loading from wikis on fandom.com
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
            indexpageids: 1
        };

        // site and user are dependencies so end-users can set overrides in their local JS
        // and have it take effect before we load the messagaes
        // generally, we will implicitly depend on those anyway due to where/when this is loaded
        mw.loader.using(['mediawiki.language', 'mediawiki.util'/*, 'site', 'user'*/], function () {
            $.ajax(apiEndpoint, {
                data: params,
                dataType: 'jsonp'
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

    // expose under the dev global
    window.dev.i18n = $.extend(window.dev.i18n, {
        loadMessages: loadMessages,

        // 'hidden' functions to allow testing
        _stripComments: stripComments,
        _saveToCache: saveToCache,
        _getMsg: getMsg,
        _handleArgs: handleArgs,
        _parse: parse,
        _fallbacks: fallbacks
    });

    // initialise overrides object
    window.dev.i18n.overrides = window.dev.i18n.overrides || {};
    overrides = window.dev.i18n.overrides;

    // fire an event on load
    mw.hook('dev.i18n').fire(window.dev.i18n);
    // alternatively, use $.getScript (or mw.loader)
    // and use the returned promise

    // tidy the localStorage cache of old entries
    removeOldCacheEntries();

}(this, jQuery, mediaWiki));