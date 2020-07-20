function Article(identifier) {
    this.id = wgArticleId;
    this.title = wgPageName;
    this.type = '';
    this.lastEdit = {
        userid: 0,
        username: '',
        date: '',
        revision: ''
    }
}

/* var Article = {
    id: wgArticleId,
    title: wgPageName,
    type: '',
    lastEdit: {
        userid: 0,
        username: '',
        date: '',
        revision: ''
    }
};*/


/* Setting the main functions */

function getArticleId(title,callback){
    $.getJSON('http://' + Wiki.lang + '.' + Wiki.name + '.wikia.com/api/v1/Articles/Details?ids=0&titles=' + encodeURIComponent(title) + '&abstract=100&width=200&height=200').done(callback).error(function (error) {
        console.log('Somethink went wrong',error);
    });
}
 
function getArticleDescription(id,callback){
    $.getJSON('http://' + Wiki.lang + '.' + Wiki.name + '.wikia.com/api/v1/Articles/AsSimpleJson?id=' + id).done(callback).error(function (error) {
        console.log('Somethink went wrong',error);
    });
}

/* Further functions */

if($('.api-fetch-id').length || $('.api-fetch-content').length || $('.api-fetch-contentById').length) {
    var articleTitle = $('.api-fetch-id').data('title');
    var articleId = $('.api-fetch-content').data('id');
    var articleRef = $('.api-fetch-contentById').data('title');

    getArticleId(articleRef, function(data) {
        getArticleDescription(data.items[Object.keys(data.items)[0]].id, function (data) {
            if(data.sections[0].images) {
                 $('.api-fetch-contentById').append(
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
                 .append(data.sections[0].content[0].text);
            }
            else {
                $('.api-fetch-contentById').html(data.sections[0].content[0].text);
            }
        });
    });
}