// Add Section Button (modified version of Grunny's EditIntroButton)
// Adds a button to the Edit Dropdown that creates a new section for the user to edit, much like on talk pages.
(function () {
    if (
        mw.config.get('wgNamespaceNumber') === -1 ||
        window.AddSectionButtonLoaded
    ) {
        return;
    }
    window.AddSectionButtonLoaded = true;
    var buttonText = window.AddSectionButtonText;

    function fetchText() {
        if (!buttonText) {
            mw.hook('dev.i18n').add(function(i18no) {
                i18no.loadMessages('AddSectionButton').then(sectionButton);
            });
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        } else {
            sectionButton();
        }
    }

    function sectionButton(i18n) {
        buttonText = buttonText || i18n.msg('add').plain();
        var $dropdown = $(
            '.page-header__actions .wds-list,' +
            '.page-header__contribution-buttons .wds-list'
        ).first();

        $('<li>', {
            id: 'ca-section',
            append: $('<a>', {
                href: mw.util.getUrl(null, {
                    action: 'edit',
                    section: 'new'
                }),
                text: buttonText,
                title: buttonText
            })
        }).appendTo($dropdown);

    }

    mw.loader.using('mediawiki.util').then(fetchText);
})();