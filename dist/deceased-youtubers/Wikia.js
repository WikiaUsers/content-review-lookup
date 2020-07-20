// Change Button texts
$("#wpSave").attr("value", "Save Page");

$('ul.nav li.subnav-2-item a[data-canonical=random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main").text("Random YouTuber");

/*** Script Configurations ***/
/* AjaxRC */
window.ajaxPages = ["Special:WikiActivity", "Special:RecentChanges", "Special:Log", "Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Poll - Wikia Rail */
$(window).load(function() {
    var Poll = '<section class="module Poll"></section>';
    $('#RECIRCULATION_RAIL').before(Poll);
    $.getJSON('/api.php?action=parse&text={{Poll}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.Poll').append(addContent);
    });
});
 
$(document).ready(function() {
    var newSection = '<div id="footer">' + '</div>';
    $('.WikiaFooter section').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Footer}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('div#footer').append(code);
    });
});

$("span#youtubesearch").replaceWith('<div id="youtubesearch"><img src="https://vignette.wikia.nocookie.net/deadyoutubers/images/a/af/Youtube.png/revision/latest?cb=20200514042413" height="19" width="75"><form action="https://www.youtube.com/results" method="get" target="_blank"><input name="search_query" type="text" maxlength="128" /><select name="search_type"><option value="">Videos</option><option value="search_users">Channels</option></select><input type="submit" value="Search" /></form></div>');

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog has not been commented on for over <expiryDays> days. There is no need to comment, so it has been locked.",
    nonexpiryCategory: "Nonexpiry blogs",
    expiryCategories: []
};