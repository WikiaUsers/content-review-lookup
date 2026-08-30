/* = Inspired by [[:en:MediaWiki:Gadget-PageRating.js]] made by [[:en:User:Pexy0]] = */
/* = Special thanks to [[User:铁桶]] = */
/* = Made by [[User:0.Phixley]] and ChatGPT = */

mw.loader.using('mediawiki.api').then(function () {
    mw.hook('wikipage.content').add(function () {
        var api = new mw.Api();
        var page = mw.config.get('wgPageName');
        var pageTitle = mw.config.get('wgTitle');
        var categories = mw.config.get('wgCategories') || [];
        var apiUrl = mw.util.wikiScript('wikia');
        if (
            mw.config.get('wgNamespaceNumber') !== 0 ||
            !['中分原创', '翻译搬运', '指南'].some(function (x) {
                return categories.indexOf(x) !== -1;
            })
        ) return;
        if ($('.rating-board').length) return;
        $('.page-header__meta').prepend(
            '<div class="rating-board">' +
            '<span class="rating-up"></span>' +
            '<span class="rating-total"></span>' +
            '<span class="rating-down"></span>' +
            '</div>'
        );
        var $up = $('.rating-up');
        var $total = $('.rating-total');
        var $down = $('.rating-down');
        var ratingId = $('#rating-id')
            .first()
            .attr('data-rating-id');
        function createRating() {
            $total.html(
                '<span class="rating-loading">正在加载...</span>'
            );
            var forumId =
                '4400000000000010956';
            var data = {
                forumId: forumId,
                siteId:
                    mw.config.get('wgCityId'),
                title:
                    '为页面评分 : ' + pageTitle,
                source:
                    'DESKTOP_WEB_FEPO',
                funnel:
                    'POLL',
                poll: {
                    question:
                        '为页面评分 : ',
                    answers: [
                        {
                            text:
                                '+1 (upvote)',
                            position:
                                0
                        },
                        {
                            text:
                                '-1 (downvote)',
                            position:
                                1
                        }
                    ]
                },
                articleIds: [
                    mw.config.get('wgArticleId')
                ],
                rawContent:
                    ''
            };
            $.ajax({
                url:
                    apiUrl +
                    '?controller=DiscussionThread' +
                    '&method=create' +
                    '&forumId=' +
                    forumId,
                type:
                    'POST',
                contentType:
                    'application/json',
                dataType:
                    'json',
                data:
                    JSON.stringify(data)
            })
                .then(function (response) {
                    console.log(
                        'create response:',
                        response
                    );
                    var threadId =
                        response.threadId ||
                        response.id ||
                        (
                            response.thread &&
                            response.thread.id
                        ) ||
                        (
                            response.payload &&
                            response.payload.thread &&
                            response.payload.thread.id
                        );
                    if (!threadId) {
                        throw new Error(
                            '未找到threadId'
                        );
                    }
                    return insertRatingTemplate(threadId);
                })
                .then(function () {
                    location.reload();
                })
                .fail(function (xhr) {
                    console.error(
                        'create failed:',
                        xhr.responseText
                    );
                    $total.html(
                        '<span class="rating-create">' +
                        '创建失败，点击重试' +
                        '</span>'
                    );
                    $('.rating-create')
                        .click(createRating);
                });
        }
        function insertRatingTemplate(threadId) {
            return api.get({
                action:
                    'query',
                prop:
                    'revisions',
                rvprop:
                    'content',
                rvslots:
                    'main',
                titles:
                    page,
                formatversion:
                    2
            })
                .then(function (data) {
                    console.log(data);
                    var content =
                        data.query.pages[0]
                            .revisions[0]
                            .slots.main.content;
                    var newContent =
                        '{{Rating|' +
                        threadId +
                        '}}' +
                        content;
                    return api.postWithEditToken({
                        action:
                            'edit',
                        title:
                            page,
                        text:
                            newContent,
                        summary:
                            '添加页面评分组件'
                    });
                });
        }
        if (!ratingId) {
            $up
                .addClass('rating-disabled')
                .text('0');
            $down
                .addClass('rating-disabled')
                .text('0');
            $total.html(
                '<span class="rating-create">' +
                '点击为本页开启评分' +
                '</span>'
            );
            $('.rating-create')
                .click(createRating);
            return;
        }
        var threadId =
            ratingId
                .replace(/^\/?f\/p\//, '')
                .split('/')[0];
        $('.rating-board').attr('data-rating-id', threadId);
        $.getJSON(apiUrl, {
            controller:
                'DiscussionThread',
            method:
                'getThread',
            threadId:
                threadId
        })
            .then(function (data) {
                var answers =
                    data &&
                    data.poll &&
                    data.poll.answers;
                if (!answers || answers.length < 2) {
                    $up
                        .addClass('rating-disabled')
                        .text('0');
                    $down
                        .addClass('rating-disabled')
                        .text('0');
                    $total.text('0');
                    return;
                }
                var up =
                    Number(answers[0].votes) || 0;
                var down =
                    Number(answers[1].votes) || 0;
                var total =
                    up - down;
                $up.text(up);
                $down.text(down);
                $total
                    .removeClass(
                        'rating-positive rating-negative'
                    )
                    .text('总分 : ' + total);
                if (total > 0) {
                    $total.addClass(
                        'rating-positive'
                    );
                } else if (total < 0) {
                    $total.addClass(
                        'rating-negative'
                    );
                }
            });

        //

        $('.rating-board').each(function () {
            var $board = $(this);
            if ($board.data('rating-loaded'))
                return;
            $board.data('rating-loaded', true);
            var threadId =
                $board.attr('data-rating-id');
            if (!threadId)
                return;
            var $up =
                $board.find('.rating-up');
            var $total =
                $board.find('.rating-total');
            var $down =
                $board.find('.rating-down');
            var state = {
                pollId: null,
                upId: null,
                downId: null,
                voted: null,
                up: 0,
                down: 0
            };
            function render() {
                $up.text(state.up);
                $down.text(state.down);
                var total =
                    state.up - state.down;
                $total
                    .removeClass(
                        'rating-positive rating-negative'
                    )
                    .text(
                        '总分 : ' + total
                    );
                if (total > 0)
                    $total.addClass(
                        'rating-positive'
                    );
                if (total < 0)
                    $total.addClass(
                        'rating-negative'
                    );
                $up.removeClass(
                    'rating-voted'
                );
                $down.removeClass(
                    'rating-voted'
                );
                if (state.voted === 'up')
                    $up.addClass(
                        'rating-voted'
                    );
                if (state.voted === 'down')
                    $down.addClass(
                        'rating-voted'
                    );
            }
            function detectVote(poll) {
                var vote =
                    poll.userVote ||
                    poll.myVote ||
                    poll.userVotes;
                if (Array.isArray(vote))
                    vote = vote[0];
                if (
                    vote ==
                    state.upId
                )
                    return 'up';
                if (
                    vote ==
                    state.downId
                )
                    return 'down';
                return null;
            }
            function sendVote(answerId, type) {
                var old =
                    state.voted;
                if (old === type) {
                    if (type === 'up')
                        state.up--;
                    if (type === 'down')
                        state.down--;
                    state.voted = null;
                } else {
                    if (old === 'up')
                        state.up--;
                    if (old === 'down')
                        state.down--;
                    if (type === 'up')
                        state.up++;
                    if (type === 'down')
                        state.down++;
                    state.voted = type;
                }
                render();
                $.ajax({
                    url:
                        mw.util.wikiScript('wikia')
                        +
                        '?controller=DiscussionPoll'
                        +
                        '&method=castVote',
                    type: 'POST',
                    data: {
                        pollId:
                            state.pollId,
                        answerIds:
                            state.voted
                                ?
                                answerId
                                :
                                '0'
                    }
                });
            }
            $.getJSON(
                mw.util.wikiScript('wikia'),
                {
                    controller:
                        'DiscussionThread',
                    method:
                        'getThread',
                    format:
                        'json',
                    threadId:
                        threadId
                }
            ).then(function (data) {
                if (
                    !data ||
                    !data.poll
                )
                    return;
                var poll = data.poll;
                state.pollId =
                    poll.id;
                if (
                    !poll.answers ||
                    poll.answers.length < 2
                )
                    return;
                state.upId =
                    poll.answers[0].id;
                state.downId =
                    poll.answers[1].id;
                /*
                 * 关键：
                 * 永远使用服务器票数
                 */
                state.up =
                    Number(
                        poll.answers[0].votes
                    ) || 0;
                state.down =
                    Number(
                        poll.answers[1].votes
                    ) || 0;
                state.voted =
                    detectVote(poll);
                render();
            });
            $up.click(function () {
                if (!state.upId)
                    return;
                sendVote(
                    state.upId,
                    'up'
                );
            });
            $down.click(function () {
                if (!state.downId)
                    return;
                sendVote(
                    state.downId,
                    'down'
                );
            });
        });
    });
});