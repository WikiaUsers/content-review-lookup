/* CustomToolbarLinks by Bobogoobo */
// Possible additions: option to put items directly on the toolbar, possibly with position specified
// <nowiki>

(function() {
    if ( typeof customPages == 'undefined' ) {
        customPages = [['Main Page']];
    }
    
    var addCode = '<li class="mytools menu"><span class="arrow-icon-ctr">' +
                      '<span class="arrow-icon arrow-icon-single"></span></span>' +
                      '<a href="#">Custom Links</a><ul id="custom-links-menu" class="tools-menu">',
    c_href, c_html;
    
    for ( var i = 0; i < customPages.length; i++ ) {
        c_href = customPages[i][0];
    
        if ( customPages[i].length > 1 ) {
            c_html = customPages[i][1];
        } else {
            c_html = c_href;
        }
    
        addCode += '<li class="overflow"><a href="';
        if ( c_href.indexOf( '://' ) != -1 ) {
            addCode += c_href + '" target="_blank"';
        } else {
            addCode += '/wiki/' + c_href + '"';
        }
        addCode += '>' + c_html + '</a></li>';
    }
    
    addCode += '</ul></li>';
    
    $( '.mytools' ).after( addCode );
    WikiaFooterApp.init();
}());