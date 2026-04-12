(() => {
    // Проверка на двойное выполнение и пространство имен (только для статей)
    if (window.isRelatedDiscussionsLoaded || mw.config.get("wgNamespaceNumber") !== 0) return;
    window.isRelatedDiscussionsLoaded = true;

    const pageTitle = mw.config.get("wgPageName").replaceAll("_", " ");

    // Асинхронная загрузка зависимостей Vue и Codex
    const loadVueDependencies = async () => {
        const require = await mw.loader.using(["vue", "@wikimedia/codex"]);
        return {
            vue: require("vue"),
            cdx: require("@wikimedia/codex")
        };
    };

    // Асинхронная загрузка обсуждений
    const fetchRelatedThreads = () => {
        return $.get({
            url: mw.util.wikiScript("wikia"),
            data: {
                controller: "DiscussionThread",
                method: "getThreads",
                tag: pageTitle,
                format: "json"
            }
        });
    };

    // Основная функция сборки виджета
    const buildWidget = (Vue, threads) => {
        const targetElement = document.querySelector(".license-description");
        if (!targetElement) return;

        const container = document.createElement("div");
        container.classList.add("related-discussions");
        targetElement.after(container);

        // Компонент отдельного поста
        const ThreadItemComponent = {
            name: "ThreadItem",
            props: {
                threadData: {
                    type: Object,
                    required: true
                }
            },
            template: `
                <li class="related-discussions-item">
                    <a class="related-discussions-item__content" :href="postLink">
                        <div class="related-discussions-item__avatar-wrapper">
                            <a class="related-discussions-item__avatar wds-avatar" :href="hasAuthor ? authorLink : null">
                                <img v-if="avatarUrl" class="related-discussions-item__avatar-image wds-avatar__image" :src="avatarUrl" width="26" />
                                <svg v-else class="related-discussions-item__avatar-icon wds-icon">
                                    <use xlink:href="#wds-icons-avatar" />
                                </svg>
                            </a>
                        </div>
                        <div class="related-discussions-item__text">
                            <span class="related-discussions-item__title">{{ threadData.title }}</span>
                            <span class="related-discussions-item__author">
                                <a v-if="hasAuthor" class="related-discussions-item__author-link" :href="authorLink">
                                    {{ authorName }}
                                </a>
                                <span v-else class="related-discussions-item__no-author">{{ anonText }}</span>
                            </span>
                        </div>
                        <div class="related-discussions-item__extra">
                            <div v-if="hasPolls" class="related-discussions-item__extra-content related-discussions-item__extra-content-poll">
                                <svg class="related-discussions-item__extra-content-icon wds-icon wds-icon-small">
                                    <use xlink:href="#wds-icons-poll-small" />
                                </svg>
                            </div>
                            <div v-else-if="hasImages" class="related-discussions-item__extra-content related-discussions-item__extra-content-attachment" :style="{ backgroundImage: \`url(\${firstImage})\` }">
                            </div>
                        </div>
                    </a>
                </li>
            `,
            data() {
                return {
                    postLink: `${mw.config.get("wgServer")}${mw.config.get("wgScriptPath")}/f/p/${this.threadData.id}`,
                    anonText: "Аноним" // Текст для анонимов без i18n
                };
            },
            computed: {
                hasAuthor() { return !!this.threadData.createdBy.name; },
                authorName() { return this.threadData.createdBy.name; },
                avatarUrl() { return this.threadData.createdBy.avatarUrl; },
                authorLink() { return mw.util.getUrl(new mw.Title(this.authorName || "", 2).getPrefixedText()); },
                
                attachments() { return this.threadData._embedded?.attachments?.[0] || {}; },
                hasPolls() { return this.attachments.polls?.length > 0; },
                hasImages() { return this.attachments.contentImages?.length > 0; },
                firstImage() { return this.attachments.contentImages?.[0]?.url; }
            }
        };

        // Главный компонент (Root)
        const AppRootComponent = {
            name: "RelatedDiscussionsApp",
            template: `
                <div class="related-discussions__content">
                    <header class="related-discussions__header">
                        <div class="related-discussions__header-icon-container">
                            <svg class="related-discussions__header-icon wds-icon wds-icon-small">
                                <use xlink:href="#wds-icons-tag-small" />
                            </svg>
                        </div>
                        <h2 class="related-discussions__header-text">{{ strings.headerText }}</h2>
                        <a class="wds-button wds-is-text wds-is-square related-discussions__header-link" :title="strings.headerLink" :href="tagLink" target="_blank">
                            <svg class="related-discussions__header-icon wds-icon wds-icon-small">
                                <use xlink:href="#wds-icons-external-small" />
                            </svg>
                        </a>
                    </header>
                    <ul class="related-discussions__list" v-if="threads.length > 0">
                        <thread-item v-for="thread in visibleThreads" :key="thread.id" :threadData="thread" />
                    </ul>
                    <div class="related-discussions__view-more" v-if="threads.length > 3">
                        <span class="related-discussions__view-more-link-container">
                            <a class="wds-button wds-is-secondary related-discussions__view-more-link" :href="tagLink" target="_blank">
                                {{ strings.viewMoreLink }}
                            </a>
                        </span>
                    </div>
                </div>
            `,
            data() {
                return {
                    threads: threads,
                    tagLink: `${mw.config.get("wgScriptPath")}/f/t/${encodeURIComponent(pageTitle)}`,
                    strings: {
                        headerText: "Связанные обсуждения",
                        headerLink: `Все обсуждения по тегу ${pageTitle}`,
                        viewMoreLink: "Показать больше"
                    }
                };
            },
            computed: {
                visibleThreads() { return this.threads.slice(0, 3); }
            }
        };

        // Инициализация Vue приложения
        const app = Vue.createMwApp(AppRootComponent);
        app.component("thread-item", ThreadItemComponent);
        app.mount(container);
    };

    // Главный запуск
    const init = async () => {
        try {
            // Параллельно загружаем Vue и скачиваем посты
            const [vueData, threadsData] = await Promise.all([
                loadVueDependencies(),
                fetchRelatedThreads()
            ]);
            
            const threads = threadsData?._embedded?.threads || [];
            
            // Запускаем рендер только если есть обсуждения
            if (threads.length > 0) {
                buildWidget(vueData.vue, threads);
            }
        } catch (error) {
            console.error("Ошибка инициализации виджета связанных обсуждений:", error);
        }
    };

    init();
})();