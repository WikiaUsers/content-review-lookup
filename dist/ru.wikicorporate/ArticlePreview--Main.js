/* Custom Page Previews (ES2024) */
(() => {
    'use strict';

    if (mw.config.get('wgNamespaceNumber') !== 0 || window.isArticlePreviewMainLoaded) return;
    window.isArticlePreviewMainLoaded = true;

    const HOVER_DELAY = 350;
    const HIDE_DELAY = 300;
    const CACHE = new Map();
    const POPUP_ID = 'custom-page-preview-popup';
    const EXCLUDED_NS_REGEX = /^(Участник|Служебная|Файл|Шаблон|Категория|Обсуждение|Блог|Форум|Модуль|MediaWiki|User|Special|File|Template|Category|Talk|Module|Message_Wall|Стена_обсуждения|User_blog):/i;

    let popup = document.getElementById(POPUP_ID);
    if (!popup) {
        popup = document.createElement('div');
        popup.id = POPUP_ID;
        popup.className = 'custom-page-preview';
        document.body.appendChild(popup);
    }

    let apiInstance = null;
    let showTimer = null;
    let hideTimer = null;
    let currentLink = null;
    let currentTitle = null;

    const getApi = async () => {
        if (apiInstance) return apiInstance;
        await mw.loader.using('mediawiki.api');
        apiInstance = new mw.Api();
        return apiInstance;
    };

    const hidePopup = () => {
        popup.classList.remove('visible');
        currentLink = null;
        currentTitle = null;
    };

    const startHideTimer = () => {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(hidePopup, HIDE_DELAY);
    };

    const renderPopup = (data, link) => {
        popup.textContent = '';
        popup.className = 'custom-page-preview';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'cpp-content';

        const extractEl = document.createElement('p');
        extractEl.className = 'cpp-extract';
        extractEl.textContent = data.extract;
        contentDiv.appendChild(extractEl);

        if (data.image) {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'cpp-image';
            const safeCssUrl = encodeURI(data.image).replaceAll("'", '%27').replaceAll(')', '%29');
            imageDiv.style.backgroundImage = `url('${safeCssUrl}')`;

            if (data.isLandscape) {
                popup.classList.add('layout-horizontal');
                popup.append(imageDiv, contentDiv);
            } else {
                popup.classList.add('layout-vertical');
                popup.append(contentDiv, imageDiv);
            }
            popup.classList.add('has-image');
        } else {
            popup.classList.add('no-image');
            popup.appendChild(contentDiv);
        }

        popup.classList.add('visible');

        const rect = link.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        let top = rect.bottom + window.scrollY + 8;
        let left = rect.left + window.scrollX;

        if (left + popupRect.width > window.innerWidth) {
            left = Math.max(10, window.innerWidth - popupRect.width - 20);
        }
        if (rect.bottom + popupRect.height + 20 > window.innerHeight) {
            top = rect.top + window.scrollY - popupRect.height - 8;
        }

        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;
    };

    const fetchData = (title) => {
        if (CACHE.has(title)) return CACHE.get(title);

        const promise = (async () => {
            try {
                const api = await getApi();
                const response = await api.get({
                    action: 'parse',
                    page: title,
                    prop: 'text',
                    formatversion: 2,
                    disablelimitreport: true,
                    disableeditsection: true,
                    disabletoc: true
                });

                const parsedText = response?.parse?.text;
                if (!parsedText) {
                    CACHE.delete(title);
                    return null;
                }

                const doc = new DOMParser().parseFromString(parsedText, 'text/html');
                let text = '';
                const paragraphs = doc.querySelectorAll('.mw-parser-output > p, .mw-parser-output > div > p');

                for (const p of paragraphs) {
                    if (p.closest('aside, table, figure, .toc, .infobox, .pi-item')) continue;

                    const pText = p.textContent.replaceAll(/\[\d+\]/g, '').trim();
                    if (pText.length > 20) {
                        text += `${text ? ' ' : ''}${pText}`;
                        if (text.length >= 250) break;
                    }
                }

                if (text.length > 250) {
                    const cutStr = text.slice(0, 250).replace(/\s+\S*$/, '').trim();
                    text = /[.!?][»"')]?$/.test(cutStr) ? cutStr : `${cutStr.replace(/[,;:—\-]+$/, '')}...`;
                }

                text ||= 'Описание отсутствует.';

                let imageUrl = null;
                let isLandscape = false;
                let imgEl = null;

                const imgSelectors = [
                    'aside.portable-infobox img.pi-image-thumbnail',
                    'aside.portable-infobox img',
                    '.mw-parser-output .thumbimage',
                    '.mw-parser-output figure img',
                    '.mw-parser-output img'
                ];

                for (const selector of imgSelectors) {
                    imgEl = Array.from(doc.querySelectorAll(selector)).find(img => {
                        const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
                        const w = parseInt(img.getAttribute('width'), 10) || 0;
                        const h = parseInt(img.getAttribute('height'), 10) || 0;
                        return src && !src.startsWith('data:') && !src.includes('sprite') && !src.includes('icon') && (w > 50 || h > 50);
                    });
                    if (imgEl) break;
                }

                if (imgEl) {
                    const rawUrl = imgEl.getAttribute('data-src') || imgEl.getAttribute('src');
                    if (rawUrl?.includes('nocookie.net')) {
                        try {
                            const urlObj = new URL(rawUrl, window.location.origin);
                            let path = urlObj.pathname;

                            const revMatch = path.match(/(.*?\/revision\/latest)/);
                            if (revMatch) {
                                path = revMatch[1];
                            } else {
                                const extMatch = path.match(/^.*?\.(png|jpg|jpeg|gif|webp)/i);
                                if (extMatch) path = extMatch[0];
                            }

                            if (!path.includes('/revision/latest')) path += '/revision/latest';
                            path += '/scale-to-width-down/400';

                            urlObj.pathname = path;
                            imageUrl = urlObj.toString();
                        } catch {
                            imageUrl = rawUrl;
                        }
                    } else {
                        imageUrl = rawUrl;
                    }

                    const width = parseInt(imgEl.getAttribute('width'), 10) || 1;
                    const height = parseInt(imgEl.getAttribute('height'), 10) || 1;
                    isLandscape = width > height;
                }

                const data = Object.freeze({ extract: text, image: imageUrl, isLandscape });

                if (imageUrl) {
                    const preloadImg = new Image();
                    preloadImg.src = imageUrl;
                }

                CACHE.set(title, data);
                return data;
            } catch {
                CACHE.delete(title);
                return null;
            }
        })();

        CACHE.set(title, promise);
        return promise;
    };

    document.body.addEventListener('mouseover', (e) => {
        if (!e.target?.closest) return;

        if (e.target.closest(`#${POPUP_ID}`)) {
            clearTimeout(hideTimer);
            return;
        }

        const link = e.target.closest('.mw-parser-output a');
        if (!link) return;

        if (!link.closest('p, li, dd')) return;
        if (link.closest('aside, .infobox, .navbox, .toc, table, .thumb, figure, .pi-item')) return;

        if (
            link.classList.contains('external') ||
            link.classList.contains('extiw') ||
            link.classList.contains('new') ||
            link.classList.contains('image')
        ) {
            return;
        }

        if (link.hostname && link.hostname !== window.location.hostname) return;

        let url;
        try {
            url = new URL(link.href, window.location.origin);
        } catch {
            return;
        }
        if (url.search || url.hash) return;

        const wikiMatch = url.pathname.match(/\/wiki\/(.+)$/);
        if (!wikiMatch) return;

        let title;
        try {
            title = decodeURIComponent(wikiMatch[1]).split('#')[0];
        } catch {
            return;
        }
        if (EXCLUDED_NS_REGEX.test(title)) return;

        clearTimeout(hideTimer);

        if (currentLink !== link) {
            clearTimeout(showTimer);
            currentLink = link;
            currentTitle = title;
            const dataOrPromise = fetchData(title);

            showTimer = setTimeout(async () => {
                if (currentTitle !== title) return;
                const data = dataOrPromise instanceof Promise ? await dataOrPromise : dataOrPromise;
                if (data && currentTitle === title) {
                    renderPopup(data, link);
                }
            }, HOVER_DELAY);
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        if (!e.target?.closest) return;

        if (e.target.closest(`#${POPUP_ID}`)) {
            startHideTimer();
            return;
        }

        const link = e.target.closest('.mw-parser-output a');
        if (link && link === currentLink) {
            if (e.relatedTarget && link.contains(e.relatedTarget)) return;
            clearTimeout(showTimer);
            startHideTimer();
        }
    });
})();