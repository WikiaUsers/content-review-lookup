/**
 * 
 * @module          UserHighlight
 * @description     Highlights users with rights
 * @author          Ultimate Dark Carnage
 * @version         1.0.0
 * @license         CC-BY-SA (Creative Commons)
 * 
 **/
(function($, mw){
    // Double-run prevention
    if (typeof window.UserHighlight !== 'undefined') return;
    
    /**
     * @class           UserHighlight
     * @description     The main object for highlighting users
     **/
    var UserHighlight = {};
    
    /**
     * @member {String[]}       globalGroups
     * @description             The global user groups to find in order
     * @memberof                UserHighlight
     **/
    UserHighlight.globalGroups = ['bot', 'staff', 'helper', 'vstf', 'councilor', 'vanguard'];
    
    /**
     * @member {String[]}       localGroups
     * @description             The local user groups to find in order
     * @member                  UserHighlight
     **/
    UserHighlight.localGroups = ['bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator', 'rollback', 'codeeditor'];
    
    /**
     * @member {Array}          cache
     * @description             The array to check if the user was in
     *                          any user groups
     * @memberof                UserHighlight
     **/
    UserHighlight.cache = [];
    
    /**
     * @method                  amalgamateArray
     * @description             The method to combine arrays into one
     * @returns                 {Array}
     * @memberof                UserHighlight
     **/
    UserHighlight.amalgamateArray = function(){
        var args = [].slice.call(arguments, 1),
            result = (Array.isArray(arguments[0]) && arguments[0].length > 0) ? arguments[0] : [];
        for (var aIndex = 0, aLength = args.length; aIndex < aLength; aIndex++){
            var arg = args[aIndex];
            if (Array.isArray(arg) && arg.length > 0){
                for (var index = 0, length = arg.length; index < length; index++){
                    var value = arg[index];
                    result[result.length] = value;
                }
            } else continue;
        }
        return result;
    };
    
    /**
     * @member {Object}         usersInGroup
     * @description             The object used to fetch the users 
     *                          in a group
     * @memberof                UserHighlight
     **/
    UserHighlight.usersInGroup = (function(globalGroups, localGroups){
        var groups = UserHighlight.amalgamateArray(globalGroups, localGroups),
            object = {};
        for (var index = 0; index < groups.length; index++){
            var group = groups[index];
            if (!object.hasOwnProperty(group)){
                object[group] = [];
            }
        }
        return object;
    }(UserHighlight.globalGroups, UserHighlight.localGroups));
    
    /**
     * @member {Object}         fetched
     * @description             The object to check if all users have been fetched
     * @memberof                UserHighlight
     **/
    UserHighlight.fetched = $.Deferred();
    
    /**
     * @method                              sendAPI
     * @description                         Sends an AJAX request to the server
     * @param {String} type                 The type of request to perform
     * @param {Function|Object} callback    The callback to use for the AJAX request
     **/
    UserHighlight.sendAPI = function(type, callback){
        var API = new mw.Api();
        API[type].call(API, function(data){
            if (typeof callback === 'function') callback(data);
            else if (typeof callback === 'object'){
                if (data.error) callback.error(data);
                else callback.done(data);
            }
        });
    };
}(jQuery, mediaWiki));