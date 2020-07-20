//converts some lists to collapsible ones
(function ($) {
    function convertEl($e) {
        var $el = $e.clone(),
        $toggler = $('<span>', {
                text: $el.text().slice(1),
                class: 'ctgglr collapsed'
            }),
        $ul = $e.next('ul, ol'),
        $wrap = $('<ul>', {
                class: 'cul'
            });
        $wrap.append($toggler);
        $wrap.append($ul);
        $e.replaceWith($wrap);
        $ul.toggle();
    }

    function tgglr(e) {
        e.stopPropagation(); //there are dupl evnts for nested .cul li .cul li
        var $e = $(e.target),
            $ul = $e.parent().next('ul, ol, li');
        if ($e.hasClass('ctgglr')) {
            $e.siblings('ul, ol, li').toggle();
            $e.toggleClass('collapsed expanded');
        } else if ($e.prop('tagName') === 'LI' && $e.find('ul, ol, li').length) {
            if (!$e.children('ul, ol, li').length) return;
            $e.children('ul, ol, li').toggle();
            $e.toggleClass('collapsed expanded');
        }
    }
    mw.hook('wikipage.content').add(function ($content) {
        $content.find(':contains(+)').each(function () {
            var $this = $(this),
            nname = ($this.next().get(0) || {}).nodeName;
            if (!($this.text().startsWith('+') && (nname === 'UL' || nname === 'OL'))) return;
            convertEl($this);
        });
        if (!$content.find('.cul li').length) return;
        $content.find('.cul li').children().each(function() {
            var $this = $(this);
            // collapse if collapsible children found
            if (!$this.find('ul, ol, li').length) return;
            $this.toggle();
            $this.parent().addClass('collapsed');
        });
    });
    mw.util.addCSS('\
        .cul .expanded:before {content:"-"}\
        .cul .collapsed:before {content:"+"}\
        .cul, .WikiaArticle .cul{padding-left:0;margin-left:0}\
        .cul ul, .WikiaArticle .cul ul {list-style-type: none}\
        ');
    $('body').on('click', '.cul li, .ctgglr', tgglr);
})(jQuery);