(function(window, document, $, mw){
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.ChatMention !== void 0)
    ) return;
    // Creating the primary constructor
    function ChatMention(config){
        if (!(this instanceof ChatMention)) return new ChatMention(config);
        // Fetch default configurations
        this.__getConfig(config);
        // List of users to mention
        this.__users = [];
        // The regular expression pattern used to mention the user
        this.__userPattern = null;
        // The current username
        this.__self = mw.config.get('wgUserName');
        // Room data mapped by room ID
        this.__data = {};
        // User(s) to ignore
        this.ignore = [].concat(config.ignore || []);
        // Determines whether to allow the script to run in a private room
        this.allowPrivateRoom = config.allowPrivateRoom;
        // Determines whether to allow the script to run in the main room
        this.allowMainRoom = config.allowMainRoom;
        // Returns the object
        return this;
    }
    
    // Utility functions
    ChatMention.prototype.__promisify = function(deferred){
        return new Promise(function(resolve, reject){
            deferred.done(resolve).fail(reject);
        });
    };
    
    ChatMention.prototype.__escape = function(string){
        return string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
    };
    
    ChatMention.prototype.__getRoom = function(roomId){
        return mainRoom.chats.privates[roomId] || mainRoom;
    };
}(window, document, jQuery, mediaWiki));