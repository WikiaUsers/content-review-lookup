/** <nowiki>
 * Flexible form script for SOAP Wiki reports
 *
 * @author Lil' Miss Rarity - original author
 * @author Joeytje50        - i18n fixes and dropdown
 * @author Jr Mime          - pop-up layout, variables
 * @author VegaDark         - soap adaption
 * @author Cqm              - Major cleanup/rewrite
 * @author TK-999           - wds buttons
 * @author Noreplyz         - i18n fixes, template, design
 *
 * TODO check if this script is needed before loading i18n
 * @license: CC-BY-NC-SA
 */

(function(mw, $) {
    var c = mw.config.get([
            'wgNamespaceNumber',
            'wgPageName',
            'wgServer',
            'wgUserName',
            'wgUserLanguage'
        ]),
        options = {
            profile: {},
            vandalism: {},
            spam: {}, 
            phalanx: {},
            wiki: {}
        },
        windowManager,
        reportModal,
        reportDropdown;

    /**
     * Set up options for use in forms, buttons
     */

    function setOptions() {
        if(typeof window.dev === 'undefined' || typeof window.dev.i18n === 'undefined') {
            importScriptPage('MediaWiki:I18n-js/code.js', 'dev');
        }
        mw.hook('dev.i18n').add(function(i18no) {
            i18no.loadMessages('u:soap:MediaWiki:Custom-Reports/i18n.json').done(function(i18n) {
                options = {

                    /* 
                    //BEGIN EXAMPLE
                    example: {
                        page: 'Page name the form is for',
                        buttonText: 'Text for button to open form',
                        form: 'HTML form for reporting users. Each input/textarea should have an id. any optional inputs should be marked with the `optional` class. If any attributes need URI encoding, the relevant inputs should have the `data-encode` attribute set to `true`.',
                        // this is where the input ids in the form are matched to numbers
                        // for use in the summary/submitted text
                        formParams: {
                            '$1': 'foo',
                            '$2': 'bar'
                        },
                        submitText: 'Text to submit to the page. Any form parameters can be inserted via the key names in `formParams`',
                        summary: 'Text used for the edit summary. Any form parameters can be inserted via the key names in `formParams`',
                        sectionTitle: 'Text used as the section title. Any form parameters can be inserted via the key names in `formParams`'
                    },
                    // END EXAMPLE
                    */

                    profile: {
                        page: 'Report:User_profile_headers',
                        buttonText: i18n.msg("buttonProfile").escape(),
                        form: '<form class="WikiaForm ReportForm" method="" name="" id="profile">' +
                                '<fieldset>' +
                                    '<div class="rf-wrapper">' +
                                        '<div class="rf-section" style="color:#F00;font-size:16px;"><b>' + i18n.msg("formSocial").escape() + '</b></div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="rf-wikiname optional" type="text" placeholder="' + i18n.msg("formphWikiName").escape() + '"/>' +
                                        '</div>' + 
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiURL").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="rf-wikiurl" type="text" placeholder="soap.fandom.com"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formUsername").escape() + '</b> ' + i18n.msg("formOfBadUser").escape() + ' (' + i18n.msg("formMultipleUsers").escape() + ')</div>' +
                                            '<textarea name="" id="user" class="rf-wikiuser" type="text" placeholder="Rappy 4187\nDucksoup"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formReason").escape() + '</b></div>' +
                                            '<textarea name="" id="comment" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section">' +
                                            '<div class="rf-checkbox rf-socks"><input type="checkbox" id="socks" class="option-input optional"/><label for="socks">' + i18n.msg("formSockpuppet").escape() + '</label>' + 
                                                '<div class="rf-section rf-socks-box"><div class="rf-section-title"><b>' + i18n.msg("formUsername").escape() + '</b> ' + i18n.msg("formOfSock").escape() +
                                                    '<textarea name="" id="sockusers" class="rf-socks optional" type="text" placeholder="Rappy 4187\nDucksoup"></textarea>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' + 
                                        '<div class="rf-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiurl',
                            '$2': 'wikiname',
                            '$3': 'user',
                            '$4': 'comment',
                            '$5': 'user', // for different styling
                            '$7': 'socks',
                            '$8': 'sockusers'
                        },
                        submitText: '{{Report profile|$1\n' +
                            '|$4\n' +
                            '|$3\n' +
                            '$7$8' +
                            '|' + c.wgUserName + '|' + '~~' + '~~' + '~}}',
                        summary: 'New profile report ($2, $5)',
                        sectionTitle: '$2'
                    },
                    vandalism: {
                        page: 'Report:Vandalism',
                        buttonText: i18n.msg("buttonVandalism").escape(),
                        form: '<form class="WikiaForm ReportForm" method="" name="" id="vandalism">' +
                                '<fieldset>' +
                                    '<div class="rf-wrapper">' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="rf-wikiname optional" type="text" placeholder="SOAP Wiki"/>' +
                                        '</div>' + 
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiURL").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="rf-wikiurl" type="text" placeholder="soap.fandom.com"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formUsername").escape() + '</b> ' + i18n.msg("formOfBadUser").escape() + ' (' + i18n.msg("formMultipleUsers").escape() + ')</div>' +
                                            '<textarea name="" id="user" class="rf-wikiuser" type="text" placeholder="Merrystar\nBertH"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formReason").escape() + '</b></div>' +
                                            '<textarea name="" id="comment" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section">' +
                                            '<div class="rf-checkbox"><input type="checkbox" id="crosswiki" class="option-input optional"/><label for="crosswiki">' + i18n.msg("formCrossWiki").escape() + '</label></div>' +
                                        '</div>' + 
                                        '<div class="rf-section">' +
                                            '<div class="rf-checkbox rf-socks"><input type="checkbox" id="socks" class="option-input optional"/><label for="socks">' + i18n.msg("formSockpuppet").escape() + '</label>' + 
                                                '<div class="rf-section rf-socks-box"><div class="rf-section-title"><b>' + i18n.msg("formUsername").escape() + '</b> ' + i18n.msg("formOfSock").escape() +
                                                    '<textarea name="" id="sockusers" class="rf-socks optional" type="text" placeholder="Rappy 4187\nDucksoup"></textarea>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' + 
                                        '<div class="rf-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiurl',
                            '$2': 'wikiname',
                            '$3': 'user',
                            '$4': 'comment',
                            '$5': 'user', // for different styling
                            '$6': 'crosswiki',
                            '$7': 'socks',
                            '$8': 'sockusers'
                        },
                        submitText: '{{Report vandalism|$1\n' +
                            '|$4\n' +
                            '|$3\n' +
                            '$6$7$8' +
                            '|' + c.wgUserName + '|' + '~~' + '~~' + '~}}',
                        summary: 'New vandalism report ($1, $5)',
                        sectionTitle: '$5 at $2'
                    },
                    spam: {
                        page: 'Report:Spam',
                        buttonText: i18n.msg("buttonSpam").escape(),
                        form: '<form class="WikiaForm ReportForm" method="" name="" id="spam">' +
                                '<fieldset>' +
                                    '<div class="rf-wrapper">' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="rf-wikiname optional" type="text" placeholder="' + i18n.msg("formphWikiName").escape() + '"/>' +
                                        '</div>' + 
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiURL").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="rf-wikiurl" type="text" placeholder="soap.fandom.com"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formUsername").escape() + '</b> ' + i18n.msg("formOfBadUser").escape() + ' (' + i18n.msg("formMultipleUsers").escape() + ')</div>' +
                                            '<textarea name="" id="user" class="rf-wikiuser" type="text" placeholder="Rappy 4187\nDucksoup"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formReason").escape() + '</b></div>' +
                                            '<textarea name="" id="comment" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section">' +
                                            '<div class="rf-checkbox"><input type="checkbox" id="crosswiki" class="option-input optional"/><label for="crosswiki">' + i18n.msg("formCrossWiki").escape() + '</label></div>' +
                                        '</div>' + 
                                        '<div class="rf-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiurl',
                            '$2': 'wikiname',
                            '$3': 'user',
                            '$4': 'comment',
                            '$5': 'user', // for different styling
                            '$6': 'crosswiki',
                        },
                        submitText: '{{Report spam|$1\n' +
                            '|$4\n' +
                            '|$3\n' +
                            '$6' +
                            '|' + c.wgUserName + '|' + '~~' + '~~' + '~}}',
                        summary: 'New spam report ($1, $5)',
                        sectionTitle: '$5 at $2'
                    },
                    phalanx: {
                        page: 'Report:Spam_filter_problems',
                        buttonText: i18n.msg("buttonFalsePositive").escape(),
                        form: '<form class="WikiaForm ReportForm" method="" name="" id="phalanx">' +
                                '<fieldset>' +
                                    '<div class="rf-wrapper">' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="rf-wikiname optional" type="text" placeholder="' + i18n.msg("formphWikiName").escape() + '"/>' +
                                        '</div>' + 
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiPage").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="rf-wikiurl" type="text" placeholder="soap.fandom.com"/>' +
                                            '<span class="rf-httpend">/wiki/</span>' +
                                            '<input id="wikipage" class="rf-wikiurl" type="text" placeholder="Report:Spam_filter_problems"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formBlockID").escape() + '</b></div>' +
                                            '<input id="blockid" class="rf-wikiurl" type="text" placeholder="12345" data-encode="true"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formPhalanxReason").escape() + '</b></div>' +
                                            '<textarea name="" id="comment" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></textarea>' +
                                        '</div>' +
                                        '<div class="rf-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiurl',
                            '$2': 'wikiname',
                            '$5': 'wikipage',
                            '$3': 'blockid',
                            '$4': 'comment'
                        },
                        submitText: '{{Report filter|$1\n' +
                            '|$5\n' +
                            '|$3\n' + 
                            '|$4\n' + 
                            '|' + c.wgUserName + '|' + '~~' + '~~' + '~}}',
                        summary: 'New filter report ($2, #$3)',
                        sectionTitle: 'Block #$3 on $2'
                    },
                    wiki: {
                        page: 'Report:Wiki',
                        buttonText: i18n.msg("buttonWiki").escape(),
                        form: '<form class="WikiaForm ReportForm" method="" name="" id="wiki">' +
                                '<fieldset>' +
                                    '<div class="rf-wrapper">' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="rf-wikiname optional" type="text" placeholder="' + i18n.msg("formphWikiName").escape() + '"/>' +
                                        '</div>' + 
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formWikiURL").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="rf-wikiurl" type="text" placeholder="soap.fandom.com"/>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("formReason").escape() + '</b></div>' +
                                            '<input name="" id="comment" type="text" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></input>' +
                                        '</div>' +
                                        '<div class="rf-section"><div class="rf-section-title"><b>' + i18n.msg("GuidelinesTitle").plain() + '</b></div>' +
                                        i18n.msg("GuidelinesText").plain() +
                                        '</div>' +
                                        '<div class="rf-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiname',
                            '$2': 'wikiurl',
                            '$3': 'comment'
                        },
                        submitText: '{{badwiki|$2|$3}}',
                        summary: 'New bad wiki report ([[w:c:$2|$1]], comment: $3)',
                        sectionTitle: ''
                    },
                };
                reportDropdown = '<div class="wds-dropdown">' + 
                '<div class="wds-dropdown__toggle wds-button">' +  
                '<span>' + i18n.msg("buttonReport").escape() + '</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><path d="M1 3h10L6 9z"></path></svg>' + 
                '</div>' + 
                '<div class="wds-dropdown__content">' + 
                '<ul class="wds-list wds-is-linked" id="rf-dropdown-list">' + 
                '</ul>' + 
                '</div>' + 
                '</div>'
            }).done(init);
        });
    }

    /**
     * Report form submission handler
     *
     * @param opts {object}
     */
    function submitForm(opts) {
        var $form = $('.soap-reports form'),
            $inputs = $form.find('input, textarea'),
            $button = $('.soap-reports #submit'),
            params = {},
            x,
            y,
            $input,
            text;
        if (($button).attr('disabled') === 'disabled') {
            return;
        }

        $button.attr('disabled', true);
        var keyedValueCount = 0,
            sockCount = 0;

        for (x in opts.formParams) {
            if (opts.formParams.hasOwnProperty(x)) {
                $input = $inputs.filter('#' + opts.formParams[x]);

                if (!$input.length) {
                    console.log('An error has been found in the form config. Please check the formParams and input ids');
                    $button.attr('disabled', false);
                    return $.Deferred().resolve();
                }

                text = $input.val();
                if ($input.is(':checkbox')) {
                    text = $input.prop("checked");
                }

                if (!text && !$input.hasClass('optional')) {
                    console.log($input);
                    alert('One or more required fields are missing. Please check your submission and try again.');
                    $button.attr('disabled', false);
                    return $.Deferred().resolve();
                }

                /* Specific customisations for each form output */

                if ($input.attr('data-encode') === 'true') {
                    text = encodeURIComponent(text);
                }

                // default wikiname
                if($input.attr('id') == "wikiurl") {
                    re = /\/\/(.*)\.(wikia|fandom|gamepedia)\./;
                    domain = re.exec(text);
                    if(domain != null) {
                        params[x] = domain[1];
                        continue;
                    }
                } else if($input.attr('id') === "wikiname") {
                    if (!text) {
                        text = $inputs.filter('#wikiurl').val();
                    }
                    re = /\/\/(.*)\.(wikia|fandom|gamepedia)\./;
                    domain = re.exec(text);
                    if(domain != null) {
                        params[x] = domain[1].charAt(0).toUpperCase() + domain[1].slice(1) + " Wiki";

                        continue;
                    }
                }
                
                // handle multiple users
                if($input.attr('id') == "user" && text.indexOf('\n') !== -1) {
                    if (x === '$5') {
                        text = (text.match(/(?:\r\n|\r|\n)/g) || []).length + 1 + ' users';
                    } else {
                        text = text.replace(/\n$/g, ''); // fix blank last user
                        text = text.replace(/(?:\r\n|\r|\n)/g,'\n|');
                    }
                }

                // handle checkboxes
                if ($input.attr('id') == "crosswiki") {
                    if (text) {
                        text = "\\crosswiki=yes\n"
                        keyedValueCount++;
                    } else {
                        text = ""
                    }
                }
                if ($input.attr('id') == "socks") {
                    if (text) {
                        sockCount = 1;
                        keyedValueCount++;
                    }
                    text = ""
                }

                // handle socks
                if ($input.attr('id') == "sockusers") {
                    if (text === "" && sockCount) {
                        alert('One or more required fields are missing. Please check your submission and try again.');
                        $button.attr('disabled', false);
                        return $.Deferred().resolve();
                    } else if (sockCount) {
                        text = "\\socks=" + text + '\n';
                    } else {
                        text = "";
                    }
                }

                // patch | in reason
                if ($input.attr('id') == "comment") {
                    text = text.replace(/\|/g, '\\\\');
                }

                params[x] = text;
            }
        }

        for (x in params) {
            if (params.hasOwnProperty(x)) {
                // convert to regex so the same parameter can be used multiple times in each string
                y = new RegExp(x.replace(/\$/, '\\$'), 'g');
                opts.submitText = opts.submitText.replace(y, params[x]);
                opts.summary = opts.summary.replace(y, params[x]);
                opts.sectionTitle = opts.sectionTitle.replace(y, params[x]);
            }
        }

        // Fix when template thinks = is a key
        if (opts.submitText.match(/=/g) != null && opts.submitText.match(/=/g).length > keyedValueCount) {
            var templateParam = 0;
            opts.submitText = opts.submitText.replace(/\|/g, function (match, i, original) {
                templateParam++;
                return '|' + templateParam + '=';
            });
        }
        if (keyedValueCount) {
            opts.submitText = opts.submitText.replace(/\\crosswiki/g, '|crosswiki');
            opts.submitText = opts.submitText.replace(/\\socks/g, '|socks');
        }

        console.log(opts.submitText, opts.summary);

        if(opts.page === "Report:Wiki") {
            return (new mw.Api())
                .post({
                    action: 'edit',
                    title: opts.page,
                    appendtext: '\n' + opts.submitText,
                    summary: opts.summary,
                    token: mw.user.tokens.get('editToken')
            })
            .done(function (res) {
                if (c.wgPageName == "SOAP_Wiki") {
                    location.replace('https://soap.fandom.com/wiki/' + opts.page + '?action=purge');
                } else {
                    location.reload(location + '?action=purge');
                }
            });
        } else {
            return (new mw.Api())
                .post({
                    action: 'edit',
                    title: opts.page,
                    section: 'new',
                    sectiontitle: opts.sectionTitle,
                    text: opts.submitText,
                    summary: opts.summary,
                    token: mw.user.tokens.get('editToken')

            })
            .done(function (res) {
                if (c.wgPageName == "SOAP_Wiki") {
                    location.replace('https://soap.fandom.com/wiki/' + opts.page + '?action=purge');
                } else {
                    location.reload(location + '?action=purge');
                }
            });
        }
    }

    /**
     * Loads the report form
     */
    function loadForm() {
        var $this = $(this),
            type = $this.attr('id').split('-')[2],
            opts = options[type];

        if (windowManager) {
            windowManager.openWindow(reportDialog);
        } else {
            function ReportDialog(config) {
                ReportDialog.super.call(this, config);
            }
            OO.inheritClass(ReportDialog, OO.ui.ProcessDialog);

            ReportDialog.static.name = 'report-dialog';
            ReportDialog.static.title = opts.buttonText;
            ReportDialog.static.actions = [
                { label: 'Cancel', flags: ['safe', 'close'] },
                { label: 'Submit', action: 'submit', flags: ['secondary'] },
            ];

            // initialise dialog, append content
            ReportDialog.prototype.initialize = function () {
                ReportDialog.super.prototype.initialize.apply(this, arguments);
                this.content = new OO.ui.PanelLayout({
                    padded: true,
                    expanded: true
                });
                this.content.$element.append(opts.form);
                this.$body.append(this.content.$element);
                this.$content.addClass('vstf-ui-Dialog');
                this.$content.addClass('soap-reports');
            };

            // Handle actions
            ReportDialog.prototype.getActionProcess = function (action) {
                if (action === 'submit') {
                    var dialog = this;
                    dialog.pushPending();
                    dialog.actions.others[0].pushPending();
                    submitForm(opts).then(function() {
                        dialog.popPending();
                        dialog.actions.others[0].popPending();
                    }); // disable the Submit button
                }
                return ReportDialog.super.prototype.getActionProcess.call(this, action);
            };

            // Create the Dialog and add the window manager.
            windowManager = new OO.ui.WindowManager({
                classes: ['vstf-windowManager']
            });
            $(document.body).append(windowManager.$element);
            // Create a new dialog window.
            reportDialog = new ReportDialog({
                size: 'larger'
            });
            // Add window and open
            windowManager.addWindows([reportDialog]);
            windowManager.openWindow(reportDialog);

            // Close dialog when clicked outside the dialog
            reportDialog.$frame.parent().on('click', function (e) {
                if (!$(e.target).closest('.vstf-ui-Dialog').length) {
                    reportDialog.close();
                }
            });

            // Expand dialog when socks is clicked
            $('#socks, label[for=socks]').on('click', function (e) {
                setTimeout(function(){
                    reportDialog.updateSize();
                }, 600);
            });

            mw.hook('soap.reportsform').fire();
        }
    }

    /**
     * Loads the report form button
     * 
     * @param type {string}
     */
    function loadButton(type) {
        var opts = options[type];
        var $newButton = $('<span>', {
            'class': 'wds-button',
            click: loadForm,
            id: 'soap-report-' + type,
            text: opts.buttonText
        });

        $('.rb-' + type)
            .empty()
            .append($newButton);
        // Fire hook for scripts that use the button 
        mw.hook('soap.reports').fire($newButton);
    }

    /**
     * loads dropdown of all report possibilities
     */
    function loadDropdown() {
        $('.rf-dropdown')
            .empty()
            .append(reportDropdown);

        var x;
        for (x in options) {
            var opts = options[x];
            if (options.hasOwnProperty(x)) {
                $('#rf-dropdown-list').append(
                    $('<li>')
                        .attr('id', 'soap-report-' + x)
                        .attr('class', 'wds-global-navigation__dropdown-link')
                        .on('click',loadForm)
                        .text(opts.buttonText)
                );
            }
        }
    }

    /**
     * start up method
     */
    function init() {
        mw.loader.using(['oojs-ui-windows'], function() {
            for (var x in options) {
                if ($('.rb-' + x).length > 0) {
                    loadButton(x);
                }
            }
            if ($('.rf-dropdown').length > 0) {
                loadDropdown(x);
            }
            importStylesheetURI('https://soap.fandom.com/index.php?title=MediaWiki:Reports.css&action=raw&ctype=text/css');
        });
    }

    $(setOptions);

})(this.mediaWiki, this.jQuery);