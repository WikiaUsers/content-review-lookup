/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/mastheadBoxes.js' /* Masthead ranks ~ EditedByOwnslo */
    ]
});
/* TEST CODE (If Break Delete IT)*/
$(function() {
    var userGroups = mw.config.get('wgUserGroups');
    var editCount = mw.config.get('wgUserEditCount');
    var badgeName = "Basic Badge";
    var badgeDesc = "Standard community member";
    var badgeIcon = "image_b752e7.png";
    if (userGroups.includes('bureaucrat')) {
        badgeName = "Bureaucrat";
        badgeDesc = "High-level site administrator";
    } else if (editCount >= 10000) {
        badgeName = "10000+ Edits";
        badgeDesc = "Legendary Contributor";
    } else if (editCount >= 5000) {
        badgeName = "5000+ Edits";
        badgeDesc = "Elite Editor";
    } else if (editCount >= 2000) {
        badgeName = "2000+ Edits";
        badgeDesc = "Master Editor";
    } else if (editCount >= 1000) {
        badgeName = "1000+ Edits";
        badgeDesc = "Veteran Editor";
    } else if (editCount >= 500) {
        badgeName = "500+ Edits";
        badgeDesc = "Experienced Editor";
    } else if (editCount >= 200) {
        badgeName = "200+ Edits";
        badgeDesc = "Active Contributor";
    } else if (editCount >= 100) {
        badgeName = "100+ Edits";
        badgeDesc = "Rising Star";
    } else if (editCount >= 1) {
        badgeName = "First Edit";
        badgeDesc = "Welcome to the community!";
    }
    var $badgeLink = $(mw.util.addPortletLink(
        'p-tb',
        '#',
        badgeName,
        't-badge',
        'Your current rank'
    ));
    if ($badgeLink) {
        $badgeLink.find('a').css('background-image', 'url(' + mw.util.getUrl('File:' + badgeIcon) + ')');
        $badgeLink.attr('data-tooltip', badgeDesc);
    }
});