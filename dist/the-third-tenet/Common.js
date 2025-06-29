/* =====================================
   CHARACTER TABS FUNCTIONALITY
   Add this to MediaWiki:Common.js
   ===================================== */

$(function() {
    // Tab switching functionality
    $('.tab-button').click(function() {
        var tabId = $(this).attr('data-tab');
        
        // Remove active class from all tabs and content
        $('.tab-button').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Add active class to clicked tab and corresponding content
        $(this).addClass('active');
        $('#' + tabId + '-content').addClass('active');
        
        // Add Animus glitch effect
        $('.tab-content.active').css('animation', 'none');
        setTimeout(function() {
            $('.tab-content.active').css('animation', 'fadeIn 0.3s ease-in');
        }, 10);
    });
    
    // Unit conversion functionality
    $('.unit-convert').each(function() {
        var $this = $(this);
        var imperial = $this.find('.unit-imperial').text();
        var metric = $this.find('.unit-metric').text();
        
        // Add tooltip
        $this.attr('title', 'Click to toggle between Imperial and Metric');
        
        // Click to toggle (in addition to hover)
        $this.click(function(e) {
            e.preventDefault();
            $this.toggleClass('show-metric');
        });
    });
    
    // Enhanced spoiler blur with Animus effect
    $('.spoilerblur').each(function() {
        var $this = $(this);
        if (!$this.attr('data-tooltip')) {
            $this.attr('data-tooltip', 'ANIMUS: Click to decrypt');
        }
        
        // Add click functionality
        $this.click(function() {
            $this.addClass('revealed');
            // Add permanent reveal class
            setTimeout(function() {
                $this.css({
                    'filter': 'none',
                    'background': 'transparent'
                });
            }, 300);
        });
    });
    
    // Initialize first tab as active if none selected
    if ($('.tab-button.active').length === 0) {
        $('.tab-button:first').addClass('active');
        $('.tab-content:first').addClass('active');
    }
});

/* =====================================
   THE THIRD TENET - FINAL JAVASCRIPT
   Add to MediaWiki:Common.js
   ===================================== */

$(function() {
    // ===================
    // ANIMUS CLOCK
    // ===================
    function updateAnimusClock() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        var timeString = hours + ':' + minutes + ':' + seconds;
        
        $('.animus-clock').html('<span class="clock-time">' + timeString + '</span>');
    }
    
    // Add clock to header if it doesn't exist
    if ($('.animus-clock').length === 0) {
        $('.fandom-community-header__top-container').append('<div class="animus-clock"></div>');
    }
    
    // Update clock every second
    updateAnimusClock();
    setInterval(updateAnimusClock, 1000);
    
    // ===================
    // CHARACTER DATABASE FILTERING
    // ===================
    $('.faction-tab').click(function() {
        $('.faction-tab').removeClass('active');
        $(this).addClass('active');
        
        var faction = $(this).data('faction');
        
        if (faction === 'all') {
            $('.character-card').fadeIn(300);
        } else {
            $('.character-card').fadeOut(300);
            setTimeout(function() {
                $('.character-card[data-faction="' + faction + '"]').fadeIn(300);
            }, 300);
        }
    });
    
    // ===================
    // FACTION RECRUITMENT BUTTONS
    // ===================
    $('.assassin-join').click(function() {
        $(this).html('SYNCHRONIZING...');
        setTimeout(function() {
            alert('Welcome to the Brotherhood. We work in the dark to serve the light.');
            $('.assassin-join').html('INITIATED');
        }, 2000);
    });
    
    $('.templar-join').click(function() {
        $(this).html('PROCESSING...');
        setTimeout(function() {
            alert('Welcome to the Order. May the Father of Understanding guide you.');
            $('.templar-join').html('RECRUITED');
        }, 2000);
    });
    
    // ===================
    // MAIN PAGE ANIMATIONS
    // ===================
    // Synchronization bar animation on page load
    if ($('.sync-progress').length > 0) {
        setTimeout(function() {
            $('.sync-text').addClass('visible');
        }, 2000);
    }
    
    // ===================
    // CATEGORY PAGE ENHANCEMENTS
    // ===================
    // Add hover effects to category items
    $('.CategoryTreeItem').each(function() {
        var $this = $(this);
        var categoryName = $this.find('a').first().text();
        
        // Add faction indicators based on category name
        if (categoryName.includes('Assassin')) {
            $this.addClass('assassin-category');
        } else if (categoryName.includes('Templar')) {
            $this.addClass('templar-category');
        } else if (categoryName.includes('Isu')) {
            $this.addClass('isu-category');
        }
    });
    
    // ===================
    // PARALLAX EFFECTS
    // ===================
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        
        // Parallax for main page header
        $('.animus-welcome-header').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
        
        // Fade effect for ISU message
        var opacity = 1 - (scrolled / 800);
        $('.isu-message').css('opacity', opacity);
    });
    
    // ===================
    // CHARACTER CARD LOADING
    // ===================
    // Extract faction from categories
    $('.character-card').each(function() {
        var $card = $(this);
        var link = $card.find('a').attr('href');
        
        // AJAX request to get character categories
        $.ajax({
            url: '/api.php',
            data: {
                action: 'query',
                titles: decodeURIComponent(link.split('/wiki/')[1]),
                prop: 'categories',
                format: 'json'
            },
            success: function(data) {
                var pages = data.query.pages;
                for (var pageId in pages) {
                    var categories = pages[pageId].categories || [];
                    categories.forEach(function(cat) {
                        if (cat.title.includes('Assassins')) {
                            $card.attr('data-faction', 'assassin');
                        } else if (cat.title.includes('Templars')) {
                            $card.attr('data-faction', 'templar');
                        } else if (cat.title.includes('Isu')) {
                            $card.attr('data-faction', 'isu');
                        }
                    });
                }
            }
        });
    });
    
    // ===================
    // WIKIA BAR ENHANCEMENTS
    // ===================
    // Add Animus effect to WikiaBar on hover
    $('#WikiaBar').hover(
        function() {
            $(this).addClass('animus-active');
        },
        function() {
            $(this).removeClass('animus-active');
        }
    );
    
    // ===================
    // EASTER EGG: KONAMI CODE
    // ===================
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;
    
    $(document).keydown(function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                $('body').addClass('assassin-mode');
                setTimeout(function() {
                    alert('Nothing is True, Everything is Permitted');
                    $('body').removeClass('assassin-mode');
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });