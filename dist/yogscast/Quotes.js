/** <nowiki>
 * Yogscast Wiki Quote Submissions Form
 * Flexible form script adapted from the VSTF Wiki
 * http://vstf.wikia.com
 *
 * @author Lil' Miss Rarity - original author
 * @author Joeytje50        - i18n fixes and dropdown
 * @author Jr Mime          - pop-up layout, variables
 * @author VegaDark         - vstf adaption
 * @author Cqm              - Major cleanup/rewrite
 *
 * @author Noreplyz         - Adapted for use on Yogscast Wiki
 *
 * @license: CC-BY-NC-SA
 */
 
;(function ($, mw) {
    var c = mw.config.get([
            'wgNamespaceNumber',
            'wgPageName',
            'wgServer',
            'wgUserName',
            'wgUserLanguage'
        ]),
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
 
            quote: {
                page: 'Yogscast_Wiki:Quotes_Submission',
                buttonText: 'Submit a Quote',
                form: '<form class="WikiaForm" method="" name="" id="quote">' +
                        '<fieldset>' +
                            '<span style="font-family:Arial">' +
                                '<span style="font-weight:bold">Yogscast Member Name</span>' +
                                '<br>' +
                                '<input id="yogsname" type="text" placeholder="Simon Lane" style="width:400px"/>' +
                                '<br>' +
                                '<span id="br2" />' +
                                '<span style="font-weight:bold">Quote</span>' +
                                '<br>' +
                                '<input id="yogsquote" type="text" placeholder="Enter a quote" style="width:400px"/>' +
                                '<br>' +
                                '<span style="font-weight:bold">Reference</span>' +
                                '<br>' +
                                '<textarea name="" id="yogsreference" style="height: 100px; width: 100%;" placeholder="Add a reference from where the quote is from here" class="optional"></textarea>' +
                                '<br>' +
                                '<span id="br2" />' +
                            '</span>' +
                        '</fieldset>' +
                    '</form>',
                formParams: {
                    '$1': 'yogsname',
                    '$2': 'yogsquote',
                    '$3': 'yogsreference'
                },
                submitText: '*Yogscast Member: $1\n' +
                    '*Quote: $2\n' +
                    '*Reference: $3\n' +
                    '*Signature: ~~~~',
                summary: 'New quote submission ($1, $2)',
                sectionTitle: 'Quote for $1'
            },
 
        };
 
    /**
     * Report form submission handler
     *
     * @param opts {object}
     */
    function submitForm(opts) {
        var $form = $('#requestWindow form'),
            $inputs = $form.find('input, textarea'),
            $button = $('#quote #submit'),
            params = {},
            x,
            y,
            $input,
            text;
 
        $button.prop('disabled', true);
 
        for (x in opts.formParams) {
            if (opts.formParams.hasOwnProperty(x)) {
                $input = $inputs.filter('#' + opts.formParams[x]);
 
                if (!$input.length) {
                    console.log('An error has been found in the form config. Please check the formParams and input ids');
                    $button.prop('disabled', false);
                    return;
                }
 
                text = $input.val();
 
                if (!text && !$input.hasClass('optional')) {
                    alert('One or more required fields are missing. Please check your submission and try again.');
                    $button.prop('disabled', false);
                    return;
                }
 
                if ($input.attr('data-encode') === 'true') {
                    text = encodeURIComponent(text);
                }
 
                params[x] = text;
            }
        }
 
        for (x in params) {
            if (params.hasOwnProperty(x)) {
                // console.log(x, params[x]);
                // convert to regex so the same parameter can be used multiple times in each string
                y = new RegExp(x.replace(/\$/, '\\$'), 'g');
                opts.submitText = opts.submitText.replace(y, params[x]);
                opts.summary = opts.summary.replace(y, params[x]);
                opts.sectionTitle = opts.sectionTitle.replace(y, params[x]);
            }
        }
 
        console.log(opts.submitText, opts.summary);
 
        (new mw.Api())
            .post({
                action: 'edit',
                title: c.wgPageName,
                section: 'new',
                sectiontitle: opts.sectionTitle,
                text: opts.submitText,
                summary: opts.summary,
                token: mw.user.tokens.get('editToken')
 
            })
            .done(function (res) {
                location.reload('action=purge');
            });
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
                }]
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
 
        $('#lang-EN')
            .empty()
            .append(
                $('<a>')
                    .attr('id', 'vstf-report-' + type)
                    .addClass('wikia-button')
                    .on('click', loadForm)
                    .text(opts.buttonText)
            );
    }
 
    /**
     * start up method
     */
    function init() {
        var x;
 
        for (x in options) {
            if (options.hasOwnProperty(x)) {
                if (options[x].page === c.wgPageName) {
                    loadButton(x);
                    return;
                }
            }
        }
    }
 
    $(init);
 
}(jQuery, mediaWiki));