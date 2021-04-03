/** <nowiki>
 * Originally a flexible form script for SOAP Wiki reports
 * Adapted to work for Community Central adoptions by Cörey
 *
 * @author Lil' Miss Rarity - original author
 * @author Joeytje50        - i18n fixes and dropdown
 * @author Jr Mime          - pop-up layout, variables
 * @author VegaDark         - soap adaption
 * @author Cqm              - Major cleanup/rewrite
 * @author TK-999           - wds buttons
 * @author Noreplyz         - i18n fixes, template, design
 * @author Cörey            - Adapted to work for Community Central adoptions
 *
 * TODO check if this script is needed before loading i18n
 * @license: CC-BY-NC-SA
 */

require(['jquery', 'mw'], function ($, mw) {
    var c = mw.config.get([
            'wgNamespaceNumber',
            'wgPageName',
            'wgServer',
            'wgUserName',
            'wgUserLanguage'
        ]),
        options = {
            moviestv: {}
        },
        adoptionDropdown;

    /**
     * Set up options for use in forms, buttons
     */

    function setOptions() {
        if(typeof window.dev === 'undefined' || typeof window.dev.i18n === 'undefined') {
            importScriptPage('MediaWiki:I18n-js/code.js', 'dev');
        }
        mw.hook('dev.i18n').add(function(i18no) {
            i18no.loadMessages('u:corey:MediaWiki:Custom-Adoptions/i18n.json').done(function(i18n) {
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

                    moviestv: {
                        page: 'Adoption:TV/Movie_requests',
                        buttonText: i18n.msg("buttonProfile").escape(),
                        form: '<form class="WikiaForm AdoptionsForm" method="" name="" id="moviestv">' +
                                '<fieldset>' +
                                    '<div class="af-wrapper">' +
                                        '<div class="af-section"><div class="af-section-title"><b>' + i18n.msg("formWikiName").escape() + '</b></div>' +
                                            '<input id="wikiname" class="af-wikiname optional" type="text" placeholder="' + i18n.msg("formphWikiName").escape() + '"/>' +
                                        '</div>' +
                                        '<div class="af-section"><div class="af-section-title"><b>' + i18n.msg("formWikiURL").escape() + '</b></div>' +
                                            '<input id="wikiurl" class="af-wikiurl" type="text" placeholder="harrypotter.fandom.com"/>' +
                                        '</div>' +
                                        '<div class="rf-section">' +
                                            '<div class="rf-checkbox"><input type="checkbox" id="timerequirement" class="option-input optional"/><label for="timerequirement">' + i18n.msg("formTimeRequirement").escape() + '</label></div>' +
                                        '</div>' + 
                                        '<div class="af-section"><div class="af-section-title"><b>' + i18n.msg("formExtraDetails").escape() + '</b></div>' +
                                            '<textarea name="" id="comment" placeholder="' + i18n.msg("formphReason").escape() + '" class="optional"></textarea>' +
                                        '</div>' +
                                        '<div class="af-section" style="color:#F00; font-size:16px; display:none;" id="formAnon"><b>' + i18n.msg("formAnon").escape() + '</b></div>' +
                                    '</div>' +
                                '</fieldset>' +
                            '</form>',
                        formParams: {
                            '$1': 'wikiurl',
                            '$2': 'wikiname',
                            '$3': 'user',
                            '$4': 'timerequirement',
                            '$5': 'comment'
                        },
                        submitText: '{{Report profile|$1\n' +
                            '|$4\n' +
                            '|$3\n' +
                            '$7$8' +
                            '|' + c.wgUserName + '|' + '~~' + '~~' + '~}}',
                        summary: 'New profile report ($2, $5)',
                        sectionTitle: '$2'
                    },
                };
                adoptionDropdown = '<div class="wds-dropdown">' +
                '<div class="wds-dropdown__toggle wds-button">' +
                '<span>' + i18n.msg("buttonReport").escape() + '</span>' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><path d="M1 3h10L6 9z"></path></svg>' +
                '</div>' +
                '<div class="wds-dropdown__content">' +
                '<ul class="wds-list wds-is-linked" id="af-dropdown-list">' +
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
        var $form = $('#requestWindow form'),
            $inputs = $form.find('input, textarea'),
            $button = $('#submit'),
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
                    return;
                }

                text = $input.val();
                if ($input.is(':checkbox')) {
                    text = $input.prop("checked");
                }

                if (!text && !$input.hasClass('optional')) {
                    console.log($input);
                    alert('One or more required fields are missing. Please check your submission and try again.');
                    $button.attr('disabled', false);
                    return;
                }

                /* Specific customisations for each form output */

                if ($input.attr('data-encode') === 'true') {
                    text = encodeURIComponent(text);
                }

                // default wikiname
                if($input.attr('id') == "wikiurl") {
                    re = /\/\/(.*)\.(wikia|fandom)\./;
                    domain = re.exec(text);
                    if(domain != null) {
                        params[x] = domain[1];
                        continue;
                    }
                } else if($input.attr('id') === "wikiname") {
                    if (!text) {
                        text = $inputs.filter('#wikiurl').val();
                    }
                    re = /\/\/(.*)\.(wikia|fandom)\./;
                    domain = re.exec(text);
                    if(domain != null) {
                        params[x] = domain[1].charAt(0).toUpperCase() + domain[1].slice(1) + " Wiki";

                        continue;
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

        console.log(opts.submitText, opts.summary);

        if(opts.page === "Adoption:TV/Movie_requests") {
            (new mw.Api())
                .post({
                    action: 'edit',
                    title: opts.page,
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
        } else {
            (new mw.Api())
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

        $.showCustomModal(
            opts.buttonText,
            opts.form,
            {
                id: 'requestWindow',
                width: 650,
                buttons: [{
                    id: 'cancel',
                    message: 'Cancel',
                    handler: function () {
                        $('#requestWindow').closeModal();
                    }
                }, {
                    id: 'submit',
                    defaultButton: true,
                    message: 'Save',
                    handler: function () {
                        submitForm(opts);
                    }
                }],
                callback: function() {
                    // Fire hook for scripts that use the form
                    mw.hook('community.newadoption').fire();

                    if (!mw.config.get("wgUserName")) {
                        $("#formAnon").css("display", "block");
                        $("#submit").attr("disabled", "disabled");
                    }
                }
            }
        );
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
            id: 'community-adoption-' + type,
            text: opts.buttonText
        });

        $('.ab-' + type)
            .empty()
            .append($newButton);
    }

    /**
     * loads dropdown of all report possibilities
     */
    function loadDropdown() {
        $('.af-dropdown')
            .empty()
            .append(adoptionDropdown);

        var x;
        for (x in options) {
            var opts = options[x];
            if (options.hasOwnProperty(x)) {
                $('#af-dropdown-list').append(
                    $('<li>')
                        .attr('id', 'community-adoption-' + x)
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
        for (var x in options) {
            if ($('.ab-' + x).length > 0) {
                loadButton(x);
            }
        }
        if ($('.af-dropdown').length > 0) {
            loadDropdown(x);
        }
        importStylesheetURI('https://corey.fandom.com/index.php?title=MediaWiki:Adoptions.css&action=raw&ctype=text/css');
    }

    $(setOptions);

});