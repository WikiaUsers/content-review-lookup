/**
 * 弹窗生成器模块 (增强版)
 * 使用前请确保jQuery已加载
 */
(function(global, $) {
    // 检查必要依赖
    if (!$) {
        throw new Error('PopupGenerator requires jQuery');
    }

    // 创建命名空间
    var PopupGenerator = {
        /**
         * 创建并显示一个弹窗
         * @param {Object} options 配置对象
         * @param {string} [options.introText="查看详情"] 介绍文本
         * @param {string} [options.headerText="评分详情"] 标题文本
         * @param {string} [options.content=""] 内容文本
         * @param {jQuery|string} [options.appendTo="body"] 要附加到的容器
         * @param {function} [options.onOpen] 弹窗打开时的回调
         * @param {function} [options.onClose] 弹窗关闭时的回调
         * @param {"create"|"add"} [options.mode="create"] 创建模式
         * @returns {{triggerElement: jQuery, popupElement: jQuery, contentElement: jQuery}}
         */
        createPopup: function(options) {
            options = options || {};
            var mode = options.mode || 'create';
            
            // 创建基础弹窗结构
            var $popupFrame = $("<div>").addClass("popup-box-frame rating-popup").hide();
            var $popupSublayer = $("<div>").addClass("popup-box-sublayer");
            var $popupBox = $("<div>").addClass("popup-box");
            var $popupHeader = $("<div>").addClass("popup-box-header");
            var $closeLabel = $("<span>")
                .addClass("close-label")
                .attr("title", "关闭")
                .html("&times;");
            var $headerText = $("<span>")
                .addClass("popup-box-header-text")
                .text(options.headerText || "评分详情");
            var $popupContent = $("<div>")
                .addClass("popup-box-content")
                .html(options.content || "");

            // 组装弹窗结构
            $popupHeader.append($closeLabel, $headerText);
            $popupBox.append($popupHeader, $popupContent);
            $popupFrame.append($popupSublayer, $popupBox);

            // 处理容器参数
            var $container = typeof options.appendTo === 'string' 
                ? $(options.appendTo) 
                : (options.appendTo || $('body'));
            
            // 创建触发器元素
            var $triggerElement;
            if (mode === 'add') {
                // 模式1: 使用appendTo元素作为触发器
                $triggerElement = $container;
                $container.after($popupFrame); // 在目标元素后添加弹窗
            } else {
                // 模式2: 创建新的introText元素作为触发器
                $triggerElement = $("<div>")
                    .addClass("rating-popup-intro")
                    .text(options.introText || "查看详情");
                $container.after($triggerElement).after($popupFrame); // 先加触发器再加弹窗
            }

            // 添加到DOM后设置初始样式
            $popupFrame.css({
                'opacity': 0,
                'transition': 'opacity 0.3s ease'
            });

            // 关闭弹窗函数
            var closePopup = function() {
                $popupFrame.css('opacity', 0);
                setTimeout(function() {
                    $popupFrame.hide();
                    if (typeof options.onClose === 'function') {
                        options.onClose();
                    }
                }, 300); // 匹配CSS过渡时间
            };

            // 打开弹窗函数
            var openPopup = function() {
                $popupFrame.show().css('opacity', 1);
                if (typeof options.onOpen === 'function') {
                    options.onOpen();
                }
            };

            // 事件处理
            $closeLabel.on("click", closePopup);
            
            // 点击遮罩层关闭
            $popupSublayer.on("click", function(e) {
                if (e.target === this) { // 确保点击的是遮罩层本身
                    closePopup();
                }
            });

            $triggerElement.on("click", openPopup);

            // 返回可操作的元素
            return {
                triggerElement: $triggerElement,
                popupElement: $popupFrame,
                contentElement: $popupContent,
                close: closePopup,
                open: openPopup
            };
        }
    };

    // 暴露到全局对象
    if (typeof global.PopupGenerator === 'undefined') {
        global.PopupGenerator = PopupGenerator;
    } else {
        console.warn('PopupGenerator is already defined');
    }
})(window, jQuery);