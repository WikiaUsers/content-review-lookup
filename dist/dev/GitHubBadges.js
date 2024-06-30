(function () {
  "use strict";

  // Double run protection originally by andrewds1021
  if (window.dev && window.dev.ghBadges && window.dev.ghBadges.hasRan) { console.log("GitHubBadges already ran!"); return; }
  if (!window.dev) {
    window.dev = {
      ghBadges: {}
    };
  } else if (!window.dev.ghBadges) {
    window.headquarter8302.ghBadges = {};
  }
  window.headquarter8302.ghBadges.hasRan = true;

  var badges = document.querySelectorAll("div.gh-badge");

  mw.hook('wikipage.content').add((function () {
    for (var i = 0; i < badges.length; i++) {
      var ghBadge = document.createElement("img");

      ghBadge.src = 'https://github.com/' + badges[i].dataset.ghRepository + '/actions/workflows/' + badges[i].dataset.ghWorkflow + '/badge.svg';

      if (
        badges[i].dataset.ghBranch &&
        badges[i].dataset.ghEvent
      ) {
        ghBadge.src = ghBadge.src.concat(
          "?branch=" + badges[i].dataset.ghBranch +
          "&event=" + badges[i].dataset.ghEvent
        );
      }
      else {
        if (badges[i].dataset.ghBranch) { ghBadge.src = ghBadge.src.concat("?branch=" + badges[i].dataset.ghBranch); }
        if (badges[i].dataset.ghEvent) { ghBadge.src = ghBadge.src.concat("?event=" + badges[i].dataset.ghEvent); }
      }

      badges[i].append(ghBadge);
    }
  })());
})();