/** <nowiki>
 * 
 * @module                  DPLquery
 * @description             Library to generate JSON data queries with DPL.
 *                          Enables data extraction from templates and categories.
 * @todo                    Support for Lua format?
 * @author                  Speedit <speeditwikia@gmail.com>
 * @version                 1.1.0
 * @license                 CC-BY-SA 3.0
 * 
 */
(function($, mw, undefined) {
    /** 
     * Extension information for DynamicPageList 2.3.0.
     * @var {Object} ext
     */
    var extension = {
        /** 
         * List of valid query parameters
         * @member {Array} params
         */
        params: [
            // Output formatting
            'count',
            'mode',
            'namespace',
            'shownamespace',
            'columns',
            'escapelinks',
            'format',
            'inlinetext',
            'listseparators',
            'replaceintitle',
            'rowcolformat',
            'rows',
            'rowsize',
            'title',
            'titlemaxlength',
            'userdateformat',
            'dominantsection',
            'headingcount',
            'headingmode',
            'hitemattr',
            'hlistattr',
            'itemattr',
            'listattr',
            'multisecseparators',
            'secseparators',
            'table',
            'tablerow',
            'tablesortcol',
            // Output order
            'ordermethod',
            'order',
            'ordercollation',
            // Output volume
            'addfirstcategorydate',
            'category',
            'showcurid',
            'suppresserrors',
            'oneresultfooter',
            'oneresultheader',
            'noresultsfooter',
            'noresultsheader',
            'resultsfooter',
            'resultsheader',
            'addauthor',
            'addcategories',
            'addcontribution',
            'addeditdate',
            'addexternallink',
            'addlasteditor',
            'addpagecounter',
            'addpagesize',
            'addpagetoucheddate',
            'adduser',
            'include',
            'includemaxlength',
            'includepage',
            'includetrim',
            // Output selection criteria
            'hiddencategories',
            'notcategory',
            'qualitypages',
            'redirects',
            'stablepages',
            'distinct',
            'notnamespace',
            'offset',
            'randomcount',
            'randomseed',
            'scroll',
            'title<',
            'title>',
            'categoriesminmax',
            'createdby',
            'ignorecase',
            'imagecontainer',
            'imageused',
            'includematch',
            'includematchparsed',
            'includenotmatch',
            'includenotmatchparsed',
            'includesubpages',
            'lastmodifiedby',
            'linksfrom',
            'linksto',
            'linkstoexternal',
            'minoredits',
            'modifiedby',
            'notcreatedby',
            'notlastmodifiedby',
            'notlinksfrom',
            'notlinksto',
            'notmodifiedby',
            'notuses',
            'skipthispage',
            'titlematch',
            'usedby',
            'uses',
            'allrevisionsbefore',
            'allrevisionssince',
            'articlecategory',
            'categorymatch',
            'categoryregexp',
            'firstrevisionsince',
            'lastrevisionbefore',
            'maxrevisions',
            'minrevisions',
            'notcategorymatch',
            'notcategoryregexp',
            'nottitlematch',
            'nottitleregexp',
            'openreferences',
            'titleregexp',
            // Other parameters
            'allowcachedresults',
            'execandexit',
            'debug',
            'dplcache',
            'dplcacheperiod',
            'eliminate',
            'fixcategory',
            'reset'
        ],
        /** 
         * Internal library blacklist of parameters
         * @member {Array} params
         */
        blacklist: [
            // Fatal formatting modification
            'listseparators',
            'table',
            'tablerow',
            'tablesortcol',
            'headingmode',
            'headingcount',
            'listattr',
            'itemattr',
            'hlistattr',
            'hitemattr',
            'hitemattr',
            'columns',
            'rows',
            'rowsize',
            'rowcolformat',
            'oneresultfooter',
            'noresultsfooter',
            'resultsheader',
            'oneresultheader',
            'noresultsheader',
            'resultsfooter',
            'addcategories',
            'addauthor',
            'addcategories',
            'addcontribution',
            'addeditdate',
            'addexternallink',
            'addlasteditor',
            'addpagecounter',
            'addpagesize',
            'addpagetoucheddate',
            'adduser',
            'addfirstcategorydate',
            // Non-functional/duplicate parameters
            'suppresserrors',
            'includepage',
            // Disruptive/abuse-prone functionality
            'execandexit',
            // Unsupported parameters
            'updaterules',
            'deleterules',
            'goal',
            // Defined by other library method
            'uses',
            'include',
            'debug'
        ]
    };
    /** 
     * Default mutable settings for DPL queries.
     * @var {Object} defaults
     */
    var defaults = {
        namespace: 0,
        ordermethod: 'title'
    };
    /** 
     * DPL query constructor.
     * @class Dpl
     * @param {Object} options Parameter settings for query.
     * @returns {Object} Dpl instance
     */
    function Dpl(options) {
        options = typeof options === 'object' ? options : {};
        this.options = $.extend({}, defaults, options);
    }
    /** 
     * DPL immutables generator.
     * This outputs core functional query settings.
     * @method Dpl.immutables
     * @extends Dpl
     * @this Dpl
     * @returns {Object} immutable settings
     */
    Dpl.prototype.immutables = function() {
        return {
            debug: 0,
            allowcachedresults: true,
            includetrim: true,
            uses: 'Template:' + this.template,
            format: '{, "{{urlencode:%PAGE%}}": {, }&#44;,}',
            include: this.data.map(function(i) {
                return '{' + this.template + '}:' + i;
            }, this).join(','),
            secseparators: ' ' + this.data.map(function(i) {
                return '"{{urlencode:' + i + '}}"';
            }, this).join(': "{{urlencode:,}}"&#44;, ') + ': "{{urlencode:,}}"'
        };
    };
    /** 
     * DPL query tag generator.
     * @method Dpl.tag
     * @extends Dpl
     * @param {Object} options Parameter settings for query.
     * @this Dpl
     * @returns {String} DPL tag as a multi-line string.
     */
    Dpl.prototype.tag = function(options) {
        return mw.html.element('dpl', {}, (function(options) {
            var q = '\ndebug=0';
            $.each(options, function(o, v) {
                if (o !== 'debug') {
                    q += '\n' + o + '=' + v;
                }
            });
            q += '\n';
            return new mw.html.Raw(q);
        }(options)));
    };
    /** 
     * DPL main query method in library.
     * @method Dpl.query
     * @extends Dpl
     * @this Dpl
     * @param {Object} parameters Parameter object - has "data" and "template" key.
     * @param {query~callback} callback Optional query callback.
     * @returns {Object} A Dpl.api Deferred object.
     */
    Dpl.prototype.query = function(parameters, callback) {
        // Parameter handling
        parameters = typeof parameters === 'object' ?
            parameters :
            {};
        if (
            typeof parameters.template !== 'string' ||
            !parameters.template.length
        ) {
            console.error('DPL-js: no template supplied to query object.');
            return;
        } else {
            this.template = parameters.template;
        }
        if (
            !$.isArray(parameters.data) ||
            !parameters.data.length
        ) {
            console.error('DPL-js: no data supplied to query object.');
            return;
        } else {
            this.data = parameters.data.map(String);
        }
        // Parameter validation
        var valid = true;
        $.each(this.options, function(o, v) {
            var e = extension.params.indexOf(o)    === -1,  // parameter doesn't exist
                b = extension.blacklist.indexOf(o)   > -1;  // parameter is blacklisted
            if (e) {
                console.error('DPL-js: the "' + o + '" parameter does not exist in DynamicPageList 2.3.0.');
            }
            if (b) {
                console.error('DPL-js: the "' + o + '" parameter is blacklisted in the library.');
            }
            valid = valid && !e && !b;
        });
        // Callback validation
        if(['function', 'undefined'].indexOf(typeof callback) === -1) {
            console.error('DPL-js: the registered callback is invalid.');
        } else {
            callback = callback || $.noop;
        }
        if (valid) {
            // Inject immutable library parameters
            $.extend(this.options, this.immutables());
            // Return API callback
            return this.api(this.options, callback);
        }
    };
    /** 
     * DPL data request method from MediaWiki API.
     * @method Dpl.api
     * @extends Dpl
     * @param {Object} options Options settings for DPL query.
     * @callback query~callback
     * @this Dpl
     * @returns {Object} A Deferred object.
     */
    Dpl.prototype.api = function(options, callback) {
        var $d = $.Deferred(),
            api = new mw.Api();
        api.get({
            action: 'parse',
            disablepp: true,
            text: this.tag(options)
        }).then(function(d) {
            var t = d.parse.text['*']
                    .match(/<p>([\S\s]+?)<\/p>/)[1]
                    .trim()
                    .replace(/&#(\d+);/g, function(match, dec) {
                        return String.fromCharCode(dec);
                    })
                    .replace(/,(\})$/, ' $1'),
                r = (
                    d.hasOwnProperty('error') ||
                    !t.length ||
                    !t.indexOf('<dpl>')
                ) ?
                    {
                        error: (d.error || 'DPL extension unavailable on this wiki')
                    } :
                    (function() {
                        var i = JSON.parse(t),
                            o = {};
                        $.each(i, function(k, v) {
                            var p = decodeURIComponent(k);
                            o[p] = {};
                            $.each(v, function(k2, v2) {
                                o[p][decodeURIComponent(k2.replace(/([A-Za-z)])\+/g, '$1 '))] = decodeURIComponent(v2.replace(/([A-Za-z)])\+/g, '$1 '));
                            });
                        });
                        return o;
                    }());
            $d.resolve(r);
            if (r.error) {
                console.error('DPL-js: MediaWiki API request error - "' + r.error + '".');
            } else {
                callback(r);
            }
        });
        return $d;
    };
    // Globally expose constructor
    (window.dev = window.dev || {}).Dpl = Dpl;
    // Fire MediaWiki hook
    mw.hook('dev.dpl').fire(window.dev.Dpl);
}(jQuery, mediaWiki));
/* </nowiki> */