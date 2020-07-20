(function ($) {
    //if (true) return;
    var nthreshold = 1000; //ms. if el visible >= threshold then play
    var nh=[]; //handlers. 1 per span
    var ntimer; //timer 4 comments

    function gguid() {
        return ("00000000" + (Math.random()*Math.pow(36,6) << 0).toString(16)).slice(-8);
    }//gguid
    
    function isElementInViewport (el) {
        if (el instanceof jQuery) {
            el = el[0];
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
        var old_visible=false;
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
        
    function nplay(el) {
        //is el visible
        if (!$(el).is(':visible')) return;
        //is el in viewport
        if (!isElementInViewport(el)) return;
        el.data('played', true);
        try {
            el[0].play();
        } catch (e){}
        //play only once. remove handler
        $(window).off('DOMContentLoaded load resize scroll.'+el[0].id);
        return;
    }//nplay
    
    function nqueue(el, nthr) {
        nthr = nthr || nthreshold;
        //if el still visible then el.play
        setTimeout(function(){nplay(el)}, nthr);
    } //nqueue
    
    function ncreatePlayer(el, t, st, ap) {
        //create player.
        //element, type (audio), sourcetype (audio/ogg), additional parameters
        var nuid, k, nthr;
        nuid=gguid();
        ap = ap || '';
        if (el instanceof jQuery) el = el[0];
        el.innerHTML='<' + t +  ' controls="" ' + ap + ' class="n' + t +'" id="' + nuid + '"><source src="' + el.getAttribute("data-widget-id") + '" type="' + st + '">Ваш браузер не поддерживает тэг '+ t + '.</' + t + '>';
        //autoplay only if lazyplay is set
        if ($(el).data('lazyplay') === undefined) return;
        nthr = parseInt($(el).data('lazyplay'), 10);
        if (nthr < 100) nthr = nthreshold;
        k=nh.push(1) - 1;
        nh[k]=onVisibilityChange($('#' + nuid), nthr, nqueue);
        //add handler
        $(window).on('DOMContentLoaded load resize scroll.' + nuid, nh[k]);
    } //ncreatePlayer
    
    function process() {
        var k, nuid;
        var spans = document.getElementsByTagName("span");
        for (var index = 0; index < spans.length; index++) {
            if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
            outerLoop:
            switch (spans[index].className.split(' ')[0]) {
                case "Imgur":
                    spans[index].innerHTML = '<video controls="" poster="https://images.wikia.nocookie.net/battleborn/ru/images/2/24/Заглушка_Пуск.png" loop preload="none"' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")) + '><source src="http://i.imgur.com/' + encodeURIComponent(spans[index].getAttribute("data-widget-id")) + '.mp4">Ваш браузер не поддерживает тэг video.</video>';
                    break outerLoop;
                case "Others":
                    //spans[index].innerHTML = '<video controls="" poster="https://images.wikia.nocookie.net/borderlands/ru/images/e/e0/ЗаглушкаGIFV.png" loop preload="none"' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")) + '><source src="' + spans[index].getAttribute("data-widget-id") + '">Ваш браузер не поддерживает тэг video.</video>';
                    ncreatePlayer(spans[index], 'video', 'video/mp4', ' poster="https://images.wikia.nocookie.net/battleborn/ru/images/2/24/Заглушка_Пуск.png" loop preload="none" ' + encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "Ogg":
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/ogg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer(spans[index], 'audio', 'audio/ogg', encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "MP3":
                    //spans[index].innerHTML = '<audio controls '+ spans[index].getAttribute("data-widget-ap") + '><source src="' + spans[index].getAttribute("data-widget-id") +'" type="audio/mpeg">Ваш браузер не поддерживает тэг audio.</audio>';
                    ncreatePlayer(spans[index], 'audio', 'audio/mp3', encodeURIComponent(spans[index].getAttribute("data-widget-ap")));
                    break outerLoop;
                case "Image":
                    spans[index].innerHTML = '<img class="extimage" src="' + spans[index].getAttribute("data-widget-id") + '" width="' + encodeURIComponent(spans[index].getAttribute("data-widget-w")) + '" height="' + encodeURIComponent(spans[index].getAttribute("data-widget-h")) + '">';
                    break outerLoop;
                default:
                    break outerLoop;
            } //switch
        } //if..outerloop
        } //for spans
    } //process
    
    //doc.ready
    $(function(){
        process(); //process already loaded elements
        //w8 4 comments
        ntimer=setInterval(function() {
            var naComs = 0;
            naComs = $('.article-comments').length || naComs;
            if (naComs > 0) {
                clearInterval(ntimer);
                process();
            }
        }, 3000);
    }); //doc.reay
})(jQuery);