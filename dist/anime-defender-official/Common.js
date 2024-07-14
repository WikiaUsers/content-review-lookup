// Function to play a sound effect
function playSound() {
  var audio = new Audio('path/to/sound.mp3'); // Replace 'path/to/sound.mp3' with your actual sound file path
  audio.play();
}

// Add event listener to expand/collapse button
$(document).ready(function() {
  $('.mw-collapsible-toggle').click(function() {
    var collapsible = $(this).closest('.mw-collapsible');
    var isCollapsed = collapsible.hasClass('mw-collapsed');
    if (isCollapsed) {
      // Play sound effect when expanding
      playSound();
      // Add zoom animation when expanding
      collapsible.addClass('zoom');
    } else {
      // Play sound effect when collapsing (optional)
      playSound();
    }
  });
});