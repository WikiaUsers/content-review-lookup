/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
     ]
});

/* Dark Mode Tool */

var darkMode = localStorage.getItem("TFOEDarkMode")=="enabled";
var DMClass = "tfoe-dark-mode";
var DMToolClass = "dark-mode-tool";
var DMTool = $("<li><a></a><li>").children("a").addClass(DMToolClass).text("Dark Mode " + (darkMode ? "Enabled" : "Disabled")).click(function(){
    if(darkMode){
        localStorage.setItem("TFOEDarkMode","disabled");
        $("body").removeClass(DMClass);
    }else{
        localStorage.setItem("TFOEDarkMode","enabled");
        $("body").addClass(DMClass);
    }
    darkMode = localStorage.getItem("TFOEDarkMode")=="enabled";
    $("."+DMToolClass).text("Dark Mode " + (darkMode ? "Enabled" : "Disabled"));
}).parent();
$(".toolbar .tools").append(DMTool);
if(darkMode){
    $("body").addClass(DMClass);
}

/* Auto refresh */

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:Contributions"
];