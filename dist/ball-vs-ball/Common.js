/* Any JavaScript here will be loaded for all users on every page load. */



mw.hook('wikipage.content').add(function ($content) {

    // Find app links
    $content.find('.app-link[data-url]').each(function () {

        var $el = $(this);
        var url = $el.attr('data-url');

        // Prevent processing the same element more than once
        if ($el.data('custom-protocol-processed')) {
            return;
        }

        // Only allow Roblox protocol links
        var allowedProtocols = /^roblox:\/\//i;

        // Stop if the URL is not an allowed protocol
        if (!allowedProtocols.test(url)) {
            return;
        }

        // Mark as processed
        $el.data('custom-protocol-processed', true);

        // Create the link
        var $link = $('<a>', {
            href: url,
            class: 'custom-protocol-link',
            rel: 'noopener noreferrer',
            title: 'This link will open Roblox outside of Fandom'
        });

        // Move the original content into the link
        $el.wrap($link);

        // Get the newly-created link
        var $newLink = $el.parent();

        // Add a visible external-app indicator
        $newLink.append(
            $('<span>', {
                class: 'custom-protocol-external-indicator',
                text: '',
                'aria-label': 'Opens outside Fandom'
            })
        );

        // Handle clicking the link
        $newLink.on('click', function (event) {

            // Stop the browser from immediately opening Roblox
            event.preventDefault();

            // Ask the user for confirmation
            var confirmed = window.confirm(
                'Open this link in Roblox?\n\n' +
                'You are about to leave Fandom and open the Roblox app.'
            );

            // Cancel = stay on Fandom
            if (!confirmed) {
                return;
            }

            // OK = open the Roblox protocol
            window.location.href = url;
        });
    });
});