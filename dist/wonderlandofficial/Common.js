$(function() {
    // Function to check if the notice should be displayed
    function shouldDisplayNotice() {
        // Retrieve the timestamp of when the notice was last closed
        var lastClosed = localStorage.getItem('sideNoticeClosedAt');
        if (lastClosed) {
            // Check if 5 hours have passed since the notice was closed
            var now = new Date().getTime();
            var elapsed = now - parseInt(lastClosed, 10);
            var fiveHoursInMs = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
            if (elapsed < fiveHoursInMs) {
                return false; // Don't display the notice
            }
        }
        return true; // Display the notice
    }

    // Create a container for the side notice
    var sideNotice = $('<div>', {
        id: 'sideNotice',
        css: {
            'position': 'fixed',
            'bottom': '50px',
            'left': '70px',
            'width': '300px', // Adjust width if needed
            'background-color': '#060e1c', // Updated background color
            'border': '2px solid #571C8B', // Border color
            'padding': '10px',
            'z-index': '1000',
            'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
            'border-radius': '8px',
            'font-size': '14px', // Make text a little smaller
            'color': '#FFFFFF' // Updated text color to white
        }
    });

    // Add content to the side notice
    sideNotice.append('<h2 style="font-size: 16px; margin: 0; color: #FFFFFF;">Wonderland Wiki</h2>'); // Updated title color to white
    sideNotice.append('<p>Hi there, Visit <a href="/wiki/Wonder_Activities" style="color: #FFD700; text-decoration: underline;">Wonder Actives</a> to find out what to do on the wiki.</p>'); // Updated text color to white and link color to yellow

    // Add a close button
    var closeButton = $('<span>', {
        text: '×',
        css: {
            'position': 'absolute',
            'top': '5px',
            'right': '10px',
            'cursor': 'pointer',
            'font-weight': 'bold',
            'font-size': '16px',
            'color': '#FFFFFF' // Updated close button color to white
        }
    });

    closeButton.on('click', function() {
        // Save the timestamp when the notice is closed
        localStorage.setItem('sideNoticeClosedAt', new Date().getTime());
        sideNotice.fadeOut();
    });

    sideNotice.append(closeButton);

    // Add the side notice to the body if it should be displayed
    if (shouldDisplayNotice()) {
        $('body').append(sideNotice);
    }

    // Add hover effect for the links
    $('#sideNotice a').hover(
        function() {
            $(this).css('color', '#FFC107'); // Change to a lighter yellow on hover
        },
        function() {
            $(this).css('color', '#FFD700'); // Change back to original yellow when not hovered
        }
    );
});