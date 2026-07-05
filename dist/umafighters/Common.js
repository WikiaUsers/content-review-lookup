/* Staff Online Detector */
$(document).ready(function() {
    // Security to avoid script running on every single fucking page
    if ($('.staff-status').length === 0) return;

    $('.staff-status').each(function() {
        var $statusElement = $(this);
        var username = $statusElement.data('user');

        if (!username) return;

        // API Search
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            uclimit: 1,
            format: 'json'
        }, function(data) {
            if (data.query && data.query.usercontribs && data.query.usercontribs.length > 0) {
                var lastEditTime = new Date(data.query.usercontribs[0].timestamp);
                var currentTime = new Date();
                
                // Calculate difference in minutes
                var diffInMinutes = (currentTime - lastEditTime) / 1000 / 60;

                // 45 minutes, mark them Online
                if (diffInMinutes <= 45) {
                    $statusElement.html('Online 🟢').css('color', '#2ecc71');
                }
            }
        });
    });
});