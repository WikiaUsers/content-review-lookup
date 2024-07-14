document.addEventListener("DOMContentLoaded", function() {
  var tabContainers = document.querySelectorAll('.tab-container');
  
  tabContainers.forEach(function(container) {
    var buttons = container.querySelectorAll('.tab-buttons div');
    var contents = container.querySelectorAll('.tab-content');
    
    buttons.forEach(function(button, index) {
      button.addEventListener('click', function() {
        buttons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        contents.forEach(function(content) {
          content.classList.remove('active');
        });
        
        button.classList.add('active');
        contents[index].classList.add('active');
      });
    });
  });
});