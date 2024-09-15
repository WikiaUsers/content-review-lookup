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
            'background-color': '#FFFFFF', // Background color
            'border': '2px solid #571C8B', // Border color
            'padding': '10px',
            'z-index': '1000',
            'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
            'border-radius': '8px',
            'font-size': '14px', // Make text a little smaller
            'color': '#000000' // Text color
        }
    });

    // Add content to the side notice
    sideNotice.append('<h2 style="font-size: 16px; margin: 0; color: #000000;">Wonderland Wiki</h2>'); // Title color
    sideNotice.append('<p>Check out <a href="/wiki/Level_Up_The_Wiki" style="color: #0076E1; text-decoration: underline;">Level Up The Wiki</a> and dive into editing! For ideas on what to do, visit <a href="/wiki/Wonder_Activities" style="color: #0076E1; text-decoration: underline;">Wonder Activities</a>.</p>'); // Link color

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
            'color': '#000000' // Close button color
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
            $(this).css('color', '#0056b3'); // Change to darker blue on hover
        },
        function() {
            $(this).css('color', '#0076E1'); // Change back to original color when not hovered
        }
    );
});