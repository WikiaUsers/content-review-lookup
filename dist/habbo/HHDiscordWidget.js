$(function() {
    
    // Valid invite codes for our Discord server. ff -> https://discord.gg/ff
    var INVITE_CODES = {
        "wikia": "https://discord.gg/xJ8rpqj"
    };
    
    // Function to make sure the data we get from Discord (3rd party website) is a number, as to be super-safe.
    function castInt(x) {
        x = parseInt(x.toString());
        if (isNaN(x)) return 0;
        return x;
    }
    
    // Credit to https://stackoverflow.com/a/2901298
    function numberWithCommas(x) {
        return castInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function loadWidgets(invType) {
        // Our Discord invite widgets will use this classname.
        var inviteWidgets = $(".discord-invite-widget[data-invcode='" + invType + "']");
        var invCode = INVITE_CODES[invType];
        
        // We'll only load data if there are any Discord invite widgets on the current page.
        if (inviteWidgets.length > 0) {
            // Gets JSON data about our Discord server, such as online member count & total member count.
            $.getJSON("https://discordapp.com/api/v6/invites/" + invCode + "?with_counts=1", function(data) {
                // Our Discord server image.
                var icon = "https://cdn.discordapp.com/icons/" + data.guild.id + "/" + data.guild.icon + ".webp";
                // 1,234 online
                var online = " " + numberWithCommas(data.approximate_presence_count) + " online";
                // 1,234 members
                var members = " " + numberWithCommas(data.approximate_member_count) + " members";
                
                // Creates the HTML for this Discord invite widget, which will replace all the placeholders.
                var widget = $("<a class=\"discord-invite-widget habbo-" + invType + "\" href=\"https://discord.gg/" + invCode + "\"><img/><div><span class=\"discord-title\">Habbo Hotel</span><span class=\"discord-online\"><span class=\"member-count\"><div class=\"indicator online\"></div>" + online + "&nbsp;&nbsp;&nbsp;&nbsp;</span><span class=\"member-count\"><div class=\"indicator offline\"></div>" + members + "</span></span><span class=\"discord-link\">https://discord.gg/" + invCode + "</span></div></a>");
                
                // Safely sets the Discord server image.
                widget.find("img").attr("src", icon);
                widget.find(".discord-title").text(data.guild.name);
                
                // Updates the placeholders to use the actual data.
                inviteWidgets.replaceWith(widget);
            });
            
        }
    }
    
    // Load our widgets.
    loadWidgets("wikia");
});