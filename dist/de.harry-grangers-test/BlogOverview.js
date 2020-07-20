function getBlogs(search,callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=expandtemplates&text={{%23dpl:%7C' + search + '}}&format=json').done(callback);
}

function getBlogContent(articleTitle,articleRef) {
    getArticleId(articleTitle, function(response) {
        getArticleDescription(response.items[Object.keys(response.items)[0]].id, function (data) {
            console.log(articleTitle,articleRef,response.items[Object.keys(response.items)[0]].id,data.sections[0].images.length ? 'Bilder' : 'keine Bilder',Object.keys(data.sections[0].content).length,'Absätze');
           console.dir(data);
            if(data.sections[0].images.length) {
                 console.log('insert images');
                 $('.blogOverview').append($('<div />').attr('id',articleRef).append(
                     $('<figure />').append(
                         $('<img />')
                         .attr({
                             src: data.sections[0].images[0].src,
                             width: 160,
                             height: 160
                         })
                         .addClass('thumbimage')
                     )
                     .addClass('article-thumb tright show-info-icon')
                     .css('width','160px')
                 )
                 .append(data.sections[0].content[0].text));
            }
            else {
                for(m in data.sections) {
                    console.log('insert section',m,'of',Object.keys(data.sections).length);
                    for(n in data.sections[m].content) {
                        console.log('insert paragraph',n,'of',Object.keys(data.sections[m].content).length);
                        $('.blogOverview #' + articleRef).length ? $('.blogOverview').find('#' + articleRef).html(data.sections[m].content[n].text) : $('.blogOverview').append($('<div />').attr('id',articleRef).html(data.sections[m].content[n].text));
                        console.log($('.blogOverview #' + articleRef).length,$('.blogOverview #' + articleRef).length ? $('.blogOverview').find('#' + articleRef).html(data.sections[m].content[n].text) : '');
                    }
                }
            }
        });
    });
}

function replaceUmlauts(str) {
    return str
    .replace(/[\u00c4]/,'Ae')
    .replace(/[\u00e4]/,'ae')
    .replace(/[\u00d6]/,'Oe')
    .replace(/[\u00f6]/,'oe')
    .replace(/[\u00dc]/,'Ue')
    .replace(/[\u00fc]/,'ue')
    .replace(/[\u00df]/,'ss'); 
}

function parseLinkList(links) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=parse&text=' + links + '&contentmodel=wikitext&format=json', function(data) {
        if(!$('.blog-overview[data-output]').length || $('.blog-overview[data-output]').length && $('.blog-overview').data('output') == 'linklist') {
            $('.WikiaArticle#WikiaArticle').append($('<ul />').addClass('blogOverview'));
            for(i in data.parse.links) {
                $('.blogOverview').append($('<li />').append($('<a />').attr('href', '/wiki/' + data.parse.links[i]['*']).text(data.parse.links[i]['*'])));
            }
        }
        else if ($('.blog-overview').data('output') == 'articles') {
            $('.WikiaArticle#WikiaArticle').append($('<div />').addClass('blogOverview'));
            
            for(i in data.parse.links) {
                if(data.parse.links[i]['*'].indexOf('/') > -1 ) {
                    title = data.parse.links[i]['*'];
                    ref = replaceUmlauts(title.split('/')[title.split('/').length -1]).replace(/[^a-zA-Z0-9-_ ]/g,'').replace(/\s/g,'_');
                    getBlogContent(title,ref);
                }
            }
        }
    });
}

if($('.blog-overview').length) {
    if($('.blog-overview[data-category]').length) {
        category = $('.blog-overview').data('category');
        getBlogs('namespace=Benutzer_Blog',function(response) {
            parseLinkList(response.expandtemplates['*']);
        });        
    }
    else if($('.blog-overview[data-articles]').length) {
        console.log('Blogartikel',$('.blog-overview').data('articles'));
    }
}