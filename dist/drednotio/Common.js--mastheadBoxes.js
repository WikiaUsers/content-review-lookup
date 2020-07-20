/* Any JavaScript here will be loaded for all users on every page load. */



/* DISABLED FOR NOW!
var rights = {},
    icons = {},
    user = wgTitle;

rights["Ownslo"]           = ["CSS"],
rights["ADDNAMEHERE"]      = ["Management", "News Reporter", "Events Host"];

//icons["Admin"]          = "9/95/Badge-Admin.png",
icons["Management"]     = "0/0c/Badge-Management.png",
icons["CSS"]            = "b/bb/Flux_Crystals.png";

if(user.indexOf("Contributions/") != -1)
    user = title.replace("Contributions/", "");
if(typeof rights[user] != "undefined")
    for(var i = 0, len = rights[user].length; i < len; i++)
        $('<span class="tag" style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

$('.tag').each(function() {
    if(typeof icons[$(this).html()] != "undefined") {
        $(this).addClass("Rank-" + $(this).html());	
        $(this).prepend("<img src='https://vignette.wikia.nocookie.net/drednotio/images/" + icons[$(this).html()] + "' />");
    }
});

*/