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
    $content.find('table.ege-table-spoilers').each(function() {
        var $table = $(this);
        var $headerRow = $table.find('tr').first();
        var $dataRows = $table.find('tr').not(':first-child');

        $headerRow.css('cursor', 'pointer');
        $dataRows.addClass('ege-row-expanded');

        $headerRow.on('click', function() {
            var isCollapsed = $table.hasClass('ege-collapsed');

            if (!isCollapsed) {
                $dataRows.removeClass('ege-row-expanded').addClass('ege-row-hidden');
                $table.addClass('ege-collapsed');
                setTimeout(function() {
                    if ($table.hasClass('ege-collapsed')) {
                        $dataRows.hide();
                    }
                }, 300);
            } else {
                $dataRows.show();
                $table.removeClass('ege-collapsed');
                
                setTimeout(function() {
                    $dataRows.removeClass('ege-row-hidden').addClass('ege-row-expanded');
                }, 10);
            }
        });
    });
});

/* skatepark stuff */
$(function() {
    var skateparkPages = [
        'Beat_Up', 'Boombox_Boogie', 'Fall_Damage', 'Lava_Pit',
        'Slipped', 'Wake', 'Zapped', 'Break_Down', 'Bronze_Medal',
        'Deadly_Touch', 'Secret_Stash', 'Skateboard', 'Slumber',
        'Theft', 'XTREME_MODE', 'Bare_Minimum', 'Blackout',
        'Killer_Escape', 'Silver_Medal', 'Gold_Medal'
    ];

    if (skateparkPages.indexOf(mw.config.get('wgPageName')) !== -1) {
        var header = document.querySelector('.fandom-community-header__community-name');
        if (header) {
            header.style.cssText += `
                font-family: Arial, sans-serif;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #ffffff;
                text-shadow:
                    -1px -1px 0 #000,  1px -1px 0 #000, -1px  1px 0 #000,  1px  1px 0 #000,
                     0px -1px 0 #000,  0px  1px 0 #000, -1px  0px 0 #000,  1px  0px 0 #000,
                    -2px -2px 0 #000,  2px -2px 0 #000, -2px  2px 0 #000,  2px  2px 0 #000,
                     0px -2px 0 #000,  0px  2px 0 #000, -2px  0px 0 #000,  2px  0px 0 #000,
                    -2px -1px 0 #000, -1px -2px 0 #000,  2px -1px 0 #000,  1px -2px 0 #000,
                    -2px  1px 0 #000, -1px  2px 0 #000,  2px  1px 0 #000,  1px  2px 0 #000;
            `;
        }
    }
});

function initSpinnyHeader() {
  document.querySelectorAll('.fandom-community-header__image, .fandom-sticky-header__logo').forEach(function(img) {

        img.addEventListener('mouseenter', function() {
            if (!img.classList.contains('is-spinning')) {
                img.style.animation = '';
                img.classList.add('is-spinning');
            }
        });

        img.addEventListener('mouseleave', function() {
            var currentTransform = window.getComputedStyle(img).transform;

            img.classList.remove('is-spinning');
            img.style.transform = currentTransform;

            void img.offsetWidth;

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    img.style.transform = 'rotate(0deg) scale(1)';
                });
            });

            setTimeout(function() {
                img.style.transform = '';
            }, 450);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpinnyHeader);
} else {
    initSpinnyHeader();
}