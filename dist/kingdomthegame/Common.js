/* Any JavaScript here will be loaded for all users on every page load. */

// dev:LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
window.lockOldComments.addNoteAbove = true;

// dev:ProfileTags - prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };