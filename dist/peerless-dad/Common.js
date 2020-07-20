/* Any JavaScript here will be loaded for all users on every page load. */

/*s Block blogs not commented*/
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
    
};

/* Display arrow on back to top*/
window.BackToTopArrow = true;

/*Spoilers Alert display conf*/
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};