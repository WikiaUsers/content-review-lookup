/* To replace the now dead "welcome bot" */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:newuser}}',
        3: '{{sub'+'st:welcome}}',
        1202: false
    },
    summary: 'Script: Creating user+talkpage on first edit'
};

/* Personalised MA copyright notice */
$(function(){
	$('.license-description').append('See <a href="https://memory-alpha.fandom.com/wiki/Memory_Alpha:Copyrights">Memory Alpha\'s Copyright</a> information for full details.');
});

/* MA rail module for Ten Forward posts */
window.AddRailModule = [
    'Template:Ten Forward rail module'
];

/* Re-add proper namespace prefix to titles where it has been removed "by design" */
$('.ns-5 .page-header__title').prepend('Memory Alpha ');
$('.ns-6 .page-header__title').prepend('File:');
$('.ns-7 .page-header__title').prepend('File ');
$('.ns-8 .page-header__title').prepend('MediaWiki:');
$('.ns-9 .page-header__title').prepend('MediaWiki ');
$('.ns-10 .page-header__title').prepend('Template:');
$('.ns-11 .page-header__title').prepend('Template ');
$('.ns-13 .page-header__title').prepend('Help ');
$('.ns-14 .page-header__title').prepend('Category:');
$('.ns-15 .page-header__title').prepend('Category ');

/* Show 'Other Review Tools' in UCP RecentChanges by default
mw.hook('wikipage.content').add(function() {
	if (mw.cookie.get('rcfilters-toplinks-collapsed-state') === 'expanded') return;
	mw.cookie.set('rcfilters-toplinks-collapsed-state', 'expanded');
	$('.mw-recentchanges-toplinks .oo-ui-buttonElement-button').click();
});
*/