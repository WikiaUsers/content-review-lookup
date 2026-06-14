/* =========================================================
   YIANDELHM UNIVERSAL PORTAL SLIDER SYSTEM
   Works with:
   portal_content-1, portal_content-2, ...
   portal_sliderlink-1, portal_sliderlink-2, ...

   Main portal:
   portal_content-1  = Ana Menü
   portal_content-2  = Karakterler
   portal_content-3  = Krallıklar
   ...

   Timeline:
   portal_content-101 = Ana Zaman Çizelgesi
   portal_content-102 = Birinci Çağ
   ========================================================= */

(function () {
    function findSliderWrapper(target) {
        var wrapper = target.parentElement;

        while (wrapper) {
            var contents = wrapper.querySelectorAll('[id^="portal_content-"]');

            if (contents.length > 0) {
                return wrapper;
            }

            wrapper = wrapper.parentElement;
        }

        return null;
    }

    function showPortalContent(targetId) {
        var target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        var wrapper = findSliderWrapper(target);

        if (!wrapper) {
            return;
        }

        var contents = wrapper.querySelectorAll('[id^="portal_content-"]');

        contents.forEach(function (content) {
            if (content.id === targetId) {
                content.style.display = 'block';
                content.classList.add('portal_content_active');
            } else {
                content.style.display = 'none';
                content.classList.remove('portal_content_active');
            }
        });
    }

    function bindClassLinks() {
        var contents = document.querySelectorAll('[id^="portal_content-"]');

        contents.forEach(function (content) {
            var number = content.id.replace('portal_content-', '');
            var links = document.querySelectorAll('.portal_sliderlink-' + number);

            links.forEach(function (link) {
                if (link.classList.contains('yiandelhm-slider-ready')) {
                    return;
                }

                link.classList.add('yiandelhm-slider-ready');
                link.style.cursor = 'pointer';

                link.addEventListener('click', function (event) {
                    event.preventDefault();

                    var targetId = 'portal_content-' + number;
                    showPortalContent(targetId);

                    try {
                        history.replaceState(null, '', '#' + targetId);
                    } catch (e) {}
                });
            });
        });
    }

    function bindAnchorLinks() {
        var anchorLinks = document.querySelectorAll('a[href^="#portal_content-"]');

        anchorLinks.forEach(function (link) {
            if (link.classList.contains('yiandelhm-anchor-ready')) {
                return;
            }

            link.classList.add('yiandelhm-anchor-ready');

            link.addEventListener('click', function (event) {
                var targetId = link.getAttribute('href').replace('#', '');

                if (!document.getElementById(targetId)) {
                    return;
                }

                event.preventDefault();
                showPortalContent(targetId);

                try {
                    history.replaceState(null, '', '#' + targetId);
                } catch (e) {}
            });
        });
    }

    function openInitialPanels() {
        var sliders = [];

        var portalSlider = document.getElementById('portal_slider');
        var timelineSlider = document.getElementById('timeline_slider');

        if (portalSlider) {
            sliders.push({
                wrapper: portalSlider,
                defaultId: 'portal_content-1'
            });
        }

        if (timelineSlider) {
            sliders.push({
                wrapper: timelineSlider,
                defaultId: 'portal_content-101'
            });
        }

        sliders.forEach(function (slider) {
            var contents = slider.wrapper.querySelectorAll('[id^="portal_content-"]');

            if (!contents.length) {
                return;
            }

            contents.forEach(function (content) {
                if (content.id === slider.defaultId) {
                    content.style.display = 'block';
                    content.classList.add('portal_content_active');
                } else {
                    content.style.display = 'none';
                    content.classList.remove('portal_content_active');
                }
            });
        });

        var hash = window.location.hash.replace('#', '');

        if (hash && document.getElementById(hash) && hash.indexOf('portal_content-') === 0) {
            showPortalContent(hash);
        }
    }

    function initYiandelhmPortalSliders() {
        bindClassLinks();
        bindAnchorLinks();
        openInitialPanels();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initYiandelhmPortalSliders);
    } else {
        initYiandelhmPortalSliders();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function () {
            initYiandelhmPortalSliders();
        });
    }
})();