window.DisplayClockJS = {
    format: '%H:%M:%S %d %b %Y (UTC)',
    location: 'header',
    interval: 1000,
    offset: 0
};

$(function () {
    setTimeout(function () {
        var clock = $('#UTCClock');
        if (!clock.length) return;
        var target =
            $('.fandom-community-header').first();
        if (target.length) {
            target.append(clock);
        }

    }, 1000);
});

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// allows to bypass the license check when uploading multiple files
mw.config.set('UMFBypassLicenseCheck', true);