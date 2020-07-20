function addShareArticlesUsingAddThisImpl(divType){
    mw.util.$content.find(divType).each( function(i, d){
     var div = $(d);
     if (div.find("a:contains('далее…')")) {
      var permlink = div.find("a:contains('далее…')").attr("href");
      if (permlink) {
        var atthis_toolbox = $('<div class="addthis_toolbox addthis_default_style" style="clear: both; float: right; width: 140px;"><a class="addthis_button_preferred_1"></a><a class="addthis_button_preferred_2"></a><a class="addthis_button_preferred_3"></a><a class="addthis_button_preferred_4"></a><a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a></div>');
        // always share non-secure version
        atthis_toolbox.attr("addthis:url", 'http:' + wgServer + permlink);
 
        //find title
        var allLinks = div.find("a");
        var title;
        for (i in allLinks)
        {
            var a = $(allLinks[i]);
            // is this a wikilink to an featured article?
            if (a.attr("href") == permlink && a.attr("title")) {
                title = a.text();
                break;
            }
        }
        if (!title) {
            title = unescape(permlink.substring(6));
        }
        atthis_toolbox.attr("addthis:title", title + ' — Википедия');
 
        // find description
        var description = $(div.find("p")[0]).text();
        atthis_toolbox.attr("addthis:description", description);
 
        div.after(atthis_toolbox);
      }
     }
    });
}

function addShareArticlesUsingAddThis(){
    addShareArticlesUsingAddThisImpl('#mf-tfa, #mf-tga');
    addthis.init();
}


if( mw.config.get( 'wgIsMainPage' ) ){

    importScriptURI('//s7.addthis.com/js/250/addthis_widget.js#pubid=ra-5018f8990d28f6b0&async=1');
 
    var addthis_config = {
        "data_track_clickback": true,
        "ui_language": "ru"
    };
    
    $(function() {
        setTimeout(addShareArticlesUsingAddThis, 500);
    })
}