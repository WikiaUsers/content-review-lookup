(function loadUntilMainRoom(mw, $, mainRoom){
    if (typeof mainRoom == 'undefined' || !mainRoom.isInitialized){
        loadUntilMainRoom(mw, $, mainRoom);
    } else {
        function getUsers(){
            return new Promise(function(resolve, reject){
                var users = mainRoom.model.users,
                    userlist = users.map(function(child){
                        return child.attributes.name;
                    });
                if (userlist.length > 0){
                    resolve(userlist);
                } else {
                    reject();
                }
            });
        }
        
        function logUsers(){
            getUsers().then(function(userlist){
                userlist = userlist.sort(function(a, b){
                    return a.localeCompare(b);
                });
                var _users = userlist.map(function(username){
                        var userobj = mainRoom.model.users.findByName(username),
                            attributes = userobj.attributes;
                        return [username, attributes];
                    }),
                    _users_obj = $.extend({}, getLoggedUsers());
                _users.forEach(function(user_arr){
                    var name = user_arr[0],
                        attributes = user_arr[1];
                    if (!_users_obj.hasOwnProperty(name)){
                        _users_obj[name] = attributes;
                    }
                });
                setLoggedUsers(sortObject(_users_obj));
            });
        }
        
        function sortObject(object, comparator){
            var keys = Object.keys(object),
                result = {};
            keys = keys.sort(typeof comparator == 'function' ? comparator : function(a, b){
                return a.localeCompare(b);
            });
            for (var i = 0; i < keys.length; i++){
                var key = keys[i];
                result[key] = object[key];
            }
            return result;
        }
        
        function setLoggedUsers(users_obj){
            var json_string = JSON.stringify(users_obj);
            localStorage.setItem('loggedUsers', json_string);
        }
        
        function getLoggedUsers(){
            var json_string = localStorage.getItem('loggedUsers'),
                users_obj = JSON.parse(json_string);
            return users_obj || {};
        }
        
        $(logUsers);
        setInterval(logUsers, 1000);
    }
}(this.mediaWiki, this.jQuery, this.mainRoom));