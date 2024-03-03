/* Any JavaScript here will be loaded for all users on every page load. */


/* LinkPreview */
window.pPreview = $.extend(true, window.pPreview, {	RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.ilinks = [new RegExp('^[A-Za-z_ ]*:[^\/\/][^\n]*$')];
window.pPreview.RegExp.iclasses = ['no-link-preview'];


/* ReadProgressBar */
window.enableReadProgressBarOnArticles = true;


/* Ripple */
/*window.ripplesConfig = {
	'normalRipples': document.querySelectorAll(''),
	'recenteredRipples': document.querySelectorAll(''),
	'unboundedRipples': document.querySelectorAll('')
};*/