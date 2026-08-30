window.DisplayClockJS = {
    format: '%I:%M:%S %p %2d <Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec> %Y (UTC)',
    location: 'header',
    interval: 500,
    offset: 0
};

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };