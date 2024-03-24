/* Any JavaScript here will be loaded for all users on every page load. */
window.MessageBlock = {
	title: 'Blocked',
	message: 'You have been blocked, check your profile activity for more information'
};
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.noinclude = ['.infobox'];