/* Any JavaScript here will be loaded for all users on every page load. */
/* add class to custom tabs when sticky
   author = 919dd
*/
let stickyElm = document.querySelector('.custom-tabs')
let observer = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1], rootMargin: "-47px 0px 0px 0px"}
);
observer.observe(stickyElm)

importArticles({
    type: 'script',
    articles: [
        "u:ru.sword-art-online:MediaWiki:RepeatableTimer.js",
    ]
});

/* MPSlider */
mw.hook('wikipage.content').add(function ($content) {
    $content.find('.mpslider').each(function () {
        var root = this;
        if (root.getAttribute('data-mpslider')) { return; }

        var track = root.querySelector('.mpslider-track');
        if (!track) { return; }
        var count = track.querySelectorAll('.mpslide').length;
        if (count < 2) { return; }
        root.setAttribute('data-mpslider', '1');

        // Load every picture now, so a slide never slides in half loaded.
        var imgs = track.querySelectorAll('img');
        for (var k = 0; k < imgs.length; k++) {
            var lazySrc = imgs[k].getAttribute('data-src');
            if (lazySrc) { imgs[k].setAttribute('src', lazySrc); }
            imgs[k].setAttribute('loading', 'eager');
        }

        var interval = 6000;                      // ms between slides
        var index = 0;
        var timer = null;
        var hovered = false;
        var focused = false;
        var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

        // The dots
        var dotsBox = document.createElement('div');
        dotsBox.className = 'mpslider-dots';
        var dots = [];
        for (var i = 0; i < count; i++) {
            dots.push(makeDot(i));
            dotsBox.appendChild(dots[i]);
        }
        root.appendChild(dotsBox);

        function makeDot(n) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'mpslider-dot';
            b.setAttribute('aria-label', 'Show slide ' + (n + 1));
            b.addEventListener('click', function () {
                go(n);
                restart();
                b.blur();                         // so a mouse click does not leave autoplay paused
            });
            return b;
        }

        function mark(n) {
            index = n;
            for (var j = 0; j < count; j++) {
                dots[j].className = 'mpslider-dot' + (j === n ? ' is-active' : '');
            }
        }

        function go(n) {
            n = (n + count) % count;
            mark(n);
            var left = n * track.clientWidth;
            if (track.scrollTo) {
                track.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
            } else {
                track.scrollLeft = left;
            }
        }

        function tick() {
            if (!hovered && !focused && !document.hidden) { go(index + 1); }
        }
        function start() {
            if (!reduceMotion && !timer) { timer = setInterval(tick, interval); }
        }
        function stop() {
            if (timer) { clearInterval(timer); timer = null; }
        }
        function restart() { stop(); start(); }

        // Keep the dots in step when someone swipes or scrolls the slides themselves.
        var waiting = false;
        track.addEventListener('scroll', function () {
            if (waiting) { return; }
            waiting = true;
            window.requestAnimationFrame(function () {
                waiting = false;
                var n = Math.round(track.scrollLeft / track.clientWidth);
                if (n !== index && n >= 0 && n < count) { mark(n); }
            });
        });

        window.addEventListener('resize', function () {
            track.scrollLeft = index * track.clientWidth;
        });

        // Pause while the mouse is over the slider or something inside it has keyboard focus.
        root.addEventListener('pointerenter', function (e) {
            if (!e.pointerType || e.pointerType === 'mouse') { hovered = true; }
        });
        root.addEventListener('pointerleave', function () { hovered = false; });
        root.addEventListener('focusin', function () { focused = true; });
        root.addEventListener('focusout', function () { focused = false; });

        mark(0);
        start();
    });
});