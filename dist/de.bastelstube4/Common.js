//<pre>
// ============================================================
// displayTimer
// ============================================================
function addSocial() {
    $('#showSocial').empty().append('<div style="background: transparent;" class="fb-like-box" data-href="http://www.facebook.com/meerundmehr" data-width="298" data-show-faces="true" data-border-color="#F9ECC3"  data-stream="false" data-header="false"></div>');
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<div id="displaySocial" class="module" style="padding: 0;"><span id="showSocial"></span></div>').appendTo('.WikiaRail');
    else
        $('#p-personal ul').appendTo('<li><span id="showSocial"></span></li>');
    addSocial();
});
//</pre>

/*function FbLikeBox() {
    $('#ChatModule').empty().prepend('<div class="fb-like-box" data-href="http://www.facebook.com/meerundmehr" data-width="292" data-show-faces="true" data-border-color="#F9ECC3" data-stream="false" data-header="true"></div>');
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<div id="displaySocial" class="showSocial"><div class="fb-like-box" data-href="http://www.facebook.com/meerundmehr" data-width="292" data-show-faces="true" data-border-color="#F9ECC3" data-stream="false" data-header="true"></div></div>').appendTo('.ChatModule');
    else
        $('#p-personal ul').prepend('<li><span id="FbModule"></span></li>');
    FbLikeBox();
});
*/