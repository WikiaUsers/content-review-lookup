mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.storage'], function () {
    // Check user rights
    mw.user.getGroups().then(function(groups) {
        // Check if the message was dismissed
        var dismissedMessage = mw.storage.get('introMessageDismissed');
                // Get pagename and define allowed pages
    			//var allowedPages = ['*'];
				// var currentPage = mw.config.get('wgPageName');  

        // Check if user belongs to certain groups and hasn't dismissed the message
        if (!dismissedMessage && (groups.includes('*') || groups.includes('*'))) {
        	
        	// Check if it's an allowed page
        	//if (allowedPages.includes(currentPage)) 

            // Create the content of the message
            var test = '<h2>Hello!</h2>This wiki is not a private wiki; it is but a testing and storage wiki. I use it to store code I might need in the future and to test said code.';

            // Create a new div element with innerHTML as 'test' and style it
            var introMessage = $('<div>').html(test).css({
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

            // Append the close button to the introMessage
            introMessage.append(closeButton);

            // Append the new div to the page content
            $('#mw-content-text').prepend(introMessage);

            // Add click event to close the message and save dismissal state
            closeButton.on('click', function() {
                introMessage.remove();
                mw.storage.set('introMessageDismissed', 'true');
            });
        }
    });
});

//----------------------------------------------------------------------------------------------------//

//Remove all the random shit on Project:Medals that is not needed to operate the script and confuses users who think they have to edit the page code manually
mw.loader.using('mediawiki.util').then(function() {
    if (mw.config.get('wgNamespaceNumber') === 4 && mw.config.get('wgTitle') === "Medals") {
        mw.util.addCSS('.mw-content-ltr.mw-parser-output { display: none; }');
    }
});