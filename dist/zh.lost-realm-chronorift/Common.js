/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
// 使用jQuery确保DOM加载完成后再执行代码
$(document).ready(function () {
    var hoverTimer; // 用于存储悬停计时器

    // 获取所有需要触发弹出窗口的元素
    var triggerElements = document.querySelectorAll('.hover-trigger');

    // 获取弹出窗口元素
    var popupElement = document.createElement('div');
    popupElement.className = 'custom-popup';
    document.body.appendChild(popupElement);

    // 遍历所有触发元素
    triggerElements.forEach(function (element) {
        // 监听鼠标悬停事件
        element.addEventListener('mouseover', function () {
            // 设置定时器，在2秒后显示弹出窗口
            hoverTimer = setTimeout(function () {
                // 获取词语文本和图片链接（请替换为实际的文本和图片链接）
                var textContent = "Your text content here";
                var imageUrl = "your-image-url.jpg";

                // 设置弹出窗口的内容
                popupElement.innerHTML = '<img src="' + imageUrl + '" alt="Popup Image"><p>' + textContent + '</p>';

                // 获取触发元素的位置
                var rect = element.getBoundingClientRect();

                // 设置弹出窗口的位置
                popupElement.style.left = rect.left + 'px';
                popupElement.style.top = rect.bottom + 'px';

                // 显示弹出窗口
                popupElement.style.display = 'block';
            }, 2000); // 设置2秒延迟
        });

        // 监听鼠标离开事件，清除定时器并隐藏弹出窗口
        element.addEventListener('mouseout', function () {
            clearTimeout(hoverTimer);
            popupElement.style.display = 'none';
        });
    });
});