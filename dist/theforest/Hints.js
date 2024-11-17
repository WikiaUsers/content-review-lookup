// List of texts to display
var texts = [
    "KEEP YOUR ENERGY UP BY EATING REGULARLY",
    "COVER YOURSELF IN MUD TO HIDE FROM ENEMIES",
    "BUILD A SHELTER TO SAVE YOUR GAME",
    "TRY UPGRADING YOUR WEAPONS",
    "YOU CAN REGAIN ENERGY BY RESTING ON BENCH",
    "HIDE IN BUSHES TO ESCAPE FROM ENEMIES",
    "LIT EFFIGIES WILL SCARE ENEMIES AWAY FROM YOUR CAMP",
    "EXPLOSIVES AND MOLOTOVS ARE EFFECTIVE AGAINST MOST ENEMIES",
    "BEING COLD WILL DRAIN YOUR ENERGY",
    "YOU CAN MAKE ARMOR OUT OF LIZARD SKIN"
];

// Randomly select a text on page load
var textElement = document.getElementById('hintText');
var currentIndex = Math.floor(Math.random() * texts.length); // Random initial text

// Set random text initially
textElement.textContent = texts[currentIndex];

// Function to change the text every 6 seconds (after the full animation ends)
function changeText() {

    // Remove the animation temporarily to restart it
    textElement.style.animation = 'none';

    // Update the text
    currentIndex = (currentIndex + 1) % texts.length; // Loop through the texts

    textElement.textContent = texts[currentIndex]; // Set the new text

    // Force a reflow to reset the animation
    void textElement.offsetWidth; // Trigger reflow to reset animation

    // Reapply the animation with the same duration as the interval (6 seconds)
    textElement.style.animation = 'slideInOut 6s ease-in-out infinite'; // Reapply animation
}

// Change the text every 6 seconds (after the full animation cycle)
setInterval(changeText, 6000);  // Change text every 6 seconds to sync with the animation duration