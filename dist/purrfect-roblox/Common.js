/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.using("mediawiki.util", function () {
  function updateWikiAge() {
    const start = new Date(Date.UTC(2026, 1, 11, 8, 29, 0));
    const now = new Date();

    let diff = Math.floor((now - start) / 1000);

    const days = Math.floor(diff / 86400);
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    const el = document.getElementById("wiki-age");
    if (!el) return;

    el.textContent =
      days + " days, " +
      hours + " hours, " +
      minutes + " minutes, " +
      seconds + " seconds";
  }

  updateWikiAge();
  setInterval(updateWikiAge, 1000);
});