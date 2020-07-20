if($('.FANDOM_articles').exists()) {
    tmplURL = '/api.php?' + $.param({
        action: 'query',
        titles: 'MediaWiki:Custom-FANDOM Articles.mustache',
        prop: 'revisions',
        rvprop: 'content',
        format: 'json',
        indexpageids: true,
        v: Math.round(Math.random() * 10)
    });
    $.getJSON(tmplURL, function(rev) {
        template = rev.query.pages[rev.query.pageids[0]].revisions[0]['*'];
        Mustache.parse(template);
        $.getJSON('http://fandom.wikia.com/wp-json/wp/v2/posts?categories=100',function(data) {
            $('.FANDOM_articles').empty();
            data.forEach(function(post) {
                $.getJSON(post._links['wp:attachment'][0].href, function(img) {
                    postData = {
                       title: post.title.rendered,
                       content: post.content.rendered,
                       description: post.excerpt.rendered,
                       slug: post.slug,
                       published: post.date,
                       id: post.id,
                       link: post.link,
                       picture: img[0].source_url.replace(/\/{2}/g,'/').replace(/\/$/,'')
                    };
                    $('.FANDOM_articles').append(
                        Mustache.render(template, postData)
                    );
                });
            });
			$("time.timeago").timeago();
        });
    });
}