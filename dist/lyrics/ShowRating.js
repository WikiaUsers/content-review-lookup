// ShowRating.js by Bobogoobo
// Displays a page's star rating when hovering over a link to it
// OPTIONS: set window.showRatingAlwaysRun to true to run the script on RC and Watchlist
// Please let me know of any problems or suggestions
$(function() {
    if (
        {'Special:RecentChanges':1, 'Special:Watchlist':1}[mw.config.get('wgPageName')] &&
        !window.showRatingAlwaysRun
    ) {
        return;
    }

    // Create regexes etc. for later
    var ns = [
        'User', 'LyricWiki', 'File', 'MediaWiki', 'Template',
        'Help', 'Category', 'Forum', 'User_blog', 'Thread', 'Special'
    ];
    var mainOnly = new RegExp(
        '^(?:Talk|' + ns.join('|') + '|' + ns.join('_talk|') + '_talk' + ')\\:'
    );
    var exceptions = /(?:(?:action|diff|oldid)\=)|\(Disambiguation\)/;
    var getStar = /Category\:(Black|Green|Violet|Bronze|Silver|Gold) (?:Albums|Artists|Songs)/;
    // Stars
    var basePath = window.location.protocol + '//vignette.wikia.nocookie.net/lyricwiki/images/',
        starSize = '/revision/latest/scale-to-width-down/16',
        blackStar = basePath + '6/6e/StarIconBlack.png' + starSize,
        greenStar = basePath + 'a/a2/StarIconGreen.png' + starSize,
        violetStar = basePath + '0/07/StarIconViolet.png' + starSize,
        bronzeStar = basePath + 'f/f4/StarIconBronze.png' + starSize,
        silverStar = basePath + '1/12/StarIconSilver.png' + starSize,
        goldStar = basePath + '7/79/StarIconGold.png' + starSize;
    var starPath = {
         'Black': blackStar, 'Green': greenStar, 'Violet': violetStar,
         'Bronze': bronzeStar, 'Silver': silverStar, 'Gold': goldStar
    };
    
    // Reduce an href to just the page name
    function getPage(href) {
        href = href.replace('/wiki/', '');
        if (href.indexOf('?') !== -1) {
            href = href.substring(0, href.indexOf('?'));
        }
        return href;
    }

    // Return href formatted as a proper id attribute (appended to 'showstar-')
    function normalize(href) {
        return decodeURIComponent(href).toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    $('#mw-content-text a[href^="/wiki/"]').not('.new').on('mouseover', function() {
        var $this = $(this), page = $this.attr('href').replace('/wiki/', '');
        
        // Links that won't have a rating - broadest first
        if (
            mainOnly.test(page) ||// Any namespace other than main
            exceptions.test(page) ||// Diffs, edit links, disambigs
            $this.hasClass('mw-redirect') ||// Redirects
            $this.parent().hasClass('allpagesredirect') ||// Redirects on reports
            $('#showstar-' + normalize(getPage(page))).length// Star is already shown
        ) {
            return;
        }
        page = getPage(page);

        $this.after($('<span />', {
            'class': 'showstar',
            'id': 'showstar-' + normalize(page),
            'style': 'padding-left:0.4em;',
            'html': $('<a />', {
                'href': '/wiki/Talk:' + page,
                'title': 'Talk:' + page.replace(/_/g, ' '),
                'html': $('<img />', {
                    'src': blackStar,
                    'alt': 'Black',
                    'style': 'vertical-align:text-top;'
                })
            })
        }));

        // Note: page is already encoded since it's taken from href
        $.getJSON(
            '/api.php?action=query&prop=categories&cllimit=50&format=json' +
                '&titles=' + page.replace(/_/g, ' '),
            function(cats) {
                var star = 'Black';
                cats = cats.query.pages;
                cats = cats[Object.keys(cats)[0]].categories;
                $.each(cats, function(i, cat) {
                    var match = cat.title.match(getStar);
                    if (match) {
                        star = match[1];
                        return false;
                    }
                });
                var $ss = $this.next();
                if ($ss.length && $ss.hasClass('showstar')) {
                    $ss.find('img').attr('src', starPath[star]).attr('alt', star);
                }
            }
        );
    });

    $('#mw-content-text a[href^="/wiki/"]').not('.new').on('mouseout', function() {
        var page = getPage($(this).attr('href'));
        var $elem = $('#showstar-' + normalize(page));
        if ($elem.length) {
            var to = window.setTimeout(function() {
                if (! $(':hover').hasClass('showstar')) {
                    $elem.remove();
                } else {
                    $elem.on('mouseout', function() {
                        $elem.remove();
                    });
                }
            }, 250);
        }
    });
});