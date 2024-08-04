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
                "thanks-created",
            ],

            Discussions: [
                "discussion-upvote",
                "discussion-post",
                "discussion-report",
                "post-at-mention",
                "thread-at-mention",
            ],

            "Article Comments": [
                "article-comment-reply",
                "article-comment-at-mention",
                "article-comment-reply-at-mention",
            ],

            "Message Wall and Talk Page": [
                "message-wall-thread",
                "message-wall-post",
                "talk-page-message",
            ],

            Upvotes: [
                "discussion-upvote"
            ],

            "@At Mentions": [
                "post-at-mention",
                "thread-at-mention",
                "article-comment-at-mention",
                "article-comment-reply-at-mention",
            ],

            Announcements: [
                "announcement-target",
            ],

            Thanks: [
                "thanks-created",
            ],

            Reports: [
                "discussion-report",
            ],

            Marketing: [
                "marketing-notification",
            ]
        }
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
            "#notification-center .notification-center-table td { overflow: hidden; text-overflow: ellipsis; }" +
            "#notification-center .notification-center-table .notification-center-user-badge { display: flex; gap: 0.5em; align-items: center }"
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
                withCredentials: true,
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
                    $("<button>")
                        .text("refresh")
                        .on("click", function() { fetchNotifications().then(render) }),
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
                .addClass("notification-center-table fandom-table")
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
                                .append(
                                    info.snippet
                                        ? info.title && info.title !== info.snippet
                                            ? [
                                                $("<u>").text(info.title),
                                                $("<br>"),
                                                $("<span>").text(info.snippet)
                                            ]
                                        : info.snippet
                                    : info.targetUrl
                                )
                        ),
                        $("<td>").text(info.type),
                        $("<td>").append(
                            info.users.map(function (userInfo) {
                                return userBadge(userInfo, info.communityUrl)
                            })
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
        // the provided "next" URL does not contain the selected content types, breaking the correct pagination
        // here we combine the provided page number and timestamp with the selected content types
        return notificationsUrl() + "&" + url.split("?")[1];
    }

    function userBadge(userInfo, communityUrl) {

        const userUrl = communityUrl + "/wiki/User:" + userInfo.name;

        return $("<div>")
            .addClass('notification-center-user-badge')
            .append(
                $("<div>")
                    .addClass("wds-avatar")
                    .append(
                        $("<img>")
                            .addClass("wds-avatar__image")
                            .attr("src", userInfo.avatarUrl + "/thumbnail/width/26/height/26")
                            .attr("alt", userInfo.name)
                    ),
                $("<a>")
                    .attr("href", userUrl)
                    .attr("target", "_blank")
                    .attr("title", userInfo.name)
                    .text(userInfo.name)
            )

    }

    function extractNotificationInfo(item) {
        const refersTo = item.refersTo || {};
        const events = item.events || {};
        const latestActors = events.latestActors || {};
        const latestEvent = events.latestEvent || {};
        const causedBy = latestEvent.causedBy || {};

        const targetUrl = latestEvent.uri || refersTo.uri;
        const title = refersTo.title;
        const snippet =
            item.type === "message-wall-post-notification"
                ? latestEvent.snippet
                : item.type === "message-wall-reply-notification"
                    // on message wall replies use the thread title which is more relevant than the provided snippet of the original first message
                    ? refersTo.title
                    : latestEvent.snippet
                        || refersTo.snippet
                        || refersTo.title
                        || targetUrl;
        const communityName =
            item.type === "marketing-notification"
                ? ""
                : item.community.name;
        const communityUrl = targetUrl.replace(/\/(f|wiki|index.php).*$/, "");
        const eventsCount = events.total || 1;
        const usersCount = events.totalUniqueActors || 1;
        const users = latestActors;
        const type = niceNotificationType(item.type, eventsCount, usersCount);
        const read = item.read;

        return {
            title: title,
            snippet: snippet,
            targetUrl: targetUrl,
            type: type,
            communityName: communityName,
            communityUrl: communityUrl,
            eventsCount: eventsCount,
            usersCount: usersCount,
            users: users,
            read: read,
        };
    }

    function niceNotificationType(type, eventsCount, usersCount) {
        const mapping = {
            "announcement-notification": "announcement",
            "post-at-mention-notification": "@mention on a post",
            "replies-notification": "reply to a post",
            "upvote-notification": "upvote",
            "article-comment-at-mention-notification": "@mention on an article comment",
            "article-comment-reply-notification": "article comment reply",
            "message-wall-post-notification": "new message on wall",
            "message-wall-reply-notification": "reply on message wall",
            "thanks-created-notification": "thanks for your edit",
            "marketing-notification": "fandom marketing",
        }

        const mappingMultiple = {
            "post-at-mention-notification": "%1 @mentions on a post",
            "replies-notification": "%1 replies to a post",
            "upvote-notification": "%1 upvotes",
            "article-comment-at-mention-notification": "%1 @mentions on an article comment",
            "article-comment-reply-notification": "%1 replies to an article comment",
            "message-wall-post-notification": "%1 new messages on wall",
            "message-wall-reply-notification": "%1 replies on message wall",
            "thanks-created-notification": "%1 thanks for your edits",
        }

        if (eventsCount > 1 && type in mappingMultiple) {
            return mappingMultiple[type].replace("%1", eventsCount) + " by " +
                (usersCount > 1
                    ? "" + usersCount + " users"
                    : "1 user"
                )
        }
        return mapping[type] || type;
    }
})(this, jQuery, mediaWiki);