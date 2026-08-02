/* ============================================================
   BLOOD & DUST WIKI - COMMON.JS

   Paste into MediaWiki:Common.js.

   NOTE: Fandom requires a JavaScript review before custom JS
   runs on a wiki. Submit at Special:Contact once this is in
   place. Until it is approved, nothing below executes and no
   styling breaks - every feature here degrades to an empty
   element.

   Three features:
     1. The frontier clock  - live time and date
     2. The 1870 echo       - today's date, 156 years back
     3. The sealed door     - click-to-reveal spoiler blocks
   ============================================================ */


/* ============================================================
   1 + 2. THE FRONTIER CLOCK
   Pairs with .mainpage-clock styling in Mainpage.css.

   Markup for Template:Clock:

   <div class="mainpage-clock">
     <span id="bd-clock-time"></span>
     <span id="bd-clock-date"></span>
     <span id="bd-clock-frontier"></span>
     <span class="clock-label">The Veil is thinnest after dark</span>
   </div>

   The frontier line prints the same calendar day in 1870,
   which is where Sot is standing right now.
   ============================================================ */

$(function () {
    var FRONTIER_YEAR_OFFSET = 156; /* 2026 - 1870 */

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateClock() {
        var now = new Date();

        var timeString =
            pad(now.getHours()) + ':' +
            pad(now.getMinutes()) + ':' +
            pad(now.getSeconds());

        var dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        var dateString = now.toLocaleDateString('en-US', dateOptions);

        /* Same month and day, 156 years back. Build the date
           explicitly so month lengths and leap days behave. */
        var frontier = new Date(now.getTime());
        frontier.setFullYear(now.getFullYear() - FRONTIER_YEAR_OFFSET);

        var frontierOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        var frontierString = frontier.toLocaleDateString('en-US', frontierOptions);

        $('#bd-clock-time').text(timeString);
        $('#bd-clock-date').text(dateString);
        $('#bd-clock-frontier').text('On the frontier: ' + frontierString);
    }

    if ($('#bd-clock-time').length || $('#bd-clock-frontier').length) {
        updateClock();
        setInterval(updateClock, 1000);
    }
});


/* ============================================================
   3. THE SEALED DOOR
   Click-to-reveal spoiler blocks. Pairs with the .bd-sealed
   styling in Miscellaneous.css and the doorOpen keyframe in
   Animations.css.

   Markup for Template:Sealed:

   <div class="bd-sealed">
     <div class="bd-sealed-label">Sealed. Click to break it.</div>
     <div class="bd-sealed-body">Spoiler text goes here.</div>
   </div>

   Clicking adds .bd-unsealed, which Miscellaneous.css uses to
   run the doorOpen reveal. Keyboard accessible: the block is
   focusable and responds to Enter and Space.
   ============================================================ */

$(function () {
    var $sealed = $('.bd-sealed');

    if (!$sealed.length) {
        return;
    }

    $sealed.each(function () {
        var $block = $(this);

        $block.attr({
            tabindex: 0,
            role: 'button',
            'aria-expanded': 'false'
        });

        function unseal() {
            if ($block.hasClass('bd-unsealed')) {
                return;
            }
            $block
                .addClass('bd-unsealed')
                .attr('aria-expanded', 'true')
                .removeAttr('role');
        }

        $block.on('click', unseal);

        $block.on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                unseal();
            }
        });
    });
});


/* ============================================================
   END OF COMMON.JS
   ============================================================ */