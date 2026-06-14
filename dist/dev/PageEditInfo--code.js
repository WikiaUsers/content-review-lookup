;(function() {
    // Don't run on userpages or usertalk pages
    if (mw.config.get('profileIsUserPage') || mw.config.get('profileIsUserTalkPage')) {
        return;
    }   

    // Make a function to prepend the items to the article
    function prependContent ($el) {
        $el.insertBefore('#content');
    }
    
    // Run said function
    mw.hook('PageCreator.render').add(prependContent);
    mw.hook('LastEdited.inserted').add(prependContent);
    
    // Add some CSS
    mw.util.addCSS(
        '#page-creator,\
        .lastEdited {\
            position: relative;\
            bottom: 10px;\
        }'
    );
})();