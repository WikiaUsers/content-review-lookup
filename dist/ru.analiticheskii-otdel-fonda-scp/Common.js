console.log('COMMONJS: running');
(function(){
  'use strict';
  // защита от повторного запуска
  if (window._tw_red_button_loaded) return;
  window._tw_red_button_loaded = true;

  function ensureButtons() {
    var markers = document.querySelectorAll('.typing-widget-marker');
    markers.forEach(function(m){
      if (m.dataset._tw_red === '1') return;
      m.dataset._tw_red = '1';

      // создаём кнопку
      var btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'typing-btn';
      btn.setAttribute('role', 'button');
      btn.tabIndex = 0;
      btn.textContent = 'Подтвердить вход';

      // inline-стили: красный фон, серая обводка, белый текст
      btn.style.backgroundColor = '#b22222'; // тёмно-красный
      btn.style.color = '#ffffff';           // белый текст
      btn.style.border = '1px solid #808080';// серая обводка
      btn.style.padding = '.35em .6em';
      btn.style.borderRadius = '6px';
      btn.style.textDecoration = 'none';
      btn.style.display = 'inline-block';
      btn.style.cursor = 'pointer';

      // простая реакция на клик (предотвращаем переход)
      btn.addEventListener('click', function(e){
        if (e && e.preventDefault) e.preventDefault();
        // тут можно повесить любое поведение (анимация, показ текста и т.д.)
        alert('Кнопка нажата');
      });

      m.appendChild(btn);
    });
  }

  // инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', ensureButtons);
  // и при динамической подгрузке (Fandom)
  if (typeof mw !== 'undefined' && mw.hook) mw.hook('wikipage.content').add(function($c){ ensureButtons(); });
  else setInterval(ensureButtons, 2000);
})();