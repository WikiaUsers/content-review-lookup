// Вспомогательная функция: извлекает значение параметра из классов элемента
function getPVPParam(element, param) {
  var classes = element.className.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].indexOf(param + '-') === 0) {
      return classes[i].substring(param.length + 1);
    }
  }
  return '';
}

// Основная функция сортировки всех контейнеров .pvp_results по заданному параметру
function sortPVP(param, button) {
  var containers = document.querySelectorAll('.pvp_results');
  // Если кнопка уже имеет класс flipped – сортируем по убыванию, иначе по возрастанию
  var ascending = !button.classList.contains('flipped');

  for (var c = 0; c < containers.length; c++) {
    var items = Array.prototype.slice.call(containers[c].children);

    items.sort(function(a, b) {
      var valA = getPVPParam(a, param);
      var valB = getPVPParam(b, param);
      var cmp;

      if (param === 'player') {
        // Для количества игроков пытаемся сравнить как числа
        var numA = parseInt(valA, 10);
        var numB = parseInt(valB, 10);
        if (!isNaN(numA) && !isNaN(numB)) {
          cmp = numA - numB;
        } else {
          cmp = valA.localeCompare(valB);
        }
      } else {
        // Для статуса, режима и дат – строковое сравнение
        cmp = valA.localeCompare(valB);
      }
      return ascending ? cmp : -cmp;
    });

    // Перемещаем отсортированные элементы обратно в контейнер
    for (var j = 0; j < items.length; j++) {
      containers[c].appendChild(items[j]);
    }
  }

  // Переключаем класс flipped на кнопке
  if (ascending) {
    button.classList.add('flipped');
  } else {
    button.classList.remove('flipped');
  }
}

// Назначаем обработчики на кнопки
function setupPVPButtons() {
  var buttons = {
    status: document.getElementById('sort_by_status_button'),
    player: document.getElementById('sort_by_player_amount_button'),
    mode:   document.getElementById('sort_by_mode_button'),
    start:  document.getElementById('sort_by_start_button'),
    end:    document.getElementById('sort_by_end_button')
  };

  for (var param in buttons) {
    if (buttons[param]) {
      // Замыкание для захвата текущих param и кнопки
      buttons[param].onclick = (function(p, btn) {
        return function() {
          sortPVP(p, btn);
        };
      })(param, buttons[param]);
    }
  }
}

// Запускаем инициализацию после готовности DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupPVPButtons);
} else {
  setupPVPButtons();
}