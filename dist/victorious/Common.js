/* To replace the now dead "welcome bot" */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:Default Profile}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};

/* prevents existing tags from being hidden */
(window.dev = window.dev || {}).profileTags = { noHideTags: true };