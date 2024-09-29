/* Any JavaScript here will be loaded for all users on every page load. */
var imageRarityMap = {
"https://static.wikia.nocookie.net/character-rng/images/f/f9/Akano.png/revision/latest?cb=20240917220114": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/f/f0/Alfonso.png/revision/latest?cb=20240917220114": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/d/d8/Arlan.png/revision/latest?cb=20240917220114": "common", 
"https://static.wikia.nocookie.net/character-rng/images/1/12/Army_Man.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/2/2a/Arthur_Logan.png/revision/latest?cb=20240917220114": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/2/24/Atom_Breaker.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/9/90/Atticus.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/9/99/Bakura.png/revision/latest?cb=20240917220327": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/f/f2/Barry.png/revision/latest?cb=20240917220114": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/8/85/Battle_Giant.png/revision/latest?cb=20240917220114": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/b/bc/Bright.png/revision/latest?cb=20240917220328": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/4/4c/Builderman.png/revision/latest?cb=20240917220114": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/7/7b/Bullet_Train.png/revision/latest?cb=20240917220328": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/d/d8/Buzzsaw_Guy.png/revision/latest?cb=20240917220327": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/a/ab/CaseOh.png/revision/latest?cb=20240917220328": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/5/54/Cloudsoldier.png/revision/latest?cb=20240917220114": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/f/ff/Clown.png/revision/latest?cb=20240917220114": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/7/70/Crystal_Kingpin.png/revision/latest?cb=20240917220328": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/6/6d/Cutter.png/revision/latest?cb=20240917220114": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/0/04/Cyborg_17.png/revision/latest?cb=20240917220328": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/d/d4/Dark_Overlord.png/revision/latest?cb=20240917220328": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/5/56/Dark_Warrior.png/revision/latest?cb=20240917220328": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/2/28/Dekan.png/revision/latest?cb=20240917220328": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/0/06/Diro.png/revision/latest?cb=20240917220114": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/b/bb/Dr._Dread.png/revision/latest?cb=20240917220325": "mythical", 
"https://static.wikia.nocookie.net/character-rng/images/7/7d/Echiga.png/revision/latest?cb=20240917220114": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/7/71/Elliot.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/3/39/Eric_Jager.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/1/16/Flopper.png/revision/latest?cb=20240917220114": "common", 
"https://static.wikia.nocookie.net/character-rng/images/5/52/Frizon.png/revision/latest?cb=20240917220114": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/f/f2/Full_Might.png/revision/latest?cb=20240917220326": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/7/70/Ghoul_Biker.png/revision/latest?cb=20240917220326": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/d/df/Gigachad.png/revision/latest?cb=20240917220326": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/8/86/Gino.png/revision/latest?cb=20240917220326": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/e/e7/Goro.png/revision/latest?cb=20240917220326": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/f/f6/Gotus.png/revision/latest?cb=20240917220326": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/1/1d/Gray.png/revision/latest?cb=20240917220326": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/1/12/Guest.png/revision/latest?cb=20240917220326": "common", 
"https://static.wikia.nocookie.net/character-rng/images/d/d9/Henry_Porter.png/revision/latest?cb=20240917220326": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/7/7b/Homus_Sampson.png/revision/latest?cb=20240917215038": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/c/c4/Huge_Collosus.png/revision/latest?cb=20240917214715": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/9/9c/Indestructible.png/revision/latest?cb=20240917214716": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/0/0f/John_Brick.png/revision/latest?cb=20240917214716": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/f/f2/Joshiro.png/revision/latest?cb=20240917222041": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/9/96/Kronos.png/revision/latest?cb=20240917214716": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/2/2b/Lewis.png/revision/latest?cb=20240917214716": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/1/17/Luffus_Gear_5.png/revision/latest?cb=20240917214716": "mythical", 
"https://static.wikia.nocookie.net/character-rng/images/a/a4/Luffus.png/revision/latest?cb=20240917214716": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/3/3c/Mandal.png/revision/latest?cb=20240917214716": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/3/39/Mighty_Statue.png/revision/latest?cb=20240917214717": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/1/13/Miko.png/revision/latest?cb=20240917214717": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/6/6b/Mikuro.png/revision/latest?cb=20240917214716": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/b/bd/Monster_8.png/revision/latest?cb=20240917214717": "common", 
"https://static.wikia.nocookie.net/character-rng/images/6/6d/Muzaro.png/revision/latest?cb=20240917214717": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/4/44/Nationlander.png/revision/latest?cb=20240917214717": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/5/58/Nira.png/revision/latest?cb=20240917214717": "common", 
"https://static.wikia.nocookie.net/character-rng/images/7/7a/Niro_Tsu.png/revision/latest?cb=20240917214717": "common", 
"https://static.wikia.nocookie.net/character-rng/images/1/19/Nolan.png/revision/latest?cb=20240917214717": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/1/12/Noob.png/revision/latest?cb=20240917214717": "common", 
"https://static.wikia.nocookie.net/character-rng/images/c/cf/Noraba.png/revision/latest?cb=20240917214717": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/f/f9/Norito.png/revision/latest?cb=20240917214717": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/3/3e/Obus-Wand_Kenova.png/revision/latest?cb=20240917215040": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/d/d6/Orina.png/revision/latest?cb=20240917215040": "common", 
"https://static.wikia.nocookie.net/character-rng/images/e/e7/Peter_Grinton.png/revision/latest?cb=20240917214132": "mythical", 
"https://static.wikia.nocookie.net/character-rng/images/7/77/Power_Suit.png/revision/latest?cb=20240917214133": "common", 
"https://static.wikia.nocookie.net/character-rng/images/f/ff/Rengiro.png/revision/latest?cb=20240917214133": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/e/e8/Ron.png/revision/latest?cb=20240917214133": "common", 
"https://static.wikia.nocookie.net/character-rng/images/b/b2/Ronaldo.png/revision/latest?cb=20240917214133": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/4/46/Rook_Grimes.png/revision/latest?cb=20240917214133": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/e/eb/Rory.png/revision/latest?cb=20240917214133": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/2/24/Ryren.png/revision/latest?cb=20240917214133": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/b/b9/Sakina.png/revision/latest?cb=20240917214133": "common", 
"https://static.wikia.nocookie.net/character-rng/images/9/99/Sasukai.png/revision/latest?cb=20240917214133": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/4/4d/Shadow_Knight.png/revision/latest?cb=20240917214133": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/e/e8/Sharps.png/revision/latest?cb=20240917214133": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/8/87/Shigoru.png/revision/latest?cb=20240917214133": "enchanted", 
"https://static.wikia.nocookie.net/character-rng/images/0/02/Single-Strike_Man.png/revision/latest?cb=20240917214133": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/1/1d/Skrell.png/revision/latest?cb=20240917214134": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/5/51/Sniper_King.png/revision/latest?cb=20240917214133": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/5/57/Sol_Goatman.png/revision/latest?cb=20240917214133": "mythical", 
"https://static.wikia.nocookie.net/character-rng/images/9/94/Soren.png/revision/latest?cb=20240917214133": "common", 
"https://static.wikia.nocookie.net/character-rng/images/2/2d/Stellar_Moon.png/revision/latest?cb=20240917214133": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/f/f9/Sukino.png/revision/latest?cb=20240917214134": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/0/05/Sunlight.png/revision/latest?cb=20240917215040": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/9/93/Superhero.png/revision/latest?cb=20240917215040": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/6/6e/Tanshiro.png/revision/latest?cb=20240917215040": "common", 
"https://static.wikia.nocookie.net/character-rng/images/7/73/The_Peak.png/revision/latest?cb=20240917215040": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/1/12/The_Speedster.png/revision/latest?cb=20240917215040": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/4/41/Theron.png/revision/latest?cb=20240917215040": "legendary", 
"https://static.wikia.nocookie.net/character-rng/images/0/03/Todariki.png/revision/latest?cb=20240917215040": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/3/3f/Toshi.png/revision/latest?cb=20240917215040": "epic", 
"https://static.wikia.nocookie.net/character-rng/images/c/c5/Tracker.png/revision/latest?cb=20240917215040": "common", 
"https://static.wikia.nocookie.net/character-rng/images/7/79/Ultra-Man.png/revision/latest?cb=20240917215040": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/6/65/Uso.png/revision/latest?cb=20240917215040": "common", 
"https://static.wikia.nocookie.net/character-rng/images/a/a1/Vegetto.png/revision/latest?cb=20240917215040": "exotic", 
"https://static.wikia.nocookie.net/character-rng/images/4/43/Web-Shooter_Boy.png/revision/latest?cb=20240917215040": "mythical", 
"https://static.wikia.nocookie.net/character-rng/images/6/6c/Wu-Jin_Sung.png/revision/latest?cb=20240917215040": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/9/9f/Yona_Furjer.png/revision/latest?cb=20240917215040": "uncommon", 
"https://static.wikia.nocookie.net/character-rng/images/2/2a/Yotus.png/revision/latest?cb=20240917215040": "epic",
"https://static.wikia.nocookie.net/character-rng/images/3/34/Yuto.png/revision/latest?cb=20240917215040": "rare", 
"https://static.wikia.nocookie.net/character-rng/images/2/20/Zoran.png/revision/latest?cb=20240917220114": "uncommon"

};

var randomImages = Object.keys(imageRarityMap); // Get an array of image URLs

// Starter image and rarity
var starterImage = "https://static.wikia.nocookie.net/character-rng/images/3/3f/Empty_Character.png/revision/latest?cb=20240921041732";
var starterRarity = "common";

// Default link to redirect when clicked
var defaultLink = "https://character-rng.fandom.com/wiki/Category:Characters";

// Function to pick a random image
function getRandomImage() {
    var randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
}

// Function to set the background image and gradient
function applyBackground(imageBox, newImage, rarity) {
    // Remove previous rarity classes
    imageBox.classList.remove("common", "uncommon", "rare", "epic", "exotic", "enchanted", "legendary", "mythical");

    // Add the new rarity class to set the gradient
    imageBox.classList.add(rarity);

    // Set the background image only (CSS will handle the rest)
    imageBox.style.backgroundImage = "url('" + newImage + "'), linear-gradient(to top, var(--start-color, #404040), var(--end-color, #4d4d4d))";
}

// Apply functionality to all hover-random-image elements
document.querySelectorAll('.hover-random-image').forEach(function(imageBox) {
    // Apply starter image and background on page load
    applyBackground(imageBox, starterImage, starterRarity);

    // Event listener for hover (mouseenter) to change the image and the background
    imageBox.addEventListener('mouseenter', function() {
        var newImage = getRandomImage();
        var rarity = imageRarityMap[newImage];
        applyBackground(imageBox, newImage, rarity);
    });

    // Event listener for clicks (left, middle)
    imageBox.addEventListener('mousedown', function(event) {
        if (event.button === 0) {
            // Left-click: Redirect in the same tab
            window.location.href = defaultLink;
        } else if (event.button === 1) {
            // Middle-click: Open in a new tab
            window.open(defaultLink, '_blank');
        }
    });
});