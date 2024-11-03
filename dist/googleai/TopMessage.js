mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.storage'], function () {
    // Check user rights
    mw.user.getGroups().then(function(groups) {
        // Check if the message was dismissed
        var dismissedMessage = mw.storage.get('DevMessageDismissed');

        // Check if user belongs to certain groups and hasn't dismissed the message
        if (!dismissedMessage || mw.config.get('wgPageName') === 'Template:Top') {
            // Fetch the template content using the MediaWiki API
            $.ajax({
                url: mw.util.wikiScript('api'),
                method: 'GET',
                data: {
                    action: 'parse',
                    page: 'Template:Top', // Replace with your template name
                    format: 'json',
                    disablepp: true
                },
                dataType: 'json',
                success: function(data) {
                    if (data.parse && data.parse.text) {
                        // Create a new div element with the template content and style it
                        var DevMessage = $('<div>').html(data.parse.text['*']).css({
                            'color': 'var(--theme-text-color--secondary)',
                            'background-color': 'var(--theme-page-background-color--secondary)', // Set background color
                            'padding': '10px',            // Add padding
                            'border': '2px solid var(--theme-link-color--secondary)',    // Add a border
                            'border-radius': '8px',       // Add border radius for rounded corners
                            'text-align': 'center',       // Center the text
                            'position': 'relative'        // Set position to relative for the close button
                        });

                        // Create the "x" button for closing the message
                        var closeButton = $('<span>').text('x').css({
                            'position': 'absolute',
                            'top': '5px',
                            'right': '10px',
                            'cursor': 'pointer',
                            'color': 'var(--theme-link-color--secondary)',
                            'font-weight': 'bold',
                            'font-size': '16px'
                        }).attr('title', 'Click to close this message permanently.');

                        // Append the close button to the DevMessage
                        DevMessage.append(closeButton);

                        // Append the new div to the page content
                        $('#mw-content-text').prepend(DevMessage);

                        // Add click event to close the message and save dismissal state
                        closeButton.on('click', function() {
                            DevMessage.remove();
                            mw.storage.set('DevMessageDismissed', 'true');
                        });
                    }
                },
                error: function() {
                    console.error('Failed to fetch the template.');
                }
            });
        }
    });
});