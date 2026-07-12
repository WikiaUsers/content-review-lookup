/**
 * Оптимизированный скрипт Новостной ленты 
 */
(() => {
    'use strict';

    const getPageUrl = (page) => mw.config.get('wgArticlePath').replace('$1', page);
    
    const CONFIG = {
        maxTiles: 9, // Количество графических плиток
        allowedNamespaces: [0], 
        fallbackImage: getPageUrl('Special:FilePath/Site-favicon.ico'),
        apiUrl: 'https://services.fandom.com/recommendations/recommendations'
    };

    const shuffleArray = (array) => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr;
    };

    const getCleanImageUrl = (url) => {
        if (!url) return CONFIG.fallbackImage;
        return String(url).trim().replace(/\/(top-crop|smart|scale-to-width-down|zoom-crop|window-crop)\/[a-zA-Z0-9\/-]+/gi, '');
    };

    const el = (tag, attrs = {}, children = []) => {
        const element = document.createElement(tag);
        for (const key of Object.keys(attrs)) {
            if (key === 'class') {
                element.className = attrs[key];
            } else if (key === 'text') {
                element.textContent = attrs[key];
            } else {
                element.setAttribute(key, attrs[key]);
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        return element;
    };

    const fetchJSON = (url, params) => {
        const queryString = new URLSearchParams(params).toString();
        const requestUrl = url.indexOf('?') !== -1 ? `${url}&${queryString}` : `${url}?${queryString}`;
        
        return fetch(requestUrl).then(response => {
            if (!response.ok) throw new Error('API Error');
            return response.json();
        });
    };

    // Карточка 1: Ещё на Вики
    const buildMoreWikiCard = (items) => {
        const siteName = mw.config.get('wgSiteName');
        const listItems = items.map(art => 
            el('a', { class: 'fan-feed__special-item', href: art.url }, [
                el('img', { class: 'fan-feed__wiki-art-img', src: getCleanImageUrl(art.image), alt: art.title }),
                el('span', { class: 'fan-feed__item-title', text: art.title })
            ])
        );

        if (listItems.length === 0) {
            listItems.push(el('div', { class: 'fan-feed__empty-msg', text: 'Нет рекомендаций' }));
        }

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [
                    el('i', { class: 'fa-solid fa-folder-open' }),
                    ` Ещё на ${siteName}`
                ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, listItems)
        ]);
    };

    // Карточка 2: Самые активные
    const buildActiveUsersCard = (topUsers) => {
        let listItems = [];
        
        if (topUsers && topUsers.length > 0) {
            listItems = topUsers.map((user) => {
                const statsBox = el('div', { class: 'fan-feed__user-stats' }, [
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Правки статей' }, [
                        el('i', { class: 'fa-solid fa-pen-to-square' }),
                        el('span', { text: user.edits })
                    ]),
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Загруженные файлы' }, [
                        el('i', { class: 'fa-solid fa-icons' }),
                        el('span', { text: user.files })
                    ]),
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Социальная активность' }, [
                        el('i', { class: 'fa-solid fa-envelopes-bulk' }),
                        el('span', { text: user.social })
                    ])
                ]);

                // Выводим только ник и статистику
                return el('div', { class: 'fan-feed__special-item fan-feed__special-item--user' }, [
                    el('a', { class: 'fan-feed__item-title', href: getPageUrl(`User:${user.name}`), text: user.name }),
                    statsBox
                ]);
            });
        } else {
             listItems.push(el('div', { class: 'fan-feed__empty-msg', text: 'Нет данных об активности' }));
        }

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [
                    el('i', { class: 'fa-solid fa-ranking-star' }),
                    ' Самые активные'
                ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, listItems)
        ]);
    };

    // Карточка 3: Помочь Вики
    const buildHelpWikiCard = () => {
        const links = [
            { text: 'Создать статьи', url: getPageUrl('Special:WantedPages'), icon: 'fa-solid fa-pen-clip' },
            { text: 'Загрузить файлы', url: getPageUrl('Special:Upload'), icon: 'fa-solid fa-copy' },
            { text: 'Принять участие в обсуждении', url: getPageUrl('f'), icon: 'fa-solid fa-envelope-open-text' }
        ];

        const listItems = links.map(item => 
            el('a', { class: 'fan-feed__special-item', href: item.url }, [
                el('i', { class: `fan-feed__action-icon ${item.icon}` }),
                el('span', { class: 'fan-feed__item-title', text: item.text })
            ])
        );

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [
                    el('i', { class: 'fa-solid fa-handshake-angle' }),
                    ' Помочь Вики'
                ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, listItems)
        ]);
    };

    const buildFanFeed = () => {
        const wikiId = mw.config.get('wgCityId');
        const articleId = mw.config.get('wgArticleId');
        if (!wikiId || !articleId) return;

        const grid = el('div', { class: 'fan-feed__grid' });
        
        const titleH2 = document.createElement('h2');
        titleH2.className = 'fan-feed__title';
        titleH2.innerHTML = '<i class="fa-solid fa-newspaper"></i> Новостная лента';

        const wrapper = el('div', { class: 'fan-feed', id: 'custom-fan-feed' }, [
            el('div', { class: 'fan-feed__container' }, [
                titleH2,
                grid
            ])
        ]);

        const target = document.querySelector('.page.has-right-rail');
        if (target) {
            target.after(wrapper);
        } else {
            document.body.appendChild(wrapper);
        }

        const wikiaApiUrl = mw.util.wikiScript('api');
        const recApiUrl = `${CONFIG.apiUrl}?wikiId=${wikiId}&articleId=${articleId}`;

        const rcParams = {
            action: 'query',
            list: 'recentchanges',
            rcprop: 'user|type|loginfo',
            rclimit: 500,
            rcshow: '!bot|!anon',
            format: 'json',
            formatversion: 2
        };

        const randomParams = {
            action: 'query',
            generator: 'random',
            grnnamespace: 0,
            grnlimit: CONFIG.maxTiles + 5, 
            prop: 'pageimages|info',
            inprop: 'url',
            pithumbsize: 600,
            format: 'json',
            formatversion: 2
        };

        Promise.all([
            fetch(recApiUrl).then(r => r.json()).catch(() => ({})),
            fetchJSON(wikiaApiUrl, rcParams).catch(() => ({})),
            fetchJSON(wikiaApiUrl, randomParams).catch(() => ({}))
        ])
        .then(responses => {
            const recData = responses[0];
            const rcData = responses[1];
            const randomData = responses[2];
            
            // 1. Анализ активности
            const usersMap = {};
            if (rcData && rcData.query && rcData.query.recentchanges) {
                rcData.query.recentchanges.forEach(rc => {
                    const name = rc.user;
                    if (!usersMap[name]) {
                        usersMap[name] = { name: name, edits: 0, files: 0, social: 0, total: 0 };
                    }
                    if (rc.type === 'log' && rc.loginfo && rc.loginfo.type === 'upload') {
                        usersMap[name].files++;
                    } else if (rc.type === 'edit' || rc.type === 'new') {
                        if ([500, 1200, 1201, 2000, 2001].includes(rc.ns)) {
                            usersMap[name].social++;
                        } else {
                            usersMap[name].edits++;
                        }
                    }
                    usersMap[name].total++;
                });
            }
            
            const top3Users = Object.keys(usersMap)
                .map(key => usersMap[key])
                .sort((a, b) => b.total - a.total)
                .slice(0, 3);
            
            // 2. Обработка случайных статей
            let randomPages = [];
            if (randomData && randomData.query && randomData.query.pages) {
                randomPages = Object.values(randomData.query.pages);
            }
            randomPages = shuffleArray(randomPages);

            // Выделяем 3 случайные статьи для Первой карточки
            const moreWikiFormatted = randomPages.splice(0, 3).map(page => ({
                title: page.title,
                url: page.fullurl,
                image: page.thumbnail ? page.thumbnail.source : CONFIG.fallbackImage
            }));
            
            // Если API случайных страниц сломался, ставим заглушки
            while (moreWikiFormatted.length < 3) {
                moreWikiFormatted.push({ title: 'Случайная статья', url: getPageUrl('Special:Random'), image: CONFIG.fallbackImage });
            }

            // 3. Собираем локальные статьи из рекомендаций (Идут в Плитки)
            const siteName = mw.config.get('wgSiteName');
            let rawItems = recData.article_recommendation || [];
            let localItems = rawItems.filter(i => !i.wiki_id || String(i.wiki_id) === String(wikiId)); 
            
            // Доливаем остатки случайных статей, если рекомендаций не хватило
            const existingUrls = new Set(localItems.map(i => i.url));
            randomPages.forEach(page => {
                if (page.thumbnail && page.fullurl && !existingUrls.has(page.fullurl)) {
                    localItems.push({
                        title: page.title,
                        article_title: page.title,
                        url: page.fullurl,
                        thumbnail_url: page.thumbnail.source,
                        wiki_id: wikiId,
                        wiki_title: siteName
                    });
                }
            });
            
            localItems = shuffleArray(localItems);
            const imageGridItems = localItems.slice(0, CONFIG.maxTiles); 

            imageGridItems.forEach(item => {
                const imgSrc = getCleanImageUrl(item.thumbnail_url);
                
                let faviconUrl = CONFIG.fallbackImage;
                try {
                    if (item.url && item.url.indexOf('/wiki/') !== -1) {
                        faviconUrl = item.url.split('/wiki/')[0] + '/wiki/Special:FilePath/Site-favicon.ico';
                    }
                } catch (e) {}

                const img = el('img', { class: 'fan-feed__image', src: imgSrc, alt: item.article_title });
                
                img.addEventListener('load', function(e) {
                    const targetImg = e.target;
                    const ratio = targetImg.naturalWidth / targetImg.naturalHeight;
                    if (ratio >= 0.95 && ratio <= 1.05) {
                        targetImg.classList.add('fan-feed__image--square');
                    } else {
                        targetImg.classList.add('fan-feed__image--rect');
                    }
                });

                const overlay = el('div', { class: 'fan-feed__overlay' }, [
                    el('img', { class: 'fan-feed__favicon', src: faviconUrl, alt: 'Favicon' }),
                    el('div', { class: 'fan-feed__text-wrap' }, [
                        el('h4', { class: 'fan-feed__card-title', text: item.article_title }),
                        el('p', { class: 'fan-feed__card-subtitle', text: item.wiki_title })
                    ])
                ]);

                const card = el('a', { class: 'fan-feed__card fan-feed__card--image', href: item.url }, [
                    img,
                    overlay
                ]);
                
                grid.appendChild(card);
            });

            grid.appendChild(buildMoreWikiCard(moreWikiFormatted));
            grid.appendChild(buildActiveUsersCard(top3Users)); 
            grid.appendChild(buildHelpWikiCard());            
        });
    };

    const init = () => {
        const ns = mw.config.get('wgNamespaceNumber');
        if (CONFIG.allowedNamespaces.indexOf(ns) !== -1) {
            buildFanFeed();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();