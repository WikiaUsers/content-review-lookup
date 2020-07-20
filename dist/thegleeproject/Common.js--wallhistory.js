// View history for wall threads (code by Eladske)
 
function WallHistory() {
        if (wgCanonicalNamespace == 'Thread') {
                $('#WallBrickHeader').append('<a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button secondary" style="margin-left:10px; margin-right:10px; float: right;" id="History">View History</a>');
        }
        if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
                $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a href="/wiki/'+ wgPageName +'?action=history" class="wikia-button secondary" style="margin-left:10px; margin-right:10px;" id="History">View History</a></div>');
        }
}
addOnloadHook(WallHistory);