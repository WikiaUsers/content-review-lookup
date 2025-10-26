/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */


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