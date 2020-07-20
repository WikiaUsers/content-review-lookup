/* Any JavaScript here will be loaded for all users on every page load. */
// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// Написал пользователь:Rappy_4187, Aion Wiki
//Взято с английской версии Warfame Wiki
// Добавлена поддержка Special:Contributions by Foodbandlt
//P.S. Все ссылки будут подстроены под эту вики 27.02.2019
 
$(function () {
    var rights = {};
    var botTag = "<a href='http://warframe.wikia.com/wiki/WARFRAME_Wiki:Administrators#Bots'>Бот</a>";
    var chatMod = "<a href='http://warframe.wikia.com/wiki/Project:Administrators'>Модератор чата</a>";
    var adminTag = "<a href='http://warframe.wikia.com/wiki/Project:Administrators'>Администратор <img src='https://images.wikia.nocookie.net/__cb20150423210907/warframe/images/c/c7/Wikia_Badge_2.png' alt='Админ' /></a>";
    var bureaucratTag = "<a href='http://warframe.wikia.com/wiki/Project:Bureaucrats'>Бюрократ <img src='https://images.wikia.nocookie.net/__cb20150423210907/warframe/images/c/c7/Wikia_Badge_2.png' alt='Админ' /></a>";
    var moderatorTag = "<a href='http://warframe.wikia.com/wiki/WARFRAME_Wiki:Administrators#Moderators'>Модератор</a>";
    var VSTF = "<a href='http://warframe.wikia.com/wiki/Help:VSTF'>VSTF</a>";
    var staff = "<a href='http://warframe.wikia.com/wiki/Help:Wikia_Staff'>Staff</a>";
    var councilor = "<a href='http://warframe.wikia.com/wiki/Help:Community_Council'>Councilor</a>";
    var star = "<a href='http://www.wikia.com/Stars'>Wikia Star</a>";
    var founder = "<a href='http://warframe.wikia.com/wiki/Project:Administrators'>Founder</a>";

    var disciple = "<a title='Disciple' class='masthead-disciple' href='http://warframe.wikia.com/wiki/Founders'>Disciple <img src='https://images.wikia.nocookie.net/warframe/images/3/3e/DiscipleBadge.png' alt='Disciple' /></a>";
    var hunter = "<a title='Hunter' class='masthead-hunter' href='http://warframe.wikia.com/wiki/Founders'>Hunter <img src='https://images.wikia.nocookie.net/warframe/images/2/2d/HunterBadge.png' alt='Hunter' /></a>";
    var master = "<a title='Master' class='masthead-master' href='http://warframe.wikia.com/wiki/Founders'>Master <img src='https://images.wikia.nocookie.net/warframe/images/d/d2/MasterBadge.png' alt='Master' /></a>";
    var grandmaster = "<a title='Grand Master' class='masthead-grandmaster' href='http://warframe.wikia.com/wiki/Founders'>Grand Master <img src='https://images.wikia.nocookie.net/warframe/images/f/f2/GrandMasterBadge.png' alt='Grand Master' /></a>";
 
    var lotusguide = "<a title='Guide of the Lotus' class='masthead-lotusguide' href='http://warframe.wikia.com/wiki/Guides_of_the_Lotus'>Guide of the Lotus <img src='https://images.wikia.nocookie.net/__cb20150408215141/warframe/images/f/f0/LotusGuideBadge.png' alt='Guide of the Lotus' /></a>";
    // Начать список учетных записей с дополнительными значками прав пользователя
    //
    // Убедитесь, что за последней строкой списка измененных прав следует точка с запятой, а не запятая.

    //---------------------------------Боты---------------------------------
 
    rights["NAME"]                   = [botTag],
    rights["NAME"]                   = [botTag],
    rights["NAME"]                   = [botTag],
    rights["NAME"]                   = [botTag],
    rights["NAME"]                   = [botTag],
 
    //Модераторы чата
  
    rights["Валерчикончик"]                  = [chatMod, adminTag, bureaucratTag, moderatorTag],
    rights["Shadow of the Corporation eDEN"] = [chatMod, adminTag, bureaucratTag, moderatorTag],
 
    //Администраторы
 
    rights["Валерчикончик"]                  = [adminTag, chatMod, bureaucratTag, moderatorTag],
    rights["Shadow of the Corporation eDEN"] = [adminTag, chatMod, bureaucratTag, moderatorTag],
    rights["Left Mosley"]                    = [adminTag],
    rights["EclipseBro"]                     = [adminTag],

    //Бюрократы
 
    rights["Валерчикончик"]                  = [bureaucratTag, chatMod, adminTag, moderatorTag],
    rights["Shadow of the Corporation eDEN"] = [bureaucratTag, chatMod, adminTag, moderatorTag],
    rights["EclipseBro"]                     = [bureaucratTag],
    rights["Elias Aguero"]                   = [bureaucratTag],

    //Прочие Модераторы
 
    rights["Валерчикончик"]                 = [moderatorTag, bureaucratTag, chatMod, adminTag],
    rights["Left Mosley"]                   = [moderatorTag],
    
    
    //Guide of the Lotus
    rights["NAME"]             = [lotusguide, chatMod],
    rights["NAME"]             = [lotusguide],

    //VSTF
 
    rights["NAME"]                     = [VSTF],

    //Staff
 
    rights["NAME"]                     = [staff],

    //Councilor
 
    rights["NAME"]                     = [councilor],

    //Wikia Star
 
    rights["NAME"]                     = [star],

    //Founder
 
    rights["NAME"]                     = [founder];

 
    // Конечный список учетных записей с дополнительными значками прав пользователя
 
 
    if (wgPageName.indexOf("Special:Contributions") != -1) {
        // newTitle = fbReturnToTitle.replace("Special:Contributions/", "");
        // unfinishedTitle = newTitle;
 
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
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
//***************
// Добавляет ссылку на Special:Contributions для тега "Забанен в Чате"
//***************
 
if ($('span.tag:contains("Banned From Chat")').length == 1) {
    $('span.tag:contains("Banned From Chat")').wrap("<a href='/wiki/Special:Contributions/" + wgTitle.replace(' ', '_') + "' style='color:white;'></a>");
}
 
//***************
// Добавляет ссылку на to Special:Contributions для тега "Заблокирован"
//***************
 
if ($('span.tag:contains("Blocked")').length == 1) {
    $('span.tag:contains("Blocked")').wrap("<a href='/wiki/Special:Contributions/" + wgTitle.replace(' ', '_') + "' style='color:white;'></a>");
}
 
// </source>