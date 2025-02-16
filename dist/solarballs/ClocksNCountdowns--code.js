(function ($) {
    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    'use strict';

    var countdowns = [];
    var categorized = false; // Flag to track if the page is already categorized
    var userGroupsLogged = false; // Flag to track if the groups have been logged
    var permissionLogged = false; // Flag to ensure permission log is printed only once
    // Create an instance of the MediaWiki API
    var api = new mw.Api();

        // Check if the user has permission to categorize
function userHasPermission() {
    var userGroups = mw.config.get('wgUserGroups');

    // Log user groups only once
    if (!userGroupsLogged) {
        console.log('User groups:', userGroups);
        userGroupsLogged = true;
    }

    var allowedGroups = ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator'];
    var hasPermission = userGroups.some(function (group) {
        return allowedGroups.includes(group);
    });

    if (!hasPermission && !permissionLogged) {
        console.log('User does not have the required permissions for categorization.');
        permissionLogged = true;
    }

    return hasPermission;
}

// Function to add a category to the page
function addCategory(categoryName) {
    if (categorized) {
        console.log('Categorization already done, skipping.');
        return;
    }

    categorized = true; // Mark as categorized

    api.get({
        action: 'query',
        titles: mw.config.get('wgPageName'),
        prop: 'categories|revisions',
        rvprop: 'content', // Fetch the content of the page
        cllimit: 'max'
    }).done(function (data) {
        var pages = data.query.pages;
        var page = Object.values(pages)[0];

        var content = page.revisions[0]['*']; // Get the content of the page
        var hasCategory = page.categories && page.categories.some(function (cat) {
            return cat.title === 'Category:' + categoryName;
        });

        if (!hasCategory) {
            // Escape the category name for regex
            var escapedCat = escapeRegExp(categoryName);
            var sRegEx = '\[\[' + 'Category' + ':' + escapedCat + '\]\]';
            var regex = new RegExp(sRegEx, 'g'); // Use global flag to ensure it's properly checked

            // Check if the namespace is 10 (Template namespace)
            var namespace = mw.config.get('wgNamespaceNumber');
            if (namespace === 10) {
                var noincludeTagExists = /<noinclude>/i.test(content);
                
                if (noincludeTagExists) {
                    // Find the position of the closing </noinclude> and insert below it
                    var noincludeIndex = content.indexOf('<noinclude>');
                    var closingTagIndex = content.indexOf('</noinclude>', noincludeIndex);
                    
                    // Ensure the category is inserted below the existing <noinclude> tag
                    var newContent = content.slice(0, closingTagIndex) + "\n" + sRegEx + content.slice(closingTagIndex);

                    // Update the page content
                    api.postWithEditToken({
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        text: newContent,
                        summary: 'Automatically categorized as ' + categoryName
                    }).done(function () {
                        console.log('Page successfully categorized as ' + categoryName);
                    }).fail(function (error) {
                        console.error('Error categorizing page:', error);
                        categorized = false; // Reset on failure to allow retry
                    });
                } else {
                    // If no <noinclude> exists, create one and append the category
                    sRegEx = '<noinclude>' + sRegEx + '</noinclude>';
                    api.postWithEditToken({
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        appendtext: sRegEx,
                        summary: 'Automatically categorized as ' + categoryName
                    }).done(function () {
                        console.log('Page successfully categorized as ' + categoryName);
                    }).fail(function (error) {
                        console.error('Error categorizing page:', error);
                        categorized = false; // Reset on failure to allow retry
                    });
                }
            } else {
                // Append the category normally if it's not in the Template namespace
                api.postWithEditToken({
                    action: 'edit',
                    title: mw.config.get('wgPageName'),
                    appendtext: sRegEx,
                    summary: 'Automatically categorized as ' + categoryName
                }).done(function () {
                    console.log('Page successfully categorized as ' + categoryName);
                }).fail(function (error) {
                    console.error('Error categorizing page:', error);
                    categorized = false; // Reset on failure to allow retry
                });
            }
        } else {
            console.log('Page already has the category ' + categoryName + ', skipping.');
        }
    }).fail(function (error) {
        console.error('Error checking categories:', error);
        categorized = false; // Reset on error to allow retry
    });
}

// Function to remove a category from the page
function removeCategory(categoryName) {

    api.get({
        action: 'query',
        titles: mw.config.get('wgPageName'),
        prop: 'categories',
        cllimit: 'max'
    }).done(function (data) {
        var pages = data.query.pages;
        var page = Object.values(pages)[0];

        if (page.categories) {
            var categoryText = page.categories.map(function (cat) {
                return cat.title;
            });

            var categoryToRemove = 'Category:' + categoryName;

            // Check if the category exists in the list of categories
            if (categoryText.indexOf(categoryToRemove) !== -1) {
                var cSens = true; // Assuming case-sensitive removal, or adjust based on user settings
                var flags = 'g' + (cSens ? '' : 'i');
                var escapedCat = escapeRegExp(categoryName);
                var categoryNamespaceGroup = '(Category)';
                var sRegEx = '\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\]\\]|\\[\\[' + categoryNamespaceGroup + ':' + escapedCat + '\\|.*?\\]\\]';
                var regex = new RegExp(sRegEx, flags);

                api.get({
                    action: 'query',
                    titles: mw.config.get('wgPageName'),
                    prop: 'revisions',
                    rvprop: 'content'
                }).done(function (data) {
                    var revision = Object.values(data.query.pages)[0].revisions[0]['*'];
                    var newContent = revision.replace(regex, ''); // Remove the category text

                    // Post the updated content to remove the category
                    api.postWithEditToken({
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        text: newContent,
                        summary: 'Removed category ' + categoryName
                    }).done(function () {
                        console.log('Category ' + categoryName + ' removed successfully.');
                    }).fail(function (error) {
                        console.error('Error removing category:', error);
                    });
                }).fail(function (error) {
                    console.error('Error fetching page content:', error);
                });
            } else {
                console.log('Category ' + categoryName + ' not found, skipping removal.');
            }
        }
    }).fail(function (error) {
        console.error('Error checking categories:', error);
    });
}

// Helper function to escape regex characters
function escapeRegExp(str) {
    return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}

// Function to manage categorization based on page status. Only the allowed groups can categorize
function categorizePage(pageStatus) {
    if (userHasPermission()) {
        if (!categorized) {
            if (pageStatus === 'updated') {
                removeCategory('Outdated articles');
                addCategory('Updated articles');
            } else if (pageStatus === 'outdated') {
                removeCategory('Updated articles');
                addCategory('Outdated articles');
            }
        }
    } else {
        // Log message if user doesn't have permission
        if (!permissionLogged) {
            console.log('User does not have the required permissions for categorization.');
            permissionLogged = true;
        }
    }
}

// Function to show the appropriate page status message or status
function showPageStatus($this, pageStatus) {
    var updatedMessage = $this.find('.pagestatusmsg[data-for-status="updated"]');
    var outdatedMessage = $this.find('.pagestatusmsg[data-for-status="outdated"]');
    var endDateContent = $this.find('.endDate');

    // Set default value of data-add-category to 'false' if it's not already set
    if ($this.attr('data-add-category') === undefined) {
        $this.attr('data-add-category', 'false');
    }

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
            endDateContent.css('display', 'inline');
        }
    } else {
        if (pageStatus === "updated") {
            $this.text("Updated");
        } else if (pageStatus === "outdated") {
            $this.text("Outdated");
        } else {
            endDateContent.css('display', 'inline');
        }
    }

    // Only call categorizePage if data-add-category is not false and is not categorized yet and it's the first endDate span or div
    if ($this.attr('data-add-category') !== 'false' && !categorized) {
        var firstEndDate = $('#content .endDate[data-add-category="true"]').first();
        if ($this.is(firstEndDate)) {
            categorizePage(pageStatus);  // Call categorization function
        }
    }
}


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


    function getPageContent(title) {
        return api.get({
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content',
            formatversion: 2
        }).then(function (data) {
            var pages = data.query.pages;
            return pages[0]?.revisions?.[0]?.content || "";
        });
    }

    function updateEndDate() {
        $('.endDate').each(function () {
            var $this = $(this);
            var startDateText = $this.attr('data-start-date');
            var countdownToSeconds = parseInt($this.attr('data-countdown-to')) || 0;
            var revisionTimestamp = parseInt($this.attr('data-revision-timestamp')) || 0;
            var pageStatus = $this.attr('data-page-status') === "true";
            var regexPattern = $this.attr('data-regex');
            var startDate = new Date(startDateText);

            if (isNaN(startDate)) {
                $this.text("Invalid start date!");
                return;
            }

            var nextEndDate = calculateNextEndDate(startDate, countdownToSeconds);
            var adjustedStartDate = new Date(nextEndDate.getTime() - (countdownToSeconds * 1000));

            if (pageStatus && revisionTimestamp) {
                var pageTitle = mw.config.get('wgPageName');

                getPageContent(pageTitle).then(function (pageContent) {
                    if (!regexPattern) {
                        console.warn("No regex pattern provided.");
                        return;
                    }

                    var regex = new RegExp(regexPattern, "i");
                    var match = pageContent.match(regex);
                    var currentMatch = match ? match[0] : "";
                    var storedMatch = $this.attr('data-last-match');

                    var newPageStatus;
                    if (revisionTimestamp < Math.floor(adjustedStartDate.getTime() / 1000)) {
                        newPageStatus = "outdated";
                    } else if (revisionTimestamp >= Math.floor(adjustedStartDate.getTime() / 1000) && revisionTimestamp < Math.floor(nextEndDate.getTime() / 1000)) {
                        newPageStatus = (storedMatch && storedMatch !== currentMatch) ? "updated" : "";
                    } else {
                        $this.text(formatDateUTC(nextEndDate, false));
                        newPageStatus = "";
                    }

                    // Store the latest regex match for comparison
                    $this.attr('data-last-match', currentMatch);

                    // If status changes, reset the flag
                    if ($this.attr('data-last-status') !== newPageStatus) {
                        categorized = false;
                        $this.attr('data-last-status', newPageStatus);
                    }

                    showPageStatus($this, newPageStatus);
                });
            } else {
                $this.text(formatDateUTC(nextEndDate, false));
                showPageStatus($this, "");
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

    });

}(jQuery));