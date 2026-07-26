(function () {
    'use strict';

    if (window.shortcutToolLoaded) return;
    window.shortcutToolLoaded = true;

    const HIJACKED_KEYS = new Set(['e', 'h', 'd', 'p', 'f', 'n', 'c', 'j', 'a', 's', 'm', 'w']);

    const COMBOS = {
        'a+e': () => {
            const editLink = document.querySelector('#ca-edit a');
            if (editLink) window.location.href = editLink.href;
        },
        'a+s': () => {
            if (isEditPage()) {
                const saveBtn = document.querySelector('#wpSave');
                if (saveBtn) saveBtn.click();
            }
        },
        'a+m': () => {
            window.location.href = '/zh/wiki/Special:%E7%A7%BB%E5%8A%A8%E9%A1%B5%E9%9D%A2/' + getPageName();
        },
        'a+h': () => {
            window.location.href = '/zh/wiki/' + getPageName() + '?action=history';
        },
        'a+d': () => {
            window.location.href = '/zh/wiki/' + getPageName() + '?action=delete';
        },
        'a+p': () => {
            window.location.href = '/zh/wiki/' + getPageName() + '?action=protect';
        },
        'e+s': () => {
            window.open('/zh/wiki/', '_blank');
        },
        'f+s': () => {
            window.location.href = '/zh/f';
        },
        'n+s': () => {
            const toggle = document.querySelector('.notifications__toggle');
            if (toggle) toggle.click();
        },
        'c+s': () => {
            window.open(window.location.href, '_blank');
        },

        's+j': () => {
            window.location.href = '/zh/wiki/MediaWiki:Common.js';
        },
        's+c': () => {
            window.location.href = '/zh/wiki/MediaWiki:Common.css';
        }
    };

    const TOGGLE_COMBO = 'm+w';

    let shortcutMode = true;
    let keysPressed = {};
    let scrollInterval = null;
    let scrollSpeed = 0;
    const baseSpeed = 15;
    const acceleration = 1.5;
    const maxSpeed = 100;

    function isInputFocused() {
        const el = document.activeElement;
        if (!el) return false;
        const tag = el.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
    }

    function isEditPage() {
        return document.querySelector('#wpSave') !== null;
    }

    function getPageName() {
        if (typeof mw !== 'undefined' && mw.config) {
            return mw.config.get('wgPageName');
        }
        const path = window.location.pathname;
        const match = path.match(/\/wiki\/(.+)/);
        return match ? match[1] : '';
    }

    function getCurrentCombo() {
        return Object.keys(keysPressed).sort().join('+');
    }

    function startScrolling(direction) {
        if (scrollInterval) return;
        scrollSpeed = baseSpeed;
        function scrollStep() {
            window.scrollBy(0, direction * scrollSpeed);
            scrollSpeed = Math.min(scrollSpeed + acceleration, maxSpeed);
            scrollInterval = requestAnimationFrame(scrollStep);
        }
        scrollInterval = requestAnimationFrame(scrollStep);
    }

    function stopScrolling() {
        if (scrollInterval) {
            cancelAnimationFrame(scrollInterval);
            scrollInterval = null;
            scrollSpeed = 0;
        }
    }

    document.addEventListener('keydown', function (e) {
        var key = e.key.toLowerCase();

        if (e.repeat) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (!HIJACKED_KEYS.has(key)) return;
     
        if (!shortcutMode || isInputFocused()) {
            if (key in keysPressed) delete keysPressed[key];
            return;
        }

        keysPressed[key] = true;
        var currentCombo = getCurrentCombo();
        if (currentCombo === TOGGLE_COMBO) {
            e.preventDefault();
            e.stopImmediatePropagation();
            shortcutMode = !shortcutMode;
            keysPressed = {}; 
            stopScrolling();
            return;
        }

        if (COMBOS.hasOwnProperty(currentCombo)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            COMBOS[currentCombo]();
            keysPressed = {};
            return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

    }, true);

    document.addEventListener('keyup', function (e) {
        var key = e.key.toLowerCase();
        if (key in keysPressed) {
            delete keysPressed[key];
        }
    });

    window.addEventListener('blur', function () {
        keysPressed = {};
        stopScrolling();
    });

    function nukeMwNativeShortcuts() {
        if (typeof $ !== 'undefined' && $.fn.off) {
            $(document).off('keydown.accesskey');
            $(document).off('keydown.mw-accesskey');
            $(document).off('keydown.accessKey');
        }
    }

    function destroyDomAccessKeys() {
        var selector = Array.from(HIJACKED_KEYS)
            .map(function (k) { return '[accesskey="' + k + '"]'; })
            .join(',');
        if (!selector) return;
        document.querySelectorAll(selector).forEach(function (el) {
            el.removeAttribute('accesskey');
        });
    }

    nukeMwNativeShortcuts();
    destroyDomAccessKeys();

    if (typeof mw !== 'undefined' && mw.hook) {
        mw.hook('wikipage.content').add(function () {
            nukeMwNativeShortcuts();
            destroyDomAccessKeys();
        });
    }
})();