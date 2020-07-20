/* Add extra tools to user profiles */
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log?user=" + wgTitle;
    var adds = "<li data-id='logs'><a href='" + address + "'><small>Logs</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    $(function() {
        var olds = $(".tabs-container > ul.tabs").html();
        var address = "/index.php?title=Special%3AUserRights&user=" + wgTitle;
        var adds = "<li data-id='userrights'><a href='" + address + "'><small>User Rights</small></a></li>";
        var news = olds + adds;
        $(".tabs-container > ul.tabs").html(news);
    });
    $(function() {
        var olds = $(".tabs-container > ul.tabs").html();
        var address = "/wiki/Special:DeletedContributions/" + wgTitle;
        var adds = "<li data-id='deletedcontributions'><a href='" + address + "'><small>Deleted Contributions</small></a></li>";
        var news = olds + adds;
        $(".tabs-container > ul.tabs").html(news);
    });
    $(function() {
        var olds = $(".tabs-container > ul.tabs").html();
        var address = "/wiki/Special:Block/" + wgTitle;
        var adds = "<li data-id='block'><a href='" + address + "'><small>Block</small></a></li>";
        var news = olds + adds;
        $(".tabs-container > ul.tabs").html(news);
    });
};