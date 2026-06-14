(() => {
    'use strict';

    const HOVER_DELAY = 350; 
    const HIDE_DELAY = 300;
    const CACHE = new Map();
    const POPUP_ID = 'custom-page-preview-popup';

    let popup = document.getElementById(POPUP_ID);
    if (!popup) {
        popup = document.createElement('div');
        popup.id = POPUP_ID;
        popup.className = 'custom-page-preview';
        document.body.appendChild(popup);
    }

    let showTimer;
    let hideTimer;
    let currentLink = null;
    let currentTitle = null;

    const hidePopup = () => {
        popup.classList.remove('visible');
        currentLink = null;
        currentTitle = null;
    };

    const startHideTimer = () => {
        hideTimer = setTimeout(hidePopup, HIDE_DELAY);
    };

    const renderPopup = (data, link) => {
        popup.innerHTML = '';
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
            imageDiv.style.backgroundImage = `url('${data.image}')`;

            if (data.isLandscape) {
                popup.classList.add('layout-horizontal');
                popup.appendChild(imageDiv);
                popup.appendChild(contentDiv);
            } else {
                popup.classList.add('layout-vertical');
                popup.appendChild(contentDiv);
                popup.appendChild(imageDiv);
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
            left = window.innerWidth - popupRect.width - 20;
        }

        if (rect.bottom + popupRect.height + 20 > window.innerHeight) {
            top = rect.top + window.scrollY - popupRect.height - 8;
        }

        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;
    };

    const fetchData = (title) => {
        if (CACHE.has(title)) return CACHE.get(title);

        const promise = new Promise((resolve) => {
            mw.loader.using('mediawiki.api').then(() => {
                const api = new mw.Api();
                api.get({
                    action: 'parse',
                    page: title,
                    prop: 'text',
                    formatversion: 2,
                    disablelimitreport: true,
                    disableeditsection: true,
                    disabletoc: true
                }).then(response => {
                    if (!response.parse || !response.parse.text) {
                        resolve(null); return;
                    }

                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.parse.text, 'text/html');

                    let text = '';
                    const paragraphs = doc.querySelectorAll('.mw-parser-output > p, .mw-parser-output > div > p');
                    
                    for (let p of paragraphs) {
                        if (p.closest('aside, table, figure, .toc, .infobox, .pi-item')) continue;
                        
                        let pText = p.textContent.replace(/\[\d+\]/g, '').trim(); 
                        
                        if (pText.length > 20) {
                            text += (text ? ' ' : '') + pText;
                            if (text.length >= 250) break;
                        }
                    }

                    if (text.length > 250) {
                        let cutStr = text.substring(0, 250);
                        cutStr = cutStr.replace(/\s+\S*$/, '').trim();
                        
                        if (/[.!?][»"')]?$/.test(cutStr)) {
                            text = cutStr; 
                        } else {
                            text = cutStr.replace(/[,;:—\-]+$/, '') + '...';
                        }
                    }
                    
                    if (!text) text = 'Описание отсутствует.';

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
                        const found = Array.from(doc.querySelectorAll(selector)).find(img => {
                            const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
                            const w = parseInt(img.getAttribute('width')) || 0;
                            const h = parseInt(img.getAttribute('height')) || 0;
                            return src && !src.startsWith('data:') && !src.includes('sprite') && !src.includes('icon') && (w > 50 || h > 50);
                        });
                        
                        if (found) {
                            imgEl = found;
                            break;
                        }
                    }

                    if (imgEl) {
                        let rawUrl = imgEl.getAttribute('data-src') || imgEl.getAttribute('src');
                        
                        if (rawUrl && rawUrl.includes('nocookie.net')) {
                            try {
                                let urlObj = new URL(rawUrl);
                                let path = urlObj.pathname;
                                
                                const revMatch = path.match(/(.*?\/revision\/latest)/);
                                if (revMatch) {
                                    path = revMatch[1];
                                } else {
                                    const extMatch = path.match(/^.*?\.(png|jpg|jpeg|gif|webp)/i);
                                    if (extMatch) path = extMatch[0];
                                }
                                
                                if (!path.includes('/revision/latest')) {
                                    path += '/revision/latest';
                                }
                                path += '/scale-to-width-down/400';
                                
                                urlObj.pathname = path;
                                imageUrl = urlObj.toString(); 
                            } catch (e) {
                                imageUrl = rawUrl;
                            }
                        } else {
                            imageUrl = rawUrl;
                        }

                        const width = parseInt(imgEl.getAttribute('width')) || 1;
                        const height = parseInt(imgEl.getAttribute('height')) || 1;
                        isLandscape = width > height;
                    }

                    const data = {
                        extract: text,
                        image: imageUrl,
                        isLandscape: isLandscape
                    };

                    if (imageUrl) {
                        const img = new Image();
                        img.src = imageUrl;
                    }

                    CACHE.set(title, data);
                    resolve(data);
                }).catch(() => resolve(null));
            });
        });

        CACHE.set(title, promise);
        return promise;
    };

    // Глобальные слушатели курсора мыши
    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest('#' + POPUP_ID)) {
            clearTimeout(hideTimer);
            return;
        }

        const link = e.target.closest('.mw-parser-output a');
        if (!link) return;

        
        if (!link.closest('p, li, dd')) return;

        if (link.closest('aside, .infobox, .navbox, .toc, table, .thumb, figure, .pi-item')) return;
        

        if (link.classList.contains('external') || link.classList.contains('extiw') || 
            link.classList.contains('new') || link.classList.contains('image')) return;

        if (link.hostname && link.hostname !== window.location.hostname) return;

        const url = new URL(link.href, window.location.origin);
        if (url.search || url.hash) return; 

        const wikiMatch = url.pathname.match(/\/wiki\/(.+)$/);
        if (!wikiMatch) return;

        const title = decodeURIComponent(wikiMatch[1]).split('#')[0];
        if (/^(Участник|Служебная|Файл|Шаблон|Категория|Обсуждение|Блог|Форум|User|Special|File|Template|Category|Talk|Message_Wall|Стена_обсуждения):/i.test(title)) return;

        clearTimeout(hideTimer);
        
        if (currentLink !== link) {
            clearTimeout(showTimer);
            currentLink = link;
            currentTitle = title;

            const dataOrPromise = fetchData(title);

            showTimer = setTimeout(() => {
                if (currentTitle === title) {
                    if (dataOrPromise instanceof Promise) {
                        dataOrPromise.then(data => {
                            if (data && currentTitle === title) renderPopup(data, link);
                        });
                    } else if (dataOrPromise) {
                        renderPopup(dataOrPromise, link);
                    }
                }
            }, HOVER_DELAY);
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        if (e.target.closest('#' + POPUP_ID)) {
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