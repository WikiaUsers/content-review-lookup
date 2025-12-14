$(function() {
    if (mw.config.get('wgUserName')) {  // Check if user is logged in
        // Show content for logged-in users
        $('#loggedin-content').show();
    } else {
        // Hide content for logged-out users
        $('#loggedin-content').hide();
    }
});