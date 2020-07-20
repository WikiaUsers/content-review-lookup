(function ($) {
    //if (true) return;
    var nthreshold = 1000; //ms. if el visible >= threshold then play
    var nh = []; //handlers. 1 per span
    var ntimer; //timer 4 comments
    var nbDebug = $.getUrlVar('debug');

    var log = function () {
        log.a = [].slice.call(arguments);
        log.a.unshift('gifv');
        if (nbDebug) console.log.apply(this, log.a);
    };//log
    
    function gguid() {
        return ("00000000" + (Math.random() * Math.pow(36, 6) << 0).toString(16)).slice(-8);
    }//gguid
    
    function _chkSrc(src) {
        //chk src, returns true if src forbidden is
        var hostname;
        try {
            hostname = (new mw.Uri(src)).host;
        }
        catch (exc) {
            //bad uri, ignore it
            hostname = 'wikia.com';
        }
        return (hostname.toLowerCase() === 'images.wikia.com' ? false : hostname.match(/.*?\.wikia\.com/i));
    }//_chksrc
    
    function chkSrc(src) {
        //chk src, returns true if (one of) src forbidden is
        var isTrue = false;
        log('chksrc', src);
        if (typeof(src) === 'string') return _chkSrc(src);
        //something weird happened, disable it
        if (!$.isArray(src)) return true;
        $.each(src, function() {
            isTrue = isTrue || _chkSrc(this);
        });//each src
        return isTrue;
    }//chksrc
    
    function isElementInViewport (el) {
        if (el instanceof jQuery) {
            el = el.get(0);
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= $(window).height() &&
            rect.right <=  $(window).width()
        );
    }//iselementinviewport
    
    function onVisibilityChange(el, nthr, callback) {
        var old_visible = false;
        return function () {
            if (!$(el).is(':visible')) return;
            var visible = isElementInViewport(el);
            if (visible != old_visible) {
                old_visible = visible;
                if (typeof callback == 'function') {
                    callback(el, nthr);
                }
            }
        };
    }//onvisibilitychange
        
    function nplay($el) {
        //is el visible
        log('play', $el);
        $el = $($el);
        if (!$el.is(':visible')) return;
        //is el in viewport
        if (!isElementInViewport($el)) return;
        $el.data('played', true);
        try {
            $el.get(0).play();
        } catch (e) {}
        //play only once. remove handler
        $(window).off('DOMContentLoaded load resize scroll.' + $el.attr('id'));
        return;
    }//nplay
    
    function nqueue(el, nthr) {
        nthr = nthr || nthreshold;
        //if el still visible then el.play
        setTimeout(function(){nplay(el)}, nthr);
    } //nqueue
    
    function ncreatePlayer($el, t, st, ap) {
        //create player.
        //element, type (audio), sourcetype (audio/ogg), additional parameters
        var nuid, k, nthr, data, $newel;
        nuid = gguid();
        ap = ap || '';
        //if (el instanceof jQuery) el = el[0];
        //data = el.dataset || {};
        $el = $($el);
        data = $el.data();
        log('create player', $el, t, st, ap, data);
        $newel = $('<' + t + '>', {
            controls: '',
            loop: '',
            preload: 'none',
            class: 'n' + t,
            id: nuid
        });
        $newel.append($('<source>', {
            src: data.widgetId,
            type: st,
            text: 'Ваш браузер не поддерживает тэг ' + t
        }));
        $newel.attr(ap);
        $el.html($newel);
        //el.innerHTML='<' + t +  ' controls="" ' + ap + ' class="n' + t +'" id="' + nuid + '"><source src="' + encodeURIComponent(data.widgetId) + '" type="' + st + '">Ваш браузер не поддерживает тэг '+ t + '.</' + t + '>';
        //autoplay only if lazyplay is set
        if (data.lazyplay === undefined) return;
        nthr = parseInt(data.lazyplay, 10);
        if (nthr < 100) nthr = nthreshold;
        k = nh.push(1) - 1;
        nh[k] = onVisibilityChange($('#' + nuid), nthr, nqueue);
        //add handler
        $(window).on('DOMContentLoaded load resize scroll.' + nuid, nh[k]);
    } //ncreatePlayer
    
    function process($content) {
        var spans = $content.find('.gifv');//document.getElementsByClassName('gifv');
        log('process', $content, spans);
        //for (var index = 0; index < spans.length; index++) {
        $.each(spans, function() {
            var k, nuid, data, $this;
            $this = $(this);
            data = $this.data() || {};
            if (!data.widgetId || chkSrc(data.widgetId)) {
                return true;
            }
            outerLoop:
            switch ($this.attr('class').split(' ')[0]) {
                case 'Imgur':
                    $this.html('<video controls="" poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none"' + encodeURIComponent(data.widgetAp) + '><source src="http://i.imgur.com/' + encodeURIComponent(data.widgetId) + '.mp4">Ваш браузер не поддерживает тэг video.</video>');
                    break outerLoop;
                case 'Others':
                    //spans[index].innerHTML = '<video controls="" poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none"' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")) + '><source src="' + spans[index].getAttribute("data-widget-id") + '">Ваш браузер не поддерживает тэг video.</video>';
                    ncreatePlayer($this, 'video', 'video/mp4', ' poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none" ' + encodeURIComponent(data.widgetAp));
                    break outerLoop;
                case 'Ogg':
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/ogg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer($this, 'audio', 'audio/ogg', encodeURIComponent(data.widgetAp));
                    break outerLoop;
                case 'MP3':
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/mpeg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer($this, 'audio', 'audio/mp3', encodeURIComponent(data.widgetAp));
                    break outerLoop;
                case 'Image':
                    $this.html('<img class="extimage" src="' + encodeURIComponent(data.widgetId) + '" width="' + encodeURIComponent(data.widgetW) + '" height="' + encodeURIComponent(data.widgetH) + '">');
                    break outerLoop;
                default:
                    break outerLoop;
            } //switch
        }); //for spans
    } //process
    
    //doc.ready
    mw.hook('wikipage.content').add(function($content) {
        process($content); //process already loaded elements
        //w8 4 comments
        clearInterval(ntimer);//remove previous timer (page preview 4)
        ntimer = setInterval(function() {
            if ($content.find('.article-comments').length) {
                clearInterval(ntimer);
                process($content.find('.article-comments'));
            }
        }, 3000);
    }); //doc.reay
})(jQuery);