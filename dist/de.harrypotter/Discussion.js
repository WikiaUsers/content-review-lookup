/* "Wer beteiligte sich an der Diskussion?" direkt im Diskussionsfaden */
isHistory = mw.Uri().query.hasOwnProperty('action') ? (mw.Uri().query.action == 'history' ? true : false) : false; 
if(mw.config.get('wgNamespaceNumber') == 1201 && !isHistory) {
    $.get(mw.util.getUrl(mw.config.get('wgPageName')) + '?action=history', function(data) {
        $('.WikiaRail.loaded#WikiaRail').prepend(
            $($.parseHTML(data)).find('.module.WallHistoryRail')
        );
        /*$('.WikiaRail.loaded').find('.module.WallHistoryRail > ul').append(
            $('<li />').append(
                $('<a />').attr({
                    'href': '#',
                    'id': 'add-user-to-discussion'
                }).text('Einen Benutzer zur Diskussion hinzufügen')
            )
        );*/
        $('.WikiaRail.loaded .module.WallHistoryRail > ul').before(
            $('<div />')
                .css({
                    'margin-top': '-10px',
                    'margin-left': '15px',
                    'display': 'inline-block',
                    'color':'grey',
                    'font-size': 'larger',
                    'font-weight': 'bold'
                })
                .text($('.SpeechBubble.message').length + ' Antworten')
        ).after(
            $('<a />').attr({
                'href': mw.util.getUrl(mw.config.get('wgPageName')) + '?action=history',
                'title': 'Versionsgeschichte'
            }).css({
                'margin-top': '10px',
                'display': 'inline-block',
                'margin-left': '15px'
            }).text('Komplette History einsehen')
        );
    });
    $('#WikiaRailWrapper').show();
}

/* Kommentare und Diskussion gleichzeitig erhalten */
if (mw.config.get('wgNamespaceNumber') == 0) {
    var $oldComments = $('.wikia-button.comments.secondary[data-id="comment"]');
    $oldComments.replaceWith(
        $('<nav>').addClass('wikia-menu-button').append(
            $('<a>')
                .attr({
                    accesskey:'d',
                    href:'#WikiaArticleComments',
                    rel:'nofollow',
                    'data-id':'comment'
                })
                .append(
                    $('<img>')
                        .attr({
                            alt:'',
                            src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADNCAMAAAA1zL3UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAICAgMDAwQEBAYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAMcATWMAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjVlhTJlAAAog0lEQVR4Xu2dB5xV1bX/fS/v5Z+YPKNGUSNC6ExjKDJ0REQQAVEQEQJSLBRBEQUTe0PsCoi9IBZUFNCnPo08I2hsKKjwRGkOddrtp5f9uf/f2uec2+/cfmcM7E8CI3POved899prr732WmsfFTzS0iZwVNpXHrkweARWBkJQeFhrnll87dQLhvXuVXV6926VleXlFV26duvWvd+QsTNvWbry9QyetckvLRisVUvmjTurZ0mb0/sOnTj/nidWvP3f732w/h8bNn749w/e/5/33n331RWP3HTFmMF9S8u6VJ0764GXmpxEGg9QAFgv3zBxSFXlsNGX3vX6pp9rGDN0gzEmiJKi0Q/UDF3TrWYc2vv9+4/OHdWvvGroxIXPpPHETXhJfmGtWji+osegcQtXbq6XFJMQ1WtywC8qmh4JSdNUlTHTNHRdU1Sb4L737r5kSFXX82cvb0IcjX91/mC9eXW/zn0mLfz7Vj9jqqIzze/yyIRIV0midIOaaWqaQRQZfrSkzFRVXZf8ggB+6r4tS64e1K5i8tPNElieYF17eodBc1d842KMS4qhKpwNxxPdMP7oH7lgkWRxXrhO1zTdNHXFYOr+D24fUdL9ijebHbA8wHpobEnZ9Od+rHaTaIgQI2DQ1GSwSE/ZBAkWH54EyyQBNHVNxr+YgZrqF2aXnnTmg82LV66wlg2tGrp4i6BKtuZ2FDekJHFLAAsXGgZJowZofNgSQMZ2PTSya5fFzYhXTrBWntNl2D2f4P0URdZUBU1VSWtDeJKxIiGKajQeqUF3ARZ+0BUJE6fKfHWQ1N3/c27XwY80F145wJrWuu/jO2AamA0e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'
                        })
                        .width(22)
                        .height(16),
                    'Mitreden'
                ),
            $('<span>')
                .addClass('drop')
                .append(
                    $('<img>')
                        .attr({
                            alt:'',
                            src:'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D'
                        })
                        .addClass('chevron')
                ),
            $('<ul>')
                .addClass('WikiaMenuElement')
                .append(
                    $('<li>').append(
                        $('<a>')
                            .attr({
                                accesskey:'t',
                                href:'#WikiaArticleComments',
                                rel:'nofollow',
                                'data-id':'comment'
                            })
                            .addClass('comments secondary')
                            .append(
                                'Kommentare',
                                $('<span>').addClass('commentsbubble').text($oldComments.find('.commentsbubble').text())
                            )
                    ),
                    $('<li>').append(
                        $('<a>')
                            .attr({
                                accesskey: 'd',
                                'data-id': 'discussion',
                                id: 'ca-discuss',
                                href: mw.util.getUrl('Diskussion:' + mw.config.get('wgPageName'))
                            })
                            .addClass('comments secondary')
                            .append(
                                'Diskussion'/*,
                                $('<span>')
                                    .addClass('commentsbubble')
                                    .text(0)*/
                            )
                    )
                )
        )
    );
    if(!!$('.RelatedForumDiscussion').length) {
        $('[data-id="comment"] ~ .WikiaMenuElement').append(
            $('<li>').append(
                $('<a />')
                    .addClass('comments secondary')
                    .attr({
                        href: mw.util.getUrl('Thema:' + mw.config.get('wgPageName')),
                        title: 'Diskussionen zu diesem Thema'
                    })
                    .text('Diskussionen zu diesem Thema')
                    .append(
                        $('<span>')
                            .addClass('commentsbubble')
                            .text($('.RelatedForumDiscussion ul.forum-discussions li.forum-thread').length)
                    )
            )
        );
    }
}