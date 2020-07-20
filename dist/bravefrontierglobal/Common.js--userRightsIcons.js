/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
    var rights = {};
    var chatMod = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Chat_Moderators'>Lounge Management</a>";
    var adminTag = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Administrators'>Wiki Administrator</a>";
    var bureaucratTag = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Bureaucrats'>Wiki Bureaucrat</a>";
    var forummodTag = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Chat_Moderators'>Forum Management</a>";
    var founder = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Founders'>Wiki Founder</a>";
    var contentmodTag = "<a href='http://bravefrontierglobal.wikia.com/wiki/Help:User_access_levels#Content Moderators'>Content Moderator</a>";
    
    rights["Yapboonyew"] = [bureaucratTag, chatMod, forummodTag],
    rights["Linathan"] = [adminTag, chatMod, forummodTag],
    rights["Blake Xi"] = [chatMod, forummodTag],
    rights["Agentstrauss"] = [chatMod, forummodTag],
    rights["FreijaAesir"] = [chatMod, forummodTag],
    rights["BlazingKey"] = [chatMod, forummodTag],
    rights["Dark Ice Lexida"] = [chatMod, forummodTag],
    rights["Shaine.nls"] = [founder];
    
});


if ($('span.tag:contains("Banned From Lounge")').length == 1) {
    $('span.tag:contains("Banned From Lounge")').wrap("<a href='/wiki/Special:Contributions/" + wgTitle.replace(' ', '_') + "' style='color:white;'></a>");
}

if ($('span.tag:contains("Blocked From Wiki")').length == 1) {
    $('span.tag:contains("Blocked From Wiki")').wrap("<a href='/wiki/Special:Contributions/" + wgTitle.replace(' ', '_') + "' style='color:white;'></a>");
}