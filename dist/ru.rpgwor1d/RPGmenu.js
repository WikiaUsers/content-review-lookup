document.addEventListener('click', function(event) {
  // 1. Находим ближайший элемент с классом RPGbutton, на который кликнули
  const button = event.target.closest('.RPGbutton');
  if (!button) return;

  // 2. Находим родительское меню
  const menu = button.closest('.RPGmenu');
  if (!menu) return;

  // 3. Получаем id этого меню (например, "playmode")
  const menuId = menu.id;
  if (!menuId) return;

  // 4. Внутри этого конкретного меню ищем все кнопки и контент с тем же id
  const buttons = menu.querySelectorAll(`.RPGbutton[id="${menuId}"]`);
  const contents = menu.querySelectorAll(`.RPGcontent[id="${menuId}"]`);

  // 5. Определяем индекс нажатой кнопки среди найденных
  const index = Array.from(buttons).indexOf(button);
  if (index === -1) return; // если кнопка не в списке (странный случай)

  // 6. Убираем класс активности со всех кнопок и всех блоков контента
  buttons.forEach(btn => btn.classList.remove('RPGactive'));
  contents.forEach(cnt => cnt.classList.remove('RPGactive'));

  // 7. Добавляем активный класс нажатой кнопке
  button.classList.add('RPGactive');

  // 8. И соответствующему по порядку блоку контента (если существует)
  if (contents[index]) {
    contents[index].classList.add('RPGactive');
  }
});