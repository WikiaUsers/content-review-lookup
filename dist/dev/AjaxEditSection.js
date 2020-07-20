/**
 * @name        AjaxEditSection
 * @desc		Edit section without opening editor
 * @author      KhangND
 * @coderef     AjaxEdit by TheGoldenPatrik1
 */
(function() {
    var $sections = $('.editsection');

    // protections
    if(!$sections.length || window.AESLoaded) {
        return;
    } window.AESLoaded = true;

    var $article = $('#mw-content-text'),
        CONTAINER_ID = 'ajax-section',
        TEXT_ID = CONTAINER_ID + '__text',
        CHK_MINOR_ID = CONTAINER_ID + '__chk_minor',
        SUMMARY_ID = CONTAINER_ID + '__summary',
        section,
        wgPageName = mw.config.get('wgPageName'),
        isEdited = false,
        i18n = {},
        options = $.extend({
            separator: ' | '
        }, window.AjaxEditSection);

    /**
     * @method  preload
     * @desc    Prepares i18n object and fires init event
     * @param   {Object} i18nLoaded
     * @return  {void}
     */
    function preload(i18nLoaded) {
        i18n = i18nLoaded._messages.en;
        for(var i in i18n)
            i18n[i] = i18nLoaded.msg(i).plain();
        init($sections);
    }

    /**
     * @method  init
     * @desc    Creates edit links
     * @param   {Object} $elems
     * @return  {void}
     */
    function init($elems) {
        $elems.each(function() {
            if(!$(this).has('a').length) // skip empty editsection link
                return true;

            $(this).append([options.separator,
                $('<a>', {
                    text: i18n.buttonText,
                    title: i18n.buttonTitle,
                    css: { cursor: 'pointer' },
                    click: edit
                })
            ]);
        });
    }

    /**
     * @method  edit
     * @desc    Opens up editor interface
     * @return  {void}
     */
    function edit() {
        var url = $(this).parent().find('a').attr('href').replace('edit', 'raw');
        section = url.match(/section=\d+/g)[0].replace('section=', '');

        if(!$('#' + CONTAINER_ID).length) create();

        $('html, body').animate({
            scrollTop: $('#WikiaArticle').offset().top - 60 // minus global nav
        });
        $.get(url).done(function(data) {
            $article.hide();
            $('#' + TEXT_ID).val(data);
            $('#' + CONTAINER_ID).slideDown();
        });
    }

    /**
     * @method  create
     * @desc    Creates editor interface
     * @return  {void}
     */
    function create() {
        var text = $('<textarea>', {
                id: TEXT_ID,
                css: {
                    width: '100%',
                    height: 400,
                    resize: 'vertical',
                    'box-sizing': 'border-box' // prevent overflowing
                }
            }),
            lbl_minor = $('<label>', {
                'for': CHK_MINOR_ID,
                text: i18n.minor
            }),
            chk_minor = $('<input>', {
                type: 'checkbox',
                id: CHK_MINOR_ID
            }),
            summary = $('<input>', {
                type: 'text',
                id: SUMMARY_ID
            }),
            buttons = $('<div>', {
                append: [
                    $('<a>', {
                        'class': 'button',
                        text: i18n.backButton,
                        title: i18n.backTitle,
                        click: back
                    }),
                    $('<a>', {
                        'class': 'button',
                        text: i18n.publishButton,
                        title: i18n.publishTitle,
                        click: publish
                    }),
                ]
            });
        $('<div>', {
            id: CONTAINER_ID,
            prependTo: $('#WikiaArticle'),
            append: [
                lbl_minor,
                chk_minor,
                i18n.summary,
                summary,
                buttons,
                text
            ]
        });
    }

    /**
     * @method  publish
     * @desc    Publishes edit with API post request
     * @return  {void}
     */
    function publish() {
        new mw.Api().post({
            action: 'edit',
            title: wgPageName,
            section: section,
            summary: $('#' + SUMMARY_ID).val(),
            text: $('#' + TEXT_ID).val(),
            minor: $('#' + CHK_MINOR_ID).prop('checked'),
            token: mw.user.tokens.get('editToken'),
        }).done(function(d) {
            var notif = d.error
                ? new BannerNotification(i18n.error, 'error')
                : new BannerNotification(i18n.success, 'confirm');
            isEdited = true;
            refresh();
            notif.show();
        });
    }

    /**
     * @method  refresh
     * @desc    Refreshes article space
     * @return  {void}
     */
    function refresh() {
        if(isEdited) {
            $article.load(
                mw.util.getUrl(wgPageName) + ' #mw-content-text',
                function() {
                    back();
                    init($('.editsection'));
                }
            );
        } else {
            back();
        }
    }

    /**
     * @method  back
     * @desc    Returns to article view
     * @return  {void}
     */
    function back() {
        $('#' + CONTAINER_ID).hide();
        $article.slideDown();
    }

    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('AjaxEditSection').done(preload);
    });
})();