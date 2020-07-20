;(function($, mw, window, ChatRail){
    var mwConfig = mw.config.get([
        'wgPageName',
        'wgCanonicalSpecialPageName',
        'wgUserGroups',
        'wgUserName',
        'wgChatEmoticons'
    ]);
    
    function getUserList(){
        let userlist = [];
        mainRoom.model.users.forEach(function(child, index){
            var name = child.attributes.name;
            if (name !== ''){
                userlist[userlist.length] = name;
            }
        });
        return userlist;
    }
    
    if (mwConfig.wgCanonicalSpecialPageName == 'Chat'){
        var users = getUserList().sort(),
            actions = {
                // Chat Moderator Tools
                'kick': function(target){
                    var kick_module = new GlobalModule({
                        id: 'KickUserlist',
                        parent: '#KickTrigger',
                        type: 'users',
                        title: 'Kick',
                        data: users,
                        submit: function(config){
                            if ('string' == typeof config.user){
                                mainRoom.kick({
                                    name: config.user
                                });
                            } else if ('object' == typeof config.user && config.user instanceof Array){
                                Array.prototype.forEach.call(config.user, function(user, index){
                                    mainRoom.kick({
                                        name: user
                                    });
                                });
                            }
                        }
                    });
                },
                'ban': function(target){
                    var ban_module = new GlobalModule({
                        id: 'BanUserlist',
                        parent: '#BanTrigger',
                        type: 'users',
                        title: 'Ban',
                        data: users,
                        close_after_submit: false,
                        submit: function(config){
                            var step2 = new GlobalModule({
                                id: 'BanConfig',
                                parent: '#BanUserList',
                                type: 'form',
                                data: config.selectedUsers,
                                close_parent: true,
                                base_html:
                                    '<div class="gm-form-section user-section user-ban-form" data-user="$user"> \
                                        <h3> \
                                            User: \
                                            <img src="$avatarsrc" alt="$user" /> \
                                            <span class="username">$user</span> \
                                        </h3> \
                                        <label class="gm-label" for="ban-reason-$index">Reason</label> \
                                        <input id="ban-reason-$index" type="text" class="gm-input" /> \
                                        <label class="gm-label" for="ban-duration-$index">Duration</label>'.concat(new Combobox({
                                        id: 'ban-duration-$index',
                                        items: [{
                                            name: '30min',
                                            title: '30 minutes'
                                        }, {
                                            name: '1hr',
                                            title: '1 hour'
                                        }, {
                                            name: '2hr',
                                            title: '2 hours'
                                        }, {
                                            name: '1d',
                                            title: '1 day'
                                        }, {
                                            name: '3d',
                                            title: '3 days'
                                        }, {
                                            name: '1w',
                                            title: '1 week'
                                        }, {
                                            name: '3 w',
                                            title: '3 weeks'
                                        }, {
                                            name: '1 mo',
                                            title: '1 month'
                                        }, {
                                            name: '3 mo',
                                            title: '3 months'
                                        }, {
                                            name: '6 mo',
                                            title: '6 months'
                                        }, {
                                            name: '1 y',
                                            title: '1 year'
                                        }, {
                                            name: 'infinite',
                                            title: 'Infinite'
                                        }]
                                    })) + ' \
                                    </div>',
                                submit: function(_config){
                                    function calcTime(string){
                                        if (string.constructor == Number) return string;
                                        var time = {},
                                            i18n = {
                                                sec: 1,
                                                min: 60,
                                                hr: 3600,
                                                d: 86400,
                                                w: 604800,
                                                mo: 2592000,
                                                y: 31536000
                                            },
                                            m = string.toLowerCase().match(new RegExp('(\\d+)\\s+('.concat(['sec', 'min', 'hr', 'd', 'w', 'mo', 'y'].join('|')) + 'g'));
                                        if (m === null && /never|infinite|indefinite|forever/i.test(string.toLowerCase())) return 31536000000;
                                        else if ($.isArray(m)){
                                            for (let i in m){
                                                var a = m[i].split(/\s+/);
                                                time[a[1]] = Number(a[0]) * i18n[a[1]];
                                            }
                                            var timecount = 0;
                                            for (let i in time){
                                                timecount += time[i];
                                            }
                                            if (timecount === 0){
                                                return 86400;
                                            } else {
                                                return timecount;
                                            }
                                        } else return 86400;
                                    }
                                    
                                    Array.prototype.forEach.call(_config.banobj, function(obj, index){
                                        let u = obj.user,
                                            t = obj.duration,
                                            r = obj.reason;
                                        if (t === '') t = '';
                                        if (r === '') r = 'No reason was given.';
                                        var cmd = new models.BanCommand({
                                            userToBan: u,
                                            time: t,
                                            reason: r
                                        });
                                        mainRoom.socket.send(cmd.xport());
                                    });
                                }
                            });
                        }
                    });
                },
                // User Tools
                'pm': function(){}
            };
    }
})(this.jQuery, this.mediaWiki, window, (window.ChatRail = window.ChatRail || {}));