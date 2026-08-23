/* Any JavaScript here will be loaded for all users on every page load. 
For no na wiki */

/* DiscussionsRailModule activation */
window.discussionsModuleEmbed = true;

/* Check if the user is on the specific target article */
if (mw.config.get('wgPageName') === 'Superstitious_/_Falling_In_Love') {
    mw.hook('wikipage.content').add(function() {
        /* Target the sub-header element container */
        var subHeader = document.querySelector('.page-header__back-links') || document.querySelector('#contentSub');
        if (subHeader) {
            /* Rewrite the inner HTML to contain your two custom links */
            subHeader.innerHTML = '<a href="/wiki/Superstitious">&lt; Superstitious</a> | <a href="/wiki/Falling_In_Love">Falling In Love</a>';
        }
    });
}