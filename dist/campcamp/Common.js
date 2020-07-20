/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:Log", "Special:Log/upload"];

window.notiplus = window.notiplus || {};
notiplus.consentRequired = false;

window.UserTagsJS = {
    modules: {
        mwGroups: [
            "bureaucrat",
            "content-moderator",
            "sysop",
            "founder",
            "threadmoderator",
            "chatmoderator",
            "bot",
            "bot-global",
            "vstf",
            "staff",
            "voldev",
            "vanguard",
            "council",
            "helper",
            "util",
            "authenticated",
            "rollback"
        ],
        metafilter: {
            "staff":            ["bot-global"],
            "util":             ["staff"],
            "rollback":         ["content-moderator", "sysop"]
        }
    },
    tags: {
        "bureaucrat":           {                           link: "Project:Staff#Camp Committee"   },
        "sysop":                {                           link: "Project:Staff#Counselors"       },
        "founder":              {                           link: "Project:Staff#Scoutmaster"      },
        "threadmoderator":      {                           link: "Project:Staff#Cult Leaders"     },
        "chatmoderator":        {                           link: "Project:Staff#Mages"            },
        "content-moderator":    {                           link: "Project:Staff#Quartermasters"   },
        "bot":                  { u: "Bot",                 link: "Help:Bots"                      },
        "bot-global":           { u: "Bot",                 link: "Help:Bots"                      },
        "vstf":                 {                           link: "Help:VSTF"                      },
        "staff":                {                           link: "Help:Staff"                     },
        "voldev":               {                           link: "w:c:dev:Volunteer Developers"   },
        "vanguard":             {                           link: "Help:Vanguard"                  },
        "council":              {                           link: "Help:Community Council"         },
        "helper":               {                           link: "Help:Helpers"                   },
        "util":                 { u: "Wikia Utility"                                               },
        "authenticated":        {                           link: "Help:User rights#Authenticated" },
        "rollback":             { u: "Bus Driver",          link: "Project:Staff#Bus Drivers"      },
        "retired":              { u: "Retired",             link: "Project:Staff#Retired"          }
    }
};

$(function()
{
    // Allows the entire box on Help:Contents to be clickable
    // Taken from Community Central
    if (mw.config.get('wgPageName') == 'Help:Contents')
        $('.centralhelpbox').click(function() { window.location.href = '/wiki/Help:' + $(this).attr('data-link'); });
    
    // Small snippet for Template:Username
    if(wgUserName) $(".insertusername").text(wgUserName);
    
    // Affiliate link in forums
    if(wgCanonicalSpecialPageName === "Forum")
        $('.boards').append(
            "<li class='board'>"
            + "<div class='heading plainlinks'><h4><a class='external' href='https://reddit.com/r/CampCamp'>"
            + "Camp Camp subreddit</a></h4></div>"
            + "<p class='description grid-3 alpha'>Camp Camp's subreddit. Share fanart, discuss the latest Camp Camp news, etc.</p>"
            + "</li>");
    
    // External links
    //$("a.external, .force-ext a").attr("target", "_blank"); // todo: use a more secure way to open links in newtab
    $(".portable-infobox").addClass("plainlinks");          // Force PI to adopt plainlinks class
});