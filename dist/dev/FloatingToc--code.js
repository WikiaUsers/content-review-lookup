/**
 * @name        FloatingToc
 * @author      Pecoes, KhangND
 * @desc        Makes the Table of Contents floatable
 * @doc         https://dev.fandom.com/wiki/FloatingToc
 * @files used:
 * [[File:Ui-icons_ffffff_256x240.png]]
 * [[File:Ui-icons_222222_256x240.png]]
 * [[File:Ui-icons_cccccc_256x240.png]]
 * [[File:Ui-icons_666666_256x240.png]]
 */

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, unused:true, bitwise:true, eqeqeq:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */

require(['mw', 'jquery', 'wikia.window', 'wikia.browserDetect'],
function (mw, $, window, browser) {
    'use strict';
    var root = $('#toc');

    if(window.FloatingTocLoaded
    || !root.length)
        return;
    window.FloatingTocLoaded = true;

    var isMobile = browser.isMobile(),
        win = $(window),
        page = $('#WikiaPage'),
        rail = $('#WikiaRail'),
        navHeight = $('#globalNavigation').height(),
        barHeight = $('#WikiaBarWrapper').height(),
        i18n = {},
        options = $.extend({
            speed: 250,
            auto: false,
            enableKey: true
        }, window.FloatingToc);

    /**
     * @method      initStyles
     * @description Initializes styling from the dev.colors library
     * @return      {void}
     */
    function initStyles(colors) {
        var pageBright = colors.parse(colors.wikia.page).isBright(),
            menuBright = colors.parse(colors.wikia.menu).isBright(),
            icons = {
                white:     'https://images.wikia.nocookie.net/dev/images/c/c2/Ui-icons_ffffff_256x240.png',
                black:     'https://images.wikia.nocookie.net/dev/images/a/aa/Ui-icons_222222_256x240.png',
                lightGray: 'https://images.wikia.nocookie.net/dev/images/4/48/Ui-icons_cccccc_256x240.png',
                darkGray:  'https://images.wikia.nocookie.net/dev/images/8/89/Ui-icons_666666_256x240.png',
                url: function (color) { return 'url("' + this[color] + '");'; }
            },
            styles = '\
                .toc-dialog{\
                    border: 2px solid $border\
                }\
                .toc-dialog .ui-dialog-titlebar {\
                    background: $menu;\
                    background: linear-gradient(to bottom, $gradient 35%, $menu 65%);\
                    border: 1px solid $menu;\
                    color: $contrast;\
                }\
                .toc-dialog.ui-widget-content .ui-icon {\
                    background-image: $menu-gray-icons\
                }\
                .toc-dialog,\
                .toc-dialog .toc {\
                    background-color: $page;\
                    color: $text\
                }\
                #toc-open {\
                    border: 1px solid $page-border-gray;\
                    background-image: $page-gray-icons\
                }\
                .toc-btn, .toc-btn:hover {\
                    background-image: $menu-bw-icons\
                }';
        mw.util.addCSS(
            colors.replace(styles, {
                'page-border-gray': pageBright ? '#ccc' : '#666',
                'menu-gray-icons':  menuBright ? icons.url('darkGray') : icons.url('lightGray'),
                'page-gray-icons':  pageBright ? icons.url('lightGray') : icons.url('darkGray'),
                'menu-bw-icons':    menuBright ? icons.url('black') : icons.url('white')
            })
        );
    }

    /**
     * @method      init
     * @description Initializes components
     * @return      {void}
     */
    function init() {
        // root ToC components
        var rootToc = {
            top: root.offset().top,
            width: root.outerWidth(),
            height: root.outerHeight(),
            list: root.find('ol:first').outerHeight()
        };
        // creates a clone of the ToC and transforms it into a FloatingToc with jQuery UI Dialog
        var toc = {
            resizing: false,
            padWrap: 0, padLeft: 0, padTop: 0,      // available upon created
            title: $(),   // @jQuery: dialog title  <  available upon created
            wrapper: $(), // @jQuery: dialog wrapper < available upon created
            clone: $('<nav>', {
                'class': 'toc show',
                id: 'tocDialog',
                title: i18n.contents,
                css: { display: 'none' },
                appendTo: page
            }),// @jQuery: clone of the ToC
            // @method: returns initial state of the dialog
            state: function() {
                var w = rootToc.width + toc.padLeft * 2,
                    h = Math.min(
                        rootToc.list + toc.padTop + toc.title.outerHeight(),
                        win.height() - toc.padWrap - navHeight - barHeight
                    ),
                    ratio = w / h;
                return {
                    position: [(win.width() - rootToc.width) / 2, navHeight],
                    width: w,
                    height: h,
                    maxWidth: win.height() * ratio,
                    maxHeight: win.height() - toc.padWrap - navHeight - barHeight,
                };
            },
            // @method: toggles ToC and links
            toggle: function(action) {
                var links = $('.toc-link');

                if(links.css('display') === 'none')
                    links.show(options.speed);
                else
                    links.hide(options.speed);

                if(root.css('display') === 'none')
                    root.slideDown(options.speed, toc.keepPos(action));
                else
                    root.slideUp(options.speed, toc.keepPos(action));
            },
            // @method: keeps window position
            keepPos: function(action) {
                var winPos = win.scrollTop();
                if(action === 'open' && winPos > rootToc.top + rootToc.height) {
                    win.scrollTop(winPos - rootToc.height);
                }
                if(action === 'close') {
                    if(!options.enableKey) {
                        win.scrollTop(rootToc.top - navHeight);
                        return;
                    }

                    if(winPos > rootToc.top)
                        win.scrollTop(winPos + rootToc.height);
                }
            },
            // @method/@handler: sets dialog to fixed position
            fixPos: function() {
                if(toc.wrapper.css('position') === 'fixed')
                    return;
                toc.wrapper.css({
                    top: toc.wrapper.offset().top - win.scrollTop(),
                    left: toc.wrapper.offset().left - win.scrollLeft(),
                    position: 'fixed'
                });
            },
            // @method/@handler: resets dialog position
            reset: function() {
                toc.clone.dialog('option', toc.state());
            },
            // @handler: dock button event
            dock: function() {
                toc.clone.dialog('option', {
                    width: rail.width() + parseInt(page.css('padding-right')) - toc.padWrap,
                    position: [rail.offset().left, navHeight]
                });
            },
            // @handler: back button event
            back: function() {
                win.scrollTop(0);
            },
            // @method: open dialog
            open: function() {
                toc.clone.dialog('open');
            },
            // @handler: close button event
            close: function() {
                toc.clone.dialog('close');
            },
            // @method: returns dialog button
            button: function(action) {
                return $('<button>', {
                    'class': 'toc-btn',
                    id: 'toc-' + action,
                    title: i18n[action],
                    click: toc[action]
                });
            },
            // @handler: dialog open event
            onOpen: function() {
                toc.reset();
                toc.fixPos();
                toc.toggle('open');
            },
            // @handler: dialog close event
            onClose: function() {
                toc.toggle('close');
            },
            // @handler: processes dialog components upon created
            onCreate: function() {
                // sets properties
                toc.wrapper = $(this).parent();
                toc.title = toc.wrapper.find('.ui-dialog-titlebar');
                toc.padWrap = (
                    parseInt(toc.wrapper.css('border-width')) +
                    parseInt(toc.wrapper.css('padding'))
                ) * 2;
                toc.padLeft = parseInt($(this).css('padding-left'));
                toc.padTop  = parseInt($(this).css('padding-top'));

                // modifies components
                toc.toggle();
                toc.wrapper.find('.ui-dialog-titlebar-close').remove();
                if(isMobile) {
                    $('<button>', {
                        id: 'toc-footer-close',
                        text: i18n.close,
                        click: toc.close,
                        insertAfter: toc.clone
                    });
                    return;
                } else {
                    $('<div>', {
                        id: 'toc-footer-link',
                        text: i18n.poweredby + ' ',
                        insertAfter: toc.clone,
                        append: $('<a>', {
                            href: '//dev.fandom.com/wiki/FloatingToc',
                            text: 'FloatingToc'
                        })
                    });
                    $('<div>', {
                        id: 'toc-btns',
                        appendTo: toc.title,
                        append: [
                            toc.button('back'),
                            toc.button('dock'),
                            toc.button('reset'),
                            toc.button('close'),
                        ]
                    });
                    toc.wrapper.draggable({
                        scroll: false,
                        containment: 'window'
                    });
                }
            },
            // @handler: initializess dialog
            init: function() {
                toc.clone.append($('<ol>', { html: root.find('ol:first').html() }));
                toc.clone.dialog(
                    $.extend({
                        dialogClass: 'toc-dialog',
                        show: { effect: 'slideDown', duration: options.speed },
                        hide: { effect: 'slideUp',   duration: options.speed },
                        create: toc.onCreate,
                        open: toc.onOpen,
                        close: toc.onClose,
                        resizeStart: function(){ toc.resizing = true },
                        resizeStop: function() { toc.resizing = false; toc.fixPos() },
                    }, toc.state())
                );

                win.resize(function() {
                    if(!isMobile
                    && !toc.resizing
                    &&  toc.clone.dialog('isOpen'))
                        toc.reset();
                });

                // overrides click
                $(this).click(function() {
                    if( toc.clone.dialog('isOpen'))
                        toc.close();
                    else
                        toc.open();
                });
            }
        };

        // adds ToC links to h2, h3
        $('#mw-content-text').find('h2,h3').find('.editsection').before(
            $('<a>', {
                'class': 'toc-link',
                href: '',
                title: i18n.toc,
                click: function() {
                    win.scrollTop(rootToc.top - navHeight);
                    return false;
                }
            })
        );

        // adds open button to ToC title
        var floatToc = $('<button>', {
            id: 'toc-open',
            title: i18n.open,
            appendTo: $('#toctitle'),
        }).one('click', toc.init);

        if(options.auto) floatToc.click();
        if(options.enableKey) {
            $(document).keyup(function(e) {
                var elem = document.activeElement.tagName;
                if($('body').hasClass('ve')
                || elem === 'INPUT'
                || elem === 'TEXTAREA')
                    return;

                if(e.key === 't'
                || e.keyCode === 84
                || e.which === 84)
                    floatToc.click();
            });
        }
    }

    /**
     * @method      preload
     * @description Checks for ToC list then initiates script
     * @return      {void}
     */
    function preload(root) {
        if(root.find('ol').children().length === 0)
            return setTimeout(function () {
                preload(root);
            }, 500);
        init();
    }

    importArticles({
        type: 'style',
        article: 'u:dev:MediaWiki:FloatingToc.css'
    }, {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Colors/code.js',
            'u:dev:MediaWiki:TouchPunch.js'
        ]
    });

    mw.hook('dev.colors').add(initStyles);
    mw.hook('dev.i18n').add(function(i18nLoaded) {
        i18nLoaded.loadMessages('FloatingToc').done(function(i18nLoaded) {
            i18n = i18nLoaded._messages.en;
            for(var i in i18n) i18n[i] = i18nLoaded.msg(i).escape();
       });
    });
    mw.loader.using([
        'jquery.ui.dialog',
        'jquery.ui.draggable',
        'jquery.ui.resizable',
        'jquery.effects.slide'
    ], function() {
        preload(root);
    });
});