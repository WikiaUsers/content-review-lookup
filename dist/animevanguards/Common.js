// gradient-follow.js — put in Common.js or your gadget
(function () {
    function attachGradientFollowTo(container) {
        // iterate over element children (covers direct child divs even if markup varies)
        Array.from(container.children).forEach(function (row) {
            if (row.nodeType !== 1) return; // skip non-elements

            // ensure default variables exist
            row.style.setProperty('--x', '50%');
            row.style.setProperty('--y', '50%');

            // avoid attaching duplicate handlers
            if (row.__gradientFollowAttached) return;
            row.__gradientFollowAttached = true;

            row.addEventListener('mousemove', function (e) {
                var rect = e.currentTarget.getBoundingClientRect();
                var x = e.clientX - rect.left; // X inside element
                var y = e.clientY - rect.top;  // Y inside element

                var xPercent = Math.round((x / rect.width) * 1000) / 10; // 1 decimal
                var yPercent = Math.round((y / rect.height) * 1000) / 10;

                e.currentTarget.style.setProperty('--x', xPercent + '%');
                e.currentTarget.style.setProperty('--y', yPercent + '%');
            });

            row.addEventListener('mouseleave', function () {
                // smooth reset to center
                e = { currentTarget: row }; // eslint-disable-line no-unused-vars
                row.style.setProperty('--x', '50%');
                row.style.setProperty('--y', '50%');
            });
        });
    }

    function init() {
        var containers = document.querySelectorAll('.tierList_container');
        if (containers.length === 0) {
            console.warn('gradient-follow: no .tierList_container found on page.');
        }
        containers.forEach(function (container) {
            attachGradientFollowTo(container);

            // Observe for added/removed children (useful on wikis with dynamic content)
            var mo = new MutationObserver(function () {
                attachGradientFollowTo(container);
            });
            mo.observe(container, { childList: true, subtree: false });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();