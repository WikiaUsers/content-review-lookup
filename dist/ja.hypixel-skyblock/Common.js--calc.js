/** <nowiki>
 * Taken from https://runescape.fandom.com/wiki/MediaWiki:Common.js/calc.js
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

/*global mediaWiki, hsbwiki */
window.hsbwiki = window.hsbwiki || {}

;(function ($, mw, hsb, undefined) {
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
                        range: mw.html.escape(args[4] || ''),
                        rawtogs: mw.html.escape(args[5] || '')
                    });
                });
                
                if (configError) {
                    config.configError = 'This calculator\'s config contains errors. Please report it to an admin or check the javascript console for details.';
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
             * Toggle the visibility and enabled status of fields/groups
             *
             * @param item {String} A string representing the current value of the widget
             * @param toggles {object} An object representing arrays of items to be toggled keyed by widget values
             */
            toggle: function (item, toggles) {
                var self = this;
                var togitem = function (widget, show) {
                    var param = self.tParams[ self.indexkeys[widget] ];
                    // if (param.type === 'group') {
                    //     param.ooui.toggle(show);
                    //     param.ooui.getItems().forEach(function (child) {
                    //         if (!!child.setDisabled) {
                    //             child.setDisabled(!show);
                    //         } else if (!!child.getField().setDisabled) {
                    //             child.getField().setDisabled(!show);
                    //         }
                    //     });
                    // } else
                    if ( param.type === 'semihidden' ) {
                        // if (!!param.ooui.setDisabled) {
                        //     param.ooui.setDisabled(!show);
                        // }
                        // [skywiki] Yet another hacky way to get around not having ooui
                        param.$ui.prop('disabled', !show);
                    } else {
                        // param.layout.toggle(show);
                        // if (!!param.$ui.setDisabled) {
                        //     param.ooui.setDisabled(!show);
                        // }
                        // [skywiki] Yet another hacky way to get around not having ooui
                        param.$ui.closest("tr").toggle(show);
                        param.$ui.prop('disabled', !show);
                        
                    }
                };
    
                if (toggles[item]) {
                    toggles[item].on.forEach( function (widget) {
                        togitem(widget, true);
                    });
                    toggles[item].off.forEach( function (widget) {
                        togitem(widget, false);
                    });
                } else if ( toggles.not0 && !isNaN(parseFloat(item)) && parseFloat(item) !== 0 ) {
                    toggles.not0.on.forEach( function (widget) {
                        togitem(widget, true);
                    });
                    toggles.not0.off.forEach( function (widget) {
                        togitem(widget, false);
                    });
                } else if (toggles.alltogs) {
                    toggles.alltogs.off.forEach( function (widget) {
                        togitem(widget, false);
                    });
                }
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
             * Parse the toggles for an input
             *
             * @param rawdata {string} A string representing the toggles for the widget
             * @param defkey {string} The default key for toggles
             * @returns {object} An object representing the toggles in the format { ['widget value']:[ widget-to-toggle, group-to-toggle, widget-to-toggle2 ] }
             */
            parseToggles: function (rawdata,defkey) {
                var tmptogs = rawdata.split(/\s*;\s*/),
                    allkeys = [], allvals = [],
                    toggles = {};
    
                if (tmptogs.length > 0 && tmptogs[0].length > 0) {
                    tmptogs.forEach(function (tog) {
                        var tmp = tog.split(/\s*=\s*/),
                            keys = tmp[0],
                            val = [];
                        if (tmp.length < 2) {
                            keys = [defkey];
                            val = tmp[0].split(/\s*,\s*/);
                        } else {
                            keys = tmp[0].split(/\s*,\s*/);
                            val = tmp[1].split(/\s*,\s*/);
                        }
                        if (keys.length === 1) {
                            var key = keys[0];
                            toggles[key] = {};
                            toggles[key].on = val;
                            allkeys.push(key);
                        } else {
                            keys.forEach( function (key) {
                                toggles[key] = {};
                                toggles[key].on = val;
                                allkeys.push(key);
                            });
                        }
                        allvals = allvals.concat(val);
                    });
    
                    allkeys = allkeys.filter(function (item, pos, arr) {
                        return arr.indexOf(item) === pos;
                    });
    
                    allkeys.forEach(function (key) {
                        toggles[key].off = allvals.filter(function (val) {
                            if ( toggles[key].on.includes(val) ) {
                                return false;
                            } else {
                                return true;
                            }
                        });
                    });
    
                    // Add all items to default
                    toggles.alltogs = {};
                    toggles.alltogs.off = allvals;
                }
    
                return toggles;
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
                    param.$ui = $td; // [skywiki] custom way of doing much less involved "param.ooui"
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
                    var self = this,
                        $select = $('<select>')
                            .attr({
                                name: id,
                                id: id
                            }),
                        opts = param.range.split(/\s*,\s*/),
                        def = opts[0];

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

                    param.toggles = helper.parseToggles(param.rawtogs, def);
    
                    if ( Object.keys(param.toggles).length > 0 ) {
                        $select.on('change', function(){
                            helper.toggle.call(self, $(this).val(), param.toggles);
                        });
                    }

                    param.$ui = $select; // [skywiki] custom way of doing much less involved "param.ooui"
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
                    param.toggles = helper.parseToggles(param.rawtogs, 'true');

                    if (
                        param.def === 'true' ||
                        (param.range !== undefined && param.def === param.range.split(',')[0])
                    ) {
                        $input.prop('checked', true);
                    }
                    
                    
                    if ( Object.keys(param.toggles).length > 0 ) {
                        $input.on('change', function(){
                            helper.toggle.call(self, this.checked ? "true" : "false", param.toggles);
                        });
                    }

                    param.$ui = $input; // [skywiki] custom way of doing much less involved "param.ooui"
                    $td.append($input);
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

                    param.$ui = $input; // [skywiki] custom way of doing much less involved "param.ooui"
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
        
        self.indexkeys = {};
        
        self.tParams.forEach(function (param, index) {
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

            // Add item to indexkeys
            self.indexkeys[param.name] = index;
        });

        // Run toggle for each field, check validity
        self.tParams.forEach( function (param) {
            if (param.toggles && Object.keys(param.toggles).length > 0) {
                var val;
                // if (param.type === 'buttonselect') {
                //     val = param.ooui.findSelectedItem().getData();
                // } else if (param.type === 'check') {
                //     val = param.ooui.isSelected() ? 'true' : 'false';
                // } else if (param.type === 'toggleswitch' || param.type === 'togglebutton') {
                //     val = param.ooui.getValue() ? 'true' : 'false';
                // } else {
                //     val = param.ooui.getValue();
                // }
                // [skywiki] note: hacky version of the above to get it working on fandom
                if (param.type === 'check') {
                    val = param.$ui[0].checked ? 'true' : 'false';
                } else {
                    val = param.$ui.val();
                }
                helper.toggle.call(self, val, param.toggles);
            }
            // if (param.type === 'number' || param.type === 'int' || param.type === 'rsn') {
            //     param.ooui.setValidityFlag();
            // }
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
    
    hsb.calc = {};
    hsb.calc.lookup = lookupCalc;

}(jQuery, mediaWiki, hsbwiki));