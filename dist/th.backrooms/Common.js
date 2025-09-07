// [[Category:Internal]]

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link:'Help:Bots', order: -1 },
		bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true }; // no edits for 90 days and/or no edits at all = inactive
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;

// Fade-in
var fadeinclass = document.getElementsByClassName("fadeintext");
    for(var i = 0; i < fadeinclass.length; i++) {
        var sec = (i/4).toString();
        fadeinclass[i].style.animation = "fadeInAnimation ease 1.5s";
        fadeinclass[i].style.animationDelay = sec.concat("s");
        fadeinclass[i].style.animationIterationCount = "1";
        fadeinclass[i].style.animationFillMode = "forwards";
}

// Credits to https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Common.js

$('.fandom-community-header__community-name-wrapper').append(
	$('<a/>').attr('href', '//community.fandom.com/wiki/Fandom_Compass').append(
		$('<img/>').addClass('hover-community-header-wrapper').css('height', '60px').css('position', 'relative').css('top', '10px')
		.attr('src', 'https://static.wikia.nocookie.net/speedstorm/images/a/a2/FandomCompass-Banner-Light.png/revision/latest/scale-to-width-down/100?cb=20230404145009').attr('title', 'This wiki is part of Fandom Compass')
));

// Credits to Hexirp for vote system

/*

== VoteGadget2024 ==

VoteGadget2024 は Hexirp が 2024 年に作成したプログラムです。 VoteGadget2024 のライセンスは Apache License 2.0 と CC BY 4.0 のデュアルライセンスです。

*/

function get_vote_data_vote_gadget_2024(api, vote_data_page_name, callback) {
    api
    .get({ action: 'parse', page: vote_data_page_name, prop: 'wikitext', format: 'json' })
    .done(function (result) {
        console.log('VoteGadget2024: 投票データの取得が成功しました。');

        var vote_data = JSON.parse(result.parse.wikitext['*']);

        if (vote_data['vote-data-type'] == 'VoteGadget2024') {
            console.log('VoteGadget2024: 投票データの型が正規です。');

            callback(vote_data);
        } else {
            console.log('VoteGadget2024: 投票データの型が不正です。');
        }
    })
    .fail(function () {
        console.log('VoteGadget2024: 投票データの取得が失敗しました。');

        var vote_data = { 'vote-data-type': 'VoteGadget2024', 'vote-data-list': [] };

        callback(vote_data);
    });
}

function update_result_vote_gadget_2024(vote_data) {
    var vote_data_list = vote_data['vote-data-list'];

    var vote_result = 0;

    vote_data_list.forEach(function (vote) {
        if (vote['vote-type'] == 'up-vote') {
            vote_result = vote_result + 1;
        }

        if (vote['vote-type'] == 'down-vote') {
            vote_result = vote_result - 1;
        }
    });

    $('.vote-gadget-2024-result').text(JSON.stringify(vote_result));
}

$(function () {
    console.log('VoteGadget2024: 処理を開始します。');

    $('.vote-gadget-2024').html(
        '<span class="vote-gadget-2024-box">'
        +
        '<div class="vote-gadget-2024-result-box">評価:&nbsp;<span class="vote-gadget-2024-result">0</span></div>'
        +
        '<button type="button" aria-label="プラス票を投じる" class="vote-gadget-2024-up-vote-button">+</button>'
        +
        '<button type="button" aria-label="マイナス票を投じる" class="vote-gadget-2024-down-vote-button">−</button>'
        +
        '<button type="button" aria-label="ニュートラル票を投じる" class="vote-gadget-2024-neutral-vote-button">±</button>'
        +
        '<button type="button" aria-label="投票を取り消す" class="vote-gadget-2024-cancel-button">✗</button>'
        +
        '</span>'
    );

    var page_name = mw.config.get('wgPageName');
    var user_name = mw.config.get('wgUserName');

    var vote_data_page_name = page_name + '/vote.json';

    mw.loader.using('mediawiki.api').then(function () {
        var api = new mw.Api();

        get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (vote_data) {
            update_result_vote_gadget_2024(vote_data);

            $('.vote-gadget-2024-up-vote-button').click(function () {
                console.log('VoteGadget2024: プラス票を投じる処理を開始します。');

                // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                var confimed_flag = window.confirm('あなたは [' + user_name + '] としてプラス票を投じようとしています。よろしいですか？');

                if (confimed_flag) {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がプラス票を投じる処理を承認しました。');

                    get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (new_vote_data) {
                        var new_vote_data_list = new_vote_data['vote-data-list'];

                        var yet_voted_flag = true;

                        new_vote_data_list.forEach(function (vote) {
                            if (vote['vote-user'] == user_name) {
                                vote['vote-type'] = 'up-vote';
                                yet_voted_flag = false;
                            }
                        });

                        if (yet_voted_flag) {
                            new_vote_data_list.push({ 'vote-user': user_name, 'vote-type': 'up-vote' });
                            yet_voted_flag = false;
                        }

                        var new_vote_data_text = JSON.stringify(new_vote_data, null, 4);

                        // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                        var summary_text = '&#91;[[User:' + user_name + '|' + user_name + ']]&#93; が VoteGadget2024 を使用してプラス票を投じました。';

                        api
                        .postWithEditToken({
                            action: 'edit'
                            ,
                            title: vote_data_page_name
                            ,
                            text: new_vote_data_text
                            ,
                            summary: summary_text
                            ,
                            minor: true
                        })
                        .done(function (result) {
                            console.log('VoteGadget2024: プラス票を投じる処理が成功しました。');

                            get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (updated_vote_data) {
                                update_result_vote_gadget_2024(updated_vote_data);
                            });
                        })
                        .fail(function () {
                            console.log('VoteGadget2024: プラス票を投じる処理が失敗しました。');

                            window.alert('プラス票を投じる処理が失敗しました。');
                        });
                    });
                } else {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がプラス票を投じる処理を拒否しました。');
                }
            });

            $('.vote-gadget-2024-down-vote-button').click(function () {
                console.log('VoteGadget2024: マイナス票を投じる処理を開始します。');

                // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                var confimed_flag = window.confirm('あなたは [' + user_name + '] としてマイナス票を投じようとしています。よろしいですか？');

                if (confimed_flag) {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がマイナス票を投じる処理を承認しました。');

                    get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (new_vote_data) {
                        var new_vote_data_list = new_vote_data['vote-data-list'];

                        var yet_voted_flag = true;

                        new_vote_data_list.forEach(function (vote) {
                            if (vote['vote-user'] == user_name) {
                                vote['vote-type'] = 'down-vote';
                                yet_voted_flag = false;
                            }
                        });

                        if (yet_voted_flag) {
                            new_vote_data_list.push({ 'vote-user': user_name, 'vote-type': 'down-vote' });
                            yet_voted_flag = false;
                        }

                        var new_vote_data_text = JSON.stringify(new_vote_data, null, 4);

                        // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                        var summary_text = '&#91;[[User:' + user_name + '|' + user_name + ']]&#93; が VoteGadget2024 を使用してマイナス票を投じました。';

                        api
                        .postWithEditToken({
                            action: 'edit'
                            ,
                            title: vote_data_page_name
                            ,
                            text: new_vote_data_text
                            ,
                            summary: summary_text
                            ,
                            minor: true
                        })
                        .done(function (result) {
                            console.log('VoteGadget2024: マイナス票を投じる処理が成功しました。');

                            get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (updated_vote_data) {
                                update_result_vote_gadget_2024(updated_vote_data);
                            });
                        })
                        .fail(function () {
                            console.log('VoteGadget2024: マイナス票を投じる処理が失敗しました。');

                            window.alert('マイナス票を投じる処理が失敗しました。');
                        });
                    });
                } else {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がマイナス票を投じる処理を拒否しました。');
                }
            });

            $('.vote-gadget-2024-neutral-vote-button').click(function () {
                console.log('VoteGadget2024: ニュートラル票を投じる処理を開始します。');

                // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                var confimed_flag = window.confirm('あなたは [' + user_name + '] としてニュートラル票を投じようとしています。よろしいですか？');

                if (confimed_flag) {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がニュートラル票を投じる処理を承認しました。');

                    get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (new_vote_data) {
                        var new_vote_data_list = new_vote_data['vote-data-list'];

                        var yet_voted_flag = true;

                        new_vote_data_list.forEach(function (vote) {
                            if (vote['vote-user'] == user_name) {
                                vote['vote-type'] = 'neutral-vote';
                                yet_voted_flag = false;
                            }
                        });

                        if (yet_voted_flag) {
                            new_vote_data_list.push({ 'vote-user': user_name, 'vote-type': 'neutral-vote' });
                            yet_voted_flag = false;
                        }

                        var new_vote_data_text = JSON.stringify(new_vote_data, null, 4);

                        // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                        var summary_text = '&#91;[[User:' + user_name + '|' + user_name + ']]&#93; が VoteGadget2024 を使用してニュートラル票を投じました。';

                        api
                        .postWithEditToken({
                            action: 'edit'
                            ,
                            title: vote_data_page_name
                            ,
                            text: new_vote_data_text
                            ,
                            summary: summary_text
                            ,
                            minor: true
                        })
                        .done(function (result) {
                            console.log('VoteGadget2024: ニュートラル票を投じる処理が成功しました。');

                            get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (updated_vote_data) {
                                update_result_vote_gadget_2024(updated_vote_data);
                            });
                        })
                        .fail(function () {
                            console.log('VoteGadget2024: ニュートラル票を投じる処理が失敗しました。');

                            window.alert('ニュートラル票を投じる処理が失敗しました。');
                        });
                    });
                } else {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] がニュートラル票を投じる処理を拒否しました。');
                }
            });
        
            $('.vote-gadget-2024-cancel-button').click(function () {
                console.log('VoteGadget2024: 投票を取り消す処理を開始します。');

                // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                var confimed_flag = window.confirm('あなたは [' + user_name + '] として投票を取り消そうとしています。よろしいですか？');

                if (confimed_flag) {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] が投票を取り消す処理を承認しました。');

                    get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (new_vote_data) {
                        var new_vote_data_list = new_vote_data['vote-data-list'];

                        new_vote_data_list = new_vote_data_list.filter(function (vote) {
                            return vote['vote-user'] != user_name;
                        });

                        new_vote_data['vote-data-list'] = new_vote_data_list;

                        var new_vote_data_text = JSON.stringify(new_vote_data, null, 4);

                        // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                        var summary_text = '&#91;[[User:' + user_name + '|' + user_name + ']]&#93; が VoteGadget2024 を使用して投票を取り消しました。';

                        api
                        .postWithEditToken({
                            action: 'edit'
                            ,
                            title: vote_data_page_name
                            ,
                            text: new_vote_data_text
                            ,
                            summary: summary_text
                            ,
                            minor: true
                        })
                        .done(function (result) {
                            console.log('VoteGadget2024: 投票を取り消す処理が成功しました。');

                            get_vote_data_vote_gadget_2024(api, vote_data_page_name, function (updated_vote_data) {
                                update_result_vote_gadget_2024(updated_vote_data);
                            });
                        })
                        .fail(function () {
                            console.log('VoteGadget2024: 投票を取り消す処理が失敗しました。');

                            window.alert('投票を取り消す処理が失敗しました。');
                        });
                    });
                } else {
                    // ユーザーの名前に使用できない文字であるため、 "[" と "]" を使用している。
                    console.log('VoteGadget2024: [' + user_name + '] が投票を取り消す処理を拒否しました。');
                }
            });
        });
    });
});