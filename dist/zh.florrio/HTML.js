// ===== HTML 注入（带安检）=====
$(function () {
  $('.cancel-html-inject').each(function () {
    var html = $(this).text().trim();
    if (!html) return;

    // 危险标签黑名单
    var forbiddenTags = [
      /<script[\s>]/i,       // 脚本标签
      /<iframe[\s>]/i,       // 内嵌框架
      /<embed[\s>]/i,        // 嵌入对象
      /<object[\s>]/i,       // 对象标签
      /<form[\s>]/i,         // 表单（钓鱼）
      /<link[\s>]/i,         // 外部资源
      /<meta[\s>]/i,         // 元标签
      /<base[\s>]/i,         // base 标签
      /on\w+\s*=/i,          // 事件处理器（onclick/onerror等）
      /javascript\s*:/i,     // javascript 伪协议
      /<style[\s>]/i,        // 内联样式（防止覆盖全局）
      /<svg[\s>]/i           // SVG（可嵌入脚本）
    ];

    var blocked = forbiddenTags.some(function (re) {
      return re.test(html);
    });

    if (blocked) {
      console.warn(
        '[HTML注入拦截] 页面: ' + mw.config.get('wgPageName') +
        ' | 用户: ' + (mw.config.get('wgUserName') || '匿名') +
        ' | 原因: 包含危险标签或事件处理器'
      );
      return;
    }

    // 安全注入
    console.log(
      '[HTML注入成功] 页面: ' + mw.config.get('wgPageName') +
      ' | 用户: ' + (mw.config.get('wgUserName') || '匿名')
    );
    $(this).after(html).remove();
  });
});