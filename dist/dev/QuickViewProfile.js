// @version 1.0.1

(function() {
    window.quickViewProfiles = $.extend({
        // Config
        mCon: mw.config.get([
            'wgUserGroups',
            'wgUserLanguage'
        ]),
        allowedClasses: [],
        userProps: [
            'name',
            'avatar',
            'location',
            'occupation',
            'discordHandle',
            'UserProfilePagesV3_gender'
        ],
        users: [],
        usersCollection: {},
        isShowing: false,
        isAdmin: false,
        i18n: {},
        // Functions
        ready: function() {
            var self = this;
            this.api = new mw.Api();
            this.getConfig(function() {
                self.getMessages();
            
                self.allowedClasses.forEach(function(clss) {
                    $(clss).each(function(i, el) {
                        if (!self.users[el.alt] && el.alt !== self.i18n.oasis_anon_user) self.users.push(el.alt);
                    });
                });
                
                if (!self.users.length) return;
                if (self.mCon.wgUserGroups.indexOf('sysop') > -1) self.isAdmin = true;
                
                self.getUsers(self.users, function() {
                    self.allowedClasses.forEach(function(clss) {
                        $(clss).click(function(e) {
                            e.preventDefault();
                            if (self.isShowing) self.destroyProfileBox();
                            
                            var $el = e.target,
                            targetUserName = e.target.alt,
                            // Calculate avatar element position
                            posY = $($el).offset().top - $(window).scrollTop(),
                            posX = $($el).offset().left,
                            boxid = $($el).index();
                            
                            self.createProfileBox(targetUserName, posX, posY);
                        });
                    });
                });
            });
        },
        getMessages: function() {
            var self = this;
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                amlang: this.mCon.wgUserLanguage,
                ammessages: [
                    'profile',
                    'talkpage',
                    'edits',
                    'user-identity-box-location',
                    'user-identity-box-occupation',
                    'user-identity-i-am',
                    'oasis-anon-user',
                    'block',
                    'unblockip'
                ].join('|')
            }).then(function(data) {
                var messages = data.query.allmessages;
                messages.forEach(function(message) {
                    self.i18n[message.name.replace(/\-/g, '_')] = message['*'];
                });
            });
        },
        getUsers: function(users, callback) {
            var self = this;
            this.api.get({
                action: 'query',
                list: 'users',
                ususers: users.join('|'),
                usprop: 'blockinfo|editcount'
            }).then(function(users) {
                var uids = [],
                uperids = {},
                uarray = users.query.users,
                params = null;
                
                uarray.forEach(function(user) {
                    uids.push(user.userid);
                    uperids[user.userid] = user;
                });
                
                params = uids.map(function(uid, i) {
                    if (i > 0) return '&id='+uid;
                    else return '?id='+uid;
                }).join('');
                
                $.get('https://services.fandom.com/user-attribute/user/bulk' + params, function(usinfo) {
                    usinfo = usinfo.users;
                    Object.keys(usinfo).forEach(function(uid) {
                        // Find user
                        var uinfo = uperids[uid];
                        var userProps = usinfo[uid];
                        var userObj = {
                            editcount: uinfo.editcount,
                            isBlocked: Boolean(uinfo.blockedby)
                        };
                        
                        self.userProps.forEach(function(propName) {
                            userObj[propName] = userProps[propName];
                        });
                        
                        self.usersCollection[userProps.username] = userObj;
                    });
                    
                    callback();
                });
            });
        },
        getConfig: function(callback) {
            var self = this;
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'Custom-qvp-allowedClasses',
                amlang: this.mCon.wgUserLanguage
            }).done(function(configData) {
                if (configData.query.allmessages[0]['*']) {
                    self.allowedClasses = configData.query.allmessages[0]['*'].split(',');
                } else self.allowedClasses = ['body.mw-special-WikiActivity ul.activityfeed li img.avatar'];
                callback();
            });
        },
        createProfileBox: function(userName, x, y) {
            var self = this;
            var u = this.usersCollection[userName];
            if (!u) return;
            
            var boxEl = $('<div>', {
                class: 'quickProfile',
                id: userName.replace(/ /g, '_'),
                style: 'position: fixed; top: '+y+'px; left: '+x+'px; z-index: 10000'
            }),
            boxSections = [],
            // Sections
            boxAvatar = $('<div>', { class: 'qp_avatar' }),
            boxLinks = $('<div>', { class: 'qp_links' }),
            boxDetails = $('<div>', { class: 'qp_details' });
            
            // Box avatar
            boxAvatar.append( // Append avatar photo
                $('<img>', {
                    class: 'avt',
                    height: 100,
                    src: u.avatar,
                    alt: userName
                })
            );
            
            boxAvatar.append( // Append user name
                $('<span>', {
                    class: 'username',
                    text: userName
                })
            );
            
            boxAvatar.append( // Append user editcount
                $('<a>', {
                    class: 'editcount',
                    href: './Special:Contributions/'+userName
                }).append(
                    $('<b>', {
                        text: u.editcount
                    }),
                    ' ',
                    mw.html.escape(this.i18n.edits)
                )
            );
            
            boxSections.push(boxAvatar);
            
            // Box links
            
            boxLinks.append( // Profile
                $('<a>', {
                    href: './User:'+userName,
                    text: this.i18n.profile
                })
            );
            
            boxLinks.append( // Talkpage
                $('<a>', {
                    href: './User_talk:'+userName,
                    text: this.i18n.talkpage
                })
            );
            
            if (this.isAdmin) {
                if (!u.isBlocked) boxLinks.append( // Block button
                    $('<a>', {
                        class: 'danger',
                        href: './Special:Block/'+userName,
                        text: this.i18n.block
                    })
                );
                else boxLinks.append( // Unlock button
                    $('<a>', {
                        href: './Special:Unblock/'+userName,
                        text: this.i18n.unblockip
                    })
                );
            }
            
            boxSections.push(boxLinks);
            
            // Box details
            var availableProps = Object.keys(u);
            if (availableProps.length > 0) {
                availableProps.forEach(function(propName) {
                    if (!u[propName]) return;
                    var propI18n = null;
                    switch(propName) {
                        case 'location':
                            propI18n = 'user_identity_box_location';
                            break;
                        case 'occupation':
                            propI18n = 'user_identity_box_occupation';
                            break;
                        case 'UserProfilePagesV3_gender':
                            propI18n = 'user_identity_i_am';
                            break;
                        default:
                            return;
                    }
                    boxDetails.append(
                        $('<span>', {
                            class: propName,
                            html: self.i18n[propI18n].replace(/\$1/g, mw.html.escape(u[propName]))
                        })
                    );
                });
                boxSections.push(boxDetails);
            }
            
            // Deploy box
            
            boxSections.forEach(function(section) {
                boxEl.append(section);
            });
            
            $('.WikiaPage').after(boxEl);
            
            // Detect if box is in a low Y position
            var _y = $(window).height() - ($('.quickProfile').offset().top - $(window).scrollTop()) - $('.quickProfile').height();
            var lowY = 0 > _y;
            
            if (lowY) $('.quickProfile').css('top', (_y+y-30)+'px');
            
            this.isShowing = true;
            
            $(document).mouseup(function(e) {
                if (!$('.quickProfile').is(e.target) && $('.quickProfile').has(e.target).length === 0) self.destroyProfileBox();
            });
        },
        destroyProfileBox: function() {
            $('.quickProfile').remove();
            this.isShowing = false;
        }
    }, window.quickViewProfiles);
    
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:QuickViewProfile.css'
    })[0];

    mw.loader.using('mediawiki.api').then(quickViewProfiles.ready.bind(quickViewProfiles));
})();