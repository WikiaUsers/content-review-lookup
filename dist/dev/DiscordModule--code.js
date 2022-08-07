/* Name:    DiscordModule 1.0.52
 * Author:  Сибирский Смотритель (Siberian Specules)
 * Idea:    Your Own Waifu
 * Testers: TrJVoRoN
 * settings: .dev.discordmodule; supposed to be per-user
 ** .usenick: show nick instead of username (doesn't respect a-z order)
*/
 
!function (userSettings) {
mw.loader.using('mediawiki.util').done(function() {
	var msg;
    var cfg = mw.config.get([
            'wgPageName',
            'wgUserName',
            'wgUserGroups',
            'wgVersion'
        ]);

    /*global require module list*/
    var moduleList = [];
   
    /* require callback */
    function rcallback (uiFactory, BannerNotification, Spinner) {
        'use strict';
        
     
        if (
            (!$('#WikiaRail').length) &&
            !$('.discord-container').length &&
            cfg.wgPageName !== "MediaWiki:Custom-Discord-Module-Settings"
        ) {
            return;
        }
        
        if (!Spinner) {
            // spinner emulation
            Spinner = function(){return{html:''}};
        }// if !spinner
        
        if (!BannerNotification) {
            // bannernotification emulation
            BannerNotification = function(msg, t) {
                this.msg = msg;
                this.t = t;
            };// BannerNotification
            
            BannerNotification.prototype.show = function() {
                alert(''.concat(this.t, '\n', this.msg));
            };// BannerNotification.show
        }// if !bannernotification
        
        
        var defaultSettings = {
            id: '',
            customDescription: "",
            railPosition: "prepend",
            refreshClass: '',
            showGuideline: true,
            showForAnonym: true,
            showRefresh: true,
            showServerName: true,
            useSvg: true
        };
         
        // Settings from MediaWiki
        function init(callback) {
            var settings = {};
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    action: "raw",
                    title: "MediaWiki:Custom-Discord-Module-Settings",
                },
                success: function(settings) {
                    if (typeof settings.missing === 'undefined') {
                        try {
                            settings = JSON.parse(settings);
                        }
                        catch (ex) {
                            console.log('discord module: can\'t parse json', {ex: ex, data: settings});
                            settings = window.DiscordModuleSettings || {};
                        }
                    } else {
                        settings = window.DiscordModuleSettings || {};
                    }
         
                    callback(settings);
                },
                error: function() {
                    callback({});
                }
            });
        }
         
        // Discord Guild Data
        function getData(settings, container) {
            var id = typeof container.selector.data("id") !== 'undefined' ? 
                container.selector.data("id") : settings.id;
            var discordJSON = "https://discord.com/api/servers/" + id + "/embed.json";
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    try {
                        var data = JSON.parse(request.responseText);
                        if (typeof data.name === undefined)
                            container.showError("Configuration Error: wrong server ID");
         
                        buildModule(data, settings, container);
                    } catch (e) {
                        container.showError(e);
                    }
                } else if (request.readyState == 4) {
                    container.showError("Configuration Error");
                }
            };
            request.open("GET", discordJSON, true);
            request.send();
        }
         
        // Generate block with guild info and join link
        function buildModule(data, settings, container) {
            settings = $.extend({}, defaultSettings, settings, container.getData());
            if (
                typeof settings.showForAnonym !== "boolean" || 
                typeof settings.showServerName !== "boolean" || 
                typeof settings.showGuideline !== "boolean" || 
                typeof settings.useSvg !== "boolean" || 
                typeof settings.customDescription !== "string" ||
                typeof settings.refreshClass !== 'string' ||
                typeof settings.showRefresh !== 'boolean'
            ) {
                return container.showError("Configuration Error: wrong type");
            }
            if (settings.showForAnonym === false && !cfg.wgUserName) {
                container.remove();
                return;
            }
         
            function loadModule(description) {
                var image = !settings.useSvg ? 
                '<div class="discord-icon"></div>' : 
                '<svg xmlns="http://www.w3.org/2000/svg" class="discord-svg" width="20" height="20" viewBox="0 0 240 245">' + 
                    '<path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/>' +
                    '<path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>' +
                '</svg>';
         
                var $module = $('<div class="discord-content">' +
                    '<h2 class="discord-header has-icon">' +
                        image + 
                        (settings.showServerName ? mw.html.escape(data.name) : 'Discord') + 
                    '</h2>' +
                    (description || '') +
                    '<div class="discord-connect">' +
                        (data.instant_invite ? 
                        '<a class="discord-join wds-is-squished wds-button wds-is-secondary">' + msg('join').escape() + '</a>' : 
                        '') +
                        '<a class="discord-online">' + msg('online').escape() + ' <span class="discord-counter">?</span></a>' +
                    '</div>' +
                '</div>'),
                    $refresh = $('<a>', {
                        href: '#',
                        class: 'discord-refresh ' + (settings.refreshClass || ''),
                        text: msg('refresh').escape(),
                        title: msg('refreshTitle').escape(),
                        style: 'float:right'
                    });
                $('body').off('click.discordrefresh');
                if (settings.showRefresh) {
                    $('body').on('click.discordrefresh', '.discord-refresh', function (e) {
                        e.preventDefault();
                        getData(settings, container);
                        return false;
                    });
                    $module.find('.discord-connect').append($refresh);
                }
                $module.find('.discord-join').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
                $module.find('.discord-counter').text(data.presence_count || data.members.length);
                $module.html($module[0].innerHTML);
         
                var avatarsLoaded = false,
                    $members = $('<ul class="discord-list"></ul>');
                data.members.forEach(function (v) {
                    var memberName = v.username.replace(/\s/g, '_'),
                        memberNick = v.nick ? v.nick.replace(/\s/g, '_') : memberName;
                    var $member = $('<li>', {
                        'class': 'discord-member discord-member-' + (userSettings.usenick ? memberNick : memberName)
                    }).append(
                        $('<div>', { 'class': 'discord-avatar' }).append(
                            $('<img>')
                        )
                    );
                    $member.append(
                        mw.html.escape(userSettings.usenick ? v.nick || v.username : v.username)
                        + (v.bot ? '<span class="discord-bot">BOT</span>' : '')
                    );
                    // add title to member
                    if (v.nick) {
                        $member.attr('title', userSettings.usenick ? v.username : v.nick);
                    }
                    $member.find('.discord-avatar').addClass("discord-" + v.status);
                    //$member.find('img').attr("src", v.avatar_url);
                    $member.attr('data-avatar', v.avatar_url);
                    if (v.game) {
                        $member.append(
                            $('<span>', {
                                class: 'discord-member-game',
                                text: v.game.name,
                            })
                        );
                    }
        
                    $members.append($member);
                });
         
                $module.find('.discord-online').click(function(e) {
                    e.preventDefault();
                    uiFactory && uiFactory.init(['modal']).then(function(uiModal) {
                        // add avatars
                        if (!avatarsLoaded) {
                            avatarsLoaded = true;
                            $members.find('.discord-member').each(function () {
                                var $member = $(this);
                                $member.find('img').attr('src', $member.attr('data-avatar'));
                            });
                        }
                        uiModal.createComponent({
                            type: 'default',
                            vars: {
                                id: 'discord-list-modal',
                                title: msg('onlinelist').escape(),
                                content: $members.html(),
                                size: 'small'
                            }
                        }, function(modal) {
                            modal.$element.keydown(function(e) {
                                if (e.which == 27) {
                                    e.preventDefault();
                                    modal.trigger("close");
                                }
                            });
                            modal.bind("reset", function(e) {
                                e.preventDefault();
                                modal.trigger("close");
                            });
                            modal.show();
                            mw.hook('discordmodule.modal.show').fire(modal.$content);
                        });
                    });
                });
         
                container.fill($module, settings.railPosition);
            }
         
            if (settings.showGuideline) {
                var description = '<p class="discord-guideline">' +
                                (settings.customDescription || msg('description').escape()) +
                            '</p>';
                parseWikitext(description, loadModule);
            } else {
                loadModule(false);
            }
        }
         
        // Settings form
        function visualSettings(settings) {
            var $form = $('<div class="discord-settings">' +
                '<form id="ds-id">' +
                    '<label for="ds-form-id">ID:</label>' +
                    '<input id="ds-form-id" name="id"/>' +
                    '<div class="ds-id-instruction">' + msg('instruction').escape() + '</div>' +
                '</form>' +
                '<form id="ds-description">' +
                    '<div class="ds-header">' + msg('descriptionForm').escape() + ' <small>(' + msg('supportsWikitext').escape() + ')</small></div>' +
                    '<textarea id="ds-description-input" name="customDescription" placeholder="' + msg('placeholder').escape() + '"></textarea>' +
                '</form>' +
                '<form id="ds-refresh-class">' +
                    '<div class="ds-header">' + msg('refreshClass').escape() + '</div>' +
                    '<textarea id="ds-refresh-class-input" name="refreshClass"></textarea>' +
                '</form>' +
                '<form id="ds-flags">' +
                    '<div class="ds-header">' + msg('flags').escape() + '</div>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="useSvg"/>' +
                        '<span class="ds-label">' + msg('useSvg').escape() + '</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showForAnonym"/>' +
                        '<span class="ds-label">' + msg('showForAnonym').escape() + '</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showServerName"/>' +
                        '<span class="ds-label">' + msg('showServerName').escape() + '</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showGuideline"/>' +
                        '<span class="ds-label">' + msg('showGuideline').escape() + '</span>' +
                    '</label>' +
                    '<label class="ds-flag">' +
                        '<input type="checkbox" name="showRefresh"/>' +
                        '<span class="ds-label">' + msg('showRefresh').escape() + '</span>' +
                    '</label>' +
                '</form>' +
                '<form id="ds-buttons">' +
                    (cfg.wgUserGroups.indexOf('sysop') !== -1 ? 
                    '<a class="wds-button wds-is-squished ds-save">' + msg('saveSettings').escape() + '</a>' : 
                    '') +
                    '<a class="wds-is-secondary wds-button wds-is-squished ds-reset">' + msg('reset').escape() + '</a>' +
                    '<a class="wds-is-secondary wds-button wds-is-squished ds-html">' + msg('generateHTML').escape() + '</a>' +
                '</form>' +
                '<textarea class="ds-generated" style="display: none;"></textarea>' +
            '</div>');
         
            s2v(settings, $form);
            $form.find('.ds-save').click(function () {
                $.ajax({
                    url: mw.util.wikiScript('api'),
                    type: 'POST',
                    data: {
                        action: "edit",
                        title: "MediaWiki:Custom-Discord-Module-Settings",
                        token: mw.user.tokens.get('csrfToken'),
                        text: JSON.stringify(v2s($form)),
                        summary: "Editing settings",
                        recreate: true
                    },
                    success: function() {
                        new BannerNotification(msg('successChange').escape(), 'confirm').show();
                    },
                    error: function(e) {
                        new BannerNotification(msg('errorChange').escape(), 'error').show();
                        console.error(e);
                    }
                });
            });
         
            $form.find('.ds-reset').click(function() {
                s2v(settings, $form);
            });
         
            $form.find('.ds-html').click(function () {
                var data = v2s($form);
                Object.keys(data).map(function(key) {
                    data["data-" + key.replace(/([A-Z])/g, '-$1')] = data[key];
                    delete data[key];
                });
         
                $form.find('.ds-generated').val(
                    $('<div/>').append(
                        $('<div class="discord-container"> </div>').attr( data )
                    ).html()
                ).show();
            });
         
            $('#mw-content-text').before($form);
        }
         
        // Settings to visual
        function s2v(settings, selector) { 
            selector.find('#ds-form-id').val( getAttr("id") );
            selector.find('#ds-description-input').val( getAttr("customDescription") );
            selector.find('#ds-refresh-class-input').val( getAttr("refreshClass") );
        
            ["showForAnonym", "showGuideline", "useSvg", "showServerName", 'showRefresh']
            .forEach(function(v) {
                checkIf( !getAttr(v), v );
            });
         
            function getAttr(attr) {
                if (typeof settings[attr] !== 'undefined')
                    return settings[attr];
                return defaultSettings[attr];
            }
         
            function checkIf(condition, checkbox) {
                var $checkbox = selector.find('[name="' + checkbox + '"]');
                if (condition)
                    $checkbox.prop('checked', true);
                else
                    $checkbox.prop('checked', false);
            }
        }
         
        // Visual to settings
        function v2s(selector) { 
            return selector.find("#ds-id, #ds-description, #ds-flags, #ds-refresh-class")
                .serializeArray()
                .map(function(v) {
                    if (
                        v.value === "on" &&
                        ["showForAnonym", "showGuideline", "useSvg", "showServerName", 'showRefresh']
                        .indexOf(v.name) != -1
                    ) { 
                        v.value = false;
                    }
         
                    return [v.name, v.value];
                })
                .reduce(function(obj, pair) {
                    obj[pair[0]] = pair[1];
                    return obj;
                }, {});
        }
         
        // Container's object: rail section or block in content
        function Container(type, selector) {
            this.type = type;
            if (type == "box") {
                this.selector = $(selector).addClass("rail-module");
            } else {
                var newSelector = $('<div class="discord-module rail-module"></div>');
                $(selector).prepend(newSelector);
                this.selector = newSelector;
            }
            this.fill(this.preload);
        }
        
        Container.prototype.remove = function() {
            if (this.selector && this.selector instanceof jQuery) this.selector.remove();
        };
        
        Container.prototype.preload = $(
        '<div class="discord-preload">' + new Spinner(38, 2).html.replace('wds-block', 'wds-spinner__block').replace('wds-path', 'wds-spinner__stroke') + '</div>');
         
        Container.prototype.getData = function() {
            if (this.type === "rail") return {};
            return this.selector.data();
        };
         
        Container.prototype.fill = function(content) {
            this.selector.html(content);
            mw.hook('discordmodule.fill').fire(this.selector instanceof jQuery ? this.selector : $(this.selector));
        };
         
        Container.prototype.showError = function(text) {
            this.fill(
                '<div class="discord-error">' + 
                    text + '<br/>' + 
                    '<a href="?action=purge">Reload?</a>' + 
                '</div>', 
            'prepend');
        };
         
        // Wikitext parser
        function parseWikitext(text, callback) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'GET',
                data: {
                    action: "parse",
                    contentmodel: "wikitext",
                    text: text,
                    format: 'json'
                },
                success: function(data) {
                    callback(data.parse.text['*']);
                }
            });
        }
         
        // Run
        init(function(settings) {
            window.importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:DiscordModule/style.css'
            });
         
            if ( $('#WikiaRail').length ) {
                getData( settings, new Container('rail', '#WikiaRail') );
            }
         
            if ( $('.discord-container').length ) {
                $('.discord-container').each(function() {
                    getData( settings, new Container('box', $(this)) );
                });
            }
         
            if ( cfg.wgPageName === "MediaWiki:Custom-Discord-Module-Settings" ) {
                visualSettings(settings);
            }
        });
     
    }// rcallback
    
    /* require error handler */
    function rerrHandler(error) {
        console.warn('DiscordModule require error', error);
        /*
        if (error === 'Module ext.wikia.design-system.loading-spinner is not defined.') {
            // try to restore after spinner error
            moduleList.splice(-1);
            require(moduleList, rcallback, rerrHandler);
        }
        */
    }
    
    mw.hook('dev.i18n').add(function(i18n) {
		i18n.loadMessages('DiscordModule').done(function(i18no) {
			msg = i18no.msg;

		    /*global require */
		    mw.loader.using(moduleList, rcallback, rerrHandler);
		});
	});
	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})}((window.dev = window.dev || {}).discordmodule = window.dev.discordmodule || {});