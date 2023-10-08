/* Any JavaScript here will be loaded for all users on every page load. */


// Get all elements with class ".portable-infobox.type-details"
const infoboxes = document.querySelectorAll('.portable-infobox.type-details');

// Loop through each infobox
infoboxes.forEach((infobox) => {
    // Find the inner div with data-item-name="rarity" and check its text content
    const rarityDiv = infobox.querySelector('[data-item-name="rarity"] div');
    if (rarityDiv) {
        const rarityText = rarityDiv.textContent.trim();
        //console.log(`Found rarity text: "${rarityText}"`); // Log the rarity text

        // Create a class name based on the rarity
        let rarityClass = 'common'; // Default to "common"
        if (rarityText.includes("Artifact")) {
            rarityClass = 'artifact';
        } else if (rarityText.includes("Legendary")) {
            rarityClass = 'legendary';
        } else if (rarityText.includes("Epic")) {
            rarityClass = 'epic';
        } else if (rarityText.includes("Rare")) {
            rarityClass = 'rare';
        } else if (rarityText.includes("Uncommon")) {
            rarityClass = 'uncommon';
        }

        // Add the generated class to the infobox
        infobox.classList.add(rarityClass);
        //console.log(`Added "${rarityClass}" class`); // Log that the class was added
    }
});