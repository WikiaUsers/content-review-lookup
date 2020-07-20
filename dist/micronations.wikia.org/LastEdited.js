/**
 * lastEdited.js
 * 
 * Adds last edited details to the page
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    var lastEdited = $.extend({
        position: 'top',
        time:true
    }, window.lastEdited);
    if (mw.config.get('wgNamespaceNumber') == 0) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size|parsedcomment',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
                sel = lastEdited.position;
            if (lastEdited.position == 'top') {
                sel = '#WikiaPageHeader';
            } else if (lastEdited.position == 'bottom') {
                sel = '.WikiaArticleCategories';
            }
            var text = '<div class="lastEdited" style="width:100%;">Last edited by <a href="/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> on ' + new Date(rv.timestamp).toUTCString().slice(0, 16);
            if (lastEdited.time) {
                text += ', ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC)'; 
            }
            text += '</div>';
            if (lastEdited.position == 'top') {
                $(sel).append(text);
            } else {
                $(sel).after(text);
            }
        });
    }
});
//