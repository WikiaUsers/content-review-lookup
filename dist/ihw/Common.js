function toggleContent() {
  var content = document.getElementById('content');
  var toggleButton = document.getElementById('toggleButton');

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    toggleButton.textContent = '展开阅读全文';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    toggleButton.textContent = '收起';
  }
}