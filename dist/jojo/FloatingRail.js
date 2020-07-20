$(function () {
    
    'use strict';
    
    if ($('#WikiaRail').css('display') !== 'block' || !$('#floating-start').length) return;
    
    var start = $('#floating-start'),
        stop  = $('#floating-stop');
        
    if (!stop.length) stop = $('#WikiaFooter');
    
    var win = $(window), toc;
    
    toc = (function () {
        var self = start,
            tocTop = self.offset().top,
            tocHeight = self.height(),
            winHeight = win.height(),
            relTop = 60;
        return {
            node: self,
            top: tocTop,
            relTop: relTop,
            scrollStart: tocTop - relTop,
            scrollStop: stop.offset().top - winHeight - tocHeight - relTop * 2, 
            fixed: false,
            setFixed: function () {
                if (this.fixed) return;
                this.node.css({
                    top: this.relTop + 'px',
                    position: 'fixed'
                });
                this.fixed = true;
            },
            setAbsolute: function (top) {
                if (!this.fixed) return;
                this.node.css({
                    top: top + 'px',
                    position: 'absolute'
                });
                this.fixed = false;
            },
            position: function () {
                var scrollTop = win.scrollTop();
                if (scrollTop >= toc.scrollStop) {
                    toc.setAbsolute(toc.scrollStop);
                } else if (scrollTop >= toc.scrollStart) {
                    toc.setFixed();
                } else {
                    toc.setAbsolute(toc.top);
                }
            }
        };
    }());
    
    toc.node
    .appendTo(document.body)
    .css({
        position: 'absolute',
        top: toc.top + 'px',
        left: '50%',
        marginLeft: '180px',
        zIndex: '100000',
        width: '335px',
        height: toc.height + 'px',
        display: 'block'
    });
    
    toc.position();
    win.scroll(toc.position);
});