var HC_chat = {
    getUser: function(){
        
    },
    getAllUsers: function(config){
        var exceptions = config.exceptions || [],
            mods = config.mods || false,
            self = config.self || true,
            usersCid = mainRoom.model.users._byCid,
            usersByCid = Object.keys(userCid), usersArr = null;
        usersArr = [];
        for (var i = 0; i < usersByCid.length; i++){
            var userData = usersCid[usersByCid[i]];
            if (exceptions && exceptions.indexOf(userData.attributes.name) < 0){
                usersArr.push(userData.attributes.name);
            } else if (mods){
                if (mods == "can promote"){
                    var canPromote = userData.attributes.canGiveMod;
                    if (canPromote === true){
                        userArr.push(userData.attributes.name);
                    } else return false;
                } else if (mods == "staff"){
                    var isStaff = userData.attributes.isStaff;
                    if (isStaff === true){
                        userArr.push(userData.attributes.name);
                    } else return false;
                } else if (mods === true){
                    var isMod = userData.attributes.isMod;
                    if (isMod === true){
                        userArr.push(userData.attributes.name);
                    } else return false;
                } else return false;
            } else {
                if (self === true){
                    userArr.push(userData.attributes.name);
                } else {
                    var u = userData.attributes.name;
                    if (u.indexOf(wgUserName) < 0){
                        userArr.push(u);
                    }
                }
            }
        }
        return usersArr;
    },
    afterAdd: function(callback){
        if (callback){
            var m = mainRoom.model.chats,
                fn = m.bind('afteradd', callback);
            return fn;
        } else return false;
    },
    clear: function(value){
        if (value === true){
            if ($('.Chat li').length){
                $('.Chat li').remove();
            }
        }
    },
    nuke: {
        kickAll: function(exceptions){
            var users = HC_chat.getAllUsers(exceptions);
            for (var i = 0; i < users.length; i++){
                mainRoom.kick({ 
                    name: users[i]
                });
            }
        },
        banAll: function(config){
            var users = HC_chat.getAllUsers(config.exceptions);
            if (config){
                var expiry = null, reason = null;
                for (var i = 0; i < users.length; i++){
                    expiry = (config.users[users[i]].expiry) ? config.users[users[i]].expiry : '2 hours';
                    expiry = expiry.replace(/([0-9]|[0-9]\.[0-9]) (seconds|minutes|hours|days|weeks|months|years)/gi, function convert(key, n, time){
                        var val = null;
                        switch (time){
                            case 'seconds':
                                val = 1;
                                break;
                            case 'minutes':
                                val = convert(null, 60, 'seconds');
                                break;
                            case 'hours':
                                val = convert(null, 60, 'minutes');
                                break;
                            case 'days':
                                val = convert(null, 24, 'hours');
                                break;
                            case 'weeks':
                                val = convert(null, 7, 'days');
                                break;
                            case 'months': 
                                val = convert(null, 31, 'days');
                                break;
                            case 'years':
                                val = convert(null, 12, 'months');
                                break;
                            default:
                                return false;
                        }
                        n = (function(){
                            n = Number(n);
                            if (isNaN(n) === false){
                                return n;
                            } else {
                                return NaN;
                            }
                        })();
                        if (isNaN(n) === false){
                            val = n * val;
                            return val;
                        } else {
                            return function(){ 
                                console.error('Incorrect value for the number of hours'); 
                                return false; 
                            }
                        }
                    });
                    reason = (config.users[users[i]].reason) ? config.users[users[i]].reason : 'Misbehaving in chat';
                    var ban_command = new models.BanCommand({
                        userToBan: users[i],
                        time: expiry,
                        reason: reason
                    });
                    var b = mainRoom.socket.send(ban_command.xport());
                }
            }
        }
    }
};