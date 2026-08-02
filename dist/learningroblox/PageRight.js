/* =======================================================
   ROBLOX TOC LOGIC (SCROLL SPY & CLICK)
   ======================================================= */
$(function() {
    if (mw.config.get('wgIsArticle') && mw.config.get('wgAction') === 'view') {
        if ($(window).width() < 1024) return; // Chỉ chạy trên máy tính

        var $rightRail = $('.page__right-rail, #right-nav').first();
        if (!$rightRail.length) return;

        // 1. Quét tìm H2, H3, H4, H5
        var $headings = $('.mw-parser-output').find('h2, h3, h4');
        if ($headings.length < 2) return;

        // Xóa TOC cũ (nếu có) để tránh trùng lặp
        $('.rbx-toc-container').remove();

        // Xây dựng khung HTML
        var $toc = $('<div class="rbx-toc-container"></div>');
        $toc.append('<div class="rbx-toc-header">ON THIS PAGE</div>');
        var $list = $('<div class="rbx-toc-list"></div>');
        $toc.append($list);

        // ĐÂY LÀ BIẾN KHÓA ĐỂ TRÁNH XUNG ĐỘT GIỮA CLICK VÀ SCROLL
        var isClickScrolling = false; 

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

            // 2. Lấy cấp độ thẻ H hiện tại (h2, h3, h4, h5)
            var tag = el.tagName.toLowerCase(); 
            var currentLevel = parseInt(tag.charAt(1)); // Lấy số 2, 3, 4, hoặc 5

            // 3. KIỂM TRA: Xem thẻ tiếp theo có phải thẻ con không (level lớn hơn)
            var hasChild = false;
            var $nextHeading = $headings.eq(i + 1);
            if ($nextHeading.length) {
                var nextTag = $nextHeading.prop('tagName').toLowerCase();
                var nextLevel = parseInt(nextTag.charAt(1));
                if (nextLevel > currentLevel) {
                    hasChild = true; // Nếu đang là H2 mà thẻ tiếp là H3, H4... thì tính là có thẻ con
                }
            }

            // Tạo thẻ A chứa cả dòng - Tự động tạo class h2-item, h3-item, h4-item, h5-item
            var $item = $('<a>', {
                href: '#' + id,
                class: 'rbx-toc-item ' + tag + '-item', 
                'data-id': id
            });

            // Chữ bên trái
            $item.append($('<span>', { text: text }));

            // Dấu mũi tên (Gắn cho bất kỳ thẻ nào có thẻ con)
            if (hasChild) {
                var $icon = $('<span class="rbx-toc-icon"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></span>');
                $item.append($icon);
            }

            $list.append($item);
        });

        // Chèn vào đầu cột bên phải
        $rightRail.prepend($toc);

        // CẢI TIẾN LẠI SỰ KIỆN CLICK
        $toc.on('click', '.rbx-toc-item', function(e) {
            e.preventDefault();
            
            // 1. Tạm thời khóa chức năng lăn chuột (Scroll Spy)
            isClickScrolling = true;

            // 2. Ép mục vừa click sáng lên NGAY LẬP TỨC
            $('.rbx-toc-item').removeClass('active-pill');
            $(this).addClass('active-pill');

            // 3. Cuộn trang mượt mà
            var targetId = $(this).attr('href');
            $('html, body').stop().animate({
                scrollTop: $(targetId).offset().top - 80
            }, 300).promise().done(function() {
                // 4. Mở khóa lại Scroll Spy sau khi đã cuộn xong (sau 300ms)
                isClickScrolling = false;
            });
        });

        // (4) SCROLL SPY: Lăn chuột đến đâu, sáng kén đến đó
        $(window).on('scroll.rbxToc', function() {
            // NẾU ĐANG CUỘN BẰNG CLICK CHUỘT THÌ BỎ QUA KHÔNG QUÉT NỮA
            if (isClickScrolling) return; 

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