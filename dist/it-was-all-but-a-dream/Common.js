/* Any JavaScript here will be loaded for all users on every page load. */



$(async function () {
    var name = mw.config.get("wgTitle");
    var id = mw.config.get("wgArticleId");

    if (!name || !id) return;

    var number = Math.max(1, Number(id) - 1);
    var displayTitle =
        "CELLAR #" +
        String(number).padStart(3, "0") +
        ": " + name;

    var title = document.querySelector(
        ".page-header__title"
    );

    if (title) {
        title.textContent = displayTitle;
    }
});