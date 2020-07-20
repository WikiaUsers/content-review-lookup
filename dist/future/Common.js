AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:Contributions"
];
/* Dark Mode Tool */

var darkMode = localStorage.getItem("FutureDarkMode")=="enabled";
var DMClass = "future-dark-mode";
var DMToolClass = "dark-mode-tool";
var DMTool = $("<li><a></a><li>").children("a").addClass(DMToolClass).text("Dark Mode " + (darkMode ? "Enabled" : "Disabled")).click(function(){
    if(darkMode){
        localStorage.setItem("FutureDarkMode","disabled");
        $("body").removeClass(DMClass);
    }else{
        localStorage.setItem("FutureDarkMode","enabled");
        $("body").addClass(DMClass);
    }
    darkMode = localStorage.getItem("FutureDarkMode")=="enabled";
    $("."+DMToolClass).text("Dark Mode " + (darkMode ? "Enabled" : "Disabled"));
}).parent();
$(".toolbar .tools").append(DMTool);
if(darkMode){
    $("body").addClass(DMClass);
}
/* End Dark Mode Tool */