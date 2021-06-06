(function() {
    if (window.getWikiStatistics) return;
    var cache = {},
        targetClasses = [
        '.outwikistats-articles',
        '.outwikistats-activeusers',
        '.outwikistats-admins',
        '.outwikistats-edits',
        '.outwikistats-images',
    ];

    function getWikiStatistics(targetClass, prop, $content) {
        $content = $content || $(document);
        if (!$content.find(targetClass).length) return;
        mw.log('gws t&p', targetClass, prop, $content.find(targetClass).length);
        $content.find(targetClass).each(function () {
            var proto, wiki,
                $this = $(this);
            $this.children().hide();
            $this.append('<img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" />');
            wiki = $this.text();
            //Maybe add support for https? -Sophie
            proto = (/^https?:\/\/|^\/\//i).exec(wiki);
            proto = proto ? proto[0] : '//';
            wiki = wiki.replace(/^https?:\/+|^\/+/i, '').replace(/\.fandom\.com.*/i, '');
            wiki = proto + encodeURIComponent(wiki) + '.fandom.com';
            // if data request in process
            if (cache[wiki]) {
                // if data in cache
                if (cache[wiki].data) {
                    $this.text(cache[wiki].data[prop]);
                    return;
                }
                cache[wiki].targets.push({c: targetClass, p: prop, t: $this});
                return;
            }
            // create cache
            cache[wiki] = {
                targets: [
                    {c: targetClass, p: prop, t: $this},
                ],
            };
            /*
            if (!(/^https?:\/\//i).test()) {
                wiki = '//' + wiki;
            }
            if (wiki.indexOf('.wikia.com') === -1) {
                wiki = wiki + '.wikia.com';
            }
            */
            ///* disabled due to XSS issue
            mw.log('gws req', wiki, prop);
            $.ajax({
                url: wiki + '/api.php',
                data: {
                    action: 'query',
                    meta: 'siteinfo',
                    siprop: 'statistics',
                    format: 'json'
                },
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                type: 'GET',
                success: function (data) {
                    mw.log('gws data', this, wiki, prop, data, data.query.statistics);
                    data = data.query.statistics;
                    cache[wiki].data = data;
                    cache[wiki].targets.forEach(function(v) {
                        v.t.text(data[v.p]);
                    });
                    /*
                    if ($this.length) {
                        $this.text(data.query.statistics[prop]).show();
                    }
                    */
                }
            });
            //*/
        });
    }
    // backward compatible global getWikiStatistics
    window.getWikiStatistics = getWikiStatistics;
    mw.hook('wikipage.content').add(function ($content) {
        mw.log('gws', targetClasses, $content.find(targetClasses.join(',')).length);
        if (!$content.find(targetClasses.join(',')).length) return;
        targetClasses.forEach(function(v) {
            getWikiStatistics(v, v.replace(/^.*?\-/, ''), $content);
        });
        /*
        getWikiStatistics('.outwikistats-articles', 'articles');
        getWikiStatistics('.outwikistats-activeusers', 'activeusers');
        getWikiStatistics('.outwikistats-admins', 'admins');
        getWikiStatistics('.outwikistats-edits', 'edits');
        getWikiStatistics('.outwikistats-images', 'images');
        */
    });
})();