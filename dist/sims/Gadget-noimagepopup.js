// <nowiki>
// BEGIN MW GADGET
// *********

$(function changeimagelinks() {
 
    if (window.skin == 'oasis') {
        var article = $('#WikiaArticle, .LatestPhotosModule, #article-comments');
    }
    else {
        var article = $('#bodyContent');
    }
 
    article.unbind('click.lightbox');
 
    var a = document.getElementsByTagName("a");
    for ( var t = 0; t < a.length; ++t ) {
        var a2 = a[t];
        var img = a2.getElementsByTagName("img");
        if ( img[0] != null ) {
            if ( a2.href.indexOf("wikia.nocookie.net") != -1 ) {
                var link = wgServer + '/wiki/File:' + a2.getAttribute('data-image-name');
                a2.setAttribute('href',link);
            }
        }
    }
});

//END MW GADGET
//</nowiki>