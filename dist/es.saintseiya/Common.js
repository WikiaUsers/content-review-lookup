/**
 * Central JavaScript file for the Wiki.
 * Runs on every page for every user, regardless of skin (Oasis or Monobook).
 */
(function (window, $, mw) {
    "use strict";

    // Ensure required libraries are loaded
    if (typeof $ === 'undefined' || typeof mw === 'undefined') {
        console.error('Required libraries are missing: jQuery or MediaWiki');
        return;
    }

    // Ensure the DOM is fully loaded before executing any DOM-dependent code
    $(document).ready(function () {

        /**
         * 1. Archiving Templates Configuration
         */
        window.archiveListTemplate = 'ArchiveList';
        window.archivePageTemplate = 'ArchivePage';

        /**
         * 2. Compact References for Long Lists
         */
        const references = $('.references');
        if (references.find('li').length > 9) {
            references.addClass('compactreferences');
        }

        /**
         * 3. Oasis Skin-Specific Enhancements
         */
        if (mw.config.get('skin') === 'oasis') {

            // Disable AJAX in page/image creation/upload forms
            $(window).on('load', function () {
                $('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
            });

            // Add template adder functionality to file pages for autoconfirmed users
            if (mw.config.get('wgCanonicalNamespace') === 'File' &&
                mw.config.get("wgUserGroups").includes("autoconfirmed")) {

                const options = {
                    '{{No license}}': 'Unlicensed image',
                    '{{No rationale}}': 'No Fairuse info',
                    '{{Unused}}': 'Unused image',
                    '{{Poor filename}}': 'Poor name'
                };

                const templateOptions = Object.entries(options).map(([key, value]) => 
                    `<option value="${key}" style="text-align:center;">${value}</option>`
                ).join('');

                const html = `
                    <select id="FileTemplateAdder">${templateOptions}</select>
                    <a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>
                `;

                $('.comments').after(html);

                $('#templateSubmit').on('click', function () {
                    const $this = $(this);
                    const selectedTemplate = $('#FileTemplateAdder').val();

                    $this.html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');

                    new mw.Api().post({
                        format: 'json',
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        token: mw.user.tokens.get('csrfToken'),
                        summary: `Adding template: ${selectedTemplate}`,
                        minor: true,
                        prependtext: `${selectedTemplate}\n`
                    })
                        .done(function () {
                            $this.text('Add this Template too!');
                            new BannerNotification(`Template: ${selectedTemplate} added successfully`, 'confirm').show();
                        })
                        .fail(function () {
                            new BannerNotification('Template addition failed!', 'error').show();
                        });
                });
            }
        }

        /**
         * 4. Additional Improvements (commented for future use)
         * Uncomment this section if you want "Edit with form" as default.
         */
        /*
        const $edit = $('#ca-edit'),
            $pencil = $edit.find('img'),
            $formedit = $('#ca-formedit');

        if ($formedit.length) {
            $edit.attr('href', '?action=formedit').text('Edit with form').prepend($pencil);
            $formedit.attr('href', '?action=edit').text('Edit this page');
        }
        */
    });

}(window, jQuery, mediaWiki));