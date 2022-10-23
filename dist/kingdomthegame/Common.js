/* Any JavaScript here will be loaded for all users on every page load. */

// dev:LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
window.lockOldComments.addNoteAbove = true;

// dev:ProfileTags - prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// dev:ReferencePopups - enable lockdown mode (remove configuration link from the bottom)
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;