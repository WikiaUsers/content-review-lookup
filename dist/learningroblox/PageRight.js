/* =======================================================
   ROBLOX TOC LOGIC - CHỈ QUÉT THẺ H2, H3, H4 CÓ ID
   ======================================================= */
$(function() {
    if (mw.config.get('wgIsArticle') && mw.config.get('wgAction') === 'view') {
        if ($(window).width() < 1024) return; 

        var $rightRail = $('.page__right-rail, #right-nav').first();
        if (!$rightRail.length) return;

        // Chỉ quét các thẻ h2, h3, h4 bắt buộc phải có thuộc tính id=""
        var $headings = $('.mw-parser-output').find('h2[id], h3[id], h4[id]').filter(function() {
            var $h = $(this);
            if (!$h.is(':visible')) return false;
            if ($h.closest('#toc, .toc, .portable-infobox, .navbox, table, .gallery, .thumb').length > 0) return false;
            return true;
        });
        
        if ($headings.length < 2) return;

        $('.rbx-toc-container').remove();

        var $toc = $('<div class="rbx-toc-container"></div>');
        $toc.append('<div class="rbx-toc-header">ON THIS PAGE</div>');
        var $list = $('<div class="rbx-toc-list"></div>');
        $toc.append($list);

        var isClickScrolling = false; 

        $headings.each(function(i, el) {
            var $h = $(el);
            var id = $h.attr('id');
            var text = $h.find('.mw-headline').length ? $h.find('.mw-headline').text() : $h.text();
            text = text.replace(/\[edit\]/g, '').trim();

            var tag = el.tagName.toLowerCase(); 
            var currentLevel = parseInt(tag.charAt(1));

            var hasChild = false;
            var $nextHeading = $headings.eq(i + 1);
            if ($nextHeading.length) {
                var nextTag = $nextHeading.prop('tagName').toLowerCase();
                var nextLevel = parseInt(nextTag.charAt(1));
                if (nextLevel > currentLevel) {
                    hasChild = true;
                }
            }

            var $item = $('<a>', {
                href: '#' + id,
                class: 'rbx-toc-item ' + tag + '-item', 
                'data-id': id
            });

            $item.append($('<span>', { text: text }));

            if (hasChild) {
                var $icon = $('<span class="rbx-toc-icon"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></span>');
                $item.append($icon);
            }

            $list.append($item);
        });

        $rightRail.prepend($toc);

        $toc.on('click', '.rbx-toc-item', function(e) {
            e.preventDefault();
            isClickScrolling = true;

            $('.rbx-toc-item').removeClass('active-pill');
            $(this).addClass('active-pill');

            var rawId = $(this).attr('data-id'); 
            var targetElement = document.getElementById(rawId);
            
            if (history.pushState) {
                history.pushState(null, null, '#' + rawId);
            } else {
                window.location.hash = '#' + rawId;
            }

            if (targetElement) {
                $('html, body').stop().animate({
                    scrollTop: $(targetElement).offset().top - 80
                }, 300).promise().done(function() {
                    isClickScrolling = false;
                });
            }
        });

        $(window).on('scroll.rbxToc', function() {
            if (isClickScrolling) return; 

            var scrollPos = $(window).scrollTop() + 100;
            var activeId = null;

            $headings.each(function() {
                var currentId = this.id; 
                var elDOM = document.getElementById(currentId); 
                
                if (elDOM && $(elDOM).offset().top <= scrollPos) {
                    activeId = currentId;
                }
            });

            if (activeId) {
                $('.rbx-toc-item').removeClass('active-pill');
                $('.rbx-toc-item[data-id="' + activeId + '"]').addClass('active-pill');
            }
        });
        
        $(window).trigger('scroll.rbxToc');
    }
});