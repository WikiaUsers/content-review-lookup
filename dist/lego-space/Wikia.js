/* Add Editcount tab on all user pages and user talk pages */
/* CODE BY TOAMEIKO // [[User:ToaMeiko]] */
$(function() {
    var wikiUrl = window.location.hostname;
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://" + wikiUrl + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

/* Add actual forum link to Wikia nav */
$(function() {
        $('.WikiHeader nav ul li.marked ul').append('<li class="subnav-2-item"><a class="subnav-2a" href="http://legospacewikiforums.forumotion.com/">Forum</a></li>');
});

/* 
** SPECIAL TAG FOR TOAMEIKO
** Please do not redistribute
**
** Used only because he rarely
** uses the admin rights, and
** when he does, it's exclusively
** for coding on the wiki
*/
if(wgPageName == "User:ToaMeiko" || wgPageName == "User_blog:ToaMeiko" || wgPageName == "Message_Wall:ToaMeiko" || wgPageName == "Special:Contributions/ToaMeiko") {
$('<span style="border-radius: 3px; background: #ccc; display: inline-block; margin-left: 10px; padding: 2px 5px; position: relative; text-transform: uppercase; top: -4px;">Master Coder</span><span style="border-radius: 3px; background: #ccc; display: inline-block; margin-left: 10px; padding: 2px 5px; position: relative; text-transform: uppercase; top: -4px;">Inactive</span>').insertAfter('span.tag');
}

/* Add contributions link to the user dropdown on the Wikia bar */
$(document).ready(function() {
    $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

/* Remove image attribution on picture thumbnails */
$('.picture-attribution').remove();

/* Namespace headers */
$('.ns-5 .WikiaPageHeader h1').prepend('LEGO Space Wiki ');
$('.ns-6 .WikiaPageHeader h1').prepend('File:');
$('.ns-7 .WikiaPageHeader h1').prepend('File ');
$('.ns-8 .WikiaPageHeader h1').prepend('MediaWiki:');
$('.ns-9 .WikiaPageHeader h1').prepend('MediaWiki ');
$('.ns-10 .WikiaPageHeader h1').prepend('Template:');
$('.ns-11 .WikiaPageHeader h1').prepend('Template ');
$('.ns-13 .WikiaPageHeader h1').prepend('Help ');
$('.ns-14 .WikiaPageHeader h1').prepend('Category:');
$('.ns-15 .WikiaPageHeader h1').prepend('Category ');

/* Moves and adds a CSS class to "Show changes since X" link on RC*/
$(function() {
    $('.rcoptions > div').addClass('rcoptionSCS').css('position','relative').insertAfter('.rcoptions hr');
});

/* Create a Blog Post quicklink */
$(document).ready(function() {
    $('<li><a href="/wiki/Special:CreateBlogPage" data-id="createblog">Create a Blog Post</a></li>').insertAfter('.contribute ul li:nth-of-type(3)');
});