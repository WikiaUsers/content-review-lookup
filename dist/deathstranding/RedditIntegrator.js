if (mw.config.get('wgIsMainPage')) {
    $.getJSON(
        'https://www.reddit.com/r/DeathStranding.json?jsonp=?',
        function foo(data) {
            $.each(
                data.data.children.slice(0, 30),
                function (i, post) {
                    if ($('.ri-linklisting tr').length === 10) {
                        return;
                    } else if (post.data.stickied) {
                        if (post.data.thumbnail === 'self') {
                            $('.ri-linklisting-stickied').append('<div class="ri-link"><div class="ri-link-thumbnail"><a href="' + post.data.url + '" class="self"/></div><div class="ri-link-info"><a href="' + post.data.url + '"><span class="ri-link-title">' + post.data.title + '</span></a></div></div>');

                        } else {
                            $('.ri-linklisting-stickied').append('<div class="ri-link"><div class="ri-link-thumbnail"><a href="' + post.data.url + '">' + '<img src="' + post.data.thumbnail + '"></a></div><div class="ri-link-info"><a href="' + post.data.url + '"><span class="ri-link-title">' + post.data.title + '</span></a></div></div>');
                        }
                    } else if (post.data.thumbnail !== 'self' && !post.data.spoiler && post.data.ups > 20) {
                        $('.ri-linklisting').append('<div class="ri-link"><div class="ri-link-thumbnail"><a href="' + post.data.url + '">' + '<img src="' + post.data.thumbnail + '"></a></div><div class="ri-link-info"><a href="' + post.data.url + '"><span class="ri-link-title">' + post.data.title + '</span></a><div class="ri-link-stats"><span class="upvotes">' + post.data.ups + ' upvotes</span><span> · <a href="https://www.reddit.com' + post.data.permalink + '">' + post.data.num_comments + ' comments</a></span></div></div></div>');
                    }
                }
            );
        }
    );
}