/***
 * This is the JavaScript page for the custom wiki
 * news widget created by Ultimate Dark Carnage
 ***/
(function(mw, $, news){
    if (news.noop) return;
    var wikiNews = Object.create(null);
    wikiNews.getDateData = function(mmyy){
        return new Promise(function(resolve, reject){
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.config.get('wgScriptPath') + '/api.php',
                data: {
                    action: 'query',
                    prop: 'info|revisions',
                    intoken: 'edit',
                    titles: 'Project:News/' + mmyy,
                    rvprop: 'content',
                    rvlimit: 1,
                    indexpageids: 'true',
                    format: 'json'
                }
            }).done(function(data){
                var page = response.query.pages[response.query.pageids[0]],
                    pageExists = response.query.pages['-1'] ? false : true,
                    content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '';
                if (pageExists){
                    resolve(mmyy, content);
                } else {
                    reject();
                }
            }).error(function(error){
                reject(error);
            });
        });
    };
}(this.mediaWiki, this.jQuery, window.news = $.extend({}, window.news)));