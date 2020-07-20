// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
// Modified by Ozuzanna to be more dynamic for default tags
// Correct by Sgt D Grif to remove Vidmas7er slander
 
$(function () {
    var rights = {},
    meanie = "<a href='http://i.imgur.com/ikz0JaW.jpg'><span style='color:white'>Meanie</span></a>",
    loser = "<a href='http://www.chowhound.com/blog-media/2014/12/sandhiracinnamon-roll13859833365480.jpg'><span style='color:white'>Is on E</span></a>";
 
    // Begin list of accounts given extra user rights icons
    //
    // Be sure that the last line listed for modified rights is followed by a semi-colon rather than a comma.
    // There is no need to add users who are solely administrator/chat moderator, as this is covered dynamically (though if they have a global usergroup such as councilor then they should be added here)
 
    //meanies
 
    rights["Sgt Stacker117"]                   = [meanie],
    rights["Alien-king"]                       = [meanie],
 
    //jersey
 
    rights["Vidmas7er"]                        = [loser];
 
    // End list of accounts given extra user rights icons
 
 
    if (wgPageName.indexOf("Special:Contributions") != -1) {
        newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        unfinishedTitle = newTitle;
 
        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }
 
        userName = unfinishedTitle;
 
    } else {
        userName = wgTitle;
        userName.replace("User:", "");
    }
 
    if (typeof rights[userName] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // add new rights
            $('<span style="margin-left: 10px;" class="tag tag-custom">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
//***************
// Adds links to usergroups that have default tags
//***************
 
if ($('.tag').length && !$('.tag-custom').length) {
  $('.tag').each(function() {
    var obj = $(this),
    tag = obj.text();
 
    function addLink(page) {
      obj.html('<a href="/wiki/' + page + '"><span style="color:white">' + tag + '</span></a>'); 
    }
 
    switch (tag) {
      case "Admin":
        addLink("CrossOverRp_Wiki:Administrators");
      break;
 
      case "Chat moderator":
        addLink("Policy:Chat");
      break;
 
      case "VSTF":
        addLink("Help:VSTF");
      break;
 
      case "Wikia Star":
        addLink("Homepage:Stars");
      break;
 
      case "Councilor":
        addLink("Help:Community Council");
      break;
 
      case "Staff":
        addLink("Help:Staff");
      break;
 
      case "Helper":
        addLink("Help:User_rights#Helpers");
      break;
 
      case "Volunteer Developer":
        addLink("Help:User_rights#Volunteer_Developers");
      break;
 
      case "Authenticated":
        addLink("Help:User_rights#Authenticated");
      break;
 
      case "Blocked":
        addLink("Special:Log/block?page=" + mw.config.get('wgTitle').replace('Contributions/','').replace(/ /g,'_'));
      break;
 
      case "Banned From Chat":
        addLink("Special:Log/chatban?page=" + mw.config.get('wgTitle').replace('Contributions/','').replace(/ /g,'_'));
      break;
 
    }
  });
}
 
// </source>