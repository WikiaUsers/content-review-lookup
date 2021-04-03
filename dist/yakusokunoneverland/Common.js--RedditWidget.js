(function() {
    "use-strict";
    mw.hook('wikipage.content').add(function($elem) {
        var enableWidget = document.getElementById("reddit-widget");
        if (enableWidget) {
            fetch('https://www.reddit.com/r/thepromisedneverland.json')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    var post = json.data.children;
                    var config = {
                        subreddit: post[0].data.subreddit
                    };
                    //BIGWRAPPER
                    var $embed_wrap = $('<div class="rembeddit" style="font-family:verdana,arial,helvetica,sans-serif;background-color: #FFFFFF;border: 1px solid #FFFFFF;">');

                    //HEADER
                    var $embed_header = $('<div class="reddit-header" style="padding: 5px; padding-bottom:1px;background-color:#CEE3F8"><h4 class="reddit-title" style="margin:0;padding-bottom:3px">').append([
                        $('<a>', {
                            style: 'margin:5px;',
                            href: 'https://www.reddit.com/r/' + config.subreddit + '/',
                            html: '<img src="https://www.reddit.com/static/spreddit1.gif" alt="" style="border:none">'
                        }),
                        "links from ",
                        $('<a>', {
                            style: 'text-decoration:none;color:#336699',
                            href: 'https://www.reddit.com/r/' + config.subreddit + '/',
                            text: config.subreddit + '.reddit.com'
                        })
                    ]);

                    //CONTENTS
                    var $content_wrap = $('<div style="margin-left:5px;margin-top:7px;">');

                    //Set up left and right column as defined by reddit
                    var $content_inner = [
                        $('<div class="reddit-listing-left" style="float:left;width:47%">'),
                        $('<div class="reddit-listing-right" style="float:right;width:49%;">')
                    ];

                    //Set up class names
                    var class_half = ["first-half", "second-half"];
                    var even_odd = ["even", "odd"];

                    //Loop through all entries
                    for (var i = 0; i < post.length; i++) {
                        //Change focus to e(lement)
                        var e = post[i].data;
                        //Check to see if left or right side
                        var inner_select = 0;
                        if (i > post.length / 2) {
                            inner_select = 1;
                        }
                        //Make Block
                        var div = $('<div>', {
                            class: [
                                "reddit-link",
                                even_odd[i % 2],
                                class_half[inner_select],
                                "thing",
                                "id-" + e.name
                            ].join(' '),
                            html: [
                                $('<a>', {
                                    href: e.url,
                                    class: "reddit-voting-arrows",
                                    target: "_blank",
                                    style: "float:left; display:block;",
                                    html: '<img src="https://www.redditstatic.com/widget_arrows.gif" alt="vote" style="border:none;margin-top:3px;">'
                                }),
                                $('<div>', {
                                    class: 'reddit-entry entry unvoted',
                                    style: "margin-left: 28px; min-height:32px;",
                                    html: [
                                        '<span class="linkflairlabel" style="color: #545454; background-color: #f5f5f5; border: 1px solid #dedede; display: inline-block; font-size: x-small; margin-right: 0.5em; padding: 0 2px; max-width: 10em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + e.link_flair_text + '</span>',
                                        '<a class="reddit-link-title may-blank" style="text-decoration:none;color:#336699;font-size:small;" href="' + e.url + '">' + e.title + '</a>',
                                        '<br><small style="color:gray;"><span class="score unvoted">' + e.score + ' points</span> | <a class="reddit-comment-link may-blank" style="color:gray" href="https://www.reddit.com' + e.permalink + '">' + e.num_comments + ' comments</a></small>',
                                        '<div class="reddit-link-end" style="clear:left; padding:3px;">'
                                    ]
                                })
                            ]
                        });
                        //Add Block to column
                        $content_inner[inner_select].append(div);
                    }
                    //Add final clear
                    $content_inner[1].append('<div style="clear:both">');

                    //Add HEADER and CONTENTS to BIGWRAPPER with a rembeddit-content wrap
                    $embed_wrap.append([
                        $embed_header,
                        $('<div class="rembeddit-content" style="padding:5px;">')
                            .append($content_wrap.append($content_inner))
                    ]);
                    $(enableWidget).append($embed_wrap);
                }).catch(console.error);
        }
    });
})();