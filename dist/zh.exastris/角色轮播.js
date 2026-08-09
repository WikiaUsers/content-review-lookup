/* ===== 角色轮播 - 从 data 属性读取数据 ===== */
(function () {
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function initCarousel() {
    var c = document.getElementById('roleCarouselApp');
    if (!c || !c.dataset.roles) return;

    // 从页面 data-roles 属性解析数据
    var DATA = JSON.parse(c.dataset.roles);
    var cats = Object.keys(DATA);
    var cat = cats[0];
    var idx = 0;

    // 工具函数
    function img(r) {
      return r.f ? '/zh/wiki/Special:FilePath/' + encodeURIComponent(r.f) : null;
    }

    function url(r) {
      return '/zh/wiki/' + encodeURIComponent(r.p);
    }

    function render() {
      var roles = DATA[cat];
      var total = roles.length;

      // 分类标签
      var tabs = cats.map(function (k) {
        return '<span class="ct' + (k === cat ? ' on' : '') + '" data-k="' + escapeHtml(k) + '">' + escapeHtml(k) + '</span>';
      }).join('');

      // 卡片（显示前后各两张，共五张）
      var cards = '';
      for (var i = -2; i <= 2; i++) {
        var r = roles[(idx + i + total) % total];
        var active = (i === 0);
        var im = img(r);
        var av = im ? '<img src="' + escapeHtml(im) + '">' : '<b>' + escapeHtml(r.n[0]) + '</b>';
        var nb = active
          ? '<div><b>' + escapeHtml(r.n) + '</b><br><small>' + escapeHtml(r.e || '') + '</small></div>'
          : '<div><small>' + escapeHtml(r.n) + '</small></div>';
        cards += '<a class="rc' + (active ? ' on' : '') + '" href="' + escapeHtml(url(r)) + '" target="_blank"><div class="av">' + av + '</div>' + nb + '</a>';
      }

      // 组装 HTML
      c.innerHTML = '<div class="cts">' + tabs + '</div>' +
        '<div class="ctr"><button class="lb">‹</button><div class="trk">' + cards + '</div><button class="rb">›</button></div>';

      // 绑定事件
      c.querySelectorAll('.ct').forEach(function (t) {
        t.onclick = function () {
          cat = this.dataset.k;
          idx = 0;
          render();
        };
      });
      c.querySelector('.lb').onclick = function () {
        idx = (idx - 1 + total) % total;
        render();
      };
      c.querySelector('.rb').onclick = function () {
        idx = (idx + 1) % total;
        render();
      };
    }

    render();
  }

  // 等待 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();