/* Any JavaScript here will be loaded for all users on every page load. */

/* -------------------------------------------------- */
/* -------- Profile creation ------------------------ */
/* -------------------------------------------------- */
/* 
Notes: This works with the dev import.
#2 is added to the user's profile page: Template:New user profile.
#3 is added to the user's talk page. (Not needed, since we use message walls.)
*/
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:New user profile}}',
        3: false
    },
    summary: 'Script: Creating user profile'
};

/* -------------------------------------------------- */