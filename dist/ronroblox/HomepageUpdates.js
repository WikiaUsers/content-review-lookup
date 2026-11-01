/* =============================================
   HOMEPAGE UPDATES — PANEL SWITCHER
   ============================================= */
(function() {
    var STORAGE_KEY = 'ron-homepage-updates-panel';

    function initHomepageUpdatesToggle() {
        var buttons = document.querySelectorAll('.homepage-toggle-buttons .hp-toggle-btn');
        if (!buttons.length) return;

        function activate(target) {
            var panel = document.getElementById('hp-panel-' + target);
            if (!panel) return false;

            document.querySelectorAll('.hp-panel').forEach(function(p) {
                p.classList.remove('hp-panel-active');
            });
            buttons.forEach(function(b) {
                b.classList.toggle('hp-toggle-active', b.getAttribute('data-panel') === target);
            });

            panel.classList.add('hp-panel-active');
            return true;
        }

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var target = this.getAttribute('data-panel');
                if (!target) return;
                if (activate(target)) {
                    try { localStorage.setItem(STORAGE_KEY, target); } catch (e) {}
                }
            });
        });

        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) activate(saved);
        } catch (e) {}
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomepageUpdatesToggle);
    } else {
        initHomepageUpdatesToggle();
    }
})();