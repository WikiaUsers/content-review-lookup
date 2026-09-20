/* ============================================================================
 * MY THREE WIVES ARE BEAUTIFUL VAMPIRES WIKI — COMMON.JS
 * CLEAN CONSOLIDATED VERSION
 *
 * Includes:
 *   01. Reading progress / Back-to-top / section-link controls
 *   02. Article hover previews
 *       - Automatically skipped inside the homepage Character Directory
 *   03. Elderblood affiliation badge
 *   04. Lineage viewer with Fit / manual zoom
 *       - Duplicate older lineage implementation removed
 *   05. Homepage character portrait floating pop-out
 *
 * Replace the ENTIRE contents of MediaWiki:Common.js with this file.
 * ============================================================================ */

(function () {
    'use strict';
    if (!window.mw || window.__mtwCommonLoaded) { return; }
    window.__mtwCommonLoaded = true;

    var CFG = {
        progressMinHeight: 1200,
        topOffset: 700,
        previewShowDelay: 260,
        previewHideDelay: 220,
        previewChars: 380,
        apiChars: 600,
        thumbSize: 600,
        gap: 14
    };

    var article, bar, fill, topButton, statusNode, frame, articleObserver;
    var card, media, image, titleNode, extractNode, eyebrow, openLink;
    var current = null, pending = null, hoverTimer = null, hideTimer = null, serial = 0;
    var keyboardInput = false, restoringFocus = false, apiReady = null;
    var cache = new Map();
    var hoverQuery = window.matchMedia ? window.matchMedia('(any-hover: hover)') : null;
    var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var cardSelector = '.gallerybox,.wikia-gallery-item,.mtw-relic-card,.mtw-lore-card,.mtw-home-character-card,.category-page__member,.category-page__trending-page';

    function normalPage() {
        return mw.config.get('wgAction') === 'view' &&
            mw.config.get('wgNamespaceNumber') >= 0 &&
            document.body && !document.body.classList.contains('ve-activated');
    }

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) { n.className = cls; }
        if (text !== undefined) { n.textContent = text; }
        return n;
    }

    function contains(parent, child) {
        return !!(parent && child && child.nodeType && parent.contains(child));
    }

    function announce(text) {
        if (statusNode) { statusNode.textContent = text; }
    }

    function safeFocus(node) {
        if (!node || !node.isConnected || typeof node.focus !== 'function') { return false; }
        try { node.focus({ preventScroll: true }); }
        catch (e) { try { node.focus(); } catch (ignore) { return false; } }
        return document.activeElement === node;
    }

    function scheduleUpdate() {
        if (frame) { return; }
        frame = requestAnimationFrame(function () {
            frame = null;
            if (!bar || !fill || !topButton) { return; }

            var active = normalPage() && article && article.isConnected;
            var showTop = !!active && window.scrollY > CFG.topOffset;

            topButton.hidden = !showTop;
            topButton.classList.toggle('mtw-back-to-top--visible', showTop);

            if (!active) {
                bar.hidden = true;
                fill.style.width = '0%';
                return;
            }

            var rect = article.getBoundingClientRect();

            bar.hidden = rect.height < CFG.progressMinHeight;

            if (bar.hidden) {
                fill.style.width = '0%';
                return;
            }

            var available = rect.height - innerHeight;

            var pct = available > 0 ?
                Math.max(0, Math.min(100, (-rect.top / available) * 100)) :
                0;

            fill.style.width = pct + '%';
        });
    }

    function initControls() {
        bar = el('div');
        bar.id = 'mtw-reading-progress';
        bar.setAttribute('aria-hidden', 'true');

        fill = el('div');
        fill.id = 'mtw-reading-progress__fill';

        bar.appendChild(fill);

        topButton = el('button');
        topButton.id = 'mtw-back-to-top';
        topButton.type = 'button';
        topButton.title = 'Back to top';
        topButton.setAttribute('aria-label', 'Back to top');
        topButton.hidden = true;

        var arrow = el('span', '', '↑');

        arrow.setAttribute('aria-hidden', 'true');

        topButton.appendChild(arrow);

        statusNode = el('div');
        statusNode.id = 'mtw-common-status';
        statusNode.setAttribute('role', 'status');
        statusNode.setAttribute('aria-live', 'polite');

        statusNode.style.cssText =
            'position:absolute;width:1px;height:1px;overflow:hidden;' +
            'clip-path:inset(50%);white-space:nowrap;';

        document.body.appendChild(bar);
        document.body.appendChild(topButton);
        document.body.appendChild(statusNode);

        topButton.addEventListener('click', function () {
            var h1 = document.querySelector('h1');

            if (h1) {
                var old = h1.getAttribute('tabindex');

                h1.tabIndex = -1;

                safeFocus(h1);

                h1.addEventListener('blur', function restore() {
                    if (old === null) {
                        h1.removeAttribute('tabindex');
                    } else {
                        h1.setAttribute('tabindex', old);
                    }

                    h1.removeEventListener('blur', restore);
                });
            }

            window.scrollTo({
                top: 0,
                behavior:
                    reduceQuery && reduceQuery.matches ?
                        'auto' :
                        'smooth'
            });
        });

        addEventListener('scroll', function () {
            scheduleUpdate();
            hidePreview();
        }, {
            passive: true
        });

        addEventListener('resize', function () {
            scheduleUpdate();

            if (current) {
                positionCard();
            }
        }, {
            passive: true
        });
    }

    function initSectionLinks(root) {
        if (!root || !root.querySelectorAll) {
            return;
        }

        root.querySelectorAll('h2,h3').forEach(function (heading) {
            var headline =
                heading.querySelector('.mw-headline[id]') ||
                heading;

            if (
                !headline.id ||
                heading.querySelector('.mtw-section-link')
            ) {
                return;
            }

            var button =
                el('button', 'mtw-section-link', '#');

            var label =
                'Copy link to ' +
                headline.textContent.trim();

            button.type = 'button';
            button.title = label;
            button.setAttribute('aria-label', label);

            button.addEventListener('click', function () {
                var url =
                    new URL(location.href);

                url.hash =
                    headline.id;

                button.disabled =
                    true;

                var p =
                    navigator.clipboard &&
                    isSecureContext ?
                        navigator.clipboard.writeText(
                            url.href
                        ) :
                        Promise.reject();

                p.then(function () {
                    button.textContent =
                        '✓';

                    button.classList.add(
                        'mtw-section-link--copied'
                    );

                    announce(
                        'Section link copied.'
                    );

                    setTimeout(function () {
                        button.textContent =
                            '#';

                        button.classList.remove(
                            'mtw-section-link--copied'
                        );
                    }, 1300);
                }).catch(function () {
                    prompt(
                        'Copy this section link:',
                        url.href
                    );
                }).finally(function () {
                    button.disabled =
                        false;
                });
            });

            heading.appendChild(
                button
            );
        });
    }

    function articleTitle(anchor) {
        if (
            !anchor ||
            !anchor.href ||
            anchor.closest('.mtw-no-preview') ||
            anchor.classList.contains('new')
        ) {
            return null;
        }

        try {
            var u =
                new URL(
                    anchor.href,
                    location.href
                );

            var action =
                u.searchParams.get(
                    'action'
                );

            if (
                u.origin !== location.origin ||
                u.pathname.indexOf('/wiki/') !== 0 ||
                (action && action !== 'view') ||
                u.searchParams.has('diff') ||
                u.searchParams.has('oldid')
            ) {
                return null;
            }

            var name =
                decodeURIComponent(
                    u.pathname.slice(6)
                )
                    .replace(/_/g, ' ')
                    .trim();

            if (!name) {
                return null;
            }

            var prefix =
                name
                    .split(':')[0]
                    .toLowerCase()
                    .replace(/ /g, '_');

            var ns =
                mw.config.get(
                    'wgNamespaceIds'
                ) || {};

            if (
                name.indexOf(':') !== -1 &&
                (
                    Object.prototype.hasOwnProperty.call(
                        ns,
                        prefix
                    ) ||
                    /^(file|image|media|special|category|template|mediawiki|user|user_talk|talk|help|forum|project|module)$/.test(
                        prefix
                    )
                )
            ) {
                return null;
            }

            return name;
        } catch (e) {
            return null;
        }
    }

    function imageLink(img) {
        var direct =
            img &&
            img.closest('a[href]');

        if (articleTitle(direct)) {
            return direct;
        }

        var box =
            img &&
            (
                img.closest(cardSelector) ||
                img.closest('figure,.thumb')
            );

        if (!box) {
            return null;
        }

        var links =
            Array.from(
                box.querySelectorAll(
                    'a[href]'
                )
            ).filter(function (a) {
                return !!articleTitle(a);
            });

        var names =
            new Set(
                links.map(articleTitle)
            );

        return names.size === 1 ?
            links[0] :
            null;
    }

    function triggerFor(target) {
        if (
            !target ||
            !target.closest ||
            target.closest('.mtw-no-preview') ||
            target.closest('.mtw-home-characters')
        ) {
            return null;
        }

        var img =
            target.closest('img');

        var anchor =
            target.closest('a[href]');

        if (!img && anchor) {
            img =
                anchor.querySelector('img');
        }

        if (img) {
            var linked =
                imageLink(img);

            if (linked) {
                return {
                    anchor: linked,

                    node:
                        img.closest('a[href]') ||
                        img,

                    image: img
                };
            }
        }

        if (
            anchor &&
            articleTitle(anchor) &&
            (
                anchor.closest(
                    '.mtw-character-directory-nav'
                ) ||
                anchor.classList.contains(
                    'mtw-preview-link'
                )
            )
        ) {
            return {
                anchor: anchor,
                node: anchor,
                image: null
            };
        }

        return null;
    }

    function shorten(text) {
        text =
            (text || '')
                .replace(/\s+/g, ' ')
                .trim();

        if (!text) {
            return (
                'Open the article to read more.'
            );
        }

        if (
            text.length <=
            CFG.previewChars
        ) {
            return text;
        }

        return (
            text
                .slice(
                    0,
                    CFG.previewChars
                )
                .replace(
                    /\s+\S*$/,
                    ''
                ) ||
            text.slice(
                0,
                CFG.previewChars
            )
        ) + '…';
    }

    function getApi() {
        if (!apiReady) {
            apiReady =
                Promise.resolve(
                    mw.loader.using(
                        'mediawiki.api'
                    )
                ).then(function () {
                    return new mw.Api();
                }).catch(function (e) {
                    apiReady = null;
                    throw e;
                });
        }

        return apiReady;
    }

    function previewData(name) {
        if (cache.has(name)) {
            return cache.get(name);
        }

        var p =
            getApi().then(
                function (api) {
                    return api.get({
                        action: 'query',
                        format: 'json',
                        titles: name,
                        redirects: 1,
                        prop: 'extracts|pageimages',
                        exintro: 1,
                        explaintext: 1,
                        exchars:
                            CFG.apiChars,
                        piprop:
                            'thumbnail',
                        pithumbsize:
                            CFG.thumbSize
                    });
                }
            ).then(function (data) {
                var pages =
                    data &&
                    data.query &&
                    data.query.pages;

                var page =
                    pages &&
                    pages[
                        Object.keys(
                            pages
                        )[0]
                    ];

                if (
                    !page ||
                    page.missing !== undefined ||
                    page.invalid !== undefined
                ) {
                    throw new Error(
                        'Article unavailable'
                    );
                }

                return {
                    title:
                        page.title ||
                        name,

                    extract:
                        page.extract ||
                        '',

                    thumbnail:
                        page.thumbnail &&
                        page.thumbnail.source ||
                        ''
                };
            }).catch(function (e) {
                cache.delete(name);
                throw e;
            });

        cache.set(
            name,
            p
        );

        if (
            cache.size >
            100
        ) {
            cache.delete(
                cache.keys().next().value
            );
        }

        return p;
    }

    function createCard() {
        if (card) {
            return;
        }

        card =
            el('div');

        card.id =
            'mtw-hover-preview';

        card.hidden =
            true;

        card.setAttribute(
            'role',
            'region'
        );

        card.setAttribute(
            'aria-labelledby',
            'mtw-hover-preview-title'
        );

        card.style.position =
            'fixed';

        card.style.maxWidth =
            'calc(100vw - 28px)';

        card.style.maxHeight =
            'calc(100vh - 28px)';

        card.style.overflowY =
            'auto';

        media =
            el(
                'div',
                'mtw-hover-preview__media'
            );

        image =
            el(
                'img',
                'mtw-hover-preview__image'
            );

        image.alt =
            '';

        var placeholder =
            el(
                'div',
                'mtw-hover-preview__placeholder',
                'MTW'
            );

        placeholder.setAttribute(
            'aria-hidden',
            'true'
        );

        image.addEventListener(
            'load',
            function () {
                media.classList.add(
                    'mtw-hover-preview__media--has-image'
                );

                if (current) {
                    positionCard();
                }
            }
        );

        image.addEventListener(
            'error',
            function () {
                media.classList.remove(
                    'mtw-hover-preview__media--has-image'
                );
            }
        );

        media.appendChild(
            image
        );

        media.appendChild(
            placeholder
        );

        var body =
            el(
                'div',
                'mtw-hover-preview__body'
            );

        eyebrow =
            el(
                'div',
                'mtw-hover-preview__eyebrow'
            );

        titleNode =
            el(
                'div',
                'mtw-hover-preview__title'
            );

        titleNode.id =
            'mtw-hover-preview-title';

        extractNode =
            el(
                'div',
                'mtw-hover-preview__extract'
            );

        openLink =
            el(
                'a',
                'mtw-hover-preview__open',
                'View article'
            );

        body.appendChild(
            eyebrow
        );

        body.appendChild(
            titleNode
        );

        body.appendChild(
            extractNode
        );

        body.appendChild(
            openLink
        );

        card.appendChild(
            media
        );

        card.appendChild(
            body
        );

        document.body.appendChild(
            card
        );

        card.addEventListener(
            'mouseenter',
            cancelHide
        );

        card.addEventListener(
            'mouseleave',
            scheduleHide
        );

        card.addEventListener(
            'focusin',
            cancelHide
        );

        card.addEventListener(
            'focusout',
            function (e) {
                if (
                    !contains(
                        card,
                        e.relatedTarget
                    )
                ) {
                    scheduleHide();
                }
            }
        );
    }

    function setImage(src) {
        media.classList.remove(
            'mtw-hover-preview__media--has-image'
        );

        image.removeAttribute(
            'src'
        );

        if (!src) {
            return;
        }

        try {
            var u =
                new URL(
                    src,
                    location.href
                );

            if (
                /^https?:$/.test(
                    u.protocol
                )
            ) {
                image.src =
                    u.href;
            }
        } catch (e) {
            /* Keep placeholder. */
        }
    }

    function positionCard() {
        if (
            !current ||
            !card ||
            card.hidden ||
            !current.node.isConnected
        ) {
            return;
        }

        var r =
            current.node
                .getBoundingClientRect();

        var w =
            card.offsetWidth;

        var h =
            card.offsetHeight;

        var g =
            CFG.gap;

        var left;
        var top;
        var side;

        if (
            innerWidth -
            r.right >=
            w + g
        ) {
            left =
                r.right + g;

            top =
                r.top +
                (
                    r.height -
                    h
                ) / 2;

            side =
                'right';
        } else if (
            r.left >=
            w + g
        ) {
            left =
                r.left -
                w -
                g;

            top =
                r.top +
                (
                    r.height -
                    h
                ) / 2;

            side =
                'left';
        } else {
            left =
                r.left +
                (
                    r.width -
                    w
                ) / 2;

            top =
                r.bottom +
                g;

            side =
                'below';

            if (
                top + h >
                innerHeight -
                g
            ) {
                top =
                    r.top -
                    h -
                    g;

                side =
                    'above';
            }
        }

        [
            'right',
            'left',
            'below',
            'above'
        ].forEach(function (s) {
            card.classList.toggle(
                'mtw-hover-preview--' +
                    s,

                s === side
            );
        });

        card.style.left =
            Math.round(
                Math.max(
                    g,
                    Math.min(
                        left,
                        innerWidth -
                        w -
                        g
                    )
                )
            ) + 'px';

        card.style.top =
            Math.round(
                Math.max(
                    g,
                    Math.min(
                        top,
                        innerHeight -
                        h -
                        g
                    )
                )
            ) + 'px';
    }

    function cancelHide() {
        clearTimeout(
            hideTimer
        );

        hideTimer =
            null;
    }

    function hidePreview() {
        clearTimeout(
            hoverTimer
        );

        cancelHide();

        pending =
            null;

        serial++;

        if (card) {
            card.classList.remove(
                'mtw-hover-preview--visible',
                'mtw-hover-preview--loading'
            );

            card.hidden =
                true;

            card.setAttribute(
                'aria-hidden',
                'true'
            );
        }

        if (
            current &&
            current.node &&
            current.node.isConnected
        ) {
            current.node.removeAttribute(
                'aria-details'
            );
        }

        current =
            null;
    }

    function scheduleHide() {
        cancelHide();

        hideTimer =
            setTimeout(
                function () {
                    if (
                        card &&
                        (
                            contains(
                                card,
                                document.activeElement
                            ) ||
                            card.matches(':hover')
                        )
                    ) {
                        return;
                    }

                    hidePreview();
                },
                CFG.previewHideDelay
            );
    }

    function showPreview(trigger) {
        if (
            !normalPage() ||
            !trigger ||
            !trigger.node ||
            !trigger.node.isConnected
        ) {
            return;
        }

        cancelHide();

        clearTimeout(
            hoverTimer
        );

        pending =
            null;

        if (
            current &&
            current.node ===
                trigger.node &&
            current.anchor ===
                trigger.anchor
        ) {
            return;
        }

        var name =
            articleTitle(
                trigger.anchor
            );

        if (!name) {
            return;
        }

        createCard();

        if (current) {
            current.node.removeAttribute(
                'aria-details'
            );
        }

        current =
            trigger;

        var token =
            ++serial;

        trigger.node.setAttribute(
            'aria-details',
            card.id
        );

        titleNode.textContent =
            name;

        extractNode.textContent =
            'Loading article preview…';

        eyebrow.textContent =
            trigger.image ?
                'MTW Encyclopedia' :
                'Character Preview';

        openLink.href =
            trigger.anchor.href;

        setImage(
            trigger.image &&
            (
                trigger.image.currentSrc ||
                trigger.image.src
            )
        );

        card.hidden =
            false;

        card.setAttribute(
            'aria-hidden',
            'false'
        );

        card.classList.add(
            'mtw-hover-preview--visible',
            'mtw-hover-preview--loading'
        );

        positionCard();

        previewData(
            name
        ).then(function (data) {
            if (
                token !== serial ||
                !current
            ) {
                return;
            }

            titleNode.textContent =
                data.title;

            extractNode.textContent =
                shorten(
                    data.extract
                );

            if (
                !trigger.image &&
                data.thumbnail
            ) {
                setImage(
                    data.thumbnail
                );
            }

            card.classList.remove(
                'mtw-hover-preview--loading'
            );

            positionCard();
        }).catch(function () {
            if (
                token !== serial ||
                !current
            ) {
                return;
            }

            extractNode.textContent =
                'Open this article to view its full information.';

            card.classList.remove(
                'mtw-hover-preview--loading'
            );

            positionCard();
        });
    }

    function bindPreviews(root) {
        if (
            !root ||
            !root.dataset ||
            root.dataset
                .mtwHoverPreviewReady ===
                '4'
        ) {
            return;
        }

        root.dataset
            .mtwHoverPreviewReady =
            '4';

        root.addEventListener(
            'mouseover',
            function (e) {
                if (
                    hoverQuery &&
                    !hoverQuery.matches
                ) {
                    return;
                }

                var t =
                    triggerFor(
                        e.target
                    );

                if (
                    !t ||
                    contains(
                        t.node,
                        e.relatedTarget
                    )
                ) {
                    return;
                }

                cancelHide();

                clearTimeout(
                    hoverTimer
                );

                pending =
                    t;

                hoverTimer =
                    setTimeout(
                        function () {
                            if (
                                pending ===
                                t
                            ) {
                                showPreview(
                                    t
                                );
                            }
                        },
                        CFG.previewShowDelay
                    );
            }
        );

        root.addEventListener(
            'mouseout',
            function (e) {
                var t =
                    triggerFor(
                        e.target
                    );

                if (
                    !t ||
                    contains(
                        t.node,
                        e.relatedTarget
                    )
                ) {
                    return;
                }

                clearTimeout(
                    hoverTimer
                );

                pending =
                    null;

                if (
                    !contains(
                        card,
                        e.relatedTarget
                    )
                ) {
                    scheduleHide();
                }
            }
        );

        root.addEventListener(
            'focusin',
            function (e) {
                var t =
                    triggerFor(
                        e.target
                    );

                if (
                    t &&
                    keyboardInput &&
                    !restoringFocus
                ) {
                    showPreview(
                        t
                    );
                }
            }
        );

        root.addEventListener(
            'focusout',
            function (e) {
                if (
                    !contains(
                        card,
                        e.relatedTarget
                    )
                ) {
                    scheduleHide();
                }
            }
        );
    }

    function refresh(content) {
        var next =
            document.querySelector(
                '.page-content .mw-parser-output'
            ) ||
            document.querySelector(
                '.mw-parser-output'
            );

        if (
            article !==
            next
        ) {
            hidePreview();

            if (articleObserver) {
                articleObserver.disconnect();
            }

            article =
                next;

            if (
                article &&
                window.ResizeObserver
            ) {
                articleObserver =
                    new ResizeObserver(
                        scheduleUpdate
                    );

                articleObserver.observe(
                    article
                );
            }
        }

        if (article) {
            initSectionLinks(
                article
            );

            bindPreviews(
                article
            );
        }

        var root =
            content &&
            (
                content.jquery ?
                    content[0] :
                    content
            );

        if (
            root &&
            root !== article
        ) {
            initSectionLinks(
                root
            );
        }

        document.querySelectorAll(
            '.category-page'
        ).forEach(
            bindPreviews
        );

        scheduleUpdate();
    }

    function initKeyboard() {
        document.addEventListener(
            'keydown',
            function (e) {
                keyboardInput =
                    true;

                if (!current) {
                    return;
                }

                if (
                    e.key ===
                    'Escape'
                ) {
                    e.preventDefault();
                    hidePreview();
                } else if (
                    e.key ===
                    'Tab' &&
                    !e.shiftKey &&
                    contains(
                        current.node,
                        document.activeElement
                    )
                ) {
                    e.preventDefault();

                    safeFocus(
                        openLink
                    );
                } else if (
                    e.key ===
                    'Tab' &&
                    e.shiftKey &&
                    document.activeElement ===
                    openLink
                ) {
                    e.preventDefault();

                    safeFocus(
                        current.node
                    );
                } else if (
                    e.key ===
                    'Tab' &&
                    !e.shiftKey &&
                    document.activeElement ===
                    openLink
                ) {
                    hidePreview();
                }
            }
        );

        document.addEventListener(
            'pointerdown',
            function (e) {
                keyboardInput =
                    false;

                if (
                    current &&
                    !contains(
                        card,
                        e.target
                    ) &&
                    !contains(
                        current.node,
                        e.target
                    )
                ) {
                    hidePreview();
                }
            }
        );

        document.addEventListener(
            'visibilitychange',
            function () {
                if (
                    document.hidden
                ) {
                    hidePreview();
                }
            }
        );
    }

    function start() {
        try {
            initControls();
            initKeyboard();
            refresh();
        } catch (e) {
            console.error(
                '[MTW Common.js]',
                e
            );
        }

        if (mw.hook) {
            mw.hook(
                'wikipage.content'
            ).add(
                function (content) {
                    try {
                        refresh(
                            content
                        );
                    } catch (e) {
                        console.error(
                            '[MTW Common.js refresh]',
                            e
                        );
                    }
                }
            );
        }
    }

    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            start,
            {
                once: true
            }
        );
    } else {
        start();
    }
}());

/* Elderblood affiliation badge — append to MediaWiki:Common.js */
(function (mw, $) {
    'use strict';
    if (!mw || !$ || window.mtwElderbloodBadgeLoaded) return;
    window.mtwElderbloodBadgeLoaded = true;

    var eligible = [
        'harem', 'daughters', 'harem and daughters',
        'dragon nest', 'dragons nest', "dragon's nest",
        'clan alucard', 'alucard clan',
        'clan elderblood', 'elderblood clan'
    ];
    function normalise(value) {
        return String(value).replace(/^Category:/i, '')
            .replace(/_/g, ' ').replace(/[’‘]/g, "'")
            .replace(/\s+/g, ' ').trim().toLowerCase();
    }
    function install() {
        if (mw.config.get('wgNamespaceNumber') !== 0 ||
            mw.config.get('wgAction') !== 'view') return;
        if (document.getElementById('mtw-elderblood-badge')) return;

        var categories = (mw.config.get('wgCategories') || []).map(normalise);
        if (!categories.some(function (name) {
            return eligible.indexOf(name) !== -1;
        })) return;

        /* Prevent faction/location articles from receiving a character badge. */
        var isCharacter = categories.some(function (name) {
            return ['characters', 'character', 'male characters',
                'female characters', 'main character'].indexOf(name) !== -1;
        }) || document.querySelector(
            '.portable-infobox.pi-theme-mtw-character, ' +
            '.portable-infobox.pi-type-character, ' +
            '.portable-infobox.pi-type-Character'
        );
        if (!isCharacter) return;

        var heading = document.querySelector('.page-header__title') ||
            document.getElementById('firstHeading');
        if (!heading) return;

        var button = document.createElement('button');
        button.id = 'mtw-elderblood-badge';
        button.className = 'mtw-elderblood-badge';
        button.type = 'button';
        button.setAttribute('aria-label', 'Elderblood affiliation');
        button.setAttribute('aria-describedby', 'mtw-elderblood-tooltip');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'viewBox="0 0 96 96" aria-hidden="true" focusable="false">' +
            '<defs>' +
            '<linearGradient id="mtw-seal-metal" x2="0" y2="1">' +
            '<stop stop-color="#ffe0a3"/><stop offset=".5" stop-color="#b38349"/>' +
            '<stop offset="1" stop-color="#edc88d"/></linearGradient>' +
            '<linearGradient id="mtw-seal-membrane" x2="0" y2="1">' +
            '<stop stop-color="#9b304b"/><stop offset="1" stop-color="#250e21"/>' +
            '</linearGradient>' +
            '<radialGradient id="mtw-seal-ruby" cx=".35" cy=".3">' +
            '<stop stop-color="#fff0e3"/><stop offset=".22" stop-color="#ff8ca7"/>' +
            '<stop offset=".6" stop-color="#dc254c"/><stop offset="1" stop-color="#710f31"/>' +
            '</radialGradient></defs>' +
            '<g class="mtw-seal-halo">' +
            '<path d="M20 27A35 35 0 0 1 39 14M57 14A35 35 0 0 1 76 27M82 42A35 35 0 0 1 62 79M34 79A35 35 0 0 1 14 42"/>' +
            '<path d="M48 4 51 9 48 14 45 9ZM48 82 51 87 48 92 45 87Z"/>' +
            '</g>' +
            '<g class="mtw-seal-wings">' +
            '<path d="M39 40C27 24 12 29 3 15L8 38 18 35 12 54 26 45 23 64 39 53Z"/>' +
            '<path d="M57 40C69 24 84 29 93 15L88 38 78 35 84 54 70 45 73 64 57 53Z"/>' +
            '</g>' +
            '<g class="mtw-seal-veins">' +
            '<path d="M9 24 39 45 18 38M39 45 26 52M87 24 57 45 78 38M57 45 70 52"/>' +
            '</g>' +
            '<path class="mtw-seal-horns" d="M37 33C27 27 26 15 29 7L39 23 44 27H52L57 23 67 7C70 15 69 27 59 33L56 39H40Z"/>' +
            '<path class="mtw-seal-head" d="M48 22 62 34 59 50 53 57 48 63 43 57 37 50 34 34Z"/>' +
            '<path class="mtw-seal-brow" d="M36 35 46 39 48 29 50 39 60 35M40 49 48 53 56 49"/>' +
            '<path class="mtw-seal-eyes" d="M39 40 46 43 43 46 39 44ZM57 40 50 43 53 46 57 44Z"/>' +
            '<path class="mtw-seal-cradle" d="M34 58 38 72 48 83 58 72 62 58 55 64 48 74 41 64Z"/>' +
            '<path class="mtw-seal-heart" d="M48 55C45 61 41 64 41 68a7 7 0 0 0 14 0c0-4-4-7-7-13Z"/>' +
            '</svg>';

        var tip = document.createElement('span');
        tip.id = 'mtw-elderblood-tooltip';
        tip.className = 'mtw-elderblood-tooltip';
        tip.setAttribute('role', 'tooltip');
        tip.hidden = true;
        var label = document.createElement('strong');
        label.textContent = 'ELDERBLOOD SEAL';
        var detail = document.createElement('span');
        detail.textContent = 'This character is affiliated with the Elderblood family or Dragons Nest.';
        tip.appendChild(label);
        tip.appendChild(detail);
        document.body.appendChild(tip);
        var row = document.createElement('div');
        row.className = 'mtw-elderblood-indicator-row';
        row.appendChild(button);
        var header = heading.closest('.page-header') || heading.parentNode;
        header.insertBefore(row, header.firstChild);

        var timer;
        function show() {
            clearTimeout(timer);
            tip.hidden = false;
            var rect = button.getBoundingClientRect();
            var width = tip.offsetWidth;
            var height = tip.offsetHeight;
            tip.style.left = Math.max(12, Math.min(
                rect.left + rect.width / 2 - width / 2,
                window.innerWidth - width - 12
            )) + 'px';
            tip.style.top = Math.max(12,
                rect.bottom + height + 12 < window.innerHeight ?
                    rect.bottom + 8 : rect.top - height - 8
            ) + 'px';
        }
        function hide() { clearTimeout(timer); tip.hidden = true; }
        function later() { timer = setTimeout(hide, 150); }
        button.addEventListener('mouseenter', show);
        button.addEventListener('mouseleave', later);
        button.addEventListener('focus', show);
        button.addEventListener('blur', later);
        button.addEventListener('click', show);
        tip.addEventListener('mouseenter', function () { clearTimeout(timer); });
        tip.addEventListener('mouseleave', later);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') hide();
        });
        document.addEventListener('click', function (event) {
            if (!button.contains(event.target) && !tip.contains(event.target)) hide();
        });
        window.addEventListener('resize', hide);
        window.addEventListener('scroll', hide, true);
    }
    $(install);
    mw.hook('wikipage.content').add(install);
}(window.mediaWiki, window.jQuery));

/* =========================================================
 * MTW LINEAGE VIEWER
 * Auto-fit + manual zoom
 * ========================================================= */

(function () {
    'use strict';

    var MIN_SCALE = 0.05;
    var MAX_SCALE = 1.50;
    var ZOOM_STEP = 0.05;
    var FIT_MARGIN = 12;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function initLineage(root) {
        if (!root || root.dataset.mtwLineageReady === '1') {
            return;
        }

        var fitEnabled =
            root.classList.contains('mtw-lineage--fit') &&
            root.getAttribute('data-lineage-fit') !== 'no';

        var viewport =
            root.querySelector('.mtw-lineage__viewport');

        var stage =
            root.querySelector('.mtw-lineage__stage');

        var canvas =
            root.querySelector('.mtw-lineage__canvas');

        var table =
            root.querySelector('.mtw-lineage__table');

        if (!viewport || !stage || !canvas || !table) {
            return;
        }

        root.dataset.mtwLineageReady = '1';

        if (!fitEnabled) {
            stage.style.width = '';
            stage.style.height = '';
            canvas.style.transform = '';

            root.classList.add(
                'mtw-lineage--ready'
            );

            return;
        }

        var scale = 1;
        var naturalWidth = 0;
        var naturalHeight = 0;

        var resizeTimer = null;
        var imageTimer = null;

        var userChangedZoom = false;

        /* -------------------------
         * Controls
         * ------------------------- */

        var controls =
            document.createElement('div');

        controls.className =
            'mtw-lineage-controls';

        var controlsLabel =
            document.createElement('span');

        controlsLabel.className =
            'mtw-lineage-controls__label';

        controlsLabel.textContent =
            'Family tree';

        var zoomOut =
            document.createElement('button');

        zoomOut.type = 'button';
        zoomOut.textContent = '−';
        zoomOut.title = 'Zoom out';

        zoomOut.setAttribute(
            'aria-label',
            'Zoom family tree out'
        );

        var fitButton =
            document.createElement('button');

        fitButton.type = 'button';
        fitButton.textContent = 'Fit';

        fitButton.title =
            'Fit the entire family tree to the available width';

        var actualButton =
            document.createElement('button');

        actualButton.type = 'button';
        actualButton.textContent = '100%';

        actualButton.title =
            'Show the family tree at its original size';

        var zoomIn =
            document.createElement('button');

        zoomIn.type = 'button';
        zoomIn.textContent = '+';
        zoomIn.title = 'Zoom in';

        zoomIn.setAttribute(
            'aria-label',
            'Zoom family tree in'
        );

        var zoomValue =
            document.createElement('span');

        zoomValue.className =
            'mtw-lineage-zoom-value';

        zoomValue.setAttribute(
            'aria-live',
            'polite'
        );

        zoomValue.textContent = '100%';

        var hint =
            document.createElement('div');

        hint.className =
            'mtw-lineage-controls__hint';

        hint.textContent =
            'Fit shows the complete tree. Zoom in to inspect portraits and branches.';

        controls.appendChild(
            controlsLabel
        );

        controls.appendChild(
            zoomOut
        );

        controls.appendChild(
            fitButton
        );

        controls.appendChild(
            actualButton
        );

        controls.appendChild(
            zoomIn
        );

        controls.appendChild(
            zoomValue
        );

        controls.appendChild(
            hint
        );

        root.insertBefore(
            controls,
            viewport
        );

        /* -------------------------
         * Measurements
         * ------------------------- */

        function measureNaturalSize() {
            var oldTransform =
                canvas.style.transform;

            canvas.style.transform =
                'none';

            naturalWidth = Math.max(
                table.scrollWidth || 0,
                table.offsetWidth || 0,
                canvas.scrollWidth || 0,
                canvas.offsetWidth || 0
            );

            naturalHeight = Math.max(
                table.scrollHeight || 0,
                table.offsetHeight || 0,
                canvas.scrollHeight || 0,
                canvas.offsetHeight || 0
            );

            canvas.style.transform =
                oldTransform;

            return (
                naturalWidth > 0 &&
                naturalHeight > 0
            );
        }

        function updateButtons() {
            zoomOut.disabled =
                scale <= MIN_SCALE + 0.001;

            zoomIn.disabled =
                scale >= MAX_SCALE - 0.001;
        }

        function updateLabel() {
            zoomValue.textContent =
                Math.round(scale * 100) + '%';

            updateButtons();
        }

        function applyScale(
            newScale,
            preserveCentre
        ) {
            if (
                !naturalWidth ||
                !naturalHeight
            ) {
                if (!measureNaturalSize()) {
                    return;
                }
            }

            var oldStageWidth =
                stage.offsetWidth ||
                (naturalWidth * scale);

            var oldCentre =
                viewport.scrollLeft +
                viewport.clientWidth / 2;

            scale = clamp(
                newScale,
                MIN_SCALE,
                MAX_SCALE
            );

            var shownWidth =
                Math.max(
                    1,
                    naturalWidth * scale
                );

            var shownHeight =
                Math.max(
                    1,
                    naturalHeight * scale
                );

            stage.style.width =
                shownWidth + 'px';

            stage.style.height =
                shownHeight + 'px';

            canvas.style.transform =
                'scale(' +
                scale.toFixed(5) +
                ')';

            updateLabel();

            if (
                preserveCentre &&
                oldStageWidth > 0
            ) {
                window.requestAnimationFrame(
                    function () {
                        var ratio =
                            shownWidth /
                            oldStageWidth;

                        var target =
                            (
                                oldCentre *
                                ratio
                            ) -
                            (
                                viewport.clientWidth /
                                2
                            );

                        viewport.scrollLeft =
                            Math.max(
                                0,
                                target
                            );
                    }
                );
            }
        }

        function fitTree(
            markAsAutomatic
        ) {
            if (!measureNaturalSize()) {
                return;
            }

            var available =
                viewport.clientWidth -
                FIT_MARGIN;

            if (available <= 0) {
                return;
            }

            var fitScale =
                Math.min(
                    1,
                    available /
                    naturalWidth
                );

            applyScale(
                fitScale,
                false
            );

            window.requestAnimationFrame(
                function () {
                    var remaining =
                        viewport.scrollWidth -
                        viewport.clientWidth;

                    viewport.scrollLeft =
                        remaining > 0
                            ? remaining / 2
                            : 0;
                }
            );

            if (markAsAutomatic) {
                userChangedZoom = false;
            }
        }

        function showActualSize() {
            userChangedZoom = true;

            applyScale(
                1,
                false
            );

            window.requestAnimationFrame(
                function () {
                    var remaining =
                        viewport.scrollWidth -
                        viewport.clientWidth;

                    viewport.scrollLeft =
                        remaining > 0
                            ? remaining / 2
                            : 0;
                }
            );
        }

        function changeZoom(delta) {
            userChangedZoom = true;

            applyScale(
                scale + delta,
                true
            );
        }

        /* -------------------------
         * Buttons
         * ------------------------- */

        zoomOut.addEventListener(
            'click',
            function () {
                changeZoom(
                    -ZOOM_STEP
                );
            }
        );

        zoomIn.addEventListener(
            'click',
            function () {
                changeZoom(
                    ZOOM_STEP
                );
            }
        );

        fitButton.addEventListener(
            'click',
            function () {
                userChangedZoom = false;
                fitTree(true);
            }
        );

        actualButton.addEventListener(
            'click',
            function () {
                showActualSize();
            }
        );

        /* -------------------------
         * Image loading
         * ------------------------- */

        Array.prototype.forEach.call(
            root.querySelectorAll('img'),
            function (image) {
                if (image.complete) {
                    return;
                }

                image.addEventListener(
                    'load',
                    function () {
                        clearTimeout(
                            imageTimer
                        );

                        imageTimer =
                            setTimeout(
                                function () {
                                    if (
                                        !userChangedZoom
                                    ) {
                                        fitTree(
                                            true
                                        );
                                    } else {
                                        measureNaturalSize();

                                        applyScale(
                                            scale,
                                            false
                                        );
                                    }
                                },
                                50
                            );
                    },
                    {
                        once: true
                    }
                );
            }
        );

        /* -------------------------
         * Resizing
         * ------------------------- */

        function handleResize() {
            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    function () {
                        if (
                            userChangedZoom
                        ) {
                            measureNaturalSize();

                            applyScale(
                                scale,
                                false
                            );
                        } else {
                            fitTree(
                                true
                            );
                        }
                    },
                    100
                );
        }

        if (
            'ResizeObserver' in
            window
        ) {
            var observer =
                new ResizeObserver(
                    handleResize
                );

            observer.observe(
                viewport
            );
        } else {
            window.addEventListener(
                'resize',
                handleResize
            );
        }

        /* -------------------------
         * Initial Fit
         * ------------------------- */

        root.classList.add(
            'mtw-lineage--ready'
        );

        window.requestAnimationFrame(
            function () {
                window.requestAnimationFrame(
                    function () {
                        fitTree(
                            true
                        );
                    }
                );
            }
        );

        setTimeout(
            function () {
                if (
                    !userChangedZoom
                ) {
                    fitTree(
                        true
                    );
                }
            },
            250
        );

        setTimeout(
            function () {
                if (
                    !userChangedZoom
                ) {
                    fitTree(
                        true
                    );
                }
            },
            900
        );
    }

    function initAll(container) {
        var scope =
            container || document;

        var roots =
            scope.querySelectorAll(
                '.mtw-lineage'
            );

        Array.prototype.forEach.call(
            roots,
            initLineage
        );
    }

    if (
        window.mw &&
        mw.hook
    ) {
        mw.hook(
            'wikipage.content'
        ).add(
            function ($content) {
                var container =
                    $content &&
                    $content[0]
                        ? $content[0]
                        : document;

                initAll(
                    container
                );
            }
        );
    }

    initAll(document);

})();

/* ============================================================================
 * MTW — HOMEPAGE CHARACTER PORTRAIT POP-OUT
 *
 * Works with the matching CSS:
 *     MTW_True_Character_Popout_FIXED.css
 *
 * The ORIGINAL gallery image never leaves its card.
 * This script creates a temporary floating clone directly under <body>,
 * allowing it to rise smoothly above Fandom galleries and tabbers.
 * ============================================================================ */

(function () {
    'use strict';

    if (window.__mtwCharacterFloatLoaded) {
        return;
    }

    window.__mtwCharacterFloatLoaded = true;

    var FLOAT_SCALE = 1.34;
    var VIEWPORT_MARGIN = 18;
    var EXTRA_RISE = 16;
    var HIDE_DELAY = 45;
    var SOURCE_RELEASE_DELAY = 190;

    var floating = null;
    var floatingImage = null;
    var floatingName = null;
    var activeCard = null;
    var leaveTimer = null;
    var showFrame = null;
    var globalListenersInstalled = false;

    function hoverCapable() {
        if (!window.matchMedia) {
            return true;
        }

        return !(
            window.matchMedia('(hover: none)').matches ||
            window.matchMedia('(pointer: coarse)').matches
        );
    }

    function createFloatingLayer() {
        if (floating && floating.isConnected) {
            return;
        }

        floating = document.createElement('div');
        floating.id = 'mtw-character-float';
        floating.setAttribute('aria-hidden', 'true');

        floatingImage = document.createElement('img');
        floatingImage.alt = '';

        floatingName = document.createElement('div');
        floatingName.id = 'mtw-character-float-name';

        floating.appendChild(floatingImage);
        floating.appendChild(floatingName);
        document.body.appendChild(floating);
    }

    function getCard(directory, target) {
        if (!directory || !target || !target.closest) {
            return null;
        }

        var card = target.closest(
            '.gallerybox, .wikia-gallery-item'
        );

        return card && directory.contains(card) ? card : null;
    }

    function getImage(card) {
        if (!card) {
            return null;
        }

        return card.querySelector(
            '.thumb img, a.image img, img'
        );
    }

    function getCharacterName(card, img) {
        if (!card) {
            return '';
        }

        var node = card.querySelector(
            '.gallerytext a, .gallerytext, ' +
            '.title a, .title, ' +
            '.caption a, .caption'
        );

        var text = node ?
            node.textContent.replace(/\s+/g, ' ').trim() :
            '';

        if (!text && img) {
            text = (img.alt || '').replace(/\s+/g, ' ').trim();
        }

        return text;
    }

    function getImageSource(img) {
        if (!img) {
            return '';
        }

        return (
            img.currentSrc ||
            img.getAttribute('data-src') ||
            img.getAttribute('src') ||
            ''
        );
    }

    function calculateTarget(rect) {
        var availableWidth =
            window.innerWidth - (VIEWPORT_MARGIN * 2);

        var availableHeight =
            window.innerHeight - (VIEWPORT_MARGIN * 2);

        var scale = Math.min(
            FLOAT_SCALE,
            availableWidth / rect.width,
            availableHeight / rect.height
        );

        scale = Math.max(1, scale);

        var width = rect.width * scale;
        var height = rect.height * scale;

        var left =
            rect.left -
            ((width - rect.width) / 2);

        var top =
            rect.top -
            ((height - rect.height) * 0.74) -
            EXTRA_RISE;

        left = Math.max(
            VIEWPORT_MARGIN,
            Math.min(
                left,
                window.innerWidth - width - VIEWPORT_MARGIN
            )
        );

        top = Math.max(
            VIEWPORT_MARGIN,
            Math.min(
                top,
                window.innerHeight - height - VIEWPORT_MARGIN
            )
        );

        return {
            left: left,
            top: top,
            width: width,
            height: height
        };
    }

    function setRect(rect) {
        if (!floating) {
            return;
        }

        floating.style.left = rect.left + 'px';
        floating.style.top = rect.top + 'px';
        floating.style.width = rect.width + 'px';
        floating.style.height = rect.height + 'px';
    }

    function clearShowFrame() {
        if (!showFrame) {
            return;
        }

        window.cancelAnimationFrame(showFrame);
        showFrame = null;
    }

    function releaseCard(card) {
        if (card && card.isConnected) {
            card.classList.remove(
                'mtw-character-source-active'
            );
        }
    }

    function hideFloat(immediate) {
        window.clearTimeout(leaveTimer);
        leaveTimer = null;

        clearShowFrame();

        if (!floating) {
            releaseCard(activeCard);
            activeCard = null;
            return;
        }

        var oldCard = activeCard;
        activeCard = null;

        floating.classList.remove(
            'mtw-character-float--visible'
        );

        if (immediate) {
            floating.style.opacity = '0';
            releaseCard(oldCard);
            return;
        }

        if (oldCard) {
            var img = getImage(oldCard);

            if (img && img.isConnected) {
                setRect(
                    img.getBoundingClientRect()
                );
            }

            window.setTimeout(
                function () {
                    releaseCard(oldCard);
                },
                SOURCE_RELEASE_DELAY
            );
        }
    }

    function showFloat(card) {
        if (!card || card === activeCard) {
            return;
        }

        var img = getImage(card);

        if (!img) {
            return;
        }

        var rect = img.getBoundingClientRect();

        if (
            rect.width < 20 ||
            rect.height < 20 ||
            rect.bottom <= 0 ||
            rect.top >= window.innerHeight
        ) {
            return;
        }

        var src = getImageSource(img);

        if (!src) {
            return;
        }

        createFloatingLayer();

        window.clearTimeout(leaveTimer);
        leaveTimer = null;

        clearShowFrame();

        if (activeCard && activeCard !== card) {
            releaseCard(activeCard);
        }

        activeCard = card;
        card.classList.add(
            'mtw-character-source-active'
        );

        floatingImage.src = src;
        floatingName.textContent =
            getCharacterName(card, img);

        floating.style.opacity = '';
        floating.classList.remove(
            'mtw-character-float--visible'
        );

        setRect(rect);

        /*
         * Force the browser to commit the source geometry.
         * This makes the clone visibly grow from the portrait's
         * exact original position instead of appearing at full size.
         */
        floating.getBoundingClientRect();

        var target =
            calculateTarget(rect);

        showFrame =
            window.requestAnimationFrame(
                function () {
                    showFrame =
                        window.requestAnimationFrame(
                            function () {
                                setRect(target);

                                floating.classList.add(
                                    'mtw-character-float--visible'
                                );

                                showFrame = null;
                            }
                        );
                }
            );
    }

    function scheduleHide() {
        window.clearTimeout(leaveTimer);

        leaveTimer =
            window.setTimeout(
                function () {
                    hideFloat(false);
                },
                HIDE_DELAY
            );
    }

    function initDirectory(directory) {
        if (
            !directory ||
            !directory.dataset ||
            directory.dataset.mtwCharacterFloatReady === '1'
        ) {
            return;
        }

        if (!hoverCapable()) {
            return;
        }

        directory.dataset.mtwCharacterFloatReady = '1';

        document.documentElement.classList.add(
            'mtw-character-float-ready'
        );

        createFloatingLayer();

        directory.addEventListener(
            'mouseover',
            function (event) {
                var card =
                    getCard(
                        directory,
                        event.target
                    );

                if (!card) {
                    return;
                }

                if (
                    event.relatedTarget &&
                    card.contains(
                        event.relatedTarget
                    )
                ) {
                    return;
                }

                showFloat(card);
            }
        );

        directory.addEventListener(
            'mouseout',
            function (event) {
                var card =
                    getCard(
                        directory,
                        event.target
                    );

                if (!card || card !== activeCard) {
                    return;
                }

                if (
                    event.relatedTarget &&
                    card.contains(
                        event.relatedTarget
                    )
                ) {
                    return;
                }

                scheduleHide();
            }
        );

        directory.addEventListener(
            'click',
            function (event) {
                if (
                    event.target.closest &&
                    event.target.closest(
                        '.wds-tabs__tab'
                    )
                ) {
                    hideFloat(true);
                }
            }
        );
    }

    function initDirectories(container) {
        if (!hoverCapable()) {
            return;
        }

        var scope = container || document;
        var directories = [];

        if (
            scope.matches &&
            scope.matches('.mtw-home-characters')
        ) {
            directories.push(scope);
        }

        if (scope.querySelectorAll) {
            Array.prototype.push.apply(
                directories,
                scope.querySelectorAll(
                    '.mtw-home-characters'
                )
            );
        }

        directories.forEach(
            initDirectory
        );

        if (
            directories.length &&
            !globalListenersInstalled
        ) {
            globalListenersInstalled = true;

            window.addEventListener(
                'scroll',
                function () {
                    hideFloat(true);
                },
                { passive: true }
            );

            window.addEventListener(
                'resize',
                function () {
                    hideFloat(true);
                },
                { passive: true }
            );

            document.addEventListener(
                'visibilitychange',
                function () {
                    if (document.hidden) {
                        hideFloat(true);
                    }
                }
            );

            document.addEventListener(
                'keydown',
                function (event) {
                    if (
                        event.key === 'Escape' &&
                        activeCard
                    ) {
                        hideFloat(true);
                    }
                }
            );
        }
    }

    function start() {
        initDirectories(document);

        if (
            window.mw &&
            mw.hook
        ) {
            mw.hook(
                'wikipage.content'
            ).add(
                function ($content) {
                    var container =
                        $content &&
                        $content[0] ?
                            $content[0] :
                            document;

                    initDirectories(
                        container
                    );
                }
            );
        }
    }

    if (
        document.readyState === 'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            start,
            { once: true }
        );
    } else {
        start();
    }
})();

/* ============================================================================
 * MTW — VICTOR ELDERBLOOD GALLERY V3
 * Robust standalone enhancer for:
 *     Victor Elderblood/Gallery
 *
 * Improvements over V2:
 * - Finds H2 headings even when Fandom nests them inside <center>/wrapper tags.
 * - Safely inserts the archive header before the first gallery section.
 * - Numbers all gallery H2 sections.
 * - Detects portrait / square / landscape slideshow artwork.
 * - Keeps sizing classification updated after slideshow navigation.
 * - Works with late-rendered Fandom slideshow markup.
 * - Old-style syntax for better Fandom/JSHint compatibility.
 * ============================================================================ */

(function () {
    'use strict';

    if (window.__mtwVictorGalleryV3Loaded) {
        return;
    }

    window.__mtwVictorGalleryV3Loaded = true;

    var GALLERY_PAGE = 'Victor_Elderblood/Gallery';
    var RATIO_PORTRAIT = 'mtw-vg2-ratio--portrait';
    var RATIO_SQUARE = 'mtw-vg2-ratio--square';
    var RATIO_LANDSCAPE = 'mtw-vg2-ratio--landscape';

    function isVictorGallery() {
        var pageName = '';
        var path = '';

        try {
            if (window.mw && mw.config) {
                pageName = mw.config.get('wgPageName') || '';
            }
        } catch (ignore) {}

        if (pageName === GALLERY_PAGE) {
            return true;
        }

        path = window.location.pathname || '';

        try {
            path = decodeURIComponent(path);
        } catch (ignore2) {}

        path = path.replace(/\/+$/, '');

        return /\/wiki\/Victor_Elderblood\/Gallery$/i.test(path);
    }

    function cleanText(value) {
        return String(value || '')
            .replace(/\s+/g, ' ')
            .replace(/^\s+|\s+$/g, '');
    }

    function padNumber(number) {
        number = String(number);

        return number.length < 2 ?
            '0' + number :
            number;
    }

    function getOutput() {
        return (
            document.querySelector(
                '.page-content .mw-parser-output'
            ) ||
            document.querySelector(
                '.mw-parser-output'
            )
        );
    }

    function getHeadline(heading) {
        if (!heading) {
            return null;
        }

        return (
            heading.querySelector(
                '.mw-headline[id]'
            ) ||
            heading
        );
    }

    function isUsableSectionHeading(heading) {
        var headline;
        var text;

        if (
            !heading ||
            !heading.tagName ||
            heading.tagName.toLowerCase() !== 'h2'
        ) {
            return false;
        }

        headline = getHeadline(heading);

        text = cleanText(
            headline ?
                headline.textContent :
                heading.textContent
        );

        if (!text) {
            return false;
        }

        return text.toLowerCase() !== 'references';
    }

    function collectSectionHeadings(output) {
        var all;
        var result;
        var i;

        result = [];

        if (!output) {
            return result;
        }

        all = output.querySelectorAll('h2');

        for (i = 0; i < all.length; i++) {
            if (isUsableSectionHeading(all[i])) {
                result.push(all[i]);
            }
        }

        return result;
    }

    function topLevelChild(node, output) {
        var currentNode;

        if (!node || !output) {
            return null;
        }

        currentNode = node;

        while (
            currentNode.parentNode &&
            currentNode.parentNode !== output
        ) {
            currentNode = currentNode.parentNode;
        }

        return currentNode.parentNode === output ?
            currentNode :
            null;
    }

    function addSectionNumbers(output) {
        var headings;
        var i;

        headings = collectSectionHeadings(output);

        for (i = 0; i < headings.length; i++) {
            headings[i].setAttribute(
                'data-mtw-vg-number',
                padNumber(i + 1)
            );
        }
    }

    function buildHeader(output) {
        var headings;
        var firstHeading;
        var insertionPoint;
        var header;
        var eyebrow;
        var title;
        var description;
        var nav;
        var i;
        var headline;
        var text;
        var id;
        var link;

        if (
            !output ||
            output.querySelector(
                '.mtw-vg2-header'
            )
        ) {
            return;
        }

        headings = collectSectionHeadings(output);

        if (!headings.length) {
            return;
        }

        firstHeading = headings[0];

        insertionPoint =
            topLevelChild(
                firstHeading,
                output
            ) ||
            firstHeading;

        header =
            document.createElement('div');

        header.className =
            'mtw-vg2-header';

        eyebrow =
            document.createElement('div');

        eyebrow.className =
            'mtw-vg2-header__eyebrow';

        eyebrow.appendChild(
            document.createTextNode(
                'Victor Elderblood · Visual Archive'
            )
        );

        title =
            document.createElement('div');

        title.className =
            'mtw-vg2-header__title';

        title.appendChild(
            document.createTextNode(
                'Gallery'
            )
        );

        description =
            document.createElement('div');

        description.className =
            'mtw-vg2-header__text';

        description.appendChild(
            document.createTextNode(
                'Browse Victor’s character sheets, forms, transformations, equipment and miscellaneous artwork.'
            )
        );

        nav =
            document.createElement('nav');

        nav.className =
            'mtw-vg2-index';

        nav.setAttribute(
            'aria-label',
            'Victor gallery sections'
        );

        for (i = 0; i < headings.length; i++) {
            headline =
                getHeadline(
                    headings[i]
                );

            if (!headline) {
                continue;
            }

            text =
                cleanText(
                    headline.textContent
                );

            id =
                headline.id ||
                headings[i].id ||
                '';

            if (!text || !id) {
                continue;
            }

            link =
                document.createElement('a');

            link.href =
                '#' + id;

            link.appendChild(
                document.createTextNode(
                    text
                )
            );

            nav.appendChild(link);
        }

        header.appendChild(
            eyebrow
        );

        header.appendChild(
            title
        );

        header.appendChild(
            description
        );

        if (nav.childNodes.length) {
            header.appendChild(
                nav
            );
        }

        if (
            insertionPoint &&
            insertionPoint.parentNode
        ) {
            insertionPoint.parentNode.insertBefore(
                header,
                insertionPoint
            );
        }
    }

    function getSlides(slideshow) {
        if (!slideshow) {
            return [];
        }

        return slideshow.querySelectorAll(
            '.wikia-slideshow-images > li'
        );
    }

    function isVisibleSlide(slide) {
        var style;
        var rect;

        if (!slide) {
            return false;
        }

        try {
            style =
                window.getComputedStyle(
                    slide
                );
        } catch (e) {
            style = null;
        }

        if (style) {
            if (
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                parseFloat(
                    style.opacity || '1'
                ) <= 0.01
            ) {
                return false;
            }
        }

        rect =
            slide.getBoundingClientRect();

        return (
            rect.width > 1 &&
            rect.height > 1
        );
    }

    function getVisibleImage(slideshow) {
        var slides;
        var i;
        var img;

        slides =
            getSlides(slideshow);

        for (i = 0; i < slides.length; i++) {
            if (!isVisibleSlide(slides[i])) {
                continue;
            }

            img =
                slides[i].querySelector(
                    'img'
                );

            if (img) {
                return img;
            }
        }

        /*
         * Fallback for Fandom variants where active slides are
         * positioned/clipped in a way that makes visibility tests unreliable.
         */
        return slideshow.querySelector(
            '.wikia-slideshow-images img'
        );
    }

    function clearRatioClasses(slideshow) {
        slideshow.classList.remove(
            RATIO_PORTRAIT
        );

        slideshow.classList.remove(
            RATIO_SQUARE
        );

        slideshow.classList.remove(
            RATIO_LANDSCAPE
        );
    }

    function updateRatio(slideshow) {
        var img;
        var ratio;

        if (!slideshow) {
            return;
        }

        img =
            getVisibleImage(
                slideshow
            );

        if (
            !img ||
            !img.naturalWidth ||
            !img.naturalHeight
        ) {
            return;
        }

        clearRatioClasses(
            slideshow
        );

        ratio =
            img.naturalWidth /
            img.naturalHeight;

        if (ratio >= 1.28) {
            slideshow.classList.add(
                RATIO_LANDSCAPE
            );
        } else if (ratio >= 0.86) {
            slideshow.classList.add(
                RATIO_SQUARE
            );
        } else {
            slideshow.classList.add(
                RATIO_PORTRAIT
            );
        }
    }

    function handleGalleryImageLoad(event) {
        var img;
        var slideshow;

        img =
            event.currentTarget;

        if (
            !img ||
            !img.closest
        ) {
            return;
        }

        slideshow =
            img.closest(
                '.wikia-slideshow'
            );

        if (slideshow) {
            updateRatio(
                slideshow
            );
        }
    }

    function prepareGalleryImage(img, slideshow) {
        if (!img) {
            return;
        }

        if (
            img.complete &&
            img.naturalWidth &&
            img.naturalHeight
        ) {
            updateRatio(
                slideshow
            );

            return;
        }

        img.addEventListener(
            'load',
            handleGalleryImageLoad,
            {
                once: true
            }
        );
    }

    function refreshSlideshowSoon(event) {
        var slideshow;

        slideshow =
            event.currentTarget;

        window.setTimeout(
            function () {
                updateRatio(
                    slideshow
                );
            },
            70
        );

        window.setTimeout(
            function () {
                updateRatio(
                    slideshow
                );
            },
            240
        );
    }

    function handleSlideshowMutation(records, observer) {
        var slideshow;

        if (
            !records ||
            !records.length ||
            !observer
        ) {
            return;
        }

        slideshow =
            observer._mtwSlideshow;

        if (!slideshow) {
            return;
        }

        window.requestAnimationFrame(
            function () {
                updateRatio(
                    slideshow
                );
            }
        );
    }

    function countSlideshowImages(slideshow) {
        var slides;
        var images;

        slides =
            getSlides(slideshow);

        if (slides.length) {
            return slides.length;
        }

        images =
            slideshow.querySelectorAll(
                '.wikia-slideshow-images img'
            );

        return images.length;
    }

    function enhanceSlideshow(slideshow) {
        var count;
        var images;
        var imageList;
        var observer;
        var i;

        if (
            !slideshow ||
            slideshow.getAttribute(
                'data-mtw-gallery-v3-ready'
            ) === '1'
        ) {
            return;
        }

        slideshow.setAttribute(
            'data-mtw-gallery-v3-ready',
            '1'
        );

        count =
            countSlideshowImages(
                slideshow
            );

        if (count <= 1) {
            slideshow.classList.add(
                'mtw-vg2-single'
            );
        } else {
            slideshow.classList.remove(
                'mtw-vg2-single'
            );
        }

        images =
            slideshow.querySelectorAll(
                '.wikia-slideshow-images img'
            );

        for (i = 0; i < images.length; i++) {
            prepareGalleryImage(
                images[i],
                slideshow
            );
        }

        updateRatio(
            slideshow
        );

        slideshow.addEventListener(
            'click',
            refreshSlideshowSoon,
            false
        );

        imageList =
            slideshow.querySelector(
                '.wikia-slideshow-images'
            );

        if (
            imageList &&
            window.MutationObserver
        ) {
            observer =
                new MutationObserver(
                    handleSlideshowMutation
                );

            observer._mtwSlideshow =
                slideshow;

            observer.observe(
                imageList,
                {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    attributeFilter: [
                        'class',
                        'style',
                        'src'
                    ]
                }
            );
        }
    }

    function enhanceSlideshows(output) {
        var slideshows;
        var i;

        if (!output) {
            return;
        }

        slideshows =
            output.querySelectorAll(
                '.wikia-slideshow'
            );

        for (i = 0; i < slideshows.length; i++) {
            enhanceSlideshow(
                slideshows[i]
            );
        }
    }

    function enhance() {
        var output;

        if (!isVictorGallery()) {
            return;
        }

        if (document.documentElement) {
            document.documentElement.classList.add(
                'mtw-victor-gallery-js-ready'
            );
        }

        if (document.body) {
            document.body.classList.add(
                'mtw-victor-gallery-v2'
            );
        }

        output =
            getOutput();

        if (!output) {
            return;
        }

        addSectionNumbers(
            output
        );

        buildHeader(
            output
        );

        enhanceSlideshows(
            output
        );
    }

    function handleWikiContent() {
        enhance();
    }

    function start() {
        enhance();

        /*
         * Fandom often finishes constructing slideshow markup
         * after the normal article DOM is already available.
         */
        window.setTimeout(
            enhance,
            250
        );

        window.setTimeout(
            enhance,
            650
        );

        window.setTimeout(
            enhance,
            1200
        );

        window.setTimeout(
            enhance,
            2200
        );

        try {
            if (
                window.mw &&
                mw.hook
            ) {
                mw.hook(
                    'wikipage.content'
                ).add(
                    handleWikiContent
                );
            }
        } catch (ignore) {}
    }

    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            start,
            false
        );
    } else {
        start();
    }
}());