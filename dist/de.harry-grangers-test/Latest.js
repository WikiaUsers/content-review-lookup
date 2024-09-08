function getLatest() {
    limit = arguments[1] || 10;
    switch(arguments[0]) {
        case 'comments':
            $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=expandtemplates&format=json&text={{%23dpl:|titlematch=%25@comment%25|count=' + limit + '|ordermethod=lastedit|order=descending|mode=userformat|format=,%PAGE%§,}}', function(data) {
                pages = data.expandtemplates['*'].split('§');
                for(i in pages) {
                    $('.Wall.Thread').append(pages[i] + '<br />');
                }
                $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=revisions&rvprop=content|user&rvsection=0&format=json&titles=' + encodeURIComponent(pages.join('|')), function(data2) {
                    delete data2.query.pages['-1'];
                    for(i in data2.query.pages) {
                        console.log(data2.query.pages[i])
                        console.log(data2.query.pages[i].revisions[0].user + ':',data2.query.pages[i].revisions[0]['*']);
                    }
                });
            });
            break;
        case 'activity':
            $.getJSON('http://de.harry-grangers-test.wikia.com/api/v1/Activity/LatestActivity?limit=' + limit + '&namespaces=0&allowDuplicates=true', function(data) {
                console.log('activity',data);
            });
            break;
        case 'articles':
            $.getJSON('', function(data) {
                console.log('articles',data);
            });
            break;
        case 'custom':
            $.getJSON('',function(data) {
                console.log(data);
            });
            break;
        default:
            $.getJSON('http://de.harry-grangers-test.wikia.com/api/v1/Activity/LatestActivity?limit=' + limit + '&namespaces=0&allowDuplicates=true', function(data) {
                console.log('activity',data);
            });
            break;
    }
}