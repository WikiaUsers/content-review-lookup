/** <nowiki>
 * Calc script for RuneScape Wiki
 * 
 * This script exposes the following hooks, accessible via `mw.hook`:
 *     1. 'rscalc.setupComplete' - Fires when all calculator forms have been added to the DOM.
 *     2. 'rscalc.submit' - Fires when a calculator form has been submitted and the result has
 *                          been added to the DOM.
 * For instructions on how to use `mw.hook`, see <https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.hook>
 *
 * @see Documentation <http://runescape.wikia.com/wiki/RuneScape:Calculators/Form_calculators>
 * @see Examples <http://runescape.wikia.com/wiki/RuneScape:Calculators/Form_calculators/Examples>
 * @see Tests <http://runescape.wikia.com/wiki/RuneScape:Calculators/Form_calculators/Tests>
 *      Also includes XSS checks.
 *
 * @license GLPv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 *
 * @author Quarenon
 * @author TehKittyCat
 * @author Joeytje50
 * @author Cook Me Plox
 * @author Gaz Lloyd
 * @author Cqm
 *
 * @todo Test Wikia's linksuggest for search suggestions
 *       not sure if it supports multiple namespaces though
 * @todo Whitelist domains for href attributes when sanitising HTML?
 */

/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:false, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/

/*global mediaWiki, rswiki */

;(function ($, mw, rs, undefined) {
    'use strict';

        /**
         * Caching for search suggestions
         */
    var cache = {},

        /**
         * Internal variable to store references to each calculator on the page.
         */
        calcStore = {},

        /**
         * Private helper methods for `Calc`
         *
         * Most methods here are called with `Function.prototype.call`
         * and are passed an instance of `Calc` to access it's prototype
         */
        helper = {
            /**
             * Parse the calculator configuration
             *
             * @param lines {Array} An array containing the calculator's configuration
             * @returns {Object} An object representing the calculator's configuration
             */
            parseConfig: function (lines) {
                var defConfig = {
                        suggestns: []
                    },
                    config = {
                        // this isn't in `defConfig`
                        // as it'll get overridden anyway
                        tParams: []
                    },
                    // used for debugging incorrect config names
                    validParams = [
                        'form',
                        'param',
                        'result',
                        'suggestns',
                        'template'
                    ],
                    // used for debugging incorrect param types
                    validParamTypes = [
                        'string',
                        'article',
                        'number',
                        'int',
                        'select',
                        'check',
                        'hs',
                        'fixed',
                        'hidden',
                        'semihidden'
                    ],
                    configError = false;

                // parse the calculator's config
                // @example param=arg1|arg1|arg3|arg4
                lines.forEach(function (line) {
                    var temp = line.split('='),
                        param,
                        args;

                    // incorrect config
                    if (temp.length < 2) {
                        return;
                    }

                    // an equals is used in one of the arguments
                    // @example HTML label with attributes
                    // so join them back together to preserve it
                    // this also allows support of HTML attributes in labels
                    if (temp.length > 2) {
                        temp[1] = temp.slice(1,temp.length).join('=');
                    }

                    param = temp[0].trim().toLowerCase();
                    args = temp[1].trim();

                    if (validParams.indexOf(param) === -1) {
                        // use console for easier debugging
                        console.log('Unknown parameter: ' + param);
                        configError = true;
                        return;
                    }

                    if (param === 'suggestns') {
                        config.suggestns = args.split(/\s*,\s*/);
                        return;
                    }

                    if (param !== 'param') {
                        config[param] = args;
                        return;
                    }

                    // split args
                    args = args.split(/\s*\|\s*/);

                    // store template params in an array to make life easier
                    config.tParams = config.tParams || [];

                    if (validParamTypes.indexOf(args[3]) === -1 && args[3] !== '') {
                        // use console for easier debugging
                        console.log('Unknown param type: ' + args[3]);
                        configError = true;
                        return;
                    }

                    config.tParams.push({
                        name: mw.html.escape(args[0]),
                        label: args[1] || args[0],
                        def: mw.html.escape(args[2] || ''),
                        type: mw.html.escape(args[3] || ''),
                        range: mw.html.escape(args[4] || '')
                    });
                });
                
                if (configError) {
                    config.configError = 'This calculator\'s config contains errors. Please report it ' +
                        '<a href="/wiki/RuneScape:User_help" title="RuneScape:User help">here</a> ' +
                        'or check the javascript console for details.';
                }

                config = $.extend(defConfig, config);
                return config;
            },

            /**
             * Generate a unique id for each input
             *
             * @param inputId {String} A string representing the id of an input
             * @returns {String} A string representing the namespaced/prefixed id of an input
             */
            getId: function (inputId) {
                return [this.form, this.result, inputId].join('-');
            },

            /**
             * Output an error to the UI
             *
             * @param error {String} A string representing the error message to be output
             */
            showError: function (error) {
                $('#' + this.result)
                    .empty()
                    .append(
                        $('<span>')
                            .addClass('jcError')
                            .text(error)
                    );
            },

            /**
             * Check that a number is within a specified range
             *
             * @param x {Number} The number to check is within the range
             * @param param {Object} An object containing the range to check and the type of 
             *                       parameter as the check varies slightly depending on it's type
             * @returns {Boolean} `true` if the number is within the parameter's range or
             *                    `false` if not
             */
            validRange: function (x, param) {
                // if no range, return true
                if (!param.range) {
                    return true;
                }

                var parts = param.range.split('-'),
                    method = parseFloat;

                // enforce integer ranges for int
                // otherwise allow floats for number
                if (param.type === 'int') {
                    method = parseInt;
                }

                // check lower limit
                if (parts[0] !== '' && x < method(parts[0], 10)) {
                    return false;
                }

                // check upper limit
                if (parts[1] !== '' && x > method(parts[1], 10)) {
                    return false;
                }

                return true;
            },

            /**
             * Form submission handler
             */
            submitForm: function () {
                var self = this,
                    code = '{{' + self.template,
                    formError = false;

                // setup template for submission
                self.tParams.forEach(function (param) {
                    var val,
                        $input,
                        // use separate error tracking for each input
                        // or every input gets flagged as an error
                        error = false;

                    if (param.type === 'fixed' || param.type === 'hidden') {
                        val = param.def;
                    } else {
                        $input = $('#' + helper.getId.call(self, param.name));
                        val = $input.val();

                        if (param.type === 'int') {
                            val = val.split(',').join('');
                        } else if (param.type === 'check') {
                            val = $input.prop('checked');

                            if (param.range) {
                                val = param.range.split(',')[val ? 0 : 1];
                            }
                        }

                        // int types must be a valid integer or range
                        if (
                            param.type === 'int' &&
                            (
                                val.search(/^-?[0-9]+$/) === -1 ||
                                !helper.validRange(val, param)
                            )
                        ) {
                            error = true;
                        }

                        // number types must be a valid number or range
                        if (
                            param.type === 'number' &&
                            (
                                val.search(/^-?[.0-9]+$/) === -1 ||
                                !helper.validRange(val, param)
                            )
                        ) {
                            error = true;
                        }

                        if (error) {
                            $input.addClass('jcInvalid');
                            formError = true;
                        } else {
                            $input.removeClass('jcInvalid');
                        }
                    }
                    
                    code += '|' + param.name + '=' + val;
                });

                if (formError) {
                    helper.showError.call(self, 'One or more fields contains an invalid value.');
                    return;
                }

                code += '}}';

                helper.loadTemplate.call(self, code);
            },

            /**
             * Parse the template used to display the result of the form
             *
             * @param code {string} Wikitext to send to the API for parsing
             */
            loadTemplate: function (code) {
                var self = this,
                    params = {
                        action: 'parse',
                        text: code,
                        prop: 'text',
                        title: self.template,
                        disablepp: 'true'
                    };
                
                // experimental support for using VE to parse calc templates
                if (!!mw.util.getParamValue('vecalc')) {
                    params = {
                        action: 'visualeditor',
                        // has to be a mainspace page or VE won't work
                        page: 'No page',
                        paction: 'parsefragment',
                        wikitext: code
                    };
                }

                $('#' + self.form + ' .jcSubmit input')
                    .val('Loading...')
                    .prop('disabled', true);

                // @todo time how long these calls take
                (new mw.Api())
                    .post(params)
                    .done(function (response) {
                        var html;
                        
                        if (!!mw.util.getParamValue('vecalc')) {
                            // strip body tag
                            html = $(response.visualeditor.content).contents();
                        } else {
                            html = response.parse.text['*'];
                        }
                        
                        helper.dispResult.call(self, html);
                    })
                    .fail(function (_, error) {
                        $('#' + self.form + ' .jcSubmit input')
                            .val('Submit')
                            .prop('disabled', false);
                        helper.showError.call(self, error);
                    });
            },

            /**
             * Display the calculator result on the page
             *
             * @param response {String} A string representing the HTML to be added to the page
             */
            dispResult: function (html) {
                $('#' + this.form + ' .jcSubmit input')
                    .val('Submit')
                    .prop('disabled', false);

                $('#bodyContent, #WikiaArticle')
                    .find('#' + this.result)
                        .empty()
                        .removeClass('jcError')
                        .html(html);
                
                // allow scripts to hook into form submission
                mw.hook('rscalc.submit').fire();

                mw.loader.using('jquery.tablesorter', function () {
                    $('table.sortable').tablesorter();
                });
                mw.loader.using('jquery.makeCollapsible', function () {
                    $('.mw-collapsible').makeCollapsible();
                });
            },

            /**
             * Sanitise any HTML used in labels
             *
             * @param html {string} A HTML string to be sanitised
             * @returns {jQuery.object} A jQuery object representing the sanitised HTML
             */
            sanitiseLabels: function (html) {
                var whitelistAttrs = [
                        // mainly for span/div tags
                        'style',
                        // for anchor tags
                        'href',
                        'title',
                        // for img tags
                        'src',
                        'alt',
                        'height',
                        'width',
                        // misc
                        'class'
                    ],
                    whitelistTags = [
                        'a',
                        'span',
                        'div',
                        'img',
                        'strong',
                        'b',
                        'em',
                        'i',
                        'br'
                    ],
                    // parse the HTML string, removing script tags at the same time
                    $html = $.parseHTML(html, /* document */ null, /* keepscripts */ false),
                    // append to a div so we can navigate the node tree
                    $div = $('<div>').append($html);

                $div.find('*').each(function () {
                    var $this = $(this),
                        tagname = $this.prop('tagName').toLowerCase(),
                        attrs,
                        array,
                        href;

                    if (whitelistTags.indexOf(tagname) === -1) {
                        mw.log('Disallowed tagname: ' + tagname);
                        $this.remove();
                        return;
                    }

                    attrs = $this.prop('attributes');
                    array = Array.prototype.slice.call(attrs);

                    array.forEach(function (attr) {
                        if (whitelistAttrs.indexOf(attr.name) === -1) {
                            mw.log('Disallowed attribute: ' + attr.name + ', tagname: ' + tagname);
                            $this.removeAttr(attr.name);
                            return;
                        }

                        // make sure there's nasty in nothing in href attributes
                        if (attr.name === 'href') {
                            href = $this.attr('href');

                            if (
                                // disable warnings about script URLs
                                // jshint -W107
                                href.indexOf('javascript:') > -1 ||
                                // the mw sanitizer doesn't like these
                                // so lets follow suit
                                // apparently it's something microsoft dreamed up
                                href.indexOf('vbscript:') > -1
                                // jshint +W107
                            ) {
                                mw.log('Script URL detected in ' + tagname);
                                $this.removeAttr('href');
                            }
                        }
                    });
                });

                return $div.contents();
            },

            /**
             * Handlers for parameter input types
             */
            tParams: {
                /**
                 * Handler for 'fixed' inputs
                 *
                 * @param $td {jQuery.object} A jQuery object representing a table cell to
                 *                            add content to
                 * @param param {object} An object containing the configuration of a parameter
                 * @returns {jQuery.object} A jQuery object representing the completed table cell
                 */
                fixed: function ($td, param) {
                    $td.text(param.def);
                    return $td;
                },

                /**
                 * Handler for select dropdowns
                 *
                 * @param $td {jQuery.object} A jQuery object representing a table cell to
                 *                            add content to
                 * @param param {object} An object containing the configuration of a parameter
                 * @param id {String} A string representing the id to be added to the input
                 * @returns {jQuery.object} A jQuery object representing the completed table cell
                 */
                select: function ($td, param, id) {
                    var $select = $('<select>')
                            .attr({
                                name: id,
                                id: id
                            }),
                        opts = param.range.split(',');

                    opts.forEach(function (opt) {
                        // undo the mw.html.escape call used when creating the params object
                        // and defer the escaping to $.fn.val and $.fn.text instead
                        opt = opt.replace(/&gt;/g, '>')
                                 .replace(/&lt;/g, '<')
                                 .replace(/&amp;/g, '&')
                                 .replace(/&quot;/g, '"')
                                 .replace(/&#039;/g, '\'');

                        var $option = $('<option>')
                                .val(opt)
                                .text(opt);

                        if (opt === param.def) {
                            $option.prop('selected', true);
                        }

                        $select.append($option);
                    });

                    $td.append($select);
                    return $td;
                },

                /**
                 * Handler for checkbox inputs
                 *
                 * @param $td {jQuery.object} A jQuery object representing a table cell to
                 *                            add content to
                 * @param param {object} An object containing the configuration of a parameter
                 * @param id {String} A string representing the id to be added to the input
                 * @returns {jQuery.object} A jQuery object representing the completed table cell
                 */
                check: function ($td, param, id) {
                    var $input = $('<input>')
                            .attr({
                                type: 'checkbox',
                                name: id,
                                id: id
                            });

                    if (
                        param.def === 'true' ||
                        (param.range !== undefined && param.def === param.range.split(',')[0])
                    ) {
                        $input.prop('checked', true);
                    }

                    $td.append($input);
                    return $td;
                },

                /**
                 * Handler for hiscore inputs
                 *
                 * @param $td {jQuery.object} A jQuery object representing a table cell to
                 *                            add content to
                 * @param param {object} An object containing the configuration of a parameter
                 * @param id {String} A string representing the id to be added to the input
                 * @returns {jQuery.object} A jQuery object representing the completed table cell
                 */
                hs: function ($td, param, id) {
                    var self = this,
                        lookups = {},
                        range = param.range.split(';'),
                        $input = $('<input>')
                            .attr({
                                type: 'text',
                                name: id,
                                id: id
                            })
                            // prevent submission of form when pressing enter
                            .keydown(function (e) {
                                if (e.which === 13) {
                                    $('#' + $(e.currentTarget).attr('id') + '-button').click();
                                    e.preventDefault();
                                }
                            }),
                        $button = $('<input>')
                            .addClass('jcLookup')
                            .attr({
                                type: 'button',
                                name: id + '-button',
                                id: id + '-button',
                                'data-param': param.name
                            })
                            .val('Lookup')
                            .click(function (e) {
                                var $target = $(e.target);

                                $target
                                    .val('Looking up...')
                                    .prop('disabled', true);

                                var lookup = self.lookups[$target.attr('data-param')],
                                    // replace spaces with _ for the query
                                    name = $('#' + lookup.id)
                                        .val()
                                        // @todo will this break for plyers with multiple spaces
                                        //       in their name? e.g. suomi's old display name
                                        .replace(/\s+/g, '_');

                                $.ajax({
                                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D\'http%3A%2F%2Fservices.runescape.com%2Fm%3Dhiscore%2Findex_lite.ws%3Fplayer%3D' + name + '\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                                    dataType: 'json',
                                    async: false,
                                    timeout: 10000 // msec
                                })
                                .done(function (data) {
                                    var hsdata;

                                    if (data.query.results) {
                                        hsdata = $(data.query.results.result)
                                            .text()
                                            .trim()
                                            .split(/\n+/g);

                                        lookup.params.forEach(function (param) {
                                            var id = helper.getId.call(self, param.param),
                                                $input = $('#' + id);

                                            $input.val(hsdata[param.skill].split(',')[param.val]);
                                        });
                                    
                                        // store in localStorage for future use
                                        window.localStorage.hsname = name;
                                    } else {
                                        helper.showError.call(self, 'The player "' + name + '" does not exist, is banned or unranked, or we couldn\'t fetch your hiscores. Please enter the data manually.');
                                    }

                                    $('#' + self.form + ' input[type="button"].jcLookup')
                                        .val('Lookup')
                                        .prop('disabled', false);
                                })
                                .fail(function (xhr, status, error) {
                                    $('#' + self.form + ' input[type="button"].jcLookup')
                                        .val('Lookup')
                                        .prop('disabled', false);

                                    helper.showError.call(
                                        self,
                                        xhr + ': ' + status + ': ' + error
                                    );
                                });
                            });

                    // attempt to pull user's name from localStorage
                    if (window.localStorage.hsname !== undefined) {
                        $input.val(window.localStorage.hsname);
                    }

                    $td.append($input, '&nbsp;', $button);

                    lookups[param.name] = {
                        id: id,
                        params: []
                    };
                    
                    range.forEach(function (el) {
                        // to catch empty strings
                        if (!el) {
                            return;
                        }

                        var spl = el.split(',');

                        lookups[param.name].params.push({
                            param: spl[0],
                            skill: spl[1],
                            val: spl[2]
                        });
                    });

                    // merge lookups into one object
                    if (!self.lookups) {
                        self.lookups = lookups;
                    } else {
                        self.lookups = $.extend(self.lookups, lookups);
                    }

                    return $td;
                },

                /**
                 * Default handler for inputs
                 *
                 * @param $td {jQuery.object} A jQuery object representing a table cell to
                 *                            add content to
                 * @param param {object} An object containing the configuration of a parameter
                 * @param id {String} A string representing the id to be added to the input
                 * @returns {jQuery.object} A jQuery object representing the completed table cell
                 */
                def: function ($td, param, id) {
                    var $input = $('<input>')
                            .attr({
                                type: 'text',
                                name: id,
                                id: id
                            })
                            .val(param.def);

                    $td.append($input);

                    if (param.type === 'article') {
                        this.acInputs.push(id);
                    }

                    return $td;
                }
            }
        };

    /**
     * Create an instance of `Calc`
     * and parse the config stored in `elem`
     *
     * @param elem {Element} An Element representing the HTML tag that contains
     *                       the calculator's configuration
     */
    function Calc(elem) {
        var self = this,
            $elem = $(elem),
            lines,
            config;
            
        // support div tags for config as well as pre
        // be aware using div tags relies on wikitext for parsing
        // so you can't use anchor or img tags
        // use the wikitext equivalent instead
        if ($elem.children().length) {
            $elem = $elem.children();
            lines = $elem.html();
        } else {
            // .html() causes html characters to be escaped for some reason
            // so use .text() instead for <pre> tags
            lines = $elem.text();
        }
        
        lines = lines.split('\n');
        
        config = helper.parseConfig.call(this, lines);

        // merge config in
        $.extend(this, config);
        this.acInputs = [];

        /**
         * @todo document
         */
        this.getInput = function (id) {
            if (id) {
                id = helper.getId.call(self, id);
                return $('#' + id);
            }
            
            return $('#jsForm-' + self.form).find('select, input');
        };
    }
    
    /**
     * Helper function for getting the id of an input
     *
     * @param id {string} The id of the input as specified by the calculator config.
     * @returns {string} The true id of the input with prefixes.
     */
    Calc.prototype.getId = function (id) {
        var self = this,
            inputId = helper.getId.call(self, id);

        return inputId;
    };

    /**
     * Build the calculator form
     */
    Calc.prototype.setupCalc = function () {
        var self = this,
            $form = $('<form>')
                .attr({
                    action: '#',
                    id: 'jsForm-' + self.form
                })
                .submit(function (e) {
                    e.preventDefault();
                    helper.submitForm.call(self);
                }),
            $table = $('<table>')
                .addClass('wikitable')
                .addClass('jcTable');

        self.tParams.forEach(function (param) {
            // can skip any output here as the result is pulled from the
            // param default in the config on submission
            if (param.type === 'hidden') {
                return;
            }

            var id = helper.getId.call(self, param.name),
                $tr = $('<tr>'),
                $td = $('<td>'),
                method = helper.tParams[param.type] ?
                    param.type :
                    'def',
                // sanitise any HTML before inserting it
                // need this check otherwise jQuery cries
                // might need slightly better check in edge cases, but this should do for now
                label = param.label.indexOf('<') > -1 ?
                    helper.sanitiseLabels(param.label) :
                    param.label;

            // add label
            $tr.append(
                $('<th>')
                    .append(
                        $('<label>')
                            .attr('for', id)
                            .html(label)
                    )
            );

            $td = helper.tParams[method].call(self, $td, param, id);
            $tr.append($td);

            if (param.type === 'semihidden') {
                $tr.hide();
            }

            $table.append($tr);
        });

        $table.append(
            $('<tr>')
                .append(
                    $('<td>')
                        .addClass('jcSubmit')
                        .attr('colspan', '2')
                        .append(
                            $('<input>')
                                .attr('type', 'submit')
                                .val('Submit')
                        )
                )
        );

        $form.append($table);
        
        if (self.configError) {
            $form.append(self.configError);
        }

        $('#bodyContent, #WikiaArticle')
            .find('#' + self.form)
                .empty()
                .append($form);

        // Enable suggest on article fields
        mw.loader.using(['mediawiki.api','jquery.ui.autocomplete'], function () {
            self.acInputs.forEach(function (input) {
                $('#' + input).autocomplete({
                    // matching wikia's search min length
                    minLength: 3,
                    source: function(request, response) {
                        var term = request.term;

                        if (term in cache) {
                            response(cache[term]);
                            return;
                        }

                        (new mw.Api())
                            .get({
                                action: 'opensearch',
                                search: term,
                                // default to main namespace
                                namespace: self.suggestns.join('|') || 0,
                                suggest: ''
                            })
                            .done(function (data) {
                                cache[term] = data[1];
                                response(data[1]);
                            });
                    }
                });
            });
        });
    };
    
    /**
     * @todo
     */
    function lookupCalc(calcId) {
        return calcStore[calcId];
    }

    /**
     * @todo
     */
    function init() {
        $('.jcConfig').each(function () {
            var c = new Calc(this);
            c.setupCalc();
            
            calcStore[c.form] = c;
        });
        
        // allow scripts to hook into calc setup completion
        mw.hook('rscalc.setupComplete').fire();
    }

    $(init);
    
    rs.calc = {};
    rs.calc.lookup = lookupCalc;

}(jQuery, mediaWiki, rswiki));