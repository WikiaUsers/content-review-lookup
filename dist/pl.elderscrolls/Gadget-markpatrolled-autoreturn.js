/** Autoreturn after marking changes as patrolled ****************************************************** 
 *
 *  Description: If the current page is the final page in the patrol loop, then autoreturn to
 *               recent changes, and filter it for more unpatrolled changes
 *               Only Monobook of the skins are supported, and only Firefox of the various browsers are tested.
 *  Maintainers: [[User:Jeblad]]
 */
 
// the actual action to take
function mpAutoreturnTimer () {
    history.go(-2);
    //document.location = wgServer + wgScript + '?title=Special:RecentChanges&hidepatrolled=1';
}

// test for correct page, and then prepare for autoreturn to recent changes
if (/\b(action=markpatrolled)\b/.test(document.location) && /\b(rcid)\b/.test(document.location)) {
 
//    $( function () {
        try {
            // we have patrolled a contribution, we wait for a few seconds and then leap back
            //setTimeout("mpAutoreturnTimer()", 100);
            history.go(-2);
        }
        catch (e) {
            // just go away without notice 
        }
//    });

}