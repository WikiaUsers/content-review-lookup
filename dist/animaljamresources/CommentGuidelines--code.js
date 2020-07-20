/**
 * CommentGuidelines
 * Adds a custom placeholder to the comments textbox
 * By Mario&LuigiBowser'sInsideStory
 * 
 */
 
mw.loader.using('mediawiki.api').then(function(){
    if (!mw.config.get('wgIsArticle')) return;
    // Get the MediaWiki Message
    function getGuidelines(){
        return new mw.Api().get({
            action: 'query',
            meta: 'allmessages',
            ammessages: 'Custom-comment-guidelines',
            amlang: mw.config.get('wgUserLanguage')
        });
    }
    // Wait until the comments section loads.
    function setListener(){
        var promise = $.Deferred();
        mw.hook('wikipage.content').add(function($content){
            if ($content.is('#article-comments')) promise.resolve();
        });
        return promise;
    }
    // Adding the placeholder when the comments load.
    $.when(getGuidelines(), setListener()).done(function(d){
        $('#article-comm').attr({
            placeholder: d[0].query.allmessages[0]['*']
        });
    });
});