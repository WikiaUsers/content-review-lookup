importArticles({
    type: 'script',
    articles: [
        'MediaWiki:WikiAPI.js',
        'MediaWiki:UserAPI.js',
        'MediaWiki:ArticleAPI.js'
    ]
});
 
function callAPI(data, method, callback) {
    data['format'] = 'json';
 
    $.ajax({
        data: data,
        dataType: 'json',
        url: wgScriptPath + '/api.php',
        type: method,
        success: function (response) {
            if (response.error) {
                showError('API error: ' + response.error.info);
            } else {
                callback(response);
            }
        },
        error: function (xhr, error) {
            showError('AJAX error: ' + error);
        },
        timeout: 10000 // msec
    });
}

//Basisert auf Teilen des Ratings aus de.scifi.wikia.com und de.moviepedia.wikia.com
addOnloadHook(function () {
    
});

/*if(wgArticleType === 'other' && wgIsContentNamespace === true) {
    Article.type = 'Article';
}*/

/*function getBlogViews(page, callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=info&inprop=views%7Crevcount&format=json&titles=' + page).done(callback).error(function (error) {
        console.log('Somethink went wrong',error);
    });
}

if(wgNamespaceNumber == 500) {
    getArticleId(wgPageName + '/views', function(data) {
        getArticleDescription(data.items[Object.keys(data.items)[0]].id, function (data) {
            console.log('Blog Data',data);
        });
    });
    getBlogViews(wgPageName, function(data) {
        console.log(data.query.pages[Object.keys(data.query)[0]].revcount);
        $('.author-details').append(
            $('<span />').addClass('views').text(data.query.pages[Object.keys(data.query.pages)[0]].revcount)
        );
    });
}
else {
    console.log('Hier nicht.');
}*/