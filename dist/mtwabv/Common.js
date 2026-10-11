/* ============================================================================
 * MY THREE WIVES ARE BEAUTIFUL VAMPIRES WIKI — COMMON.JS
 * AUDITED CONSOLIDATED VERSION — 2026-10-06
 *
 * Includes (search for the module title below):
 *   01. Reading progress / Back-to-top / section-link controls
 *   02. Article hover previews (skips homepage Character Directory)
 *   03. Elderblood affiliation badge
 *   04. Harem / Daughters family-status header seals
 *   05. Lineage viewer with Fit / manual zoom
 *   06. Homepage character portrait floating pop-out
 *   07. Victor Elderblood Gallery V3
 *   08. Fandom utility imports: ReferencePopups / CategorySorter / SearchSuggest
 *   09. Keyboard search shortcuts (/ and Ctrl/Cmd+K)
 *   10. Red-link target tooltips
 *   11. Section-aware article URLs
 *   12. Searchable article section list
 *   13. Section bookmarks saved on this browser
 *   14. Filters for suitable large sortable tables
 *   15. Copy buttons for code / preformatted text
 *   16. AdaptiveCategoryFilter — category letters based on actual members
 *   17. CatFilter — filter category members by namespace
 *   18. Estimated reading time for visible article prose
 *   19. Reader text-size / relaxed-spacing controls (browser preferences)
 *   20. CollapsibleHeaders — optional Dev Wiki import (off by default)
 *   21. Search references (keeps citation numbering and backlinks intact)
 *   22. Gallery original-file lookup (same-wiki imageinfo API; on demand)
 *   23. Anchor recovery for native details and filtered table rows
 *
 * FIXES: seal observer feedback; coalesced layout work; late gallery setup;
 * persistent reference anchors; editable-field shortcut handling; nested prose
 * counts; hidden-gallery image loading; preview keyboard focus restoration.
 * Existing site-specific styling still uses your current Common.css.
 * New tools include scoped CSS. No wiki edits are performed by this script.
 * Dev Wiki imports remain external dependencies, not bundled source.
 * Set window.MTWPageToolsConfig = { referenceSearch: false,
 *   originalImages: false, anchorRecovery: false } before this file to opt out.
 * External imports can be disabled individually via MTWExtraReaderConfig:
 * referencePopups, categorySorter, searchSuggest (each defaults to enabled).
 * Disable the matching option if already loaded through MediaWiki:ImportJS.
 * Set MTWExtraReaderConfig.sectionAwareUrls = true to enable URL auto-updates;
 * they now default off so copied reference/deep links remain stable.
 *
 * Reader tools include their own styles. No additional Common.css is needed.
 * Reader options and opt-out classes: see [MTW-JS-012] near the end.
 *
 * Replace the ENTIRE contents of MediaWiki:Common.js with this file.
 * ============================================================================ */


/* [MTW-JS-READER-CONFIG] Optional switches; set false to disable a feature.
 * CollapsibleHeaders wraps article sections, so enable it only after checking
 * your custom article layouts. Excluded: homepage, lineage and gallery pages.
 * Native Fandom mobile may not load Common.js; this is not a mobile JS bypass.
 */
window.MTWExtraReaderConfig = window.MTWExtraReaderConfig || {
    adaptiveCategoryFilter: true,
    categoryNamespaceFilter: true,
    readingTime: true,
    displayControls: true,
    sectionAwareUrls: false,
    collapsibleHeaders: false
};



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
            document.body && !document.body.classList.contains('ve-activated') &&
            !new URLSearchParams(location.search).has('diff') &&
            !new URLSearchParams(location.search).has('veaction');
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
        if (!normalPage()) { hidePreview(); scheduleUpdate(); return; }
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
                    var returnTo = current.anchor;
                    hidePreview();
                    restoringFocus = true;
                    safeFocus(returnTo);
                    restoringFocus = false;
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
                    var triggerAnchor = current.anchor;
                    restoringFocus = true;
                    safeFocus(triggerAnchor);
                    restoringFocus = false;
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

/* ============================================================================
 * MTW — FAMILY STATUS HEADER SEALS
 * HAREM + DAUGHTERS — STRICT CATEGORY MEMBERSHIP
 * ----------------------------------------------------------------------------
 * Placement rules:
 *   • Applies to Category:Harem      → Harem seal occupies the first left slot.
 *   • Applies to Category:Daughters  → Daughter seal occupies the first left slot.
 *   • Both categories              → Harem first, Daughter immediately beside it.
 *
 * Important:
 *   • Membership is read ONLY from the current page's wgCategories.
 *   • Category pages themselves never receive these seals.
 *   • The Elderblood seal remains a completely independent module.
 *   • Both seals mirror the Elderblood crest's rendered size and vertical row
 *     whenever that crest exists; otherwise safe fallback dimensions are used.
 *   • Self-contained: injects its own CSS and needs no Common.css additions.
 * ============================================================================ */

(function (mw) {
    'use strict';

    if (!mw || window.__mtwFamilyStatusSealsLoaded) {
        return;
    }

    window.__mtwFamilyStatusSealsLoaded = true;

    var HAREM_KEY = 'harem';
    var DAUGHTERS_KEY = 'daughters';

    var HAREM_ID = 'mtw-harem-header-seal';
    var DAUGHTER_ID = 'mtw-daughter-header-seal';
    var STYLE_ID = 'mtw-family-header-seal-styles';

    var FALLBACK_SIZE = 72;
    var FALLBACK_TOP = 24;
    var FALLBACK_INSET = 28;
    var DESKTOP_GAP = 10;
    var MOBILE_GAP = 7;

    var alignmentFrame = null;
    var alignmentObserver = null;
    var alignmentResizeObserver = null;

    function normalize(value) {
        return String(value || '')
            .replace(/^Category:/i, '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function isViewAction() {
        return (mw.config.get('wgAction') || 'view') === 'view';
    }

    function isArticlePage() {
        return Number(mw.config.get('wgNamespaceNumber')) === 0;
    }

    function currentCategories() {
        var categories = mw.config.get('wgCategories') || [];

        if (!Array.isArray(categories)) {
            return [];
        }

        return categories.map(normalize);
    }

    function getMembership() {
        var categories = currentCategories();

        return {
            harem: categories.indexOf(HAREM_KEY) !== -1,
            daughters: categories.indexOf(DAUGHTERS_KEY) !== -1
        };
    }

    function findHeader() {
        return (
            document.querySelector('.page-header') ||
            document.querySelector('.page-header__main') ||
            document.querySelector('#content') ||
            document.querySelector('.page__main')
        );
    }

    function findElderbloodSeal() {
        return document.getElementById('mtw-elderblood-badge');
    }

    function getReferenceRect() {
        var elderblood = findElderbloodSeal();
        var svg;
        var rect;

        if (!elderblood || !elderblood.isConnected) {
            return null;
        }

        svg = elderblood.querySelector('svg');
        rect = (svg || elderblood).getBoundingClientRect();

        if (!rect || rect.width < 10 || rect.height < 10) {
            return null;
        }

        return rect;
    }

    function installStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.type = 'text/css';
        style.textContent = [
            '.mtw-family-seal-host{position:relative!important;}',

            '.mtw-family-header-seal{',
            'position:absolute;',
            'left:28px;',
            'top:24px;',
            'z-index:25;',
            'width:72px;',
            'height:72px;',
            'box-sizing:border-box;',
            'display:block;',
            'margin:0!important;',
            'padding:0!important;',
            'border:0!important;',
            'background:none!important;',
            'text-decoration:none!important;',
            'color:inherit!important;',
            'line-height:0;',
            'outline:none;',
            'transform-origin:50% 50%;',
            'filter:drop-shadow(0 5px 12px rgba(0,0,0,.5));',
            'transition:transform .18s ease,filter .18s ease;',
            '}',

            '.mtw-family-header-seal:hover,.mtw-family-header-seal:focus-visible{',
            'transform:scale(1.055);',
            'filter:drop-shadow(0 7px 16px rgba(0,0,0,.56)) drop-shadow(0 0 9px rgba(235,111,153,.24));',
            '}',

            '.mtw-family-header-seal .mtw-family-seal__svg{',
            'position:absolute;',
            'inset:0;',
            'display:block;',
            'width:100%;',
            'height:100%;',
            'overflow:visible;',
            '}',

            '.mtw-family-header-seal .mtw-family-seal__tooltip{',
            'position:absolute;',
            'left:0;',
            'top:calc(100% + 9px);',
            'width:max-content;',
            'max-width:240px;',
            'padding:8px 11px 9px;',
            'box-sizing:border-box;',
            'pointer-events:none;',
            'opacity:0;',
            'visibility:hidden;',
            'transform:translateY(-4px);',
            'border:1px solid rgba(224,119,153,.56);',
            'border-radius:7px;',
            'background:rgba(18,12,16,.97);',
            'box-shadow:0 8px 24px rgba(0,0,0,.48);',
            'white-space:normal;',
            'line-height:1.35;',
            'transition:opacity .15s ease,transform .15s ease,visibility .15s ease;',
            '}',

            '.mtw-family-header-seal:hover .mtw-family-seal__tooltip,',
            '.mtw-family-header-seal:focus-visible .mtw-family-seal__tooltip{',
            'opacity:1;',
            'visibility:visible;',
            'transform:translateY(0);',
            '}',

            '.mtw-family-header-seal .mtw-family-seal__tooltip strong{',
            'display:block;',
            'margin:0 0 3px;',
            'font-size:10px;',
            'line-height:1.2;',
            'letter-spacing:.16em;',
            '}',

            '.mtw-family-header-seal .mtw-family-seal__tooltip span{',
            'display:block;',
            'font-size:11px;',
            'line-height:1.35;',
            'color:#d9c8cf;',
            '}',

            '#mtw-harem-header-seal .mtw-family-seal__tooltip strong{color:#f2b2c7;}',
            '#mtw-daughter-header-seal .mtw-family-seal__tooltip{border-color:rgba(188,147,242,.58);}',
            '#mtw-daughter-header-seal .mtw-family-seal__tooltip strong{color:#d9bfff;}',

            '@media(max-width:768px){',
            '.mtw-family-header-seal{width:48px;height:48px;}',
            '.mtw-family-header-seal .mtw-family-seal__tooltip{display:none;}',
            '}',

            '@media(prefers-reduced-motion:reduce){',
            '.mtw-family-header-seal,.mtw-family-header-seal *{transition:none!important;}',
            '}'
        ].join('');

        (document.head || document.documentElement).appendChild(style);
    }

    function categoryUrl(name) {
        if (mw.util && typeof mw.util.getUrl === 'function') {
            return mw.util.getUrl('Category:' + name);
        }

        return '/wiki/Category:' + encodeURIComponent(name).replace(/%20/g, '_');
    }

    function haremMarkup() {
        return '' +
            '<svg class="mtw-family-seal__svg" viewBox="0 0 96 96" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
                '<defs>' +
                    '<linearGradient id="mtw-family-harem-gold" x2="0" y2="1">' +
                        '<stop stop-color="#ffe0a3"/><stop offset=".5" stop-color="#b38349"/><stop offset="1" stop-color="#edc88d"/>' +
                    '</linearGradient>' +
                    '<linearGradient id="mtw-family-harem-membrane" x2="0" y2="1">' +
                        '<stop stop-color="#a6385d"/><stop offset="1" stop-color="#2a0d20"/>' +
                    '</linearGradient>' +
                    '<radialGradient id="mtw-family-harem-heart" cx=".35" cy=".3">' +
                        '<stop stop-color="#fff0f5"/><stop offset=".22" stop-color="#ff9dbb"/>' +
                        '<stop offset=".6" stop-color="#df3e70"/><stop offset="1" stop-color="#761432"/>' +
                    '</radialGradient>' +
                '</defs>' +
                '<g fill="none" stroke="url(#mtw-family-harem-gold)" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" opacity=".97">' +
                    '<path d="M20 27A35 35 0 0 1 39 14M57 14A35 35 0 0 1 76 27M82 42A35 35 0 0 1 62 79M34 79A35 35 0 0 1 14 42"/>' +
                    '<path d="M48 4 51 9 48 14 45 9ZM48 82 51 87 48 92 45 87Z"/>' +
                '</g>' +
                '<g fill="url(#mtw-family-harem-membrane)" stroke="url(#mtw-family-harem-gold)" stroke-width="2.15" stroke-linejoin="round">' +
                    '<path d="M39 40C27 24 12 29 3 15L8 38 18 35 12 54 26 45 23 64 39 53Z"/>' +
                    '<path d="M57 40C69 24 84 29 93 15L88 38 78 35 84 54 70 45 73 64 57 53Z"/>' +
                '</g>' +
                '<path d="M37 33C27 27 26 15 29 7L39 23 44 27H52L57 23 67 7C70 15 69 27 59 33L56 39H40Z" fill="#2a0d20" stroke="url(#mtw-family-harem-gold)" stroke-width="2.1"/>' +
                '<path d="M48 22 62 34 59 51 53 59 48 66 43 59 37 51 34 34Z" fill="url(#mtw-family-harem-membrane)" stroke="url(#mtw-family-harem-gold)" stroke-width="2.35"/>' +
                '<path d="M48 57C45 51 37 48 37 41c0-5 4-9 9-9 1 0 2 .2 2 .6.7-.4 1.4-.6 2-.6 5 0 9 4 9 9 0 7-8 10-11 16Z" fill="url(#mtw-family-harem-heart)" stroke="#f7cada" stroke-width="1.25"/>' +
                '<path d="M34 58 38 72 48 83 58 72 62 58 55 64 48 74 41 64Z" fill="none" stroke="url(#mtw-family-harem-gold)" stroke-width="2.15" stroke-linejoin="round"/>' +
            '</svg>' +
            '<span class="mtw-family-seal__tooltip" role="tooltip">' +
                '<strong>IMPERIAL HAREM</strong>' +
                '<span>This character belongs to the Harem category. Click to view the full category.</span>' +
            '</span>';
    }

    function daughterMarkup() {
        return '' +
            '<svg class="mtw-family-seal__svg" viewBox="0 0 96 96" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
                '<defs>' +
                    '<linearGradient id="mtw-family-daughter-gold" x2="0" y2="1">' +
                        '<stop stop-color="#ffe5ad"/><stop offset=".48" stop-color="#b98a52"/><stop offset="1" stop-color="#f0cf94"/>' +
                    '</linearGradient>' +
                    '<linearGradient id="mtw-family-daughter-violet" x2="0" y2="1">' +
                        '<stop stop-color="#8f5cc3"/><stop offset=".55" stop-color="#4a235f"/><stop offset="1" stop-color="#1b0d2a"/>' +
                    '</linearGradient>' +
                    '<radialGradient id="mtw-family-daughter-gem" cx=".35" cy=".28">' +
                        '<stop stop-color="#fff4ff"/><stop offset=".22" stop-color="#d8b5ff"/>' +
                        '<stop offset=".62" stop-color="#9460d0"/><stop offset="1" stop-color="#49206d"/>' +
                    '</radialGradient>' +
                '</defs>' +
                '<g fill="none" stroke="url(#mtw-family-daughter-gold)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" opacity=".98">' +
                    '<path d="M18 31 28 18 39 25 48 8 57 25 68 18 78 31"/>' +
                    '<path d="M15 39C12 54 18 72 34 82M81 39C84 54 78 72 62 82"/>' +
                    '<path d="M48 3 51 8 48 13 45 8ZM48 83 51 88 48 93 45 88Z"/>' +
                '</g>' +
                '<path d="M22 31 33 27 40 34 48 20 56 34 63 27 74 31 68 48 48 62 28 48Z" fill="url(#mtw-family-daughter-violet)" stroke="url(#mtw-family-daughter-gold)" stroke-width="2.25" stroke-linejoin="round"/>' +
                '<path d="M48 29 54 40 66 42 57 51 59 63 48 57 37 63 39 51 30 42 42 40Z" fill="url(#mtw-family-daughter-gem)" stroke="#ead7ff" stroke-width="1.35" stroke-linejoin="round"/>' +
                '<path d="M31 58 37 74 48 85 59 74 65 58 57 65 48 75 39 65Z" fill="url(#mtw-family-daughter-violet)" stroke="url(#mtw-family-daughter-gold)" stroke-width="2.15" stroke-linejoin="round"/>' +
                '<circle cx="48" cy="45" r="4.4" fill="#fff7ff" opacity=".88"/>' +
            '</svg>' +
            '<span class="mtw-family-seal__tooltip" role="tooltip">' +
                '<strong>IMPERIAL DAUGHTER</strong>' +
                '<span>This character belongs to the Daughters category. Click to view the full category.</span>' +
            '</span>';
    }

    function makeSeal(id, categoryName, title, label, markup) {
        var seal = document.getElementById(id);

        if (seal) {
            return seal;
        }

        seal = document.createElement('a');
        seal.id = id;
        seal.className = 'mtw-family-header-seal';
        seal.href = categoryUrl(categoryName);
        seal.title = title;
        seal.setAttribute('aria-label', label);
        seal.innerHTML = markup;

        return seal;
    }

    function removeSeal(id) {
        var seal = document.getElementById(id);

        if (seal && seal.parentNode) {
            seal.parentNode.removeChild(seal);
        }
    }

    function ensureCorrectSeals(membership) {
        var header = findHeader();
        var harem;
        var daughter;

        if (!header) {
            return false;
        }

        installStyles();
        header.classList.add('mtw-family-seal-host');

        if (membership.harem) {
            harem = makeSeal(
                HAREM_ID,
                'Harem',
                'Imperial Harem — View Category:Harem',
                'Imperial Harem. View Category:Harem.',
                haremMarkup()
            );

            if (!harem.parentNode) {
                header.appendChild(harem);
            }
        } else {
            removeSeal(HAREM_ID);
        }

        if (membership.daughters) {
            daughter = makeSeal(
                DAUGHTER_ID,
                'Daughters',
                'Imperial Daughter — View Category:Daughters',
                'Imperial Daughter. View Category:Daughters.',
                daughterMarkup()
            );

            if (!daughter.parentNode) {
                header.appendChild(daughter);
            }
        } else {
            removeSeal(DAUGHTER_ID);
        }

        return true;
    }

    function alignmentMetrics() {
        var header = findHeader();
        var referenceRect = getReferenceRect();
        var headerRect;
        var compact = window.matchMedia && window.matchMedia('(max-width:768px)').matches;
        var size = compact ? 48 : FALLBACK_SIZE;
        var top = compact ? 18 : FALLBACK_TOP;
        var inset = compact ? 16 : FALLBACK_INSET;

        if (!header) {
            return null;
        }

        headerRect = header.getBoundingClientRect();

        if (referenceRect && headerRect.width && headerRect.height) {
            size = Math.round(Math.max(referenceRect.width, referenceRect.height));
            top = Math.round(referenceRect.top - headerRect.top);
            inset = Math.round(headerRect.right - referenceRect.right);
        }

        return {
            size: Math.max(36, size),
            top: Math.max(0, top),
            inset: Math.max(compact ? 16 : 18, inset),
            gap: compact ? MOBILE_GAP : DESKTOP_GAP
        };
    }

    function alignSeals() {
        var membership = getMembership();
        var metrics = alignmentMetrics();
        var harem = document.getElementById(HAREM_ID);
        var daughter = document.getElementById(DAUGHTER_ID);
        var first;
        var second;

        if (!metrics) {
            return false;
        }

        /*
         * Priority/order rule requested for MTW:
         *   Daughters only → Daughter owns the first position.
         *   Harem only     → Harem owns the first position.
         *   Both           → Harem first, Daughter second.
         */
        if (membership.harem && membership.daughters) {
            first = harem;
            second = daughter;
        } else if (membership.daughters) {
            first = daughter;
            second = null;
        } else if (membership.harem) {
            first = harem;
            second = null;
        } else {
            return false;
        }

        [harem, daughter].forEach(function (seal) {
            if (!seal) {
                return;
            }

            if (seal.style.width !== metrics.size + 'px') { seal.style.width = metrics.size + 'px'; }
            if (seal.style.height !== metrics.size + 'px') { seal.style.height = metrics.size + 'px'; }
            if (seal.style.top !== metrics.top + 'px') { seal.style.top = metrics.top + 'px'; }
        });

        if (first) {
            first.style.left = metrics.inset + 'px';
        }

        if (second) {
            second.style.left = (
                metrics.inset + metrics.size + metrics.gap
            ) + 'px';
        }

        return true;
    }

    function scheduleAlignment() {
        if (alignmentFrame) { return; }
        alignmentFrame = window.requestAnimationFrame(function () {
            alignmentFrame = null;
            alignSeals();
        });
    }

    function observeAlignment() {
        var header = findHeader();
        var elderblood = findElderbloodSeal();

        if (window.ResizeObserver && elderblood && !alignmentResizeObserver) {
            alignmentResizeObserver = new ResizeObserver(scheduleAlignment);
            alignmentResizeObserver.observe(elderblood);
        }

        if (window.MutationObserver && header && !alignmentObserver) {
            alignmentObserver = new MutationObserver(function (records) {
                // Ignore the geometry we write to our own seals.
                if (records.some(function (record) {
                    return !record.target.closest || !record.target.closest('.mtw-family-header-seal');
                })) { scheduleAlignment(); }
            });
            alignmentObserver.observe(header, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    }

    function installIfEligible() {
        var membership;

        if (!isViewAction() || !isArticlePage()) {
            removeSeal(HAREM_ID);
            removeSeal(DAUGHTER_ID);
            return;
        }

        membership = getMembership();

        if (!membership.harem && !membership.daughters) {
            removeSeal(HAREM_ID);
            removeSeal(DAUGHTER_ID);
            return;
        }

        ensureCorrectSeals(membership);
        observeAlignment();
        scheduleAlignment();
    }

    function start() {
        installIfEligible();

        window.setTimeout(installIfEligible, 250);
        window.setTimeout(installIfEligible, 800);
        window.setTimeout(installIfEligible, 1600);

        window.addEventListener('resize', function () {
            scheduleAlignment();
        }, { passive: true });

        if (mw.hook) {
            mw.hook('wikipage.content').add(function () {
                installIfEligible();
                observeAlignment();
                scheduleAlignment();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }

}(window.mediaWiki || window.mw));

/* =========================================================
 * MTW LINEAGE VIEWER
 * Auto-fit + manual zoom
 * ========================================================= */

(function () {
    'use strict';

    if (window.__mtwLineageViewerLoaded) {
        return;
    }
    window.__mtwLineageViewerLoaded = true;

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
        if (window.mw && (mw.config.get('wgAction') !== 'view' ||
            document.body && document.body.classList.contains('ve-activated'))) { return; }
        var scope =
            container || document;

        if (scope.matches && scope.matches('.mtw-lineage')) { initLineage(scope); }
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
        floating.style.pointerEvents = 'none';

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

        scale = Math.max(0.01, scale);

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
                    if (activeCard !== oldCard) { releaseCard(oldCard); }
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
        if (window.mw && (mw.config.get('wgAction') !== 'view' ||
            document.body && document.body.classList.contains('ve-activated') ||
            new URLSearchParams(location.search).has('diff') ||
            new URLSearchParams(location.search).has('veaction'))) { return false; }
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

            var headingCopy = headline.cloneNode(true);
            headingCopy.querySelectorAll('button,.mw-editsection').forEach(function (n) { n.remove(); });
            text = cleanText(headingCopy.textContent);

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
        if (!img || img.dataset.mtwGalleryLoadBound) { return; }
        img.dataset.mtwGalleryLoadBound = '1';
        img.addEventListener('load', handleGalleryImageLoad);
        if (img.complete && img.naturalWidth) { updateRatio(slideshow); }
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
        var slideshow = observer._mtwSlideshow;
        if (!slideshow || !slideshow.isConnected) { observer.disconnect(); return; }
        if (observer._mtwFrame) { return; }
        observer._mtwFrame = window.requestAnimationFrame(function () {
            observer._mtwFrame = null;
            slideshow.querySelectorAll('.wikia-slideshow-images img').forEach(function (img) {
                prepareGalleryImage(img, slideshow);
            });
            slideshow.classList.toggle('mtw-vg2-single', countSlideshowImages(slideshow) <= 1);
            updateRatio(slideshow);
        });
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

        if (!slideshow.querySelector('.wikia-slideshow-images')) { return; }
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

    var galleryRoot = null, galleryObserver = null, galleryFrame = null;
    function handleWikiContent() {
        enhance();
        if (!isVictorGallery() || !window.MutationObserver) { return; }
        var output = getOutput();
        if (!output || output === galleryRoot) { return; }
        if (galleryObserver) { galleryObserver.disconnect(); }
        galleryRoot = output;
        galleryObserver = new MutationObserver(function (records) {
            var relevant = records.some(function (record) {
                return Array.from(record.addedNodes).some(function (node) {
                    return node.nodeType === 1 && (node.matches('.wikia-slideshow,.wikia-slideshow-images') ||
                        node.querySelector('.wikia-slideshow,.wikia-slideshow-images'));
                });
            });
            if (!relevant || galleryFrame) { return; }
            galleryFrame = requestAnimationFrame(function () { galleryFrame = null; enhance(); });
        });
        galleryObserver.observe(output, {childList: true, subtree: true});
    }

    function start() {
        handleWikiContent();

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
/* ============================================================================
 * MTW — GENERAL-PURPOSE FANDOM ENHANCEMENTS
 *
 * Adds:
 *   08. Stable Fandom Developers Wiki utilities
 *       - ReferencePopups on normal article views
 *       - CategorySorter on normal article views
 *       - SearchSuggest on Special:Search only
 *   09. Keyboard search shortcut (/ or Ctrl/Cmd+K)
 *   10. Helpful red-link target tooltips
 *   11. Section-aware article URLs while reading
 *
 * Notes:
 * - External utilities are loaded from the Fandom Developers Wiki through
 *   Fandom's native importArticles() helper, so their code remains maintained
 *   upstream instead of being copied into this Common.js.
 * - All local features use guards and wikipage.content where appropriate.
 * ============================================================================ */

(function () {
    'use strict';

    if (!window.mw || window.__mtwGeneralPurposeEnhancementsLoaded) {
        return;
    }

    window.__mtwGeneralPurposeEnhancementsLoaded = true;

    var SECTION_TOP_OFFSET = 145;
    var HASH_SUPPRESS_MS = 2600;
    var hashSuppressUntil = window.location.hash ? Date.now() + 4200 : 0;
    var sectionFrame = null;
    var sectionHeadings = [];
    var importAttempts = 0;

    function isViewAction() {
        var params = new URLSearchParams(location.search);
        return mw.config.get('wgAction') === 'view' &&
            !document.body.classList.contains('ve-activated') &&
            !params.has('diff') && !params.has('veaction');
    }

    function isNormalNamespace() {
        var namespace = Number(mw.config.get('wgNamespaceNumber'));
        return isFinite(namespace) && namespace >= 0;
    }

    function importCommunityScripts() {
        var importer = typeof window.importArticles === 'function' ?
            window.importArticles : null;

        if (!importer) {
            importAttempts += 1;

            if (importAttempts <= 12) {
                window.setTimeout(importCommunityScripts, 250);
            }

            return;
        }

        var articles = [];
        var special = mw.config.get('wgCanonicalSpecialPageName') || '';

        if (isViewAction() && isNormalNamespace()) {
            if ((window.MTWExtraReaderConfig || {}).referencePopups !== false) {
                articles.push('u:dev:MediaWiki:ReferencePopups/code.js');
            }
            if ((window.MTWExtraReaderConfig || {}).categorySorter !== false) {
                articles.push('u:dev:MediaWiki:CategorySorter.js');
            }
        }

        if (special === 'Search' && (window.MTWExtraReaderConfig || {}).searchSuggest !== false) {
            articles.push('u:dev:MediaWiki:SearchSuggest/code.js');
        }

        var extra = window.MTWExtraReaderConfig || {};
        // [MTW-JS-016] ADAPTIVE CATEGORY FILTER — stable, site-wide Dev script.
        // Docs: https://dev.fandom.com/wiki/AdaptiveCategoryFilter
        // [MTW-JS-017] CATEGORY NAMESPACE FILTER — stable, site-wide Dev script.
        // Docs: https://dev.fandom.com/wiki/CatFilter
        if (isViewAction() && mw.config.get('wgNamespaceNumber') === 14) {
            if (extra.adaptiveCategoryFilter !== false) {
                articles.push('u:dev:MediaWiki:AdaptiveCategoryFilter.js');
            }
            if (extra.categoryNamespaceFilter !== false) {
                articles.push('u:dev:MediaWiki:CatFilter/code.js');
            }
        }
        // [MTW-JS-020] COLLAPSIBLE HEADERS — optional, stable site-wide script.
        // Docs: https://dev.fandom.com/wiki/CollapsibleHeaders
        if (extra.collapsibleHeaders === true && isViewAction() &&
            mw.config.get('wgNamespaceNumber') === 0 && !mw.config.get('wgIsMainPage') &&
            !document.querySelector('.mtw-lineage,.mtw-vg2,.mtw-vg2-archive,.gallery,.wikia-gallery-slideshow') &&
            !/\/Gallery$/i.test(mw.config.get('wgPageName') || '') &&
            !document.body.classList.contains('ve-activated') &&
            !new URLSearchParams(location.search).has('diff') &&
            !new URLSearchParams(location.search).has('oldid')) {
            articles.push('u:dev:MediaWiki:CollapsibleHeaders.js');
        }


        if (!articles.length) {
            return;
        }

        try {
            importer({
                type: 'script',
                articles: articles
            });
        } catch (ignore) {}
    }

    function isEditableTarget(node) {
        if (!node || !node.closest) {
            return false;
        }

        return !!node.closest(
            'input,textarea,select,[contenteditable]:not([contenteditable="false"]),' +
            '.ve-ce-documentNode,.CodeMirror,.cm-editor,.ace_editor'
        );
    }

    function visible(node) {
        if (!node || !node.isConnected) {
            return false;
        }

        var rect = node.getBoundingClientRect();
        var style = window.getComputedStyle ? window.getComputedStyle(node) : null;

        return rect.width > 0 &&
            rect.height > 0 &&
            (!style || (style.visibility !== 'hidden' && style.display !== 'none'));
    }

    function findSearchInput() {
        var selectors = [
            'input[type="search"]:not(.mtw-rt-input):not(.mtw-page-search)',
            'input[name="search"]',
            'input[name="query"]',
            '.search-modal__input',
            '.global-navigation__search-input',
            '.unified-search__input',
            '[role="search"] input'
        ];
        var i;
        var found;

        for (i = 0; i < selectors.length; i += 1) {
            found = Array.from(document.querySelectorAll(selectors[i])).filter(visible)[0];

            if (visible(found)) {
                return found;
            }
        }

        return null;
    }

    function findSearchTrigger() {
        var selectors = [
            '.global-navigation__search',
            '.global-navigation__search__button',
            '[data-tracking-label="search"]',
            'button[aria-label="Search"]',
            'button[aria-label*="Search"]',
            'a[aria-label="Search"]',
            'a[aria-label*="Search"]'
        ];
        var i;
        var found;

        for (i = 0; i < selectors.length; i += 1) {
            found = document.querySelector(selectors[i]);

            if (visible(found)) {
                return found;
            }
        }

        return null;
    }

    function focusSearch() {
        var input = findSearchInput();
        var trigger;

        if (input) {
            input.focus();

            if (typeof input.select === 'function') {
                try { input.select(); } catch (ignore) {}
            }

            return true;
        }

        trigger = findSearchTrigger();

        if (!trigger) {
            return false;
        }

        try {
            trigger.click();
        } catch (ignoreClick) {
            return false;
        }

        window.setTimeout(function () {
            var openedInput = findSearchInput();

            if (openedInput) {
                openedInput.focus();

                if (typeof openedInput.select === 'function') {
                    try { openedInput.select(); } catch (ignoreSelect) {}
                }
            }
        }, 80);

        return true;
    }

    function initSearchShortcut() {
        document.addEventListener('keydown', function (event) {
            var slash = event.key === '/' &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey;

            var commandK = (event.ctrlKey || event.metaKey) &&
                !event.altKey &&
                String(event.key).toLowerCase() === 'k';

            if (event.defaultPrevented || event.isComposing || event.repeat ||
                (!slash && !commandK) || isEditableTarget(event.target)) {
                return;
            }

            if (focusSearch()) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, false);
    }

    function redLinkTarget(anchor) {
        var href;
        var url;
        var title;

        if (!anchor || !anchor.classList || !anchor.classList.contains('new')) {
            return '';
        }

        href = anchor.getAttribute('href') || '';

        if (!href) {
            return '';
        }

        try {
            url = new URL(href, window.location.href);
            title = url.searchParams.get('title');

            if (!title && url.pathname.indexOf('/wiki/') === 0) {
                title = decodeURIComponent(url.pathname.slice(6));
            }

            return (title || '')
                .replace(/_/g, ' ')
                .trim();
        } catch (ignore) {
            return '';
        }
    }

    function enhanceRedLinks(root) {
        var base = root && root.querySelectorAll ? root : document;

        base.querySelectorAll('a.new').forEach(function (anchor) {
            var target;

            if (anchor.dataset.mtwRedlinkReady === '1') {
                return;
            }

            anchor.dataset.mtwRedlinkReady = '1';

            if (anchor.hasAttribute('title')) {
                return;
            }

            target = redLinkTarget(anchor);

            if (target) {
                anchor.title = 'Missing page: ' + target;
            }
        });
    }

    function headingId(heading) {
        var headline;

        if (!heading) {
            return '';
        }

        headline = heading.querySelector('.mw-headline[id]');

        if (headline && headline.id) {
            return headline.id;
        }

        return heading.id || '';
    }

    function rebuildSectionHeadings(root) {
        var scope;

        if (!isViewAction() || mw.config.get('wgNamespaceNumber') !== 0) {
            sectionHeadings = [];
            return;
        }

        scope = document.querySelector('.mw-parser-output') ||
            document.querySelector('#mw-content-text') ||
            (root && root.querySelectorAll ? root : document);

        sectionHeadings = Array.from(scope.querySelectorAll('h2,h3')).filter(function (heading) {
            return !!headingId(heading);
        });
    }

    function replaceSectionHash(id) {
        var nextHash;
        var nextUrl;

        if (!id || !window.history || typeof history.replaceState !== 'function') {
            return;
        }

        nextHash = '#' + encodeURIComponent(id).replace(/%3A/gi, ':');

        if (window.location.hash === nextHash) {
            return;
        }

        nextUrl = window.location.pathname + window.location.search + nextHash;

        try {
            history.replaceState(history.state, document.title, nextUrl);
        } catch (ignore) {}
    }

    function updateSectionHash() {
        var active = null;
        var i;
        var rect;

        sectionFrame = null;

        var hashId = '';
        try { hashId = decodeURIComponent(location.hash.slice(1)); } catch (ignore) { return; }
        if (hashId && !sectionHeadings.some(function (h) { return headingId(h) === hashId; })) { return; }
        if (!sectionHeadings.length || Date.now() < hashSuppressUntil) {
            return;
        }

        for (i = 0; i < sectionHeadings.length; i += 1) {
            if (!sectionHeadings[i].getClientRects().length ||
                getComputedStyle(sectionHeadings[i]).visibility === 'hidden') { continue; }
            rect = sectionHeadings[i].getBoundingClientRect();

            if (rect.top <= SECTION_TOP_OFFSET) {
                active = sectionHeadings[i];
            } else {
                break;
            }
        }

        if (active) {
            replaceSectionHash(headingId(active));
        }
    }

    function scheduleSectionHash() {
        if ((window.MTWExtraReaderConfig || {}).sectionAwareUrls !== true ||
            !isViewAction() || document.body.classList.contains('ve-activated')) { return; }
        if (sectionFrame || !sectionHeadings.length) {
            return;
        }

        sectionFrame = window.requestAnimationFrame(updateSectionHash);
    }

    function samePageHashLink(anchor) {
        var url;

        if (!anchor || !anchor.href) {
            return false;
        }

        try {
            url = new URL(anchor.href, window.location.href);

            return url.origin === window.location.origin &&
                url.pathname === window.location.pathname &&
                url.search === window.location.search &&
                !!url.hash;
        } catch (ignore) {
            return false;
        }
    }

    function initSectionAwareUrls() {
        if ((window.MTWExtraReaderConfig || {}).sectionAwareUrls !== true) { return; }
        rebuildSectionHeadings(document);

        window.addEventListener('scroll', scheduleSectionHash, { passive: true });
        window.addEventListener('resize', scheduleSectionHash, { passive: true });

        window.addEventListener('hashchange', function () {
            hashSuppressUntil = Date.now() + HASH_SUPPRESS_MS;
        });

        document.addEventListener('click', function (event) {
            var anchor = event.target && event.target.closest ?
                event.target.closest('a[href]') : null;

            if (samePageHashLink(anchor)) {
                hashSuppressUntil = Date.now() + HASH_SUPPRESS_MS;
            }
        }, false);

        scheduleSectionHash();
    }

    function handleWikiContent(content) {
        var root = content && content[0] ? content[0] : content;

        enhanceRedLinks(root || document);
        rebuildSectionHeadings(root || document);
        scheduleSectionHash();
    }

    function start() {
        importCommunityScripts();
        initSearchShortcut();
        enhanceRedLinks(document);
        initSectionAwareUrls();

        if (mw.hook) {
            mw.hook('wikipage.content').add(handleWikiContent);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
}());

/* ============================================================================
 * [MTW-JS-012] READER TOOLS 1.0.0 — self-contained styles and JavaScript
 *
 * 12. Searchable article sections          13. Saved section bookmarks
 * 14. Large-table filters                 15. Copy code / preformatted text
 *
 * Options: window.MTWReaderToolsConfig = { sectionFinder: true,
 *   bookmarks: true, tableFilters: true, copyCode: true, minTableRows: 12 };
 * Set options above this module. Features default to enabled.
 * Tables: automatic on plain sortable tables, opt in with class="mtw-filterable".
 * Skips merged/grouped/nested data tables. Opt out with class="mtw-no-filter".
 * Page opt-out: <div class="mtw-no-reader-tools"></div>
 * Code opt-out: put class="mtw-no-copy" on the block or its parent.
 * Bookmarks: explicitly saved on this browser only; maximum 60 pages per wiki.
 * No added network calls, external scripts, automatic scrolling, or wiki writes.
 * Uses MediaWiki's wikipage.content hook for newly rendered article content.
 * ============================================================================ */
(function (window, document, mw) {
    'use strict';
    if (!mw || !mw.config || window.__mtwReaderToolsV1) { return; }
    window.__mtwReaderToolsV1 = true;

    var opts = window.MTWReaderToolsConfig || {};
    var uid = 0, root = null, panel = null, entries = [], status = null;
    var search = null, list = null, resultCount = null, savedArea = null;
    var tableStates = new WeakMap();
    var key = 'mtw.reader.sections.v1:' + String(mw.config.get('wgDBname') || location.host);
    var activePage = String(mw.config.get('wgArticleId') || mw.config.get('wgPageName') || location.pathname);
    var maxRows = 2000;
    var minRows = Number(opts.minTableRows);
    if (!isFinite(minRows) || minRows < 3 || minRows > maxRows) { minRows = 12; }

    function enabled(name) { return opts[name] !== false; }
    function node(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) { n.className = cls; }
        if (text !== undefined) { n.textContent = text; }
        return n;
    }
    function button(label, cls) {
        var n = node('button', cls || 'mtw-rt-button', label);
        n.type = 'button';
        return n;
    }
    function fold(text) {
        text = String(text || '').toLowerCase();
        if (text.normalize) { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
        return text.replace(/\s+/g, ' ').trim();
    }
    function cleanText(n) {
        var clone = n.cloneNode(true);
        clone.querySelectorAll('button,.mw-editsection,.mtw-section-link,.mtw-rt-bookmark,script,style').forEach(function (item) { item.remove(); });
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }
    function visible(n) {
        return !!(n && n.isConnected && n.getClientRects().length &&
            !n.closest('[hidden],[aria-hidden="true"]') && getComputedStyle(n).visibility !== 'hidden');
    }
    function validView() {
        if (mw.config.get('wgAction') !== 'view' || !document.body ||
            document.body.classList.contains('ve-activated')) { return false; }
        var ns = mw.config.get('wgNamespaceNumber');
        var params = new URLSearchParams(location.search);
        return [0, 4, 10, 12].indexOf(ns) !== -1 && !mw.config.get('wgIsMainPage') &&
            !params.has('diff') && !params.has('oldid') && !params.has('veaction');
    }
    function readSaved() {
        try {
            var data = JSON.parse(window.localStorage.getItem(key) || '[]');
            if (!Array.isArray(data)) { return []; }
            return data.filter(function (r) {
                return r && typeof r.page === 'string' && r.page.length < 400 &&
                    typeof r.id === 'string' && r.id.length <= 1000 &&
                    typeof r.title === 'string' && r.title.length <= 300 &&
                    typeof r.time === 'number' && isFinite(r.time);
            }).slice(0, 60);
        } catch (ignore) { return []; }
    }
    function saved() {
        return readSaved().filter(function (r) { return r.page === activePage; })[0] || null;
    }
    function announce(message) { if (status) { status.textContent = message; } }
    function storeSection(entry) {
        if (!validView()) { return; }
        var data = readSaved().filter(function (r) { return r.page !== activePage; });
        if (entry) {
            data.unshift({ page: activePage, id: entry.id, title: entry.text.slice(0, 300), time: Date.now() });
        }
        try {
            window.localStorage.setItem(key, JSON.stringify(data.slice(0, 60)));
            updateSaved();
            announce(entry ? 'Section saved on this browser.' : 'Saved section removed.');
        } catch (ignore) {
            announce('Browser storage is unavailable; the bookmark could not be updated.');
        }
    }
    function updateSaved() {
        if (!savedArea) { return; }
        savedArea.replaceChildren();
        var record = saved();
        if (record) {
            savedArea.appendChild(node('span', '', 'Saved section: '));
            var target = document.getElementById(record.id);
            if (target && root.contains(target)) {
                var a = node('a', 'mtw-rt-saved-link', record.title);
                a.href = '#' + encodeURIComponent(record.id);
                a.addEventListener('click', function (event) {
                    if (!visible(target)) {
                        event.preventDefault();
                        announce('Open the tab or collapsed section containing this bookmark first.');
                    }
                });
                savedArea.appendChild(a);
            } else {
                savedArea.appendChild(node('span', '', record.title + ' (section no longer found)'));
            }
            var clear = button('Forget');
            clear.addEventListener('click', function () { storeSection(null); });
            savedArea.appendChild(clear);
        } else {
            savedArea.appendChild(node('span', '', 'Use the bookmark button beside a heading to save your place on this browser.'));
        }
        if (root) {
            root.querySelectorAll('.mtw-rt-bookmark').forEach(function (b) {
                var selected = !!record && record.id === b.dataset.mtwSection;
                b.setAttribute('aria-pressed', String(selected));
                b.textContent = selected ? '★' : '☆';
            });
        }
    }
    function getSections() {
        var used = Object.create(null);
        return Array.prototype.map.call(root.querySelectorAll('h2,h3'), function (h) {
            if (h.closest('.portable-infobox,.toc,.navbox,.mtw-rt-panel,.mtw-no-reader-tools,[contenteditable="true"],.spoiler,.spoiler-blur') || !visible(h)) { return null; }
            var headline = h.querySelector('.mw-headline[id]');
            var target = headline || (h.id ? h : null);
            if (!target || target.id.length > 1000 || used[target.id]) { return null; }
            used[target.id] = true;
            var text = cleanText(headline || h);
            return text ? { h: h, id: target.id, text: text, level: h.tagName } : null;
        }).filter(Boolean);
    }
    function filterSections() {
        if (!list || !search) { return; }
        var terms = fold(search.value).split(' ').filter(Boolean), shown = 0;
        Array.prototype.forEach.call(list.children, function (li) {
            var matches = terms.every(function (t) { return li._mtwSearch.indexOf(t) !== -1; });
            li.hidden = !matches;
            if (matches) { shown++; }
        });
        resultCount.textContent = shown + ' of ' + entries.length + ' sections';
    }
    function rebuildSections() {
        if (!root || !panel) { return; }
        entries = getSections();
        if (list) { list.replaceChildren(); }
        entries.forEach(function (entry) {
            if (list) {
                var li = node('li', entry.level === 'H3' ? 'mtw-rt-subsection' : '');
                li._mtwSearch = fold(entry.text);
                var a = node('a', '', entry.text);
                a.href = '#' + encodeURIComponent(entry.id);
                li.appendChild(a); list.appendChild(li);
            }
            if (enabled('bookmarks') && !entry.h.querySelector('.mtw-rt-bookmark')) {
                var b = button('☆', 'mtw-rt-bookmark');
                b.dataset.mtwSection = entry.id;
                b.title = 'Save section: ' + entry.text;
                b.setAttribute('aria-label', b.title);
                b.setAttribute('aria-pressed', 'false');
                b.addEventListener('click', function () { storeSection(entry); });
                entry.h.appendChild(b);
            }
        });
        filterSections(); updateSaved();
    }
    function initPanel() {
        if (panel && panel.isConnected) { rebuildSections(); return; }
        if (!enabled('sectionFinder') && !enabled('bookmarks')) { return; }
        if (getSections().length < 4) { return; }
        panel = node('details', 'mtw-rt-panel mtw-no-preview');
        panel.appendChild(node('summary', '', 'Reader tools'));
        var body = node('div', 'mtw-rt-body');
        panel.appendChild(body);
        search = list = resultCount = savedArea = null;
        if (enabled('sectionFinder')) {
            var label = node('label', 'mtw-rt-label', 'Find a section');
            search = node('input', 'mtw-rt-input');
            search.type = 'search'; search.maxLength = 200;
            search.id = 'mtw-rt-search-' + (++uid);
            search.placeholder = 'Type a heading or keyword…';
            label.htmlFor = search.id;
            body.appendChild(label); body.appendChild(search);
            resultCount = node('p', 'mtw-rt-note');
            resultCount.setAttribute('role', 'status');
            body.appendChild(resultCount);
            var nav = node('nav'); nav.setAttribute('aria-label', 'Article section finder');
            list = node('ul', 'mtw-rt-sections'); nav.appendChild(list); body.appendChild(nav);
            search.addEventListener('input', filterSections);
        }
        if (enabled('bookmarks')) { savedArea = node('div', 'mtw-rt-saved'); body.appendChild(savedArea); }
        status = node('p', 'mtw-rt-note'); status.setAttribute('role', 'status'); body.appendChild(status);
        root.insertBefore(panel, root.firstChild);
        panel.addEventListener('toggle', function () { if (panel.open) { rebuildSections(); } });
        rebuildSections();
    }

    /* [MTW-JS-014] Safe row filtering: native rows and table sorting stay in place. */
    function initTables() {
        if (!enabled('tableFilters')) { return; }
        root.querySelectorAll('table.sortable,table.mtw-filterable').forEach(function (table) {
            if (tableStates.has(table) || table.closest('.mtw-no-filter,.portable-infobox,.navbox,.mtw-lineage,.mtw-lineage__table') ||
                table.querySelector('table') || table.closest('table table')) { return; }
            var rows = [];
            Array.prototype.forEach.call(table.tBodies, function (body) {
                Array.prototype.forEach.call(body.rows, function (row) {
                    if (row.querySelector('td') && !row.hidden && getComputedStyle(row).display !== 'none') { rows.push(row); }
                });
            });
            if (rows.length < (table.classList.contains('mtw-filterable') ? 3 : minRows) || rows.length > maxRows) { return; }
            if (rows.some(function (row) {
                return Array.prototype.some.call(row.cells, function (cell) { return cell.rowSpan !== 1 || cell.colSpan !== 1; });
            })) { return; }
            // Mid-table header rows usually describe groups; filtering those tables would orphan headers.
            var allRows = Array.prototype.slice.call(table.rows);
            var firstData = allRows.indexOf(rows[0]);
            if (allRows.slice(firstData).some(function (r) { return r.cells.length && !r.querySelector('td'); })) { return; }
            var bar = node('div', 'mtw-rt-filter mtw-no-preview');
            var label = node('label', 'mtw-rt-label', 'Filter table');
            var input = node('input', 'mtw-rt-input');
            input.type = 'search'; input.maxLength = 200; input.placeholder = 'Type to filter rows…';
            input.id = 'mtw-rt-table-' + (++uid); label.htmlFor = input.id;
            var clear = button('Clear');
            var count = node('span', 'mtw-rt-note'); count.setAttribute('role', 'status');
            if (table.caption) {
                input.setAttribute('aria-label', 'Filter table: ' + cleanText(table.caption));
            }
            [label, input, clear, count].forEach(function (n) { bar.appendChild(n); });
            table.parentNode.insertBefore(bar, table);
            var data = rows.map(function (row) { return { row: row, text: fold(cleanText(row)) }; });
            var timer;
            function apply() {
                var terms = fold(input.value).split(' ').filter(Boolean), shown = 0;
                data.forEach(function (r) {
                    var match = terms.every(function (t) { return r.text.indexOf(t) !== -1; });
                    if (match) { r.row.removeAttribute('data-mtw-rt-filtered'); shown++; }
                    else { r.row.setAttribute('data-mtw-rt-filtered', '1'); }
                });
                count.textContent = shown + ' of ' + data.length + ' rows';
            }
            input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(apply, 100); });
            clear.addEventListener('click', function () { clearTimeout(timer); input.value = ''; apply(); input.focus(); });
            tableStates.set(table, { clear: function () { clearTimeout(timer); input.value = ''; apply(); } });
            apply();
        });
    }

    /* [MTW-JS-015] Copy blocks; denied clipboard permission falls back to selection. */
    function initCopy() {
        if (!enabled('copyCode')) { return; }
        root.querySelectorAll('pre').forEach(function (pre) {
            if (pre.dataset.mtwRtCopy || pre.closest('.mtw-no-copy,.mw-editform,[contenteditable="true"]')) { return; }
            var host = pre.closest('.mw-highlight,.syntaxhighlight') || pre;
            if (host.querySelector('.copycodebutton,.copy-code-button,.mw-highlight-copy-button,[data-copy-code]') ||
                (host.previousElementSibling && host.previousElementSibling.classList.contains('mtw-rt-copybar'))) { return; }
            pre.dataset.mtwRtCopy = '1';
            var bar = node('div', 'mtw-rt-copybar');
            var b = button('Copy text'); b.setAttribute('aria-label', 'Copy this code or preformatted text block');
            var message = node('span', 'mtw-rt-note'); message.setAttribute('role', 'status');
            bar.appendChild(b); bar.appendChild(message); host.parentNode.insertBefore(bar, host);
            function selectFallback() {
                var selection = window.getSelection(), range = document.createRange();
                if (selection) { range.selectNodeContents(pre); selection.removeAllRanges(); selection.addRange(range); }
                message.textContent = 'Text selected. Use your browser’s Copy command.';
            }
            b.addEventListener('click', function () {
                if (!validView()) { return; }
                var clone = pre.cloneNode(true);
                clone.querySelectorAll('.linenos,.linenodiv,button,script,style').forEach(function (n) { n.remove(); });
                var text = clone.textContent;
                if (!navigator.clipboard || !navigator.clipboard.writeText) { selectFallback(); return; }
                b.disabled = true;
                Promise.resolve().then(function () { return navigator.clipboard.writeText(text); })
                    .then(function () { message.textContent = 'Copied.'; }, selectFallback)
                    .then(function () { b.disabled = false; });
            });
        });
    }

    /* [MTW-JS-STYLES] Scoped styles: included here; no Common.css edit required. */
    function installStyles() {
        if (document.getElementById('mtw-rt-styles')) { return; }
        var style = node('style'); style.id = 'mtw-rt-styles';
        style.textContent = [
            '.mtw-rt-panel,.mtw-rt-filter,.mtw-rt-copybar{box-sizing:border-box;color:#eee7e9;background:#1b1319;border:1px solid #69404e;border-radius:8px;font:14px/1.5 Arial,sans-serif;max-width:100%;clear:both}',
            '.mtw-rt-panel{margin:0 0 18px}.mtw-rt-panel>summary{cursor:pointer;padding:11px 14px;color:#e9c68b;font-weight:bold;min-height:44px;box-sizing:border-box}.mtw-rt-body{padding:0 14px 12px}',
            '.mtw-rt-label{display:block;color:#efc5d1;font-weight:bold}.mtw-rt-input{box-sizing:border-box;min-width:0;width:100%;max-width:100%;min-height:42px;padding:8px 10px;border:1px solid #8c596c;border-radius:5px;background:#100d10;color:#fff;font:inherit}.mtw-rt-input::placeholder{color:#c0aab4}',
            '.mtw-rt-note{font:12px/1.5 Arial,sans-serif;color:#d1bac6;margin:5px 0}.mtw-rt-note:empty{display:none}',
            '.mtw-rt-panel ul.mtw-rt-sections{list-style:none!important;padding:0!important;margin:8px 0!important;max-height:320px;overflow:auto;overscroll-behavior:contain}.mtw-rt-panel .mtw-rt-sections li{margin:0;padding:0}.mtw-rt-panel .mtw-rt-sections a{display:block;padding:8px;color:#ecd9e5!important;overflow-wrap:anywhere;text-decoration:none}.mtw-rt-panel .mtw-rt-sections .mtw-rt-subsection a{padding-left:24px;font-size:13px}.mtw-rt-panel .mtw-rt-sections a:hover{background:#392532}',
            '.mtw-rt-panel [hidden]{display:none!important}.mtw-rt-saved{border-top:1px solid #69404e;margin-top:10px;padding-top:10px;overflow-wrap:anywhere}.mtw-rt-saved a{color:#e9c68b!important}.mtw-rt-saved button{margin-left:8px}',
            '.mtw-rt-button,.mtw-rt-bookmark{box-sizing:border-box;cursor:pointer;border:1px solid #916378;border-radius:5px;background:#392333;color:#f9eaf3;font:13px/1.3 Arial,sans-serif;padding:8px 12px;min-height:36px;vertical-align:middle}.mtw-rt-button:hover,.mtw-rt-bookmark:hover{background:#513347}.mtw-rt-button:disabled{cursor:wait;opacity:.6}',
            '.mtw-rt-bookmark{margin-left:8px;padding:4px 8px;font-size:20px;min-width:36px}.mtw-rt-bookmark[aria-pressed="true"]{color:#f5d28b;border-color:#c9a261}',
            '.mtw-rt-button:focus-visible,.mtw-rt-bookmark:focus-visible,.mtw-rt-input:focus-visible,.mtw-rt-panel summary:focus-visible,.mtw-rt-panel a:focus-visible{outline:2px solid #d4a9ff;outline-offset:3px}',
            '.mtw-rt-filter{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px;margin:14px 0 5px}.mtw-rt-filter .mtw-rt-input{flex:1 1 180px;width:auto}.mtw-rt-filter .mtw-rt-note{white-space:nowrap}',
            'tr[data-mtw-rt-filtered="1"]{display:none!important}.mtw-rt-copybar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:6px 9px;margin:8px 0 0}',
            'body.ve-activated .mtw-rt-panel,body.ve-activated .mtw-rt-filter,body.ve-activated .mtw-rt-copybar,body.ve-activated .mtw-rt-bookmark{display:none!important}body.ve-activated tr[data-mtw-rt-filtered="1"]{display:table-row!important}',
            '@media(max-width:600px){.mtw-rt-button,.mtw-rt-bookmark{min-height:44px}.mtw-rt-bookmark{min-width:44px}.mtw-rt-panel .mtw-rt-sections a{padding-top:11px;padding-bottom:11px}.mtw-rt-filter .mtw-rt-label{flex-basis:100%}}',
            '@media print{.mtw-rt-panel,.mtw-rt-bookmark,.mtw-rt-filter,.mtw-rt-copybar{display:none!important}tr[data-mtw-rt-filtered="1"]{display:table-row!important}}'
        ].join('\n');
        document.head.appendChild(style);
    }
    function refresh() {
        if (!validView()) { return; }
        var next = document.querySelector('.page-content .mw-parser-output') || document.querySelector('.mw-parser-output');
        if (!next || next.querySelector('.mtw-no-reader-tools') || next.classList.contains('mtw-no-reader-tools')) { return; }
        if (root !== next) {
            if (panel && panel.isConnected) { panel.remove(); }
            panel = null; root = next;
        }
        installStyles();
        [initPanel, initTables, initCopy].forEach(function (fn) {
            try { fn(); } catch (error) { console.warn('[MTW Reader Tools]', error); }
        });
    }
    function start() {
        refresh();
        if (mw.hook) { mw.hook('wikipage.content').add(refresh); }
        window.addEventListener('storage', function (event) { if (event.key === key) { updateSaved(); } });
        // Refresh the list when the reader opens the panel after changing article tabs.
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start, { once: true }); }
    else { start(); }
}(window, document, window.mw));

;
/* ============================================================================
 * [MTW-JS-018] READING TIME / [MTW-JS-019] READER DISPLAY PREFERENCES
 * Custom local modules for MediaWiki:Common.js, not Dev Wiki imports.
 * Estimate: visible prose at 220 words/minute; excludes tables and references.
 * Display: original / 110% / 120% / 130% text, optional relaxed line spacing.
 * Preferences are saved on this browser; Reset restores the wiki's typography.
 * Only prose is styled. Infoboxes, tables, menus and page layouts are excluded.
 * Configure window.MTWExtraReaderConfig above; page opt-out: mtw-no-reader-tools.
 * ============================================================================ */
(function (window, document, mw) {
    'use strict';
    if (!mw || !mw.config || window.__mtwExtraReaderLoaded) { return; }
    window.__mtwExtraReaderLoaded = true;
    var config = window.MTWExtraReaderConfig || {};
    var key = 'mtw.reader.display.v1:' + String(mw.config.get('wgDBname') || location.host);
    var excluded = '.portable-infobox,.infobox,.toc,.navbox,.gallery,.wikia-gallery,.wikia-gallery-slideshow,.mtw-lineage,table,pre,.references,.reflist,.mw-references-wrap,.mtw-rt-panel,.mtw-rt-filter,.mtw-rt-copybar,.mtw-rx-panel,.mtw-rx-display,.mtw-rx-note,.mtw-reference-finder,.mtw-original-tools,.mtw-no-reader-tools,.mtw-no-reader-display,.spoiler,.spoilerblur,.spoiler-blur,[contenteditable="true"]';
    var prefs = readPrefs();
    function normalPrefs(value) {
        value = value || {};
        return { size: [100, 110, 120, 130].indexOf(value.size) !== -1 ? value.size : 100, relaxed: value.relaxed === true };
    }
    function readPrefs() {
        try { return normalPrefs(JSON.parse(window.localStorage.getItem(key) || '{}')); }
        catch (ignore) { return normalPrefs({}); }
    }
    function eligible() {
        var params = new URLSearchParams(location.search);
        return mw.config.get('wgAction') === 'view' && mw.config.get('wgNamespaceNumber') === 0 &&
            !mw.config.get('wgIsMainPage') && !document.body.classList.contains('ve-activated') &&
            !params.has('diff') && !params.has('oldid') && !params.has('veaction');
    }
    function make(tag, cls, text) {
        var n = document.createElement(tag); n.className = cls || '';
        if (text !== undefined) { n.textContent = text; }
        return n;
    }
    function prose(root) {
        return Array.prototype.filter.call(root.querySelectorAll('p,li'), function (n) {
            return !n.closest(excluded) && n.textContent.trim();
        });
    }
    function wordCount(root) {
        return prose(root).reduce(function (count, n) {
            if (!n.getClientRects().length || getComputedStyle(n).visibility === 'hidden' ||
                n.closest('[hidden],[aria-hidden="true"]') ||
                n.closest('details:not([open])')) { return count; }
            var copy = n.cloneNode(true);
            copy.querySelectorAll('p,ul,ol,sup.reference,button,script,style,.mw-editsection').forEach(function (item) { item.remove(); });
            var words = copy.textContent.trim().match(/\S+/g);
            return count + (words ? words.length : 0);
        }, 0);
    }
    function apply(root) {
        // Measure every original size before applying preferences to parent list items.
        var items = prose(root);
        items.forEach(function (n) { n.classList.remove('mtw-rx-sized', 'mtw-rx-relaxed'); });
        items.forEach(function (n) {
            { // Re-measure with all reader sizing classes removed.
                var size = parseFloat(getComputedStyle(n).fontSize);
                if (isFinite(size) && size > 0) { n.dataset.mtwRxBase = String(size); }
            }
        });
        items.forEach(function (n) {
            var size = Number(n.dataset.mtwRxBase);
            if (isFinite(size) && size > 0) {
                n.style.setProperty('--mtw-rx-size', String(size * prefs.size / 100) + 'px');
            }
            n.classList.toggle('mtw-rx-sized', prefs.size !== 100);
            n.classList.toggle('mtw-rx-relaxed', prefs.relaxed);
        });
    }
    function installStyles() {
        if (document.getElementById('mtw-rx-styles')) { return; }
        var style = make('style'); style.id = 'mtw-rx-styles';
        style.textContent = '.mtw-rx-panel{margin:0 0 18px;padding:0;border:1px solid #69404e;border-radius:8px;background:#1b1319;color:#eee7e9;clear:both;box-sizing:border-box;max-width:100%}.mtw-rx-panel>summary{padding:11px 14px;cursor:pointer;color:#e9c68b;font:700 14px/1.5 Arial,sans-serif}.mtw-rx-panel>.mtw-rx-body{padding:0 14px 12px}.mtw-rx-display{display:flex;flex-wrap:wrap;align-items:center;gap:10px;border-top:1px solid #69404e;margin-top:10px;padding-top:10px;font:14px/1.5 Arial,sans-serif}.mtw-rx-display label{display:flex;align-items:center;gap:6px}.mtw-rx-select,.mtw-rx-reset{font:inherit;min-height:44px;padding:6px 9px;background:#392333;color:#f9eaf3;border:1px solid #916378;border-radius:5px;max-width:100%}.mtw-rx-reset{cursor:pointer}.mtw-rx-display :focus-visible{outline:2px solid #d4a9ff;outline-offset:3px}.mtw-rx-note{font:12px/1.5 Arial,sans-serif;color:#d1bac6;margin:6px 0}.mtw-rx-note:empty{display:none}.mw-parser-output .mtw-rx-sized{font-size:var(--mtw-rx-size)!important}.mw-parser-output .mtw-rx-relaxed{line-height:1.9!important}body.ve-activated .mtw-rx-panel,body.ve-activated .mtw-rx-display,body.ve-activated .mtw-rx-note{display:none!important}@media print{.mtw-rx-panel,.mtw-rx-display,.mtw-rx-note{display:none!important}}';
        document.head.appendChild(style);
    }
    function displayControls(root, container) {
        var controls = make('div', 'mtw-rx-display mtw-no-preview');
        var label = make('label', '', 'Text size');
        var select = make('select', 'mtw-rx-select');
        [100, 110, 120, 130].forEach(function (size) {
            var option = make('option', '', size === 100 ? 'Original' : size + '%');
            option.value = String(size); select.appendChild(option);
        });
        select.value = String(prefs.size); label.appendChild(select); controls.appendChild(label);
        var spacingLabel = make('label', '', 'Relaxed spacing');
        var spacing = make('input'); spacing.type = 'checkbox'; spacing.checked = prefs.relaxed;
        spacingLabel.insertBefore(spacing, spacingLabel.firstChild); controls.appendChild(spacingLabel);
        var reset = make('button', 'mtw-rx-reset', 'Reset'); reset.type = 'button'; controls.appendChild(reset);
        var status = make('p', 'mtw-rx-note'); status.setAttribute('role', 'status');
        controls.appendChild(status); container.appendChild(controls);
        function change() {
            if (!eligible()) { return; }
            prefs = normalPrefs({size:Number(select.value),relaxed:spacing.checked}); apply(root);
            try { window.localStorage.setItem(key, JSON.stringify(prefs)); status.textContent = 'Reading preferences saved on this browser.'; }
            catch (ignore) { status.textContent = 'Applied for this page. Browser storage is unavailable.'; }
        }
        select.addEventListener('change', change); spacing.addEventListener('change', change);
        reset.addEventListener('click', function () { select.value = '100'; spacing.checked = false; change(); });
    }
    function refresh() {
        if (!eligible() || (config.readingTime === false && config.displayControls === false)) { return; }
        var root = document.querySelector('.page-content .mw-parser-output') || document.querySelector('.mw-parser-output');
        if (!root || root.classList.contains('mtw-no-reader-tools') || root.querySelector('.mtw-no-reader-tools')) { return; }
        var container = root.querySelector('.mtw-rt-panel .mtw-rt-body') || root.querySelector('.mtw-rx-panel .mtw-rx-body');
        if (container && container.classList.contains('mtw-rt-body')) {
            var previous = root.querySelector('.mtw-rx-panel');
            if (previous) { previous.remove(); }
        }
        if (!container) {
            var panel = make('details', 'mtw-rx-panel mtw-no-preview');
            panel.appendChild(make('summary', '', 'Reader tools'));
            container = make('div', 'mtw-rx-body'); panel.appendChild(container); root.insertBefore(panel, root.firstChild);
        }
        installStyles();
        if (config.readingTime !== false) {
            var metric = container.querySelector('.mtw-rx-time');
            if (!metric) { metric = make('p', 'mtw-rx-time mtw-rx-note'); container.insertBefore(metric, container.firstChild); }
            var count = wordCount(root);
            metric.textContent = count ? 'Approx. ' + Math.max(1, Math.ceil(count / 220)) + ' min read · visible article text' : '';
        }
        if (config.displayControls !== false) {
            if (!container.querySelector('.mtw-rx-display')) { displayControls(root, container); }
            apply(root);
        }
        if (!root.dataset.mtwRxEvents) {
            root.dataset.mtwRxEvents = '1';
            root.addEventListener('toggle', function (e) {
                if (e.target.matches('.mtw-rt-panel,.mtw-rx-panel') && e.target.open) { refresh(); }
            }, true);
        }
    }
    function start() {
        refresh();
        if (mw.hook) { mw.hook('wikipage.content').add(refresh); }
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start, {once:true}); }
    else { start(); }
}(window, document, window.mw));

/* ============================================================================
 * [MTW-JS-021–023] REFERENCE FINDER / ORIGINAL IMAGES / ANCHOR RECOVERY
 * Local enhancements. No additional external scripts or Common.css required.
 * Reference search creates a separate result list, never filters/renumbers refs.
 * Original image links use imageinfo from this wiki only and retain file credits.
 * Anchor recovery opens native <details> only; third-party tabs stay native.
 * ============================================================================ */
(function (window, document, mw) {
    'use strict';
    if (!mw || !mw.config || window.__mtwPageToolsLoaded) { return; }
    window.__mtwPageToolsLoaded = true;
    var config = window.MTWPageToolsConfig || {};
    var root = null, referencePanel = null, referenceInput = null, results = null;
    var referenceStatus = null, referenceTimer = null, sequence = 0;
    var originalObserver = null, observedRoot = null, originalFrame = null;
    var imageCache = new Map();
    var apiPromise = null;
    function eligible() {
        var params = new URLSearchParams(location.search);
        return mw.config.get('wgAction') === 'view' && mw.config.get('wgNamespaceNumber') === 0 &&
            document.body && !document.body.classList.contains('ve-activated') &&
            !params.has('diff') && !params.has('veaction');
    }
    function element(tag, cls, text) {
        var n = document.createElement(tag);
        n.className = cls || '';
        if (text !== undefined) { n.textContent = text; }
        return n;
    }
    function fold(text) {
        text = String(text || '').toLowerCase();
        if (text.normalize) { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
        return text.replace(/\s+/g, ' ').trim();
    }
    function installStyles() {
        if (document.getElementById('mtw-page-tools-style')) { return; }
        var style = element('style'); style.id = 'mtw-page-tools-style';
        style.textContent = [
            '.mtw-reference-finder{clear:both;box-sizing:border-box;margin:12px 0;padding:12px;border:1px solid #69404e;border-radius:8px;background:#1b1319;color:#eee7e9}',
            '.mtw-reference-finder>summary{cursor:pointer;color:#e9c68b;font-weight:bold;min-height:32px}',
            '.mtw-page-search{box-sizing:border-box;display:block;width:100%;margin-top:8px;min-height:44px;padding:8px;border:1px solid #916378;border-radius:5px;background:#100d10;color:#fff;font:inherit}',
            '.mtw-reference-results{max-height:320px;overflow:auto;overscroll-behavior:contain}.mtw-reference-results li{margin:8px 0;overflow-wrap:anywhere}.mtw-reference-results a{color:#ecd9e5!important}',
            '.mtw-page-status{font-size:13px;line-height:1.5;overflow-wrap:anywhere}.mtw-original-tools{display:flex;flex-wrap:wrap;align-items:center;gap:8px;max-width:100%;margin:6px 0;font-size:12px}',
            '.mtw-page-button{cursor:pointer;min-height:36px;padding:6px 10px;border:1px solid #916378;border-radius:5px;background:#392333;color:#f9eaf3;font:inherit}.mtw-page-button:disabled{opacity:.6;cursor:wait}',
            '.mtw-original-tools a{overflow-wrap:anywhere}.mtw-original-tools [hidden]{display:none!important}',
            '.mtw-page-button:focus-visible,.mtw-page-search:focus-visible,.mtw-reference-finder summary:focus-visible{outline:2px solid #d4a9ff;outline-offset:3px}',
            'body.ve-activated .mtw-reference-finder,body.ve-activated .mtw-original-tools{display:none!important}',
            '@media(prefers-reduced-motion:reduce){#mtw-character-float,#mtw-hover-preview,.mtw-family-header-seal{transition:none!important;animation:none!important}}',
            '@media print{.mtw-reference-finder,.mtw-original-tools,#mtw-reading-progress,#mtw-back-to-top,#mtw-hover-preview,#mtw-character-float,.mtw-section-link{display:none!important}}'
        ].join('\n');
        document.head.appendChild(style);
    }
    function references() {
        return root ? Array.from(root.querySelectorAll('li[id^="cite_note"]')) : [];
    }
    function searchReferences() {
        if (!eligible() || !results) { return; }
        results.replaceChildren();
        var terms = fold(referenceInput.value).split(' ').filter(Boolean);
        var notes = references(), matches = 0, limit = 50;
        if (!terms.length) {
            referenceStatus.textContent = notes.length + ' references. Search by chapter, source or title.';
            return;
        }
        notes.forEach(function (note, index) {
            var source = note.querySelector('.reference-text') || note;
            var text = source.textContent.replace(/\s+/g, ' ').trim();
            if (!terms.every(function (term) { return fold(text).indexOf(term) !== -1; })) { return; }
            matches++;
            if (matches > limit) { return; }
            var li = element('li');
            var link = element('a', '', '[' + (index + 1) + '] ' + text);
            link.href = '#' + encodeURIComponent(note.id);
            li.appendChild(link); results.appendChild(li);
        });
        referenceStatus.textContent = matches + ' matching references' +
            (matches > limit ? ' · first ' + limit + ' shown; refine your search.' : '.');
    }
    function initReferences() {
        if (config.referenceSearch === false) { return; }
        var notes = references();
        if (!notes.length) { return; }
        if (referencePanel && referencePanel.isConnected && root.contains(referencePanel)) {
            if (referencePanel.open) { searchReferences(); }
            return;
        }
        referencePanel = element('details', 'mtw-reference-finder mtw-no-preview');
        referencePanel.appendChild(element('summary', '', 'Find a reference'));
        var label = element('label', '', 'Chapter number, source or title');
        referenceInput = element('input', 'mtw-page-search'); referenceInput.type = 'search';
        referenceInput.maxLength = 200; referenceInput.id = 'mtw-reference-query-' + (++sequence);
        label.htmlFor = referenceInput.id;
        referenceStatus = element('p', 'mtw-page-status'); referenceStatus.setAttribute('role', 'status');
        results = element('ul', 'mtw-reference-results');
        referencePanel.appendChild(label); referencePanel.appendChild(referenceInput);
        referencePanel.appendChild(referenceStatus); referencePanel.appendChild(results);
        var container = notes[0].closest('.mw-references-wrap,.reflist') || notes[0].closest('ol');
        if (!container) { return; }
        container.parentNode.insertBefore(referencePanel, container);
        referenceInput.addEventListener('input', function () {
            clearTimeout(referenceTimer); referenceTimer = setTimeout(searchReferences, 120);
        });
        referencePanel.addEventListener('toggle', function () { if (referencePanel.open) { searchReferences(); } });
        searchReferences();
    }
    function imageTitle(img) {
        if (!img) { return ''; }
        var name = img.getAttribute('data-image-name');
        if (name) { return /^(File|Image):/i.test(name) ? name : 'File:' + name; }
        var anchor = img.closest('a[href]');
        if (!anchor) { return ''; }
        try {
            var url = new URL(anchor.href, location.href);
            if (url.origin !== location.origin) { return ''; }
            var title = url.searchParams.get('title') ||
                (url.pathname.indexOf('/wiki/') === 0 ? decodeURIComponent(url.pathname.slice(6)) : '');
            return /^(File|Image):/i.test(title) ? title.replace(/_/g, ' ') : '';
        } catch (ignore) { return ''; }
    }
    function fileInfo(title) {
        if (imageCache.has(title)) { return imageCache.get(title); }
        if (!apiPromise) {
            apiPromise = Promise.resolve(mw.loader.using('mediawiki.api')).then(function () {
                return new mw.Api();
            }).catch(function (error) { apiPromise = null; throw error; });
        }
        var request = apiPromise.then(function (api) {
            return api.get({action:'query', format:'json', titles:title, redirects:1,
                prop:'imageinfo', iiprop:'url|size'});
        }).then(function (data) {
            var pages = data && data.query && data.query.pages;
            var page = pages && pages[Object.keys(pages)[0]];
            var info = page && page.imageinfo && page.imageinfo[0];
            if (!info || !info.url || new URL(info.url).protocol !== 'https:') {
                throw new Error('Original file unavailable');
            }
            return info;
        }).catch(function (error) { imageCache.delete(title); throw error; });
        imageCache.set(title, request);
        if (imageCache.size > 80) { imageCache.delete(imageCache.keys().next().value); }
        return request;
    }
    function currentImage(host) {
        var candidates = Array.from(host.querySelectorAll('img'));
        return candidates.filter(function (img) {
            var slide = img.closest('.wikia-slideshow-images > li');
            var n = slide || img, style = getComputedStyle(n);
            return n.getClientRects().length && style.display !== 'none' &&
                style.visibility !== 'hidden' && Number(style.opacity) > 0 &&
                !n.closest('[hidden],[aria-hidden="true"]');
        })[0] || null;
    }
    function initOriginals() {
        if (config.originalImages === false) { return; }
        root.querySelectorAll('.wikia-slideshow,.gallerybox,.wikia-gallery-item').forEach(function (host) {
            if (host.dataset.mtwOriginalReady || host.closest('.mtw-home-characters,.mtw-no-original') ||
                (!host.matches('.wikia-slideshow') && host.closest('.wikia-slideshow'))) { return; }
            if (!host.querySelector('img')) { return; }
            host.dataset.mtwOriginalReady = '1';
            var bar = element('div', 'mtw-original-tools mtw-no-preview');
            var button = element('button', 'mtw-page-button', 'Original image'); button.type = 'button';
            var status = element('span', 'mtw-page-status'); status.setAttribute('role', 'status');
            var link = element('a', '', 'Open original'); link.target = '_blank'; link.rel = 'noopener'; link.hidden = true;
            bar.appendChild(button); bar.appendChild(status); bar.appendChild(link);
            // Keep native slide lists untouched. Classic gallery boxes have a caption host.
            var caption = host.querySelector('.gallerytext,.caption,.wikia-gallery-caption');
            (host.matches('.wikia-slideshow') ? host : caption || host).appendChild(bar);
            button.addEventListener('click', function () {
                if (!eligible()) { return; }
                var img = currentImage(host), title = imageTitle(img);
                link.hidden = true; link.removeAttribute('href');
                if (!title) { status.textContent = 'Use the image’s file-page link to view its original.'; return; }
                button.disabled = true; status.textContent = 'Looking up original…';
                fileInfo(title).then(function (info) {
                    if (!bar.isConnected) { return; }
                    link.href = info.url; link.hidden = false;
                    link.textContent = 'Open original: ' + title.replace(/^(File|Image):/i, '');
                    status.textContent = info.width + ' × ' + info.height;
                }).catch(function () {
                    status.textContent = 'Could not retrieve the original. Try again or open the file page.';
                }).then(function () { button.disabled = false; });
            });
            // Any previously resolved link stays explicitly labelled with its file name.
        });
    }
    function revealAnchor(hash) {
        if (config.anchorRecovery === false || !eligible() || !root) { return; }
        var id;
        try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch (ignore) { return; }
        var target = id && document.getElementById(id);
        if (!target || !root.contains(target)) { return; }
        var changed = false, parent = target.parentElement;
        while (parent && parent !== root) {
            if (parent.tagName === 'DETAILS' && !parent.open) { parent.open = true; changed = true; }
            parent = parent.parentElement;
        }
        var row = target.closest('tr[data-mtw-rt-filtered="1"]');
        if (row) {
            var table = row.closest('table'), bar = table && table.previousElementSibling;
            var clear = bar && bar.matches('.mtw-rt-filter') && bar.querySelector('button');
            if (clear) { clear.click(); changed = true; }
        }
        if (changed) {
            requestAnimationFrame(function () {
                if (!target.getClientRects().length) { return; }
                target.scrollIntoView({block:'start', behavior:'auto'});
            });
        }
    }
    function refresh() {
        if (!eligible()) { return; }
        root = document.querySelector('.page-content .mw-parser-output') || document.querySelector('.mw-parser-output');
        if (!root || root.matches('.mtw-no-reader-tools') || root.querySelector('.mtw-no-reader-tools')) { return; }
        installStyles(); initReferences(); initOriginals();
        if (config.originalImages !== false && window.MutationObserver && observedRoot !== root) {
            if (originalObserver) { originalObserver.disconnect(); }
            observedRoot = root;
            originalObserver = new MutationObserver(function (records) {
                if (!eligible() || originalFrame) { return; }
                if (!records.some(function (record) {
                    return Array.from(record.addedNodes).some(function (node) {
                        return node.nodeType === 1 && (node.matches('img,.wikia-slideshow,.gallerybox,.wikia-gallery-item') ||
                            node.querySelector('img,.wikia-slideshow,.gallerybox,.wikia-gallery-item'));
                    });
                })) { return; }
                originalFrame = requestAnimationFrame(function () { originalFrame = null; initOriginals(); });
            });
            originalObserver.observe(root, {childList:true, subtree:true});
        }
    }
    function start() {
        refresh();
        if (mw.hook) { mw.hook('wikipage.content').add(refresh); }
        window.addEventListener('hashchange', function () { revealAnchor(location.hash); });
        document.addEventListener('click', function (event) {
            if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) { return; }
            var a = event.target.closest && event.target.closest('a[href]');
            if (!a || a.target === '_blank') { return; }
            try {
                var url = new URL(a.href, location.href);
                if (url.origin === location.origin && url.pathname === location.pathname &&
                    url.search === location.search && url.hash) { revealAnchor(url.hash); }
            } catch (ignore) {}
        });
        revealAnchor(location.hash);
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start, {once:true}); }
    else { start(); }
}(window, document, window.mw));