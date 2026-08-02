/* jshint esversion: 11 */
(async () => {
    'use strict';
    
    const getPageUrl = (page) => mw.config.get('wgArticlePath').replace('$1', page);
    
    const CONFIG = {
        maxTiles: 9,
        allowedNamespaces: [0], 
        fallbackImage: getPageUrl('Special:FilePath/Site-favicon.ico'),
        apiUrl: 'https://services.fandom.com/recommendations/recommendations'
    };

    // 1. Проверка пространства имен
    if (!CONFIG.allowedNamespaces.includes(mw.config.get('wgNamespaceNumber'))) return;

    // 2. Безопасная загрузка только необходимых утилит
    await mw.loader.using(["mediawiki.util"]);

    const shuffleArray = (array) => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr;
    };

    const getCleanImageUrl = (url) => {
        return url 
            ? String(url).trim().replace(/\/(top-crop|smart|scale-to-width-down|zoom-crop|window-crop)\/[a-zA-Z0-9\/-]+/gi, '') 
            : CONFIG.fallbackImage;
    };

    const el = (tag, attrs = {}, children = []) => {
        const element = document.createElement(tag);
        for (const [key, value] of Object.entries(attrs)) {
            if (key === 'class') element.className = value;
            else if (key === 'text') element.textContent = value;
            else element.setAttribute(key, value);
        }
        element.append(...children); 
        return element;
    };

    const fetchJSON = async (url, params) => {
        const queryString = new URLSearchParams(params).toString();
        const requestUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
        const response = await fetch(requestUrl);
        if (!response.ok) throw new Error('API Error');
        return response.json();
    };

    const buildMoreWikiCard = (items) => {
        const siteName = mw.config.get('wgSiteName');
        const listItems = items.length 
            ? items.map(art => el('a', { class: 'fan-feed__special-item', href: art.url }, [
                el('img', { class: 'fan-feed__wiki-art-img', src: getCleanImageUrl(art.image), alt: art.title }),
                el('span', { class: 'fan-feed__item-title', text: art.title })
            ]))
            : [el('div', { class: 'fan-feed__empty-msg', text: 'Нет рекомендаций' })];

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [
                    el('i', { class: 'fa-solid fa-folder-open' }), ` Ещё на ${siteName}`
                ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, listItems)
        ]);
    };

    const buildActiveUsersCard = (topUsers) => {
        const listItems = topUsers?.length 
            ? topUsers.map(user => el('div', { class: 'fan-feed__special-item fan-feed__special-item--user' }, [
                el('a', { class: 'fan-feed__item-title', href: getPageUrl(`User:${user.name}`), text: user.name }),
                el('div', { class: 'fan-feed__user-stats' }, [
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Правки статей' }, [ el('i', { class: 'fa-solid fa-pen-to-square' }), el('span', { text: user.edits }) ]),
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Загруженные файлы' }, [ el('i', { class: 'fa-solid fa-icons' }), el('span', { text: user.files }) ]),
                    el('div', { class: 'fan-feed__stat', 'data-tooltip': 'Социальная активность' }, [ el('i', { class: 'fa-solid fa-envelopes-bulk' }), el('span', { text: user.social }) ])
                ])
            ]))
            : [el('div', { class: 'fan-feed__empty-msg', text: 'Нет данных об активности' })];

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [ el('i', { class: 'fa-solid fa-ranking-star' }), ' Самые активные' ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, listItems)
        ]);
    };

    const buildHelpWikiCard = () => {
        const links = [
            { text: 'Создать статьи', url: getPageUrl('Special:WantedPages'), icon: 'fa-solid fa-pen-clip' },
            { text: 'Загрузить файлы', url: getPageUrl('Special:Upload'), icon: 'fa-solid fa-copy' },
            { text: 'Принять участие в обсуждении', url: getPageUrl('f'), icon: 'fa-solid fa-envelope-open-text' }
        ];

        return el('div', { class: 'fan-feed__card fan-feed__card--special' }, [
            el('header', { class: 'fan-feed__special-header' }, [
                el('span', { class: 'fan-feed__header-title-wrap' }, [ el('i', { class: 'fa-solid fa-handshake-angle' }), ' Помочь Вики' ])
            ]),
            el('ul', { class: 'fan-feed__special-list' }, links.map(item => 
                el('a', { class: 'fan-feed__special-item', href: item.url }, [
                    el('i', { class: `fan-feed__action-icon ${item.icon}` }),
                    el('span', { class: 'fan-feed__item-title', text: item.text })
                ])
            ))
        ]);
    };

    const buildFanFeed = async () => {
        const wikiId = mw.config.get('wgCityId');
        const articleId = mw.config.get('wgArticleId');
        if (!wikiId || !articleId) return;

        const grid = el('div', { class: 'fan-feed__grid' });
        const titleH2 = document.createElement('h2');
        titleH2.className = 'fan-feed__title';
        titleH2.innerHTML = '<i class="fa-solid fa-newspaper"></i> Новостная лента';
        
        const wrapper = el('div', { class: 'fan-feed', id: 'custom-fan-feed' }, [
            el('div', { class: 'fan-feed__container' }, [ titleH2, grid ])
        ]);

        const target = document.querySelector('.page.has-right-rail');
        target ? target.after(wrapper) : document.body.appendChild(wrapper);

        const wikiaApiUrl = mw.util.wikiScript('api');
        
        const [recData, rcData, randomData] = await Promise.allSettled([
            fetch(`${CONFIG.apiUrl}?wikiId=${wikiId}&articleId=${articleId}`).then(r => r.json()),
            fetchJSON(wikiaApiUrl, { action: 'query', list: 'recentchanges', rcprop: 'user|type|loginfo', rclimit: 500, rcshow: '!bot|!anon', format: 'json', formatversion: 2 }),
            fetchJSON(wikiaApiUrl, { action: 'query', generator: 'random', grnnamespace: 0, grnlimit: CONFIG.maxTiles + 5, prop: 'pageimages|info', inprop: 'url', pithumbsize: 600, format: 'json', formatversion: 2 })
        ]).then(results => results.map(r => r.status === 'fulfilled' ? r.value : {}));

        const usersMap = {};
        rcData?.query?.recentchanges?.forEach(rc => {
            const name = rc.user;
            usersMap[name] ??= { name, edits: 0, files: 0, social: 0, total: 0 };
            
            if (rc.type === 'log' && rc.loginfo?.type === 'upload') {
                usersMap[name].files++;
            } else if (rc.type === 'edit' || rc.type === 'new') {
                [500, 1200, 1201, 2000, 2001].includes(rc.ns) ? usersMap[name].social++ : usersMap[name].edits++;
            }
            usersMap[name].total++;
        });

        const top3Users = Object.values(usersMap).sort((a, b) => b.total - a.total).slice(0, 3);

        let randomPages = shuffleArray(Object.values(randomData?.query?.pages ?? {}));
        
        const moreWikiFormatted = randomPages.splice(0, 3).map(page => ({
            title: page.title,
            url: page.fullurl,
            image: page.thumbnail?.source ?? CONFIG.fallbackImage 
        }));

        while (moreWikiFormatted.length < 3) {
            moreWikiFormatted.push({ title: 'Случайная статья', url: getPageUrl('Special:Random'), image: CONFIG.fallbackImage });
        }

        let localItems = (recData?.article_recommendation ?? []).filter(i => !i.wiki_id || String(i.wiki_id) === String(wikiId));
        const existingUrls = new Set(localItems.map(i => i.url));
        
        randomPages.forEach(page => {
            if (page.thumbnail && page.fullurl && !existingUrls.has(page.fullurl)) {
                localItems.push({
                    title: page.title, article_title: page.title, url: page.fullurl,
                    thumbnail_url: page.thumbnail.source, wiki_id: wikiId, wiki_title: mw.config.get('wgSiteName')
                });
            }
        });

        shuffleArray(localItems).slice(0, CONFIG.maxTiles).forEach(item => {
            const faviconUrl = item.url?.includes('/wiki/') 
                ? `${item.url.split('/wiki/')[0]}/wiki/Special:FilePath/Site-favicon.ico` 
                : CONFIG.fallbackImage;

            const img = el('img', { class: 'fan-feed__image', src: getCleanImageUrl(item.thumbnail_url), alt: item.article_title });
            img.addEventListener('load', (e) => {
                const ratio = e.target.naturalWidth / e.target.naturalHeight;
                e.target.classList.add((ratio >= 0.95 && ratio <= 1.05) ? 'fan-feed__image--square' : 'fan-feed__image--rect');
            });

            grid.append(el('a', { class: 'fan-feed__card fan-feed__card--image', href: item.url }, [
                img,
                el('div', { class: 'fan-feed__overlay' }, [
                    el('img', { class: 'fan-feed__favicon', src: faviconUrl, alt: 'Favicon' }),
                    el('div', { class: 'fan-feed__text-wrap' }, [
                        el('h4', { class: 'fan-feed__card-title', text: item.article_title }),
                        el('p', { class: 'fan-feed__card-subtitle', text: item.wiki_title })
                    ])
                ])
            ]));
        });

        grid.append(buildMoreWikiCard(moreWikiFormatted), buildActiveUsersCard(top3Users), buildHelpWikiCard());
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildFanFeed);
    } else {
        buildFanFeed();
    }
})();