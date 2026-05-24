/**
 * Flag Toggle Gadget
 * Swaps gallery thumbnails from Ripple.png to Flag.png based on user preference.
 * Updates immediately when preference changes without page reload.
 */
$(function () {
    var $containers = $('.flag-toggle-container');
    if (!$containers.length) return;

    function swapImage(img, toFlag) {
        var $img = $(img);
        ['src', 'srcset', 'data-src', 'data-srcset'].forEach(function (attr) {
            var val = $img.attr(attr);
            if (!val) return;
            var newVal = toFlag
                ? val.replace(/Ripple\.png/gi, 'Flag.png')
                : val.replace(/Flag\.png/gi, 'Ripple.png');
            if (newVal !== val) {
                $img.attr(attr, newVal);
            }
        });
    }

    function applyToAll(toFlag) {
        $containers.find('img').each(function () {
            swapImage(this, toFlag);
        });
    }

    // Get current preference and apply it
    function getPreferenceAndApply() {
        var showingFlag = mw.user.options.get('gadget-flag-toggle') === '1';
        applyToAll(showingFlag);
    }

    // Initial load
    getPreferenceAndApply();

    // Listen for preference changes (when user checks/unchecks the gadget box)
    mw.hook('userjs.prefs').add(function (prefs) {
        if (prefs.hasOwnProperty('gadget-flag-toggle')) {
            getPreferenceAndApply();
        }
    });

    // Also listen for storage events (in case preference changes in another tab)
    window.addEventListener('storage', function (e) {
        if (e.key === 'userjs-gadget-flag-toggle') {
            getPreferenceAndApply();
        }
    });

    // Watch for dynamically added images (lazy-loading)
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mut) {
            mut.addedNodes.forEach(function (node) {
                if (node.nodeType !== 1) return;
                var imgs = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
                Array.from(imgs).forEach(function (img) {
                    var toFlag = mw.user.options.get('gadget-flag-toggle') === '1';
                    if (toFlag) swapImage(img, true);
                });
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});