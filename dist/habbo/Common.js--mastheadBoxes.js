var rights = {},
    icons = {},
    user = wgTitle;

rights["Ownslo"]           = ["CSS", "Developer", "Owner"],
rights["Michaelcong"]      = ["Owner", "Management"],
rights["ADDNAMEHERE"]      = ["Management", "News Reporter", "Events Host"];

icons["Admin"]          = "9/95/Badge-Admin.png",
icons["AWB"]            = "6/62/COM11.gif",
icons["Blocked"]        = "3/3a/BlockedUser.png",
icons["BOT"]            = "3/39/Bot_Badge.png",
icons["Chat Moderator"] = "7/79/NWB.gif",
icons["Developer"]      = "7/70/Badge-Dev.png",
icons["Events Host"]    = "7/7a/Badge-Event.png";
icons["General Manager"]= "5/5a/Fansite.png",
icons["Inactive"]       = "5/54/US0R.png",
icons["News Reporter"]  = "e/e4/Badge-News.png",
icons["Management"]     = "0/0c/Badge-Management.png",
icons["Owner"]          = "d/de/Badge-Owner.png",
icons["CSS"]            = "2/24/CSSstaff.gif",  /*test*/
icons["XmasPenguin"]    = "5/53/XmasPenguin.png"; /*test2*/

if(user.indexOf("Contributions/") != -1)
    user = title.replace("Contributions/", "");
if(typeof rights[user] != "undefined")
    for(var i = 0, len = rights[user].length; i < len; i++)
        $('<span class="tag" style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

$('.tag').each(function() {
    if(typeof icons[$(this).html()] != "undefined") {
        $(this).addClass("Rank-" + $(this).html());	
        $(this).prepend("<img src='https://images.wikia.nocookie.net/habbo/en/images/" + icons[$(this).html()] + "' />");
    }
});