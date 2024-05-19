/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener('DOMContentLoaded', function() {
  var toggleCheckbox = document.getElementById('colorToggleCheckbox');
  if (!toggleCheckbox) return;

  var textElements = document.querySelectorAll('.colorText');

  toggleCheckbox.addEventListener('change', function() {
    textElements.forEach(function(element) {
      if (toggleCheckbox.checked) {
        element.style.color = element.getAttribute('data-color');
      } else {
        element.style.color = '';
      }
    });
  });
});