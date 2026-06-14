/* ── Slider ── */
$(document).ready(function() {
    var slider = $('[id="barf-slider"]');
    if (slider.length === 0) return;
    var slides = slider.find('[id^="barf-slide-"]');
    var dots = $('[id^="barf-dot-"]');
    var total = slides.length;
    var current = 0;
    if (total === 0) return;
    slides.hide();
    slides.eq(0).show();
    dots.eq(0).css('background', '#f5d06e');
    function goTo(n) {
        slides.eq(current).hide();
        dots.eq(current).css('background', '#8B6914');
        current = (n + total) % total;
        slides.eq(current).show();
        dots.eq(current).css('background', '#f5d06e');
    }
    $('[id="barf-next"]').on('click', function() { goTo(current + 1); });
    $('[id="barf-prev"]').on('click', function() { goTo(current - 1); });
    dots.on('click', function() { goTo($(this).index()); });
    setInterval(function() { goTo(current + 1); }, 5000);
});

/* ── Copy Button + Rarity Filter ── */
mw.hook('wikipage.content').add(function($content) {

    /* ── Copy Code Button ── */
    $content.on('click', '[id^="copy-btn-"], [id^="copy-ctcb-"]', function() {
        var btn = $(this);
        if (btn.data('copied')) return;
        var code = btn.text().trim();
        function onSuccess() {
            btn.data('copied', true).text('Copied!').css('color', '#2ecc71');
            setTimeout(function() {
                btn.data('copied', false).text('Copy').css('color', '#f5d06e');
            }, 2000);
        }
        function onFail() {
            btn.text('Failed!');
            setTimeout(function() { btn.text('Copy'); }, 2000);
        }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(onSuccess).catch(function() {
                fallbackCopy(code, onSuccess, onFail);
            });
        } else {
            fallbackCopy(code, onSuccess, onFail);
        }
    });

    function fallbackCopy(code, onSuccess, onFail) {
        var temp = $('<textarea>').css({
            position: 'fixed', top: 0, left: 0,
            opacity: 0, pointerEvents: 'none'
        });
        $('body').append(temp);
        temp.val(code).focus().select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch(e) {
            onFail();
        }
        temp.remove();
    }

    /* ── Plant Rarity Filter ── */
    $content.on('click', '[id^="pf-"]', function() {
        var btn = $(this);
        var rarity = btn.attr('id').replace('pf-', '');
        $content.find('[id^="pf-"]').css({
            'border': '1px solid #8B5e1a',
            'color': '#e8d5a3'
        });
        btn.css({
            'border': '2px solid #4caf50',
            'color': '#4caf50'
        });
        if (rarity === 'all') {
            $content.find('[id^="pc-"]').show();
        } else {
            $content.find('[id^="pc-"]').each(function() {
                var id = $(this).attr('id');
                id && id.indexOf('pc-' + rarity) === 0 ? $(this).show() : $(this).hide();
            });
        }
    });

});


$(document).ready(function() {
    var slider = $('.barf-slider');
    if (slider.length === 0) return;

    var slides = slider.find('.barf-slide');
    var dots = $('.barf-dot');
    var total = slides.length;
    var current = 0;

    if (total === 0) return;

    // Hide all then show first
    slides.hide();
    slides.eq(0).show();
    dots.eq(0).addClass('active');

    function goTo(n) {
        slides.eq(current).hide();
        dots.eq(current).removeClass('active');
        current = (n + total) % total;
        slides.eq(current).show();
        dots.eq(current).addClass('active');
    }

    $('.barf-next').on('click', function() { goTo(current + 1); });
    $('.barf-prev').on('click', function() { goTo(current - 1); });
    dots.on('click', function() { goTo($(this).index()); });

    setInterval(function() { goTo(current + 1); }, 5000);
});

//copyable
/* ── Copy Code Button ── */
mw.hook('wikipage.content').add(function($content) {
    $content.on('click', '.copy-btn', function() {
        var btn = $(this);
        if (btn.hasClass('copied')) return;
        var code = btn.attr('data-code');

        function onSuccess() {
            btn.text('Copied!').addClass('copied');
            setTimeout(function() {
                btn.text('Copy').removeClass('copied');
            }, 2000);
        }

        function onFail() {
            btn.text('Failed!');
            setTimeout(function() { btn.text('Copy'); }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(onSuccess).catch(function() {
                fallbackCopy(code, onSuccess, onFail);
            });
        } else {
            fallbackCopy(code, onSuccess, onFail);
        }
    });

    function fallbackCopy(code, onSuccess, onFail) {
        var temp = $('<textarea>').css({
            position: 'fixed', top: 0, left: 0,
            opacity: 0, pointerEvents: 'none'
        });
        $('body').append(temp);
        temp.val(code).focus().select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch(e) {
            onFail();
        }
        temp.remove();
    }
});

/* === Next Update Countdown Timer === */
mw.hook('wikipage.content').add(function() {
    function initCountdown() {
        var el = document.getElementById('update-countdown');
        if (!el) return;

        var INTERVAL_DAYS = 7;
        var START = new Date('2026-06-13T22:00:00');

        function getNextDate() {
            var now = new Date();
            var elapsed = now - START;
            var intervalMs = INTERVAL_DAYS * 24 * 60 * 60 * 1000;
            var cyclesPassed = Math.floor(elapsed / intervalMs);
            return new Date(START.getTime() + (cyclesPassed + 1) * intervalMs);
        }

        function formatDate(d) {
            var months = ['January','February','March','April','May','June',
                          'July','August','September','October','November','December'];
            return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        }

        function tick() {
            var now = new Date();
            var next = getNextDate();
            var diff = next - now;
            var dateEl = document.getElementById('ucd-next-date');
            if (dateEl) dateEl.textContent = formatDate(next);
            var timerEl = document.getElementById('ucd-timer');
            if (!timerEl) return;
            if (diff <= 0) {
                timerEl.innerHTML = '<span class="ucd-num">Update is live!</span>';
                return;
            }
            var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
            var minutes = Math.floor((diff / (1000 * 60)) % 60);
            var seconds = Math.floor((diff / 1000) % 60);
            var parts = [];
            if (days > 0)    parts.push('<span class="ucd-num">' + days + '</span> ' + (days === 1 ? 'day' : 'days'));
            if (hours > 0)   parts.push('<span class="ucd-num">' + hours + '</span> ' + (hours === 1 ? 'hour' : 'hours'));
            if (minutes > 0) parts.push('<span class="ucd-num">' + minutes + '</span> ' + (minutes === 1 ? 'minute' : 'minutes'));
            parts.push('<span class="ucd-num">' + seconds + '</span> ' + (seconds === 1 ? 'second' : 'seconds'));
            timerEl.innerHTML = parts.join(', ');
        }

        el.innerHTML =
            '<div class="ucd-wrap">' +
                '<div class="ucd-label">Next Update begins in:</div>' +
                '<div class="ucd-timer" id="ucd-timer">Loading...</div>' +
                '<div class="ucd-date">Next update date: <span id="ucd-next-date">\u2014</span></div>' +
            '</div>';

        tick();
        setInterval(tick, 1000);
    }

    setTimeout(initCountdown, 500);
});


var el = document.getElementById('update-countdown');