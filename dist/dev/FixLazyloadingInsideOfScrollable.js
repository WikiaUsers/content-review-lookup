mw.loader.using('mediawiki').then(function () {
    // fixes image lazyloading inside of the scrollable element
    var base = (window.fng = window.fng || {}),
        rscroll = /(scroll|auto)/i;

    function scrollHandler (e) {
        $(window).trigger('scroll');
    }// handler

    function isScrollable ($el) {
        return rscroll.test($el.css('overflow'));
    }// isScrollable

    function getScrollableParent ($el) {
        if (isScrollable($el)) return $el;
        if ($el.parent().length) return getScrollableParent($el.parent());
    }// getScrollableParent

    function process ($content) {
        var $lzy = $content.find('.lzy');
        if (!$lzy.length) return;
        $lzy.each(function() {
            var $scrollableParent,
                $this = $(this);
            if ($this.closest('.lzyfix').length) return;
            $scrollableParent = getScrollableParent($this);
            if (!$scrollableParent || $scrollableParent.hasClass('lzyfix')) return;
            $scrollableParent.addClass('lzyfix');
            $scrollableParent.on('scroll', scrollHandler);
        });
    }// process

    if (base.lzyfix) return;
    base.lzyfix = process;
    mw.hook('wikipage.content').add(process);
});