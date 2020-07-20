require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw"
], function(wk, wd, $, mw){
    if (!$(document.body).hasClass("ChatWindow")) return;
    var QuickModTools = {};
    // Creating an actions object
    QuickModTools.actions = {};
    // Kick a user from a chat
    QuickModTools.actions.kick = function(user){
        var kickCommand = new models.KickCommand({
            userToKick: user
        });
        
        var $deferred = $.Deferred(function(deferred){
            mainRoom.socket.send(kickCommand.xport());
            deferred.resolve(user);
            return deferred;
        });
        
        return $deferred;
    };
    
    QuickModTools.actions.ban = function(user, options){
        var O = Object.assign({}, null);
        if (typeof user === "object") O = Object.assign({}, user);
        else if (typeof user === "string") O.username = user;
        QuickModTools.defBanConfig(options);
    };
});