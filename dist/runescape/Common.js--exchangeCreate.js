/** <nowiki>
 * For editing exchange data and creating exchange pages/modules
 *
 * @author Cqm
 */

/*global mediaWiki, rswiki */

/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:false, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/

;(function ($, mw, rs) {

    'use strict';

    var conf = mw.config.get([
            'debug',
            'skin',
            'wgNamespaceNumber',
            'wgServer',
            'wgTitle',
            'wgUserGroups'
        ]),

        self = {
            // placeholders
            data: {},
            item: null,
            dataStr: null,

            /**
             * Startup method
             *
             * Checks for the correct environment before proceeding
             * @example subpage of [[Module:Exchange]]
             * @example Exchange namespace page
             */
            init: function () {
                // don't load for non-autoconfirmed
                // if changing this, make sure it matches [[Special:AbuseFilter/47]]
                if (conf.wgUserGroups.indexOf('autoconfirmed') === -1) {
                    return;
                }

                if (
                    // [[Module:Exchange]] subpage
                    (conf.wgNamespaceNumber === 828 && conf.wgTitle.indexOf('Exchange/') === 0) ||
                    // Exchange ns page
                    conf.wgNamespaceNumber === 112
                ) {
                    // load missing jquery ui theme in oasis, not loaded by default for some reason
                    if (conf.skin === 'oasis') {
                        mw.loader.load(conf.wgServer + '/resources/jquery.ui/themes/default/jquery.ui.theme.css', 'text/css');
                    }

                    self.addButton();
                }
            },

            /**
             * Adds a button to generate modal for creating new exchange pages
             */
            addButton: function () {
                var noArticle = !!$('#noarticletext').length,
                    text = (noArticle ? 'Create exchange page(s)' : 'Edit exchange data'),
                    $anchor;

                if (conf.skin === 'monobook') {
                    $anchor = $('<li>')
                        .attr('id', 't-exchange')
                        .append(
                            $('<a>')
                                .attr({
                                    id: 'rs-exchange-data',
                                    href: '#'
                                })
                                .on('click', self.createModal)
                                .text(text)
                        );

                    $('#p-tb .pBody ul').append($anchor);
                } else {
                    $anchor = $('<a>')
                        .addClass('wds-is-squished wds-button')
                        .attr({
                            id: 'rs-exchange-data',
                            href: '#'
                        })
                        .css({
                            'margin-left': '3px',
                            'margin-bottom': '5px'
                        })
                        .on('click', self.createModal)
                        .text(text);

                    $('#mw-content-text').prepend($anchor);
                }
            },

            /**
             * Creates a modal to input exchange data
             *
             * @param e {jquery.event}
             */
            createModal: function (e) {
                e.preventDefault();

                // skip rebuilding if already done
                if ($('#rs-ex-dialog').length) {
                    $('#rs-ex-dialog').dialog('open');
                    self.loadModuleData(self.item);
                    return;
                }

                var item = conf.wgTitle.replace('Exchange/', '').replace('/Data', '' ),
                    $dialog = $('<div>')
                        .addClass('dialog')
                        .attr({
                            id: 'rs-ex-dialog',
                            title: 'Editing exchange data for ' + item
                        })
                        .append(
                            $('<div>')
                                .attr('id', 'rs-ex-status'),
                            $('<div>')
                                .attr('id', 'rs-ex-form')
                                .append(
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-id')
                                                .text('Item Id')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s id on the RuneScape GED')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-id',
                                                    type: 'number'
                                                })
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-icon')
                                                .text('Icon')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s icon file, without the File: prefix')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-icon',
                                                    type: 'text'
                                                })
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-value')
                                                .text('Value')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s value, used to calculate alchemy output')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-value',
                                                    type: 'number'
                                                })
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-limit')
                                                .text('Limit')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s 4 hourly buying limit')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-limit',
                                                    type: 'number'
                                            })
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-members')
                                                .text('Members')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'Check if the item is members only')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-members',
                                                    type: 'checkbox'
                                                })
                                                .prop('checked', false)
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-alchable')
                                                .text('Alchable')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'Check if the item can have alchemy spells cast on it')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-alchable',
                                                    type: 'checkbox'
                                                })
                                                .prop('checked', false)
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .text('Category')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s category according to the RuneScape GED')
                                                        .text('(?)')
                                                ),
                                            $('<select>')
                                                .addClass('rs-ex-select')
                                                .attr('id', 'rs-ex-category')
                                                .append(
                                                    $('<option>')
                                                        .val('Unknown')
                                                        .text('Unknown'),
                                                    $('<option>')
                                                        .val('Ammo')
                                                        .text('Ammo'),
                                                    $('<option>')
                                                        .val('Arrows')
                                                        .text('Arrows'),
                                                    $('<option>')
                                                        .val('Bolts')
                                                        .text('Bolts'),
                                                    $('<option>')
                                                        .val('Construction materials')
                                                        .text('Construction materials'),
                                                    $('<option>')
                                                        .val('Construction products')
                                                        .text('Construction products'),
                                                    $('<option>')
                                                        .val('Cooking ingredients')
                                                        .text('Cooking ingredients'),
                                                    $('<option>')
                                                        .val('Costumes')
                                                        .text('Costumes'),
                                                    $('<option>')
                                                        .val('Crafting materials')
                                                        .text('Crafting materials'),
                                                    $('<option>')
                                                        .val('Familiars')
                                                        .text('Familiars'),
                                                    $('<option>')
                                                        .val('Farming produce')
                                                        .text('Farming produce'),
                                                    $('<option>')
                                                        .val('Fletching materials')
                                                        .text('Fletching materials'),
                                                    $('<option>')
                                                        .val('Food and Drink')
                                                        .text('Food and Drink'),
                                                    $('<option>')
                                                        .val('Herblore materials')
                                                        .text('Herblore materials'),
                                                    $('<option>')
                                                        .val('Hunting equipments')
                                                        .text('Hunting equipments'),
                                                    $('<option>')
                                                        .val('Hunting Produce')
                                                        .text('Hunting Produce'),
                                                    $('<option>')
                                                        .val('Jewellery')
                                                        .text('Jewellery'),
                                                    $('<option>')
                                                        .val('Mage armour')
                                                        .text('Mage armour'),
                                                    $('<option>')
                                                        .val('Mage weapons')
                                                        .text('Mage weapons'),
                                                    $('<option>')
                                                        .val('Melee armour - high level')
                                                        .text('Melee armour - high level'),
                                                    $('<option>')
                                                        .val('Melee armour - low level')
                                                        .text('Melee armour - low level'),
                                                    $('<option>')
                                                        .val('Melee armour - mid level')
                                                        .text('Melee armour - mid level'),
                                                    $('<option>')
                                                        .val('Melee weapons - high level')
                                                        .text('Melee weapons - high level'),
                                                    $('<option>')
                                                        .val('Melee weapons - low level')
                                                        .text('Melee weapons - low level'),
                                                    $('<option>')
                                                        .val('Melee weapons - mid level')
                                                        .text('Melee weapons - mid level'),
                                                    $('<option>')
                                                        .val('Mining and Smithing')
                                                        .text('Mining and Smithing'),
                                                    $('<option>')
                                                        .val('Miscellaneous')
                                                        .text('Miscellaneous'),
                                                    $('<option>')
                                                        .val('Pocket items')
                                                        .text('Pocket item'),
                                                    $('<option>')
                                                        .val('Potions')
                                                        .text('Potions'),
                                                    $('<option>')
                                                        .val('Prayer armour')
                                                        .text('Prayer armour'),
                                                    $('<option>')
                                                        .val('Prayer materials')
                                                        .text('Prayer materials'),
                                                    $('<option>')
                                                        .val('Range armour')
                                                        .text('Range armour'),
                                                    $('<option>')
                                                        .val('Range weapons')
                                                        .text('Range weapons'),
                                                    $('<option>')
                                                        .val('Runecrafting')
                                                        .text('Runecrafting'),
                                                    $('<option>')
                                                        .val('Runes, Spells and Teleports')
                                                        .text('Runes, Spells and Teleports'),
                                                    $('<option>')
                                                        .val('Seeds')
                                                        .text('Seeds'),
                                                    $('<option>')
                                                        .val('Summoning scrolls')
                                                        .text('Summoning scrolls'),
                                                    $('<option>')
                                                        .val('Tools and containers')
                                                        .text('Tools and containers'),
                                                    $('<option>')
                                                        .val('Woodcutting product')
                                                        .text('Woodcutting product')
                                                )
                                        ),
                                    $('<div>')
                                        .addClass('rs-ex-row')
                                        .append(
                                            $('<label>')
                                                .addClass('rs-ex-label')
                                                .attr('for', 'rs-ex-examine')
                                                .text('Examine')
                                                .append(
                                                    ' ',
                                                    $('<span>')
                                                        .addClass('rs-ex-help')
                                                        .attr('title', 'The item\'s examine text')
                                                        .text('(?)')
                                                ),
                                            $('<input>')
                                                .addClass('rs-ex-input')
                                                .attr({
                                                    id: 'rs-ex-examine',
                                                    type: 'text'
                                                })
                                        )
                                )
                        );

                $dialog
                    .dialog({
                        buttons: {
                            Cancel: function () {
                                $(this).dialog('close');
                            },
                            'Lookup GED Data': function () {
                                self.getData();
                            },
                            Submit: function () {
                                self.updateData();
                                $(this).dialog('close');
                            }
                        },
                        dialogClass: 'rs-ex-dialog',
                        draggable: false,
                        modal: true,
                        resizable: false,
                        width: 500
                    });

                $dialog.dialog('open');
                // work around for a jquery ui bug
                // see <https://forum.jquery.com/topic/dialog-button-text-is-missing>
                // @todo is it worth filing this with Wikia?
                $('.rs-ex-dialog').find('.ui-button-text').each(function () {
                    var $this = $(this);

                    $this.text($this.parent().attr('text'));
                    $this.css('padding', '0 1em');
                });

                self.item = item;

                // attempt to autofill data from the item's exchange module
                self.loadModuleData(item);
            },

            /**
             * Attempts to fill in existing data from the module page
             *
             * @param item {string} The name of the item to get the data for
             */
            loadModuleData: function (item) {
                // make sure first letter of item is uppercase
                // otherwise price data won't be found
                item = item.charAt(0).toUpperCase() + item.slice(1);

                (new mw.Api())
                    .get({
                        action: 'query',
                        prop: 'revisions',
                        titles: 'Module:Exchange/' + item,
                        rvprop: 'content',
                        redirects: ''
                    })
                    .done(function (res) {
                        var pages = res.query.pages,
                            content,
                            data;

                        if (pages[-1]) {
                            $('#rs-ex-status').text('No existing data found.');
                            return;
                        }

                        content = pages[Object.keys(pages)[0]].revisions[0]['*'];
                        data = rs.parseExchangeModule(content);
                        mw.log(data);

                        // fill out form with data
                        $('#rs-ex-id').val(data.itemid);
                        $('#rs-ex-icon').val(
                            data.icon
                                .replace(/^'(.*?)'$/, '$1')
                                .replace(/\\'/g, '\'')
                        );
                        $('#rs-ex-value').val(data.value);
                        $('#rs-ex-limit').val(data.limit);
                        $('#rs-ex-members').prop('checked', data.members === 'true');
                        $('#rs-ex-alchable').prop('checked', data.alchable !== 'false');
                        $('#rs-ex-category').val(data.category.replace(/'(.*?)'/, '$1'));
                        $('#rs-ex-examine').val(
                        	 data.examine
                                .replace(/^'(.*?)'$/, '$1')
                                .replace(/\\'/g, '\'')
                        );

                        $('#rs-ex-status').text('Current data loaded.');

                        self.data = data;
                    });
            },

            /**
             * Queries the GED API to find the required item data
             *
             * @example <http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=4798>
             */
            getData: function () {
                var itemid = $('#rs-ex-id').val(),
                    baseURL = 'http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=',
                    via = 'anyorigin',
                    getURL;

                if (!itemid) {
                    alert('Item Id field is missing. Please fill it in and try again.');
                    return;
                }

                // notify when we're trying to load data in case it gets stuck for whetever reason
                $('#rs-ex-status').text('Attempting to load GED data.');

                mw.log(baseURL + itemid);
                getURL = self.crossDomain(baseURL + itemid, via);

                $.getJSON(getURL)
                    .done(function (res) {
                         var data = self.parseData(res, via).item,
                            toUpdate = {
                                category: data.type,
                                examine: data.description,
                                members: data.members === 'true' ? true : false
                            };

                        mw.log(data, toUpdate);

                        // merge in gathered data
                        $('#rs-ex-members').prop('checked', toUpdate.members);
                        $('#rs-ex-examine').val(toUpdate.examine);
                        $('#rs-ex-category').val(toUpdate.category);

                        // not strictly part of the api, but it'll do for a placeholder
                        $('#rs-ex-icon').val(self.item + '.png');

                        $('#rs-ex-status').text('GED data loaded.');
                    });
            },

            /**
             * Wrapper for cross domain queries
             *
             * @param url {string} URL to request
             * @param via {string} Domain to use for request
             *                     Can be one of 'yahoo', 'anyorigin' or 'whateverorigin'
             *                     Defaults to 'whateverorigin'
             *
             * @returns {string} URL to pass to $.ajax
             */
            crossDomain: function ( url, via ) {
                if ( via ==='anyorigin' ) {
                    return '//anyorigin.com/go/?url=' + encodeURIComponent( url ) + '&callback=?';
                } else if (via === 'whateverorigin') {
                    return '//whateverorigin.org/get?url=' + encodeURIComponent( url ) + '&callback=?';
                } else {
                	return "//crossorigin.me/" + url;
                }
            },

            /**
             * Helper for parsing response returned by using url returned by `self.crossDomain`
             *
             * Only used with `self.getPrice`, the result returned by volume data is 
             * more annoying to deal with
             *
             * @param data {object} Data returned from $.ajax call
             * @param via {string} Domain used for cross domain query
             *                     Corresponds to `via` argument in `self.crossDomain`
             *
             * @returns {object} Parsed JSON result
             */
            parseData: function ( data, via ) {
                if ( via === 'anyorigin') {
                    return data.contents;
                } else if (via === 'crossorigin') {
                	return data
                } else {
                    return JSON.parse( data.contents );
                }
            },

            /**
             * Creates exchange modules and pages with the collected data
             */
            createPages: function () {
                var data = self.data,
                    item = self.item,
                    table = 'return {\n' +
                        '    itemId     = ' + data.itemid + ',\n' +
                        '    price      = ' + data.price + ',\n' +
                        '    last       = ' + data.last + ',\n' +
                        '    date       = ' + data.date + ',\n' +
                        '    lastDate   = ' + data.lastdate + ',\n' +
                        // add volume if it exists previously
                        (
                            !!data.volume ?
                                '    volume     = ' + data.volume + ',\n' +
                                '    volumeDate = ' + data.volumedate + ',\n'
                            :
                                ''
                        ) +
                        '    icon       = ' + data.icon + ',\n' +
                        '    item       = ' + data.item + ',\n' +
                        // alchable is only set if it's explicitly false
                        // which is weird and a bit more of a pain to handle
                        // but that's for another day
                        // @example item shards, bonds, divination energy
                        (data.alchable === 'false' ? '    alchable   = false,\n' : '') +
                        '    value      = ' + data.value + ',\n' +
                        '    limit      = ' + data.limit + ',\n' +
                        '    members    = ' + data.members + ',\n' +
                        '    category   = ' + data.category + ',\n' +
                        '    examine    = ' + data.examine + ',\n' +
                        '    usage      = ' + data.usage + '\n' +
                        '}';
                    // priceHistory = 'return {}';

                mw.log(table);

                (new mw.Api())
                    .get({
                        action:'query',
                        prop: 'revisions',
                        titles: (
                            'Exchange:' + item + '|' +
                            'Exchange:' + item + '/Data|' +
                            'Module:Exchange/' + item  + '|' +
                            'Module:Exchange/' + item + '/Data'
                        ),
                        rvprop: 'content',
                        redirects: ''
                    })
                    .done(function (data) {
                        var pages = data.query.pages,
                            excgModuleData,
                            excgPage,
                            excgPageData,
                            reqs = [],
                            x;

                        mw.log(pages);

                        for (x in pages) {
                            if (pages.hasOwnProperty(x)) {
                                if (x < 0) {
                                    continue;
                                }

                                if (pages[x].ns === 828) {
                                    excgModuleData = pages[x];
                                } else if (pages[x].ns === 112) {
                                    if (pages[x].title.indexOf('/Data') > -1) {
                                        excgPageData = pages[x];
                                    } else {
                                        excgPage = pages[x];
                                    }
                                }
                            }
                        }

                        reqs.push(
                            (new mw.Api())
                                .post({
                                    action: 'edit',
                                    title: 'Module:Exchange/' + self.item,
                                    text: table,
                                    summary: 'Updating exchange data via the script',
                                    token: mw.user.tokens.get('editToken')
                                })
                        );


                        if (!excgPage) {
                            reqs.push(
                                (new mw.Api())
                                    .post({
                                        action: 'edit',
                                        title: 'Exchange:' + self.item,
                                        text: '{{ExchangeItem|' + self.item + '}}',
                                        summary: 'Creating exchange page via the script',
                                        token: mw.user.tokens.get('editToken')
                                    })
                            );
                        }

                        if (!excgPageData) {
                            reqs.push(
                                (new mw.Api())
                                    .post({
                                        action: 'edit',
                                        title: 'Exchange:' + self.item + '/Data',
                                        text: '{{ExcgData|' + self.item + '|size={{{size|}}}}}',
                                        summary: 'Creating exchange data page via the script',
                                        token: mw.user.tokens.get('editToken')
                                    })
                            );
                        }

                        if (!excgModuleData && self.dataStr) {
                            reqs.push(
                                excgPage = (new mw.Api())
                                    .post({
                                        action: 'edit',
                                        title: 'Module:Exchange/' + item + '/Data',
                                        text: self.dataStr,
                                        summary: 'Creating exchange module data page via the script',
                                        token: mw.user.tokens.get('editToken')
                                    })
                            );
                        }

                        // hack to get around $.when apparently not working with mw.Api
                        function resolve(arr, i) {
                            arr[i]
                                .done(function (res) {
                                    mw.log(res);

                                    i++;

                                    if (i < arr.length) {
                                        resolve(arr, i);
                                    } else {
                                        alert('Thank you for your submission! The page will now be reloaded.');
                                        if (!conf.debug) {
                                            location.replace('?action=purge');
                                        }

                                    }
                                });
                        }

                        resolve(reqs, 0);
                    });
            },

            /**
             * Updates `self.data` with the values in the form
             */
            updateData: function () {
                var $form = $('#rs-ex-form'),
                    // object containing default data
                    defaultData = {
                        itemid: 'nil',
                        price: 'nil',
                        last: 'nil',
                        date: 'nil',
                        lastDate: 'nil',
                        item: '\'' + self.item.replace(/'/g, '\\\'') + '\'',
                        icon: '\'' + self.item.replace(/'/g, '\\\'') + '.png\'',
                        alchable: 'nil',
                        value: 'nil',
                        limit: 'nil',
                        members: 'nil',
                        category: 'nil',
                        examine: 'nil',
                        usage: '{}'
                    },
                    // object containig data filled out in the form
                    // trim any whitespace
                    // convert booleans to strings
                    formData = {
                        itemid: $form.find('#rs-ex-id').val().trim(),
                        icon: $form.find('#rs-ex-icon').val().trim(),
                        alchable: $form.find('#rs-ex-alchable').prop('checked').toString(),
                        value: $form.find('#rs-ex-value').val().trim(),
                        limit: $form.find('#rs-ex-limit').val().trim(),
                        members: $form.find('#rs-ex-members').prop('checked').toString(),
                        // shouldn't ever be need to be trimmed, but just in case
                        category: $form.find('#rs-ex-category').val().trim(),
                        examine: $form.find('#rs-ex-examine').val().trim()
                    },
                    x;

                for (x in formData) {
                    if (formData.hasOwnProperty(x)) {
                        if (x === 'category') {
                            // allow category to be unset
                            if (formData[x].toLowerCase() === 'unknown') {
                                formData[x] = 'nil';
                            // else add quotes
                            } else {
                                formData[x] = '\'' + formData[x] + '\'';
                            }
                        // delete keys with empty values
                        } else if (formData[x] === '') {
                            delete formData[x];
                        }

                        // add quotes to string keys
                        // category is handled above
                        if (['icon', 'item', 'examine'].indexOf(x) > -1 && !!formData[x]) {
                            // make sure we escape single quotes too
                            formData[x] = '\'' + formData[x].replace(/'/g, '\\\'') + '\'';
                        }
                    }
                }

                self.data = $.extend(defaultData, self.data, formData);
                mw.log(self.data);

                if (self.data.price === 'nil') {
                    // need to get price data first
                    mw.log('Attempting to get price data');
                    self.getPriceData();
                    return;
                }

                self.createPages();
            },

            /**
             * Look up price data using the GED graph API
             *
             * @example <http://services.runescape.com/m=itemdb_rs/api/graph/4798.json>
             */
            getPriceData: function () {
                if (self.data.itemid === 'nil') {
                    mw.log('Unable to lookup price data');
                    self.createPages();
                    return;
                }

                var url = 'http://services.runescape.com/m=itemdb_rs/api/graph/' +
                        self.data.itemid + '.json',
                    via = 'anyorigin',
                    getURL = self.crossDomain(url, via);

                $.getJSON(getURL)
                    .done(function (res) {
                        mw.log(res, self.parseData(res, via));
                        var data = self.parseData(res, via),
                            priceData = {},
                            keys,
                            curPrice,
                            dataStr;

                        if (!data) {
                            mw.log('Something went wrong with the graph data lookup, skipping...');
                            self.createPages();
                            return;
                        }

                        data = data.daily;

                        mw.log(data);

                        $.each(data, function (k, v) {
                            if (!v) {
                                return;
                            }

                            priceData[k] = v;
                        });

                        // extract current price
                        keys = Object.keys(priceData);
                        curPrice = priceData[keys[keys.length - 1]];
                        
                        // sort the keys
                        mw.log(keys);
                        keys.sort(self.compareNums);
                        mw.log(keys);

                        // add current price data into data
                        self.data.price = curPrice;
                        self.data.last = curPrice;
                        self.data.date = '\'~~~~~\'';
                        self.data.lastdate = '\'~~~~~\'';

                        // generate exchange data module string
                        dataStr = 'return {';

                        keys.forEach(function (elem) {
                            dataStr += '\n    \'';
                            if (typeof(elem) == 'string' && elem.length > 10) {
                                dataStr += elem.substring(0, 10);
                            } else {
                                dataStr += elem
                            }
                            dataStr += ':' + priceData[elem] + '\',';
                        });

                        // remove the last comma and add closing bracket
                        dataStr = dataStr.slice(0, -1) + '\n}';
                        mw.log(dataStr);

                        // and store internally ready for later use
                        self.dataStr = dataStr;

                        self.createPages();
                    });
            },

            /**
             * Used by Array.prototype.sort for sorting numbers by size
             *
             * @source <http://mdn.io/sort#Example:_Creating.2C_displaying.2C_and_sorting_an_array>
             */
            compareNums: function ( a, b ) {
                return a - b;
            },
        };

    mw.loader.using(['jquery.ui.dialog', 'mediawiki.api'], function () {
        $(self.init);
    });

}(jQuery, mediaWiki, rswiki));