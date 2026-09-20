/**
 * PagePreviews v1.0
 * Essentially similar to the Popups extension on MediaWiki
 * with site-wide and Wikipedia support
 */
(function (window, document) {
    'use strict';

    // config & preferences
    const userConfig = window.PagePreviewsConfig || {};
    const config = Object.assign({
        hoverDelay: 160,          // delay when hovering from idle (ms)
        warmHoverDelay: 50,       // rapid delay when skimming between links (ms)
        hideDelay: 220,           // grace period before closing when mouse leaves (ms)
        thumbnailWidth: 420,      // resolution from Fandom vignette
        showThumbnails: true,     // global toggle for thumbnails
        enableWikipedia: true,    // enable previews for Wikipedia interwiki links
        enableCrossWiki: true,    // enable previews for other Fandom wikis
        contentSelector: '#mw-content-text',
        blacklistSelector: '.portable-infobox, .navbox, .toc, .reference, .mw-editsection, .page-preview-card',
        ignoredNamespaces: [
            'Special:', 'User:', 'User_talk:', 'File:', 
            'Category:', 'Template:', 'Help:', 'Talk:', 'MediaWiki:'
        ]
    }, userConfig);

    function isPreviewsEnabled() {
        return localStorage.getItem('pagepreviews_enabled') !== 'false';
    }
    function isImagesEnabled() {
        return localStorage.getItem('pagepreviews_images') !== 'false' && config.showThumbnails;
    }

    // tooltip styles
    const style = document.createElement('style');
    style.id = 'page-previews-styles';
    style.textContent = `
        :root {
            --pp-bg: var(--theme-page-background-color, #ffffff);
            --pp-text: var(--theme-page-text-color, #202122);
            --pp-muted: var(--theme-page-text-color--secondary, #54595d);
            --pp-border: var(--theme-border-color, #c8ccd1);
            --pp-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.2);
            --pp-img-bg: rgba(0, 0, 0, 0.05);
            --pp-accent: var(--theme-link-color, #3366cc);
        }
        body.theme-fandomdesktop-dark, body.theme-dark {
            --pp-bg: var(--theme-page-background-color, #1e1e24);
            --pp-text: var(--theme-page-text-color, #eaecf0);
            --pp-muted: #a2a9b1;
            --pp-border: var(--theme-border-color, #3c4044);
            --pp-shadow: 0 25px 50px -5px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 255, 255, 0.15);
            --pp-img-bg: rgba(255, 255, 255, 0.06);
            --pp-accent: var(--theme-link-color, #69a2ff);
        }

        .page-preview-card {
            position: absolute;
            z-index: 100000;
            background-color: var(--pp-bg);
            color: var(--pp-text);
            border-radius: 4px;
            border: 1px solid var(--pp-border);
            box-shadow: var(--pp-shadow);
            opacity: 0;
            transform: translateY(4px);
            transition: opacity 0.15s ease, transform 0.15s ease, top 0.18s cubic-bezier(0, 0, 0.2, 1), left 0.18s cubic-bezier(0, 0, 0.2, 1), width 0.18s ease;
            pointer-events: none;
            overflow: visible;
            box-sizing: border-box;
            user-select: none;
        }
        .page-preview-card.is-visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
        .page-preview-card.page-preview-no-slide {
            transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .page-preview-inner {
            border-radius: 3px;
            overflow: hidden;
            background-color: inherit;
            position: relative;
        }

        .page-preview-view-article {
            display: flex;
            color: inherit;
            text-decoration: none;
            cursor: pointer;
            width: 100%;
        }
        .page-preview-view-article:hover {
            text-decoration: none;
        }

        .page-preview-card.page-preview-is-tall {
            width: 320px;
        }
        .page-preview-card.page-preview-is-tall .page-preview-view-article {
            flex-direction: column;
        }
        .page-preview-card.page-preview-is-tall .page-preview-thumb-wrap {
            width: 100%;
            height: 160px;
            background-color: var(--pp-img-bg);
            overflow: hidden;
            position: relative;
        }
        .page-preview-card.page-preview-is-tall .page-preview-body {
            max-height: 160px;
        }

        .page-preview-card.page-preview-is-wide {
            width: 450px;
            max-width: calc(100vw - 24px);
        }
        .page-preview-card.page-preview-is-wide .page-preview-view-article {
            flex-direction: row-reverse;
            height: 220px;
        }
        .page-preview-card.page-preview-arrow-over-image.pos-below.page-preview-is-tall .page-preview-thumb-wrap {
            margin-top: -9px;
            height: 169px;
        }
        .page-preview-card.page-preview-arrow-over-image.pos-below.page-preview-is-wide .page-preview-thumb-wrap {
            margin-top: -9px;
            height: calc(100% + 9px);
        }
        .page-preview-card.page-preview-arrow-over-image.pos-above.page-preview-is-wide .page-preview-thumb-wrap {
            height: calc(100% + 9px);
        }
        .page-preview-card.page-preview-is-wide .page-preview-body {
            flex: 1 1 58%;
            height: 100%;
        }
        .page-preview-card.page-preview-is-wide .page-preview-thumb-wrap {
            flex: 0 0 42%;
            height: 100%;
            background-color: var(--pp-img-bg);
            overflow: hidden;
            position: relative;
        }

        .page-preview-card.page-preview-no-image {
            width: 320px;
        }
        .page-preview-card.page-preview-no-image .page-preview-thumb-wrap {
            display: none !important;
        }
        .page-preview-card.page-preview-no-image .page-preview-body {
            max-height: 170px;
        }

        .page-preview-thumb {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            opacity: 0;
            transition: opacity 0.2s cubic-bezier(0, 0, 0.2, 1);
        }
        .page-preview-thumb.is-loaded {
            opacity: 1;
        }
        @keyframes pp-shimmer {
            0% { opacity: 0.4; }
            50% { opacity: 0.8; }
            100% { opacity: 0.4; }
        }
        .page-preview-thumb-wrap.is-loading::after {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
            animation: pp-shimmer 1.2s infinite ease-in-out;
        }

        .page-preview-body {
            padding: 14px 16px 34px 16px;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .page-preview-extract {
            font-size: 14px;
            line-height: 1.46;
            color: var(--pp-text);
            margin: 0;
            word-break: break-word;
        }
        .page-preview-extract b, .page-preview-extract strong {
            font-weight: 700;
        }
        .page-preview-extract i, .page-preview-extract em {
            font-style: italic;
        }

        .page-preview-fade {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 48px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--pp-bg) 60%, var(--pp-bg) 100%);
            pointer-events: none;
            z-index: 4;
        }
        body.theme-fandomdesktop-dark .page-preview-fade,
        body.theme-dark .page-preview-fade {
            background: linear-gradient(180deg, rgba(30, 30, 36, 0) 0%, var(--pp-bg) 60%, var(--pp-bg) 100%);
        }

        .page-preview-provenance {
            position: absolute;
            bottom: 7px;
            left: 14px;
            font-size: 11px;
            font-weight: 600;
            color: var(--pp-muted);
            display: flex;
            align-items: center;
            gap: 4px;
            opacity: 0.85;
            pointer-events: none;
            z-index: 10;
        }
        .page-preview-provenance svg,
        .page-preview-provenance .page-preview-wikipedia-icon {
            display: block;
            flex: 0 0 auto;
        }
        .page-preview-wikipedia-icon {
            width: 13px;
            height: 13px;
            background-color: currentColor;
            -webkit-mask: url('https://upload.wikimedia.org/wikipedia/commons/6/69/Wikipedia_%22W%22_Puzzle_Black.svg') center / contain no-repeat;
                    mask: url('https://upload.wikimedia.org/wikipedia/commons/6/69/Wikipedia_%22W%22_Puzzle_Black.svg') center / contain no-repeat;
        }

        .page-preview-gear-btn {
            position: absolute;
            bottom: 6px;
            right: 8px;
            width: 22px;
            height: 22px;
            padding: 0;
            background: transparent;
            border: none;
            border-radius: 3px;
            color: var(--pp-muted);
            opacity: 0.65;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: opacity 0.15s, transform 0.2s ease, background-color 0.15s;
        }
        .page-preview-gear-btn:hover {
            opacity: 1;
            background-color: var(--pp-img-bg);
            transform: rotate(35deg);
        }
        .page-preview-gear-btn svg {
            display: block;
            pointer-events: none;
        }

        .page-preview-view-settings {
            display: none;
            padding: 16px;
            box-sizing: border-box;
            flex-direction: column;
            gap: 12px;
            width: 320px;
            min-height: 180px;
            background-color: var(--pp-bg);
        }
        .page-preview-card.in-settings-mode .page-preview-view-article,
        .page-preview-card.in-settings-mode .page-preview-gear-btn,
        .page-preview-card.in-settings-mode .page-preview-provenance {
            display: none !important;
        }
        .page-preview-card.in-settings-mode .page-preview-view-settings {
            display: flex !important;
        }
        .page-preview-settings-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--pp-border);
            padding-bottom: 8px;
        }
        .page-preview-settings-title {
            font-size: 13px;
            font-weight: 700;
            color: var(--pp-text);
        }
        .page-preview-settings-close {
            background: none;
            border: none;
            color: var(--pp-muted);
            cursor: pointer;
            padding: 4px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s, background-color 0.15s;
        }
        .page-preview-settings-close:hover {
            color: var(--pp-text);
            background-color: var(--pp-img-bg);
        }
        .page-preview-setting-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            margin: 0;
        }
        .page-preview-setting-label {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .page-preview-setting-label strong {
            font-size: 13px;
            color: var(--pp-text);
        }
        .page-preview-setting-label small {
            font-size: 11px;
            color: var(--pp-muted);
        }
        .page-preview-setting-item input[type="checkbox"] {
            cursor: pointer;
            width: 16px;
            height: 16px;
        }
        .page-preview-settings-footer {
            margin-top: auto;
            display: flex;
            justify-content: flex-end;
        }
        .page-preview-btn-done {
            background-color: var(--pp-accent);
            color: #fff;
            border: none;
            border-radius: 3px;
            padding: 6px 14px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.15s;
        }
        .page-preview-btn-done:hover {
            opacity: 0.9;
        }

        .page-preview-arrow-host {
            position: absolute;
            top: -1px;
            left: -1px;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            pointer-events: none;
            z-index: 100001;
        }

        .page-preview-toast {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: #202122;
            color: #fff;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            z-index: 100002;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .page-preview-toast button {
            background: none;
            border: none;
            color: #69a2ff;
            cursor: pointer;
            font-weight: 700;
            padding: 0;
        }
    `;
    document.head.appendChild(style);

    // state & cache
    const previewCache = new Map();
    let popupEl = null;
    let hoverTimeout = null;
    let hideTimeout = null;
    let activeLink = null;
    let displayedLink = null;
    let isCardVisible = false;
    let isSettingsOpen = false;
    let lastDismissTime = 0;
    let currentRequestId = 0;
    let currentImageToken = 0;
    let activePrefetch = null;

    let lastMouseX = 0;
    let lastMouseY = 0;

    // construct card structure
    function getOrCreatePopup() {
        if (popupEl) return popupEl;

        const card = document.createElement('div');
        card.className = 'page-preview-card';
        card.innerHTML = `
            <div class="page-preview-arrow-host"></div>
            <div class="page-preview-inner">
                <a class="page-preview-view-article" target="_self">
                    <div class="page-preview-thumb-wrap">
                        <img class="page-preview-thumb" alt="" />
                    </div>
                    <div class="page-preview-body">
                        <div class="page-preview-extract"></div>
                        <div class="page-preview-fade"></div>
                        <div class="page-preview-provenance"></div>
                    </div>
                </a>

                <button type="button" class="page-preview-gear-btn" title="Page Preview settings" aria-label="Page Preview settings">
                    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.94,3.28L9.07,0.55L10.93,0.55L11.06,3.28L14.0,4.5L16.03,2.66L17.34,3.97L15.5,6.0L16.72,8.94L19.45,9.07L19.45,10.93L16.72,11.06L15.5,14.0L17.34,16.03L16.03,17.34L14.0,15.5L11.06,16.72L10.93,19.45L9.07,19.45L8.94,16.72L6.0,15.5L3.97,17.34L2.66,16.03L4.5,14.0L3.28,11.06L0.55,10.93L0.55,9.07L3.28,8.94L4.5,6.0L2.66,3.97L3.97,2.66L6.0,4.5ZM10.0,6.8A3.2,3.2,0,1,0,10.0,13.2A3.2,3.2,0,1,0,10.0,6.8Z"/>
                    </svg>
                </button>

                <div class="page-preview-view-settings">
                    <div class="page-preview-settings-header">
                        <span class="page-preview-settings-title">Page Previews</span>
                        <button type="button" class="page-preview-settings-close" title="Close settings" aria-label="Close settings">
                            <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
                                <path fill="currentColor" d="M4.34 4.34a1 1 0 0 1 1.41 0L10 8.59l4.24-4.25a1 1 0 1 1 1.42 1.42L11.41 10l4.25 4.24a1 1 0 1 1-1.42 1.42L10 11.41l-4.24 4.25a1 1 0 0 1-1.42-1.42L8.59 10 4.34 5.76a1 1 0 0 1 0-1.42z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="page-preview-setting-item">
                        <div class="page-preview-setting-label">
                            <strong>Enable page previews</strong>
                            <small>Get quick summaries when hovering links</small>
                        </div>
                        <input type="checkbox" class="pp-setting-enable" checked />
                    </div>
                    <div class="page-preview-setting-item">
                        <div class="page-preview-setting-label">
                            <strong>Show images</strong>
                            <small>Display lead photos and illustrations</small>
                        </div>
                        <input type="checkbox" class="pp-setting-images" checked />
                    </div>
                    <div class="page-preview-settings-footer">
                        <button type="button" class="page-preview-btn-done">Done</button>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
        card.addEventListener('mouseleave', () => {
            if (!isSettingsOpen) scheduleHide();
        });

        // settings controls
        const gearBtn = card.querySelector('.page-preview-gear-btn');
        const closeBtn = card.querySelector('.page-preview-settings-close');
        const doneBtn = card.querySelector('.page-preview-btn-done');
        const toggleEnable = card.querySelector('.pp-setting-enable');
        const toggleImages = card.querySelector('.pp-setting-images');

        function openSettings(e) {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(hideTimeout);
            isSettingsOpen = true;
            toggleEnable.checked = isPreviewsEnabled();
            toggleImages.checked = isImagesEnabled();

            card.classList.remove('page-preview-is-wide', 'page-preview-is-tall', 'page-preview-arrow-over-image');
            card.classList.add('page-preview-no-image', 'in-settings-mode');
            card.style.width = '320px';
            if (activeLink) {
                updatePosition(activeLink, false, null);
            }
        }

        function closeSettings(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            isSettingsOpen = false;
            card.classList.remove('in-settings-mode');
            if (!isPreviewsEnabled()) {
                hideCard();
                showToast('Page previews disabled.', () => {
                    localStorage.setItem('pagepreviews_enabled', 'true');
                });
            } else if (activeLink) {
                scheduleHide();
            }
        }

        gearBtn.addEventListener('click', openSettings);
        closeBtn.addEventListener('click', closeSettings);
        doneBtn.addEventListener('click', closeSettings);

        toggleEnable.addEventListener('change', () => {
            localStorage.setItem('pagepreviews_enabled', toggleEnable.checked ? 'true' : 'false');
        });

        toggleImages.addEventListener('change', () => {
            localStorage.setItem('pagepreviews_images', toggleImages.checked ? 'true' : 'false');
            previewCache.clear();
        });

        document.body.appendChild(card);
        popupEl = card;
        return card;
    }

    function showToast(msg, undoCallback) {
        const toast = document.createElement('div');
        toast.className = 'page-preview-toast';
        toast.innerHTML = `<span>${msg}</span><button type="button">Undo</button>`;
        toast.querySelector('button').addEventListener('click', () => {
            undoCallback();
            toast.remove();
        });
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // JSONP fallback for cross-domain requests
    function fetchJsonp(url) {
        return new Promise((resolve, reject) => {
            const callbackName = 'pagepreviews_jsonp_' + Math.random().toString(36).substring(2, 9);
            const script = document.createElement('script');
            
            const timeout = setTimeout(() => {
                cleanup();
                reject(new Error('JSONP Timeout'));
            }, 5000);

            function cleanup() {
                clearTimeout(timeout);
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
            }

            window[callbackName] = function(data) {
                cleanup();
                resolve(data);
            };

            const delim = url.includes('?') ? '&' : '?';
            script.src = url + delim + 'callback=' + callbackName;
            script.onerror = function() {
                cleanup();
                reject(new Error('JSONP error'));
            };
            document.head.appendChild(script);
        });
    }

    // lead text cleaning
    function parseArticleContent(rawHtml) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        let rawImg = null;
        let isPortrait = false;

        if (isImagesEnabled()) {
            const imgEl = doc.querySelector(
                '.pi-image-thumbnail, .pi-image img, figure.pi-item img, aside.portable-infobox img, table.infobox img, .thumbimage, .mw-parser-output a.image img'
            );
            if (imgEl) {
                rawImg = imgEl.getAttribute('data-src') || imgEl.getAttribute('src');
                if (rawImg && rawImg.startsWith('//')) {
                    rawImg = window.location.protocol + rawImg;
                }
                if (rawImg && rawImg.includes('static.wikia.nocookie.net')) {
                    rawImg = rawImg.replace(/\/scale-to-width-down\/\d+/, '')
                                   .replace(/\/revision\/latest/, `/revision/latest/scale-to-width-down/${config.thumbnailWidth}`);
                }

                const w = parseInt(imgEl.getAttribute('width'), 10);
                const h = parseInt(imgEl.getAttribute('height'), 10);
                if (w && h) {
                    isPortrait = h > (w * 1.05);
                }
            }
        }

        const stripSelectors = [
            'aside', '.portable-infobox', '.pi-container', '.infobox', 'table',
            'blockquote', '.quote', '.cquote', '.quotebox', '.pull-quote', '.epigraph', '.poem',
            '[class*="quote"]', '[class*="dialogue"]',
            '.hatnote', '.dablink', '.rellink', '.boilerplate_disambig', '.disambig-see-also',
            '.ambox', '.tmbox', '.ombox', '.cmbox', '.fmbox', '.notice', '.messagebox',
            '.spoiler', '.spoiler-warning', '.metadata', '.mw-empty-elt',
            '.thumb', 'figure', '.gallery', '.audio-button', '.mediaContainer', '.mw-tmh-player',
            '.sidebar', '.vertical-navbox', '.navbox', '.toc', '#toc',
            '#coordinates', '.mw-indicators', '.topicon',
            'style', 'script', 'noscript', 'sup.reference', '.mw-editsection'
        ];
        stripSelectors.forEach(s => doc.querySelectorAll(s).forEach(el => el.remove()));

        const disambigPatterns = [
            /^for\s+(?:other|the)\b/i,
            /^this\s+article\s+is\s+about\b/i,
            /^not\s+to\s+be\s+confused\s+with\b/i
        ];

        let chosenParagraphs = [];
        let accumulatedLength = 0;
        const paragraphs = doc.querySelectorAll('p');

        for (let i = 0; i < paragraphs.length; i++) {
            const p = paragraphs[i];
            const plainText = p.textContent.replace(/\[\d+\]/g, '').trim();
            if (plainText.length < 25) continue;
            if (disambigPatterns.some(rx => rx.test(plainText))) continue;

            chosenParagraphs.push(p);
            accumulatedLength += plainText.length;
            if (accumulatedLength >= 220) break;
        }

        const allowedTags = new Set(['B', 'STRONG', 'I', 'EM', 'MARK']);
        function sanitizeFragment(node) {
            node.querySelectorAll('sup.reference, .reference, .citation, img, svg, audio, video, style, script').forEach(el => el.remove());
            node.querySelectorAll('a').forEach(a => a.replaceWith(...a.childNodes));

            function cleanChildren(parent) {
                Array.from(parent.childNodes).forEach(child => {
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        if (!allowedTags.has(child.tagName)) {
                            child.replaceWith(...child.childNodes);
                        } else {
                            cleanChildren(child);
                        }
                    }
                });
            }
            cleanChildren(node);
            return node.innerHTML.replace(/\s+/g, ' ').trim();
        }

        let cleanHtml = '';
        if (chosenParagraphs.length > 0) {
            cleanHtml = chosenParagraphs.map(p => sanitizeFragment(p)).join(' ');
        } else {
            const fallback = doc.body.textContent.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim();
            cleanHtml = fallback ? fallback.substring(0, 300) : '';
        }

        return {
            html: cleanHtml,
            image: rawImg ? { src: rawImg, isPortrait: isPortrait } : null
        };
    }

    // multi-target link resolver
    function resolveLinkTarget(a) {
        if (!a || a.tagName !== 'A') return null;
        if (a.classList.contains('new') || a.classList.contains('image')) return null;
        if (a.closest(config.blacklistSelector)) return null;

        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return null;

        try {
            const url = new URL(a.href, window.location.origin);

            // check for Wikipedia Link
            const wikiMatch = url.hostname.match(/^([a-z]{2,3})\.wikipedia\.org$/i);
            if (wikiMatch && config.enableWikipedia) {
                const lang = wikiMatch[1].toLowerCase();
                let title = null;
                if (url.searchParams.has('title')) {
                    title = url.searchParams.get('title');
                } else {
                    const match = url.pathname.match(/\/wiki\/(.+)$/);
                    if (match) title = match[1];
                }
                if (!title) return null;
                title = decodeURIComponent(title.replace(/_/g, ' ')).split('#')[0].trim();
                for (let ns of config.ignoredNamespaces) {
                    if (title.toLowerCase().startsWith(ns.toLowerCase())) return null;
                }
                return {
                    type: 'wikipedia',
                    lang: lang,
                    title: title,
                    url: url.href,
                    cacheKey: `wiki:${lang}:${title}`,
                    siteName: 'Wikipedia'
                };
            }

            // check for cross-wiki Fandom Link
            const isFandom = url.hostname.endsWith('.fandom.com') || url.hostname.endsWith('.wikia.org') || url.hostname.endsWith('.wikia.com');
            if (isFandom && url.hostname !== window.location.hostname && config.enableCrossWiki) {
                const match = url.pathname.match(/(?:\/([a-z]{2,3}(?:-[a-z]{2,4})?))?\/wiki\/(.+)$/i);
                let title = null;
                let langPrefix = '';
                if (match && match[2]) {
                    langPrefix = match[1] ? `/${match[1]}` : '';
                    title = match[2];
                } else if (url.searchParams.has('title')) {
                    title = url.searchParams.get('title');
                }
                if (!title) return null;
                title = decodeURIComponent(title.replace(/_/g, ' ')).split('#')[0].trim();
                for (let ns of config.ignoredNamespaces) {
                    if (title.toLowerCase().startsWith(ns.toLowerCase())) return null;
                }

                const sub = url.hostname.split('.')[0];
                const cleanName = sub.charAt(0).toUpperCase() + sub.slice(1) + ' Wiki';

                return {
                    type: 'fandom-cross',
                    origin: url.origin,
                    pathPrefix: langPrefix,
                    title: title,
                    url: url.href,
                    cacheKey: `fandom:${url.hostname}:${title}`,
                    siteName: `${cleanName} · Fandom`
                };
            }

            // local wiki link
            if (url.hostname === window.location.hostname) {
                let title = null;
                if (url.searchParams.has('title')) {
                    title = url.searchParams.get('title');
                } else {
                    const match = url.pathname.match(/(?:\/[a-z]{2,3}(?:-[a-z]{2,4})?)?\/wiki\/(.+)$/i);
                    if (match) title = match[1];
                }
                if (!title) return null;
                title = decodeURIComponent(title.replace(/_/g, ' ')).split('#')[0].trim();

                const current = (window.mw && mw.config && mw.config.get('wgPageName'))
                    ? mw.config.get('wgPageName').replace(/_/g, ' ')
                    : '';
                if (title.toLowerCase() === current.toLowerCase()) return null;
                for (let ns of config.ignoredNamespaces) {
                    if (title.toLowerCase().startsWith(ns.toLowerCase())) return null;
                }

                return {
                    type: 'local',
                    title: title,
                    url: url.href,
                    cacheKey: `local:${title}`,
                    siteName: ''
                };
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    // data fetcher
    function fetchPreviewData(target, signal) {
        if (previewCache.has(target.cacheKey)) {
            return Promise.resolve(previewCache.get(target.cacheKey));
        }

        var fetchPromise;

        // Wikipedia REST summary
        if (target.type === 'wikipedia') {
            const restUrl = `https://${target.lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(target.title)}`;
            fetchPromise = fetch(restUrl, { signal: signal })
                .then(function (res) {
                    if (!res.ok) throw new Error('Wikipedia REST failed');
                    return res.json();
                })
                .then(function (data) {
                    let imageObj = null;
                    if (data.thumbnail && data.thumbnail.source && isImagesEnabled()) {
                        imageObj = {
                            src: data.thumbnail.source,
                            isPortrait: data.thumbnail.height > (data.thumbnail.width * 1.05)
                        };
                    }

                    return {
                        title: data.title,
                        html: data.extract_html,
                        image: imageObj,
                        siteName: target.siteName,
                        isWikipedia: true
                    };
                });
        }

        // Fandom API
        else if (target.type === 'fandom-cross') {
            const apiUrl = `${target.origin}${target.pathPrefix}/api.php?action=parse&page=${encodeURIComponent(target.title)}&prop=text&section=0&redirects=1&disablepp=1&disablelimitreport=1&format=json`;

            fetchPromise = fetch(apiUrl + '&origin=*', { signal: signal })
                .then(function (res) {
                    if (!res.ok) throw new Error('Cross-wiki fetch not ok');
                    return res.json();
                })
                .catch(function (err) {
                    if (signal && signal.aborted) throw err;
                    return fetchJsonp(apiUrl);
                })
                .then(function (json) {
                    if (!json || json.error || !json.parse || !json.parse.text) {
                        throw new Error('Cross-wiki failed');
                    }

                    const parsed = parseArticleContent(json.parse.text['*']);
                    return {
                        title: json.parse.title || target.title,
                        html: parsed.html,
                        image: parsed.image,
                        siteName: target.siteName,
                        isWikipedia: false
                    };
                });
        }

        // local wiki API
        else if (target.type === 'local') {
            const endpoint = (window.mw && mw.util && mw.util.wikiScript('api')) || '/api.php';
            const url = `${endpoint}?action=parse&page=${encodeURIComponent(target.title)}&prop=text&section=0&redirects=1&disablepp=1&disablelimitreport=1&format=json`;

            fetchPromise = fetch(url, { signal: signal, credentials: 'same-origin' })
                .then(function (res) {
                    if (!res.ok) throw new Error('Local API failed');
                    return res.json();
                })
                .then(function (json) {
                    if (json.error || !json.parse || !json.parse.text) throw new Error('Local API parse failed');

                    const parsed = parseArticleContent(json.parse.text['*']);
                    return {
                        title: json.parse.title || target.title,
                        html: parsed.html,
                        image: parsed.image,
                        siteName: '',
                        isWikipedia: false
                    };
                });
        } else {
            return Promise.reject(new Error('Unknown target type'));
        }

        return fetchPromise.then(function (result) {
            if (previewCache.size >= 100) {
                const firstKey = previewCache.keys().next().value;
                previewCache.delete(firstKey);
            }
            previewCache.set(target.cacheKey, result);
            return result;
        });
    }

    // adaptative pointer arrow
    function renderAdaptiveArrow(isOverImage, isAbove, isWide, imageUrl, arrowLeft, bodyWidth, cardWidth, cardHeight, imgWidth, imgHeight) {
        const width = 18;
        const height = 9;
        const overlap = 1;
        const totalHeight = height + overlap;

        // theme background arrow
        if (!isOverImage || !imageUrl) {
            if (isAbove) { // card is above link, arrow points DOWN at bottom
                return `
                    <svg class="page-preview-arrow-svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" style="position:absolute; bottom:-${height}px; left:${arrowLeft}px;">
                        <polygon points="0,0 ${width},0 ${width / 2},${height}" fill="var(--pp-bg)" />
                        <polyline points="0,0 ${width / 2},${height} ${width},0" stroke="var(--pp-border)" stroke-width="1" stroke-linejoin="round" fill="none" />
                    </svg>
                `;
            } else { // card is below link, arrow points UP at top
                return `
                    <svg class="page-preview-arrow-svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" style="position:absolute; top:-${height}px; left:${arrowLeft}px;">
                        <polygon points="0,${height} ${width / 2},0 ${width},${height} ${width},${totalHeight} 0,${totalHeight}" fill="var(--pp-bg)" />
                        <polyline points="0,${height} ${width / 2},0 ${width},${height}" stroke="var(--pp-border)" stroke-width="1" stroke-linejoin="round" fill="none" />
                    </svg>
                `;
            }
        }

        // image-filled arrow
        const clipId = "pp-arrow-clip-" + (isAbove ? "down" : "up");

        if (isAbove) {
            // card is above link, arrow points DOWN at bottom
            const imgRelX = -(arrowLeft - bodyWidth);
            const imgRelY = -cardHeight;
            const fullImgH = cardHeight + height;

            return `
                <svg class="page-preview-arrow-svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" style="position:absolute; bottom:-${height}px; left:${arrowLeft}px; overflow:hidden;">
                    <defs>
                        <clipPath id="${clipId}">
                            <polygon points="0,0 ${width},0 ${width / 2},${height}" />
                        </clipPath>
                    </defs>
                    <image href="${imageUrl}" x="${imgRelX}" y="${imgRelY}" width="${imgWidth}" height="${fullImgH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />
                    <polyline points="0,0 ${width / 2},${height} ${width},0" stroke="var(--pp-border)" stroke-width="1" stroke-linejoin="round" fill="none" />
                </svg>
            `;
        } else {
            // card is below link, arrow points UP at top
            let imgRelX, imgW, fullImgH;
            if (isWide) {
                // if wide layout, portrait image is on the right side
                imgRelX = -(arrowLeft - bodyWidth);
                imgW = imgWidth;
                fullImgH = cardHeight + height;
            } else {
                // if tall layout, landscape banner spans the full card width at the top
                imgRelX = -arrowLeft;
                imgW = cardWidth;
                fullImgH = imgHeight + height;
            }

            return `
                <svg class="page-preview-arrow-svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" style="position:absolute; top:-${height}px; left:${arrowLeft}px; overflow:hidden;">
                    <defs>
                        <clipPath id="${clipId}">
                            <polygon points="0,${height} ${width / 2},0 ${width},${height} ${width},${totalHeight} 0,${totalHeight}" />
                        </clipPath>
                    </defs>
                    <image href="${imageUrl}" x="${imgRelX}" y="0" width="${imgW}" height="${fullImgH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />
                    <polyline points="0,${height} ${width / 2},0 ${width},${height}" stroke="var(--pp-border)" stroke-width="1" stroke-linejoin="round" fill="none" />
                </svg>
            `;
        }
    }

    // dynamic coordinates & arrow positioning
    function updatePosition(targetLink, isWide, data) {
        if (!popupEl) return;

        const cardWidth = isWide ? Math.min(450, window.innerWidth - 24) : Math.min(320, window.innerWidth - 24);
        popupEl.style.width = `${cardWidth}px`;

        const lineRects = targetLink.getClientRects();
        let activeRect = targetLink.getBoundingClientRect();
        if (lineRects && lineRects.length > 0) {
            for (let i = 0; i < lineRects.length; i++) {
                const r = lineRects[i];
                if (lastMouseY >= r.top - 4 && lastMouseY <= r.bottom + 4) {
                    activeRect = r;
                    break;
                }
            }
        }

        const anchorX = (lastMouseX >= activeRect.left && lastMouseX <= activeRect.right)
            ? lastMouseX
            : activeRect.left + (activeRect.width / 2);

        const docAnchorX = anchorX + window.scrollX;
        const arrowMargin = 32;
        let cardLeft = docAnchorX - arrowMargin;
        const minLeft = window.scrollX + 12;
        const maxLeft = window.scrollX + window.innerWidth - cardWidth - 12;
        cardLeft = Math.max(minLeft, Math.min(cardLeft, maxLeft));

        // arrow horizontal coordinate relative to the card
        const arrowOffset = docAnchorX - cardLeft;
        const clampedArrow = Math.max(16, Math.min(cardWidth - 34, arrowOffset - 9));

        const cardHeight = popupEl.offsetHeight || (isWide ? 220 : 280);
        const gap = 9;
        const spaceAbove = activeRect.top;
        const spaceBelow = window.innerHeight - activeRect.bottom;

        let placeAbove = false;
        if (spaceAbove >= cardHeight + gap && spaceBelow < cardHeight + gap) {
            placeAbove = true;
        } else if (spaceAbove >= cardHeight + gap && spaceBelow >= cardHeight + gap) {
            placeAbove = activeRect.top > window.innerHeight * 0.45;
        }

        let cardTop = 0;
        if (placeAbove) {
            cardTop = activeRect.top + window.scrollY - cardHeight - gap;
            popupEl.classList.remove('pos-below');
            popupEl.classList.add('pos-above');
        } else {
            cardTop = activeRect.bottom + window.scrollY + gap;
            popupEl.classList.remove('pos-above');
            popupEl.classList.add('pos-below');
        }

        popupEl.style.top = `${cardTop}px`;
        popupEl.style.left = `${cardLeft}px`;

        // determine if arrow intersects the image
        const hasImg = !!(data && data.image && data.image.src && isImagesEnabled());
        const bodyWidth = isWide ? Math.round(cardWidth * 0.58) : cardWidth;
        const imgWidth = cardWidth - bodyWidth;
        const imgHeight = 160;

        let isOverImage = false;
        if (hasImg && !isSettingsOpen) {
            if (!isWide && !placeAbove) {
                // if tall mode and card below link: arrow is at top over image banner
                isOverImage = true;
            } else if (isWide && (clampedArrow + 9 >= bodyWidth - 4)) {
                // if wide mode and portrait image on right: arrow sits over image (both above and below)
                isOverImage = true;
            }
        }

        if (isOverImage) {
            popupEl.classList.add('page-preview-arrow-over-image');
        } else {
            popupEl.classList.remove('page-preview-arrow-over-image');
        }

        const arrowHost = popupEl.querySelector('.page-preview-arrow-host');
        arrowHost.innerHTML = renderAdaptiveArrow(
            isOverImage,
            placeAbove,
            isWide,
            hasImg ? data.image.src : null,
            clampedArrow,
            bodyWidth,
            cardWidth,
            cardHeight,
            imgWidth,
            imgHeight
        );
    }

    // render card
    function showCard(targetLink, data) {
        if (!isPreviewsEnabled()) return;
        const card = getOrCreatePopup();
        
        const isSwitching = isCardVisible && displayedLink && displayedLink !== targetLink;
        if (isSwitching) card.classList.add('page-preview-no-slide');

        isSettingsOpen = false;
        card.classList.remove('in-settings-mode');

        const linkEl = card.querySelector('.page-preview-view-article');
        linkEl.href = targetLink.href;

        const extractEl = card.querySelector('.page-preview-extract');
        extractEl.innerHTML = data.html || `<b>${data.title}</b>`;

        const provEl = card.querySelector('.page-preview-provenance');
        if (data.isWikipedia) {
            provEl.innerHTML = `
                <span class="page-preview-wikipedia-icon" aria-hidden="true"></span>
                <span>Wikipedia</span>
            `;
            provEl.style.display = 'flex';
        } else if (data.siteName) {
            provEl.textContent = data.siteName;
            provEl.style.display = 'flex';
        } else {
            provEl.textContent = '';
            provEl.style.display = 'none';
        }

        const thumbWrap = card.querySelector('.page-preview-thumb-wrap');
        const thumbImg = card.querySelector('.page-preview-thumb');

        // immediately purge old image
        thumbImg.classList.remove('is-loaded');
        thumbImg.removeAttribute('src');

        const imageToken = ++currentImageToken;
        thumbImg.dataset.token = String(imageToken);

        card.classList.remove('page-preview-is-tall', 'page-preview-is-wide', 'page-preview-no-image');

        let isWide = false;
        if (data.image && data.image.src && isImagesEnabled()) {
            thumbWrap.style.display = 'block';
            thumbWrap.classList.add('is-loading');

            if (data.image.isPortrait) {
                card.classList.add('page-preview-is-wide');
                isWide = true;
            } else {
                card.classList.add('page-preview-is-tall');
            }

            const loader = new Image();
            loader.src = data.image.src;

            if (loader.complete && loader.naturalWidth > 0) {
                thumbImg.src = data.image.src;
                thumbImg.classList.add('is-loaded');
                thumbWrap.classList.remove('is-loading');
            } else {
                loader.onload = function () {
                    if (thumbImg.dataset.token !== String(imageToken)) return;
                    thumbImg.src = data.image.src;
                    thumbImg.classList.add('is-loaded');
                    thumbWrap.classList.remove('is-loading');

                    if (this.naturalHeight > this.naturalWidth * 1.05 && !card.classList.contains('page-preview-is-wide')) {
                        card.classList.remove('page-preview-is-tall');
                        card.classList.add('page-preview-is-wide');
                        updatePosition(targetLink, true, data);
                    }
                };
                loader.onerror = function () {
                    if (thumbImg.dataset.token !== String(imageToken)) return;
                    thumbWrap.classList.remove('is-loading');
                    thumbWrap.style.display = 'none';
                    card.classList.remove('page-preview-is-tall', 'page-preview-is-wide');
                    card.classList.add('page-preview-no-image');
                    updatePosition(targetLink, false, data);
                };
            }
        } else {
            thumbWrap.style.display = 'none';
            card.classList.add('page-preview-no-image');
        }

        updatePosition(targetLink, isWide, data);
        if (isSwitching) {
            void card.offsetHeight;
            card.classList.remove('page-preview-no-slide');
        }

        card.classList.add('is-visible');
        isCardVisible = true;
        displayedLink = targetLink;
    }

    function scheduleHide() {
        if (isSettingsOpen) return;
        clearTimeout(hoverTimeout);
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideCard, config.hideDelay);
    }

    function hideCard() {
        if (popupEl) {
            popupEl.classList.remove('is-visible');
            popupEl.classList.remove('in-settings-mode');
        }
        if (isCardVisible) {
            lastDismissTime = Date.now();
            isCardVisible = false;
        }
        isSettingsOpen = false;
        activeLink = null;
        displayedLink = null;
        if (activePrefetch) {
            activePrefetch.abort();
            activePrefetch = null;
        }
    }

    // event delegation
    document.addEventListener('mouseover', function (e) {
        if (!isPreviewsEnabled() || isSettingsOpen) return;
        const link = e.target.closest('a');
        if (!link) return;

        const target = resolveLinkTarget(link);
        if (!target) return;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        clearTimeout(hideTimeout);
        if (activeLink === link) return;

        activeLink = link;
        clearTimeout(hoverTimeout);

        if (activePrefetch) activePrefetch.abort();
        activePrefetch = new AbortController();
        const prefetchPromise = fetchPreviewData(target, activePrefetch.signal);

        // handle aborts even if the hover timer is cleared before it awaits
        prefetchPromise.catch(() => {});

        const isWarm = isCardVisible || (Date.now() - lastDismissTime < 350);
        const delay = isWarm ? config.warmHoverDelay : config.hoverDelay;
        const requestId = ++currentRequestId;

        hoverTimeout = setTimeout(() => {
            if (activeLink !== link || requestId !== currentRequestId) return;
            prefetchPromise.then(data => {
                if (activeLink === link && requestId === currentRequestId) {
                    showCard(link, data);
                }
            }).catch(() => {});
        }, delay);
    });

    document.addEventListener('mousemove', function (e) {
        if (activeLink && e.target.closest('a') === activeLink) {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
        const link = e.target.closest('a');
        if (!link || link !== activeLink) return;
        if (e.relatedTarget && popupEl && popupEl.contains(e.relatedTarget)) return;
        scheduleHide();
    });

    window.addEventListener('scroll', () => {
        if (isCardVisible && !isSettingsOpen) hideCard();
    }, { passive: true });

    // inject footer toggle link
    function injectFooterLink() {
        const footer = document.querySelector('.global-footer__bottom, .wds-global-footer__bottom, footer');
        if (!footer || document.getElementById('page-previews-footer-link')) return;

        const link = document.createElement('a');
        link.id = 'page-previews-footer-link';
        link.href = '#';
        link.style.cssText = 'margin-left: 12px; font-size: 11px; opacity: 0.7; color: inherit;';
        link.textContent = isPreviewsEnabled() ? 'Page Previews: Enabled' : 'Page Previews: Disabled';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newState = !isPreviewsEnabled();
            localStorage.setItem('pagepreviews_enabled', newState ? 'true' : 'false');
            link.textContent = newState ? 'Page Previews: Enabled' : 'Page Previews: Disabled';
            showToast(newState ? 'Page Previews enabled!' : 'Page Previews disabled.', () => {
                localStorage.setItem('pagepreviews_enabled', (!newState).toString());
                link.textContent = (!newState) ? 'Page Previews: Enabled' : 'Page Previews: Disabled';
            });
        });
        footer.appendChild(link);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFooterLink);
    } else {
        injectFooterLink();
    }

    // expose API
    window.PagePreviews = {
        version: '1.0',
        clearCache: () => previewCache.clear(),
        enable: () => localStorage.setItem('pagepreviews_enabled', 'true'),
        disable: () => {
            localStorage.setItem('pagepreviews_enabled', 'false');
            hideCard();
        },
        config: config
    };

})(window, document);