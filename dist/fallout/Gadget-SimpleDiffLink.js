// Enable this gadget in your preferences at Special:Preferences
// To make it work on other Fandom wikis, copy the entire code of this gadget to your personal JS page.
// For more information about personal JS, see https://community.fandom.com/wiki/Help:Personal_CSS_and_JS#JavaScript

addOnloadHook(() => {
    const originalUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(originalUrl.search);

    if (skin === "oasis" && queryParams.has("oldid") && queryParams.has("diff")) {
        const wikiPath = originalUrl.pathname.substr(0, originalUrl.pathname.lastIndexOf("/"));
        const wikiUrl = `${originalUrl.protocol}//${originalUrl.hostname}${wikiPath}/`;

        const oldId = queryParams.get("oldid");
        const newId = queryParams.get("diff");
        const diffUrl = `${wikiUrl}Special:Diff/${oldId}/${newId}`;

        const button = "<span class='mw-rev-head-action'><a href='#' onclick='window.prompt(undefined, \"" + diffUrl + "\");'>(URL)</a></span>";
        $(".diff-header td:nth-child(2) div:nth-child(1) strong").append(button);
    }
});