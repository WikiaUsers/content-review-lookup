(function($, mw, FandomizedChat, mainRoom){
    function StatsMenu(user, room){
        this.fc = FandomizedChat;
        this.room = typeof room !== 'undefined' ? room : mainRoom;
        this.loaded = false;
        this.show = $.Deferred();
        this.user = user;
        this.userData = this.fc.getUserData(this.user);
        this.self = this.fc.self;
        this.isMod = this.fc.isMember(this.self, 'mod');
        this.isAdmin = this.fc.isMember(this.self, 'admin');
    }
    
    StatsMenu.prototype.actions = $.extend(FandomizedChat.statsMenu, {
        profile: {
            type: 'main',
            id: 'statsmenu-profile',
            message: 'stats_menu_profile',
            link: '/wiki/User:$username'
        },
        talk: {
            type: 'main',
            id: 'statsmenu-usertalk',
            message: 'stats_menu_userTalk',
            link: '/wiki/User_talk:$username',
            check: function(){
                return !this.fc.hasMessageWall;
            }
        },
        messagewall: {
            type: 'main',
            id: 'statsmenu-messagewall',
            message: 'stats_menu_messageWall',
            link: '/wiki/Message_Wall:$username',
            check: function(){ 
                return this.fc.hasMessageWall;
            }
        },
        contributions: {
            type: 'main',
            id: 'statsmenu-contributions',
            message: 'stats_menu_contributions',
            link: '/wiki/Special:Contributions/$username'
        },
        messageblocker: {
            type: 'main',
            id: 'statsmenu-messageblocker',
            message: 'stats_menu_messageBlocker',
            check: function(target){
                return !this.storage.getArray('messageBlocked').has(target);
            },
            handler: function(target){
                var messageBlocker = this.fc.performAction('messageBlocker', target);
                messageBlocker.block();
                var $selector = $('#' + this.actions[key].id),
                    inverse = this.actions.messageunblocker,
                    $inverse = $('#' + inverse.id);
                $selector.addClass('hidden');
                $inverse.removeClass('hidden');
            }
        },
        messageunblocker: {
            type: 'main',
            id: 'statsmenu-messageunblocker',
            message: 'stats_menu_messageUnblocker',
            check: function(target){
                return this.storage.getArray('messageBlocked').has(target);
            },
            handler: function(target){
                var messageBlocker = FandomizedChat.performAction('messageBlocker', target);
                messageBlocker.unblock();
                var $selector = $('#' + this.actions[key].id),
                    inverse = this.actions.messageblocker,
                    $inverse = $('#' + inverse.id);
                $selector.addClass('hidden');
                $inverse.removeClass('hidden');
            }
        },
        blockpms: {
            type: 'main',
            id: 'statsmenu-blockpms',
            message: 'stats_menu_blockPMs',
            check: function(target){
                return !this.fc.isBlocked(target);
            },
            handler: function(target, key){
                mainRoom.blockPrivate({ name: target });
                var $selector = $('#' + this.actions[key].id),
                    inverse = this.actions.allowpms,
                    $inverse = $('#' + inverse.id);
                $selector.addClass('hidden');
                $inverse.removeClass('hidden');
            }
        },
        allowpms: {
            type: 'main',
            id: 'statsmenu-allowpms',
            message: 'stats_menu_allowPMs',
            check: function(target){
                return this.fc.isBlocked(target);
            },
            handler: function(target){
                mainRoom.allowPrivate({ name: target });
                var $selector = $('#' + this.actions[key].id),
                    inverse = this.actions.blockpms,
                    $inverse = $('#' + inverse.id);
                $selector.addClass('hidden');
                $inverse.removeClass('hidden');
            }
        },
        kick: {
            type: 'mod',
            id: 'statsmenu-kick',
            message: 'stats_menu_kick',
            handler: function(target){
                mainRoom.kick({ name: target });
            }
        },
        ban: {
            type: 'mod',
            id: 'statsmenu-ban',
            message: 'stats_menu_ban',
            handler: function(target){
                var banModal = FandomizedChat.BanModal({ value: target });
                $.when(banModal.submit).done(function(modal){
                    modal.init();
                });
            }
        },
        block: {
            type: 'admin',
            id: 'statsmenu-block',
            message: 'stats_menu_block',
            handler: function(target){
                var blockModal = FandomizedChat.BlockModal({ value: target });
                $.when(blockModal.submit).done(function(modal){
                    modal.init();
                });
            }
        }
    });
    
    StatsMenu.prototype.enabled = {
        profile: true,
        talk: true,
        messagewall: true,
        contributions: true,
        messageblocker: true,
        messageunblocker: false,
        blockpms: true,
        allowpms: false,
        kick: true,
        ban: true,
        block: true
    };
    
    StatsMenu.prototype.create = function(){
        var statsMenu = $('<section />').addClass('StatsMenu user-stats-menu'),
            header = $('<header />').addClass('StatsMenuHeader user-stats-menu-header'),
            content = $('<nav />').addClass('StatsMenuContent user-stats-menu-content'),
            mainCommands = $('<div />').addClass('StatsMenuSection user-stats-menu-main-commands'),
            mainCommandsList = $('<ul />').addClass('StatsMenuList user-stats-menu-main-command-list'),
            modCommands = $('<div />').addClass('StatsMenuSection user-stats-menu-mod-commands'),
            modCommandsHeading = $('<h2 />').addClass('StatsMenuHeading user-stats-menu-mod-commands-heading'),
            modCommandsList = $('<ul />').addClass('StatsMenuList user-stats-menu-mod-command-list'),
            adminCommands = $('<div />').addClass('StatsMenuSection user-stats-menu-admin-commands'),
            adminCommandsHeading = $('<h2 />').addClass('StatsMenuHeading user-stats-menu-admin-commands-heading'),
            adminCommandsList = $('<ul />').addClass('StatsMenuList user-stats-menu-admin-command-list');
        $.each(this.actions, $.proxy(function(key, action){
            var $element;
            switch (action.type){
                case 'main':
                    $element = this.createCommand(key, action);
                    mainCommandsList.append($element);
                    break;
                case 'mod':
                    if (this.fc.isMember(this.user, 'mod')){
                        $element = this.createCommand(key, action);
                        modCommandsList.append($element);
                    } else $element = null;
                    break;
                case 'admin':
                    if (this.fc.isMember(this.user, 'admin')){
                        $element = this.createCommand(key, action);
                        adminCommandsList.append($element);
                    } else $element = null;
                    break;
                default:
                    $element = null;
            }
        }, this));
        
        mainCommands.html(mainCommandsList);
        var _content = [mainCommands];
        if (this.isMod){
            modCommands.html([modCommandsHeading, modCommandsList]);
            _content[_content.length] = modCommands;
        }
        if (this.isAdmin){
            adminCommands.html([adminCommandsHeading, adminCommandsList]);
            _content[_content.length] = adminCommands;
        }
        content.html(_content);
        header.html($.proxy(this.createUserHeader, this));
        this.menu = statsMenu.html([header, content]);
    };
    
    StatsMenu.prototype.createCommand = function(key, action){
        var $command = $('<li />').addClass('StatsMenuItem'),
            text = this.fc.i18n.msg(action.message).escape(),
            $trigger = $('<a />').addClass('StatsMenuTrigger').attr('id', action.id).text(text);
        if (typeof action.check === 'function'){
            this.enabled[key] = action.check.apply(this, [this.user]);
        }
        if (!this.enabled[key]){
            $command.addClass('hidden');
        }
        switch (action.type){
            case 'main':
                $command.addClass('user-stats-menu-main-command');
                $trigger.addClass('user-stats-menu-main-command-trigger');
                break;
            case 'mod':
                $command.addClass('user-stats-menu-mod-command');
                $trigger.addClass('user-stats-menu-mod-command-trigger');
                break;
            case 'admin':
                $command.addClass('user-stats-menu-admin-command');
                $trigger.addClass('user-stats-menu-admin-command-trigger');
                break;
            default:
                break;
        }
        if (typeof action.link === 'string'){
            $trigger.attr('href', action.link);
        } else if (typeof action.handler === 'function'){
            $trigger.attr('href', '#' + action.id).on('click', $.proxy(function(event){
                event.preventDefault();
                action.handler.apply(this, [this.user, key, event]);
            }, this));
        }
        $command.html($trigger);
        return $command;
    };
    
    StatsMenu.prototype.createUserHeader = function(){
        var $avatarContainer = $('<section />').addClass('StatsMenuAvatarWrapper user-stats-menu-avatar-wrapper'),
            $avatar = $('<div />').addClass('StatsMenuAvatar user-stats-menu-avatar wds-avatar'),
            $avatarBadge = this.fc.getBadge(this.user),
            $avatarImg = $('<img />').attr({
                'src': this.userData.avatar,
                'alt': this.user,
                'title': this.user
            }).addClass('wds-avatar__image'),
            $avatarHtml = [$avatarImg];
            $info = $('<section />').addClass('StatsMenuInfo user-stats-menu-info');
        if ($avatarBadge !== null) $avatarHtml[$avatarHtml.length] = $avatarBadge;
        $info.html($.proxy(function(){
            var $username = $('<div />').addClass('StatsMenuUsername user-stats-menu-username'),
                $user = $('<span />').addClass('StatsMenuUsernameText user-stats-menu-username-text').text(this.user),
                editcount = this.fc.condenseNumber(this.userData.editcount),
                $editcount = $('<span />').addClass('StatsMenuEditcount user-stats-menu-editcount').text(editcount + 'edits'),
                since = this.fc.getSince(this.userData.since, 'm yyyy'),
                $since = $('<div />').addClass('StatsMenuSince user-stats-menu-since').text(since);
            return [$username.html([$user, $editcount]), $since];
        }, this));
        $avatarContainer.html($avatar.html($avatarHtml));
        this.loaded = true;
        return [$avatarContainer, $info];
    };
    
    StatsMenu.prototype.open = function(event){
        var $listItem = $('.User[data-user="' + this.user + '"]');
        $listItem.append(this.menu);
    };
    
    StatsMenu.prototype.close = function(event){
        var $listItem = $('.User[data-user="' + this.user + '"]');
        $listItem.remove('.StatsMenu');
    };
    
    $(importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:FandomizedChat/statsmenu.css'
    })).on('load', function(){
        mainRoom.viewUsers.unbind('mainListClick');
        mainRoom.viewUsers.bind('mainListClick', function(child){
            var statsMenu = new StatsMenu(child.attributes.name, mainRoom);
            statsMenu.create();
            statsMenu.open();
            $(window).on('click', function(event){
                if (!$(event.target).is('.StatsMenu, .StatsMenu *')){
                    statsMenu.close();
                }
            });
        });
        window.FandomizedChat.StatsMenu = StatsMenu;
    });
}(jQuery, mediaWiki, window.FandomizedChat, mainRoom));