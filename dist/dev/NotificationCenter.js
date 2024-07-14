(function NotificationCenter(window, $, mw) {
  "use strict";

  window.notificationCenter = window.notificationCenter || {};
  if (window.notificationCenter.loaded) return;
  window.notificationCenter.loaded = true;

  if (isTargetPage()) {
    main();
  }

  function isTargetPage() {
    return (
      mw.config.get("wgCanonicalNamespace") === "Special" &&
      mw.config.get("wgTitle") === "NotificationCenter"
    );
  }

  function main() {
    fixPageHeader();
    fetchNotifications().then(displayNotifications);
  }

  function fixPageHeader() {
    const header = document.getElementById("firstHeading");
    header.textContent = "Notification Center";
  }

  function fetchNotifications() {
    return $.getJSON({
      url: notificationsUrl(),
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  function notificationsUrl() {
    const urlContentTypes = [
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
    ];
    const baseUrl =
      "https://services.fandom.com/notification-facade/notifications";
    const urlParams = new URLSearchParams(
      urlContentTypes.map(function (type) {
        return ["contentType", type];
      })
    );
    const url = baseUrl + "?" + urlParams.toString();

    return url;
  }

  function displayNotifications(data) {
    const container = document.getElementById("content");
    $(container)
      .children()
      .replaceWith(
        $("<table>")
          .addClass("wikitable")
          .css("width", "100%")
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

  function tableBody(notifications) {
    return $("<tbody>").append(
      notifications.map(function (item) {
        const info = extractInfo(item);

        return $("<tr>")
          .css(!info.read ? { fontWeight: "bold" } : {})
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
              $("<a>")
                .attr("href", info.userUrl)
                .attr("target", "_blank")
                .text(info.userName)
            ),
            $("<td>").append(
              $("<a>")
                .attr("href", info.communityUrl)
                .attr("target", "_blank")
                .text(info.communityName)
            ),
            $("<td>").text(info.read ? "Yes" : "No")
          );
      })
    );
  }

  function extractInfo(item) {
    const refersTo = item.refersTo || {};
    const events = item.events || {};
    const latestEvent = events.latestEvent || {};
    const causedBy = latestEvent.causedBy || {};

    const snippet = latestEvent.snippet || refersTo.snippet;
    const targetUrl = latestEvent.uri || refersTo.uri;
    const type = niceNotificationType(item.type);
    const communityName = item.community.name;
    const communityUrl = new URL(targetUrl).origin;
    const userName = causedBy.name || refersTo.createByName;
    const userId = causedBy.id || refersTo.createBy;
    const userUrl = communityUrl + "/wiki/User:" + userName;
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
      read: read,
    };
  }

  function niceNotificationType(type) {
    return {
      "announcement-notification": "Announcement",
      "post-at-mention-notification": "@Mention",
      "replies-notification": "Reply",
      "upvote-notification": "Upvote",
      "message-wall-post-notification": "New Message",
      "message-wall-reply-notification": "New Reply on Message Wall",
    }[type] || type;
  }
})(this, jQuery, mediaWiki);