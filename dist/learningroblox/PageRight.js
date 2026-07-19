/* =======================================================
   ROBLOX TOC LOGIC (SCROLL SPY & CLICK)
   ======================================================= */
$(function() {
    if (mw.config.get('wgIsArticle') && mw.config.get('wgAction') === 'view') {
        if ($(window).width() < 1024) return; // Chỉ chạy trên máy tính

        var $rightRail = $('.page__right-rail, #right-nav').first();
        if (!$rightRail.length) return;

        // Quét tìm H2, H3
        var $headings = $('.mw-parser-output').find('h2, h3');
        if ($headings.length < 2) return;

        // Xóa TOC cũ (nếu có) để tránh trùng lặp
        $('.rbx-toc-container').remove();

        // Xây dựng khung HTML
        var $toc = $('<div class="rbx-toc-container"></div>');
        $toc.append('<div class="rbx-toc-header">ON THIS PAGE</div>');
        var $list = $('<div class="rbx-toc-list"></div>');
        $toc.append($list);

        $headings.each(function(i, el) {
            var $h = $(el);
            // Lấy ID thẻ để nhảy trang
            var id = $h.attr('id') || $h.find('.mw-headline').attr('id');
            if (!id) {
                id = 'rbx-heading-' + i;
                $h.attr('id', id);
            }

            // Lấy chữ
            var text = $h.find('.mw-headline').text() || $h.text();
            text = text.replace(/\[edit\]/g, '').trim();

            var isH2 = el.tagName.toLowerCase() === 'h2';

            // Tạo thẻ A chứa cả dòng
            var $item = $('<a>', {
                href: '#' + id,
                class: 'rbx-toc-item ' + (isH2 ? 'h2-item' : 'h3-item'),
                'data-id': id
            });

            // Chữ bên trái
            $item.append($('<span>', { text: text }));

            // Dấu mũi tên V bên phải (chỉ gán cho thẻ H2)
            if (isH2) {
                var $icon = $('<span class="rbx-toc-icon"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></span>');
                $item.append($icon);
            }

            $list.append($item);
        });

        // Chèn vào đầu cột bên phải
        $rightRail.prepend($toc);

        // Click để cuộn trang mượt mà
        $toc.on('click', '.rbx-toc-item', function(e) {
            e.preventDefault();
            var targetId = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(targetId).offset().top - 80
            }, 300);
        });

        // (4) SCROLL SPY: Lăn chuột đến đâu, sáng kén đến đó
        $(window).on('scroll.rbxToc', function() {
            var scrollPos = $(window).scrollTop() + 100; // Đo khoảng cách cuộn
            var activeId = null;

            $headings.each(function() {
                if ($(this).offset().top <= scrollPos) {
                    activeId = $(this).attr('id');
                }
            });

            if (activeId) {
                // Tắt sáng cái cũ, bật sáng cái mới
                $('.rbx-toc-item').removeClass('active-pill');
                $('.rbx-toc-item[data-id="' + activeId + '"]').addClass('active-pill');
            }
        });
        
        // Chạy kiểm tra 1 lần lúc vừa load trang xong
        $(window).trigger('scroll.rbxToc');
    }
});