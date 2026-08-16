/**
 * MediaWiki:Follow/code.js
 * Adds a follow button to userpages and displays a notification banner on click.
 */
 author: RomanescoGAG
(function ($, mw) {
    'use strict';

    // Target namespace 2 is 'User' and namespace 3 is 'User_talk'
    var ns = mw.config.get('wgNamespaceNumber');
    if (ns !== 2 && ns !== 3) {
        return;
    }

    // Get the target username from the page title
    var targetUser = mw.config.get('wgTitle').split('/')[0];
    // Get the current logged-in user
    var currentUser = mw.config.get('wgUserName');

    // Prevent adding a follow button on your own userpage or if logged out
    if (!currentUser || targetUser === currentUser) {
        return;
    }

    $(document).ready(function () {
        // Create the follow button using OOUI elements for a native MediaWiki look
        var followButton = new OO.ui.ButtonWidget({
            label: 'Follow',
            flags: ['progressive'],
            icon: 'userAdd'
        });

        // SVG markup for custom notification icon (User icon with a smaller user icon)
        var customSvgIcon = '<svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24">' +
            '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#36c"/>' +
            '<path d="M19 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 1.5c-1.34 0-4 .67-4 2v1h8v-1c0-1.33-2.66-2-4-2z" fill="#36c"/>' +
            '</svg>';

        // Append button to the page actions or header entry point
        var $targetInjectionPoint = $('#p-views ul, #ca-watch');
        if ($targetInjectionPoint.length) {
            var $li = $('<li>').attr('id', 'ca-follow').append(followButton.$element);
            $targetInjectionPoint.before($li);
        } else {
            // Fallback for skins without standard action tabs
            $('#firstHeading').append(followButton.$element.css({ 'float': 'right', 'font-size': 'initial' }));
        }

        // Handle the follow click action
        followButton.on('click', function () {
            // Construct the message banner content
            var $notificationMessage = $('<span>')
                .css({ 'display': 'flex', 'align-items': 'center', 'gap': '10px' })
                .append($(customSvgIcon).css({ 'width': '24px', 'height': '24px' }))
                .append($('<span>').text(currentUser + ' Is Now Following You!'));

            // Display native MediaWiki banner notification
            mw.notification.notify($notificationMessage, {
                autoHide: true,
                tag: 'user-follow-event'
            });

            // Toggle button state to show visual confirmation
            followButton.setDisabled(true);
            followButton.setLabel('Following');
            followButton.setIcon('userCheck');
        });
    });
}(jQuery, mediaWiki));