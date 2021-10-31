/* Any JavaScript here will be loaded for all users on every page load. */

/* siteSub */
$(function() {
	if (mw.config.get('wgIsMainPage') || mw.config.get('wgNamespaceNumber') === -1) return;
var siteSub = document.createElement('div'); 
var siteSubReplace = document.querySelector('.mw-parser-output .siteSubReplace');
siteSub.id = 'siteSub';
siteSub.className = 'noprint'; 
if (siteSubReplace){
	siteSub.innerHTML = siteSubReplace.innerHTML;
} else {
	siteSub.innerHTML = 'From the ' + mw.config.get( 'wgSiteName' ) + ', the <i>Kapatid</i> encyclopedia';
}
document.getElementsByClassName('page-header__title-wrapper')[0].append(siteSub);
}());

/* Custom block message send with dev script MessageBlock */
window.MessageBlock = {
  title : 'Blocked',
  message : 'You have violated the TV5 Wiki policy. As a preventative measure, you have been blocked from editing for $2 due to $1. If you believe this block is unjustified or that there has been a mistake, you may contest this this block on my wall on Community Central.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

/* User profile header custom tags */
window.UserTagsJS = {
modules: {},
tags: {
sysop: { link:'Project:Administrators' },
rollback: { link:'Project:Rollback' }
}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];