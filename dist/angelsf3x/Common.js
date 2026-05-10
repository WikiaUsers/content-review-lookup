/* Any JavaScript here will be loaded for all users on every page load. */

// [[Module:CSS]] and [[Template:CSS]] //
mw.hook("wikipage.content").add(function() {
    $("span.import-css").each(function() {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
    });
});

// Username script //
(function() {
    if (mw.config.get('wgUserName') !== null) $('span.insertusername').text(mw.config.get('wgUserName'));
})();

// Main page buttons //
$(function() {

    $("#rules").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Rules", "_blank"); });
    $("#mos").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Manual_of_Style", "_blank"); });
    $("#copyrights").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Copyrights", "_blank"); });
    $("#userrights").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:User_Rights", "_blank"); });
    $("#mainpage").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_f3x", "_blank"); });
    $("#playgame").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#people").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:People", "_blank"); });
    $("#spinoffs").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Spinoff_Games", "_blank"); });
    $("#ranklist").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Rank_List", "_blank"); });
    $("#misc").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Misc_Articles", "_blank"); });
    $("#recentchanges").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:RecentChanges", "_blank"); });
    $("#newpages").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:NewPages", "_blank"); });
    $("#random").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:Random", "_blank"); });
    $("#upload").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:Upload", "_blank"); });
    $("#roblox").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#devblog").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/User_blog:Erlhender", "_blank"); });
    $("#cat-people").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:People", "_blank"); });
    $("#cat-spinoffs").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Spinoff_Games", "_blank"); });
    $("#cat-realangels").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#cat-ranklist").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Rank_List", "_blank"); });
    $("#cat-jokes").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Joke_Page", "_blank"); });
    $("#cat-misc").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Misc_Articles", "_blank"); });
    $("#company").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Company", "_blank"); });
    $("#show").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Show", "_blank"); });

});