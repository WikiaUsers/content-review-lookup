/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity", "Special:Log", "Special:Log/upload"];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:YoutubePlayer/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        "u:dev:MediaWiki:UserTags/code.js",
        "u:monchbox:MediaWiki:Torus.js"
    ]
});
 
window.UserTagsJS = {
    modules: {
        mwGroups: [
            "bureaucrat",
            "content-moderator",
            "sysop",
            "threadmoderator",
            "chatmoderator",
            "bot",
            "bot-global",
            "patroller",
            "vstf",
            "staff"
        ],
        custom: {
            "Mamvik":           ["translator"],
            "Hennils":          ["translator"]
        },
        userfilter: {
            "TechnicalIssues":  ["founder", "bureaucrat", "sysop"]
        },
        metafilter: {
            "sysop":            ["bureaucrat"],
            "chatmoderator":    ["bot"],
            "patroller":        ["bot"],
            "staff":            ["bot-global"]
        }
    },
    tags: {
        "bureaucrat":           { u: "Bureaucrat",                  link: "Category:Bureaucrats"                },
        "sysop":                { u: "Admin",                       link: "Category:Administrators"             },
        "threadmoderator":      { u: "Discussions Moderator",       link: "Category:Discussions Moderators"     },
        "chatmoderator":        { u: "Chat Moderator",              link: "Category:Chat Moderators"            },
        "content-moderator":    { u: "Content Moderator",           link: "Category:Content Moderators"         },
        "patroller":            { u: "Patroller",                   link: "Help:Recent changes patrol"          },
        "translator":           { u: "Translator"                                                               },
        "bot":                  { u: "Bot",                         link: "Help:Bots"                           },
        "bot-global":           { u: "Bot",                         link: "Help:Bots"                           },
        "vstf":                 { u: "Volunteer Spam Task Force",   link: "Help:VSTF"                           },
        "staff":                { u: "Wikia Staff",                 link: "Help:Staff"                          }
    }
};
 
$(function()
{
    // Upload warning
    if(mw.config.get("wgCanonicalSpecialPageName") === "Upload")
    {
        var element = $("#uploadtext");
        element.html(element.html() + "<div style='color:red;font-weight:bold;font-style:italic;font-size:14px;font-family:Courier New;'>Please DO NOT upload files that are used only for Talk/Forum/User pages.<br/>Link them externally instead.<br/>You can read more about it <a href='http://undertale.wikia.com/wiki/Thread:28133'>here.</a></div>");
    }
    else if(wgTransactionContext.action === "edit")
    {
        WikiaEditor.load("WikiaMiniUpload").done(function()
        {
            var _kockaRandomAliasWMUindicator7F9n3Mhr7F = WMU_indicator;
            WMU_indicator = function(arg1, arg2)
            {
                _kockaRandomAliasWMUindicator7F9n3Mhr7F.call(this, arg1, arg2);
                if(arg1 === 1 && !arg2)
                {
                    var element = $("#ImageUploadMain");
                    if(element.html()) element.html(element.html() + "<div class='uploadWarning'>" + text + "</div>");
                }
            };
        });
    }
 
    // Small snippet for Template:Username
    if(wgUserName) $(".insertusername").html(wgUserName);
 
    // When people tell me to open RP boards -_-
    if(wgCanonicalSpecialPageName === "Forum")$('.boards').append("<li class=\"board\"><div class=\"heading\"><h4><a href=\"http://undertale-rp.wikia.com/wiki/Board:Roleplaying_Boards\">Roleplaying Boards</a></h4></div><p class=\"description grid-3 alpha\">Place for RPing. This board in located on <a href=\"http://undertale-rp.wikia.com\">Undertale RP wiki</a></p></li>");
 
});