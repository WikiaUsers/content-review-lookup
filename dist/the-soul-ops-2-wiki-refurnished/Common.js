$(document).ready(function() {
var expanders = document.querySelectorAll('.ut-expander');
expanders.forEach(function(el) {
var header = el.querySelector('.ut-expander-header');
var btn = el.querySelector('.ut-toggle-btn');
header.addEventListener('click', function() {
el.classList.toggle('ut-collapsed');
btn.textContent = el.classList.contains('ut-collapsed') ? '[ ▶ SHOW ]' : '[ ▼ HIDE ]';
});
});
})();