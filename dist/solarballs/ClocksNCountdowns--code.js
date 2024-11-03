(function ($) {
    'use strict';

    var countdowns = [];

    // Function to format time into full month name and timestamp in UTC or Unix format
    function formatDateUTC(date, isUnix) {
        if (isUnix) {
            return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp
        }
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' };
        var formattedDate = date.toLocaleString('en-US', options);
        return formattedDate.replace(/ at /, ' '); // Remove "at"
    }

    // Function to calculate the next end date based on the start date and countdown duration
    function calculateNextEndDate(startDate, countdownToSeconds) {
        var now = new Date();
        var endDate = new Date(startDate);
        var addedTime = countdownToSeconds * 1000;

        // Continuously loop to find the next valid end date
        while (endDate <= now) {
            endDate = new Date(endDate.getTime() + addedTime);
        }

        return endDate;
    }

// Function to show the appropriate page status message or status
function showPageStatus($this, pageStatus) {
    var updatedMessage = $this.find('.pagestatusmsg[data-for-status="updated"]');
    var outdatedMessage = $this.find('.pagestatusmsg[data-for-status="outdated"]');
    var endDateContent = $this.find('.endDate');

    // If custom status messages exist, handle them first
    if (updatedMessage.length > 0 || outdatedMessage.length > 0) {
        if (pageStatus === "updated") {
            updatedMessage.css('display', 'inline');
            outdatedMessage.css('display', 'none');
            endDateContent.css('display', 'none');
        } else if (pageStatus === "outdated") {
            outdatedMessage.css('display', 'inline');
            updatedMessage.css('display', 'none');
            endDateContent.css('display', 'none');
        } else {
            // If no valid status, show end date
            endDateContent.css('display', 'inline');
        }
    } else {
        // No custom messages, check the page status and display accordingly
        if (pageStatus === "updated") {
            $this.text("Updated");
        } else if (pageStatus === "outdated") {
            $this.text("Outdated");
        } else {
            // Default to showing end date if no status is specified
            endDateContent.css('display', 'inline');
        }
    }
}

    // Function to update the endDate elements
    function updateEndDate() {
        $('.endDate').each(function () {
            var $this = $(this);
            var startDateText = $this.attr('data-start-date');
            var countdownToSeconds = parseInt($this.attr('data-countdown-to')) || 0;
            var revisionTimestamp = parseInt($this.attr('data-revision-timestamp')) || 0;
            var pageStatus = $this.attr('data-page-status') === "true" ? true : false; // Check for page status
            var startDate = new Date(startDateText);

            // Check for valid date
            if (isNaN(startDate)) {
                $this.text("Invalid start date!");
                return;
            }

            var nextEndDate = calculateNextEndDate(startDate, countdownToSeconds);
            var adjustedStartDate = new Date(nextEndDate.getTime() - (countdownToSeconds * 1000));

            // Determine output
            if (pageStatus && revisionTimestamp) {
                if (revisionTimestamp < Math.floor(adjustedStartDate.getTime() / 1000)) {
                    showPageStatus($this, "outdated");
                } else if (revisionTimestamp >= Math.floor(adjustedStartDate.getTime() / 1000) && revisionTimestamp < Math.floor(nextEndDate.getTime() / 1000)) {
                    showPageStatus($this, "updated");
                } else {
                    $this.text(formatDateUTC(nextEndDate, false));
                    showPageStatus($this, ""); // Default end date
                }
            } else {
                $this.text(formatDateUTC(nextEndDate, false));
                showPageStatus($this, ""); // Default behavior
            }
        });
    }

    // Function to update the clock and countdown every second
function updateTime() {
    var now = new Date(); // Get current time in UTC

    // Update clock
    $('.clock').each(function () {
        var $this = $(this);
        var addSeconds = parseInt($this.attr('data-add-time')) || 0;
        var adjustedTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() + addSeconds));
        var isUnix = $this.attr('data-unix') === "true"; // Check for Unix format
        $this.text(formatDateUTC(adjustedTime, isUnix)); // Use formatDateUTC for UTC output
    });

    // Update countdowns
    $.each(countdowns, function (i, countdown) {
        var diff = Math.floor((countdown.endDate - now.valueOf()) / 1000);

        if (diff <= -1) {
            // Check if the end date has changed
            var newEndDate = calculateNextEndDate(countdown.startDate, countdown.countdownToSeconds);
            if (newEndDate > now) {
                countdown.endDate = newEndDate; // Update the end date

                // Reset countdown display
                var totalSeconds = countdown.countdownToSeconds - 1;
                // Calculate days, hours, minutes, seconds from the total countdown time
                var days = Math.floor(totalSeconds / 86400);
                var hours = Math.floor((totalSeconds % 86400) / 3600);
                var minutes = Math.floor((totalSeconds % 3600) / 60);
                var seconds = totalSeconds % 60;

                // Check if the messages class exists
                var $messages = countdown.node.closest('.countdown2').find('.messages');
                if ($messages.length) {
                    // Construct the output with messages
                    var msgStart = $messages.data('msgstart');
                    var msgEnd = $messages.data('msgend');
                    var output = msgStart + ' ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ' + msgEnd;
                    countdown.node.text(output);
                } else {
                    // Output remaining time correctly without messages
                    var output = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
                    countdown.node.text(output);
                }
            } else {
                // Countdown has ended, show the post-countdown message
                countdown.node.text(''); // Clear the countdown text
                var $postMsg = countdown.node.siblings('.postcountdownmsg');
                $postMsg.css('display', 'inline'); // Show post countdown message
            }
        } else {
            // Calculate the countdown display while it's running
            var days = Math.floor(diff / 86400);
            var hours = Math.floor((diff % 86400) / 3600);
            var minutes = Math.floor((diff % 3600) / 60);
            var seconds = diff % 60;

            // Check if the messages class exists
            var $messages = countdown.node.closest('.countdown2').find('.messages');
            if ($messages.length) {
                // Construct the output with messages
                var msgStart = $messages.data('msgstart');
                var msgEnd = $messages.data('msgend');
                var output = msgStart + ' ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ' + msgEnd;
                countdown.node.text(output);
            } else {
                // Display remaining time correctly without messages
                var output = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
                countdown.node.text(output);
            }
        }
    });
    
    // Update the endDate elements
    updateEndDate();

    // Set the next update
    setTimeout(updateTime, 1000); // Schedule the next update every second
}

    // Initialize countdowns
    function initCountdowns($content) {
        var countdown = $content.find('.countdown2:not(.handled)');
        if (!countdown.length) return;

        countdown.css('display', 'inline').find('.countdowndate2').each(function () {
            var $this = $(this);

            // Handle endDate element
            var endDateElement = $this.find('.endDate');
            if (endDateElement.length) {
                var startDateText = endDateElement.attr('data-start-date') + ' UTC'; // Ensure UTC is used
                var countdownToSeconds = parseInt(endDateElement.attr('data-countdown-to')) || 0;
                var startDate = new Date(startDateText);
                var endDate = calculateNextEndDate(startDate, countdownToSeconds);

                countdowns.push({
                    node: $this,
                    startDate: startDate,
                    countdownToSeconds: countdownToSeconds,
                    endDate: endDate
                });
            } else {
                // Fallback if endDate is not used
                var date = new Date($this.text() + ' UTC').valueOf(); // Ensure UTC is used
                if (isNaN(date)) {
                    $this.text("Invalid date!");
                    return;
                }
                countdowns.push({
                    node: $this,
                    endDate: date,
                    countdownToSeconds: 0
                });
            }
        });
        countdown.addClass('handled');
    }

    // Initialization function for clock and countdowns
    function init() {
        initCountdowns($(document)); // Initialize countdowns
        updateTime(); // Start updating time
    }

    $(document).ready(init);
}(jQuery));