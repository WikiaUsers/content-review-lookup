(function($) {
    window.Skins = {
        timeouts: {},
        intervals: {},
        init: function(ss) {
            ss = $(ss);
            if(ss.hasClass('skins-slideshow-initialized')) return;
            
            var hashed = Skins.handleHash.call(ss, location.hash);
            
            ss.find('.skins-slideshow-prev').click(function() { Skins.prevSkin.call(ss) });
            ss.find('.skins-slideshow-next').click(function() { Skins.nextSkin.call(ss) });
            ss.find('.skins-slideshow-controls span').click(function() { Skins.showSkin.call(ss, $(this).data('id')) });
            
            ss.find('img').each(function() { // Remove Lazy Loading
                $(this).attr('src', $(this).data('src'));
                $(this).removeClass('lzy').removeClass('lzyTrns').removeClass('lzyPlcHld').attr('onload', '');
            });
            Skins.timeouts[ss.attr('id')] = false;
            Skins.intervals[ss.attr('id')];
            if(!ss.data('disable-leanback')) {
                ss.mouseout(function() { Skins.leanbackTimerStart.call(ss, 10000) });
                ss.mouseover(function() { Skins.leanbackTimerStop.call(ss) });
                if(!hashed) Skins.leanbackTimerStart.call(ss, 5000);
            }
            if(ss.hasClass('resizable')) {
                Skins.resizeSlideshow.call(ss, ss.parent().width());
                $(window).on('resize', function() {
                    Skins.resizeSlideshow.call(ss, ss.parent().width());
                });
            }
            $(window).on('hashchange', function(e) {
                if(Skins.handleHash.call(ss, location.hash)) e.preventDefault();
            });
            return ss.addClass('skins-slideshow-initialized');
        },
        handleHash: function(hash) {
            var ss = $(this);
            var elem = ss.find(hash.replace(/\./g, '\\.').replace(/\:/g, '\\:').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\~/g, '\\~'));
            if(!elem.length) return false;
            Skins.leanbackTimerStop.call(ss);
            var hashLI = elem.closest('.skin-slide');
            if(hashLI.data('id')) {
                Skins.showSkin.call(ss, hashLI.data('id'));
                ss[0].scrollIntoView();
                return true;
            }
            return false;
        },
        resizeSlideshow: function(width) {
            var ss = $(this);
            width = Math.min(Math.max(width || ss.parent().width(), 200), 1221);
            
            W = width-6;
            H = Math.round(W*0.59);
            
            slideW = W+'px';
            slideH = H+'px';
            
            ss.width(slideW).height(slideH);
            ss.find('.skins-slideshow-list').width(slideW).height(slideH).css('line-height', slideH);
            ss.find('.skin-image img').each(function() {
                var rx = /(scale-to-width-down)\/([0-9]+)/;
                var oldW = rx.exec(this.src);
                if(oldW && oldW[2] < W) this.src = this.src.replace(rx, '$1/' + W);
            });
        },
        leanbackTimerStart: function(delay) {
            var ss = $(this);
            if(ss.attr('id') in Skins.timeouts && Skins.timeouts[ss.attr('id')]) window.clearTimeout(Skins.timeouts[ss.attr('id')]);
            Skins.timeouts[ss.attr('id')] = window.setTimeout(function(){ Skins.leanbackStart.call(ss) }, delay);
        },
        leanbackTimerStop: function() {
            var ss = $(this);
            if(ss.attr('id') in Skins.timeouts && Skins.timeouts[ss.attr('id')]) window.clearTimeout(Skins.timeouts[ss.attr('id')]);
            if(ss.attr('id') in Skins.intervals && Skins.intervals[ss.attr('id')]) window.clearInterval(Skins.intervals[ss.attr('id')]);
            if(ss.hasClass('skins-slideshow-leanback'));
                Skins.leanbackStop.call(ss);
        },
        leanbackStart: function() {
            var ss = $(this);
            ss.addClass('skins-slideshow-leanback');
            Skins.intervals[ss.attr('id')] = window.setInterval(function(){ Skins.nextSkin.call(ss) }, 5000);
            
            ss.find('.skin-caption, .skin-price, .skins-slideshow-counter').stop(true, false).animate({opacity:0}, 500);
            ss.find('.skins-slideshow-prev, .skins-slideshow-next').stop(true, false).animate({opacity:0}, 500);
            ss.find('.skins-slideshow-controls').stop(true, false).animate({opacity:0.5}, 500);
        },
        leanbackStop: function() {
            var ss = $(this);
            ss.removeClass('skins-slideshow-leanback');
            ss.find('.skin-caption, .skin-price, .skins-slideshow-counter').stop(true, false).animate({opacity:1}, 250);
            ss.find('.skins-slideshow-prev, .skins-slideshow-next').stop(true, false).animate({opacity:0.5}, 250, function() { $(this).css('opacity', '') });
            ss.find('.skins-slideshow-controls').stop(true, false).animate({opacity:1}, 250);
        },
        prevSkin: function() { Skins.showSkin.call(this, $(this).data('current-skin')-1) },
        nextSkin: function() { Skins.showSkin.call(this, $(this).data('current-skin')+1) },
        showSkin: function(next) {
            var ss = $(this);
            if(ss.hasClass('skins-slideshow-disabled')) return false;
            var count = parseInt(ss.data('skin-count'), 10);
            next = ((((next-1)%count)+count)%count)+1; // http://javascript.about.com/od/problemsolving/a/modulobug.htm
            var current = parseInt(ss.data('current-skin'), 10);
            if(next == current) return true; // Same skin - no change needed
            
            var currentLI = ss.find('#'+ss.attr('id')+'-skin-'+current);
            var nextLI = ss.find('#'+ss.attr('id')+'-skin-'+next);
            ss.find('#'+ss.attr('id')+'-counter').html(next);
            
            ss.addClass('skins-slideshow-disabled');
            if(next > current) { // Current is on higher layer
                nextLI.show();
                Skins.setCtrl.call(ss, nextLI.data('id'));
                currentLI.fadeOut(500, function() {
                    ss.data('current-skin', nextLI.data('id'));
                    ss.removeClass('skins-slideshow-disabled');
                });
            } else { // Next is on higher layer
                Skins.setCtrl.call(ss, nextLI.data('id'));
                nextLI.fadeIn(500, function() {
                    currentLI.hide();
                    ss.data('current-skin', nextLI.data('id'));
                    ss.removeClass('skins-slideshow-disabled');
                });
            }
        },
        setCtrl: function(id) {
            $(this).find('.skins-slideshow-controls span').removeClass('active');
            $(this).find('#'+$(this).attr('id')+'-skin-'+id+'-ctrl').addClass('active');
        },
    };
    $(function() {
        $('.skins-slideshow').each(function() { Skins.init($(this)); });
        $(window).on('EditPageAfterRenderPreview', function(e, preview) {
            preview.find('.skins-slideshow').each(function() { Skins.init($(this)); });
        });
    });
})(jQuery);