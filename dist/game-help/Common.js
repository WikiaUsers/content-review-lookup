/* Any JavaScript here will be loaded for all users on every page load. */

/* Usertag overrides */
$(function() {
    var rights = {};
 
    rights["JustAnIng"]   = ["Admin", "WikiGnome"];
 
    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});

/* Message Wall Usertags */
window.MessageWallUserTags = {
    tagColor: 'maroon',
    glow: 'false',
    users: {
        'THFPVG': 'Founder',
        'JustAnIng': 'Admin',
        'Darthwikia': 'Admin',
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});