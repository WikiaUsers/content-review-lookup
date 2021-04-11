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
/* ==============
   Trivia for FCD
   ============== */
 
    $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://fandomrewards.typeform.com/to/ETSo49Hw' style='width: 100%; height: 700px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });