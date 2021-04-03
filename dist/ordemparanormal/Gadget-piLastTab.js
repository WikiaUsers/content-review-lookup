/* põe a última aba como aberta por padrão em infoboxes
 * from https://youngjustice.fandom.com/wiki/MediaWiki:Common.js/CurrentTab.js
 */
mw.hook('wikipage.content').add(function() {
    $(".type-last-tab ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".type-last-tab ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".type-last-tab div.pi-image-collection > div.current").removeClass("current");
    $(".type-last-tab div.pi-image-collection > div:last-child").addClass("current");
});