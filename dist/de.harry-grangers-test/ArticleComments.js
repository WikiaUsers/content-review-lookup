function getArticleComments() {    
    return new Promise(function(resolve,reject) {
        $.getJSON(wgScript + '?action=ajax&rs=ArticleCommentsAjax&method=axGetComments', {
            article: wgArticleId,
            order: $('#article-comm-order').attr('value'),
            page: wgPageName,
            useskin: window.skin
        }, function (json) {
            function parseCommentUl(ul) {
                return $(ul).find('> li.comment').map(function() {
                    return {
                        id: /comm-(\d+)/.exec($(this).attr('id'))[1],			
                        user: $(this).data('user'),
                        content: $(this).find('.article-comm-text p').text(),
                        date: $(this).find('.edited-by .permalink').text(),
                        children: $(this).next().hasClass('sub-comments') ? parseCommentUl($(this).next()) : []
                    };
                }).get();
            }
            resolve(parseCommentUl($(json.text)));
        });
    });
}

function displayArticleComments(comments) {
    tmpl = template();
    Mustache.parse(tmpl);
    $('.wikia-rail-inner')append(
        $('<div />').addClass('rail-module comments-module').html(Mustache.render(tmpl,{comments: comments}))
    );
    $('time.timeago').timeago();
}
 
function template() {
    return `<ul class="activity-items">
        {{#comments}}
            <li class="activity-item">
                <div class="page-title"><a class="page-title-link" href="/wiki/{{title}}">{{title}}</a></div>
                <div class="edit-info">
                    <a class="edit-info-user" href="/wiki/User:{{user}}">{{user}}</a>&nbsp;&middot;&nbsp;
                    <a href="/wiki/{{title}}?oldid={{old_revid}}" class="edit-info-time" style="color:rgba(58, 58, 58, 0.75);">
                        <time class="timeago" datetime ="{{timestamp}}" style="vertical-align:top;">{{timestamp}}</time>
                    </a>
                </div>
            </li>
        {{/comments}}
    </ul>`;
}
 
getArticleComments().then(function(changes) { displayArticleComments(changes); });