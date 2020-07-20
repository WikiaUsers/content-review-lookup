//Add "full edit" links on comments, so one can easily leave a summary
//by Bobogoobo. Structure adapted from http://stackoverflow.com/a/14084869
//(I wrote this a while ago, so it could probably be updated to use newer/better techniques,
//  but why fix what isn't broken for now :P)
if (mw.config.get('wgNamespaceNumber') === 0 || mw.config.get('wgNamespaceNumber') === 500) {
(function(){
    var o = jQuery.fn.removeClass;
 
    jQuery.fn.removeClass = function() {
        var result = o.apply(this, arguments);
        jQuery(this).trigger('commentsLoaded');
        return result;
    };
})();
$(function(){
    $('#WikiaArticleComments').one('commentsLoaded', function(event){
        var timer = window.setInterval(function() {
            if ($('.article-comments-pagination').length > 1) {
                window.clearInterval(timer);
                doStuff();
            }
        }, 100);
    });
 
    function doStuff() {
        $('#article-comments-ul .edited-by').each(function() {
            var link = $(this).children('a:first').attr('href');
            link = link.substring(0, link.indexOf('?'));
            $(this).find('.edit-link').append(
              '(<a class="article-comm-edit-full" href="' + link + 
              '?redirect=no&action=edit" style="margin-right:-0.05em;">full</a>)'
            );
        });
        $('.article-comments-pagination a').click(function() {
            var page = $(this).attr('page');
            var timer2 = window.setInterval(function() {
                if (
                    $(
                        '.article-comments-pagination ' +
                        'a[id=article-comments-pagination-link-' +
                        page + ']'
                    ).hasClass('article-comments-pagination-link-active')
                ) {
                    window.clearInterval(timer2);
                    //Recursive because the pagination seems to be completely replaced on load
                    doStuff();
                } 
            }, 500);
        });
    }
});
}// end if