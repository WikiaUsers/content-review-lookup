$(document).ready(function() {
  // Функция для управления видимостью описаний
  function showDescription(hash) {
    $('.descriptions .description').hide(); // Скрываем все описания
    if (hash === 'standard') {
      $('#standard').show();
    } else if (hash === 'exceptional') {
      $('#exceptional').show();
    } else if (hash === 'legendary') {
      $('#legendary').show();
    } else {
      $('#standard').show(); // По умолчанию показываем стандартное
    }
  }

  // Обработчик клика по вкладкам инфобокса
  $('.portable-infobox .wds-tabs__tab').on('click', function() {
    var tabName = $(this).find('.wds-tabs__tab-label').text().trim().toLowerCase();
    var hash;

    if (['обычный', 'необычный', 'редкий', 'эпический'].includes(tabName)) {
      hash = 'standard';
    } else if (tabName === 'исключительный') {
      hash = 'exceptional';
    } else if (tabName === 'легендарный') {
      hash = 'legendary';
    }

    if (hash) {
      history.replaceState(null, null, '#' + hash); // Меняем хэш без прокрутки
      showDescription(hash); // Показываем нужное описание
    }
  });

  // Обработка хэша при загрузке страницы
  var initialHash = window.location.hash.substring(1);
  if (initialHash) {
    showDescription(initialHash);
  } else {
    showDescription('standard'); // По умолчанию стандартное описание
  }

  // Отслеживание изменений хэша
  $(window).on('hashchange', function() {
    var hash = window.location.hash.substring(1);
    showDescription(hash);
  });

  // Предотвращаем прокрутку при загрузке с хэшем
  if (window.location.hash) {
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);
  }
});