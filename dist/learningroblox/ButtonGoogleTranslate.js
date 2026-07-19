$(document).ready(function() {
    if ($('#custom-translate-button').length) return;

    // 1. Danh sách ngôn ngữ giống hệt Fandom gốc
    var languages = [
        { name: 'English', code: 'en' },
        { name: 'Tiếng Việt', code: 'vi' },
    ];

    // 2. Phân tích URL hiện tại để xem trang đang ở ngôn ngữ nào
    var currentPath = window.location.pathname; // Ví dụ: /wiki/Overview-Instance_streaming hoặc /vi/wiki/...
    var pathSegments = currentPath.split('/').filter(Boolean);
    
    var currentCode = 'en'; // Mặc định là tiếng Anh nếu không có tiền tố
    var pageNamePath = currentPath;

    // Kiểm tra xem đoạn đầu tiên của URL có trùng với mã ngôn ngữ nào không
    var isSubLang = languages.some(function(lang) {
        return lang.code === pathSegments[0] && lang.code !== 'en';
    });

    if (isSubLang) {
        currentCode = pathSegments[0];
        // Lấy phần còn lại của URL sau mã ngôn ngữ (ví dụ: /wiki/Overview-Instance_streaming)
        pageNamePath = '/' + pathSegments.slice(1).join('/');
    }

    // Tìm tên hiển thị tương ứng
    var currentLangObj = languages.find(function(l) { return l.code === currentCode; });
    var currentName = currentLangObj ? currentLangObj.name : 'English';

    // 3. Tạo cấu trúc HTML cho Menu
    var $langWrapper = $('<div class="custom-lang-dropdown"></div>');
    var $btn = $(
        '<button id="custom-translate-button" type="button">' +
        '<span class="lang-current">' + currentName + '</span>' +
        '<svg class="lang-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.07 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>' +
        '</button>'
    );
    
    var $dropdown = $('<div class="custom-lang-menu"></div>');
    $dropdown.append('<div class="custom-lang-header">Select language - Beta</div>');
    var $list = $('<div class="custom-lang-list"></div>');
    
    languages.forEach(function(lang) {
        $list.append('<div class="custom-lang-item" data-code="' + lang.code + '">' + lang.name + '</div>');
    });
    
    $dropdown.append($list);
    $langWrapper.append($btn).append($dropdown);

    // 4. Đẩy menu vào thanh công cụ của Fandom
    var $targetContainer = $('.page-header__actions, .page-header__buttons');
    if ($targetContainer.length) {
        $targetContainer.prepend($langWrapper);
    }

    // 5. Sự kiện Ẩn/Hiện danh sách
    $btn.on('click', function(e) {
        e.stopPropagation();
        $langWrapper.toggleClass('is-active');
    });

    $(document).on('click', function() {
        $langWrapper.removeClass('is-active');
    });

    // 6. XỬ LÝ ĐỔI URL THEO NƯỚC: Khi click sẽ tự loading chuyển sang tên miền ngôn ngữ đó
    $dropdown.on('click', '.custom-lang-item', function() {
        var targetCode = $(this).data('code');
        if (targetCode === currentCode) return; // Nếu chọn ngôn ngữ hiện tại thì không làm gì

        var newUrl = window.location.origin;

        if (targetCode === 'en') {
            // Tiếng Anh gốc: Không cần tiền tố đường dẫn
            newUrl += pageNamePath;
        } else {
            // Các ngôn ngữ khác: Thêm /vi/, /id/, /de/ vào trước /wiki/...
            newUrl += '/' + targetCode + pageNamePath;
        }

        // Giữ lại các tham số tìm kiếm (?...) hoặc thẻ neo (#...) nếu có
        newUrl += window.location.search + window.location.hash;

        // Tiến hành Loading và chuyển hướng trang sang URL mới
        window.location.href = newUrl;
    });
});