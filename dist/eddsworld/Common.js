/* Any JavaScript here will be loaded for all users on every page load. */

/* Reference Popups (https://dev.fandom.com/wiki/ReferencePopups) */
 
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 50;
window.lockOldComments.addNoteAbove = true;