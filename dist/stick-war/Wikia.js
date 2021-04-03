// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

//InactiveUsers Script
InactiveUsers = { 
    months: 2,
    text: 'INACTIVE'
};
importScriptPage('InactiveUsers/code.js', 'dev');