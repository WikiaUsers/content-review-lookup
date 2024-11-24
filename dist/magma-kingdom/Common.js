window.lockOldComments = (window.lockOldComments || {});

// Set the lock limit to 100 days
window.lockOldComments.limit = 100;

// Enable the custom note above locked comments
window.lockOldComments.addNoteAbove = true;

// Customize the note text
window.lockOldComments.noteText = "This Comment was Posted 100 days ago... You No Life User cant Reply....";

// Restrict posting in "Announcements" category to admins only
$(function () {
    if (mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgCanonicalSpecialPageName') === 'DiscussionForum') {
        var categoryId = "4400000000000006249"; // Replace with your Announcements category ID
        var isAdmin = mw.config.get('wgUserGroups').includes('sysop');

        // Check if user is viewing or trying to post in the Announcements category
        if (mw.util.getParamValue('catId') === categoryId) {
            if (!isAdmin) {
                // Hide "New Post" and Reply buttons for non-admins
                $('.wds-button, .reply-body').remove();
                $('.new-post-placeholder').text('Only admins can post or reply here.');
            }
        }
    }
});