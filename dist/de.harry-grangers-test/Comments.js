function getComments(page) {
    re = /([A-Za-z_  ]+.):([A-Za-z_\/‰¸ˆƒ‹÷ ]+.)/;
    pagename = page.replace(re,'$2');
    namespace = page.replace(re, '$1');
    if (namespace == 'Benutzer Blog') {
        console.log('Blogkommentare');
        commentsNS = namespace + ' Kommentare';
    }
    else if (namespace == pagename) {
        console.log('Article namespace');
        commentsNS = 'Diskussion';
    }
    else {
        console.log('other namespaces/default comment namespace naming');
        commentsNS = namespace + ' Diskussion';
    }
    console.log('RE',pagename, ',', namespace, ',', commentsNS);
    $.getJSON('http://de.harry-grangers-test.wikia.com/api/v1/Articles/Details?ids=0&titles=' + encodeURIComponent(page) + '&abstract=100&width=200&height=200', function(data) {
        $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&format=json&pageids=' + data.items[Object.keys(data.items)[0]].id, function(response) {
            $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=expandtemplates&format=json&text={{%23dpl:|titlematch=%' + response.query.pages[Object.keys(response.query.pages)[0]].title.replace(namespace + ':','') + '%|namespace=' + commentsNS.replace(new RegExp(' ', 'g'),'_') + '}}', function(result) {
                console.log('semi-wikitext',result.expandtemplates['*']);
                var re = /<LI>\[\[([^<]*)\]\]<\/LI>/g;
                var subst = '$1\n'; 
                var result1 = result.expandtemplates['*'].replace(/<UL>(.*)<\/UL>/,'$1').replace(re, subst);
                results = [];
                results.push(result1.split('\n'));
                for(i in results[0]) {
                    console.log(i,results,results[0][i]);
                    if(results[0][i] == '' ) {
                        results[0].splice(i,1);
                    }
                    else {
	                results[0][i] = results[0][i].replace(/([|].*)/,'');
                    }
                }
                console.log(results);
                $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json&titles=' + encodeURIComponent(results[0].join('|')), function(data2) {
                    return data2.query.pages/* ? data2.query.pages : {'error':'no such page found'}*/;
                });
            });
        });
    });
}

function getLatestComments() {
    $.getJSON('http://de.harry-grangers-test.wikia.com/api.php?action=expandtemplates&format=json&text={{%23dpl:|titlematch=%25@comment%25|count=10|ordermethod=lastedit|order=descending|mode=userformat|format=,%PAGE%ß,}}', function(data) {
        pages = data.expandtemplates['*'].split('ß');
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
}

function getActivityComments(callback) {
    $.getJSON('/api/v1/Activity/LatestActivity?limit=100&namespaces=1&allowDuplicates=true',function(activity) {
        ids = _.pluck(activity.items,'article');
        if(ids.length) {
            $.getJSON('/api.php?action=query&prop=revisions&pageids=' + ids.join('|') + '&format=json&rvprop=timestamp|user|content', function(comments) {
                callback(_.filter(comments.query.pages,function(val) {
                    return /@comment-/.test(val.title);
                }));
            });
        }
        else {
            callback(false);
        }
    });
}

function latestCommentsBox(comments) {
    console.log('comments',comments);
    commentsList = $('<ul />');
    filteredComments = _.filter(comments,function(val) {
        return (val.title.match(/@comment-/g) || []).length === 1;
    }).slice(0, 5);
    console.log('filteredComments',filteredComments);
    for(c in filteredComments) {
        comment = {
            text: filteredComments[c].revisions[0]['*'],
            author: filteredComments[c].revisions[0].user,
            article: /Diskussion:(.*)\//.exec(filteredComments[c].title)[1],
            url: filteredComments[c].title,
            date: new Date(filteredComments[c].revisions[0].timestamp)
        }
        creationDate = pad(comment.date.getDate()) + '.' + pad((comment.date.getMonth() + 1)) + '.' + comment.date.getFullYear() + ' ' + pad(comment.date.getHours()) + ':' + pad(comment.date.getMinutes());
        $('<li />').append(
            $('<em />').append(
                $('<a />')
                    .attr('href','/wiki/' + comment.url)
                    .text(comment.article)
            ),
            $('<div />').addClass('text-teaser').text(comment.text),
            $('<div />').addClass('edited-by').append(
                wgContentLanguage == 'de' ? 'von ' : 'by ',
                $('<a />')
                    .attr('href','/wiki/User:' + comment.author)
                    .text(comment.author),
                wgContentLanguage == 'de' ? ' am ' : ' on ',
                creationDate
            )
        ).appendTo(commentsList);
    }
    console.log('commentsList',commentsList);
    moduleTitle = wgContentLanguage == 'de' ? 'Letzte Kommentare' : 'Latest Comments';
    createSidebarModule(moduleTitle,commentsList,'latestComments');
}