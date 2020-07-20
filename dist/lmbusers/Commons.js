/* Any JavaScript here will be loaded for all users on every page load. */
// remove picture attribution on thumbnails
$('.picture-attribution').remove();

// editcount on profiles
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://meikotest.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

// DISPLAYTITLE
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');