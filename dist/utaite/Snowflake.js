document.addEventListener('DOMContentLoaded', function() {
   var container = document.querySelector('.community-header-wrapper');
   if (container) {
       var snowflakes = document.createElement('div');
       snowflakes.className = 'snowflakes';
       var html = '';
       for (var i = 0; i < 50; i++) {
           html += '<i class="fa-solid fa-snowflake"></i>';
       }
       snowflakes.innerHTML = html;
       container.appendChild(snowflakes);
   }
});