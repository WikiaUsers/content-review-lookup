/* ============================================================
   Community Activations Portal — MediaWiki:Common.js
   Append this block to MediaWiki:Common.js on
   communityactivations.fandom.com

   Follows the same self-contained IIFE pattern as the
   James Taylor wiki widgets. Only runs on pages that contain
   .ca-section (i.e. the main page).
   ============================================================ */

(function () {
    'use strict';

    /* Only run when the portal is present */
    if (!document.querySelector('.ca-section')) return;

    /* ── 1. Twinkling stars in the hero ── */
    (function () {
        var container = document.getElementById('ca-stars');
        if (!container) return;
        var colors = ['#AFA9EC','#FAC775','#9FE1CB','#ED93B1','#EEEDFE','#F0997B','#5DCAA5','#fff'];
        for (var i = 0; i < 24; i++) {
            var s = document.createElement('div');
            s.className = 'ca-star';
            s.style.left               = (Math.random() * 96).toFixed(1) + '%';
            s.style.top                = (Math.random() * 88).toFixed(1) + '%';
            s.style.background         = colors[i % colors.length];
            s.style.animationDelay     = (Math.random() * 2.5).toFixed(2) + 's';
            s.style.animationDuration  = (1.4 + Math.random()).toFixed(2) + 's';
            container.appendChild(s);
        }
    }());

    /* ── 2. Scroll-entrance animations + HP bar triggers ── */
    (function () {
        var sections = document.querySelectorAll('.ca-section');
        if (!sections.length) return;

        /* Opt the page into entrance animations now that JS is running */
        var portal = document.querySelector('.ca-hero');
        if (portal && portal.parentNode) {
            portal.parentNode.classList.add('ca-animated');
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add('ca-visible');
                /* Animate any HP bars inside this section */
                e.target.querySelectorAll('.ca-hp-fill').forEach(function (bar) {
                    setTimeout(function () {
                        bar.style.width = (bar.getAttribute('data-w') || '80') + '%';
                    }, 200);
                });
                io.unobserve(e.target);
            });
        }, { threshold: 0.08 });

        sections.forEach(function (el) { io.observe(el); });
    }());

    /* ── 3. Coin animation (appreciation section) ── */
    (function () {
        var container = document.getElementById('ca-coins');
        if (!container) return;
        var colors = ['#FAC775','#EF9F27','#F0997B','#ED93B1','#9FE1CB'];

        setInterval(function () {
            var coin = document.createElement('div');
            coin.className = 'ca-coin';
            coin.style.background = colors[Math.floor(Math.random() * colors.length)];
            coin.style.left       = (6 + Math.random() * 36).toFixed(0) + 'px';
            coin.style.bottom     = '0';
            container.appendChild(coin);
            setTimeout(function () {
                if (coin.parentNode) coin.parentNode.removeChild(coin);
            }, 1300);
        }, 520);
    }());

    /* ── 4. Smooth-scroll CTA buttons ── */
    (function () {
        document.querySelectorAll('.ca-scroll-to').forEach(function (btn) {
            function go() {
                var id = btn.getAttribute('data-target');
                var target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
            btn.addEventListener('click', go);
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
            });
        });
    }());

    /* ── 5. Radio buttons ── */
    document.querySelectorAll('.ca-radio').forEach(function (opt) {
        opt.addEventListener('click', function () {
            var group = opt.getAttribute('data-group');
            document.querySelectorAll('.ca-radio[data-group="' + group + '"]').forEach(function (o) {
                o.classList.remove('ca-radio-sel');
                var dot = o.querySelector('.ca-rdot');
                if (dot) dot.classList.remove('ca-rdot-on');
            });
            opt.classList.add('ca-radio-sel');
            var dot = opt.querySelector('.ca-rdot');
            if (dot) dot.classList.add('ca-rdot-on');
        });
    });

    /* ── 6. Checkboxes ── */
    document.querySelectorAll('.ca-check').forEach(function (opt) {
        opt.addEventListener('click', function () {
            var box = opt.querySelector('.ca-cbox');
            if (box) box.classList.toggle('ca-cbox-on');
        });
    });

    /* ── 7. Submit button + confetti ── */
    var submitBtn  = document.getElementById('ca-submit');
    var confirmBox = document.getElementById('ca-confirm');

    if (submitBtn && confirmBox) {
        /* Inject confetti keyframes once */
        if (!document.getElementById('ca-kf')) {
            var kf = document.createElement('style');
            kf.id = 'ca-kf';
            kf.textContent =
                '@keyframes ca-spark-out{' +
                '0%{opacity:1;transform:translate(0,0) scale(1)}' +
                '100%{opacity:0;transform:translate(var(--ca-tx,0px),var(--ca-ty,-40px)) scale(0)}}';
            document.head.appendChild(kf);
        }

        function handleSubmit() {
            confirmBox.classList.add('ca-show');
            confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

            submitBtn.textContent         = '✓ Sent — thanks!';
            submitBtn.style.background    = '#1D9E75';
            submitBtn.style.borderColor   = '#085041';
            submitBtn.style.boxShadow     = '4px 4px 0 #085041';

            /* Confetti burst */
            var cols = ['#534AB7','#FAC775','#5DCAA5','#F0997B','#AFA9EC','#1D9E75','#D4537E','#EF9F27'];
            for (var i = 0; i < 16; i++) {
                (function (idx) {
                    var p = document.createElement('div');
                    var tx = ((Math.random() - 0.5) * 150).toFixed(0);
                    var ty = (-(40 + Math.random() * 70)).toFixed(0);
                    p.className = 'ca-spark';
                    p.style.background      = cols[idx % cols.length];
                    p.style.left            = (10 + Math.random() * 80).toFixed(0) + '%';
                    p.style.bottom          = '0';
                    p.style.setProperty('--ca-tx', tx + 'px');
                    p.style.setProperty('--ca-ty', ty + 'px');
                    p.style.animation       = 'ca-spark-out .95s ease-out ' + (idx * 0.055).toFixed(2) + 's forwards';
                    confirmBox.appendChild(p);
                    setTimeout(function () {
                        if (p.parentNode) p.parentNode.removeChild(p);
                    }, 1400);
                }(i));
            }
        }

        submitBtn.addEventListener('click', handleSubmit);
        submitBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSubmit(); }
        });
    }

}());