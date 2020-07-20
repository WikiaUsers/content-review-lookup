/**
 * Customization for user pages.
 *
 * Applying custom staff badges from [[Kancolle Wiki:Staff/Badges]].
 * - Protected page, only editable by Administrators and Content Moderators.
 * - Badges must match /^[a-zA-Z ]+$/ (no injections).
 * - Using a GET request.
 *
 * Adding sandbox tab if user's /Sandbox page exists.
 * - Using a HEAD request.
 */

(function() {
  "use strict";

  console.log("UserPage v1.0.0");

  // Prevent second loading and only execute on user pages.

  if (window.KCUserPageLoaded) {
    return;
  }

  window.KCUserPageLoaded = true;

  var $header = $("#WikiaUserPagesHeader");
  var userName = $header.find("#UserProfileMasthead h1").text();

  if (!$header.exists()) {
    return;
  }

  // Badges.

  var customAnchors = {
    "Emeritus Admin": "Administrators",
    Strategy: "Strategy",
    "Central Command": "Central Command"
  };

  function customBadge(role, anchor, i) {
    return $("<span>", { style: i === 0 ? undefined : "margin-left:10px", class: "tag" }).append(
      $("<a>", {
        style: "color:white",
        href: "/wiki/Kancolle_Wiki:Staff#" + (anchor || role).replace(/ /g, "_") + (anchor ? "" : "s"),
        text: role
      })
    );
  }

  $.get("//kancolle.fandom.com/wiki/Kancolle_Wiki:Staff/Badges?action=raw", function(csv) {
    var users = csv
      .trim()
      .split("\n")
      .filter(function(e) {
        return e.trim();
      })
      .map(function(line) {
        var parts = line.split(",").map(function(s) {
          return s.trim();
        });
        return {
          name: parts[0],
          badges: parts.slice(1).filter(function(s) {
            return /^[a-zA-Z ]+$/.test(s);
          })
        };
      });
    for (var i = 0; i < users.length; ++i) {
      var user = users[i];
      if (user.name === userName) {
        for (var j = 0; j < user.badges.length; ++j) {
          var badge = user.badges[j];
          $(customBadge(badge, customAnchors[badge], j)).appendTo(".masthead-info hgroup");
        }
        break;
      }
    }
  });

  // Sandbox tab.

  $.ajax({
    type: "HEAD",
    url: "//kancolle.wikia.com/wiki/User:" + userName + "/Sandbox",
    success: function() {
      $header.find(".tabs-container .tabs").append(
        $("<li>").append(
          $("<a>", {
            href: "/wiki/User:" + userName + "/Sandbox",
            title: "User:" + userName + "/Sandbox",
            text: "Sandbox"
          })
        )
      );
    }
  });
})();