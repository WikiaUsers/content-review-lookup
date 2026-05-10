(function ($, mw) {
    'use strict';
    var conf = mw.config.get(['profileUserName', 'wgCanonicalNamespace', 'wgTitle']),
        jsonPage = /* 规定配置页面 */ 'Template:ImprovedProfileTags.json';
    /* 非用户页返回 */
    if (!conf.profileUserName) { return; }
    /* 从配置页面加载JSON并添加到用户栏 */
    function getUserTagsFromJSON() {
        $.ajax({
            url: mw.util.wikiScript(),
            data: {
                action: 'raw',
                title: jsonPage,
                ctype: 'application/json'
            },
            dataType: 'json',
            success: function (data) {
                if (!data || typeof data !== 'object') {
                    console.warn('ProfileTags : JSON配置文件格式错误 !');
                    return;
                }
                /* 获取当前用户信息 */
                var userName = conf.profileUserName;
                var userTags = data[userName];
                /* 尝试小写匹配 */
                if (!userTags) {
                    var lowerUserName = userName.toLowerCase();
                    for (var key in data) {
                        if (key.toLowerCase() === lowerUserName) {
                            userTags = data[key];
                            break;
                        }
                    }
                }
                /* 尝试获取默认标签 */
                if (!userTags && data._default) { userTags = data._default; }
                /* 返回 */
                if (!userTags || !Array.isArray(userTags)) { return; }
                /* 找到用户栏容器 */
                var $masthead = $('.user-identity-box .user-identity-header__attributes');
                if (!$masthead.length) return;
                /* 移除已有标签
                $masthead.find('[class*="tag"]').remove(); */
                /* 添加新标签 */
                userTags.forEach(function (htmlContent) {
                    if (typeof htmlContent === 'string' && htmlContent.trim()) {
                        var $outerSpan = $('<span>')
                            .addClass('user-identity-header__tag')
                            .append($.parseHTML(htmlContent.trim()));
                        $masthead.append($outerSpan, ' ');
                    }
                });
            },
            error: function (xhr, status, error) {
                console.warn('ProfileTags: 无法加载JSON配置文件', error);
            }
        });
    }
    /* 初始化等待用户栏加载 */
    function init() {
        var checkElement = function () {
            if ($('.user-identity-box').length) {
                getUserTagsFromJSON();
            } else {
                setTimeout(checkElement, 500);
            }
        };
        checkElement();
    }
    /* 等待依赖加载 */
    mw.loader.using(['mediawiki.util', 'site']).then(init);
}(jQuery, mediaWiki));