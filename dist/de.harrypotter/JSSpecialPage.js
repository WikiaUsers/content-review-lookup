function JSSpecialPage(pageName,content) {
    if(wgNamespaceNumber == wgNamespaceIds.special && wgTitle == pageName) {
        $('.page-header h1').text(wgTitle);
        document.title = wgTitle;
        $(mw.util.$content).html(content);
    }
 
    if(wgCanonicalSpecialPageName == 'Specialpages') {
        lastGroup = $(mw.util.$content).find('#mw-specialpagesgroup-other + table > tbody');
        lastGroup.find('tr:first-of-type td:first-of-type ul').append(
            $('<li />').append(
                $('<a />')
                    .attr('href','/wiki/Special:' + pageName)
                    .text(wgFormattedNamespaces[wgNamespaceIds.special] + ':' + pageName)    
            )  
        );
    }
}