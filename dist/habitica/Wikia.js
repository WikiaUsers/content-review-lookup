/* Adds banner notification to pages in The Keep */
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 112) {
mw.hook('dev.banners').add(function(BannerNotification) {
    new BannerNotification("<span style='font-weight:bold'>Note: This page is in The Keep and is not part of the main wiki.</span> Pages in The Keep are usually unofficial, personal, and/or administrative pages. They may not be up-to-date or actively maintained, but generally do not need to be edited by unaffiliated users.", "notify").show();
});
}
});