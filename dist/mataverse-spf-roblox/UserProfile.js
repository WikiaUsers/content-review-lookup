$(function() {
    var userRights = {};
    var targetUserName = 'PROXIMIAZ'; // The user to whom you want to add the tag

    // Define the tags
    userRights[targetUserName] = ['Founder'];

    // Function to add the tag to the user profile masthead
    function addMastheadTag() {
        if (userRights[targetUserName]) {
            // Add the tag to the user profile masthead
            $('<span class="tag">' + userRights[targetUserName].join(', ') + '</span>')
                .appendTo('.user-identity-box .user-identity-header__attributes');
        }
    }

    // Run the function when the user profile page is loaded
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Contributions' && mw.config.get('wgRelevantUserName') === targetUserName) {
        addMastheadTag();
    } else if (mw.config.get('wgTitle').indexOf('User:' + targetUserName) === 0) {
        addMastheadTag();
    }
});