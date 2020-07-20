// Tags
// WRITTEN BY User:Rappy_4187
 
 function addMastheadTags() {
    var rights  = {},
        user    = "";

    rights["Galli2001"]                     = ["Founder","Bureaucrat","Admin"],
    rights["ApplerGamers"]                  = ["Builder", "Honorary Founder"],
    rights["Coriidor5"]                     = ["Co-Founder","Bureaucrat","Admin"],
    rights["Minecraftian47"]                = ["Head Bureaucrat"],
    rights["Ender_Creeper14"]               = ["Admin"],
    rights["GoldMan27"]                     = ["Tribute"],
    rights["JustLeafy"]                     = ["Bureaucrat","Admin","Tribute"],
    rights["FrostRC"]                       = ["Tribute"],
    rights["Bashihbk01"]                    = ["Tribute"],
    rights["I type fast"]                   = ["Rollback"],
    rights["Non-existent User"]             = ["Do not remove this line"];

 
    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }

    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

$('.subnav-2.firstChild').append('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Special:Community">Community</a></li>');

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'Template:StdSummaries'
};
 
// The options need to be set before the import! Otherwise they may not work.
 
importArticles({
    type: 'script',
    articles: [ 
    'u:dev:Standard_Edit_Summary/code.js',
    'u:dev:AutoEditDropdown/code.js',
    'u:dev:SearchSuggest/code.js',
]});

/* Add Sandbox tab on all user pages and user talk pages - from SML Wiki */
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/User:" + wgTitle + "/Sandbox";
    var adds = "<li data-id='sandbox'><a href='" + address + "'>Sandbox</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

window.ajaxPages = ["Special:WikiActivity", "Special:RecentChanges"];