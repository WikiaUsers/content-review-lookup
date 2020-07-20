/*<pre><nowiki>*/
/**
 *
 * Custom preload templates for the new Wikia editor
 *
 * @author Grunny
 * @version 0.2
 *
 * For Template:Eras
 */
 
$(function() {
    $(".page-header__contribution").prepend($("#title-eraicons").attr( 'style', 'position: absolute; right: 0px;'))
});
if ($('.insert-random-article').length > 0) {
$(".WikiaMainContentContainer").load("/wiki/Special:Random .WikiaMainContentContainer");
}
if ( mw.config.get( 'wgPageName' ) === 'The_5th_Boy' ) {
    if(!window.location.hash) {
    $('.WikiaArticle').fadeOut(1000).load("/wiki/Template:The_5th_Boy .WikiaArticle").fadeIn(700);
    $(".category").remove();
    $("#title-eraicons").remove();
}
}
/*</nowiki></pre>*/