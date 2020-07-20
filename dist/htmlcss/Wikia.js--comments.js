(function($, mw){
    if (typeof window.ArticleComments !== 'undefined') return;
    var ArticleComments = {};
    ArticleComments.PAGENAME = mw.config.get('wgPageName');
    ArticleComments.GROUPS = ['staff', 'helper', 'vstf', 'vanguard', 'bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator', 'rollback', 'codeeditor', 'patroller'];
    ArticleComments.CACHE = [];
    ArticleComments.sendRequest = function(group, callback){
        var api = new mw.Api();
        api.get({
            'action': 'query',
            'list': 'groupmembers',
            'gmgroups': group,
            'gmlimit': '500',
            'format': 'json'
        }).done(function(data){
            if (data.error) return;
            callback.apply(ArticleComments, [data, group]);
        });
    };
    ArticleComments.insertClass = function(response, group){
        var userData = response.users;
        for (var i = 0; i < userData.length; i++){
            var userItem = userData[i], userName = userItem.name;
            if (ArticleComments.CACHE.indexOf(userName) === -1){
                $('.comment[data-user="' + userName + '"]').addClass('comment-' + group);
                ArticleComments.CACHE[ArticleComments.CACHE.length] = userName;
            }
        }
    };
    ArticleComments.findUsers = function(groups){
        for (var i = 0; i < groups.length; i++){
            ArticleComments.sendRequest(groups[i], ArticleComments.insertClass);
        }
    };
    ArticleComments.init = function(){
        var groups = ArticleComments.GROUPS;
        if ($('.WikiaArticleComments').length > 0){
            ArticleComments.findUsers(groups);
        }
    };
    window.ArticleComments = ArticleComments;
}(jQuery, mediaWiki));