(() => {
    // Проверка на двойное выполнение и пространство имен (только для статей)
    if (window.isRelatedDiscussionsLoaded || mw.config.get("wgNamespaceNumber") !== 0) return;
    window.isRelatedDiscussionsLoaded = true;

    const pageTitle = mw.config.get("wgPageName").replace(/_/g, " ");

    const loadVueDependencies = () => {
        return mw.loader.using(["vue", "@wikimedia/codex"]).then((require) => {
            return {
                vue: require("vue"),
                cdx: require("@wikimedia/codex")
            };
        });
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
                                <svg v-else class="related-discussions-item__avatar-icon wds-icon" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12 11c-.965 0-1.75-.785-1.75-1.75S11.035 7.5 12 7.5s1.75.785 1.75 1.75S12.965 11 12 11m0-5.5a3.754 3.754 0 00-3.75 3.75A3.754 3.754 0 0012 13a3.754 3.754 0 003.75-3.75A3.754 3.754 0 0012 5.5m7.679 12.914c-1.987-2.104-4.727-3.289-7.679-3.289-2.953 0-5.692 1.185-7.679 3.289A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10a9.956 9.956 0 01-2.321 6.414M12 22a9.995 9.995 0 01-6.25-2.187c1.613-1.719 3.844-2.688 6.25-2.688s4.637.969 6.249 2.688A9.993 9.993 0 0112 22m0-22C5.383 0 0 5.383 0 12c0 3.268 1.294 6.33 3.651 8.63l.012.013A12 12 0 0012 24h.036a12.008 12.008 0 008.306-3.363C22.701 18.341 24 15.273 24 12c0-6.617-5.383-12-12-12"/>
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
                                <svg class="related-discussions-item__extra-content-icon wds-icon wds-icon-small" viewBox="0 0 18 18">
                                    <path fill-rule="evenodd" d="M3 15h2V6H3zm4 0h2V9H7zm4 0h2V3h-2zm4 0h2v-2h-2z"/>
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
                    anonText: "Аноним"
                };
            },
            computed: {
                hasAuthor() { return !!this.threadData.createdBy.name; },
                authorName() { return this.threadData.createdBy.name; },
                avatarUrl() { return this.threadData.createdBy.avatarUrl; },
                authorLink() { return mw.util.getUrl(new mw.Title(this.authorName || "", 2).getPrefixedText()); },
                
                attachments() { 
                    return (this.threadData._embedded && 
                            this.threadData._embedded.attachments && 
                            this.threadData._embedded.attachments[0]) || {}; 
                },
                hasPolls() { 
                    return this.attachments.polls && this.attachments.polls.length > 0; 
                },
                hasImages() { 
                    return this.attachments.contentImages && this.attachments.contentImages.length > 0; 
                },
                firstImage() { 
                    return (this.attachments.contentImages && this.attachments.contentImages[0]) 
                        ? this.attachments.contentImages[0].url 
                        : undefined; 
                }
            }
        };

        // Главный компонент (Root)
        const AppRootComponent = {
            name: "RelatedDiscussionsApp",
            template: `
                <div class="related-discussions__content">
                    <header class="related-discussions__header">
                        <div class="related-discussions__header-icon-container">
                            <svg class="related-discussions__header-icon wds-icon wds-icon-small" viewBox="0 0 18 18">
                                <path fill-rule="evenodd" d="M16 7.586l-8 8L2.414 10l8-8H16v5.586zM17 0h-7a1 1 0 0 0-.707.293l-9 9a.999.999 0 0 0 0 1.414l7 7a.997.997 0 0 0 1.414 0l9-9A.996.996 0 0 0 18 8V1a1 1 0 0 0-1-1zm-4.5 7c.83 0 1.5-.67 1.5-1.5S13.33 4 12.5 4 11 4.67 11 5.5 11.67 7 12.5 7"/>
                            </svg>
                        </div>
                        <h2 class="related-discussions__header-text">{{ strings.headerText }}</h2>
                        <a class="wds-button wds-is-text wds-is-square related-discussions__header-link" :title="strings.headerLink" :href="tagLink" target="_blank">
                            <svg class="related-discussions__header-icon wds-icon wds-icon-small" viewBox="0 0 18 18">
                                <path fill-rule="evenodd" d="M16.925 1.619a.988.988 0 01.075.378V7a1 1 0 11-2 0V4.414l-6.293 6.293a.997.997 0 01-1.414 0 1 1 0 010-1.414L13.586 3H11a1 1 0 110-2h5.003a.988.988 0 01.704.293.998.998 0 01.218.326zM13 9.999a1 1 0 011 1v5a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1h5a1 1 0 110 2H3v9h9v-4a1 1 0 011-1z"/>
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

    const init = () => {
        Promise.all([
            loadVueDependencies(),
            fetchRelatedThreads()
        ])
        .then(([vueData, threadsData]) => {
            const threads = (threadsData && threadsData._embedded && threadsData._embedded.threads) || [];
            
            // Запускаем рендер только если есть обсуждения
            if (threads.length > 0) {
                buildWidget(vueData.vue, threads);
            }
        })
        .catch((error) => {
            console.error("Ошибка инициализации виджета связанных обсуждений:", error);
        });
    };

    // Безопасный запуск с проверкой состояния DOM
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();