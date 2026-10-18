(function () {
    'use strict';

    if (window.batesNativeLinkTooltipFixV2) {
        return;
    }
    window.batesNativeLinkTooltipFixV2 = true;

    const saved = new WeakMap();

    function articleLink(target) {
        if (!(target instanceof Element)) {
            return null;
        }

        const link = target.closest(
            '#mw-content-text a[href], .mw-parser-output a[href]'
        );

        if (
            !link ||
            link.closest('.mw-editsection') ||
            link.getAttribute('role') === 'button'
        ) {
            return null;
        }

        return link;
    }

    document.addEventListener('mouseover', function (event) {
        const link = articleLink(event.target);

        if (
            !link ||
            link.contains(event.relatedTarget) ||
            saved.has(link)
        ) {
            return;
        }

        const title = link.getAttribute('title');

        if (!title) {
            return;
        }

        const state = {
            title: title,
            hidden: false,
            timer: null
        };

        saved.set(link, state);

        // Let the preview's hover handlers read the title first.
        state.timer = window.setTimeout(function () {
            if (
                !link.isConnected ||
                !link.matches(':hover') ||
                link.getAttribute('title') !== state.title
            ) {
                saved.delete(link);
                return;
            }

            link.dataset.batesLinkTitle = state.title;
            link.setAttribute('title', '');
            state.hidden = true;
        }, 0);

    }, true); // Capture phase: catches events before they bubble.

    document.addEventListener('mouseout', function (event) {
        const link = articleLink(event.target);

        if (!link || link.contains(event.relatedTarget)) {
            return;
        }

        const state = saved.get(link);

        if (!state) {
            return;
        }

        window.clearTimeout(state.timer);

        if (state.hidden && link.getAttribute('title') === '') {
            link.setAttribute('title', state.title);
        }

        saved.delete(link);

    }, true);
})();