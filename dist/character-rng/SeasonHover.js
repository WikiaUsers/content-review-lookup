(function() {
    var seasonImageRarityMap = {
// Season 1
"https://static.wikia.nocookie.net/character-rng/images/e/e8/Ron.png/revision/latest?cb=20240917214133": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/7/7a/Niro_Tsu.png/revision/latest?cb=20240917214717": "season-common", 
"https://static.wikia.nocookie.net/character-rng/images/c/c5/Tracker.png/revision/latest?cb=20240917215040": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/7/77/Power_Suit.png/revision/latest?cb=20240917214133": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/b/bd/Monster_8.png/revision/latest?cb=20240917214717": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/1/12/The_Speedster.png/revision/latest?cb=20240917215040": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/9/9f/Yona_Furjer.png/revision/latest?cb=20240917215040": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/0/05/Sunlight.png/revision/latest?cb=20240917215040": "season-uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/2/2d/Stellar_Moon.png/revision/latest?cb=20240917214133": "season-rare", 
"https://static.wikia.nocookie.net/character-rng/images/7/7d/Echiga.png/revision/latest?cb=20240917220114": "season-rare", 
"https://static.wikia.nocookie.net/character-rng/images/6/6b/Mikuro.png/revision/latest?cb=20240917214716": "season-rare", 
"https://static.wikia.nocookie.net/character-rng/images/7/70/Ghoul_Biker.png/revision/latest?cb=20240917220326": "season-epic", 
"https://static.wikia.nocookie.net/character-rng/images/2/24/Ryren.png/revision/latest?cb=20240917214133": "season-epic", 
"https://static.wikia.nocookie.net/character-rng/images/f/f9/Akano.png/revision/latest?cb=20240917220114": "season-exotic", 
"https://static.wikia.nocookie.net/character-rng/images/1/1d/Skrell.png/revision/latest?cb=20240917214134": "season-exotic", 
"https://static.wikia.nocookie.net/character-rng/images/d/d8/Buzzsaw_Guy.png/revision/latest?cb=20240917220327": "season-exotic", 
"https://static.wikia.nocookie.net/character-rng/images/1/1d/Gray.png/revision/latest?cb=20240917220326": "season-exotic", 
"https://static.wikia.nocookie.net/character-rng/images/8/87/Shigoru.png/revision/latest?cb=20240917214133": "season-enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/f/ff/Rengiro.png/revision/latest?cb=20240917214133": "season-enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/9/96/Kronos.png/revision/latest?cb=20240917214716": "season-enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/2/24/Atom_Breaker.png/revision/latest?cb=20240917220114": "season-enchanted",
"https://static.wikia.nocookie.net/character-rng/images/d/d9/Henry_Porter.png/revision/latest?cb=20240917220326": "season-legendary", 
"https://static.wikia.nocookie.net/character-rng/images/6/6d/Muzaro.png/revision/latest?cb=20240917214717": "season-legendary", 
"https://static.wikia.nocookie.net/character-rng/images/b/bb/Dr._Dread.png/revision/latest?cb=20240917220325": "season-mythical", 
"https://static.wikia.nocookie.net/character-rng/images/f/fb/Common_Key.png/revision/latest?cb=20240919031609": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/e/e9/Uncommon_Key.png/revision/latest?cb=20240919032625": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/1/1e/Rare_Key.png/revision/latest?cb=20240919032625": "season-rare",
"https://static.wikia.nocookie.net/character-rng/images/7/7b/Epic_Key.png/revision/latest?cb=20240919032626": "season-epic",
"https://static.wikia.nocookie.net/character-rng/images/4/43/Exotic_Key.png/revision/latest?cb=20240919032624": "season-exotic",
"https://static.wikia.nocookie.net/character-rng/images/2/29/Enchanted_Key.png/revision/latest?cb=20240919032625": "season-enchanted",
"https://static.wikia.nocookie.net/character-rng/images/1/19/Legendary_Key.png/revision/latest?cb=20240919032625": "season-legendary",
"https://static.wikia.nocookie.net/character-rng/images/9/96/Season_1_Icon.png/revision/latest?cb=20240926164754": "season-mythical",
"https://static.wikia.nocookie.net/character-rng/images/f/f1/Leaves.png/revision/latest?cb=20240919031610": "season-mythical",
"https://static.wikia.nocookie.net/character-rng/images/d/da/Autumn_Chest.png/revision/latest?cb=20240928034122": "season-mythical",
// Season 2
"https://static.wikia.nocookie.net/character-rng/images/8/88/Korin.png/revision/latest?cb=20241019201110": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/c/cf/Kenzo.png/revision/latest?cb=20241019201110": "season-enchanted",
"https://static.wikia.nocookie.net/character-rng/images/c/c4/Jynt.png/revision/latest?cb=20241019201110": "season-exotic",
"https://static.wikia.nocookie.net/character-rng/images/7/74/Fiora.png/revision/latest?cb=20241019201108": "season-mythical",
"https://static.wikia.nocookie.net/character-rng/images/1/13/Maharos.png/revision/latest?cb=20241019201101": "season-legendary",
"https://static.wikia.nocookie.net/character-rng/images/1/1f/Iron_Wolf.png/revision/latest?cb=20241019200818": "season-exotic",
"https://static.wikia.nocookie.net/character-rng/images/4/48/Franco.png/revision/latest?cb=20241019200817": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/3/3e/Green_Giant.png/revision/latest?cb=20241019200817": "season-enchanted",
"https://static.wikia.nocookie.net/character-rng/images/3/37/Izan.png/revision/latest?cb=20241019200817": "season-rare",
"https://static.wikia.nocookie.net/character-rng/images/7/76/Aegis_Unit_01.png/revision/latest?cb=20241019200815": "season-enchanted",
"https://static.wikia.nocookie.net/character-rng/images/2/22/Striker.png/revision/latest?cb=20241019200815": "season-epic",
"https://static.wikia.nocookie.net/character-rng/images/9/96/Daniel_M..png/revision/latest?cb=20241019200815": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/3/37/Asumi.png/revision/latest?cb=20241019200815": "season-uncommon",
"https://static.wikia.nocookie.net/character-rng/images/a/aa/Thorst.png/revision/latest?cb=20241019200815": "season-legendary",
"https://static.wikia.nocookie.net/character-rng/images/2/28/Vyra.png/revision/latest?cb=20241019200815": "season-rare",
"https://static.wikia.nocookie.net/character-rng/images/2/28/Night_Prowler.png/revision/latest?cb=20241019200813": "season-rare",
"https://static.wikia.nocookie.net/character-rng/images/9/92/Raymond.png/revision/latest?cb=20241019200813": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/e/e2/Paccino.png/revision/latest?cb=20241019200813": "season-epic",
"https://static.wikia.nocookie.net/character-rng/images/0/03/Oong.png/revision/latest?cb=20241019200813": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/3/3f/Red_Ninja.png/revision/latest?cb=20241019200813": "season-exotic",
"https://static.wikia.nocookie.net/character-rng/images/c/c1/Ryner.png/revision/latest?cb=20241019200813": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/0/09/Shiro.png/revision/latest?cb=20241019200813": "season-common",
"https://static.wikia.nocookie.net/character-rng/images/5/55/Natsumi.png/revision/latest?cb=20241019200813": "season-epic",
"https://static.wikia.nocookie.net/character-rng/images/0/0a/Majiro.png/revision/latest?cb=20241019200812": "season-epic",
"https://static.wikia.nocookie.net/character-rng/images/0/03/Metal_Man.png/revision/latest?cb=20241019205635": "season-legendary",
"https://static.wikia.nocookie.net/character-rng/images/e/ea/Jack-O-Lanterns.png/revision/latest?cb=20241019210305": "season-mythical",
"https://static.wikia.nocookie.net/character-rng/images/4/43/Halloween_Chest.png/revision/latest?cb=20241019213023": "season-mythical",
};

    var seasonRandomImages = Object.keys(seasonImageRarityMap); // Get an array of image URLs

    // Starter image and rarity for seasons
    var seasonStarterImage = "https://static.wikia.nocookie.net/character-rng/images/6/60/Season_Icon_Silhouette.png/revision/latest?cb=20241020002217";
    var seasonStarterRarity = "season-common"; // Default rarity for the starter image

    // Default link for season redirects
    var seasonDefaultLink = "https://character-rng.fandom.com/wiki/Category:Seasons";

    // Function to pick a random season image
    function getRandomSeasonImage() {
        var randomIndex = Math.floor(Math.random() * seasonRandomImages.length);
        return seasonRandomImages[randomIndex];
    }

    // Function to set the season background image and gradient
    function applySeasonBackground(seasonBox, newImage, rarity) {
        seasonBox.classList.remove("season-common", "season-uncommon", "season-rare", "season-epic", "season-exotic", "season-enchanted", "season-legendary", "season-mythical");
        seasonBox.classList.add(rarity);
        // Set the background image
        seasonBox.style.backgroundImage = "url('" + newImage + "'), linear-gradient(to top, var(--start-color, #404040), var(--end-color, #4d4d4d))";
    }

    // Apply functionality to all season-hover-image elements
    document.querySelectorAll('.season-hover-image').forEach(function(seasonBox) {
        // Apply starter image and background on page load
        applySeasonBackground(seasonBox, seasonStarterImage, seasonStarterRarity);

        // Event listener for hover to change the season image and the background
        seasonBox.addEventListener('mouseenter', function() {
            var newImage = getRandomSeasonImage();
            var rarity = seasonImageRarityMap[newImage];
            applySeasonBackground(seasonBox, newImage, rarity);
        });

        // Event listener for clicks (left, middle)
        seasonBox.addEventListener('mousedown', function(event) {
            if (event.button === 0) {
                // Left-click: Redirect in the same tab
                window.location.href = seasonDefaultLink;
            } else if (event.button === 1) {
                // Middle-click: Open in a new tab
                window.open(seasonDefaultLink, '_blank');
            }
        });
    });
})();