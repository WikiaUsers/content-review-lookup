/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
function showSelectedImage() {
    var selectBox = document.getElementById("selectBox");
    var selectedOption = selectBox.options[selectBox.selectedIndex];
    var imagePath = selectedOption.getAttribute('data-image-path');

    var imageElement = document.getElementById("imageDisplay");
    imageElement.src = imagePath;
  }
  /*
  人物图片选择框使用的js
  */
  // 获取折叠按钮和内容区域的引用
    var toggleButton = document.querySelector('.Charactermw-collapsible-toggle');
    var content = document.querySelector('.Charactermw-collapsible-content');

    // 为折叠按钮添加点击事件监听
    toggleButton.addEventListener('click', function() {
      // 切换内容区域的展开状态
      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded'); // 移除“expanded”类
        toggleButton.setAttribute('aria-expanded', 'false'); // 更新 ARIA 属性
      } else {
        content.classList.add('expanded'); // 添加“expanded”类
        toggleButton.setAttribute('aria-expanded', 'true'); // 更新 ARIA 属性
      }
    });




/* 翻页笔记本js代码操作有效，炸了一趟css。2024年7月7日03:58:19已登记，css因js操作不当爆炸一次。 */