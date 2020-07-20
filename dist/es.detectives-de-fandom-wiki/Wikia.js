/**
 * @name QuickViewProfile
 * @author Xakuzyo
 * @version 1.0.0
**/
 
(function() {
    window.quickViewProfiles = $.extend({
        // Config
        allowedClasses: [ // Must be avatar boxes with "alt" attr.
            '.WikiaArticle ul.activityfeed > li.activity-type-talk .wallfeed .avatar'
        ],
        allowedUserProps: [
            'name',
            'avatar',
            'location',
            'occupation',
            'discordHandle',
            'UserProfilePagesV3_gender'
        ],
        allowedPages: [
            'Especial:WikiActivity'
        ],
        users: [],
        usersCollection: {},
        isShowing: false,
        debug: true,
        currentBox: null,
        messages: [
            'profile',
            'talkpage',
            'edits',
            'user-identity-box-location',
            'user-identity-box-occupation',
            'user-identity-i-am',
            'oasis-anon-user'
        ],
        i18n: {},
        // Functions
        log: function(str) {
            if (this.debug) console.log(str);
        },
        ready: function() {
            var self = this;
            if (this.allowedPages.indexOf(mw.config.get('wgPageName')) < 0) return;
            this.log('QPV 1.0.0');
            this.api = new mw.Api();
            this.getMessages();
 
            this.allowedClasses.forEach(function(clss) {
                $(clss).each(function(i, el) {
                    if (!self.users[el.alt] && el.alt !== self.i18n.oasis_anon_user) self.users.push(el.alt);
                });
            });
 
            this.log('Users: '+this.users.join(','));
 
            this.getUsers(this.users, function() {
                self.allowedClasses.forEach(function(clss) {
                    $(clss).click(function(e) {
                        if (self.isShowing && self.currentBox == i) return self.destroyProfileBox();
                        if (self.isShowing && self.currentBox != i) self.destroyProfileBox();
 
                        var $el = e.target,
                            targetUserName = e.target.alt,
                        // Calculate avatar element position
                            posY = $($el).offset().top - $(window).scrollTop(),
                            posX = $($el).offset().left,
                            boxid = $($el).index();
 
                        self.log('Clicked on boxid #'+boxid);
                        self.createProfileBox(targetUserName, posX, posY);
                        self.currentBox = boxid;
                    });
                });
            });
        },
        getMessages: function() {
            var self = this;
            this.log('Getting system messages');
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                amlang: mw.config.get('wgUserLanguage'),
                ammessages: this.messages.join('|')
            }).then(function(data) {
                var messages = data.query.allmessages;
                messages.forEach(function(message) {
                    self.i18n[message.name.replace(/\-/g, '_')] = message['*'];
                });
            });
        },
        getUsers: function(users, callback) {
            var self = this;
            this.log('Getting users');
            this.api.get({
                action: 'query',
                list: 'users',
                ususers: users.join('|'),
                usprop: 'blockinfo|groups|editcount'
            }).then(function(users) {
                self.log(users);
 
                var uids = [],
                uperids = {},
                uarray = users.query.users,
                params = null;
 
                uarray.forEach(function(user) {
                    self.log(user);
                    uids.push(user.userid);
                    uperids[user.userid] = user;
                });
 
                self.log(uids);
 
                params = uids.map(function(uid, i) {
                    if (i > 0) return '&id='+uid;
                    else return '?id='+uid;
                }).join('');
 
                $.get('https://services.fandom.com/user-attribute/user/bulk' + params, function(usinfo) {
                    usinfo = usinfo.users;
                    Object.keys(usinfo).forEach(function(uid) {
                        // Find user
                        var uinfo = uperids[uid];
                        self.log(uinfo);
                        var userProps = usinfo[uid];
                        var userObj = {
                            editcount: uinfo.editcount
                        };
 
                        self.allowedUserProps.forEach(function(propName) {
                            userObj[propName] = userProps[propName];
                        });
 
                        self.usersCollection[userProps.username] = userObj;
                    });
 
                    callback();
                });
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
                    html: '<b>'+u.editcount+'</b> '+this.i18n.edits,
                    href: './Special:Contributions/'+userName
                })
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
 
            boxSections.push(boxLinks);
 
            // Box details
            var availableProps = Object.keys(u);
            if (availableProps.length > 0) {
                availableProps.forEach(function(propName) {
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
                            html: self.i18n[propI18n].replace(/\$1/g, u[propName])
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
            this.currentBox = null;
        }
    }, window.quickViewProfiles);
 
    mw.loader.using('mediawiki.api').then(quickViewProfiles.ready.bind(quickViewProfiles));
})();