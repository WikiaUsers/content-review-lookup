$(function () {
  // Делегирование клика на любую кнопку вкладки (даже добавленную позже)
  $(document).on('click', '.player-tab__button', function () {
    var $btn = $(this);
    // Ищем общий контейнер всей карточки — блок с классом playerPage
    var $page = $btn.closest('.playerPage');
    if (!$page.length) return;

    // Находим все кнопки, тексты и контенты внутри этой карточки
    var $buttons = $page.find('.player-tab__button');
    var $texts   = $page.find('.player-tab__text');
    var $contents= $page.find('.player-tab__content');
    var $items   = $page.find('.player-tab__items');

    // Определяем индекс нажатой кнопки среди всех кнопок этой карточки
    var index = $buttons.index($btn);

    // Убираем текущий класс со всех трёх групп
    $buttons.removeClass('player-is-current');
    $texts.removeClass('player-is-current');
    $contents.removeClass('player-is-current');
    $items.removeClass('player-is-current');

    // Добавляем класс на нужные элементы по индексу
    $btn.addClass('player-is-current');
    if (index >= 0 && index < $texts.length) {
      $texts.eq(index).addClass('player-is-current');
    }
    if (index >= 0 && index < $contents.length) {
      $contents.eq(index).addClass('player-is-current');
    }
    if (index >= 0 && index < $items.length) {
      $items.eq(index).addClass('player-is-current');
    }

    // === НОВЫЙ БЛОК: управление фоном player_soul_bg ===
    // Проверяем, является ли нажатая кнопка последней кнопкой .player-tab__button на всей странице
    var $allButtons = $('.player-tab__button');
var $soulBg = $('.player_soul_bg');

if ($allButtons.length && $btn.is($allButtons.last())) {
  // Последняя кнопка — непрозрачный градиент
  $soulBg.css('background',
    '#00000064'
  );
} else {
  // Любая другая кнопка — прозрачный градиент (transition сделает переход плавным)
  $soulBg.css('background',
    ''
  );
}
    // === КОНЕЦ НОВОГО БЛОКА ===
  });
});