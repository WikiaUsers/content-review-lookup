function pageExists(title,iftrue,iffalse) {
    $.getJSON('/api.php?action=query&titles=' + title + '&indexpageids&format=json', function(data) {
        if(data.query.pageids.length == 1 && data.query.pageids[0] != '-1') {
            iftrue();
        }
        else {
            if(typeof iffalse == 'function') {
                iffalse();
            }
        }
    });
}

pageExists(wgPageName +  '/settings',function() {
    $.getJSON('/api.php?action=query&titles=' + wgPageName +  '/settings&indexpageids&prop=revisions&rvprop=content&format=json', function(data) {
        console.log(topl.parse(data.query.pages[data.query.pageids[0]].revisions[0]['*']));
    });
})