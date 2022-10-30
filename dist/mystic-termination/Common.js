/* Begin */
// This should change how long old comment threads will be locked
// We don't want necrobumps!
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 30; // Set it for a month

// Profile tags should not override default tags
window.dev = window.dev || {};
window.dev.profileTags = {noHideTags: true};