mw.config.set('UMFBypassLicenseCheck', true);

/* Changes the Lock Old Blogs After 30 Days To A Chosen Amount */
window.LockOldBlogs = {
    expiryDays: 500,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* Spoiler Alert */
window.SpoilerAlert = {
    question: 'Greetings, Wizard!',
    yes: '<img src="https://images.wikia.nocookie.net/dragonvale/images/a/a5/Enter.png">',
    no: '<img src="https://images.wikia.nocookie.net/dragonvale/images/7/78/BigXIcon.png">',
    isSpoiler: function() {
        return Boolean($('.spoiler').length);
    }
};
/* End Spoiler Alert */