/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    // sorts gfeeds by date. probably
    function sortRss($c) {
        var $sorted,
            $ul = $c.find('>ul')
            $lis = $ul.find('>li');
        if (!$c.length || !$lis.length) return;
        // prepare to sort
        $lis.each(function() {
            var $this = $(this),
                txt = $this.text().trim(),
                date = /\((.*?)\)$/.exec(txt);
            try {
                date = new Date(date[1]);
            } catch (ex) {
                date = null;
            }
            if (!date) return;
            $this.data('date', date.toJSON());
        });
        // sort it
        $lis.sort(function(v1, v2) {
            return (new Date($(v1).data('date')) > new Date($(v2).data('date'))) ? -1 : 1;
        });
        $ul.find('>li').remove();
        $ul.append($lis);
    }
    function w84rss($container) {
        var counter = 0,
            timer = setInterval(function() {
                var me = timer,
                    $c = $container.find('.wikiaRss');
                if ($c.length || counter++ > 1000) clearInterval(me);
                $c.each(function(){sortRss($(this))});
            }, 100);
    }
    if (!$content.find('.wikiaRssPlaceholder').length) return;
    w84rss($content);
});