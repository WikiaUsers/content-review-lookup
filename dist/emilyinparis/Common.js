/* Any JavaScript here will be loaded for all users on every page load. */
/* To replace the now dead "welcome bot" */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:Default Profile}}',
        3: false
    },
    summary: 'Script: Creating user profile on first edit'
};