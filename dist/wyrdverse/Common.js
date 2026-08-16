/* ============================================================
   WYRDVERSE WIKI — COMMON.JS
   Site behaviours that pair with the CSS modules.

   Contents
     1. Live clock            (Mainpage.css .mainpage-clock)
     2. Back-to-top button    (Miscellaneous.css .wv-backtotop)
     3. Spoiler / redacted    (Miscellaneous.css .wv-spoiler,
                               .wv-redacted — click to reveal,
                               for touch where :hover can't)
     4. Relatives groups      (Infoboxes.css .pu-rel-* —
                               collapse/expand family groups)

   Everything is guarded by an existence check, so no block
   errors on pages where its markup isn't present.
   ============================================================ */

$(function () {

    /* --------------------------------------------------------
       1. LIVE CLOCK  (Main Page)
       --------------------------------------------------------
       Markup:
         <div class="mainpage-clock">
           <span id="wiki-clock-time"></span>
           <span id="wiki-clock-date"></span>
           <span class="clock-label">Wyrdverse Standard Time</span>
         </div>
    -------------------------------------------------------- */
    var timeEl = document.getElementById('wiki-clock-time');
    var dateEl = document.getElementById('wiki-clock-date');

    if (timeEl && dateEl) {
        var pad = function (n) { return String(n).padStart(2, '0'); };
        var dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        var tickClock = function () {
            var now = new Date();
            timeEl.textContent =
                pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
            dateEl.textContent = now.toLocaleDateString('en-US', dateOpts);
        };

        tickClock();
        setInterval(tickClock, 1000);
    }

    /* --------------------------------------------------------
       2. BACK-TO-TOP BUTTON
       --------------------------------------------------------
       Injected once, hidden until the reader scrolls down, then
       smooth-scrolls to the top on click. Styled in
       Miscellaneous.css (.wv-backtotop / .is-visible).
    -------------------------------------------------------- */
    if (!document.querySelector('.wv-backtotop')) {
        var toTopBtn = document.createElement('div');
        toTopBtn.className = 'wv-backtotop';
        toTopBtn.setAttribute('role', 'button');
        toTopBtn.setAttribute('tabindex', '0');
        toTopBtn.setAttribute('aria-label', 'Back to top');
        toTopBtn.setAttribute('title', 'Back to top');

        var scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        toTopBtn.addEventListener('click', scrollToTop);
        toTopBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });

        document.body.appendChild(toTopBtn);

        var toggleToTop = function () {
            toTopBtn.classList.toggle('is-visible', window.pageYOffset > 400);
        };
        window.addEventListener('scroll', toggleToTop, { passive: true });
        toggleToTop();
    }

    /* --------------------------------------------------------
       3. SPOILER / REDACTED — click to reveal
       --------------------------------------------------------
       The CSS reveals on :hover for mouse users; this adds a
       tap path for touch. Delegated so it also catches content
       loaded after page ready.
    -------------------------------------------------------- */
    $(document).on('click', '.wv-spoiler, .wv-redacted', function () {
        this.classList.toggle('revealed');
    });

    /* --------------------------------------------------------
       4. RELATIVES GROUPS  (Template:RelGroup)
       --------------------------------------------------------
       Handled natively — RelGroup uses MediaWiki's own
       mw-customtoggle / mw-customcollapsible id pairing, so no
       custom JS belongs here. (A handler on .pu-rel-toggle would
       double-fire against the native one and cancel the click.)
       The [ − ] / [ + ] glyph is driven purely by the
       .pu-rel-group.mw-collapsed state in Infoboxes.css.
    -------------------------------------------------------- */

});