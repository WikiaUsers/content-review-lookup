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