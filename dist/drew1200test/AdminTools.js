/*This page adds several tabs to userpages allowing administrators to quickly access many more useful tools that would otherwise take longer to access. This tool is only to be used by administrators. Violators will have it removed. 

** Written by Drew1200 
*/

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'><small>Editcount</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
    if( typeof sitename == "string" ) {
		address = "http://" sitename + ".wikia.com/wiki/Special:Editcount/" + wgTitle;
	}
});
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/index.php?title=Special%3AUserRights&user=" + wgTitle;
    var adds = "<li data-id='userrights'><a href='" + address + "'><small>Rights Management</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/wiki/Special:DeletedContributions/" + wgTitle;
    var adds = "<li data-id='deletedcontributions'><a href='" + address + "'><small>Deleted Contributions</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/wiki/Special:Log?user=" + wgTitle;
    var adds = "<li data-id='logs'><a href='" + address + "'><small>Logs</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/wiki/Special:Block/" + wgTitle;
    var adds = "<li data-id='block'><a href='" + address + "'><small>Block</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = wgServer + "/wiki/Special:Emailuser/" + wgTitle;
    var adds = "<li data-id='block'><a href='" + address + "'><small>Email</small></a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});