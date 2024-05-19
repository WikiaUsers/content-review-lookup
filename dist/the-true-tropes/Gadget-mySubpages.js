/* This script adds a link saying "Subpages" to subpages of your user page.
   To use the script, add the following line to Special:MyPage/common.js:
 
importScript('User:PrimeHunter/My_subpages.js'); // Linkback: [[User:PrimeHunter/My subpages.js]]
 
*/
 
$( document ).ready( function() {
  mw.util.addPortletLink(
    'p-personal',
    mw.util.wikiGetlink( 'Special:PrefixIndex/User:' ) + mw.config.get( 'wgUserName' ) + '/',
    'Subpages',
    'pt-mysubpages',
    'Show your subpages',
    null,
    '#pt-preferences'
  );
});