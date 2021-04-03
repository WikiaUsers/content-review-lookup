//Js du wiki anglais :
 
//TODO: Organise names, maybe collect all names in an array to reduce code redundancy
 
  //***************************************************\\
 //***Admin, mod, and Temp Mod Post Colours for Forums and Message Walls***\\
//*******************************************************\\
(function() {
    var border_admin = "6px double ";//+color
    var background_admin = "rgba(216, 180, 88, 0.85) url('https://images.wikia.nocookie.net/__cb20140625215453/lotrminecraftmod/images/0/03/Admin1_120.png') bottom center no-repeat";
    var admins = [
        {name: "Areades", color:"#81BEF7"},
        {name: "Aldan_Tanneo", color:"#387C44"},
        {name: "Delwynn_Ier", color:"#900000"},
        {name: "Eirienlaurë", color:"#32cadb"}
    ];
 
    var border_mod = "2px solid ";//+color
    var background_mod = "rgba(214, 188, 136, 0.85) url('https://images.wikia.nocookie.net/__cb20141205133613/lotrminecraftmod/images/d/d1/Mod.png') bottom center no-repeat";
    var mods = [
        //Ajouter des mods si besoin sous le format
        {name: "Elatorulian", color:"#04B4AE"}
    ];
 
    var background_tempmod = "rgba(205, 192, 176, 0.66) url('https://vignette.wikia.nocookie.net/lotrminecraftmod/images/b/b2/Temp_mod_tag_3.png/revision/latest?cb=20150605193955') bottom center no-repeat";
    var tempmods = [
        //Ajouter des mods temporaires si besoin sous le format
        //{name: "User_Name", color:"#colorcode"}
    ];
 
    function get_filter(profile) {
        return eval("(function() {return $(this).has(\"a[href$=':"+profile.name+"']\").length;})");
    }
 
    var avatars = $('.speech-bubble-avatar');
 
    (function(){
        var mevans = {name: "LOTRMod", color:"#B55A15"};
        avatars.filter(get_filter(mevans)).next().css({
            background: "rgb(216, 180, 88) url('https://images.wikia.nocookie.net/__cb20141225003527/lotrminecraftmod/images/thumb/4/4e/Modcreator.png/250px-Modcreator.png') bottom center no-repeat",
            padding: '10px',
            border: border_admin+mevans.color
        });
        avatars.filter(get_filter(mevans)).next().addClass('admin');
    })();
 
    var i;
    for (i in admins) {
        var admin = admins[i];
        avatars.filter(get_filter(admin)).next().css({
            background: background_admin,
            padding: '10px',
            border: border_admin+admin.color
        });
        avatars.filter(get_filter(admin)).next().addClass('admin');
    }
    for (i in mods) {
        var mod = mods[i];
        avatars.filter(get_filter(mod)).next().css({
            background: background_mod,
            padding: '10px',
            border: border_mod+mod.color
        });
        avatars.filter(get_filter(mod)).next().addClass('mod');
    }
    for (i in tempmods) {
        var tempmod = tempmods[i];
        avatars.filter(get_filter(tempmod)).next().css({
            background: background_tempmod,
            padding: '10px',
        });
        avatars.filter(get_filter(tempmod)).next().addClass('tempmod');
    }
})();
 
// OTHER CODE //
 
/* Makes all quotes collapsible by default, excluding the first line.
 */
var quote = $('.quote:not(.customquote)');
quote.addClass("mw-collapsible mw-collapsed");
quote.each(function() {
    $(this).html(
        $(this).html().replace(
            /^(.* wrote:(?:\n|<br>))([\s\S]*)$/m,
            // [\s\S] = whitespace or non-whitespace = match all ~= [.\n]
            '$1<span class="mw-collapsible-content">$2</span>'
        )
    );
});
 
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
 
 
// EXTERNAL SCRIPTS
importArticles({
    type: "script",
    articles: [
        // File Deletion
        "u:dev:ListFiles/code.js",
        "u:dev:AjaxBatchDelete/code.2.js",
        // AJAX Recent Changes Refresh
        "w:c:dev:AjaxRC/code.js"
    ]
});
 
/* Ajax-refresh button config options */
ajaxPages = ["Special:Contributions","Special:Log","Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:AbuseLog"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
// Pre-sorted tables
// Any sortable table with the class "sorted" will be presorted by
// its first column, descending
$(function() {
    setTimeout(function() {
        $("table.article-table.sortable.sorted .headerSort:first-child").click();
    }, 0);
});
 
// Shuffle servers
if(mw.config.get('wgPageName') == 'Servers'){
    var $servers = $("#lotr-serverlist > tbody > tr");
    var count = $servers.length;
    var rows = [];
    for(var i = 1; i <= count; i++){
        $servers.eq(i).attr("id", i);
        rows.push(i);
    }
    var randrows = rows;
    randrows.sort(function() { return 0.5 - Math.random(); });
    for(var i = 1; i <= count; i++){
        if(randrows[i] != i){
            $("#"+i).insertBefore($("#"+randrows[i]));
        }
    }
}
 
/* This script adds "&format=original" to the end of Wikia image addresses in articles to load the original PNG/JPG etc. forms instead of the WEBP versions.  Excludes avatars & sprites such as the edit pencil, and only applies to article content. */
//Infobox images
$(".pi-image-thumbnail").each(function(){ 
    var srcsetvar = $(this).attr("srcset");
    var srcarray = srcsetvar.split(" ");
    $(this).attr("srcset", srcarray[0]+"&format=original");
});
//Article images
$(".WikiaArticle img:not('.avatar, .sprite, .forum-user-avatar, .wds-avatar__image')").each(function(){
    var srcvar = $(this).attr("src");
    if(srcvar && !srcvar.endsWith("&format=original") && (srcvar.startsWith("https://vignette.wikia.nocookie.net") || srcvar.startsWith("https://images.wikia.nocookie.net"))){
        $(this).attr("src", srcvar+"&format=original");
    }
});
 
//lzyLoaded
$(".WikiaArticle img:not('.avatar, .sprite, .forum-user-avatar, .wds-avatar__image')").on("load", function(){
    var srcvar = $(this).attr("src");
    if(srcvar && !srcvar.endsWith("&format=original") && (srcvar.startsWith("https://vignette.wikia.nocookie.net") || srcvar.startsWith("https://images.wikia.nocookie.net"))){
        $(this).attr("src", srcvar+"&format=original");
    }
});