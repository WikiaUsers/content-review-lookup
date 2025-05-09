/* Any JavaScript here will be loaded for all users on every page load. */

TBL_GROUP = "roblox-en";

window.SeeMoreActivityButtonRC = true;

// For [[Module:CSS]]; [[T:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
    });
});

// This function gets the badge ID and the awarded count, then updates all elements with class "id{badgeId}"
window.__updateBadgeCount = function(id, count) {
  document.querySelectorAll('.id' + id).forEach(el => {
    el.textContent = count.toLocaleString(); // Format number with commas (e.g., 12,345)
  });
};

// Find all elements with a class that contains "id" followed by digits (e.g., id2124475816)
document.querySelectorAll('[class*="id"]').forEach(el => {
  const match = el.className.match(/id(\d{5,})/); // extract the badge ID from the class name
  if (!match) return; // skip if no match found

  const badgeId = match[1]; // extracted badge ID
  const script = document.createElement('script');
  script.src = 'https://occulticnine.vercel.app/badges?id=' + badgeId;

  document.head.appendChild(script); // Append badge count to class
});