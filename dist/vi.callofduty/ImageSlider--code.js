$(document).ready(function() {
    $('.custom-fandom-slider').each(function() {
        var $slider = $(this);
        var $mainImgContainer = $slider.find('.slider-main-image');
        var $firstThumb = $slider.find('.slider-thumb-item').first();
        
        // Tự động hiển thị ảnh đầu tiên khi tải trang
        if ($firstThumb.length > 0) {
            var firstImgSrc = $firstThumb.find('img').attr('src');
            if (firstImgSrc) {
                // Xóa bỏ thông số thu nhỏ để lấy ảnh phân giải cao
                var highResSrc = firstImgSrc.split('/revision/')[0] + '/revision/latest';
                $mainImgContainer.html('<img src="' + highResSrc + '" style="max-width:100%; max-height:100%; object-fit:contain;" />');
            }
        }
        
        // Xử lý sự kiện click vào các ảnh thumbnail khác
        $slider.find('.slider-thumb-item').on('click', function() {
            var $this = $(this);
            
            // Đổi viền vàng và độ mờ
            $slider.find('.slider-thumb-item').css({
                'border': '2px solid transparent',
                'opacity': '0.5'
            });
            $this.css({
                'border': '2px solid #ffcc00',
                'opacity': '1'
            });
            
            // Lấy link ảnh sắc nét từ thumbnail được bấm
            var thumbSrc = $this.find('img').attr('src');
            if (thumbSrc) {
                var fullSrc = thumbSrc.split('/revision/')[0] + '/revision/latest';
                $mainImgContainer.html('<img src="' + fullSrc + '" style="max-width:100%; max-height:100%; object-fit:contain;" />');
            }
        });
    });
});