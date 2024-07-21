(function() {
    window.nkch = window.nkch || {};
    nkch.rdp = nkch.rdp || {};
    
    var msg;
    
    const VueLoader = mw.loader.using(["vue", '@wikimedia/codex'])
        .then(function (require) {
            return {
                vue: require("vue"),
                cdx: require("@wikimedia/codex")
            };
        });
    
    const ThreadsLoader = $.get({
        url: mw.util.wikiScript("wikia"),
        data: {
            controller: "DiscussionThread",
            method: "getThreads",
            tag: mw.config.get("wgPageName").replaceAll("_", " "),
            format: "json"
        }
    });
    
    function init() {
        Promise.all([VueLoader, ThreadsLoader])
            .then(function (result) { construct(result[0].vue, result[1]); });
    }
    
    function construct(Vue, data) {
        const el = document.createElement("div");
        el.classList.add("nkch-rdp");
    
        document.querySelector(".license-description").after(el);
    
        var threads = data._embedded.threads;
    
        const c_Root = {
            name: "nkch-rdp-root",
            template:
                "<div class='nkch-rdp__content'>" +
                "<header class='nkch-rdp__header'>" +
                "<div class='nkch-rdp__header-icon-container'>" +
                "<svg class='nkch-rdp__header-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-tag-small' /></svg>" +
                "</div>" +
                "<h2 class='nkch-rdp__header-text'> {{ msg.headerText }} </h2>" +
                "<a class='wds-button wds-is-text wds-is-square nkch-rdp__header-link' :title='msg.headerLink' :href='tagLink' target='_blank'>" +
                "<svg class='nkch-rdp__header-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-external-small' /></svg>" +
                "</a>" +
                "</header>" +
                "<ul class='nkch-rdp__list' v-if='threads.length > 0'>" +
                "<nkch-rdp-item v-for='item in (Math.min(Math.max(threads.length, 0), 3))' :key='item' :data='threads[item - 1]' />" +
                "</ul>" +
                "<div class='nkch-rdp__view-more' v-if='threads.length > 3'>" +
                "<span class='nkch-rdp__view-more-link-container'>" +
                "<a class='wds-button wds-is-secondary nkch-rdp__view-more-link' :href='tagLink' target='_blank'> {{ msg.viewMoreLink }} </a>" +
                "</span>" +
                "</div>" +
                "</div>",
            data: function() {
                return {
                    threads: threads,
                    tagLink: mw.config.get("wgScriptPath") + "/f/t/" + encodeURIComponent(mw.config.get("wgPageName").replaceAll("_", " ")),
                    msg: {
                        headerText: msg("headerText").plain(),
                        headerLink: msg("headerLink", mw.config.get("wgPageName").replaceAll("_", " ")).plain(),
                        viewMoreLink: msg("viewMoreLink").plain(),
                    }
                };
            }
        };
    
        const c_Item = {
            name: "nkch-rdp-item",
            template:
                "<li class='nkch-rdp-item'>" +
                "<a class='nkch-rdp-item__content' :href='postLink'>" +
                "<div class='nkch-rdp-item__avatar-wrapper'>" +
                "<a class='nkch-rdp-item__avatar wds-avatar' :href='data.createdBy.name ? authorLink : null'>" +
                "<img v-if='data.createdBy.avatarUrl' class='nkch-rdp-item__avatar-image wds-avatar__image' :src='data.createdBy.avatarUrl' width='26' />" +
                "<svg v-else class='nkch-rdp-item__avatar-icon wds-icon'><use xlink:href='#wds-icons-avatar' /></svg>" +
                "</a>" +
                "</div>" +
                "<div class='nkch-rdp-item__text'>" +
                "<span class='nkch-rdp-item__title'>{{ data.title }}</span>" +
                "<span class='nkch-rdp-item__author'>" +
                "<a v-if='data.createdBy.name' class='nkch-rdp-item__author-link' :href='authorLink'> {{ data.createdBy.name }} </a>" +
                "<span v-else class='nkch-rdp-item__no-author'> {{ msg.anon }} </span>" +
                "</span>" +
                "</div>" +
                "<div class='nkch-rdp-item__extra'>" +
                "<div v-if='data._embedded.attachments[0].polls.length > 0' class='nkch-rdp-item__extra-content nkch-rdp-item__extra-content-poll'>" +
                "<svg class='nkch-rdp-item__extra-content-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-poll-small'></use></svg>" +
                "</div>" +
                "<div v-else-if='data._embedded.attachments[0].contentImages.length > 0' class='nkch-rdp-item__extra-content nkch-rdp-item__extra-content-attachment'" +
                ":style='{ backgroundImage: `url(${data._embedded.attachments[0].contentImages[0].url})` }'" +
                "></div>" +
                "</div>" +
                "</a>" +
                "</li>",
            props: {
                data: Object
            },
            data: function() {
                return {
                    postLink: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/f/p/" + this.data.id,
                    authorLink: mw.util.getUrl(new mw.Title(this.data.createdBy.name, 2).getPrefixedText()),
                    msg: {
                        anon: mw.message("fd-notifications-anon-user").parse()
                    }
                };
            }
        };
    
        const app = Vue.createMwApp(c_Root);
        app.component("nkch-rdp-item", c_Item);
        app.mount(".nkch-rdp");
    }
    
    if (!nkch.rdp.isActive && mw.config.get("wgNamespaceNumber") === 0) {
        nkch.rdp.isActive = true;
        mw.hook("dev.i18n").add(function (i18n) {
            i18n
                .loadMessages("RelatedDiscussionsPosts")
                .done(function (messages) {
                    msg = messages.msg;
                    init();
                });
        });
    
        importArticles({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        }, {
            type: "style",
            article: "u:dev:MediaWiki:RelatedDiscussionsPosts.css"
        });
    }
})();