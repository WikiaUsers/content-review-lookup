require([
    "wikia.window",
    "mw",
    "jquery"
], function(window, mw, $){
    var GCM = {};
    
    GCM.getUserRightsToken = function(user){
        var params = {
            action: "query",
            list: "users",
            ustoken: "userrights",
            ususers: user,
            format: "json"
        };
        
        return $.ajax({
            url: mw.util.wikiScript("api"),
            data: params
        });
    };
    
    GCM.promoteMod = function(token){
        var params = {
            format: "json",
            action: "userrights",
            user: 
        };
    };
});