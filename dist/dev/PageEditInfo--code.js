;(function() {
    // Make a function to prepend the items to the article
    function prependContent ($el) {
        $el.insertBefore('#content');
    }
    
    // Run said function
    mw.hook('PageCreator.render').add(prependContent);
    mw.hook('LastEdited.inserted').add(prependContent);
    
    // Add some CSS
    if (!$('.UserProfileActionButton').length) {
        mw.util.addCSS(
            '#page-creator,\
            .lastEdited {\
                position: relative;\
                bottom: 10px;\
            }'
        );
    }
})();