function fixBlogLinks() {
if (wgPageName == "Special:RecentChanges") $("#bodyContent ul.special li:contains('article-comments-rc-blog-comment')").each(function (i) {
oldHTML = $(this).html();
lnk = $(this).find("a:contains('hist')").attr("href");
if (typeof(lnk) != "undefined") {
rawID = lnk.replace(/.*curid=(.*?)&.*/,"$1");
bLink = "/wiki/User_blog:" + lnk.replace(/.*User_blog_comment:(.*?\/.*?)\/.*/,"$1") + "?showall=1#comm-" + rawID;
newHTML = oldHTML.replace("&lt;article-comments-rc-blog-comment&gt;","(<a href='" + bLink + "'>Blog comment</a>) ");
$(this).html(newHTML);
}
});
}
function fbl() {
fixBlogLinks();
$("#bodyContent").bind("ajaxPageLoad",fixBlogLinks);
}
addOnloadHook(fbl);