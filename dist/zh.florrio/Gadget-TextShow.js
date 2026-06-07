
(function() {
  // ========== 注入淡出动画样式（仅一次）==========
  if (!document.getElementById('rare-toast-kf')) {
    var style = document.createElement('style');
    style.id = 'rare-toast-kf';
    style.textContent = '@keyframes rareToastFadeOut{0%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(style);
  }

  // ========== 创建单行消息 ==========
  function createLine(text, offsetFromBottom, weight, color, delay) {
    if (!text) return;
    var div = document.createElement('div');
    div.textContent = text;
    var s = div.style;

    s.setProperty('position', 'fixed', 'important');
    s.setProperty('z-index', '2147483647', 'important');
    s.setProperty('pointer-events', 'none', 'important');
    s.setProperty('opacity', '1', 'important');
    s.setProperty('visibility', 'visible', 'important');
    s.setProperty('display', 'block', 'important');
    s.setProperty('white-space', 'pre-line', 'important');
    s.setProperty('left', '24px', 'important');
    s.setProperty('bottom', offsetFromBottom, 'important');
    s.setProperty('padding', '5px 18px', 'important');
    s.setProperty('font-size', '14px', 'important');
    s.setProperty('font-family', '"Ubuntu", sans-serif', 'important');
    s.setProperty('font-weight', weight, 'important');
    s.setProperty('color', color, 'important');
    s.setProperty('text-shadow',
      '-1px -1px 0 #000,0px -1px 0 #000,1px -1px 0 #000,' +
      '-1px 0px 0 #000,1px 0px 0 #000,' +
      '-1px 1px 0 #000,0px 1px 0 #000,1px 1px 0 #000',
      'important');
    s.setProperty('border-radius', '6px', 'important');
    s.setProperty('background', 'transparent', 'important');

    document.body.appendChild(div);

    setTimeout(function() {
      div.style.setProperty('animation', 'rareToastFadeOut 0.8s forwards', 'important');
      div.addEventListener('animationend', function() { div.remove(); });
    }, delay);
  }

  // ========== 从 Fandom 页面获取文本并显示 ==========
  fetch('https://florrio.fandom.com/zh/wiki/MediaWiki:Gadget-TextShow/texts?action=raw')
    .then(function(response) {
      if (!response.ok) throw new Error('获取 TextShow/texts 内容网络响应失败，状态码：' + response.status);
      return response.text();
    })
    .then(function(rawText) {
      var lines = rawText.split('\n');
      var lineHeight = 30;   // 每条消息占用的垂直空间（像素）
      var baseBottom = 24;   // 第一条消息距视窗底部的距离
      var baseDelay = 10000;  // 淡出前的显示时长（毫秒）

      lines.forEach(function(line, index) {
        // 匹配格式：##数字 #颜色 文本
        var match = line.match(/^##\d+\s+(#[0-9A-Fa-f]{6})\s+(.+)/);
        if (match) {
          var color = match[1];   // ← 修复：取第一个捕获组（颜色）
          var text  = match[2];   // ← 修复：取第二个捕获组（文本）
          var bottom = (baseBottom + index * lineHeight) + 'px';
          createLine(text, bottom, 'bold', color, baseDelay);
        }
      });
    })
    .catch(function(error) {
      console.error('获取 TextShow/texts 内容失败：', error);
    });

  fetch('https://florrio.fandom.com/zh/wiki/MediaWiki:Gadget-TextShow/title?action=raw')
    .then(function(response) {
      if (!response.ok) throw new Error('获取 TextShow/title 内容网络响应失败，状态码：' + response.status);
      return response.text();
    })
    .then(function(rawText) {
      $(".fandom-community-header__community-name, .fandom-sticky-header__sitename").each(function() {
        $(this).html($(this).html() + rawText);
      });
    })
})();