/**
 * @name        I18nLink
 * @description Adds links to I18n translation pages
 * @author      Rail01
 * @author      TheGoldenPatrik1
 * @license     CC-BY-SA 3.0
 * @status      Stable
 * @version     1.6
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.util',
    'mediawiki.user'
]).then(function () {
    var config = mw.config.get([
        'wgCategories',
        'wgCityId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle'
    ]),
        title = config.wgPageName.split('/'),
        isLuaDoc = title[0] === 'Global_Lua_Modules',
        isLuaModule = config.wgNamespaceNumber === 828,
        isLua = isLuaDoc || isLuaModule;
        isMediaWiki = config.wgNamespaceNumber === 8;
        titleText = isLua ? 'Module:' + (isLuaModule ? config.wgTitle.replace(/\/.*/, '') : title[1]) + '/i18n' : 'MediaWiki:Custom-' + config[isMediaWiki ? 'wgTitle' : 'wgPageName'].replace(/\/.*|\.js/, '') + '/i18n.json',
        api = new mw.Api(),
        list = $('.page-header__contribution-buttons .wds-list'),
        options = $.extend(
            {
                create: true,
                buttons: []
            },
            window.I18nLink
        );
    if (
        !list.exists() ||
        config.wgCityId !== '7931' ||
        (
            isLuaModule &&
            title[1] == 'i18n'
        ) ||
        $(
            '.pi-data-value a[href="/wiki/Help:System_messages"]'
        ).exists() ||
        window.I18nLinkLoaded
    ) { 
        return; 
    }
    window.I18nLinkLoaded = true;
    /**
     * @method click
     * @description Creates the I18n page when clicked
     */
    function click () {
        if (
            confirm(
                i18n.msg('confirm', titleText).plain()
            ) === true
        ) {
            api.post({
                action: 'edit',
                title: titleText,
                watchlist: 'nochange',
                text:
                    isLua ?
                    '-- <nowiki>\nreturn {}' :
                    '/* <syntaxhighlight lang="javascript"> */',
                token: mw.user.tokens.get('editToken'),
                summary: 'Creating via [[I18nLink|Script]]'
            }).done(function (d) {
                window.location.href = mw.util.getUrl(titleText);
            });
        }
    }
    /**
     * @method generateElement
     * @description Creates a list item element
     * @param {String} id - The element's id
     * @param {String} params - The link's parameters
     */
    function generateElement (id, params) {
        list.append(
            $('<li>', {
                id: 'ca-' + id
            }).append(
                $('<a>', params)
            )
        );
    }
    /**
     * @method handleData
     * @description Analyzes the page data and acts accordingly
     * @param {JSON} d - The page data
     */
    function handleData (d) {
        var id = isLua ? 'i18n' : 'json',
            lang = isLua ? 'lua' : 'js';
            text = isLua ? 'I18n' : 'JSON';
        if (!d.query.pages[-1]) {
            generateElement(
                id,
                {
                    text: text,
                    title:
                        i18n.msg(
                            lang + 'Title'
                        ).plain(),
                    href: mw.util.getUrl(titleText)
                }
            );
            $.each(options.buttons, function (k, v) {
                if (['delete', 'protect', 'edit', 'raw', 'history'].indexOf(v) === -1) {
                    return;
                }
                generateElement(
                    v + '-' + id,
                    {
                        text: i18n.msg(v, text).plain(),
                        href: mw.util.getUrl(titleText, { action: v })
                    }
                );
            });
        } else if (options.create) {
            generateElement(
                'create-' + id,
                {
                    text:
                        i18n.msg(
                            'create', text
                        ).plain(),
                    title:
                        i18n.msg(
                            lang + 'Create'
                        ).plain(),
                    click: click
                }
            );
        }
    }
    /**
     * @method getData
     * @description Checks if the page exists
     */
    function getData () {
        api.get({
            cb: Date.now(),
            action: 'query',
            titles: titleText
        }).done(function (d) {
            if (d.error) {
                return;
            } else {
                handleData(d);
            }
        });
    }
    /**
     * @method init
     * @description Initiates the script
     * @param {String} i18nData - Variable for I18n-js
     */
    function init (i18nData) {
        i18n = i18nData;
        if (
            (
                config.wgCategories.indexOf('JavaScript') !== -1 &&
                $('.portable-infobox.type-js').length
            ) ||
            isLua ||
            (
                isMediaWiki &&
                new mw.Title(config.wgPageName).getExtension() === 'js'
            )
        ) {
            getData();
        }
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('I18nLink').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});