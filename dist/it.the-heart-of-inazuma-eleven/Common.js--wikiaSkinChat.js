/* Redirect non-wikia skin users to the correct link for Special:Chat */
/* Reindirizzamento degli utenti che non usano la skin Wikia al link  */
/* corretto da Speciale:Chat                                          */
/* Da http://runescape.wikia.com/                                     */
 
if(wgCanonicalSpecialPageName == 'Chat' && skin != 'oasis')
{
	window.location.search = window.location.search + (window.location.search? '&': '?') + 'useskin=oasis';
}
 
if(skin != 'oasis') {
        $(function() {
               $('#monobook-hide').css('display', 'none');
               $('.monobook-hide').css('display', 'none');
        });
}