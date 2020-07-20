(function(mw, $, mainRoom, factory){
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
        $.when($.getScript('//dev.wikia.com/index.php?title=MediaWiki:WDSIcons/code.js&action=raw&ctype=text/javascript')).done(function(d){
            require(['fosl.wds'], function(wds){
                factory(mw, $, mainRoom, wds);
            });
        });
    }
}(this.mediaWiki, this.jQuery, this.mainRoom, function(mw, $, mainRoom, wds){
    var fc = {};
    fc.version = '1.2.0 beta';
    fc.wdsIcon = wds.icon;
    fc.check = fc.is = function(prop, cb){
        var obj = fc[prop], bool = typeof obj == 'boolean' ? obj : null;
        if (obj === true){
            if (typeof cb === 'function') cb.apply(window, [fc]);
            else return fc;
        } else return fc;
    };
    fc.exists = function(prop){
        var obj = fc[prop];
        return typeof obj !== 'undefined';
    };
    fc.set = function(prop, value){
        FandomizedChat[prop] = value;
    };
    fc.get = function(prop){
        return FandomizedChat[prop] || void 0;
    };
    fc.getUsers = true;
    fc.check('getUsers', function(obj){
        obj.createUserList = function(groups){
            var users = mainRoom.model.users,
                userlist = null;
            if (typeof groups == 'string'){
                userlist = users.filter(function(child){
                    var _groups = child.attributes.groups;
                    return _groups.indexOf(groups) > -1;
                });
            } else if (groups instanceof Array){
                userlist = users.filter(function(child){
                    var _groups = child.attributes.groups;
                    return groups.some(function(group){
                        return _groups.indexOf(group) > -1;
                    });
                });
            } else {
                userlist = users;
            }
            return userlist.map(function(child){
                return child.attributes.name;
            }).sort(function(a, b){
                return a.localeCompare(b);
            });
        };
        obj.createUserData = function(groups){
            var users = obj.createUserList.apply(obj, [groups]),
                data = {};
            users.forEach(function(user){
                var users_obj = mainRoom.model.users,
                    attribs = users_obj.findByName(user).attributes;
                Object.defineProperty(data, user, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: attribs
                });
            });
            return data;
        };
    });
    mw.hook('FandomizedChat.library.loaded').fire(fc);
    window.FandomizedChat = fc || {};
}));