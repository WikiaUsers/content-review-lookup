// Chat Navigation
window.ChatNavigation = window.ChatNav = window.ChatNavigation || {
    init: function init(items){
        this.setCookie = function setCookie(cookie_name, data){
            var domain = wgServer.split('//')[1];
            document.cookie =
                cookie_name + '=' + data + '; \
                max-age=' + 60*60*24*150 + '; \
                path=/; domain=' + domain;
        };
        this.getCookie = function getCookie(cookie_name, pos){
            var xy = {x: undefined, y: undefined}, cookie_array = document.cookie.split(';'), i = 0;
            for (; i < cookie_array.length; i++){
                xy.x = cookie_array[i].substr(0, cookie_array[i].indexOf('='));
                xy.y = cookie_array[i].substr(cookie_array[i].indexOf('=') + 1);
                xy.x = xy.x.replace(/^\s+|\s+$/g, '');
                if (xy.x == cookie_name){
                    var objects = xy.y.split(/\,\s+/);
                    return unescape(objects[pos]);
                }
            }
        };
        this.inGroup = {
            'rollback': this.checkGroup('rollback'),
            'chatmoderator': this.checkGroup('chatmoderator'),
            'admin': this.checkGroup('sysop'),
            'bureaucrat': this.checkGroup('bureaucrat'),
            'vstf': this.checkGroup('vstf'),
            'helper': this.checkGroup('helper'),
            'staff': this.checkGroup('staff'),
            // Other actions
            'cankick': this.checkGroup('chatmoderator sysop bureaucrat vstf helper staff'),
            'canban': this.inGroup['cankick'],
            'canpromote': this.checkGroup('sysop bureaucrat vstf helper staff'),
            'canblock': this.inGroup['canpromote'],
            'canphalanx': this.checkGroup('vstf helper staff')
        };
        this.config = {
            users: this.getUserList(),
            emoticons: this.getEmoticons()
        };
        this.actions = {};
        this.create(items);
    },
    create: function create(items){
        var $chat_nav_html = 
        this.bind();
        for (var name in this.actions){
            $('.ChatNavigation .nav-link[data-name="' + name + '"]').on('click', this.actions[name]);
        }
    },
    bind: function bind(){
        var _this = this;
        
        // Setting default actions
        // Emoticons
        bindAction('Emoticons', function _(event){
            
        });
        
        // Customization
        bindAction('Customization', function _(event){
            
        });
        
        // Features
        bindAction('Features', function _(event){
            
        });
        
        // Party Mode
        bindAction('Party Mode', function _(event){
            
        });
    },
    bindAction: function bindAction(name, handler){
        if (name in this.actions || (!handler instanceof Function || typeof handler != 'function'))
            return;
        this.actions[name] = handler;
    },
    checkGroup: function checkGroup(group){
        var group_regex = new RegExp(group.replace(' ', '|'), 'gi'),
            group_list = mw.config.get('wgUserGroups', wgUserGroups);
        return group_regex.test(group_list.join(' '));
    },
    getEmoticons: function getEmotions(){
        var Emoticons = {},
            _emoticons = mw.config.get('wgChatEmotions', wgChatEmoticons);
        $.each(_emoticons.split(new RegExp('\n', 'gi')), function _s(el, index, arr){
            if (el[0] === '*' && el[1] !== '*')
                Emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim();
        });
        return Emoticons || {};
    },
    getUserList: function getUserList(){
        var UserList1 = [],
            UserList2 = {};
        mainRoom.model.users.forEach(function getUsers(child){
            var name = child.attributes.name;
            UserList1[UserList1.length] = name;
        });
        for (var i = 0; i < UserList1.length; i++){
            UserList2[UserList1[i]] = {
                name: UserList1[i],
                avatar: mainRoom.model.users.findByName(UserList1[i]).attributes.avatarSrc
            };
        }
        return UserList2;
    }
};