/* <nowiki> */

/**********************************************************/
/* JavaScript here is loaded for all users and all skins. */
/**********************************************************/

importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('CollapsibleEdittools/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide2/code.js', 'dev');

$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});

/* </nowiki> */