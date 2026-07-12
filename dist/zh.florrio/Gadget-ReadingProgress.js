/* ==================== 阅读进度条 ==================== */
$(function () {
    // 插入进度条 DOM
    $('body').prepend('<div id="reading-progress-bar"></div>');

    var $bar = $('#reading-progress-bar');
    var $win = $(window);
    var $doc = $(document);

    function updateProgress() {
        var scrollTop = $win.scrollTop();
        var docHeight = $doc.height();
        var winHeight = $win.height();
        var total = docHeight - winHeight;
        var progress = total > 0 ? (scrollTop / total) * 100 : 0;
        $bar.css('width', progress + '%');
    }

    $win.on('scroll resize', updateProgress);
    updateProgress();
});