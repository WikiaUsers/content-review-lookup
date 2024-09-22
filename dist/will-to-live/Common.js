/* Any JavaScript here will be loaded for all users on every page load. */

/*░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░LinkPreview░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Feature:    https://dev.fandom.com/wiki/LinkPreview - Change of properties 
Desc:       Attempt to block LinkPreview when class .previewIgnore will be assigned to div or span
*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.iparents = ['.previewIgnore'];
window.pPreview.tlen = 0;