// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function (wds) {
    $('.sub-wds-icons-pages-small').append( // Icon for Template:CopyButton
        $('<span>', {
            'id': 'dev-wds-icons-pages-small'
        })
    );
    wds.render('.sub-wds-icons-pages-small');
});

/* Include Global Anime-Common.js Information */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WDSIcons/code.js',
        'u:anime:MediaWiki:Anime-Common.js',
    ]
});

var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
};

// Executes after page has loaded.
$(function ($) {
    "use strict";
    // ==Extension:Page Forms monkeypatches==
    // Improves accessibility by turning captions into labels.
    $('.Form-Gundam .label[data-for]').replaceWith(function () {
        var elLabel = $("<label>", { html: $(this).html() });
        $.each(this.attributes, function (i, attribute) {
            elLabel.attr(attribute.name, attribute.value);
        });
        elLabel.attr('for', elLabel.attr('data-for'));

        return elLabel;
    });

    // Increase limit for multiple instance data by not posting empty fields.
    $('form:has(.Form-Gundam)').submit(function () {
        /**
         * @type {string} the attribute that determines if a field should be re-enabled if the form is invalid.
         */
        var sReenableAttr = 'data-reenable';
        $(this).find(':input, textarea, select').filter(
            function () {
                if (($(this).hasClass('createboxInput') || ['hidden'].includes($(this).attr('type'))) && !this.value) {
                    $(this).attr(sReenableAttr, true);

                    return true;
                }

                return false;
            }

            // Values for disabled fields are not posted, so this frees up space in the body.
        ).attr('disabled', 'disabled');

        // If the form is invalid, re-enable the fields that were disabled so the user can edit again.
        $('form:has(.Form-Gundam) button[type="submit"]').one('blur', function () {
            setTimeout(function () {
                if ($('.errorMessage').length > 0) {
                    $('[' + sReenableAttr + '="true"]').each(function () {
                        $(this).removeAttr('disabled ' + sReenableAttr);
                    });
                }
            }, 3000);
        });

        return true;
    });

    /**
     * @type {Object.<string, string>} Less clunky than using a mapping template.
     */
    var oAppearanceTypes = {
        'm': 'Mentioned only',
        'v': 'Voice heard only',
        't': 'Is cameo'
    };
    $('select.appearance-type').children('option').each(function () {
        var sVal = this.getAttribute('value');
        if (sVal.trim()) {
            this.innerHTML = oAppearanceTypes[sVal];
        }
    });

    // ==Template:Ref name==
    /**
     * @type {JQuery} elements that make their preceding citations more specific e.g. a page or chapter number.
     */
    var jqRefSpec = $('.ref-spec');
    jqRefSpec.each(function (_i, el) {
        var jqBase = $(el).prev();
        var sBase = jqBase.find('a').text();
        jqBase.find('a').html(sBase.slice(0, -1) + ', ' + el.innerHTML + ']');
        el.remove()
    });
});