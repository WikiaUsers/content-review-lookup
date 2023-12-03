(function() {
    $('a[data-uncrawlable-url]').each(function() {
        var $this = $(this);
        $this
            .attr('href', atob($this.attr('data-uncrawlable-url')))
            .removeAttr('data-uncrawlable-url')
            .off('mousedown');
    });
    $('a').each(function(_, el) {
        el = $(el);
        if (el.attr('href')) {
            try {
                var url = new mw.Uri(el.attr('href'));
                if (url.query.action === 'edit' && url.query.redlink) {
                    delete url.query.action;
                    delete url.query.redlink;
                    el.attr('href', url.toString());
                }
            } catch(e) {
                // rip
            }
        }
    });
})();