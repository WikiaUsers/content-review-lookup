// Ensure ResourceLoader modules are loaded, then add safe toggles & fallback class
mw.loader.using(['mediawiki.util', 'jquery'], function () {
    $(function () {
        // Add fallback class to toggles (only if not already present)
        $('.wds-dropdown__toggle').each(function () {
            var $t = $(this);
            if (!$t.hasClass('chev-fallback')) {
                $t.addClass('chev-fallback');
            }
        });

        // Make sure clicking toggles the is-active class on the dropdown container.
        // Some wikis already do this, but ours will force it so the CSS rotation fires.
        $(document).on('click', '.wds-dropdown__toggle', function (e) {
            var $toggle = $(this);
            var $dropdown = $toggle.closest('.wds-dropdown');

            // Toggle the class
            $dropdown.toggleClass('is-active');

            // Update aria-expanded for accessibility
            var expanded = $dropdown.hasClass('is-active');
            $toggle.attr('aria-expanded', expanded ? 'true' : 'false');
        });

        // If the wiki uses different markup (older), also try binding to other selectors:
        $(document).on('click', '.mw-portlet .menu-button, .top-navigation .menu-toggle', function () {
            var $toggle = $(this);
            var $dropdown = $toggle.closest('.wds-dropdown, .menu, .top-navigation');
            $dropdown.toggleClass('is-active');
        });
    });
});

/* -------------------------------------
   BACK TO TOP BUTTON (JS)
   - Creates the button
   - Shows it only when scrolling down
   - Smooth scroll back to top
   ------------------------------------- */

$(function () {

    // 1. Create the button element and add it to the page
    const btn = $('<div id="back-to-top">↑ Top</div>');
    $('body').append(btn);

    // 2. Show button only when user scrolls down
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 400) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    // 3. Smooth scroll back to the top when clicked
    btn.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 350);
    });

});

/* --- Stub notice with username --- */
/* This script inserts a stub message at the top of pages using Template:Stub
   and automatically fills in the viewer's username. */

$(function () {

    // Fandom provides the username here:
    var user = mw.config.get("wgUserName");

    // If the viewer is logged out, username will be null
    if (!user) {
        user = "there";  // fallback for anonymous readers
    }

    // Find any stub placeholder on the page
    var stubBox = document.querySelector(".kuber-stub-box");

    if (stubBox) {
        stubBox.innerHTML = 
            `Hey <b>${user}</b>, this page is unfinished — you can come back next time!`;
    }

});
/* --- Stub Username Injector ---
   Automatically inserts the viewer's username
   into any element with class="kuber-stub-username"
---------------------------------------------- */

$(function () {
    var user = mw.config.get("wgUserName") || "there";

    // Replace inside all elements meant for the username
    $(".kuber-stub-username").text(user);
});