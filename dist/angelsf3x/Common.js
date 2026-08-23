/* Any JavaScript here will be loaded for all users on every page load. */

// [[Module:CSS]] and [[Template:CSS]] //
mw.hook("wikipage.content").add(function() {
    $("span.import-css").each(function() {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
    });
});

// Username script //
(function() {
    if (mw.config.get('wgUserName') !== null) $('span.insertusername').text(mw.config.get('wgUserName'));
})();

// Main page buttons //
$(function() {

    $("#rules").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Rules", "_blank"); });
    $("#mos").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Manual_of_Style", "_blank"); });
    $("#copyrights").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:Copyrights", "_blank"); });
    $("#userrights").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_F3X_Wiki:User_Rights", "_blank"); });
    $("#mainpage").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Angels_f3x", "_blank"); });
    $("#playgame").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#people").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:People", "_blank"); });
    $("#spinoffs").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Spinoff_Games", "_blank"); });
    $("#ranklist").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Rank_List", "_blank"); });
    $("#misc").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Misc_Articles", "_blank"); });
    $("#recentchanges").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:RecentChanges", "_blank"); });
    $("#newpages").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:NewPages", "_blank"); });
    $("#random").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:Random", "_blank"); });
    $("#upload").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Special:Upload", "_blank"); });
    $("#roblox").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#devblog").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/User_blog:Erlhender", "_blank"); });
    $("#cat-people").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:People", "_blank"); });
    $("#cat-spinoffs").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Spinoff_Games", "_blank"); });
    $("#cat-realangels").on("click", function() { window.open("https://www.roblox.com/games/6156255015/Angels-f3x", "_blank"); });
    $("#cat-ranklist").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Rank_List", "_blank"); });
    $("#cat-jokes").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Joke_Page", "_blank"); });
    $("#cat-misc").on("click", function() { window.open("https://angelsf3x.fandom.com/wiki/Category:Misc_Articles", "_blank"); });
});

// petals, bye bye geo!! probably a more real retirement than masteroblox's.
// petals(js, should have a corresponding CSS || LARPED W GEMINI AI)
/*$(function () {
    // Create and append the petal container to the body
    const container = document.createElement("div");
    container.className = "petal-container";
    document.body.appendChild(container);

    const maxPetals = 25; // Adjust this number to change density

    function createPetal() {
        if (container.children.length >= maxPetals) return;

        const petal = document.createElement("div");
        petal.className = "falling-petal";

        // Randomize size between 15px and 35px
        const size = Math.random() * 20 + 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        // Randomize horizontal starting position (0% to 100% of screen width)
        petal.style.left = `${Math.random() * 100}vw`;

        // Randomize fall duration between 6s and 12s (slower = more relaxed)
        const fallDuration = Math.random() * 6 + 6;
        petal.style.animationDuration = `${fallDuration}s, ${Math.random() * 2 + 3}s`;

        // Randomize start delay so they don't all fall at once
        petal.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(petal);

        // Remove the petal from DOM after it finishes falling to prevent memory leaks
        setTimeout(() => {
            petal.remove();
        }, (fallDuration + 5) * 1000); // Added safety cushion for delay time
    }

    // Periodically try to spawn a petal
    setInterval(createPetal, 300);
});*/