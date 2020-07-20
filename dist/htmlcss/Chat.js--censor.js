(function(mw, $, mainRoom, config){
    var wordFilter = {
        source: config.source || 'MediaWiki:Custom-badwords',
        loaded: false,
        implemented: false,
        chatLi: $('.Chat li'),
        words: [],
        allowed: ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'chatmoderator', 'discussions-moderator'],
        limit: 10,
        queue: []
    };
    
    wordFilter.queueItem = function(obj){
        this.username = obj.username;
        this.avatar = obj.avatar;
        this.words = obj.words;
        this.inChat = obj.inChat;
        this.isMod = obj.isMod;
        return this;
    };
    
    wordFilter.queueItem.prototype.toString = function(){
        return JSON.stringify(this);
    };
    
    wordFilter.queueItem.prototype.toHTML = function(){
        return $('<section />', {
            'class': 'WordFilterUserItem word-filter-user-item' + (this.isMod ? ' word-filter-user-is-mod' : ''),
            'data-words': this.words.join(', '),
            html: [
                $('<div />', {
                    'class': 'WordFilterUserInfo word-filter-user-info',
                    html: [
                        $('<img />', {
                            'src': this.avatar,
                            'class': 'WordFilterAvatar word-filter-avatar'
                        }),
                        $('<span />', {
                            'class': 'WordFilterUserName word-filter-user-name',
                            text: this.username
                        })
                    ]
                }),
                $('<div />', {
                    'class': 'WordFilterWordList word-filter-word-list',
                    html: $('<p />', {
                        'class': 'WordFilterWords word-filter-words',
                        text: this.words.join(', ')
                    })
                })
            ]
        });
    };
    
    wordFilter.init = function(){
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/api.php',
            data: {
                'action': 'query',
                'titles': this.source,
                'prop': 'info|revisions',
                'intoken': 'edit',
                'rvprop': 'content',
                'rvlimit': '1',
                'indexpageids': 'true',
                'format': 'json'
            },
            success: $.proxy(this.getData, this)
        });
    };
    
    wordFilter.getData = function(data){
        if (!data.error){
            var page = data.query.pages[data.query.pageids[0]],
                pageExists = data.query.pages['-1'] ? false : true;
            if (pageExists){
                var content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '',
                    wordList = content.split(/\n+/g).map(function(word){
                        return word.trim();
                    });
                for (var i = 0; i < wordList.length; i++){
                    var word = wordList[i];
                    if (word !== ''){
                        this.words[this.words.length] = word;
                    } else continue;
                }
                this.words = this.words.sort(function(a, b){
                    return a.localeCompare(b);
                });
                this.loaded = true;
                this.censor();
            }
        }
    };
    
    wordFilter.censor = function(){
        if (this.implemented === false){
            this.implemented = true;
            this.pattern = new RegExp('(' + this.words.join('|') + ')', 'gi');
            this.chatLi.each($.proxy(function(index, element){
                var $elem = $(element),
                    cid = $elem.attr('id').replace('entry-', ''),
                    username = mainRoom.model.chats.getByCid(cid).attributes.name,
                    userobj = {};
                if (!$elem.is('.inline-alert') && $elem.find('.message').text().match(this.pattern).length){
                    if (typeof mainRoom.model.users.findByName(username) === 'undefined'){
                        userobj.username = $elem.find('.username').text();
                        userobj.avatar = $elem.find('.avatar').attr('src');
                        userobj.words = $elem.find('.message').text().match(this.pattern);
                        userobj.inChat = false;
                        userobj.isMod = false;
                    } else {
                        var user = mainRoom.model.users.findByName($elem.find('.username').text()),
                            attribs = user.attributes;
                        userobj.username = attribs.name;
                        userobj.avatar = attribs.avatarSrc;
                        userobj.words = $elem.find('.message').text().match(this.pattern);
                        userobj.inChat = true;
                        userobj.isMod = attribs.groups.some(function(group){
                            return ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'chatmoderator', 'discussions-moderator'].indexOf(group) > -1;
                        });
                    }
                    var u = new this.queueItem(userobj);
                    if (this.queue.length > this.limit){
                        this.queue.shift();
                        this.queue[this.queue.length] = u;
                    } else {
                        this.queue[this.queue.length] = u;
                    }
                }
            }, this));
        } else {
            mainRoom.model.chats.bind('afteradd', $.proxy(function(child){
                var cid = child.cid,
                    username = child.attributes.name,
                    text = child.attributes.text,
                    user = mainRoom.model.users.findByName(username),
                    avatar = user.attributes.avatarSrc,
                    userobj = {};
                if (child.attributes.isInlineAlert === false){
                    userobj.username = username;
                    userobj.avatar = avatar;
                    userobj.words = text.match(this.pattern);
                    userobj.inChat = true,
                    userobj.isMod = user.attributes.groups.some(function(group){
                        return ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'chatmoderator', 'discussions-moderator'].indexOf(group) > -1;
                    });
                    var u = new this.queueItem(userobj);
                    if (this.queue.length > this.limit){
                        this.queue.shift();
                        this.queue[this.queue.length] = u;
                    } else {
                        this.queue[this.queue.length] = u;
                    }
                }
            }, this));
        }
    };
    
    window.wordFilter = wordFilter;
}(mediaWiki, jQuery, mainRoom, $.extend(window.WordFilterConfig, {})));