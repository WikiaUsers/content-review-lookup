(async () => {
    const ns = mw.config.get('wgCanonicalNamespace');
    if (ns === 'Special' || ns === 'MediaWiki') return;

    // Вспомогательные функции
    const formatTimeAgo = (diffInSeconds) => {
        if (diffInSeconds < 60) return `${diffInSeconds} с. назад`;
        const minutes = Math.floor(diffInSeconds / 60);
        if (minutes < 60) return `${minutes} мин. назад`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} ч. назад`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} дн. назад`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} мес. назад`;
        return `${Math.floor(months / 12)} г. назад`;
    };

    const shuffleArray = (array) => {
        const arr = [...array]; 
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
        return arr;
    };

    const api = new mw.Api();

    // === ФУНКЦИИ СБОРА ДАННЫХ ===

    const fetchAndParseModules = async () => {
        try {
            const sourceResponse = await api.get({ action: 'query', prop: 'revisions', titles: 'Module:Rail', rvprop: 'content', rvslots: 'main', formatversion: 2 });
            const pages = sourceResponse.query.pages;
            if (!pages || pages.length === 0 || pages[0].missing) return null;

            const luaCode = pages[0].revisions[0].slots.main.content;
            const regex = /local\s+([a-zA-Z0-9_]+)\s*=\s*\[==\[([\s\S]*?)\]==\]/g;
            let match, combinedWikitext = '';

            while ((match = regex.exec(luaCode)) !== null) {
                combinedWikitext += `<div class="temp-rail-wrapper" data-module-name="${match[1]}">\n${match[2]}\n</div>\n`;
            }
            if (!combinedWikitext) return null;
            combinedWikitext += '\n__NOTOC__\n';

            const parseResponse = await api.post({ action: 'parse', text: combinedWikitext, contentmodel: 'wikitext', disablelimitreport: 1, disableeditsection: 1, disabletoc: 1, format: 'json' });
            return parseResponse.parse.text['*'];
        } catch (e) { return null; }
    };

    const fetchPopularPages = async () => {
        const wikiId = mw.config.get('wgCityId');
        const articleId = mw.config.get('wgArticleId') || 0; 
        const serverName = mw.config.get('wgServerName'); 
        let articles = [];

        const addArticle = (title, url, img) => {
            if (articles.length >= 5) return;
            if (!articles.find(a => a.title === title)) {
                articles.push({ title, url, img });
            }
        };

        if (wikiId) {
            try {
                const response = await fetch(`https://services.fandom.com/recommendations/recommendations?wikiId=${wikiId}&articleId=${articleId}`);
                if (response.ok) {
                    const data = await response.json();
                    const localItems = (data.article_recommendation || []).filter(item => 
                        (item.wiki_id && String(item.wiki_id) === String(wikiId)) || 
                        (item.url && item.url.includes(serverName)) || 
                        (item.url && item.url.startsWith('/') && !item.url.startsWith('//'))
                    );
                    shuffleArray(localItems).forEach(i => addArticle(i.article_title, i.url, i.thumbnail_url));
                }
            } catch (e) {}
        }

        if (articles.length < 5) {
            try {
                const fbData = await $.getJSON(mw.util.wikiScript('wikia'), { controller: "FeedsAndPosts", method: "getAll", format: "json" });
                (fbData?.topArticles || []).forEach(i => addArticle(i.title, i.url, i.image));
            } catch (e) {}
        }

        if (articles.length < 5) {
            try {
                const mwData = await api.get({ action: 'query', generator: 'random', grnnamespace: 0, grnlimit: 10, prop: 'pageimages|info', inprop: 'url', pithumbsize: 50, formatversion: 2 });
                (mwData.query?.pages || []).forEach(p => addArticle(p.title, p.fullurl, p.thumbnail?.source));
            } catch (e) {}
        }

        return articles.length > 0 ? articles : null;
    };

    const fetchDiscussionsActivity = async () => {
        try {
            const apiUrl = mw.util.wikiScript('wikia');
            const postsData = await $.getJSON(apiUrl, { controller: "DiscussionPost", method: "getPosts", viewableOnly: true, sortKey: "creation_date", limit: 20 });
            const posts = postsData?._embedded?.['doc:posts'] || [];
            if (posts.length === 0) return null;

            const uniquePosts = [];
            const seenThreads = new Set();
            for (const post of posts) {
                if (!seenThreads.has(post.threadId)) {
                    seenThreads.add(post.threadId);
                    uniquePosts.push(post);
                }
                if (uniquePosts.length === 5) break; 
            }
            if (uniquePosts.length === 0) return null;

            const articleIds = uniquePosts.filter(p => p._embedded?.thread?.[0]?.containerType === 'ARTICLE_COMMENT').map(p => p.forumId).filter(Boolean);
            const articleData = {};
            if (articleIds.length > 0) {
                try {
                    const titleData = await $.getJSON(apiUrl, { controller: 'FeedsAndPosts', method: 'getArticleNamesAndUsernames', stablePageIds: articleIds.join(','), format: 'json' });
                    if (titleData?.articleNames) Object.assign(articleData, titleData.articleNames);
                } catch (e) {}
            }

            const now = Math.floor(Date.now() / 1000);
            return uniquePosts.map(post => {
                const containerType = post._embedded?.thread?.[0]?.containerType || 'FORUM';
                const authorName = post.createdBy.name || 'Аноним';
                let threadUrl = '', displayTitle = post._embedded?.thread?.[0]?.title;

                if (containerType === 'FORUM') {
                    threadUrl = mw.config.get("wgScriptPath") + '/f/p/' + post.threadId + (post.isReply ? '/r/' + post.id : '');
                    if (!displayTitle) displayTitle = 'Обсуждение на форуме';
                } else if (containerType === 'WALL' || containerType === 'MESSAGE_WALL') {
                    const cleanWallName = (post.forumName || '').replace(/ Message Wall$/, '').replace(/^Стена обсуждения:/, '');
                    threadUrl = mw.util.getUrl('Message_Wall:' + cleanWallName) + '?threadId=' + post.threadId + (post.isReply ? '#' + post.id : '');
                    if (!displayTitle || displayTitle.startsWith('@')) displayTitle = `Сообщение на стене`;
                } else if (containerType === 'ARTICLE_COMMENT') {
                    const info = articleData[post.forumId];
                    if (info) {
                        threadUrl = info.relativeUrl + '?commentId=' + post.threadId + (post.isReply ? '&replyId=' + post.id : '');
                        displayTitle = info.title;
                    } else {
                        threadUrl = mw.config.get("wgScriptPath") + '/f/p/' + post.threadId;
                        displayTitle = post.forumName || `Комментарий к статье`;
                    }
                }

                return {
                    title: displayTitle,
                    url: threadUrl,
                    author: authorName,
                    authorUrl: mw.util.getUrl(`User:${authorName}`),
                    timeAgo: formatTimeAgo(Math.max(0, now - post.creationDate.epochSecond)),
                    fullDate: new Date(post.creationDate.epochSecond * 1000).toLocaleString(mw.config.get('wgContentLanguage'), { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })
                };
            });
        } catch (error) {
            return { error: true };
        }
    };

    const fetchNewFilesActivity = async () => {
        try {
            const logData = await api.get({ action: 'query', list: 'logevents', letype: 'upload', leaction: 'upload/upload', meta: 'siteinfo', siprop: 'statistics', lelimit: 10, formatversion: 2 });
            const totalImages = logData.query.statistics.images;
            const pageIds = (logData.query.logevents || []).map(e => e.pageid).filter(id => id > 0);
            
            if (pageIds.length === 0) return null;

            const imageInfo = await api.get({ action: 'query', prop: 'imageinfo', pageids: pageIds.join('|'), iiprop: 'url', iiurlwidth: 50, formatversion: 2 });
            const files = [];
            
            pageIds.forEach(id => {
                const p = imageInfo.query.pages.find(page => page.pageid === id);
                if (p?.imageinfo?.[0]) {
                    files.push({
                        title: p.title.replace(/^(File|Файл):/, ''),
                        url: p.imageinfo[0].descriptionurl,
                        thumb: p.imageinfo[0].thumburl || p.imageinfo[0].url
                    });
                }
            });

            return files.length > 0 ? { files, total: totalImages } : null;
        } catch (error) { return null; }
    };

    const waitForRail = () => {
        return new Promise(resolve => {
            const check = () => document.querySelector('#WikiaRail.is-ready') || document.querySelector('.wikia-rail-inner.is-ready') || document.querySelector('.right-rail-wrapper');
            if (check()) return resolve(check());
            const obs = new MutationObserver(() => { if (check()) { obs.disconnect(); resolve(check()); } });
            obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
            setTimeout(() => { obs.disconnect(); resolve(document.querySelector('#WikiaRail')); }, 15000);
        });
    };

    // === VUE КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ===
    const mountVueApp = async (container, dataProps) => {
        const require = await mw.loader.using(['vue', '@wikimedia/codex']);
        const Vue = require('vue');

        const App = {
            template: `
                <div class="custom-rail-modules">
                    
                    <section v-if="popular" class="rail-module popular-pages" data-rail-module="PopularPagesRail">
                        <h2 class="rail-module__header popular-pages__header">
                            <i class="fa-solid fa-fire"></i> {{ popularTitle }}
                        </h2>
                        <ul class="popular-pages__list">
                            <li v-for="page in popular" :key="page.url" class="popular-pages__item">
                                <a class="popular-pages__link" :href="page.url" :title="page.title">
                                    <img class="popular-pages__image" :src="formatImage(page.img)" :alt="page.title">
                                    <span class="popular-pages__title">{{ page.title }}</span>
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section v-if="social" class="rail-module social-activity" data-rail-module="SocialRail">
                        <h2 class="rail-module__header social-activity__header">
                            <i class="fa-solid fa-comments"></i> Социальная активность
                        </h2>
                        <div v-if="social.error" class="social-activity__error">
                            Ошибка при получении списка сообщений.
                        </div>
                        <ul v-else class="social-activity__list">
                            <li v-for="post in social" :key="post.url" class="social-activity__item">
                                <div class="social-activity__title">
                                    <a class="social-activity__link" :href="post.url">{{ post.title }}</a>
                                </div>
                                <div class="social-activity__meta">
                                    <a class="social-activity__author" :href="post.authorUrl">{{ post.author }}</a>
                                    <time class="social-activity__time" :title="post.fullDate">• {{ post.timeAgo }}</time>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section v-if="filesData" class="rail-module new-files" data-rail-module="FilesRail">
                        <h2 class="rail-module__header new-files__header">
                            <i class="fa-solid fa-images"></i> Новые файлы
                        </h2>
                        
                        <div class="new-files__stats">
                            <div class="new-files__count">
                                <em>{{ filesData.total.toLocaleString(lang) }}</em>
                                <span>файлов</span>
                            </div>
                            <a :href="uploadLink" class="wds-is-secondary wds-button wds-is-squished new-files__btn-upload">Загрузить</a>
                        </div>
                        
                        <div class="new-files__carousel" v-if="filesData.files.length > 0">
                            <button class="new-files__control new-files__control--left wds-is-secondary wds-button wds-is-squished" 
                                    :class="{'wds-is-disabled': carouselIndex === 0}" 
                                    @click="carouselIndex--"><</button>
                            
                            <ul class="new-files__list">
                                <li v-for="(file, idx) in filesData.files" :key="file.url" 
                                    class="new-files__item" 
                                    :class="{'new-files__item--hidden': idx < carouselIndex || idx >= carouselIndex + 4}">
                                    <a class="new-files__link" :href="file.url" :title="file.title">
                                        <img v-if="file.thumb" :src="file.thumb" :alt="file.title" class="new-files__image">
                                        <div v-else class="new-files__placeholder">Файл</div>
                                    </a>
                                </li>
                            </ul>
                            
                            <button class="new-files__control new-files__control--right wds-is-secondary wds-button wds-is-squished" 
                                    :class="{'wds-is-disabled': carouselIndex >= maxCarouselIndex}" 
                                    @click="carouselIndex++">></button>
                        </div>
                        
                        <div class="new-files__footer">
                            <a :href="newFilesLink" class="new-files__link-all">Показать все</a>
                        </div>
                    </section>

                </div>
            `,
            data() {
                return {
                    popular: dataProps.popular,
                    social: dataProps.social,
                    filesData: dataProps.files,
                    carouselIndex: 0,
                    lang: mw.config.get('wgUserLanguage'),
                    uploadLink: mw.util.getUrl('Special:Upload'),
                    newFilesLink: mw.util.getUrl('Special:NewFiles'),
                    popularTitle: mw.message('rail-popular-pages-header').exists() ? mw.message('rail-popular-pages-header').text() : 'Популярные страницы',
                    fallbackImage: (mw.config.get('wgArticlePath') || '/wiki/$1').replace('$1', 'Special:FilePath/Site-favicon.ico')
                };
            },
            computed: {
                maxCarouselIndex() {
                    return this.filesData ? Math.max(0, this.filesData.files.length - 4) : 0;
                }
            },
            methods: {
                formatImage(imgStr) {
                    if (!imgStr) return this.fallbackImage;
                    let cleanImg = imgStr.trim();
                    cleanImg = cleanImg.replace(/\/top-crop\/width\/\d+\/height\/\d+/g, '');
                    return cleanImg.replace(/\/smart\/[^\?]+/, '/smart/width/50/height/50');
                }
            }
        };

        Vue.createMwApp(App).mount(container);
    };

    // === ГЛАВНЫЙ ЗАПУСК ===
    try {
        await mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Title']);
        
        // Выполняем все тяжелые запросы параллельно
        const [renderedHtml, popularData, socialData, filesData, railElement] = await Promise.all([
            fetchAndParseModules(), 
            fetchPopularPages(),
            fetchDiscussionsActivity(),
            fetchNewFilesActivity(),
            waitForRail()
        ]);

        if (!railElement) return;

        const fragment = document.createDocumentFragment();

        // 1. Вставляем сырой HTML из Module:Rail
        if (renderedHtml) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(renderedHtml, 'text/html');
            doc.querySelectorAll('.temp-rail-wrapper').forEach(wrapper => {
                const section = document.createElement('section');
                section.className = 'rail-module';
                section.setAttribute('data-rail-module', wrapper.getAttribute('data-module-name'));
                section.innerHTML = wrapper.innerHTML;
                fragment.appendChild(section);
            });
        }

        // 2. Создаем контейнер для нашего Vue-приложения
        const vueContainer = document.createElement('div');
        fragment.appendChild(vueContainer);

        // 3. Вставляем всё в боковую панель
        const recentActivity = railElement.querySelector('#wikia-recent-activity');
        const stickyModule = railElement.querySelector('.rail-sticky-module');

        if (recentActivity && recentActivity.nextSibling) {
            railElement.insertBefore(fragment, recentActivity.nextSibling);
        } else if (stickyModule) {
            railElement.insertBefore(fragment, stickyModule);
        } else {
            railElement.appendChild(fragment);
        }

        // 4. Запускаем Vue, передавая ему скачанные данные
        mountVueApp(vueContainer, {
            popular: popularData,
            social: socialData,
            files: filesData
        });

    } catch (error) {
        console.error('Ошибка инициализации боковой панели:', error);
    }
})();