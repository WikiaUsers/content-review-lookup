// __NOWYSIWYG__ <source lang="javascript">
/**
 * Special.js (renders Special:Scripts)
 *
 * Preferences
 * a plugin for Wikia addons that adds a web-interface with user-configurable
 * options that are saved persistently
 * documentation at: http://dev.wikia.com/wiki/Preferences
 * © Peter Coester, 2012
 *
 */

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

;(function (module, $, mw, window) {
    
    'use strict';
    
    if (module.log) return;
    
    if (mw.config.get('wgCanonicalNamespace') !== 'Special' || mw.config.get('wgTitle') !== 'Scripts') return;
    
    var localLink, globalLink, publicLink, colors, title, localConts, globalConts,
        log, debug, tabsLocal, tabsGlobal,
        
        mainContent = $('#WikiaMainContent'),
        wikiaPage   = $('#WikiaPage'),
        wiki        = mw.config.get('wgSiteName');

    var colorDefer, loaderDefer = $.Deferred();
    mw.loader.using(['jquery.ui.slider'], loaderDefer.resolve, loaderDefer.reject);
    colorDefer = $.getScript('//dev.wikia.com/wiki/Colors/code.js?action=raw&ctype=text/javascript');
    
    var styleSheet = '@import url(http://fonts.googleapis.com/css?family=Coda);body.script-prefs article#WikiaMainContent{min-height:400px}body.script-prefs article#WikiaMainContent{width:100%;margin:0}body.script-prefs header#WikiaPageHeader,body.script-prefs div#WikiaArticle,body.script-prefs div#WikiaArticleBottomAd,body.script-prefs div#WikiaRail,body.script-prefs section#WikiaSearchHeader,body.script-prefs header#AdminDashboardHeader,body.script-prefs section#WikiAnswers,body.script-prefs div.adm-dash-search{display:none}.WikiaMainContent *{margin:0;padding:0}#pref-header *,#preferences *{font-family:Coda,Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.01em}#pref-header a,#preferences a{text-decoration:none}#pref-header{margin-top:10px;position:relative}#pref-header h2{bottom:10px;left:300px;position:absolute}#pref-frame:after{background-color:$page;border:medium none;border-radius:0 0 0 25px;bottom:0;content:"";display:block;height:25px;margin-bottom:0;padding:0;position:absolute;text-align:right;width:25px}#pref-frame:after,#pref-frame:before{left:100%}#pref-frame:before{background-color:$menu;bottom:0;content:"";display:block;height:25px;left:100%;position:absolute;width:25px}.script-names{background-color:$menu;list-style:none outside none}#pref-frame{background-color:$menu;border-radius:0 20px 0 20px;display:inline-block;position:relative;width:275px}#prefs-links{display:block;list-style:none outside none;width:100%}#prefs-links a{width:60px}#prefs-links a,.addon-name a{border-radius:0 8px 0 8px;color:$contrast;display:block;height:25px;line-height:25px}#prefs-links>li,.addon-name{border-left:12px solid $menu;display:inline-block;height:25px;text-align:center}.addon-name>a:hover,#prefs-links a:hover{background-color:$page;color:$link}.addon-name.active>a,.addon-name.active>a:hover{background-color:$page;color:$text;cursor:default}.local #local-link,.global #global-link,.public #public-link,.addon-name.active a{background-color:$page;color:$text;cursor:default}#pref-frame>h1{background-color:$menu;margin-right:25px;position:relative;text-align:center}#pref-frame>h1>a{background-color:$page;border-radius:0 8px 0 12px;display:block;font-size:20px;letter-spacing:.05em;line-height:40px}.addon-name>a{padding:0 12px}.public #tabs-local,.public #tabs-global,.local #contents-public,.local #tabs-global,.global #tabs-local,.global #contents-public{display:none}.public #contents-public,.local #tabs-local,.global #tabs-global{display:block}.pseudo-tab{border-top:25px solid $menu}.script-contents{min-height:200px;padding:40px 60px}.script-settings{display:none}.script-settings.active{display:block}.script-contents fieldset{border:1px solid $border;border-radius:0 8px 0 8px;padding:10px 20px;margin-bottom:10px}.script-contents input[type="text"]{border:1px solid $border;border-radius:0 6px 0 6px;outline:medium none;padding:2px 4px 0}.script-contents legend{margin-left:-8px;padding:0 8px}#save-section{padding:10px 60px}.script-contents input[type="button"],#save-button{background-color:$menu;background-image:none;border:1px solid $menu;border-radius:0 8px 0 8px;color:$contrast;cursor:pointer;display:inline-block;font-family:Coda,Helvetica,Arial,sans-serif;font-size:12px;height:23px;line-height:23px;margin:0;min-width:80px;padding:0 15px;text-align:center;text-decoration:none;white-space:nowrap}.script-contents input[type="button"]:hover,#save-button:hover{background-color:$page;border-color:$border;color:$link}.script-contents .ui-slider{background:$border;border:0;margin:0 50px;height:7px}.script-contents .ui-slider-handle{background:$menu;border:1px solid $border}.script-contents .ui-slider,.script-contents .ui-slider-handle{border-radius:0 6px 0 6px}.script-contents select{background-color:$page;color:$text;border:1px solid $border;border-radius:0 8px 0 8px;padding:0 0 0 6px;height:24px;vertical-align:baseline}.shared-lang{width:550px;margin:0 auto}.shared-lang tr.slider-captions td{border-left:1px solid $border;color:$border;text-align:center;font-size:10px;font-weight:normal;vertical-align:text-bottom;width:16.5%}.shared-lang tr.slider-captions td:first-child{border:0}.shared-lang tr.slider-captions td.selected{color:$text;font-size:12px;font-weight:bold;font-variant:small-caps}#shared-lang-table{margin:6px 0 12px 0}';
    
    function updateLink (hash) {
        publicLink
        .add(tabsLocal .find('a'))
        .add(tabsGlobal.find('a'))
        .filter(function () {
            return $(this).attr('href') === hash;
        })
        .click();
    }

    function createHashCheck () {
        var currentHash = window.location.hash;
        var hashCheck;
        $(window)
        .focus(function () {
            hashCheck = window.setInterval(function () {
                var hash = window.location.hash;
                if (currentHash !== hash) {
                    currentHash = hash;
                    updateLink(hash);
                }
            }, 100);
        })
        .blur(function () {
            window.clearInterval(hashCheck);
        });
        $(window).focus();
    }
    
    function evalHash () {
        /*jshint validthis:true*/
        var hash = $(this).attr('href');
        var matches = hash.match(/^#(\w+)(?:\:(local|global))?$/);
        if (!matches) return false;
        
        var addon = matches[1] === 'public' ? false : matches[1];
        var local = matches[2] === 'local';
        
        var link = $('.addon-name')
        .removeClass('active')
        .find('[href="' + hash + '"]');
        
        link.parent().addClass('active');
        
        title.text(addon ? (local ?
            'settings for addon "' + link.text() + '" for ' + wiki :
            'settings for addon "' + link.text() + '" for all of Wikia') :
            'settings that are visible for every user and all addons'
        );
        
        if (!addon) {
            mainContent.addClass('public')
            .removeClass('local').removeClass('global');
        } else {
            // add test to check if hash actually exists!
            localLink.attr('href', '#' + addon + ':local');
            globalLink.attr('href', '#' + addon + ':global');
            
            var contents = $('.script-settings');
            contents
            .removeClass('active');
            contents.filter('[rel="' + hash + '"]')
            .addClass('active');
            if (local) {
                mainContent.addClass('local')
                .removeClass('public').removeClass('global');
            } else {
                mainContent.addClass('global')
                .removeClass('public').removeClass('local');
            }
        }
        window.location.replace(hash);
        return false;
    }
    
    function addStyleSheet (styleSheet) {
        $(window.document.head)
        .append(
        '<style type="text/css">' +
            window.dev.colors.replace(styleSheet) +
        '</style>');
    }
    
    function addTab (name, contents, local) {
        var internal = name.replace(/\W/g, '_') + (local ? ':local' : ':global');
        if (!window.location.hash) {
            window.location.replace('#' + internal);
        }
        if (local && !localLink.attr('href').length) {
            localLink.attr('href', '#' + internal);
        }
        if (!local && !globalLink.attr('href').length) {
            globalLink.attr('href', '#' + internal);
        }
        var li = $('<li class="addon-name"><a href="#' + internal + '">' + name + '</a></li>')
            .appendTo(local ? '#names-local' : '#names-global');
        $(window.document.body).prepend('<a name="' + internal + '"></a>');
        var settings = $('<div class="script-settings" rel="#' + internal + '"></div>')
        .appendTo(local ? localConts : globalConts)
        .append(contents);
        li.find('a').click(evalHash);
        if (window.location.hash === '#' + internal) {
            li.find('a').click();
        }
        return settings;
    }
    
    function addSections () {
        $('body.mediawiki').addClass('script-prefs');
        mainContent
        .prepend(
        '<div id="pref-header">' +
            '<div id="pref-frame">' +
                '<ul id="prefs-links">' +
                    '<li><a href="" id="local-link">local</a></li>' +
                    '<li><a href="" id="global-link">global</a></li>' +
                    '<li><a href="#public" id="public-link">public</a></li>'+
                '</ul>' +
                '<h1><a href="http://dev.wikia.com/wiki/Preferences">Special:Scripts</a></h1>' +
            '</div>' +
            '<h2 id="pref-title"></h2>' +
        '</div>' +
        '<div id="preferences">' +
            '<div id="tabs-local">' +
                '<ul class="script-names" id="names-local"></ul>' +
                '<div class="script-contents pseudo-tab" id="contents-local"></div>' +
            '</div>' +
            '<div id="tabs-global">' +
                '<ul class="script-names" id="names-global"></ul>' +
                '<div class="script-contents pseudo-tab" id="contents-global"></div>' +
            '</div>' +
            '<div class="script-contents pseudo-tab" id="contents-public"></div>' +
        '</div>' +
        '<div id="save-section">'+
            '<input id="save-button" type="button" value="Save" style="visibility: hidden;" />' +
        '</div>')
        .addClass('local');
        
        localLink   = $('#local-link');
        globalLink  = $('#global-link');
        publicLink  = $('#public-link');
        title       = $('#pref-title');
        localConts  = $('#contents-local');
        globalConts = $('#contents-global');
        tabsLocal   = $('#tabs-local');
        tabsGlobal  = $('#tabs-global');
        
        $('#prefs-links').find('a')
        .click(evalHash);
    }
    
    function initSaveButton (save) {
        var button = $('#save-button')
        .click(function () {
            wikiaPage.startThrobbing();
            save()
            .always(function () {
                wikiaPage.stopThrobbing();
            });
        });
        return function () {
            button.css('visibility', 'visible');
        };
    }
    
    function createTabs () {
        
        var Tab = function (addon, isLocal) {
            this.addon = addon;
            this.selector = false;
            this.isLocal = isLocal;
        };
        
        Tab.prototype.add = function (data) {
            if (typeof data === 'string') data = $(data);
            if (!(data instanceof window.jQuery)) {
                throw new Error ('expected HTML string or jQuery object');
            }
            if (this.selector) {
                this.selector.append(data);
            } else {
                (this.isLocal ? localConts : globalConts).removeClass('pseudo-tab');
                this.selector = addTab(this.addon, data, this.isLocal);
            }
            return this.selector;
        };
        
        var tabs = { list: {} };
        
        tabs.add = function (addon, isLocal, data) {
            var type = isLocal ? 'local' : 'global';
            tabs.list[addon] = tabs.list[addon] || {};
            tabs.list[addon][type] = tabs.list[addon][type] || new Tab(addon, isLocal);
            return tabs.list[addon][type].add(data);
        };
        
        tabs.css = function (data) {
            addStyleSheet(data);
        };
        
        tabs.log = function () {
            $.each(tabs.list, function (addon, entry) {
                if (entry.local) {
                    log('local tab [' + addon + ']: ', entry.local.selector);
                }
                if (entry.global) {
                    log('global tab [' + addon + ']: ', entry.global.selector);
                }
            });
        };
        
        tabs.logAddon = function (addon) {
            if (tabs.list[addon]) {
                if (tabs.list[addon].local) {
                    log('local tab: ', tabs.list[addon].local.selector);
                }
                if (tabs.list[addon].global) {
                    log('global tab: ', tabs.list[addon].global.selector);
                }
            }
        };
        
        return tabs;
    }
    
    function createLanguageTab () {
        
        var languageTab = {};
        
        var languages = {
            ar: 'العربية',
            ast: 'asturianu',
            bg: 'български',
            bn: 'বাংলা',
            ca: 'català',
            cs: 'česky',
            da: 'dansk',
            de: 'Deutsch',
            el: 'Ελληνικά',
            en: 'English',
            eo: 'Esperanto',
            es: 'español',
            et: 'eesti',
            eu: 'euskara',
            ext: 'estremeñu',
            fa: 'فارسی',
            fo: 'føroyskt',
            fr: 'français',
            fy: 'Frysk',
            gl: 'galego',
            he: 'עברית',
            hr: 'hrvatski',
            hu: 'magyar',
            hy: 'Հայերեն',
            is: 'íslenska',
            it: 'italiano',
            ja: '日本語',
            ka: 'ქართული',
            km: 'ភាសាខ្មែរ',
            ko: '한국어',
            ksh: 'Ripoarisch',
            ln: 'lingála',
            lt: 'lietuvių',
            mk: 'македонски',
            ml: 'മലയാളം',
            mr: 'मराठी',
            nl: 'Nederlands',
            no: 'norsk (bokmål)‎',
            pl: 'polski',
            pt: 'português',
            ro: 'română',
            ru: 'русский',
            sk: 'slovenčina',
            sl: 'slovenščina',
            sr: 'српски / srpski',
            fi: 'suomi',
            sv: 'svenska',
            th: 'ไทย',
            tr: 'Türkçe',
            uk: 'українська',
            vi: 'Tiếng Việt',
            yue: '粵語',
            zh: '中文（简体）‎'
        };
        
        var choices = {}, table,
            contentLang = mw.config.get('wgContentLanguage');
        
        function addSlider (lang, name, level) {
            level = level || 0;
            if (choices[lang] !== undefined) return;
            choices[lang] = level;
            var captions = {
                en: ['none', 'basic', 'intermediate', 'advanced', 'near native', 'native']
            };
            
            var tds = '';
            $.each(captions[contentLang], function (i, cap) {
                tds += '<td' + (i === level ? ' class="selected"' : '') + '>' + cap + '</td>';
            });
            
            var row = $(
            '<tr style="vertical-align: bottom;">' +
                '<td style="text-align: right;">' + name + '</td>' +
                '<td><table class="shared-lang">'+
                     '<tr class="slider-captions">' + tds + '</tr>' +
                     '<tr><td colspan="6"><div class="shared-lang-slider"></div></td></tr>' +
                '</table></td>' +
                '<td style="vertical-align: botttom"><input type="button" value="remove" /></td>' +
            '</tr>')
            .appendTo(table);
            
            row.find('input[type="button"]')
            .click(function () {
                $(this).closest('tr').remove();
                delete choices[lang];
                console.log(choices);
            });
            
            var capts = row.find('.slider-captions').children('td');
            
            row.find('.shared-lang-slider')
            .slider({
                value: level,
                min:   0,
                max:   5,
                step:  1,
                slide: (function (capts, lang) {
                    return function( event, ui ) {
                        capts
                        .removeClass('selected')
                        .eq(ui.value)
                        .addClass('selected');
                        
                        choices[lang] = ui.value;
                        console.log(choices);
                    };
                } (capts, lang))
            });
            console.log(choices);
        }
        
        languageTab.form = function (map) {
            var opts = '';
            $.each(languages, function (lang, name) {
                lang = lang === contentLang ? lang + '" selected="selected' : lang;
                opts += '<option value="' + lang + '">' + name + '</option>';
            });
            
            $('#contents-public')
            .append('<fieldset><legend>Languages</legend>' +
                '<p>What languages do you speak and want other users to contact you in?</p>' +
                '<table id="shared-lang-table"><tr>' +
                    '<td style="padding: 10px;"><input type="button" id="shared-lang-add" value="add" /></td>' +
                    '<td colspan="2"><select id="shared-lang-select">' + opts + '</select></td></tr>' +
                '</table>' +
            '</fieldset>');
            
            var select = $('#shared-lang-select');
            
            table = $('#shared-lang-table');
                
            $('#shared-lang-add')
            .click(function () {
                var selected = select.val();
                addSlider(selected, languages[selected]);
            });
            
            if (map.values && map.values.languages) {
                $.each(map.values.languages, function (lang, level) {
                    if (languages[lang] && level) {
                        addSlider(lang, languages[lang], level);
                    }
                });
            }
        };
        
        languageTab.post = function (map) {
            var evaluated = {};
            if (!$.isEmptyObject(choices)) {
                $.each(choices, function (lang, level) {
                    if (choices[lang]) evaluated[lang] = level;
                });
                if (!$.isEmptyObject(evaluated)) {
                    map.values.languages = evaluated;
                }
            }
        };
        
        return languageTab;
    }
    
    function createSharedTab () {
        
        var sharedTab = {};
        
        var languageTab = createLanguageTab();
        
        sharedTab.form = function (map) {
            loaderDefer
            .done(function () {
                languageTab.form(map);
            });
        };
        
        sharedTab.post = function (map) {
            languageTab.post(map);
        };
        
        return sharedTab;
    }
    
    module.preparePage = function (exchange) {
        log   = exchange.log;
        debug = exchange.debug;
        $(window.document.head)
        .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />');
        colorDefer
        .done(function () {
            addStyleSheet(styleSheet);
        });
        addSections();
        return {
            tabs: createTabs(),
            sharedTab: createSharedTab(),
            defer: colorDefer
        };
    };
    
    module.initSave = function (save) {
        createHashCheck();
        return initSaveButton(save);
    };
    
}((window.dev = window.dev || {}).preferences = window.dev.preferences || {}, jQuery, mediaWiki, window));
//</source>