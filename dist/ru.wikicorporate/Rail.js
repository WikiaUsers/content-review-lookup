(() => {
    // 1. Работаем только в статьях 
    // Если это служебная страница, скрипт мгновенно прекращает работу
    if (mw.config.get('wgNamespaceNumber') !== 0) return;

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

    // Ждем загрузки базовых библиотек MediaWiki перед стартом
    mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Title']).then(() => {
        const api = new mw.Api();

        // Функции сбора данных

        const fetchAndParseModules = () => {
            return api.get({ action: 'query', prop: 'revisions', titles: 'Module:Rail', rvprop: 'content', rvslots: 'main', formatversion: 2 })
                .then((sourceResponse) => {
                    const pages = sourceResponse.query && sourceResponse.query.pages;
                    if (!pages || pages.length === 0 || pages[0].missing) return null;

                    const luaCode = pages[0].revisions[0].slots.main.content;
                    const regex = /local\s+([a-zA-Z0-9_]+)\s*=\s*\[==\[([\s\S]*?)\]==\]/g;
                    let match, combinedWikitext = '';

                    while ((match = regex.exec(luaCode)) !== null) {
                        combinedWikitext += `<div class="temp-rail-wrapper" data-module-name="${match[1]}">\n${match[2]}\n</div>\n`;
                    }
                    if (!combinedWikitext) return null;
                    combinedWikitext += '\n__NOTOC__\n';

                    return api.post({ action: 'parse', text: combinedWikitext, contentmodel: 'wikitext', disablelimitreport: 1, disableeditsection: 1, disabletoc: 1, format: 'json' });
                })
                .then((parseResponse) => {
                    return (parseResponse && parseResponse.parse && parseResponse.parse.text) ? parseResponse.parse.text['*'] : null;
                })
                .catch((e) => {
                    console.warn('Ошибка загрузки Module:Rail:', e);
                    return null;
                });
        };

        const fetchPopularPages = () => {
            const wikiId = mw.config.get('wgCityId');
            const articleId = mw.config.get('wgArticleId') || 0; 
            const serverName = mw.config.get('wgServerName'); 
            let articles = [];

            const addArticle = (title, url, img) => {
                if (articles.length >= 5) return;
                if (!articles.find((a) => a.title === title)) {
                    articles.push({ title, url, img });
                }
            };

            let promiseChain = Promise.resolve();

            if (wikiId) {
                promiseChain = promiseChain.then(() => {
                    return fetch(`https://services.fandom.com/recommendations/recommendations?wikiId=${wikiId}&articleId=${articleId}`)
                        .then((response) => response.ok ? response.json() : Promise.reject())
                        .then((data) => {
                            const localItems = (data.article_recommendation || []).filter((item) => 
                                (item.wiki_id && String(item.wiki_id) === String(wikiId)) || 
                                (item.url && item.url.indexOf(serverName) !== -1) || 
                                (item.url && item.url.indexOf('/') === 0 && item.url.indexOf('//') !== 0)
                            );
                            shuffleArray(localItems).forEach((i) => addArticle(i.article_title, i.url, i.thumbnail_url));
                        })
                        .catch(() => {});
                });
            }

            promiseChain = promiseChain.then(() => {
                if (articles.length < 5) {
                    return $.getJSON(mw.util.wikiScript('wikia'), { controller: "FeedsAndPosts", method: "getAll", format: "json" })
                        .then((fbData) => {
                            if (fbData && fbData.topArticles) {
                                fbData.topArticles.forEach((i) => addArticle(i.title, i.url, i.image));
                            }
                        })
                        .catch(() => {});
                }
            });

            promiseChain = promiseChain.then(() => {
                if (articles.length < 5) {
                    return api.get({ action: 'query', generator: 'random', grnnamespace: 0, grnlimit: 10, prop: 'pageimages|info', inprop: 'url', pithumbsize: 50, formatversion: 2 })
                        .then((mwData) => {
                            if (mwData.query && mwData.query.pages) {
                                mwData.query.pages.forEach((p) => addArticle(p.title, p.fullurl, p.thumbnail ? p.thumbnail.source : undefined));
                            }
                        })
                        .catch(() => {});
                }
            });

            return promiseChain.then(() => articles.length > 0 ? articles : null);
        };

        const fetchDiscussionsActivity = () => {
            const apiUrl = mw.util.wikiScript('wikia');
            
            return $.getJSON(apiUrl, { controller: "DiscussionPost", method: "getPosts", viewableOnly: true, sortKey: "creation_date", limit: 20 })
                .then((postsData) => {
                    const posts = (postsData && postsData._embedded && postsData._embedded['doc:posts']) || [];
                    if (posts.length === 0) return null;

                    const uniquePosts = [];
                    const seenThreads = new Set();
                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i];
                        if (!seenThreads.has(post.threadId)) {
                            seenThreads.add(post.threadId);
                            uniquePosts.push(post);
                        }
                        if (uniquePosts.length === 5) break; 
                    }
                    if (uniquePosts.length === 0) return null;

                    const articleIds = uniquePosts
                        .filter((p) => p._embedded && p._embedded.thread && p._embedded.thread[0] && p._embedded.thread[0].containerType === 'ARTICLE_COMMENT')
                        .map((p) => p.forumId)
                        .filter(Boolean);
                    
                    const articleData = {};
                    let articlePromise = Promise.resolve();
                    
                    if (articleIds.length > 0) {
                        articlePromise = $.getJSON(apiUrl, { controller: 'FeedsAndPosts', method: 'getArticleNamesAndUsernames', stablePageIds: articleIds.join(','), format: 'json' })
                            .then((titleData) => {
                                if (titleData && titleData.articleNames) {
                                    Object.assign(articleData, titleData.articleNames);
                                }
                            })
                            .catch(() => {});
                    }

                    return articlePromise.then(() => {
                        const now = Math.floor(Date.now() / 1000);
                        return uniquePosts.map((post) => {
                            const containerType = (post._embedded && post._embedded.thread && post._embedded.thread[0] && post._embedded.thread[0].containerType) || 'FORUM';
                            const authorName = (post.createdBy && post.createdBy.name) || 'Аноним';
                            let threadUrl = '';
                            let displayTitle = post._embedded && post._embedded.thread && post._embedded.thread[0] && post._embedded.thread[0].title;

                            if (containerType === 'FORUM') {
                                threadUrl = mw.config.get("wgScriptPath") + '/f/p/' + post.threadId + (post.isReply ? '/r/' + post.id : '');
                                if (!displayTitle) displayTitle = 'Обсуждение на форуме';
                            } else if (containerType === 'WALL' || containerType === 'MESSAGE_WALL') {
                                const cleanWallName = (post.forumName || '').replace(/ Message Wall$/, '').replace(/^Стена обсуждения:/, '');
                                threadUrl = mw.util.getUrl('Message_Wall:' + cleanWallName) + '?threadId=' + post.threadId + (post.isReply ? '#' + post.id : '');
                                if (!displayTitle || displayTitle.indexOf('@') === 0) displayTitle = `Сообщение на стене`;
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
                    });
                })
                .catch((e) => {
                    console.warn('Ошибка загрузки социальной активности:', e);
                    return null;
                });
        };

        const fetchNewFilesActivity = () => {
            return api.get({ action: 'query', list: 'logevents', letype: 'upload', leaction: 'upload/upload', meta: 'siteinfo', siprop: 'statistics', lelimit: 10, formatversion: 2 })
                .then((logData) => {
                    const totalImages = logData.query && logData.query.statistics && logData.query.statistics.images;
                    const pageIds = (logData.query.logevents || []).map((e) => e.pageid).filter((id) => id > 0);
                    
                    if (pageIds.length === 0) return null;

                    return api.get({ action: 'query', prop: 'imageinfo', pageids: pageIds.join('|'), iiprop: 'url', iiurlwidth: 50, formatversion: 2 })
                        .then((imageInfo) => {
                            const files = [];
                            
                            pageIds.forEach((id) => {
                                const p = imageInfo.query.pages.find((page) => page.pageid === id);
                                if (p && p.imageinfo && p.imageinfo[0]) {
                                    files.push({
                                        title: p.title.replace(/^(File|Файл):/, ''),
                                        url: p.imageinfo[0].descriptionurl,
                                        thumb: p.imageinfo[0].thumburl || p.imageinfo[0].url
                                    });
                                }
                            });

                            return files.length > 0 ? { files, total: totalImages } : null;
                        });
                })
                .catch((e) => {
                    console.warn('Ошибка загрузки новых файлов:', e);
                    return null;
                });
        };

        // VUE-компонент 
        const mountVueApp = (container, dataProps) => {
            if (!dataProps.popular && !dataProps.social && !dataProps.files) return;

            return mw.loader.using(['vue', '@wikimedia/codex']).then((require) => {
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
                                                <img v-if="file.thumb" :src="formatImage(file.thumb)" :alt="file.title" class="new-files__image">
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
                            // Удаляем параметры обрезки
                            cleanImg = cleanImg.replace(/\/top-crop\/width\/\d+\/height\/\d+/g, '');
                            // Удаляем параметр /scale-to-width-down/50 (или любые другие числа ширины)
                            cleanImg = cleanImg.replace(/\/scale-to-width-down\/\d+/g, '');
                            return cleanImg.replace(/\/smart\/[^\?]+/, '/smart/width/50/height/50');
                        }
                    }
                };

                Vue.createMwApp(App).mount(container);
            });
        };

        // Параллельная загрузка данных
        const dataPromise = Promise.all([
            fetchAndParseModules(), 
            fetchPopularPages(),
            fetchDiscussionsActivity(),
            fetchNewFilesActivity()
        ]);

        // Гибридное ожидание и вставка в DOM
        const insertIntoDOM = () => {
            const wikiaRail = document.querySelector('#WikiaRail');
            if (!wikiaRail) return false;

            // Защита от дублирования
            if (document.querySelector('.custom-rail-modules-container')) return true;

            // Проверяем, есть ли внешний контейнер-обертка
            let rightRailWrapper = wikiaRail.closest('.right-rail-wrapper') || wikiaRail.closest('.page__right-rail');

            // Подготавливаем фрагмент для вставки
            const fragment = document.createDocumentFragment();

            dataPromise.then(([renderedHtml, popularData, socialData, filesData]) => {
                // Вставляем сырой HTML
                if (renderedHtml) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(renderedHtml, 'text/html');
                    const wrappers = doc.querySelectorAll('.temp-rail-wrapper');
                    for (let i = 0; i < wrappers.length; i++) {
                        const section = document.createElement('section');
                        section.className = 'railModule rail-module'; 
                        section.setAttribute('data-rail-module', wrappers[i].getAttribute('data-module-name'));
                        section.innerHTML = wrappers[i].innerHTML;
                        fragment.appendChild(section);
                    }
                }

                // Создаем контейнер для Vue
                const vueContainer = document.createElement('div');
                vueContainer.className = 'custom-rail-modules-container';
                fragment.appendChild(vueContainer);

                // Логика вставки
                if (rightRailWrapper) {
                    // Если есть обертка, вставляем снаружи зоны React
                    const stickyAds = rightRailWrapper.querySelector('.sticky-modules-wrapper');
                    if (stickyAds) {
                        rightRailWrapper.insertBefore(fragment, stickyAds);
                    } else if (wikiaRail.nextSibling) {
                        rightRailWrapper.insertBefore(fragment, wikiaRail.nextSibling);
                    } else {
                        rightRailWrapper.appendChild(fragment);
                    }
                } else {
                    // Классическая вставка внутрь
                    const stickyModule = wikiaRail.querySelector('.rail-sticky-module');
                    const recentActivity = wikiaRail.querySelector('#wikia-recent-activity');

                    if (recentActivity && recentActivity.nextSibling) {
                        wikiaRail.insertBefore(fragment, recentActivity.nextSibling);
                    } else if (stickyModule) {
                        wikiaRail.insertBefore(fragment, stickyModule);
                    } else {
                        wikiaRail.appendChild(fragment);
                    }
                }

                // Скрипты MediaWiki
                if (window.jQuery) {
                    window.jQuery(fragment).children('.railModule').each(function () {
                        mw.hook('wikipage.content').fire(window.jQuery(this));
                    });
                }

                // Запускаем Vue
                mountVueApp(vueContainer, {
                    popular: popularData,
                    social: socialData,
                    files: filesData
                });

            }).catch((error) => {
                console.error('Критическая ошибка при рендере модулей боковой панели:', error);
            });

            return true;
        };

        // Пытаемся вставить сразу
        if (!insertIntoDOM()) {
            // Если колонки еще нет, используем MutationObserver
            const observer = new MutationObserver(() => {
                if (insertIntoDOM()) {
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            
            // Прекращаем наблюдение через 15 секунд, чтобы не грузить память, если колонка так и не появится
            setTimeout(() => observer.disconnect(), 15000);
        }

    }).catch((e) => {
        console.error('Ошибка инициализации базовых библиотек MediaWiki:', e);
    });
})();