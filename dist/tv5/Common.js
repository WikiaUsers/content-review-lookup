/* Any JavaScript here will be loaded for all users on every page load. */

/* siteSub */
$(function() {
var siteSub = document.createElement('div'); 
var siteSubReplace = document.querySelector('.mw-parser-output .siteSubReplace');
siteSub.id = 'siteSub';
siteSub.className = 'noprint'; 
if (siteSubReplace){
	siteSub.innerHTML = siteSubReplace.innerHTML;
} else {
	siteSub.innerHTML = `From ${mw.config.get( 'wgSiteName' )}`; 
}
document.getElementsByClassName('page-header__title-wrapper')[0].append(siteSub);
}());