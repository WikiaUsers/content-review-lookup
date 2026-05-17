/* Any JavaScript here will be loaded for all users on every page load. */
/* cheese stuff */
(function() {
    var cheeseCounter = 0;
    var cheeseSoundUrl = 'https://static.wikia.nocookie.net/easiest-game-on-roblox/images/3/33/CheeseSFX.mp3/revision/latest?cb=20240730022456';

    document.addEventListener('click', function(e) {
        var cheeseElement = e.target.closest('.cheeseimgsecret');
        
        if (cheeseElement) {
            var sfx = new Audio(cheeseSoundUrl);

            // Generates a random pitch/speed between 0.35 and 1.8
            var randomPitch = Math.random() * (1.8 - 0.35) + 0.35;
            
            sfx.preservesPitch = false; 
            sfx.playbackRate = randomPitch;
            
            sfx.play();

            cheeseCounter++;
            console.log("Cheese clicks: " + cheeseCounter + "/5 | Pitch: " + randomPitch.toFixed(2));

            if (cheeseCounter >= 5) {
            	// Using mw.util.getUrl to keep it clean within the wiki
                window.location.href = mw.util.getUrl('Cheese (Item)');
            }
        }
    });
})();
/* LockOldComments thing */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.addNoteAbove = true;
window.lockOldComments.limit = 35;