/**
 * @name        New Chat Skin
 * @desc        Creates a new skin for integration with
 *              FandomizedChat
 * @author      Ultimate Dark Carnage
 **/
(function(window, $, mw, mainRoom){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    var ChatSkin = {
        css: 'MediaWiki:NewChatSkin.css',
        config: $.extend({}, window.CSconfig),
        loaded: false,
        init: function(){
            this.newHeader = !!ChatSkin.config.newHeader || true;
            this.matchWikiColors = !!ChatSkin.config.matchWikiColors || true;
            this.sideRail = !!ChatSkin.config.sideRail || true;
            this.newStatsMenu = !!ChatSkin.config.newStatsMenu || true;
            this.selfOnRail = !!ChatSkin.config.selfOnRail || true;
            this.fullWidth = !!ChatSkin.config.fullWidth || true;
            this.sendButton = !!ChatSkin.config.sendButton || true;
            this.allowMobile = !!ChatSkin.config.allowMobile || true;
            this.dateString = ChatSkin.config.dateFormat || 'mm/dd/yyyy';
            this.timeString = ChatSkin.config.timeFormat || 'hh:mm:ss';
            this.username = mw.config.get('wgUserName');
            this.avatar = mw.config.get('wgChatMyAvatarUrl');
            this.i18nLoaded = false;
        },
        SideRail: function(){
            var args = [].slice.call(arguments), config = $.extend({}, args[0]);
            this.title = config.title || '';
            this.items = [].concat(config.items || []);
            this.show = false;
            this.loaded = false;
        }
    };
    
    ChatSkin.init.prototype = {
        constructor: ChatSkin.init,
        i18n: {},
        templates: {
            'username': mw.config.get('wgUserName'),
            'wikiname': mw.config.get('wgSiteName'),
            'date': function(){
                var date = mw.config.get('wgNow'), context = this,
                    res = '', keys = ['yyyy', 'yy', 'mmmm', 'mm', 'm',
                        'dddd', 'dd', 'd'], 
                    pattern = '\(' + keys.join('|') + '\)';
                pattern = new RegExp(pattern, 'gi');
                res = this.dateString.replace(pattern, function(match, name){
                    if (context.dateFormat.hasOwnProperty(name)){
                        return context.dateFormat[name].call(context, date);
                    } else return match;
                });
                return res;
            },
            'time': function(){
                var date = mw.config.get('wgNow'), context = this,
                    res = '', keys = ['hh', 'h', 'mm', 'm', 'ss'],
                    pattern = '\(' + keys.join('|') + '\)';
                pattern = new RegExp(pattern, 'gi');
                res = this.timeString.replace(pattern, function(match, name){
                    if (context.timeFormat.hasOwnProperty(name)){
                        return context.timeFormat[name].call(context, date);
                    } else return match;
                });
            }
        },
        dateFormat: {
            'yyyy': function(date){
                return String(date.getFullYear());
            },
            'yy': function(date){
                return String(date.getFullYear()).slice(2);
            },
            'mmmm': function(date){
                var months = mw.config.get('wgChatLangMonthAbbreviations');
                return months[date.getMonth + 1];
            },
            'mm': function(date){
                return this.pad(date.getMonth() + 1);
            },
            'm': function(date){
                return String(date.getMonth() + 1);
            },
            'dddd': function(date){
                var days = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return days[date.getDay() + 1];
            },
            'dd': function(date){
                return this.pad(date.getDate());
            },
            'd': function(date){
                return String(date.getDate());
            }
        },
        timeFormat: {
            'hh': function(date){
                return this.pad(date.getHours());
            },
            'h': function(date){
                return String(date.getHours());
            },
            'mm': function(date){
                return this.pad(date.getMinutes());
            },
            'm': function(date){
                return String(date.getMinutes());
            },
            'ss': function(date){
                return this.pad(date.getSeconds());
            }
        },
        pad: function(n){
            if (n < 10) n = '0' + n;
            return String(n);
        },
        loadI18n: function(){
            mw.hook('dev.i18n').add((function(i18no){
                i18no.loadMessages('FandomizedChat').then((function(i18n){
                    var messages = i18n._messages.en,
                        keys = Object.keys(messages);
                    while (keys.length){
                        var key = keys.shift();
                        this.i18n[key] = i18n.msg(key).escape();
                    }
                }).bind(this));
            }).bind(this));
            importArticle({ 
                type: 'article',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        },
        // New chat header
        createHeader: function(){
            if (!this.newHeader) return;
            this.$ChatHeader = $('<header>').addClass('chat-header');
            this.$ChatHeading = $('<h1>').addClass('chat-heading');
            this.$ChatHeadingLink = $('<a>').addClass('chat-heading-link');
            this.$ChatTopic = $('<div>').addClass('chat-topic');
            this.hasWordmark = false;
            this.loadWordmark();
            this.loadChatTopic();
        },
        loadWordmark: function(){
            var params = {
                format: 'json',
                action: 'query',
                titles: 'File:Wiki-wordmark.png',
                prop: 'imageinfo',
                iiprop: 'url',
                indexpageids: true
            };
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: params
            }).done($.proxy(this.generateWordmark, this));
        },
        generateWordmark: function(data){
            if (data.query.pageids.indexOf('-1') > -1){
            } else {
                var pageid = data.query.pageids[0],
                    page = data.query.pages[pageid],
                    ii = page.imageinfo && page.imageinfo[0];
                if (ii){
                    var url = ii.url;
                    this.hasWordmark = true;
                    this.wordmarkURL = url;
                }
            }
            this.insertWordmark();
        },
        insertWordmark: function(){
            if (!this.hasWordmark){
                this.$ChatHeadingLink.html(mw.config.get('wgSiteName'));
            } else {    
                this.$ChatWordmark = $('<img>').addClass('chat-wordmark');
                this.$ChatWordmark.attr('src', this.wordmarkURL);
                this.$ChatHeadingLink.html(this.$ChatWordmark);
            }
            this.insertHeaderHTML();
        },
        insertHeaderHTML: function(){
            this.$ChatHeading.html(this.$ChatHeadingLink);
            this.$ChatHeaderHTML = [this.$ChatHeading, this.$ChatTopic];
            this.$ChatHeader.html(this.$ChatHeaderHTML);
        },
        loadChatTopic: function(){
            var params = {
                format: 'json',
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: 'MediaWiki:Custom-Chattopic',
                indexpageids: true
            };
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: params
            }).done($.proxy(this.parseChatTopic, this));
        },
        parseChatTopic: function(data){
            if (data.query.pageids.indexOf('-1') > -1){
            } else {
                var pageid = data.query.pageids[0],
                    page = data.query.pages[pageid],
                    revision = page.revisions && page.revisions[0];
                if (revision){
                    this.chatTopic = mw.html.escape(revision['*']);
                    this.chatTopic = this.parseText(this.chatTopic);
                    this.$ChatTopic.html(this.chatTopic);
                }
            }
        },
        linkify: function(article, text){
            article = article.replace(/\s+/g, '_');
            text = text.replace(/_/g, ' ');
            text = decodeURIComponent(text);
            
            var path = mw.config.get('wgServer') + mw.config.get('wgArticlePath');
            article = encodeURIComponent(article);
            article = article.replace(/%2f/gi, '/');
            article = article.replace(/%3a/gi, ':');
            var url = path.replace('$1', article);
            
            return $('<a>', {
                'href': url,
                text: text
            }).prop('outerHTML');
        },
        parseText: function(text){
            var isLocalReg = '^' + mw.config.get('wgServer') + mw.config.get('wgArticlePath'), context = this;
            isLocalReg = new RegExp(
                isLocalReg.replace(/\$1/, "(\\S+[^.\\s\\?\\,])"), 'i');
            var exp = [{
                pattern: /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig,
                replace: function(link){
                    var name = link;
                
                    var match = isLocalReg.exec(link);
                    if (match !== null) name = match[1].replace(/_/g, ' ');
                    
                    try {
                        name = decodeURIComponent(name);
                    } catch(e){ return ''; }
                    return $('<a>', {
                        'href': link,
                        text: name
                    }).prop('outerHTML');
                }
            }, {
                pattern: /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig,
                replace: function(match, article, text){
                    if (!text){
                        var colonPos = article.indexOf(':');
                        if (colonPos === -1) text = article;
                        else text = article.substring(colonPos + 1);
                    }
                    return context.linkify(article, text);
                }
            }, {
                pattern: /(\[\[[^\[\]\r\n\t]*\]\])/ig,
                replace: function(match){
                    var article = match.substr(2, match.length - 4),
                        text = article.replace(/_/g, ' ');
                    return context.linkify(article, text);
                }
            }], patterns = exp;
            while (patterns.length){
                var obj = patterns.shift();
                text = text.replace(obj.pattern, obj.replace);
            }
            text = text.replace(/\$([a-z][\w\-]*)/gi, function(match, name){
                name = name.toLowerCase();
                if (context.templates.hasOwnProperty(name)){
                    if (context.templates[name] instanceof Function){
                        var rv = context.templates[name].call(this);
                        if (typeof rv === 'string') return rv;
                        else return match;
                    } else if (
                        ['number', 'boolean', 'string'].indexOf(
                            context.templates[name]
                        ) > -1){
                        return String(context.templates[name]);
                    } else return match;
                } else return match;
            });
            return text;
        },
        // Side rail
        createSideRail: function(){
            if (!this.sideRail) return;
            this.SideRail = new ChatSkin.SideRail(ChatSkin.railConfig);
            this.SideRail.add();
        },
        // Self user box
        createSelf: function(){
            if (!this.selfOnRail) return;
            var $User = $('#Rail [data-user="' + this.username + '"]')
                .show().clone();
            this.$User = $('<div>').addClass('chat-user User')
                .data('user', mw.config.get('wgUserName'))
                .html($User.html());
            var rights = {
                'staff': 'staff',
                'helper': 'helper',
                'vstf': 'vstf',
                'sysop': 'admin',
                'chatmoderator': 'chatmoderator',
                'discussions-moderator': 'chatmoderator'
            }, keys = Object.keys(rights), cn = '';
            while (keys.length && cn === ''){
                var key = keys.shift();
                if (mw.config.get('wgUserGroups').indexOf(key) > -1)
                    cn = rights[key];
            }
            if (cn !== '') this.$User.addClass(cn);
            this.insertSelf();
        },
        // Full width
        showFullWidth: function(){
            if (!this.fullWidth) return;
            $(document.body).addClass('full-width');
        },
        // Chat send button
        createSendButton: function(){
            if (!this.sendButton) return;
            this.$MessageBox = $('#Write');
            this.$Message = $MessageBox.children('[name="message"]');
            this.$SendButton = $('<a>', {
                'href': '#',
                text: this.i18nLoaded ? this.i18n['send'] : 'Send',
                on: {
                    'click': (function(event){
                        event.preventDefault();
                        this.$Message.trigger({
                            type: 'keypress',
                            which: 13
                        });
                    }).bind(this)
                }
            })
            this.$SendButton.appendTo(this.$MessageBox);
        }
    };
    
    ChatSkin.SideRail.prototype = {
        constructor: ChatSkin.SideRail,
        create: function(){
            this.$Rail = $('<aside>').addClass('ChatSideRail');
            this.$Rail.attr('id', 'ChatSideRail');
            this.$RailHeader = $('<header>').addClass('SideRailHeader');
            this.$RailHeaderHTML = [];
            this.$RailUser = $('<div>').addClass('SideRailUser');
            this.$RailHeaderHTML.push(this.$RailUser);
            if (this.title !== ''){
                this.$RailHeading = $('<h2>').addClass('SideRailHeading')
                    .text(this.title);
                this.$RailHeaderHTML.push(this.$RailHeading);
            }
            this.$RailHeader.html($RailHeaderHTML);
            this.$RailContent = $('<div>').addClass('SideRailContent');
            this.$Rail.html([this.$RailHeader, this.$RailContent]);
        }
    };
    
    return ((
        (window.FandomizedChat || {}).ChatSkin =
        window.ChatSkin = new ChatSkin.init()
    ) && (
        (window.FandomizedChat || {}).ChatSkinObject =
        window.ChatSkinObject = ChatSkin
    ));
}(this, jQuery, mediaWiki, $.extend({}, mainRoom)));