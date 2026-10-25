/* RelatedDiscussions - Виджет связанных обсуждений под статьёй (ES2024) */
(async () => {
    'use strict';

    if (window.isRelatedDiscussionsLoaded || mw.config.get('wgNamespaceNumber') !== 0) return;
    window.isRelatedDiscussionsLoaded = true;

    const init = async () => {
        const targetElement = document.querySelector('.license-description');
        if (!targetElement || document.querySelector('.related-discussions')) return;

        const pageTitle = mw.config.get('wgPageName').replaceAll('_', ' ');

        try {
            const fetchPromise = fetch(
                `${mw.util.wikiScript('wikia')}?controller=DiscussionThread&method=getThreads&tag=${encodeURIComponent(pageTitle)}&format=json`
            ).then(r => (r.ok ? r.json() : {}));
            const vuePromise = mw.loader.using(['mediawiki.util', 'mediawiki.Title', 'vue', '@wikimedia/codex']);

            const [threadData, localRequire] = await Promise.all([fetchPromise, vuePromise]);
            const Vue = localRequire('vue');

            const threads = threadData._embedded?.threads ?? [];
            if (threads.length === 0) return;

            const container = document.createElement('div');
            container.classList.add('related-discussions');
            targetElement.after(container);

            const ThreadItemComponent = {
                name: 'ThreadItem',
                props: { threadData: { type: Object, required: true } },
                template: `
                    <li class="related-discussions-item">
                        <a class="related-discussions-item__content" :href="postLink">
                            <div class="related-discussions-item__avatar-wrapper">
                                <span class="related-discussions-item__avatar wds-avatar"
                                      :role="hasAuthor ? 'link' : null"
                                      @click="openAuthor($event)">
                                    <img v-if="avatarUrl" class="related-discussions-item__avatar-image wds-avatar__image" :src="avatarUrl" width="26" loading="lazy" />
                                    <i v-else class="fa-solid fa-user related-discussions-item__avatar-icon"></i>
                                </span>
                            </div>
                            <div class="related-discussions-item__text">
                                <span class="related-discussions-item__title">{{ threadData.title }}</span>
                                <span class="related-discussions-item__author">
                                    <span v-if="hasAuthor"
                                          class="related-discussions-item__author-link"
                                          role="link"
                                          @click="openAuthor($event)">
                                        {{ authorName }}
                                    </span>
                                    <span v-else class="related-discussions-item__no-author">{{ anonText }}</span>
                                </span>
                            </div>
                            <div class="related-discussions-item__extra">
                                <div v-if="hasPolls" class="related-discussions-item__extra-content related-discussions-item__extra-content-poll">
                                    <i class="fa-solid fa-square-poll-vertical related-discussions-item__extra-content-icon"></i>
                                </div>
                                <div v-else-if="hasImages" class="related-discussions-item__extra-content related-discussions-item__extra-content-attachment" :style="bgStyle">
                                </div>
                            </div>
                        </a>
                    </li>
                `,
                data() {
                    return {
                        postLink: `${mw.config.get('wgServer')}${mw.config.get('wgScriptPath')}/f/p/${this.threadData.id}`,
                        anonText: 'Аноним'
                    };
                },
                computed: {
                    authorName() { return this.threadData.createdBy?.name; },
                    hasAuthor() { return Boolean(this.authorName); },
                    avatarUrl() { return this.threadData.createdBy?.avatarUrl; },
                    authorLink() {
                        return this.hasAuthor
                            ? mw.util.getUrl(new mw.Title(this.authorName, 2).getPrefixedText())
                            : null;
                    },
                    attachments() { return this.threadData._embedded?.attachments?.[0] ?? {}; },
                    hasPolls() { return Boolean(this.attachments.polls?.length); },
                    hasImages() { return Boolean(this.attachments.contentImages?.length); },
                    firstImage() { return this.attachments.contentImages?.[0]?.url; },
                    bgStyle() {
                        if (!this.firstImage) return {};
                        const safeUrl = encodeURI(this.firstImage).replaceAll("'", '%27').replaceAll(')', '%29');
                        return { backgroundImage: `url('${safeUrl}')` };
                    }
                },
                methods: {
                    openAuthor(event) {
                        if (!this.authorLink) return;
                        event.preventDefault();
                        event.stopPropagation();
                        window.location.href = this.authorLink;
                    }
                }
            };

            const AppRootComponent = {
                name: 'RelatedDiscussionsApp',
                template: `
                    <div class="related-discussions__content">
                        <header class="related-discussions__header">
                            <div class="related-discussions__header-icon-container">
                                <i class="fa-solid fa-tags related-discussions__header-icon"></i>
                            </div>
                            <h2 class="related-discussions__header-text">{{ strings.headerText }}</h2>
                            <a class="wds-button wds-is-text wds-is-square related-discussions__header-link" :title="strings.headerLink" :href="tagLink" target="_blank" rel="noopener noreferrer">
                                <i class="fa-solid fa-up-right-from-square related-discussions__header-icon"></i>
                            </a>
                        </header>
                        <ul class="related-discussions__list">
                            <thread-item v-for="thread in visibleThreads" :key="thread.id" :threadData="thread" />
                        </ul>
                        <div class="related-discussions__view-more" v-if="threads.length > 3">
                            <span class="related-discussions__view-more-link-container">
                                <a class="wds-button wds-is-secondary related-discussions__view-more-link" :href="tagLink" target="_blank" rel="noopener noreferrer">
                                    {{ strings.viewMoreLink }}
                                </a>
                            </span>
                        </div>
                    </div>
                `,
                data() {
                    return {
                        threads,
                        tagLink: `${mw.config.get('wgScriptPath')}/f/t/${encodeURIComponent(pageTitle)}`,
                        strings: {
                            headerText: 'Связанные обсуждения',
                            headerLink: `Все обсуждения по тегу ${pageTitle}`,
                            viewMoreLink: 'Показать больше'
                        }
                    };
                },
                computed: {
                    visibleThreads() { return this.threads.slice(0, 3); }
                }
            };

            const app = Vue.createMwApp(AppRootComponent);
            app.component('thread-item', ThreadItemComponent);
            app.mount(container);
        } catch (error) {
            console.error('Ошибка инициализации виджета связанных обсуждений:', error);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();