// <nowiki>

// Prevents existing tags from being hidden
window.dev.profileTags = { noHideTags: true };

// Insert Username Span JS
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});

/* BackToTop Button Config */
window.BackToTopModern = true;

/* LockOldComments Config - Prevents Necroposting */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 300;

// </nowiki>