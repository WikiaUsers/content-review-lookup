function getAPIResult(url,page) {
    $.getJSON(url, function() {
        callAPI({
            'action': 'query',
            'prop': 'info|revisions',
            'intoken': 'edit',
            'titles': page,
            'rvprop': 'content',
            'rvlimit': '1'
        }, 'GET', function (response) {
                callAPI({
                    'minor': 'yes',
                    'summary': summary,
                    'action': 'edit',
                    'title': page,
                    'startimestamp': Date.now(),
                    'token': response.query.pages[Object.keys(response.query.pages)[0]].edittoken,
                    'watchlist': 'unwatch',
                    'text': content
                }, 'POST', function (response) {
                    if (response.edit.result == 'Success') {
                        console.log('success:',response);
                    }
                    else {
                        console.log('error:',response);
                    }
               }
           );
       });
    }
}