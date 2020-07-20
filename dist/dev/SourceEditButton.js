//Classic-Edit Button (lightly modified version of Grunny's EditIntroButton)
//Adds a button to the Edit Dropdown that allows the user to edit in source mode. Useful for users who have the default as Visual Editor.
//Modified by Sophiedp to make it use source mode rather than the classic editor (see https://dev.fandom.com/wiki/Thread:17269)
//Rewriten by MACH-59330
(function(window, $, mw) {
    window.dev = window.dev || {};
    if (
        mw.user.options.get('editor') === '1' ||
        window.dev.sourceEditBtn
    ) {
        return;
    }
    window.dev.sourceEditBtn = {};
    var conf = mw.config.get([
        'wgPageName',
        'wgNamespaceNumber'
    ]);

    function sourceEditBtnInit() {
        window.dev.sourceEditBtn = new SourceEditButton();
    }
    
    function SourceEditButton() {
        window.dev.fetch('option-source-editor').then(
            $.proxy(this.ui, this)
        );
    }

    SourceEditButton.prototype.ui = function(d) {
        $('<li>',{
            append: $('<a>', {
                href: mw.util.getUrl(conf.wgPageName, {
                    action: 'edit',
                    useeditor: 'source'
                }),
                text: d,
            })
        }).insertAfter($(this.wrapper).find('a[id$="edit"]').first().parent());
    };

    SourceEditButton.prototype.wrapper = [2, 3].indexOf(conf.wgNamespaceNumber) > -1
        ? '.UserProfileActionButton > .wikia-menu-button > ul'
        : '.page-header__contribution-buttons .wds-list';

    mw.hook('dev.fetch').add(sourceEditBtnInit);
    importArticle({
        article: 'u:dev:MediaWiki:Fetch.js',
        type: 'script'
    });

})(this, jQuery, mediaWiki);