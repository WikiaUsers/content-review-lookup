/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
 
$(function() {
    var rights = {};
 
    rights["Darthwikia"]   = ["Founder", "Inactive"],
 
    rights["Kerrawesome"]            = ["Owner", "Emperor"];
 
    rights["Dragonballgtgoku"]        = ["Sith Lord", "Inactive"];

    rights["JustAnIng"]        = ["Owner", "Sith Lord"];
   
    rights["ILikeTrains"]        = ["Coder", "Inactive"];
 
    if (typeof rights[wgTitle] != "undefined") {
 
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
 
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});
 
window.MessageWallUserTags = {
    tagColor: '#e500e5',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Darthwikia': 'Founder',
        'Kerrawesome': 'Bureaucrat',
        'JustAnIng': 'Bureaucrat',
        'Dragonballgtgoku': 'Inactive',
        'ILikeTrains': 'Coder',
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});