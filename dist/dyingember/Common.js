/* ===== Dying Ember Wiki - 通用轮播图脚本 ===== */
/* 本代码可直接放入 MediaWiki:Common.js 或个人JS页中 */

mw.loader.using('jquery', function () {
  $(function () {
    $('.custom-carousel').each(function () {
      const $carousel = $(this);
      const $track = $carousel.find('.carousel-track');
      const $items = $carousel.find('.carousel-item');
      const $prev = $carousel.find('.carousel-btn.left');
      const $next = $carousel.find('.carousel-btn.right');
      const $dotsContainer = $carousel.find('.carousel-dots');
      const total = $items.length;
      let index = 0;
      const interval = parseInt($carousel.data('autoplay') || 5000, 10);

      if (total <= 1) return; // 只有一张图则不启用轮播

      // 创建圆点
      $dotsContainer.empty();
      for (let i = 0; i < total; i++) {
        const $dot = $('<button>').on('click', function () {
          goTo(i);
          resetAuto();
        });
        if (i === 0) $dot.addClass('active');
        $dotsContainer.append($dot);
      }
      const $dots = $dotsContainer.find('button');

      // 跳转函数
      function goTo(i) {
        index = (i + total) % total;
        const x = -index * 100;
        $track.css({
          transform: `translateX(${x}%)`,
          transition: 'transform 0.6s ease'
        });
        $dots.removeClass('active').eq(index).addClass('active');
      }

      // 左右按钮
      $prev.on('click', function () {
        goTo(index - 1);
        resetAuto();
      });
      $next.on('click', function () {
        goTo(index + 1);
        resetAuto();
      });

      // 自动播放
      let timer = null;
      function startAuto() {
        if (interval > 0) {
          timer = setInterval(function () {
            goTo(index + 1);
          }, interval);
        }
      }
      function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
      }
      function resetAuto() {
        stopAuto();
        startAuto();
      }

      // 悬停暂停
      $carousel.on('mouseenter', stopAuto);
      $carousel.on('mouseleave', startAuto);

      // 初始化
      $track.css('width', `${100 * total}%`);
      $items.css('width', `${100 / total}%`);
      goTo(0);
      startAuto();
    });
  });
});