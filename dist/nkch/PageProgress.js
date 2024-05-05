const VueLoader = mw.loader.using(["vue"])
    .then(function (require) {
        return {
            vue: require("vue")
        };
    });

function init() {
    Promise.all([VueLoader])
        .then(function (result) { construct(result[0].vue); });
};

function construct(Vue) {
    var content = document.querySelector(".page-content");
    var stickyRail = document.querySelector(".sticky-modules-wrapper");

    const progress = document.createElement("div");
    progress.classList.add("nkch-page-progress", "rail-module");

    stickyRail.prepend(progress);

    const c_Root = {
        name: "nkch-page-progress-root",
        template:
            "<div class='nkch-page-progress__bar'>" +
            "<div class='nkch-page-progress__value' :style='{ width: this.value }' />" +
            "</div>" +
            "<div class='nkch-page-progress__reading-time'>" +
            "<svg class='nkch-page-progress__reading-time-icon wds-icon wds-icon-small'><use xlink:href='#wds-icons-clock-small' /></svg>" +
            "<span class='nkch-page-progress__reading-time-value'>" +
            "{{time}} мин. — среднее время прочтения" +
            "</span>" +
            "</div>",
        data: function () {
            return {
                value: CSS.percent(0),
                time: Math.ceil(content.innerText.trim().split(/\s+/).length / 200)
            };
        },
        methods: {
            getProgressValue: function () {
                var rect = content.getBoundingClientRect();
                this.value = CSS.percent(rect.top < 0 ? ((0 - rect.top) / content.offsetHeight).toFixed(2) * 100 : 0);
            }
        },
        mounted: function () {
            console.log("testtesttest");
            document.addEventListener("scroll", this.getProgressValue);
            this.getProgressValue();
        }
    };

    const app = Vue.createMwApp(c_Root);
    app.mount(".nkch-page-progress");
}

if (mw.config.get("wgNamespaceNumber") === 0 && !mw.config.get("wgIsMainPage")) {
    if (document.querySelector(".sticky-modules-wrapper")) {
        init();
    } else {
        const observer = new MutationObserver(function (mutationList) {
            mutationList.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.classList.contains("sticky-modules-wrapper")) {
                        init();
                        observer.disconnect();
                        return;
                    }
                });
            });
        });

        observer.observe(document.querySelector(".right-rail-wrapper"), {
            childList: true,
            subtree: true
        });
    }

    importArticles({
        type: "style",
        article: "u:nkch:MediaWiki:PageProgress.css"
    });
}