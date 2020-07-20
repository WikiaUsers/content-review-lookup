AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:Log", "Special:Log/upload"];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:ChatSideRail/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:TimedSlider/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:YoutubePlayer/code.js',
        "u:monchbox:MediaWiki:Torus.js",
        'u:dev:DynamicImages/code.js',
    ]
});

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

/**
 * Script for adding text to upload page
 * @author KockaAdmiralac <1405223@gmail.com>
 */
 
 

 
    // Small snippet for Template:Username
    if(wgUserName) $(".insertusername").html(wgUserName);
    if($('.page-User_Quadstar').length > 0) $('.masthead-info hgroup').append("<span class='tag'>Content Moderator</span>");

    // When people tell me to open RP boards -_-
    if(wgCanonicalSpecialPageName === "Forum")$('.boards').append("<li class=\"board\"><div class=\"heading\"><h4><a href=\"http://undertale-rp.wikia.com/wiki/Board:Roleplaying_Boards\">Roleplaying Boards</a></h4></div><p class=\"description grid-3 alpha\">Place for RPing. This board in located on <a href=\"http://undertale-rp.wikia.com\">Undertale RP wiki</a></p></li>");
 
    // Move Community messages and Insights before Live! Chat in the Wiki Activity page
    $(".CommunityCornerModule").insertBefore($('.ChatModule'));
    $(".insights-module").insertBefore($('.ChatModule'));
    window.revisionTest = $(".CommunityCornerModule");
});

    // Small snippet for Template:Username
    if(wgUserName) $(".insertusername").html(wgUserName);
 
    // When people tell me to open RP boards -_-
    if(wgCanonicalSpecialPageName === "Forum")$('.boards').append("<li class=\"board\"><div class=\"heading\"><h4><a href=\"http://undertale-rp.wikia.com/wiki/Board:Roleplaying_Boards\">Roleplaying Boards</a></h4></div><p class=\"description grid-3 alpha\">Place for RPing. This board in located on <a href=\"http://undertale-rp.wikia.com\">Undertale RP wiki</a></p></li>");