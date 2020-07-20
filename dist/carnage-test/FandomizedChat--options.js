/**
 * Chat Features
 * Description:
 * Changes how the chat looks and functions by using a UI.
 * <NEW> Uses localStorage to store the changes.
 * 
 * Original creators:
 * • Callofduty4
 * • Madnessfan34537
 * • Sactage
 * 
 * Modified by: Ultimate Dark Carnage
 **/
 
window.ChatFeatures = (function(mw, $, mainRoom, config){
    var ChatFeatures = {};
    ChatFeatures.getItem = function(item){
        var value = localStorage.getItem('ChatFeatures-' + item);
        try {
            value = JSON.parse(value);
        } catch (e){
            return value;
        }
        return value;
    };
    ChatFeatures.setItem = function(item, value){
        if (typeof value === 'object' && value !== null){
            value = JSON.stringify(value);
        }
        localStorage.setItem('ChatFeatures-' + item, value);
    };
    ChatFeatures.setEnabledState = function(module, value){
        var item = this.getItem('modules');
        if (value === 'disabled'){
            item[module].enabled = false;
        } else {
            item[module].enabled = true;
        }
        this.setItem('modules', item);
    };
    ChatFeatures.getEnabledState = ChatFeatures.isEnabled = function(module){
        var item = this.getItem('modules');
        if (!item.hasOwnProperty(module)) return null;
        else {
            return item[module].enabled;
        }
    };
    ChatFeatures.windowRestart = function(delay){
        if (!isNaN(delay)){
            delay = typeof delay === 'number' ? delay : parseInt(delay, 10);
            setTimeout(() => {
                window.location.reload();
            }, delay);
        } else {
            window.location.reload();
        }
    };
    ChatFeatures.Hotspot = function(properties, wrapper){
        properties = $.extend({
            x: 0,
            y: 0
        }, properties);
        if (typeof properties.position === 'string'){
            var position = properties.position.split(/\s+/g);
            position = position.slice(0, 2).join(' ');
            var positions = {
                'top left': {
                    x: 0,
                    y: 0
                },
                'top center': {
                    x: Math.floor(window.innerWidth / 2),
                    y: 0
                },
                'top right': {
                    x: window.innerWidth,
                    y: 0
                },
                'center left': {
                    x: 0,
                    y: Math.floor(window.innerHeight / 2)
                },
                'center right': {
                    x: window.innerWidth,
                    y: Math.floor(window.innerHeight / 2),
                },
                'bottom left': {
                    x: 0,
                    y: window.innerHeight
                },
                'bottom center': {
                    x: Math.floor(window.innerWidth / 2),
                    y: window.innerHeight
                },
                'bottom right': {
                    x: window.innerWidth,
                    y: window.innerHeight
                }
            };
            properties = $.extend(positions[position], properties);
        }
        var $hotspot = $('<div />', { 'class': 'wiki-chat-hotspot hotspot', 'id': properties.id });
        $hotspot.css({ 'top': properties.y, 'left': properties.x });
        this.$hotspot = $hotspot;
        this.properties = properties;
        this.wrapper = wrapper;
    };
    ChatFeatures.Hotspot.prototype.insertHTML = function(html){
        var $html = html instanceof jQuery ? html : $(html),
            $wrapped = $html.wrap(this.wrapper).parent();
        this.html = $wrapped;
        this.$hotspot.html($wrapped);
    };
    ChatFeatures.Hotspot.prototype.getSelector = function(){
        var id = this.properties.id;
        return '#' + id + '.hotspot';
    };
    ChatFeatures.Hotspot.prototype.hover = function(callback, callback2){
        this.$hotspot.on('mouseover', (event) => {
            var selector = this.getSelector(),
                $target = $(selector);
            callback.apply(this, [event, $target]);
        }).on('mouseout', (event) => {
            callback2 = typeof callback2 == 'function' ? callback2 : $.noop;
            var selector = this.getSelector(),
                $target = $(selector);
            callback2.apply(this, [event, $target]);
        });
    };
    ChatFeatures.Hotspot.prototype.init = function(callback){
        callback = typeof callback == 'function' ? callback : (typeof this.callback == 'function' ? this.callback : null);
        var selector = this.getSelector();
        if (!$(selector).length){
            $('.ChatWindow').append(this.$hotspot);
            callback.apply(this, [$(selector)]);
        }
    };
    ChatFeatures.insertHotspot = function(properties, wrapper){
        return new ChatFeatures.Hotspot(properties, wrapper);
    };
    ChatFeatures.modules = $.extend({
        afkButton: {
            toggleable: true,
            target: '#afk',
            enabled: ChatFeatures.isEnabled('afk'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/afk.js' });
                this.loaded = true;
            },
            enable: function(){
                var $afkButton = $('<a />', { 'class': 'wds-button wds-is-squished', 'id': 'afkButton', 'href': '#', text: 'AFK' });
                $afkButton.on('click', function(event){
                    event.preventDefault();
                    var $button = $(event.delegateTarget || event.target),
                        limit = parseInt(ChatFeatures.getItem('afklimit') || 6, 10),
                        count = parseInt(ChatFeatures.getItem('count') || 0, 10);
                    if (count >= limit){
                        if (!$button.has('wds-is-disabled')) $button.addClass('wds-is-disabled');
                        count = limit;
                        setTimeout(() => {
                            count = 0;
                            ChatFeatures.setItem('count', count);
                            $button.removeClass('wds-is-disabled');
                        }, limit * (30 * 1000));
                    } else {
                        AFK.toggleAway(typeof config.AFKmsg == 'string' && config.AFKmsg ? config.AFKmsg : '');
                        count++;
                        ChatFeatures.setItem('count', count);
                    }
                });
                if (!$('#afkButton').length){
                    $('#Rail .wds-button-group.action-buttons-1').append($afkButton);
                    ChatFeatures.setEnabledState('afk', 'enabled');
                }
            },
            disable: function(){
                $('#afkButton').remove();
                ChatFeatures.setEnabledState('afk', 'disabled');
            }
        },
        clearChatButton: {
            toggleable: true,
            target: '#clearChat',
            enabled: ChatFeatures.isEnabled('clearChat'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/clear.js' });
                this.loaded = true;
            },
            enable: function(){
                var $clearChatButton = $('<a />', { 'class': 'wds-button wds-is-squished', 'id': 'clearChatButton', 'href': '#', text: 'Clear' });
                $clearChatButton.on('click', function(event){
                    event.preventDefault();
                    ClearChat.init();
                });
                if (!$('#clearChatButton').length){
                    $('#Rail .wds-button-group.action-buttons-1').append($clearChatButton);
                    ChatFeatures.setEnabledState('clearChat', 'enabled');
                }
            },
            disable: function(){
                $('#clearChatButton').remove();
                ChatFeatures.setEnabledState('clearChat', 'disabled');
            }
        },
        pings: {
            toggleable: true,
            target: '#pings',
            enabled: ChatFeatures.isEnabled('pings'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/pings.js' });
                this.loaded = true;
            },
            enable: function(){
                var $pingsUI = Pings.createInterface(),
                    selector = Pings.getSelector();
                if (!$(selector).length){
                    $('#Rail').prepend($pingsUI);
                    ChatFeatures.setEnabledState('pings', 'enabled');
                    ChatFeatures.setItem('ChatPings', Pings.phrases);
                }
            },
            disable: function(){
                var selector = Pings.getSelector();
                $(selector).remove();
                ChatFeatures.setEnabledState('pings', 'disabled');
            }
        },
        multiPM: {
            toggleable: true,
            target: '#multiPM',
            enabled: ChatFeatures.isEnabled('multiPM'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/multiPM.js' });
                this.loaded = true;
            },
            enable: function(){
                var $multiPM = $('<a />', { 'class': 'wds-button wds-is-squished', 'id': 'multiPMButton', 'href': '#', text: 'Multi PM' });
                $multiPM.on('click', function(event){
                    event.preventDefault();
                    MultiPM.init();
                });
                if (!$('#multiPMButton').length){
                    $('#Rail .wds-button-group.action-buttons-2').append($multiPM);
                    ChatFeatures.setEnabledState('multiPM', 'enabled');
                }
            },
            disable: function(){
                $('#multiPMButton').remove();
                ChatFeatures.setEnabledState('multiPM', 'disabled');
                ChatFeatures.windowRestart(5 * 1000);
            }
        },
        multiKick: {
            toggleable: true,
            target: '#multiKick',
            allowedGroups: ['staff', 'helper', 'vstf', 'sysop', 'chatmoderator'],
            enabled: ChatFeatures.isEnabled('multiKick'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/multiKick.js' });
                this.loaded = true;
            },
            enable: function(){
                var $multiKick = $('<a />', { 'class': 'wds-button wds-is-squished', 'id': 'multiKickButton', 'href': '#', text: 'Multi Kick' });
                $multiKick.on('click', function(event){
                    event.preventDefault();
                    MultiKick.init();
                });
                if (!$('#multiKickButton').length){
                    $('#Rail .wds-button-group.action-buttons-2').append($multiKick);
                    ChatFeatures.setEnabledState('multiKick', 'enabled');
                }
            },
            disable: function(){
                $('#multiKickButton').remove();
                ChatFeatures.setEnabledState('multiKick', 'disabled');
                ChatFeatures.windowRestart(5 * 1000);
            }
        },
        searchBar: {
            toggleable: true,
            target: '#searchBar',
            enabled: ChatFeatures.isEnabled('searchBar'),
            loaded: false,
            load: function(){
                importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/searchBar.js' });
                this.loaded = true;
            },
            enable: function(){
                var hotspot = ChatFeatures.insertHotspot({ x: 0, y: 0, id: 'WikiSearchHotspot' }, '<div class="WikiSearchWrapper wiki-search-wrapper"></div>'),
                    $html = WikiSearch.getHTML();
                hotspot.insertHTML($html);
                hotspot.hover(function(event, $target){
                    if ($target.is(':hidden')){
                        $target.slideDown(500);
                    }
                }, function(event, $target){
                    if (!$target.is(':hidden')){
                        $target.slideUp(500);
                    }
                });
                hotspot.init();
                ChatFeatures.setEnabledState('searchBar', 'enabled');
            },
            disable: function(){
                $('#WikiSearchHotspot').remove();
                ChatFeatures.setEnabledState('searchBar', 'disabled');
            }
        }
    }, config.modules);
    ChatFeatures.look = $.extend({
        fontColor: {
            value: ChatFeatures.getItem('fontColor'),
            target: '#fontColor',
            update: function(){
                var selectors = ['#WikiaPage', '#Write [name="message"]', '.User .username'];
                $(selectors.join(', ')).css('color', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.color-box').data('color', this.value).css('background-color', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('fontColor', value);
            }
        },
        fontFamily: {
            value: ChatFeatures.getItem('fontFamily'),
            target: '#fontFamily',
            update: function(){
                var selectors = ['#WikiaPage', '.Chat', '#Rail', '#ChatHeader'];
                $(selectors.join(', ')).css('font-family', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.find('.combobox-input').val(this.value);
                $target.find('.combobox-list > li[data-item="' + this.value + '"]').addClass('selected');
            },
            setValue: function(){
                var value = $(this.target).find('.combobox-input').val();
                this.value = value;
                ChatFeatures.setItem('fontFamily', value);
            }
        },
        surroundBackground: {
            value: ChatFeatures.getItem('surroundBackground'),
            target: '#surroundBackground',
            update: function(){
                var selectors = ['body.ChatWindow'];
                $(selectors.join(', ')).css('background', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.color-box').data('color', this.value).css('background-color', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('surroundBackground', value);
            }
        },
        selfPostBackground: {
            value: ChatFeatures.getItem('selfPostBackground'),
            target: '#selfPostBackground',
            update: function(){
                var selectors = ['.Chat li.you'],
                    $css = $('<style />', { 'id': 'selfPostColorCSS', 'type': 'text/css' }),
                    cssText = selectors.join(', ') + ' { \
                        background: ' + this.value + ' !important; \
                    }';
                $css.text(cssText);
                if ($('style#selfPostColorCSS').length){
                    $('style#selfPostColorCSS').replaceWith($css);
                } else {
                    $('body.ChatWindow').prepend($css);
                }
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.background-box').data('background', this.value).css('background', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('selfPostBackgroundColor', value);
            }
        },
        chatBackground: {
            value: ChatFeatures.getItem('chatBackground'),
            target: '#chatBackground',
            update: function(){
                var selectors = ['#WikiaPage', '#ChatHeader', '#Write .message'];
                $(selectors.join(', ')).css('backgrond', this.value);
            },
            load: function(){
                var $target = $(this.target);
                $target.val(this.value);
                $target.parent().find('.background-box').data('background', this.value).css('background', this.value);
            },
            setValue: function(){
                var value = $(this.target).val();
                this.value = value;
                ChatFeatures.setItem('chatBackground', value);
            }
        },
        avatarBorder: {
            value: ChatFeatures.getItem('avatarBorder'),
            target: '#avatarBorder',
            update: function(){
                var selectors = ['#ChatHeader .User img', '#WikiaPage .Chat .avatar', '#Rail .User img', '#Write > img', '.UserStatsMenu .info img'],
                    $css = $('<style />', { 'id': 'avatarBorderCSS', 'type': 'text/css' }),
                    borderWidth = this.value[0],
                    borderStyle = this.value[1],
                    borderColor = this.value[2],
                    cssText = selectors.join(', ') + ' { \
                        border: ' + borderWidth + ' ' + borderStyle + ' ' + borderColor + ' !important; \
                    }';
                if ($('style#avatarBorderCSS').length){
                    $('style#avatarBorderCSS').replaceWith($css);
                } else {
                    $('body.ChatWindow').prepend($css);
                }
            },
            load: function(){
                var $targetGroup = $(this.target),
                    $borderWidthN = $targetGroup.find('#borderWidthN'),
                    $borderWidthM = $targetGroup.find('#borderWidthM'),
                    $borderStyle = $targetGroup.find('#borderStyle'),
                    $borderColor = $targetGroup.find('#borderColor');
                
                var borderWidth = this.value[0],
                    borderStyle = this.value[1],
                    borderColor = this.value[2];
                    
                var borderWidthN = borderWidth.match(/\d+/g).map(Number)[0],
                    borderWidthM = borderWidth.match(/[a-z]+/g)[0];
                    
                $borderWidthN.val(borderWidthN);
                $borderWidthM.find('.combobox-input').val(borderWidthM);
                $borderWidthM.find('.combobox-list > li[data-item="' + borderWidthM + '"]').addClass('selected');
                $borderStyle.find('.combobox-input').val(borderStyle);
                $borderStyle.find('.combobox-list > li[data-item="' + borderStyle + '"]').addClass('selected');
                $borderColor.val(borderColor);
                $borderColor.parent().find('.color-box').data('color', borderColor).css('color', borderColor);
            },
            setValue: function(){
                var $targetGroup = $(this.target),
                    borderWidthN = $targetGroup.find('#borderWidthN').val(),
                    borderWidthM = $targetGroup.find('#borderWidthM .combobox-input').val(),
                    borderStyle = $targetGroup.find('#borderStyle .combobox-input').val(),
                    borderColor = $targetGroup.find('#borderColor').val(),
                    value = [borderWidthN + borderWidthM, borderStyle, borderColor];
                this.value = value;
                ChatFeatures.setItem('avatarBorder', value);
            }
        }
    }, config.look);
    ChatFeatures.updateChat = function(){
        // Looks
        Object.keys(this.look).forEach((key) => {
            if (this.look.hasOwnProperty(key)){
                this.look[key].update();
            }
        });
        
        Object.keys(this.modules).forEach((key) => {
            if (this.modules.hasOwnProperty(key)){
                if (this.modules[key].loaded === false){
                    this.modules[key].load();
                    if (this.modules[key].enabled === true){
                        this.modules[key].enable();
                    } else if (this.modules[key].enabled === false){
                        this.modules[key].disable();
                    }
                } else {
                    if (this.modules[key].enabled === true){
                        this.modules[key].enable();
                    } else if (this.modules[key].enabled === false){
                        this.modules[key].disable();
                    }
                }
            }
        });
    };
    ChatFeatures.toggleOptions = function(){
        var $optionsButton = $('#optionsButton'),
            optionsOpen = localStorage.getItem('options-open');
    };
    ChatFeatures.updateValues = function(){
        Object.keys(this.look).forEach((key) => {
            if (this.look.hasOwnProperty(key)){
                this.look[key].update();
            }
        });
        
        Object.keys(this.modules).forEach((key) => {
            if (this.modules.hasOwnProperty(key)){
                if (this.modules[key].target !== 'undefined' && $(this.modules[key].target).is(':checked')){
                    this.modules[key].enabled = true;
                } else {
                    this.modules[key].enabled = false;
                }
            }
        });
        
        this.updateChat();
    };
    $(function(){
        ChatFeatures.updateChat();
        ChatFeatures.addButton();
    });
    return ChatFeatures;
}(mediaWiki, jQuery, mainRoom, $.extend({}, this.ChatFeaturesConfig)));