;(function() {
    //Make a function to prepend the items to the article
    function prependContent ($el) {
        $el.insertBefore('#WikiaArticle');
    }
 
    //Run said function
    mw.hook('PageCreator.render').add(prependContent);
    mw.hook('LastEdited.inserted').add(prependContent);
 
    //Add some CSS
    if (!$('.UserProfileActionButton').exists()) {
        mw.util.addCSS(
            '#page-creator,\
            .lastEdited {\
                position: relative;\
                bottom: 10px;\
            }'
        );
    }
})();