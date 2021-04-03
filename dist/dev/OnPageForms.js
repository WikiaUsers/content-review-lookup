/**
 * @name    OnPageForms
 * @desc    Loads file history forms directly on page.
 * @author  KhangND
 */
(function() {
    if (
        mw.config.get('wgNamespaceNumber') !== 6 // not File namespace
        || mw.config.get('wgUserName') === null // not user
        || window.OnPageFormsLoaded
    ) {
        return;
    }
    window.OnPageFormsLoaded = true;

    var $upload = $('#mw-imagepage-reupload-link a'),
        $delete = $('.filehistory a[href*="action=delete"]'),
        $revert = $('.filehistory a[href*="action=revert"]');

    /**
     * @method      init
     * @description Initiates script with i18n
     * @return      {void}
     */
    function init(i18n) {
        var props = {
            text: i18n.msg('text').plain(),
            title: i18n.msg('title').plain(),
            css: { cursor: 'pointer' }
        };
        $upload.after([
            ' (',
            $('<a>', $.extend({ click: loadUpload }, props)),
            ')'
        ]);
        $delete.after([
            ' (',
            $('<a>', $.extend({ click: loadDelete }, props)),
            ')'
        ]);
        $revert.after([
            ' (',
            $('<a>', $.extend({ click: loadRevert }, props)),
            ')'
        ]);
    }

    /**
     * @Click event handlers
     */
    function loadUpload() {
        loadForm('uploadForm', this);
    }

    function loadDelete() {
        loadForm('deleteForm', this);
    }

    function loadRevert() {
        loadForm('revertForm', this);
    }

    /**
     * @method      loadForm
     * @description Loads corresponding form to container using AJAX
     * @param       {String} id: form type
     * @param       {Object} elem: element from click event
     * @return      {void}
     */
    function loadForm(id, elem) {
        var $form = $('#' + id),
            $url = $(elem).prev().attr('href');

        if($form.length) {
            if(id === 'uploadForm' || $form.data('url') === $url) {
                toggle($form);
                return;
            } else {
                $form.slideUp(function() {
                    $form.remove();
                });
            }
        }

        $('[data-tab-body="history"]').append(
            $('<div>', {
                id: id,
                'data-url': $url,
                css: { display: 'none' },
            }).load(
                $url + ' #mw-content-text > form',
                function() { toggle('#' + id); }
            )
        );
    }

    /**
     * @method      toggle
     * @description Show or hide form
     * @param       {Object} $elem: element to toggle
     * @return      {void}
     */
    function toggle($elem) {
        if(!($elem instanceof jQuery))
            $elem = $($elem); // convert to jQuery object if not

        if( $elem.css('display') === 'none')
            $elem.slideDown();
        else
            $elem.slideUp();
    }

    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
    mw.hook('dev.i18n').add(function(i18njs) {
        i18njs.loadMessages('OnPageForms').done(init);
    });
})();