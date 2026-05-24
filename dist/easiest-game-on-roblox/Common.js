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

// Ending screen retry button
$(document).on('click', '.ending-retry-btn', function() {
    var btn = $(this);
    
    if (btn.data('clicked')) return;
    btn.data('clicked', true);
    
    var dots = 1;
    btn.text('Rejoining.');
    
    var interval = setInterval(function() {
        dots = (dots % 3) + 1;
        btn.text('Rejoining' + '.'.repeat(dots));
    }, 400);
    
    setTimeout(function() {
        clearInterval(interval);
        location.reload();
    }, 1800);
});


/* table collapsible stuff */
mw.hook('wikipage.content').add(function($content) {
    $content.find('table.mw-collapsible').each(function() {
        var $table = $(this);
        var $toggle = $table.find('.mw-collapsible-toggle').first();
        var $rows = $table.find('tr').not(':has(.mw-collapsible-toggle)');

        $rows.css({
            'transition': 'opacity 0.35s ease',
            'opacity': '1'
        });

        $toggle.off('click.collapsibleAnim').on('click.collapsibleAnim', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            var isVisible = $rows.first().css('display') !== 'none';

            if (isVisible) {
                $rows.css('opacity', '0');
                setTimeout(function() { $rows.hide(); }, 350);
                $toggle.find('.mw-collapsible-text').text('show');
            } else {
                $rows.show().css('opacity', '0');
                setTimeout(function() { $rows.css('opacity', '1'); }, 10);
                $toggle.find('.mw-collapsible-text').text('hide');
            }
        });
    });
});