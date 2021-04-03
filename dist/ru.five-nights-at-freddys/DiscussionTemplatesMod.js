
/*
 * Original:         dev:DiscussionTemplates.js
 * Original author:  Sophiedp
*/

(function () {
    if (!window.DiscussionTemplates) {
        return console.error('`window.DiscussionTemplates` doesn\'t exist, aborting.');
    }
    if (
        window.DiscussionTemplates.loaded ||
        mw.config.get('wgNamespaceNumber') !== 1200 ||
        mw.config.get('wgVersion') === '1.19.24'
    ) {
        return;
    }
    if (!window.DiscussionTemplates.templates) {
        return console.error('[DiscussionTemplates] `window.DiscussionTemplates.templates` not set, aborting.');
    }
    
    var i18n;
    var preloads = 5;
    var selected = {
        template: null,
        wiki: null
    };
    var modal;
    var ewindow;
 
    function selectTemplate () {
        var ewinput = $(ewindow.offsetParent()).find('div.ProseMirror');
        var trimRegex = new RegExp('<br><\/p><p><br><\/p>$');
        new mw.Api().get({
            action: 'parse',
            page: window.DiscussionTemplates.templates[selected.template].name,
            disablelimitreport: true,
            prop: 'text',
            wrapoutputclass: null, //I don't know if this is a bug or not, but it gets rid of the wrapping div
            format: 'json'
        }).done(function (d) {
            var content = d.parse.text["*"].replace(/\n/g, '<br>').replace(/<p><br \/>/g, '<p><br></p><p>').replace(/href="\/wiki/g, 'href="' + mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki');
            if (trimRegex.test(content)) {
                content = content.replace(trimRegex, '</p>');
            }
            if (content.includes('$WIKI') && window.DiscussionTemplates.wikiList) {
                var link = $('<a>', {
                    text: window.DiscussionTemplates.wikiList[selected.wiki],
                    href: window.DiscussionTemplates.wikiList[selected.wiki]
                }).prop('outerHTML');
                content = content.replace(/\$WIKI/g, link);
            }
            if (content.includes('$USER')) {
                content = content.replace(/\$USER/g, mw.config.get('profileUserName'));
            }
            $(ewinput).html(function () {
                if ($(this).text()) {
                    return '<p>' + mw.html.escape($(this).text()) + '<br><br></p>' + content;
                }
                return content;
            });
            alert(i18n.msg('title-not-supported').plain());
            navigator.clipboard.writeText(window.DiscussionTemplates.templates[selected.template].title);
            modal.close();
        });
    }
 
    function formHTML () {
        var layout = new OO.ui.PanelLayout({
            padded: true
        });
        var list = {
            templates: [],
            wikis: []
        };
        Object.keys(window.DiscussionTemplates.templates).forEach(function (i) {
            list.templates.push(
                new OO.ui.MenuOptionWidget({
                    data: window.DiscussionTemplates.templates[i].name,
                    label: i
                })
            );
        });
        Object.keys((window.DiscussionTemplates.wikiList || {})).forEach(function (i) {
            list.wikis.push(
                new OO.ui.MenuOptionWidget({
                    data: window.DiscussionTemplates.wikiList[i],
                    label: i
                })
            );
        });
 
        var templateLabel = new OO.ui.LabelWidget({
            label: i18n.msg('select-template-info').plain()
        });
        var templatesDropDown = new OO.ui.DropdownWidget({
            label: i18n.msg('default').plain(),
            menu: {
                items: list.templates
            }
        });
        var templateSelected = function (option) {
            selected.template = option.label;
        };
        templatesDropDown.getMenu().on('select', templateSelected);
 
        var wikiLabel = new OO.ui.LabelWidget({
            label: i18n.msg('select-lang-info').plain()
        });
        var wikisDropDown = new OO.ui.DropdownWidget({
            label: i18n.msg('default').plain(),
            menu: {
                items: list.wikis
            }
        });
        var wikiSelected = function (option) {
            selected.wiki = option.label;
        };
        wikisDropDown.getMenu().on('select', wikiSelected);
 
        layout.$element.append([templateLabel.$element, '<br>', templatesDropDown.$element, '<br><br><br>', wikiLabel.$element, '<br>', wikisDropDown.$element]);
        return layout;
    }
 
    function click () {
        ewindow = $(this);
        if (!modal) {
            modal = new window.dev.modal.Modal({
                content: formHTML(),
                id: 'form-discussion-template',
                size: 'medium',
                closeEscape: true,
                title: i18n.msg('title').plain(),
                buttons: [{
                    event: 'onClick',
                    text: i18n.msg('button').plain(),
                    primary: true
                }],
                events: {
                    onClick: selectTemplate
                }
            });
            modal.create();
        }
        mw.util.addCSS('\
            #form-discussion-template .oo-ui-layout {\
                min-height: 300px;\
            }\
            #form-discussion-template .oo-ui-dropdownWidget {\
                padding-top: 5px;\
            }\
            #form-discussion-template .oo-ui-selectWidget {\
                width: 100% !important;\
            }\
        ');
        modal.show();
    }
 
    function init (i18nData) {
	    i18n = i18nData;
	    $('#MessageWall').on('click', 'div[class^="FormEntryPoint_form-entry-point__"]', function() {
	        setTimeout(function() {
	            $('.EditorForm__actions').each(function() {
	                if (!($(this).find('#add-discussion-template').length)) {
	                    $(this).append($('<button>', {
	                        click: click,
	                        id: 'add-discussion-template',
	                        class: 'wds-button wds-is-secondary wds-is-text'
	                    }).append(window.dev.wds.icon('bubble-small')));
	                }
	            });
	        }, 250);
	    });
	}
 
    function preload () {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('DiscussionTemplates').then(init);
        }
    }
 
    mw.hook('dev.wds').add(preload);
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
    mw.loader.using('mediawiki.api').then(preload);
    mw.loader.using('mediawiki.util').then(preload);
 
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    });
})();