/* Any JavaScript here will be loaded for all users on every page load. */


/****************
 * User Profile
 *
 * Tabs */
/* Add Sandbox Tab */
(function() {
    var $header = $('#WikiaUserPagesHeader');
    if ($header.exists()) {
        var title = 'User:' + $header.find('#UserProfileMasthead h1').text() + '/Sandbox';
        $header.find('.tabs-container .tabs').append(
            $('<li>', { 'data-id': 'sandbox' }).append(
                $('<a>', {
                    href: mw.util.getUrl(title),
                    title: title,
                    text: 'Sandbox'
                })
            )
        );
    }
}());