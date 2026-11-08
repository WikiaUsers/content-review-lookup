$(document).ready(function() {
    function initSliders() {
        $('.custom-fandom-slider').each(function() {
            var $slider = $(this);
            var $mainImgContainer = $slider.find('.slider-main-image');
            var $firstThumb = $slider.find('.slider-thumb-item').first();
            
            // Kiểm tra nếu khung lớn đang trống hoặc chưa có ảnh thì ép load ảnh đầu tiên ngay lập tức
            if ($mainImgContainer.is(':empty') || $mainImgContainer.find('img').length === 0) {
                if ($firstThumb.length > 0) {
                    var firstImgSrc = $firstThumb.find('img').attr('src');
                    if (firstImgSrc) {
                        var highResSrc = firstImgSrc.split('/revision/')[0] + '/revision/latest';
                        $mainImgContainer.html('<img src="' + highResSrc + '" style="max-width:100%; max-height:100%; object-fit:contain;" />');
                        // Đặt viền vàng cho thumbnail đầu tiên
                        $slider.find('.slider-thumb-item').css({ 'border': '2px solid transparent', 'opacity': '0.5' });
                        $firstThumb.css({ 'border': '2px solid #ffcc00', 'opacity': '1' });
                    }
                }
            }
            
            // Xử lý sự kiện click chuyển ảnh mượt mà (tránh gán trùng sự kiện nhiều lần)
            if (!$slider.data('click-bound')) {
                $slider.data('click-bound', true);
                $slider.on('click', '.slider-thumb-item', function() {
                    var $this = $(this);
                    $slider.find('.slider-thumb-item').css({ 'border': '2px solid transparent', 'opacity': '0.5' });
                    $this.css({ 'border': '2px solid #ffcc00', 'opacity': '1' });
                    
                    var thumbSrc = $this.find('img').attr('src');
                    if (thumbSrc) {
                        var fullSrc = thumbSrc.split('/revision/')[0] + '/revision/latest';
                        $mainImgContainer.html('<img src="' + fullSrc + '" style="max-width:100%; max-height:100%; object-fit:contain;" />');
                    }
                });
            }
        });
    }

    // Chạy khi trang vừa tải xong
    initSliders();

    // Tự động kích hoạt lại khi người dùng bấm chuyển tab trên Fandom
    $(document).on('click', '.wds-tabs__tab, .tabber__header button, .category-gallery', function() {
        setTimeout(initSliders, 150);
    });
});