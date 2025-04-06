/*========================================================================================
Retrieved from https://utaite.fandom.com/wiki/MediaWiki:Time%20ago.js
===========================================================================================*/
(function () {
    // Utility function to calculate "time ago"
    function timeAgo(input) {
        var timestamp = new Date(
            input.slice(0, 4),           // Year
            input.slice(4, 6) - 1,       // Month (0-indexed)
            input.slice(6, 8),           // Day
            input.slice(8, 10),          // Hour
            input.slice(10, 12),         // Minute
            input.slice(12, 14)          // Second
        );

        // Current UTC time
        var now = new Date();
        var utcNow = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );

        var diff = Math.floor((utcNow - timestamp) / 1000); // Difference in seconds

        // Determine time units
        if (diff < 60) return diff + " seconds ago";
        if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
        if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
        if (diff < 604800) return Math.floor(diff / 86400) + " days ago";
        if (diff < 2592000) return Math.floor(diff / 604800) + " weeks ago";
        if (diff < 31557600) return Math.floor(diff / 2592000) + " months ago";
        return Math.floor(diff / 31557600) + " years ago";
    }

    // Function to update all timestamps
    function updateAllTimeStamps() {
        var elements = document.querySelectorAll('.timeago');
        for (var i = 0; i < elements.length; i++) {
            var timestamp = elements[i].getAttribute('data-timestamp');
            if (timestamp) {
                elements[i].textContent = timeAgo(timestamp);
            }
        }
    }

    // Initial update
    updateAllTimeStamps();

    // Set up automatic updates
    setInterval(updateAllTimeStamps, 1000);

    // Optional: Update when new elements might be added to the page
    // Create a MutationObserver to watch for DOM changes
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                updateAllTimeStamps();
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
})();