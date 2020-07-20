/* Any JavaScript here will be loaded for all users on every page load.
   Some JavaScript is also located over at MediaWiki:Wikia.js. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */


/**
 * Changes user tags on mastheads
 * NOT meant to replicate userTags
 * Original author [[w:User:Rappy 4187]]
 * Modified for adding more tags + on special:contributions
 * 
 * http://community.wikia.com/wiki/Thread:825931#4
 */
$(function() {
    var rights = {};
 
    // Declare tags here:
    // rights['<usernamehere>'] = '<tagnamehere>'
    // For adding more than one, use an array: ['tag1', 'tag2', 'tag3'])
    rights['Sheepalicious McBigbutt'] = 'Mad Queen';
 
    var user = mw.config.get('wgTitle'),
        html = '';
 
    if (mw.config.get('wgTitle').indexOf('/') > -1) user = mw.config.get('wgTitle').split('/')[1];
    if ($('.UserProfileMasthead').length) {
        if ($.isArray(rights[user])) {
            for (var i in rights[user]) {
                html += '<span class="tag"' + (i != 0 ? ' style="margin-left: 5px;"' : '') + '>' + rights[user][i] + '</span>';
            }
        } else if (typeof rights[user] == 'string') {
            html = '<span class="tag">' + rights[user] + '</span>';
        } else {
            return false;
        }
        $('.UserProfileMasthead')
            .find('.tag')
            .remove()
            .end()
            .find('.masthead-info hgroup')
            .append(html)
            .end();
    }
});

/*  DisplayClock feature (appears above the "Contribute" button)  */
window.DisplayClockJS = '%{Sun;Mon;Tue;Wed;Thu;Fri;Sat}w %d %{Jan;Feb;Mar;Apr;May;June;July;Aug;Sep;Oct;Nov;Dec}m %Y, %2I:%2M:%2S %p (UTC)'
importArticles({
    type: 'script',
    articles: [
        //...
        'u:dev:DisplayClock/code.js',
        //...
    ]
});