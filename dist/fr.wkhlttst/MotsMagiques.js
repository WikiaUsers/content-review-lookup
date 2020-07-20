var pageContent = $('.ns-0 #mw-content-text').html(); 
function motsMagiques () {
    if(pageContent.match(/_NORAIL_/g)) {
        $('.WikiaMainContentContainer').css('margin-right', 0).css('opacity', 0);
        $('.WikiaRail').hide();
    }
    if(pageContent.match(/_NOHEADER_/g)) {
        $('.WikiaMainContentContainer').css('margin-right', 0).css('opacity', 0);
        $('.WikiHeader').hide();
    }
    setTimeout(function() {
        $('.WikiaMainContentContainer').css('opacity', 1);
    }, 300);
}
$(function() {
	motsMagiques();
});