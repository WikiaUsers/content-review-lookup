/* Any JavaScript here will be loaded for all users on every page load. */

mw.loader.using("mediawiki.util").then(function () {
    function addMonsterMessage() {
        var discussions = document.querySelector(".fandom-discussions");

        if (!discussions) return;

        if (document.querySelector(".monster-discussion-end")) return;

        var msg = document.createElement("div");
        msg.className = "monster-discussion-end";
        msg.innerHTML =
            "<div>Shh! Monsters are asleep!</div>" +
            "<span>You've hit the end of this article's comments and discussions!</span>";

        discussions.appendChild(msg);
    }

    setTimeout(addMonsterMessage, 3000);
});