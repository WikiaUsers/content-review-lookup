(function NotificationCenter(window, $, mw) {
    "use strict";

    window.notificationCenter = window.notificationCenter || {};
    if (window.notificationCenter.loaded) return;
    window.notificationCenter.loaded = true;


    const apiFilters = getApiFilters();
    var data = {};
    var selectedApiFilterName = "All";
    var apiUrl = notificationsUrl(apiFilters[selectedApiFilterName]);

    if (isTargetPage()) {
        mw.loader.using(['mediawiki.util'], main);
    }

    function main() {
        addCSS();
        emulateRealPage();
        fetchNotifications().then(render);
    }

    function getApiFilters() {

        // filter names are intentionally presentional until we incorporate i18n
        return {
            All: [
                "discussion-upvote",
                "discussion-post",
                "discussion-report",
                "announcement-target",
                "post-at-mention",
                "thread-at-mention",
                "message-wall-thread",
                "message-wall-post",
                "article-comment-reply",
                "article-comment-at-mention",
                "article-comment-reply-at-mention",
                "talk-page-message",
                "marketing-notification",
                "thanks-created"
            ],

            Discussions: [
                "discussion-upvote",
                "discussion-post",
                "discussion-report",
                "post-at-mention",
                "thread-at-mention"
            ],

            "Article Comments": [
                "article-comment-reply",
                "article-comment-at-mention",
                "article-comment-reply-at-mention"
            ],

            "Message Wall and Talk Page": [
                "message-wall-thread",
                "message-wall-post",
                "talk-page-message"
            ],

            Upvotes: [
                "discussion-upvote"
            ],

            "@At Mentions": [
                "post-at-mention",
                "thread-at-mention",
                "article-comment-at-mention",
                "article-comment-reply-at-mention"
            ],

            Announcements: [
                "announcement-target"
            ],

            Thanks: [
                "thanks-created"
            ],

            Reports: [
                "discussion-report"
            ],

            Marketing: [
                "marketing-notification"
            ]
        };
    }

    function isTargetPage() {
        return (
            mw.config.get("wgCanonicalNamespace") === "Special" &&
            mw.config.get("wgTitle") === "NotificationCenter"
        );
    }

    function addCSS() {
        mw.util.addCSS(
            "#notification-center { width: 100%; display: flex; flex-direction: column; gap: 2em; }" +
            "#notification-center .notification-center-controls { display: flex; width: 100%; justify-content: space-between; }" +
            "#notification-center .notification-center-table { width: 100%; }" +
            "#notification-center .notification-center-table tr.unread { font-weight: bold; }" +
            "#notification-center .notification-center-table td > * { display: inline-block; max-width: 20em; text-wrap: nowrap; overflow: hidden; text-overflow: ellipsis; }"
        );
    }

    function emulateRealPage() {
        const title = "Notification Center";

        const headerElement = document.getElementById("firstHeading");
        if (headerElement) headerElement.textContent = title;

        const titleElement = document.querySelector("title");
        if (titleElement)
            titleElement.textContent = titleElement.textContent.replace(
                /.*?(?= \|)|^[^\|]*$/,
                title
            );
    }

    function fetchNotifications() {
        return $.getJSON({
            url: apiUrl,
            xhrFields: {
                withCredentials: true
            },
        })
            .then(function (response) {
                data = response;
            });
    }

    function notificationsUrl() {
        const baseUrl = "https://services.fandom.com/notification-facade/notifications";
        const urlParams = new URLSearchParams(
            apiFilters[selectedApiFilterName].map(function (type) {
                return ["contentType", type];
            })
        );
        const url = baseUrl + "?" + urlParams.toString();
        return url;
    }

    function render() {
        $("#content").children().replaceWith(widget());
    }

    function widget() {
        return (
            $("<div>")
                .attr("id", "notification-center")
                .append(
                    controls(),
                    table()
                )
        );
    }

    function controls() {
        const _links = data._links || {};
        const urlNext = _links.next;
        const pageNumber = Number(new URLSearchParams(apiUrl).get("page")) || 1;

        return (
            $("<div>")
                .addClass("notification-center-controls")
                .append(
                    $("<select>")
                        .append(
                            Object.keys(apiFilters).map(function (filterName) {
                                return $("<option>")
                                    .attr("value", filterName)
                                    .attr("selected", selectedApiFilterName === filterName)
                                    .text(filterName);
                            })
                        )
                        .on("change", function (e) {
                            selectedApiFilterName = e.target.value;
                            apiUrl = notificationsUrl();
                            fetchNotifications().then(render);
                        }),
                    $("<span>")
                        .text("Page " + pageNumber),
                    $("<button>")
                        .text("Next =>")
                        .attr("disabled", !urlNext)
                        .on("click", function () {
                            apiUrl = buildNextUrl(urlNext);
                            fetchNotifications().then(render);
                        })
                )
        );
    }

    function table() {
        return (
            $("<table>")
                .addClass("notification-center-table", "fandom-table")
                .append(tableHead(), tableBody(data.notifications))
        );
    }

    function tableHead() {
        return $("<thead>").append(
            $("<tr>").append(
                ["Snippet", "Type", "User", "Wiki", "Read"].map(function (text) {
                    return $("<th>").text(text);
                })
            )
        );
    }

    function tableBody() {

        const notifications = data.notifications || [];

        return $("<tbody>").append(
            notifications.map(function (item) {
                const info = extractNotificationInfo(item);

                return $("<tr>")
                    .addClass(!info.read ? "unread" : "")
                    .append(
                        $("<td>").append(
                            $("<a>")
                                .attr("href", info.targetUrl)
                                .attr("target", "_blank")
                                .attr("title", info.snippet)
                                .text(info.snippet)
                        ),
                        $("<td>").text(info.type),
                        $("<td>").append(
                            $("<div>")
                                .css({ display: "flex", gap: "0.5em", alignItems: "center" })
                                .append(
                                    $("<div>")
                                        .addClass("wds-avatar")
                                        .append(
                                            $("<img>")
                                                .addClass("wds-avatar__image")
                                                .attr("src", info.userAvatarUrl)
                                                .attr("alt", info.userName)
                                        ),
                                    $("<a>")
                                        .attr("href", info.userUrl)
                                        .attr("target", "_blank")
                                        .attr("title", info.userName)
                                        .text(info.userName)
                                )
                        ),
                        $("<td>").append(
                            $("<a>")
                                .attr("href", info.communityUrl)
                                .attr("target", "_blank")
                                .attr("title", info.communityName)
                                .text(info.communityName)
                        ),
                        $("<td>").text(info.read ? "Yes" : "No")
                    );
            })
        );
    }

    function buildNextUrl(url) {
        // this provided "next" URL does not contain the selected content types, breaking the correct pagination
        // here we combine the provided page number and timestamp with the selected content types
        return notificationsUrl() + "&" + url.split("?")[1];
    }

    function extractNotificationInfo(item) {
        const refersTo = item.refersTo || {};
        const events = item.events || {};
        const latestEvent = events.latestEvent || {};
        const causedBy = latestEvent.causedBy || {};

        const snippet =
            item.type === "message-wall-post-notification"
                ? refersTo.title + " - " + latestEvent.snippet
                : item.type === "message-wall-reply-notification"
                    ? refersTo.title
                    : latestEvent.snippet || refersTo.title || refersTo.snippet;
        const targetUrl = latestEvent.uri || refersTo.uri;
        const type = niceNotificationType(item.type);
        const communityName = item.community.name;
        const communityUrl = new URL(targetUrl).origin;
        const userName = causedBy.name || refersTo.createByName;
        const userId = causedBy.id || refersTo.createBy;
        const userUrl = communityUrl + "/wiki/User:" + userName;
        const userAvatarUrl = causedBy.avatarUrl ? causedBy.avatarUrl + "/thumbnail/width/26/height/26" : "";
        const read = item.read;

        return {
            snippet: snippet,
            targetUrl: targetUrl,
            type: type,
            communityName: communityName,
            communityUrl: communityUrl,
            userName: userName,
            userId: userId,
            userUrl: userUrl,
            userAvatarUrl: userAvatarUrl,
            read: read
        };
    }

    function niceNotificationType(type) {
        return (
            {
                "announcement-notification": "Announcement",
                "post-at-mention-notification": "@Mention",
                "replies-notification": "Reply",
                "upvote-notification": "Upvote",
                "message-wall-post-notification": "New Wall Message",
                "message-wall-reply-notification": "Message Wall Reply",
                "marketing-notification": "Marketing"
            }[type] || type
        );
    }
})(this, jQuery, mediaWiki);