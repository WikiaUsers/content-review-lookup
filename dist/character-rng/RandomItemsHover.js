var itemImageRarityMap = {
    "https://static.wikia.nocookie.net/character-rng/images/5/5d/Luck_Potion_I.png/revision/latest?cb=20240918214009": "item-common",
    "https://static.wikia.nocookie.net/character-rng/images/6/69/Luck_Potion_II.png/revision/latest?cb=20240918214009": "item-uncommon",
    "https://static.wikia.nocookie.net/character-rng/images/e/e8/Luck_Potion_III.png/revision/latest?cb=20240918214009": "item-epic",
    "https://static.wikia.nocookie.net/character-rng/images/3/30/Heavenly_Potion_IV.png/revision/latest?cb=20240918214009": "item-mythical",
    "https://static.wikia.nocookie.net/character-rng/images/7/78/Haste_Potion_I.png/revision/latest?cb=20240918214009": "item-common",
    "https://static.wikia.nocookie.net/character-rng/images/b/bb/Haste_Potion_II.png/revision/latest?cb=20240918214009": "item-uncommon",
    "https://static.wikia.nocookie.net/character-rng/images/e/e3/Swiftness_Elixir_IV.png/revision/latest?cb=20240918214009": "item-enchanted",
    "https://static.wikia.nocookie.net/character-rng/images/f/fb/Common_Key.png/revision/latest?cb=20240919031609": "item-common",
    "https://static.wikia.nocookie.net/character-rng/images/e/e9/Uncommon_Key.png/revision/latest?cb=20240919032625": "item-uncommon",
    "https://static.wikia.nocookie.net/character-rng/images/1/1e/Rare_Key.png/revision/latest?cb=20240919032625": "item-rare",
    "https://static.wikia.nocookie.net/character-rng/images/7/7b/Epic_Key.png/revision/latest?cb=20240919032626": "item-epic",
    "https://static.wikia.nocookie.net/character-rng/images/4/43/Exotic_Key.png/revision/latest?cb=20240919032624": "item-exotic",
    "https://static.wikia.nocookie.net/character-rng/images/2/29/Enchanted_Key.png/revision/latest?cb=20240919032625": "item-enchanted",
    "https://static.wikia.nocookie.net/character-rng/images/1/19/Legendary_Key.png/revision/latest?cb=20240919032625": "item-legendary",
    "https://static.wikia.nocookie.net/character-rng/images/d/db/Witch_Key.png/revision/latest?cb=20240919031610": "item-mythical",
    "https://static.wikia.nocookie.net/character-rng/images/f/f5/%2B999-Luck_Token.png/revision/latest?cb=20240919042132": "item-mythical",
    "https://static.wikia.nocookie.net/character-rng/images/f/f1/Leaves.png/revision/latest?cb=20240919031610": "item-mythical",
    "https://static.wikia.nocookie.net/character-rng/images/d/d5/Gems.png/revision/latest?cb=20240928004253": "item-mythical",
    "https://static.wikia.nocookie.net/character-rng/images/f/f5/Cursed_Rubble.png/revision/latest?cb=20240920155210": "item-epic"
};

var itemRandomImages = Object.keys(itemImageRarityMap); // Get an array of image URLs

// Starter image and rarity for items
var itemStarterImage = "https://static.wikia.nocookie.net/character-rng/images/d/d4/Potion_Silhouette.png/revision/latest?cb=20240926044311";
var itemStarterRarity = "item-common"; // Default rarity for the starter image

// Default link for item redirects
var itemDefaultLink = "https://character-rng.fandom.com/wiki/Category:Items";

// Function to pick a random item image
function getRandomItemImage() {
    var randomIndex = Math.floor(Math.random() * itemRandomImages.length);
    return itemRandomImages[randomIndex];
}

// Function to set the item background image and gradient
function applyItemBackground(itemBox, newImage, rarity) {
    itemBox.classList.remove("item-common", "item-uncommon", "item-rare", "item-epic", "item-exotic", "item-enchanted", "item-legendary", "item-mythical");
    itemBox.classList.add(rarity);
    // Set the background image
    itemBox.style.backgroundImage = "url('" + newImage + "'), linear-gradient(to top, var(--start-color, #404040), var(--end-color, #4d4d4d))";
}

// Apply functionality to all hover-item-image elements
document.querySelectorAll('.hover-item-image').forEach(function(itemBox) {
    // Apply starter image and background on page load
    applyItemBackground(itemBox, itemStarterImage, itemStarterRarity);

    // Event listener for hover to change the item image and the background
    itemBox.addEventListener('mouseenter', function() {
        var newImage = getRandomItemImage();
        var rarity = itemImageRarityMap[newImage];
        applyItemBackground(itemBox, newImage, rarity);
    });

    // Event listener for clicks (left, middle)
    itemBox.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            // Left-click: Redirect in the same tab
            window.location.href = itemDefaultLink;
        } else if (event.button === 1) {
            // Middle-click: Open in a new tab
            window.open(itemDefaultLink, '_blank');
        }
    });
});