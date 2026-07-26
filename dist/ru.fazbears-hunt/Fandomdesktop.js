
// ===== ЧАСТИЦЫ ПЫЛИ, ПЛАВАЮЩИЕ ПО СТРАНИЦЕ =====
$(document).ready(function() {
    var dustContainer = $('<div id="dust-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;"></div>');
    $('body').append(dustContainer);

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function animateParticle(particle) {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var targetX = randomRange(0, w);
        var targetY = randomRange(0, h);
        var duration = randomRange(15000, 35000);
        var opacity = randomRange(0.1, 0.4);

        particle.css('opacity', 0);

        particle.animate({
            opacity: opacity
        }, 3000);

        particle.animate({
            left: targetX + 'px',
            top: targetY + 'px'
        }, {
            duration: duration,
            easing: 'linear',
            complete: function() {
                animateParticle(particle);
            }
        });

        setTimeout(function() {
            particle.animate({ opacity: 0 }, 3000);
        }, duration - 3000);
    }

    function createDust() {
        var size = randomRange(1, 4);
        var startX = randomRange(0, window.innerWidth);
        var startY = randomRange(0, window.innerHeight);

        var particle = $('<div></div>').css({
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(200, 80, 80, 1)',
            borderRadius: '50%',
            left: startX + 'px',
            top: startY + 'px',
            boxShadow: '0 0 ' + (size * 2) + 'px rgba(200, 80, 80, 0.5)',
            opacity: 0
        });

        dustContainer.append(particle);
        animateParticle(particle);
    }

    for (var i = 0; i < 35; i++) {
        createDust();
    }
});

// ===== ИСКРЫ ПО УГЛАМ ИНФОБОКСА =====
$(document).ready(function() {
    $('.ib').each(function() {
        var ib = $(this);
        var corners = [
            { top: '2px', left: '2px' },
            { top: '2px', right: '2px' },
            { bottom: '2px', left: '2px' },
            { bottom: '2px', right: '2px' }
        ];

        corners.forEach(function(pos) {
            var spark = $('<div></div>').css($.extend({
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: '#ff6060',
                borderRadius: '50%',
                boxShadow: '0 0 6px 2px rgba(255, 96, 96, 0.8)',
                opacity: 0,
                zIndex: 10
            }, pos));

            ib.css('position', 'relative');
            ib.append(spark);

            function flicker() {
                var delay = Math.random() * 4000 + 1000;
                setTimeout(function() {
                    spark.css('opacity', 1);
                    setTimeout(function() {
                        spark.css('opacity', 0);
                        flicker();
                    }, Math.random() * 200 + 80);
                }, delay);
            }
            flicker();
        });
    });
});

// ===== ГЛИТЧ-ТЕКСТ =====
$(document).ready(function() {
    var glitchChars = '!<>-_\\/[]{}—=+*^?#________ЖЩЭЪФЫВАПРОЛДЖЭ01';

    function randomChar() {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }

    $('.glitch-text').each(function() {
        var el = $(this);
        var originalText = el.text();
        var chars = originalText.split('');

        function glitchCycle() {
            var glitchedText = chars.map(function(char) {
                if (char === ' ') return ' ';
                if (Math.random() < 0.25) {
                    return randomChar();
                }
                return char;
            }).join('');

            el.text(glitchedText);
            setTimeout(glitchCycle, 60);
        }

        glitchCycle();
    });
});

// ===== ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ПЛАНШЕТА ГОЛДЕН ФРЕДДИ =====
$(document).ready(function() {
    $('.gf-tablet').each(function() {
        var tablet = $(this);
        var screens = tablet.find('.gf-screen');
        var current = 0;

        function showScreen(index) {
            screens.removeClass('gf-active');
            screens.eq(index).addClass('gf-active');
        }

        tablet.find('.gf-next').on('click', function() {
            current = (current + 1) % screens.length;
            showScreen(current);
        });

        tablet.find('.gf-prev').on('click', function() {
            current = (current - 1 + screens.length) % screens.length;
            showScreen(current);
        });
    });
});