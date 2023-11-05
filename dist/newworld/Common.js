/* Any JavaScript here will be loaded for all users on every page load. */

// Get all elements with class ".portable-infobox.type-details"
var infoboxes = document.querySelectorAll('.portable-infobox.type-details');

// Loop through each infobox
for (var i = 0; i < infoboxes.length; i++) {
    var infobox = infoboxes[i];
    
    // Find the inner div with data-item-name="rarity" and check its text content
    var rarityDiv = infobox.querySelector('[data-item-name="rarity"] div');
    
    if (rarityDiv) {
        var rarityText = rarityDiv.textContent.trim();
        //console.log('Found rarity text: "' + rarityText + '"'); // Log the rarity text

        // Create a class name based on the rarity
        var rarityClass = 'common'; // Default to "common"
        
        if (rarityText.indexOf('Artifact') !== -1) {
            rarityClass = 'artifact';
        } else if (rarityText.indexOf('Legendary') !== -1) {
            rarityClass = 'legendary';
        } else if (rarityText.indexOf('Epic') !== -1) {
            rarityClass = 'epic';
        } else if (rarityText.indexOf('Rare') !== -1) {
            rarityClass = 'rare';
        } else if (rarityText.indexOf('Uncommon') !== -1) {
            rarityClass = 'uncommon';
        }

        // Add the generated class to the infobox
        infobox.classList.add(rarityClass);
        //console.log('Added "' + rarityClass + '" class'); // Log that the class was added
    }
}