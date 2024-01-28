/* Any JavaScript here will be loaded for all users on every page load. */
//IIFE to prevent polluting global namespace
;(function(root, console, udf){
    //Variables:
    var debug = true;//set to false for released code
    
    //Actual Code:
    
    /*Utility Functions:*/
    
    //use this function for debugging to the console
    function log(){
        debug && console && console.log && console.log.apply(console, Array.prototype.slice.call(arguments));
    }
    //executes a function when the DOM is ready
    function ready(fn){
        /in/.test(document.readyState)?setTimeout(ready.bind(null, fn), 10):fn();
    }
    
    /*Polyfills:*/
    
    Array.isArray || (Array.isArray = function(obj){
        return {}.toString.call(obj) == "[object Array]";
    });
})(this, this.console);

window.UserTagsJS = {
    modules: {
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'chatmoderator',
            'threadmoderator',
            'rollback',
            'bot',
            'bot-global'
        ],
        metafilter: {
            sysop: ['bureaucrat'],
            'content-moderator': ['bureaucrat', 'sysop'], 
            chatmoderator: ['bureaucrat', 'sysop', 'content-moderator'],
            threadmoderator: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator'],
            rollback: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator', 'threadmoderator']
        }
    }
};

// <nowiki>
(function () {
    if (!window.DiscussionTemplates) {
        window.DiscussionTemplates = {};
    }
    if (
        window.DiscussionTemplates.loaded ||
        mw.config.get('wgNamespaceNumber') !== 1200
    ) {
        return;
    }
    
    if (Array.isArray(window.DiscussionTemplates.allowedGroups)) {
        var allowedGroups = new Set(window.DiscussionTemplates.allowedGroups);
        mw.config.get('wgUserGroups').some(function (userGroup) {
            return allowedGroups.has(userGroup);
        });
    }
    
    window.DiscussionTemplates.loaded = true;
    var i18n;
    var preloads = 5;
    var selected = {
        template: null,
        wiki: null,
        text: null
    };
    var modal;
    var paramValues = {};

    function selectTemplate () {
    	if (!selected.template && !selected.text) {
    		return alert(i18n.msg('nothing-given').plain());
    	}
        var trimRegex = new RegExp('<br><\/p><p><br><\/p>$');
        var params = {
            action: 'parse',
            disablelimitreport: true,
            prop: 'text',
            wrapoutputclass: null, //I don't know if this is a bug or not, but it gets rid of the wrapping div
            format: 'json'
        };
        if (selected.text) {
            params.text = selected.text;
            params.contentmodel = 'wikitext';
        } else if (window.DiscussionTemplates.templates[selected.template].parameters) {
            params.contentmodel = 'wikitext';
            params.contentmodel = 'wikitext';
            params.text = '{{' + window.DiscussionTemplates.templates[selected.template].name;
            for (var param in paramValues) {
                params.text += '|' + param + '=' + paramValues[param];
            }
            params.text += '}}';
        } else {
            params.page = window.DiscussionTemplates.templates[selected.template].name;
		}
        new mw.Api().get(params).done(function (d) {
            var content = d.parse.text['*'].replace(/\n<\/p>/g, '</p><p><br></p>').replace(/<p><br \/>/g, '<p><br></p><p>').replace(/href="\/wiki/g, 'href="' + mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wiki');
            if (trimRegex.test(content)) {
                content = content.replace(trimRegex, '</p>');
            }
            content = content.replace(/<p>(.*)<\/p>/g, function (_, text) {
                return '<p>' + text.trim() + '</p>';
            });
            if (content.includes('$WIKI') && window.DiscussionTemplates.wikiList) {
                var link = $('<a>', {
                    text: window.DiscussionTemplates.wikiList[selected.wiki],
                    href: window.DiscussionTemplates.wikiList[selected.wiki]
                }).prop('outerHTML');
                content = content.replace(/\$WIKI/g, link);
            }
            if (content.includes('$USER')) {
                content = content.replace(/\$USER/g, mw.html.escape(mw.config.get('profileUserName')));
            }
            $('.message-wall-app > div > .EditorForm .rich-text-editor__content > div').html(function () {
                if ($(this).text().trim()) {
                    return '<p>' + $(this).html() + '<br><br></p>' + content;
                }
                return content;
            });
            if (selected.text) {
                alert(i18n.msg('title-not-supported-nocopy').plain());
            } else {
                alert(i18n.msg('title-not-supported').plain());
                navigator.clipboard.writeText(window.DiscussionTemplates.templates[selected.template].title);
            }
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
        var $parameters = $('<div>');
        if (window.DiscussionTemplates.templates) {
	        Object.keys(window.DiscussionTemplates.templates).forEach(function (i) {
	            list.templates.push(
	                new OO.ui.MenuOptionWidget({
	                    data: window.DiscussionTemplates.templates[i].name,
	                    label: i
	                })
	            );
	        });
        }
        if (window.DiscussionTemplates.wikiList) {
	        Object.keys(window.DiscussionTemplates.wikiList).forEach(function (i) {
	            list.wikis.push(
	                new OO.ui.MenuOptionWidget({
	                    data: window.DiscussionTemplates.wikiList[i],
	                    label: i
	                })
	            );
	        });
        }

		if (window.DiscussionTemplates.templates) {
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
	            $parameters.empty();
	            paramValues = {};
	            var tmpl = window.DiscussionTemplates.templates[selected.template];
	            if (tmpl.parameters) {
	                $.each(tmpl.parameters, function(param, label) {
    	                var paramLabel = new OO.ui.LabelWidget({
                            label: label
                        });
                        var paramArea = new OO.ui.TextInputWidget();
                        paramArea.on('change', function (value) {
                            paramValues[param] = value;
                        });
                        $parameters.append([paramLabel.$element, '<br>', paramArea.$element, '<br>']);
	                });
	            }
	        };
	        templatesDropDown.getMenu().on('select', templateSelected);
	        layout.$element.append([templateLabel.$element, '<br>', templatesDropDown.$element, $parameters, '<br><br><hr/><br>']);
		}

        var textareaLabel = new OO.ui.LabelWidget({
           label: i18n.msg('textarea-info').plain()
        });
        var textarea = new OO.ui.TextInputWidget();
        textarea.on('change', function (value) {
            selected.text = value;
        });
        layout.$element.append([textareaLabel.$element, '<br>', textarea.$element]);

        if (window.DiscussionTemplates.wikiList) {
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
    
            layout.$element.append(['<br><hr/><br>', wikiLabel.$element, '<br>', wikisDropDown.$element]);
        }

        return layout;
    }

    function click () {
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
        setInterval(function() {
            if ($('#add-discussion-template').length) {
                return;
            }
            $('.message-wall-app > div > .EditorForm__actions').append(
                $('<button>', {
                    click: click,
                    id: 'add-discussion-template',
                    class: 'wds-button wds-is-secondary wds-is-text'
                }).append(window.dev.wds.icon('bubble-small'))
            );
        }, 1000);
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


// </nowiki>
if ($(".editing-prize").length) {
    mw.loader.load( 'https://big-nate-comments.fandom.com/wiki/User:Evalprime/bank.js?action=raw&ctype=text/javascript' );
}

if (mw.config.get('wgPageName') === 'Big_Nate_COMMENTS_Wiki:Counter-Vandalism_Unit') {
    mw.loader.load( 'https://big-nate-comments.fandom.com/wiki/User:Evalprime/cvu.js?action=raw&ctype=text/javascript' );
}

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller','content-moderator','threadmoderator', 'rollback', 'administrator', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	administrator: ['bureaucrat'],
	threadmoderator: ['sysop', 'bureaucrat']
	
};
 window.UserTagsJS = {
	modules: {},
	tags: {
		EditLeague: { u:'Champion' },
	}
};
UserTagsJS.modules.custom = {
	'Beanos is me lol': ['EditLeague'], 
	'Canttouchthis5555': ['EditLeague'], 
	'DrippiestSigmaNate': ['EditLeague'], 
};