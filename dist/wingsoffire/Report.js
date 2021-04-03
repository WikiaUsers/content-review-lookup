(function() {
    "use strict";
    // wg keys
    const conf = mw.config.get([
        "wgNamespaceNumber",
        "wgUserName",
    ]);
    // Don't run
    if (
        window.reportLoaded ||
        !conf.wgUserName ||
        ![500, 1200, 1201].includes(conf.wgNamespaceNumber)
    ) return;
    window.reportLoaded = true;
    // Imports
    importArticles({
        type: "script",
        articles: ["u:dev:Modal.js"],
    }, {
        type: "style",
        articles: ["MediaWiki:Report.css"],
    });
    // Shortcuts
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const create = function(tag, props) {
        return Object.assign(document.createElement(tag), props);
    };
    // ProtoReport abstract class
    // "this" ALWAYS refers to parent object
    const ProtoReport = {
        REPORTS_PAGE: "Project:Reports",
        REPORT_MODAL_LOCATION: "Project:Report modal",
        NOTIF: {
            DUPLICATE:
                "This message has already been reported.",
            ERROR:
                "An error occurred and your report was not " +
                "submitted. Refresh the page and try again. If this " +
                "persists, please report this error to the mod " +
                "team. Error code: ",
            SUCCESS:
                "Your report was successfully submitted!",
        },
        reportModalContent:
            "An error has occurred. Please reload the page and try" +
            "again.",
        init: function(modal) {
            this.api = new mw.Api();
            this.report = {
                sig: "~~\~~",
            };
            this.getReportModalContent();
            this.addReportLinks();
        },
        getReportModalContent: function() {
            this.api.get({
                action: "parse",
                page: this.REPORT_MODAL_LOCATION,
                prop: "wikitext",
            }).done(function(data) {
                this.reportModalContent = data.parse.wikitext["*"];
            }.bind(this));
        },
        addReportLinks: function() {},
        createReportLink: function() {
            return create("A", {
                textContent: "Report",
                className: "report",
                onclick: this.getMsgInfo.bind(this),
            });
        },
        getMsgInfo: function() {},
        checkForDuplicateReport: function() {
            this.api.get({
                action: "parse",
                page: this.REPORTS_PAGE,
                prop: "sections",
            }).done(function(data) {
                data = data.parse.sections;
                const alreadyReported = data.some(function(section) {
                    return section.line === this.report.title;
                }, this);
                if (alreadyReported)
                    this.displayReportPostResult({ duplicate: true });
                else
                    this.openReportModal();
            }.bind(this));
        },
        openReportModal: function() {
            if (!this.reportModal)
                return (
                    mw.hook("dev.modal").add(this.createReportModal.bind(this))
                );
            this.reportModal.show();
            $("#reportModal .wds-button").onclick = (
                this.generateReport.bind(this)
            );
        },
        createReportModal: function(modal) {
            this.reportModal = new modal.Modal({
                id: "reportModal",
                size: "medium",
                title: "Report message",
                content: this.reportModalContent,
            });
            this.reportModal.create();
            this.reportModal._loading.then(this.openReportModal.bind(this));
        },
        generateReport: function() {
            const reasonsForm = $$("#reportModal input:checked");
            const infoTextarea = $("#reportModal textarea");
            var reason = Array.from(reasonsForm, function(el) {
                return el.id;
            }).join(", ") || "(none given)";
            var info = (
                infoTextarea.value.trim().replace(/</g, "&lt;") ||
                "(none given)"
            );
            var msgBy = this.report.msgBy;
            var sig   = this.report.sig;
            info = "<nowiki>" + info + "</nowiki>";
            msgBy = "{{UserInfo|" + msgBy + "}}";
            this.report.text = (
                "* Message by: " + msgBy  + "\n" +
                "* Reason(s): "  + reason + "\n" +
                "* Info: "       + info   + "\n" +
                "* Signature: "  + sig    + "\n"
            );
            this.postReport();
        },
        postReport: function() {
            this.api.post({
                action: "edit",
                title: this.REPORTS_PAGE,
                section: "new",
                sectiontitle: "[\[" + this.report.title + "]]",
                text: this.report.text,
                summary: "Submitting a report",
                notminor: true,
                watchlist: "nochange",
                nocreate: true,
                token: mw.user.tokens.get("editToken"),
            }).done(this.displayReportPostResult.bind(this));
        },
        displayReportPostResult: function(data) {
            this.reportModal && this.reportModal.close();
            if (data.duplicate)
                new BannerNotification(this.NOTIF.DUPLICATE, "notify").show();
            else if (data.error)
                new BannerNotification(
                    this.NOTIF.ERROR + data.error.code,
                    "error"
                ).show();
            else
                new BannerNotification(this.NOTIF.SUCCESS, "confirm").show();
        },
    };
    // BlogReport class
    const BlogReport = {
        addReportLinks: function() {
            mw.hook("wikipage.content")
                .add(this.actuallyAddReportLinks.bind(this));
        },
        actuallyAddReportLinks: function() {
            const comments = $$("#WikiaArticleComments .speech-bubble-message");
            const commentsPageSwitch = $$(".article-comments-pagination-link");
            comments.forEach(function(el) {
                el.append(this.createReportLink());
            }, this);
            commentsPageSwitch.forEach(function(el) {
                el.addEventListener(
                    "click",
                    this.addReportLinksAgain.bind(this)
                );
            }, this);
        },
        addReportLinksAgain: function() {
            const interval = setInterval(function() {
                if (ArticleComments.$commentsList.hasClass("loading"))
                    return;
                clearInterval(interval);
                this.addReportLinks();
            }.bind(this), 100);
        },
        getMsgInfo: function(e) {
            const msg = e.currentTarget.closest("li.comment");
            this.report.title = decodeURIComponent(
                msg.querySelector(".permalink").href
                    .replace("https://wingsoffire.fandom.com/wiki/", "")
                    .split("?")[0]
            ).replace(/_/g, " ");
            this.report.msgBy = msg.getAttribute("data-user");
            this.checkForDuplicateReport();
        },
    };
    // ThreadReport class
    const ThreadReport = {
        createThreadReportLink: function() {
            const li = create("LI");
            li.append(this.createReportLink());
            return li;
        },
        addReportLinks: function() {
            $$("#Wall .WikiaMenuElement").forEach(function(el) {
                el.append(this.createThreadReportLink());
            }, this);
        },
        getMsgInfo: function(e) {
            const msg = e.currentTarget.closest(".SpeechBubble.message");
            this.report.title = (
                msg.querySelector(".timestamp > a:last-child").href
                    .match(/Thread:\d+#?\d*$/)[0]
            );
            this.report.msgBy = (
                msg.querySelector(".edited-by").textContent.trim()
            );
            this.checkForDuplicateReport();
        },
    };
    // Initialize
    const Report = Object.assign({}, ProtoReport, {
        500: BlogReport,
        1200: ThreadReport,
        1201: ThreadReport,
    }[conf.wgNamespaceNumber]);
    mw.loader.using("mediawiki.api", Report.init.bind(Report));
})();