/* Tekkit Classic Reloaded Wiki Custom JavaScript */

/* Auto-collapse/expand sections */
$(document).ready(function() {
    // Add collapse buttons to large sections
    $('h2').each(function() {
        var $header = $(this);
        var $content = $header.nextUntil('h2');
        
        if ($content.length > 5) { // Only add to sections with substantial content
            $header.css('cursor', 'pointer')
                   .append(' <span class="collapse-toggle">[hide]</span>')
                   .data('collapsed', false);
                   
            $header.click(function() {
                var $toggle = $(this).find('.collapse-toggle');
                var collapsed = $(this).data('collapsed');
                
                if (collapsed) {
                    $content.slideDown(300);
                    $toggle.text('[hide]');
                    $(this).data('collapsed', false);
                } else {
                    $content.slideUp(300);
                    $toggle.text('[show]');
                    $(this).data('collapsed', true);
                }
            });
        }
    });
});

/* Enhanced search functionality */
$(document).ready(function() {
    // Add quick search for mod pages
    if ($('#tcr-mod-search').length === 0 && window.location.pathname.includes('Mod_List')) {
        $('#mw-content-text').prepend(
            '<div id="tcr-mod-search" style="margin: 20px 0; padding: 15px; background: #f9f9f9; border: 2px solid #2e0054; border-radius: 6px;">' +
            '<strong>Quick Mod Search:</strong> ' +
            '<input type="text" id="mod-search-input" placeholder="Type mod name..." style="width: 300px; padding: 5px; margin-left: 10px;">' +
            '</div>'
        );
        
        $('#mod-search-input').on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase();
            $('.wikitable tr').each(function() {
                var rowText = $(this).text().toLowerCase();
                if (rowText.includes(searchTerm) || searchTerm === '') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }
});

/* Automatic table of contents enhancement */
$(document).ready(function() {
    // Enhance TOC with better styling
    $('#toc').addClass('tcr-enhanced-toc');
    
    // Add smooth scrolling to TOC links
    $('#toc a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
});

/* Copy code blocks functionality */
$(document).ready(function() {
    $('pre').each(function() {
        var $pre = $(this);
        var $button = $('<button class="copy-code-btn">Copy</button>');
        $button.css({
            'position': 'absolute',
            'top': '5px',
            'right': '5px',
            'background': '#ff7f00',
            'color': 'white',
            'border': 'none',
            'padding': '5px 10px',
            'border-radius': '3px',
            'font-size': '12px',
            'cursor': 'pointer'
        });
        
        $pre.css('position', 'relative').append($button);
        
        $button.click(function() {
            var text = $pre.text();
            navigator.clipboard.writeText(text).then(function() {
                $button.text('Copied!').css('background', '#28a745');
                setTimeout(function() {
                    $button.text('Copy').css('background', '#ff7f00');
                }, 2000);
            });
        });
    });
});

/* Auto-update last modified timestamps */
$(document).ready(function() {
    $('.last-modified').each(function() {
        var $elem = $(this);
        var timestamp = $elem.data('timestamp');
        if (timestamp) {
            var date = new Date(timestamp);
            var now = new Date();
            var diff = now - date;
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (days === 0) {
                $elem.text('Updated today');
            } else if (days === 1) {
                $elem.text('Updated yesterday');
            } else {
                $elem.text('Updated ' + days + ' days ago');
            }
        }
    });
});

/* Enhanced image gallery */
$(document).ready(function() {
    $('.gallery img').click(function() {
        var src = $(this).attr('src');
        var alt = $(this).attr('alt');
        
        var modal = $('<div class="tcr-image-modal">')
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': 'rgba(0,0,0,0.8)',
                'z-index': '9999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center'
            });
            
        var img = $('<img>')
            .attr('src', src)
            .attr('alt', alt)
            .css({
                'max-width': '90%',
                'max-height': '90%',
                'border-radius': '8px'
            });
            
        modal.append(img);
        $('body').append(modal);
        
        modal.click(function() {
            modal.remove();
        });
    });
});

/* Performance monitoring */
window.addEventListener('load', function() {
    setTimeout(function() {
        if (window.performance && window.performance.timing) {
            var loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log('TCR Wiki load time: ' + loadTime + 'ms');
            
            // Log slow pages for optimization
            if (loadTime > 3000) {
                console.warn('Slow page load detected: ' + window.location.pathname);
            }
        }
    }, 0);
});