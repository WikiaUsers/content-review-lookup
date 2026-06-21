$(function () {
  $('.cancel-css-inject').each(function () {
    var css = $(this).text().trim();
    if (!css) return;

    // ===== 危险内容黑名单 =====
    var blacklist = [
      /@import/i,                          // 禁止外部样式表导入
      /url\s*$/i,                         // 禁止 url() 加载外部资源
      /behavior\s*:/i,                     // 禁止 IE 的 behavior 属性
      /expression\s*\(/i,                  // 禁止 IE 的 CSS expression
      /javascript\s*:/i,                   // 禁止 javascript: 伪协议
      /position\s*:\s*fixed/i,             // 禁止固定定位（覆盖全页面）
      /z-index\s*:\s*\d{4,}/i,             // 禁止超高 z-index（遮挡导航）
      /display\s*:\s*none\s*(!important)?\s*;?/i, // 禁止隐藏元素
      /content\s*:\s*["'][^"']*["']/i,     // 禁止伪元素注入文字
      /@keyframes\s+spin/i,                // 禁止旋转动画（可能造成页面卡死）
      /top\s*:\s*0\s*(!important)?\s*;?\s*left\s*:\s*0/i, // 禁止全屏覆盖
      /transform\s*:\s*scale\s*\(0$/i     // 禁止隐藏元素（缩放到0）
    ];

    var blocked = blacklist.some(function (re) {
      return re.test(css);
    });

    if (blocked) {
      console.warn(
        '[CSS注入拦截] 页面: ' + mw.config.get('wgPageName') +
        ' | 用户: ' + (mw.config.get('wgUserName') || '匿名') +
        ' | 原因: 包含危险CSS规则'
      );
      return; // 阻止注入
    }

    // ===== 安全注入 =====
    console.log(
      '[CSS注入成功] 页面: ' + mw.config.get('wgPageName') +
      ' | 用户: ' + (mw.config.get('wgUserName') || '匿名')
    );
    $('<style>').text(css).appendTo('head');
  });
});