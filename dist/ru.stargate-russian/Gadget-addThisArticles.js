function addShareCurrentArticleUsingAddThis(){
    var h1 = $("h1#firstHeading");
    var atthis_toolbox = $('<div class="addthis_toolbox addthis_default_style addShareCurrentArticleUsingAddThis">'
        + '<a class="wiki_addthis_button addthis_button_preferred_1"></a>'
        + '<a class="wiki_addthis_button addthis_button_preferred_2"></a>'
        + '<a class="wiki_addthis_button addthis_button_preferred_3"></a>'
        + '<a class="wiki_addthis_button addthis_button_preferred_4"></a>'
        + '<a class="wiki_addthis_button addthis_button_compact"></a>'
        + '<a class="wiki_addthis_button addthis_counter addthis_bubble_style"></a>'
        + '</div>');
    // always share non-secure version
    atthis_toolbox.attr("addthis:url", 'http:' + wgServer + "/wiki/" + encodeURI(wgPageName));

    // find description
    var firstP = mw.util.$content.find("div#mw-content-text > p")[0];
    if ( firstP ) {
        atthis_toolbox.attr("addthis:description", $(firstP).text());
    }

    h1.before(atthis_toolbox);
    addthis.init();
}
 
if( mw.config.get( 'wgNamespaceNumber' ) == 0 && mw.config.get( 'wgAction' ) == 'view' && !mw.config.get( 'wgIsMainPage' ) ) {
 
    importScriptURI('//s7.addthis.com/js/250/addthis_widget.js#pubid=ra-5018f8990d28f6b0&async=1');
 
    var addthis_config = {
        "data_track_clickback": true,
        "ui_language": "ru"
    };
 
    $(function() {
        setTimeout(addShareCurrentArticleUsingAddThis, 1000);
    })
}