/**
 * Filtering Comments
 * 
 * This script allows all comments to be filtered by user-groups.
 * It will also allow all CSS class names to apply to the filtered comments.
 * 
 * @author Ultimate Dark Carnage
 **/
 
;(function(mw, $, FilterComments){
    var UserGroups = ['rollback', 'chatmoderator', 'sysop', 'bureaucrat', 'bot', 'vanguard', 'councilor', 'vstf', 'helper', 'staff'];
    if (FilterComments.customGroups instanceof Array){
        Array.prototype.forEach.call(FilterComments.customGroups, function(group){
            if (UserGroups.indexOf(group) === -1){
                UserGroups[UserGroups.length] = group;
            } else {
                console.log('User group (' + group + ') is already in the UserGroups array.');
            }
        });
    }
    
    Array.prototype.forEach.call(UserGroups, function(group){
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: mw.util.wikiScript('index'),
            data: {
                title: 'MediaWiki:Custom-filter-comment-group-' + group,
                action: 'raw',
                format: 'text'
            }
        }).success(function(data){
            var users = data.split(/\n/),
                $comments = $('#WikiaArticleComments .comments li');
            var $users = users.map(function(user, index){
                var $comment = $comments.filter(function(){
                    return $(this).data('user') === user;
                });
                return $comment;
            });
            
            $users.forEach(function($elem, index){
                $elem.addClass(group);
            });
        }).fail(function(error){
            console.log(error);
        });
    });
})(this.mediaWiki, this.jQuery, (this.FilterComments || this.FilteredComments));