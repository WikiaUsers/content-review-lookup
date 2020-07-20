$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://minecraftcreepypasta.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});