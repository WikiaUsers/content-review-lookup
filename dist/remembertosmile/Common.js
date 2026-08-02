/* Any JavaScript here will be loaded for all users on every page load. */

/* SFX Toggle */
(function() {
    function init() {
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('.audio-toggle-btn');
            if (!btn) return;
            var controls = btn.closest('.audio-controls');
            if (!controls) return;
            var oggAudio = controls.querySelector('audio.OggPlayer-Audio');
            var mwAudio = controls.querySelector('audio.mw-file-element');
            var audioButton = controls.querySelector('.audio-button');
            var isSwapped = controls.classList.contains('audio-swapped');
            if (!controls.dataset.mwFile1Stored && oggAudio) {
                controls.dataset.mwFile1Stored = oggAudio.src;
            }
            var file1 = controls.dataset.mwFile1Stored;
            var file2 = btn.getAttribute('title');
            if (!file2) return;
            if (audioButton) audioButton.classList.remove('now-playing');
            [oggAudio, mwAudio].forEach(function(el) {
                if (el) { el.pause(); el.currentTime = 0; }
            });
            var newSrc = isSwapped ? file1 : file2;
            if (oggAudio) oggAudio.src = newSrc;
            if (mwAudio) mwAudio.src = newSrc;
            controls.classList.toggle('audio-swapped');
            btn.classList.toggle('active');
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* Auto-cycling Slideshow */
(function () {
    function adjustCounterSpacing(slideshow) {
        var visibleLi = slideshow.querySelector('.wikia-slideshow-images > li:not([style*="display: none"])');
        var toolbar = slideshow.querySelector('.wikia-slideshow-toolbar');
        if (!visibleLi || !toolbar) return;

        var caption = visibleLi.querySelector('.wikia-slideshow-image-caption');
        var captionHeight = caption ? caption.offsetHeight : 0;
        var gap = 3; // space between caption and counter

        toolbar.style.marginTop = (captionHeight + gap) + 'px';
    }

    function adjustArrowSpacing(slideshow) {
        var visibleLi = slideshow.querySelector('.wikia-slideshow-images > li:not([style*="display: none"])');
        var wrapper = slideshow.querySelector('.wikia-slideshow-images-wrapper');
        var prevArrow = slideshow.querySelector('.wikia-slideshow-prev');
        var nextArrow = slideshow.querySelector('.wikia-slideshow-next');
        if (!visibleLi || !wrapper || !prevArrow || !nextArrow) return;

        var img = visibleLi.querySelector('img');
        if (!img) return;

        var wrapperRect = wrapper.getBoundingClientRect();
        var imgRect = img.getBoundingClientRect();
        var gap = 34; // distance from image edge

        var leftSpace = imgRect.left - wrapperRect.left;
        var rightSpace = wrapperRect.right - imgRect.right;

        prevArrow.style.left = (leftSpace - gap) + 'px';
        nextArrow.style.right = (rightSpace - gap) + 'px';
    }

    function adjustSlideshow(slideshow) {
        adjustCounterSpacing(slideshow);
        adjustArrowSpacing(slideshow);
        adjustGlow(slideshow);
    }

    function setupSlideshow(slideshow) {
        adjustSlideshow(slideshow);

        var observer = new MutationObserver(function () {
            adjustSlideshow(slideshow);
        });

        slideshow.querySelectorAll('.wikia-slideshow-images > li').forEach(function (li) {
            observer.observe(li, { attributes: true, attributeFilter: ['style'] });
        });

        window.addEventListener('resize', function () {
            adjustSlideshow(slideshow);
        });
    }

    function autoAdvanceSlideshows() {
        document.querySelectorAll('.wikia-slideshow-next').forEach(function (btn) {
            btn.click();
        });
    }

    function init() {
        document.querySelectorAll('.wikia-slideshow').forEach(setupSlideshow);
        setInterval(autoAdvanceSlideshows, 6000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

function adjustGlow(slideshow) {
    var visibleLi = slideshow.querySelector('.wikia-slideshow-images > li:not([style*="display: none"])');
    if (!visibleLi) return;

    var a = visibleLi.querySelector('a.image');
    var img = visibleLi.querySelector('img');
    if (!a || !img) return;

    a.style.position = 'relative';

    function positionGlow() {
        var glow = a.querySelector('.wikia-slideshow-glow');
        if (!glow) {
            glow = document.createElement('div');
            glow.className = 'wikia-slideshow-glow';
            a.insertBefore(glow, a.firstChild);
        }

        var aRect = a.getBoundingClientRect();
        var imgRect = img.getBoundingClientRect();

        var gw = imgRect.width * 0.92;
        var gh = imgRect.height * 0.92;

        glow.style.width = gw + 'px';
        glow.style.height = gh + 'px';
        glow.style.left = ((imgRect.left - aRect.left) + imgRect.width / 2 - gw / 2) + 'px';
        glow.style.top = ((imgRect.top - aRect.top) + imgRect.height / 2 - gh / 2) + 'px';
    }

    if (img.complete) {
        positionGlow();
    } else {
        img.addEventListener('load', positionGlow, { once: true });
    }
}

(function () {
    function centerAgainstTarget(el) {
        var targetId = el.getAttribute('data-align-target');
        var target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        var img = el.querySelector('.wikia-slideshow-images li:not([style*="display: none"]) img');
        if (!img) return;

        el.style.transform = 'translateY(0px)';
        var targetRect = target.getBoundingClientRect();
        var imgRect = img.getBoundingClientRect();

        var targetCenter = targetRect.top + targetRect.height / 2;
        var imgCenter = imgRect.top + imgRect.height / 2;
        var diff = targetCenter - imgCenter;

        el.style.transform = 'translateY(' + diff + 'px)';
    }

    function centerAll() {
        document.querySelectorAll('.valign-mid').forEach(centerAgainstTarget);
    }

    function init() {
        setInterval(centerAll, 1000);
        window.addEventListener('resize', centerAll);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* Dynamic Background */
(function () {
    if (typeof mw === 'undefined' || !mw.config) return;

    var themedCategories = ['Checking_In', 'Sightseeing', 'Afterparty', 'Aquarium', 'Atlantis', 'Pastel_Reefs', 'Challenger_Deep', 'Wraithmas_2024'];
    var categories = mw.config.get('wgCategories') || [];

    categories.forEach(function (cat) {
        var safeName = cat.replace(/\s+/g, '_');
        document.body.classList.add('cat-' + safeName);
        if (themedCategories.indexOf(safeName) !== -1) {
            document.body.classList.add('has-custom-theme');
        }
    });
})();

/* Item System */
(function () {
    function selectItem(root, panel, item) {
        panel.querySelectorAll('.item-system-item').forEach(function (i) {
            i.classList.remove('selected');
        });
        item.classList.add('selected');

        var contentId = item.getAttribute('data-content-id');
        var store = root.querySelector('.item-system-content-store');
        var contentBox = root.querySelector('.item-system-content');
        if (contentId && store && contentBox) {
            var src = store.querySelector('#' + contentId);
            if (src) {
                contentBox.innerHTML = src.innerHTML;
            }
        }
    }

    function initItemSystem(root) {
        var tabs = root.querySelectorAll('.item-system-tab');
        var panels = root.querySelectorAll('.item-system-panel');

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                panels.forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');

                var target = root.querySelector('.item-system-panel[data-panel="' + tab.dataset.tab + '"]');
                if (!target) return;
                target.classList.add('active');

                var current = target.querySelector('.item-system-item.selected') || target.querySelector('.item-system-item');
                if (current) selectItem(root, target, current);
            });
        });

        panels.forEach(function (panel) {
            var items = panel.querySelectorAll('.item-system-item');
            items.forEach(function (item) {
                item.addEventListener('click', function () {
                    selectItem(root, panel, item);
                });
            });
        });

        var activePanel = root.querySelector('.item-system-panel.active') || panels[0];
        if (activePanel) {
            var initial = activePanel.querySelector('.item-system-item.selected') || activePanel.querySelector('.item-system-item');
            if (initial) selectItem(root, activePanel, initial);
        }
    }

    var tooltip;
    function ensureTooltip() {
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'item-system-tooltip';
            document.body.appendChild(tooltip);
        }
        return tooltip;
    }

    function positionTooltip(e, tip) {
        var offset = 14;
        tip.style.left = (e.clientX + offset) + 'px';
        tip.style.top = (e.clientY + offset) + 'px';
    }

    function initTooltips(root) {
        var items = root.querySelectorAll('.item-system-item[data-tooltip]');
        items.forEach(function (item) {
            item.addEventListener('mouseenter', function (e) {
                var tip = ensureTooltip();
                tip.textContent = item.getAttribute('data-tooltip');
                tip.style.display = 'block';
                positionTooltip(e, tip);
            });
            item.addEventListener('mousemove', function (e) {
                if (tooltip) positionTooltip(e, tooltip);
            });
            item.addEventListener('mouseleave', function () {
                if (tooltip) tooltip.style.display = 'none';
            });
        });
    }

    function init() {
        document.querySelectorAll('.item-system-wrapper').forEach(function (root) {
            initItemSystem(root);
            initTooltips(root);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();