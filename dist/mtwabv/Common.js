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
            target.closest('.mtw-no-preview')
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


/* ========================================================================
 * MTW REVIEWER v4
 * Background scanning + per-page review + safe automatic mechanical fixes.
 * ======================================================================== */

(function () {
    'use strict';

    if (
        !window.mw ||
        window.__mtwReviewerLoaded
    ) {
        return;
    }

    window.__mtwReviewerLoaded =
        true;

    var R = {
        key:
            'mtwReviewerState:v4c',

        ns:
            0,

        batch:
            10,

        firstDelay:
            2500,

        batchDelay:
            5000,

        editDelay:
            12000,

        maxEditsSession:
            20,

        maxFixesEdit:
            30,

        maxStored:
            1800,

        maxIssues:
            24,

        authorizedGroups: [
            'sysop',
            'bureaucrat',
            'bot',
            'content-moderator'
        ],

        exclude: [
            'Main Page'
        ]
    };

    var apiP =
        null;

    var timer =
        null;

    var editTimer =
        null;

    var scanning =
        false;

    var editBusy =
        false;

    var queued =
        [];

    var queuedTitles =
        new Set();

    var editsThisSession =
        0;

    var lastEditAt =
        0;

    var widget;
    var body;
    var dot;
    var status;
    var progress;
    var stats;
    var recent;
    var activity;
    var pauseBtn;
    var fixBtn;
    var currentBtn;
    var report;

    function baseState() {
        return {
            version:
                4,

            enabled:
                true,

            autoFixEnabled:
                true,

            collapsed:
                true,

            cursor:
                null,

            cycle:
                1,

            lastScanAt:
                null,

            lastError:
                '',

            pages:
                {},

            autoEdits:
                0,

            autoFixes:
                0,

            activity:
                []
        };
    }

    function loadState() {
        try {
            var x =
                JSON.parse(
                    localStorage.getItem(
                        R.key
                    ) ||
                    'null'
                );

            if (
                !x ||
                x.version !==
                4
            ) {
                return baseState();
            }

            x.pages =
                x.pages ||
                {};

            x.activity =
                x.activity ||
                [];

            if (
                x.enabled !==
                false
            ) {
                x.enabled =
                    true;
            }

            if (
                x.autoFixEnabled !==
                false
            ) {
                x.autoFixEnabled =
                    true;
            }

            return Object.assign(
                baseState(),
                x
            );
        } catch (e) {
            return baseState();
        }
    }

    var state =
        loadState();

    function save() {
        var keys =
            Object.keys(
                state.pages
            );

        if (
            keys.length >
            R.maxStored
        ) {
            keys.sort(function (a, b) {
                return String(
                    state.pages[a]
                        .checkedAt ||
                    ''
                ).localeCompare(
                    String(
                        state.pages[b]
                            .checkedAt ||
                        ''
                    )
                );
            });

            while (
                keys.length >
                R.maxStored
            ) {
                delete state.pages[
                    keys.shift()
                ];
            }
        }

        try {
            localStorage.setItem(
                R.key,
                JSON.stringify(
                    state
                )
            );
        } catch (e) {
            state.lastError =
                'Browser storage is full.';
        }
    }

    function api() {
        if (!apiP) {
            apiP =
                Promise.resolve(
                    mw.loader.using(
                        'mediawiki.api'
                    )
                ).then(function () {
                    return new mw.Api();
                }).catch(function (e) {
                    apiP = null;
                    throw e;
                });
        }

        return apiP;
    }

    function titleNow() {
        return String(
            mw.config.get(
                'wgPageName'
            ) ||
            ''
        ).replace(
            /_/g,
            ' '
        );
    }

    function revNow() {
        return Number(
            mw.config.get(
                'wgRevisionId'
            )
        ) || 0;
    }

    function articleView() {
        return (
            mw.config.get(
                'wgAction'
            ) ===
                'view' &&
            mw.config.get(
                'wgNamespaceNumber'
            ) ===
                R.ns &&
            !!titleNow()
        );
    }

    function key(title) {
        return encodeURIComponent(
            title ||
            ''
        );
    }

    function getRecord(title) {
        return state.pages[
            key(title)
        ] || null;
    }

    function setRecord(
        title,
        rec
    ) {
        state.pages[
            key(title)
        ] = rec;
    }

    function now() {
        return new Date()
            .toISOString();
    }

    function canAutoEdit() {
        var groups =
            mw.config.get(
                'wgUserGroups'
            ) || [];

        if (
            !mw.config.get(
                'wgUserName'
            )
        ) {
            return false;
        }

        return R.authorizedGroups.some(
            function (g) {
                return (
                    groups.indexOf(
                        g
                    ) !== -1
                );
            }
        );
    }

    function revisionText(rev) {
        if (!rev) {
            return '';
        }

        if (
            rev.slots &&
            rev.slots.main
        ) {
            return (
                rev.slots.main.content ||
                rev.slots.main['*'] ||
                ''
            );
        }

        return (
            rev.content ||
            rev['*'] ||
            ''
        );
    }

    function addIssue(
        list,
        severity,
        code,
        message,
        line,
        sample
    ) {
        if (
            list.length >=
            R.maxIssues
        ) {
            return;
        }

        list.push({
            severity:
                severity,

            code:
                code,

            message:
                message,

            line:
                line ||
                null,

            sample:
                sample ?
                    String(sample)
                        .trim()
                        .slice(
                            0,
                            150
                        ) :
                    ''
        });
    }

    /*
     * Protect wikitext areas from the mechanical auto-fixer.
     */
    function protect(text) {
        var slots =
            [];

        function take(match) {
            var token =
                '\u0002MTW' +
                slots.length +
                '\u0003';

            slots.push(
                match
            );

            return token;
        }

        var out =
            String(
                text ||
                ''
            );

        out =
            out.replace(
                /<!--[\s\S]*?-->/g,
                take
            );

        out =
            out.replace(
                /<(nowiki|pre|source|syntaxhighlight|code|math|gallery)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
                take
            );

        out =
            out.replace(
                /<ref\b[^>]*\/>/gi,
                take
            );

        out =
            out.replace(
                /<ref\b[^>]*>[\s\S]*?<\/ref\s*>/gi,
                take
            );

        out =
            out.replace(
                /\{\{[\s\S]*?\}\}/g,
                take
            );

        out =
            out.replace(
                /\[\[[\s\S]*?\]\]/g,
                take
            );

        out =
            out.replace(
                /\[(?:https?:)?\/\/[^\]\s]+(?:\s[^\]]*)?\]/gi,
                take
            );

        out =
            out.replace(
                /https?:\/\/[^\s<>"']+/gi,
                take
            );

        return {
            text:
                out,

            slots:
                slots
        };
    }

    function restore(
        text,
        slots
    ) {
        return text.replace(
            /\u0002MTW(\d+)\u0003/g,
            function (_, n) {
                return (
                    slots[
                        Number(n)
                    ] ||
                    ''
                );
            }
        );
    }

    /*
     * Deliberately conservative auto-fix dictionary.
     */
    var typo = {
        recieve:
            'receive',

        recieved:
            'received',

        recieves:
            'receives',

        recieving:
            'receiving',

        seperate:
            'separate',

        seperated:
            'separated',

        seperately:
            'separately',

        definately:
            'definitely',

        becuase:
            'because',

        thier:
            'their',

        occurrance:
            'occurrence'
    };

    function caseLike(
        from,
        to
    ) {
        if (
            from ===
            from.toUpperCase()
        ) {
            return to.toUpperCase();
        }

        if (
            from.charAt(0) ===
            from.charAt(0)
                .toUpperCase()
        ) {
            return (
                to.charAt(0)
                    .toUpperCase() +
                to.slice(1)
            );
        }

        return to;
    }

    function safeFix(text) {
        var p =
            protect(text);

        var src =
            p.text;

        var changes =
            [];

        Object.keys(
            typo
        ).forEach(function (wrong) {
            var re =
                new RegExp(
                    '\\b' +
                    wrong +
                    '\\b',
                    'gi'
                );

            src =
                src.replace(
                    re,
                    function (m) {
                        var r =
                            caseLike(
                                m,
                                typo[wrong]
                            );

                        changes.push(
                            m +
                            ' → ' +
                            r
                        );

                        return r;
                    }
                );
        });

        src =
            src.replace(
                /[ \t]+([,.!?;:])/g,
                function (_, mark) {
                    changes.push(
                        'Removed space before ' +
                        mark
                    );

                    return mark;
                }
            );

        src =
            src.replace(
                /[ \t]+(?=\r?\n|$)/g,
                function () {
                    changes.push(
                        'Removed trailing whitespace'
                    );

                    return '';
                }
            );

        var fixed =
            restore(
                src,
                p.slots
            );

        return {
            text:
                fixed,

            changes:
                changes.slice(
                    0,
                    R.maxFixesEdit +
                    1
                ),

            count:
                changes.length
        };
    }

    /*
     * Structural fingerprint to prevent the auto-fixer from
     * unexpectedly changing important wiki markup.
     */
    function fingerprint(text) {
        function c(re) {
            return (
                String(text)
                    .match(re) ||
                []
            ).length;
        }

        return [
            c(/\[\[/g),
            c(/\]\]/g),
            c(/\{\{/g),
            c(/\}\}/g),
            c(/<ref\b/gi),
            c(/<\/ref\s*>/gi),
            c(/\|-?/g)
        ].join(':');
    }

    function analyze(
        title,
        text,
        revId,
        timestamp
    ) {
        var src =
            String(
                text ||
                ''
            );

        var masked =
            protect(
                src
            ).text;

        var issues =
            [];

        var lines =
            masked.split(
                '\n'
            );

        lines.forEach(
            function (
                line,
                i
            ) {
                var n =
                    i + 1;

                var t =
                    line.trim();

                if (!t) {
                    return;
                }

                var r =
                    /\b([A-Za-z]{3,})\s+\1\b/i.exec(
                        line
                    );

                if (r) {
                    addIssue(
                        issues,
                        'minor',
                        'repeat',
                        'Repeated word: “' +
                            r[1] +
                            '”.',
                        n,
                        line
                    );
                }

                if (
                    /\b(?:TODO|TBD|FIXME)\b/i.test(
                        line
                    )
                ) {
                    addIssue(
                        issues,
                        'warning',
                        'todo',
                        'Unresolved TODO/TBD/FIXME marker.',
                        n,
                        line
                    );
                }

                if (
                    /[A-Za-z0-9\)\]]\s+[,.!?;]/.test(
                        line
                    )
                ) {
                    addIssue(
                        issues,
                        'minor',
                        'space-punctuation',
                        'Possible unwanted space before punctuation.',
                        n,
                        line
                    );
                }

                Object.keys(
                    typo
                ).some(function (w) {
                    if (
                        new RegExp(
                            '\\b' +
                                w +
                                '\\b',
                            'i'
                        ).test(
                            line
                        )
                    ) {
                        addIssue(
                            issues,
                            'minor',
                            'typo',
                            'Possible typo: “' +
                                w +
                                '” → “' +
                                typo[w] +
                                '”.',
                            n,
                            line
                        );

                        return true;
                    }

                    return false;
                });
            }
        );

        var opens =
            src.match(
                /<ref\b[^>]*>/gi
            ) || [];

        var self =
            opens.filter(
                function (x) {
                    return /\/\s*>$/.test(
                        x
                    );
                }
            ).length;

        var normalOpen =
            opens.length -
            self;

        var closes =
            (
                src.match(
                    /<\/ref\s*>/gi
                ) ||
                []
            ).length;

        if (
            normalOpen !==
            closes
        ) {
            addIssue(
                issues,
                'major',
                'refs',
                'Unbalanced <ref> tags: ' +
                    normalOpen +
                    ' opening and ' +
                    closes +
                    ' closing.'
            );
        }

        if (
            /<ref\b[^>]*>\s*<\/ref\s*>/i.test(
                src
            )
        ) {
            addIssue(
                issues,
                'warning',
                'empty-ref',
                'At least one empty reference was found.'
            );
        }

        if (
            /<ref\b[^>]*>\s*(?:chapter\s*)?\d+(?:\s*[-–]\s*\d+)?\s*<\/ref\s*>/i.test(
                src
            )
        ) {
            addIssue(
                issues,
                'warning',
                'number-ref',
                'A citation contains only a chapter number/range.'
            );
        }

        var ol =
            (
                masked.match(
                    /\[\[/g
                ) ||
                []
            ).length;

        var cl =
            (
                masked.match(
                    /\]\]/g
                ) ||
                []
            ).length;

        if (
            ol !==
            cl
        ) {
            addIssue(
                issues,
                'major',
                'links',
                'Possible unbalanced wiki links: ' +
                    ol +
                    ' opening and ' +
                    cl +
                    ' closing.'
            );
        }

        var prose =
            src
                .replace(
                    /<!--[\s\S]*?-->/g,
                    ' '
                )
                .replace(
                    /<ref\b[^>]*\/>/gi,
                    ' '
                )
                .replace(
                    /<ref\b[^>]*>[\s\S]*?<\/ref\s*>/gi,
                    ' '
                )
                .replace(
                    /\{\{[\s\S]*?\}\}/g,
                    ' '
                )
                .replace(
                    /<[^>]+>/g,
                    ' '
                )
                .replace(
                    /\[\[[^\]|]+\|([^\]]+)\]\]/g,
                    '$1'
                )
                .replace(
                    /\[\[([^\]]+)\]\]/g,
                    '$1'
                )
                .replace(
                    /\s+/g,
                    ' '
                )
                .trim()
                .length;

        if (
            prose >=
            1400 &&
            opens.length ===
            0
        ) {
            addIssue(
                issues,
                'major',
                'no-refs',
                'Substantial article with no inline citations detected.'
            );
        } else if (
            prose >=
            4500 &&
            opens.length <
            3
        ) {
            addIssue(
                issues,
                'warning',
                'few-refs',
                'Long article with very few inline citations (' +
                    opens.length +
                    ').'
            );
        }

        if (
            prose >=
            1000 &&
            src
                .toLowerCase()
                .indexOf(
                    '[[category:'
                ) ===
                -1
        ) {
            addIssue(
                issues,
                'minor',
                'category',
                'No category link detected on this substantial article.'
            );
        }

        var count = {
            minor:
                0,

            warning:
                0,

            major:
                0
        };

        issues.forEach(
            function (x) {
                count[
                    x.severity
                ]++;
            }
        );

        var fix =
            safeFix(
                src
            );

        return {
            title:
                title,

            revisionId:
                Number(
                    revId
                ) ||
                0,

            revisionTimestamp:
                timestamp ||
                null,

            checkedAt:
                now(),

            totalIssues:
                issues.length,

            minor:
                count.minor,

            warning:
                count.warning,

            major:
                count.major,

            issues:
                issues,

            autoCandidate:
                fix.count >
                    0 &&
                fix.count <=
                    R.maxFixesEdit,

            fixCount:
                fix.count,

            fixedText:
                fix.text,

            originalText:
                src
        };
    }

    function summarize() {
        var vals =
            Object.keys(
                state.pages
            ).map(
                function (k) {
                    return state.pages[
                        k
                    ];
                }
            );

        return {
            reviewed:
                vals.length,

            flagged:
                vals.filter(
                    function (r) {
                        return (
                            r &&
                            r.totalIssues >
                            0
                        );
                    }
                ).length,

            issues:
                vals.reduce(
                    function (s, r) {
                        return (
                            s +
                            (
                                r &&
                                r.totalIssues ||
                                0
                            )
                        );
                    },
                    0
                )
        };
    }

    function pushActivity(
        kind,
        text
    ) {
        state.activity.unshift({
            time:
                now(),

            kind:
                kind,

            text:
                text
        });

        state.activity =
            state.activity.slice(
                0,
                12
            );

        save();
        renderWidget();
    }

    function excluded(
        title,
        text
    ) {
        return (
            R.exclude.indexOf(
                title
            ) !==
                -1 ||
            String(
                text ||
                ''
            ).indexOf(
                'MTW-REVIEWER-NOAUTOFIX'
            ) !==
                -1
        );
    }

    function queueFix(rec) {
        if (
            !state.autoFixEnabled ||
            !canAutoEdit() ||
            rec.major >
                0 ||
            !rec.autoCandidate ||
            excluded(
                rec.title,
                rec.originalText
            )
        ) {
            return;
        }

        if (
            queuedTitles.has(
                rec.title
            )
        ) {
            return;
        }

        if (
            fingerprint(
                rec.originalText
            ) !==
            fingerprint(
                rec.fixedText
            )
        ) {
            return;
        }

        queuedTitles.add(
            rec.title
        );

        queued.push(
            rec
        );

        scheduleEditWorker(
            300
        );
    }

    function store(rec) {
        setRecord(
            rec.title,
            rec
        );

        save();
        renderWidget();

        if (
            articleView() &&
            rec.title ===
            titleNow()
        ) {
            renderReport();
        }

        queueFix(
            rec
        );
    }

    function reviewPage(page) {
        if (
            !page ||
            page.missing ||
            page.invalid ||
            page.ns !==
                R.ns ||
            !page.revisions ||
            !page.revisions[0]
        ) {
            return;
        }

        var rev =
            page.revisions[0];

        var id =
            Number(
                rev.revid
            ) ||
            0;

        var old =
            getRecord(
                page.title
            );

        if (
            old &&
            old.revisionId ===
            id
        ) {
            return;
        }

        store(
            analyze(
                page.title,
                revisionText(
                    rev
                ),
                id,
                rev.timestamp
            )
        );
    }

    function scheduleScan(delay) {
        clearTimeout(
            timer
        );

        if (!state.enabled) {
            return;
        }

        timer =
            setTimeout(
                scanBatch,
                Math.max(
                    500,
                    delay ||
                    R.batchDelay
                )
            );
    }

    function scanBatch() {
        if (
            !state.enabled ||
            scanning
        ) {
            return;
        }

        scanning =
            true;

        renderWidget();

        api().then(
            function (a) {
                var p = {
                    action:
                        'query',

                    generator:
                        'allpages',

                    gapnamespace:
                        R.ns,

                    gapfilterredir:
                        'nonredirects',

                    gaplimit:
                        R.batch,

                    prop:
                        'revisions',

                    rvprop:
                        'ids|timestamp|content',

                    rvslots:
                        'main',

                    formatversion:
                        2,

                    format:
                        'json'
                };

                if (
                    state.cursor
                ) {
                    p.gapcontinue =
                        state.cursor;
                }

                return a.get(
                    p
                );
            }
        ).then(function (data) {
            (
                data &&
                data.query &&
                data.query.pages ||
                []
            ).forEach(
                reviewPage
            );

            if (
                data &&
                data.continue &&
                data.continue.gapcontinue
            ) {
                state.cursor =
                    data.continue.gapcontinue;
            } else {
                state.cursor =
                    null;

                state.cycle++;
            }

            state.lastScanAt =
                now();

            state.lastError =
                '';

            save();
        }).catch(function (e) {
            state.lastError =
                e.message ||
                'Background scan failed.';

            save();

            pushActivity(
                'error',
                state.lastError
            );
        }).finally(function () {
            scanning =
                false;

            renderWidget();

            scheduleScan(
                R.batchDelay
            );
        });
    }

    function scheduleEditWorker(delay) {
        clearTimeout(
            editTimer
        );

        if (
            !state.enabled ||
            !state.autoFixEnabled ||
            !canAutoEdit()
        ) {
            return;
        }

        editTimer =
            setTimeout(
                editWorker,
                Math.max(
                    250,
                    delay ||
                    R.editDelay
                )
            );
    }

    function editWorker() {
        if (
            editBusy ||
            !queued.length ||
            editsThisSession >=
                R.maxEditsSession ||
            !state.enabled ||
            !state.autoFixEnabled ||
            !canAutoEdit()
        ) {
            return;
        }

        var wait =
            R.editDelay -
            (
                Date.now() -
                lastEditAt
            );

        if (
            wait >
            0
        ) {
            scheduleEditWorker(
                wait
            );

            return;
        }

        var rec =
            queued.shift();

        queuedTitles.delete(
            rec.title
        );

        editBusy =
            true;

        renderWidget();

        api().then(function (a) {
            return a.postWithToken(
                'csrf',
                {
                    action:
                        'edit',

                    title:
                        rec.title,

                    text:
                        rec.fixedText,

                    summary:
                        'MTW Reviewer: automatic spelling/punctuation cleanup',

                    baserevid:
                        rec.revisionId,

                    basetimestamp:
                        rec.revisionTimestamp ||
                        undefined,

                    nocreate:
                        1,

                    minor:
                        1,

                    assert:
                        'user',

                    formatversion:
                        2
                }
            );
        }).then(function (data) {
            var edit =
                data &&
                data.edit;

            if (
                !edit ||
                edit.result !==
                'Success'
            ) {
                throw new Error(
                    'Edit was not accepted.'
                );
            }

            editsThisSession++;

            lastEditAt =
                Date.now();

            state.autoEdits++;

            state.autoFixes +=
                rec.fixCount;

            var fresh =
                analyze(
                    rec.title,
                    rec.fixedText,
                    Number(
                        edit.newrevid
                    ) ||
                    rec.revisionId,
                    null
                );

            fresh.autoFix = {
                applied:
                    true,

                fromRevisionId:
                    rec.revisionId,

                fixes:
                    rec.fixCount,

                at:
                    now()
            };

            setRecord(
                rec.title,
                fresh
            );

            save();

            pushActivity(
                'fix',
                rec.title +
                    ': auto-fixed ' +
                    rec.fixCount +
                    ' issue' +
                    (
                        rec.fixCount ===
                        1 ?
                            '' :
                            's'
                    ) +
                    '.'
            );

            if (
                articleView() &&
                titleNow() ===
                rec.title
            ) {
                renderReport();
            }
        }).catch(function (e) {
            var msg =
                e &&
                e.message ||
                'Automatic edit failed.';

            pushActivity(
                'error',
                rec.title +
                    ': ' +
                    msg
            );
        }).finally(function () {
            editBusy =
                false;

            renderWidget();

            if (
                queued.length
            ) {
                scheduleEditWorker(
                    R.editDelay
                );
            }
        });
    }

    function reviewTitle(
        title,
        force
    ) {
        if (!title) {
            return Promise.resolve(
                null
            );
        }

        return api().then(
            function (a) {
                return a.get({
                    action:
                        'query',

                    prop:
                        'revisions',

                    titles:
                        title,

                    rvprop:
                        'ids|timestamp|content',

                    rvslots:
                        'main',

                    formatversion:
                        2,

                    format:
                        'json'
                });
            }
        ).then(function (data) {
            var page =
                data &&
                data.query &&
                data.query.pages &&
                data.query.pages[0];

            if (
                !page ||
                page.missing ||
                !page.revisions ||
                !page.revisions[0]
            ) {
                throw new Error(
                    'Page could not be reviewed.'
                );
            }

            var rev =
                page.revisions[0];

            var id =
                Number(
                    rev.revid
                ) ||
                0;

            var old =
                getRecord(
                    page.title
                );

            if (
                !force &&
                old &&
                old.revisionId ===
                id
            ) {
                return old;
            }

            var rec =
                analyze(
                    page.title,
                    revisionText(
                        rev
                    ),
                    id,
                    rev.timestamp
                );

            store(
                rec
            );

            return rec;
        });
    }

    function human(x) {
        if (!x) {
            return 'Never';
        }

        var d =
            new Date(x);

        return isNaN(
            d.getTime()
        ) ?
            'Unknown' :
            d.toLocaleString();
    }

    function wikiLink(title) {
        var a =
            document.createElement(
                'a'
            );

        a.href =
            mw.util &&
            mw.util.getUrl ?
                mw.util.getUrl(
                    title
                ) :
                '/wiki/' +
                encodeURIComponent(
                    title.replace(
                        / /g,
                        '_'
                    )
                );

        a.textContent =
            title;

        return a;
    }

    function injectCss() {
        if (
            document.getElementById(
                'mtw-reviewer-css'
            )
        ) {
            return;
        }

        var s =
            document.createElement(
                'style'
            );

        s.id =
            'mtw-reviewer-css';

        s.textContent =
            '#mtw-reviewer{' +
                'position:fixed;' +
                'right:18px;' +
                'bottom:18px;' +
                'z-index:10000;' +
                'width:min(350px,calc(100vw - 30px));' +
                'font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
                'background:rgba(19,20,26,.97);' +
                'color:#f4f4f6;' +
                'border:1px solid rgba(255,255,255,.14);' +
                'border-radius:12px;' +
                'box-shadow:0 12px 38px rgba(0,0,0,.35);' +
                'overflow:hidden' +
            '}' +

            '.mtwr-head{' +
                'display:flex;' +
                'align-items:center;' +
                'gap:8px;' +
                'width:100%;' +
                'padding:10px 12px;' +
                'background:transparent;' +
                'border:0;' +
                'color:inherit;' +
                'cursor:pointer;' +
                'text-align:left' +
            '}' +

            '.mtwr-head b{flex:1}' +

            '.mtwr-dot{' +
                'width:9px;' +
                'height:9px;' +
                'border-radius:50%;' +
                'background:#8d929e' +
            '}' +

            '.mtwr-dot.active{background:#66d17a}' +
            '.mtwr-dot.work{background:#f0c75e}' +
            '.mtwr-dot.error{background:#ed6a6a}' +

            '.mtwr-body{' +
                'padding:11px 12px;' +
                'border-top:1px solid rgba(255,255,255,.1)' +
            '}' +

            '.mtwr-small{' +
                'font-size:12px;' +
                'opacity:.72;' +
                'margin:3px 0' +
            '}' +

            '.mtwr-controls{' +
                'display:flex;' +
                'gap:6px;' +
                'flex-wrap:wrap;' +
                'margin:9px 0' +
            '}' +

            '.mtwr-btn{' +
                'border:1px solid rgba(255,255,255,.16);' +
                'background:rgba(255,255,255,.08);' +
                'color:inherit;' +
                'border-radius:7px;' +
                'padding:6px 9px;' +
                'cursor:pointer' +
            '}' +

            '.mtwr-btn:disabled{opacity:.45}' +

            '.mtwr-sub{' +
                'font-size:11px;' +
                'text-transform:uppercase;' +
                'letter-spacing:.07em;' +
                'opacity:.58;' +
                'margin:10px 0 4px' +
            '}' +

            '.mtwr-row{' +
                'display:flex;' +
                'gap:7px;' +
                'align-items:center;' +
                'padding:3px 0' +
            '}' +

            '.mtwr-row a{' +
                'color:#d9e5ff!important;' +
                'flex:1;' +
                'overflow:hidden;' +
                'text-overflow:ellipsis;' +
                'white-space:nowrap' +
            '}' +

            '.mtwr-badge{' +
                'min-width:20px;' +
                'text-align:center;' +
                'border-radius:10px;' +
                'padding:1px 5px;' +
                'background:#8d7023' +
            '}' +

            '.mtwr-act{' +
                'font-size:12px;' +
                'padding:3px 0' +
            '}' +

            '.mtwr-fix{color:#bfe7c7}' +
            '.mtwr-error{color:#f0aaaa}' +

            '#mtw-review-report{' +
                'margin:0 0 18px;' +
                'padding:12px 14px;' +
                'border-radius:9px;' +
                'border:1px solid rgba(120,130,150,.35);' +
                'background:rgba(120,130,150,.08);' +
                'font-size:14px;' +
                'line-height:1.45' +
            '}' +

            '.mtwr-report-head{' +
                'display:flex;' +
                'gap:10px;' +
                'align-items:center;' +
                'flex-wrap:wrap;' +
                'margin-bottom:7px' +
            '}' +

            '.mtwr-report-head span{' +
                'font-size:12px;' +
                'opacity:.72' +
            '}' +

            '.mtwr-issues{' +
                'margin:8px 0 0 20px;' +
                'padding:0' +
            '}' +

            '.mtwr-issue{' +
                'margin:6px 0' +
            '}' +

            '.mtwr-sev{' +
                'font-size:10px;' +
                'font-weight:700;' +
                'margin-right:7px;' +
                'padding:1px 5px;' +
                'border-radius:4px;' +
                'background:rgba(255,255,255,.1)' +
            '}' +

            '.mtwr-note{' +
                'opacity:.72;' +
                'margin:6px 0' +
            '}' +

            '.mtwr-report-btn{' +
                'margin-top:9px;' +
                'border:1px solid currentColor;' +
                'background:transparent;' +
                'color:inherit;' +
                'border-radius:6px;' +
                'padding:5px 9px;' +
                'cursor:pointer' +
            '}' +

            '@media(max-width:700px){' +
                '#mtw-reviewer{' +
                    'right:10px;' +
                    'bottom:10px;' +
                    'width:min(330px,calc(100vw - 20px))' +
                '}' +
            '}';

        document.head.appendChild(
            s
        );
    }

    function createWidget() {
        if (widget) {
            return;
        }

        widget =
            document.createElement(
                'aside'
            );

        widget.id =
            'mtw-reviewer';

        var head =
            document.createElement(
                'button'
            );

        head.type =
            'button';

        head.className =
            'mtwr-head';

        dot =
            document.createElement(
                'span'
            );

        dot.className =
            'mtwr-dot';

        var name =
            document.createElement(
                'b'
            );

        name.textContent =
            'MTW Reviewer v4';

        status =
            document.createElement(
                'span'
            );

        status.textContent =
            'Starting…';

        var chev =
            document.createElement(
                'span'
            );

        chev.textContent =
            '▾';

        head.appendChild(
            dot
        );

        head.appendChild(
            name
        );

        head.appendChild(
            status
        );

        head.appendChild(
            chev
        );

        body =
            document.createElement(
                'div'
            );

        body.className =
            'mtwr-body';

        progress =
            document.createElement(
                'div'
            );

        stats =
            document.createElement(
                'div'
            );

        stats.className =
            'mtwr-small';

        var controls =
            document.createElement(
                'div'
            );

        controls.className =
            'mtwr-controls';

        pauseBtn =
            document.createElement(
                'button'
            );

        pauseBtn.className =
            'mtwr-btn';

        pauseBtn.type =
            'button';

        fixBtn =
            document.createElement(
                'button'
            );

        fixBtn.className =
            'mtwr-btn';

        fixBtn.type =
            'button';

        currentBtn =
            document.createElement(
                'button'
            );

        currentBtn.className =
            'mtwr-btn';

        currentBtn.type =
            'button';

        currentBtn.textContent =
            'Scan current';

        var reset =
            document.createElement(
                'button'
            );

        reset.className =
            'mtwr-btn';

        reset.type =
            'button';

        reset.textContent =
            'Restart pass';

        controls.appendChild(
            pauseBtn
        );

        controls.appendChild(
            fixBtn
        );

        controls.appendChild(
            currentBtn
        );

        controls.appendChild(
            reset
        );

        var rh =
            document.createElement(
                'div'
            );

        rh.className =
            'mtwr-sub';

        rh.textContent =
            'Flagged pages';

        recent =
            document.createElement(
                'div'
            );

        var ah =
            document.createElement(
                'div'
            );

        ah.className =
            'mtwr-sub';

        ah.textContent =
            'Latest activity';

        activity =
            document.createElement(
                'div'
            );

        body.appendChild(
            progress
        );

        body.appendChild(
            stats
        );

        body.appendChild(
            controls
        );

        body.appendChild(
            rh
        );

        body.appendChild(
            recent
        );

        body.appendChild(
            ah
        );

        body.appendChild(
            activity
        );

        widget.appendChild(
            head
        );

        widget.appendChild(
            body
        );

        document.body.appendChild(
            widget
        );

        head.addEventListener(
            'click',
            function () {
                state.collapsed =
                    !state.collapsed;

                save();
                renderWidget();
            }
        );

        pauseBtn.addEventListener(
            'click',
            function () {
                state.enabled =
                    !state.enabled;

                save();

                if (
                    state.enabled
                ) {
                    scheduleScan(
                        300
                    );

                    scheduleEditWorker(
                        300
                    );
                } else {
                    clearTimeout(
                        timer
                    );

                    clearTimeout(
                        editTimer
                    );
                }

                renderWidget();
            }
        );

        fixBtn.addEventListener(
            'click',
            function () {
                if (
                    !canAutoEdit()
                ) {
                    return;
                }

                state.autoFixEnabled =
                    !state.autoFixEnabled;

                save();
                renderWidget();

                if (
                    state.autoFixEnabled
                ) {
                    scheduleEditWorker(
                        250
                    );
                }
            }
        );

        currentBtn.addEventListener(
            'click',
            function () {
                if (
                    !articleView()
                ) {
                    return;
                }

                currentBtn.disabled =
                    true;

                reviewTitle(
                    titleNow(),
                    true
                ).catch(function (e) {
                    pushActivity(
                        'error',
                        e.message
                    );
                }).finally(function () {
                    currentBtn.disabled =
                        false;

                    renderReport();
                });
            }
        );

        reset.addEventListener(
            'click',
            function () {
                state.cursor =
                    null;

                state.cycle++;

                save();

                scheduleScan(
                    250
                );

                renderWidget();
            }
        );
    }

    function renderWidget() {
        if (!widget) {
            return;
        }

        body.hidden =
            !!state.collapsed;

        var ok =
            canAutoEdit();

        dot.className =
            'mtwr-dot ' +
            (
                state.lastError ?
                    'error' :
                    (
                        scanning ||
                        editBusy ?
                            'work' :
                            (
                                state.enabled ?
                                    'active' :
                                    ''
                            )
                    )
            );

        status.textContent =
            state.lastError ?
                'Warning' :
                (
                    state.enabled ?
                        (
                            scanning ?
                                'Scanning' :
                                (
                                    editBusy ?
                                        'Editing' :
                                        'Active'
                                )
                        ) :
                        'Paused'
                );

        var s =
            summarize();

        progress.textContent =
            'Cycle ' +
            state.cycle +
            (
                state.cursor ?
                    ' • continuing through wiki' :
                    ' • pass boundary'
            );

        stats.textContent =
            s.reviewed +
            ' reviewed • ' +
            s.flagged +
            ' flagged • ' +
            s.issues +
            ' issues • ' +
            state.autoEdits +
            ' auto edits • ' +
            state.autoFixes +
            ' fixes';

        pauseBtn.textContent =
            state.enabled ?
                'Pause' :
                'Resume';

        fixBtn.disabled =
            !ok;

        fixBtn.textContent =
            ok ?
                (
                    'Auto-fix: ' +
                    (
                        state.autoFixEnabled ?
                            'ON' :
                            'OFF'
                    )
                ) :
                'Auto-fix: no permission';

        currentBtn.disabled =
            !articleView();

        recent.textContent =
            '';

        Object.keys(
            state.pages
        ).map(function (k) {
            return state.pages[
                k
            ];
        }).filter(function (r) {
            return (
                r &&
                r.totalIssues >
                0
            );
        }).sort(function (a, b) {
            return (
                (
                    b.major -
                    a.major
                ) ||
                (
                    b.warning -
                    a.warning
                ) ||
                String(
                    b.checkedAt
                ).localeCompare(
                    String(
                        a.checkedAt
                    )
                )
            );
        }).slice(
            0,
            6
        ).forEach(function (r) {
            var row =
                document.createElement(
                    'div'
                );

            row.className =
                'mtwr-row';

            row.appendChild(
                wikiLink(
                    r.title
                )
            );

            var badge =
                document.createElement(
                    'span'
                );

            badge.className =
                'mtwr-badge';

            badge.textContent =
                r.totalIssues;

            row.appendChild(
                badge
            );

            recent.appendChild(
                row
            );
        });

        if (
            !recent.childNodes.length
        ) {
            recent.textContent =
                'No flagged pages stored yet.';
        }

        activity.textContent =
            '';

        state.activity
            .slice(
                0,
                6
            )
            .forEach(
                function (a) {
                    var d =
                        document.createElement(
                            'div'
                        );

                    d.className =
                        'mtwr-act ' +
                        (
                            a.kind ===
                            'fix' ?
                                'mtwr-fix' :
                                (
                                    a.kind ===
                                    'error' ?
                                        'mtwr-error' :
                                        ''
                                )
                        );

                    d.textContent =
                        new Date(
                            a.time
                        ).toLocaleTimeString(
                            [],
                            {
                                hour:
                                    '2-digit',

                                minute:
                                    '2-digit'
                            }
                        ) +
                        ' — ' +
                        a.text;

                    activity.appendChild(
                        d
                    );
                }
            );

        if (
            !activity.childNodes.length
        ) {
            activity.textContent =
                'No activity yet.';
        }
    }

    function renderReport() {
        if (
            report &&
            report.parentNode
        ) {
            report.remove();
        }

        report =
            null;

        if (
            !articleView()
        ) {
            return;
        }

        var parser =
            document.querySelector(
                '.page-content .mw-parser-output'
            ) ||
            document.querySelector(
                '.mw-parser-output'
            );

        if (
            !parser ||
            !parser.parentNode
        ) {
            return;
        }

        var rec =
            getRecord(
                titleNow()
            );

        var stale =
            !!(
                rec &&
                revNow() &&
                rec.revisionId &&
                rec.revisionId !==
                revNow()
            );

        report =
            document.createElement(
                'section'
            );

        report.id =
            'mtw-review-report';

        var h =
            document.createElement(
                'div'
            );

        h.className =
            'mtwr-report-head';

        var b =
            document.createElement(
                'strong'
            );

        b.textContent =
            'MTW Reviewer';

        var sum =
            document.createElement(
                'span'
            );

        h.appendChild(
            b
        );

        h.appendChild(
            sum
        );

        report.appendChild(
            h
        );

        var box =
            document.createElement(
                'div'
            );

        report.appendChild(
            box
        );

        if (!rec) {
            sum.textContent =
                'Not reviewed yet';

            box.textContent =
                'This article is queued for a browser-side review.';
        } else if (stale) {
            sum.textContent =
                'Review outdated';

            box.textContent =
                'This article changed after the stored review. A fresh scan is being requested.';
        } else {
            sum.textContent =
                rec.totalIssues +
                ' issue' +
                (
                    rec.totalIssues ===
                    1 ?
                        '' :
                        's'
                ) +
                ' • ' +
                rec.minor +
                ' minor • ' +
                rec.warning +
                ' warning • ' +
                rec.major +
                ' major';

            if (
                rec.autoFix &&
                rec.autoFix.applied
            ) {
                var fx =
                    document.createElement(
                        'div'
                    );

                fx.className =
                    'mtwr-note mtwr-fix';

                fx.textContent =
                    '✓ ' +
                    rec.autoFix.fixes +
                    ' safe automatic correction' +
                    (
                        rec.autoFix.fixes ===
                        1 ?
                            '' :
                            's'
                    ) +
                    ' applied on ' +
                    human(
                        rec.autoFix.at
                    ) +
                    '.';

                box.appendChild(
                    fx
                );
            }

            var note =
                document.createElement(
                    'div'
                );

            note.className =
                'mtwr-note';

            note.textContent =
                'Last checked ' +
                human(
                    rec.checkedAt
                ) +
                '. Automated review does not verify canon/lore accuracy.';

            box.appendChild(
                note
            );

            if (
                rec.issues.length
            ) {
                var ul =
                    document.createElement(
                        'ul'
                    );

                ul.className =
                    'mtwr-issues';

                rec.issues.forEach(
                    function (x) {
                        var li =
                            document.createElement(
                                'li'
                            );

                        li.className =
                            'mtwr-issue';

                        var sev =
                            document.createElement(
                                'span'
                            );

                        sev.className =
                            'mtwr-sev';

                        sev.textContent =
                            x.severity.toUpperCase();

                        li.appendChild(
                            sev
                        );

                        li.appendChild(
                            document.createTextNode(
                                (
                                    x.line ?
                                        'Line ' +
                                        x.line +
                                        ': ' :
                                        ''
                                ) +
                                x.message
                            )
                        );

                        ul.appendChild(
                            li
                        );
                    }
                );

                box.appendChild(
                    ul
                );
            }
        }

        var btn =
            document.createElement(
                'button'
            );

        btn.type =
            'button';

        btn.className =
            'mtwr-report-btn';

        btn.textContent =
            rec ?
                'Rescan this article' :
                'Review this article now';

        btn.addEventListener(
            'click',
            function () {
                btn.disabled =
                    true;

                reviewTitle(
                    titleNow(),
                    true
                ).finally(function () {
                    btn.disabled =
                        false;

                    renderReport();
                });
            }
        );

        report.appendChild(
            btn
        );

        parser.parentNode.insertBefore(
            report,
            parser
        );

        if (
            !rec ||
            stale
        ) {
            setTimeout(
                function () {
                    reviewTitle(
                        titleNow(),
                        false
                    ).catch(
                        function () {}
                    );
                },
                500
            );
        }
    }

    function start() {
        injectCss();
        createWidget();

        if (
            !canAutoEdit()
        ) {
            state.autoFixEnabled =
                false;

            save();
        }

        renderWidget();
        renderReport();

        if (mw.hook) {
            mw.hook(
                'wikipage.content'
            ).add(
                function () {
                    setTimeout(
                        renderReport,
                        0
                    );
                }
            );
        }

        if (
            state.enabled
        ) {
            scheduleScan(
                R.firstDelay
            );

            scheduleEditWorker(
                1000
            );
        }

        setInterval(
            renderWidget,
            30000
        );
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