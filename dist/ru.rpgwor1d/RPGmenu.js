// Функция активации кнопки и контента по индексу внутри конкретного меню
function activateMenuButton(menu, index) {
    const menuId = menu.id;
    if (!menuId) return;

    const buttons = menu.querySelectorAll(`.RPGbutton[id="${menuId}"]`);
    const contents = menu.querySelectorAll(`.RPGcontent[id="${menuId}"]`);

    // Проверяем, что индекс корректен
    if (index < 0 || index >= buttons.length) return;

    // Снимаем активность со всех кнопок и контента в этом меню
    buttons.forEach(btn => btn.classList.remove('RPGactive'));
    contents.forEach(cnt => cnt.classList.remove('RPGactive'));

    // Добавляем активность нужным элементам
    if (buttons[index]) buttons[index].classList.add('RPGactive');
    if (contents[index]) contents[index].classList.add('RPGactive');
}

// Делегирование кликов (исходная логика)
document.addEventListener('click', function(event) {
    const button = event.target.closest('.RPGbutton');
    if (!button) return;

    const menu = button.closest('.RPGmenu');
    if (!menu) return;

    const menuId = menu.id;
    if (!menuId) return;

    const buttons = menu.querySelectorAll(`.RPGbutton[id="${menuId}"]`);
    const index = Array.from(buttons).indexOf(button);
    if (index === -1) return;

    activateMenuButton(menu, index);
});

// Инициализация при загрузке страницы: активация вкладки из URL (?button=N)
function initFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const buttonParam = params.get('button');
    if (buttonParam === null) return;

    // Предполагаем, что параметр задаёт номер кнопки (начиная с 1)
    const index = parseInt(buttonParam, 10) - 1;
    if (isNaN(index) || index < 0) return;

    // Применяем для каждого меню на странице (обычно оно одно)
    document.querySelectorAll('.RPGmenu').forEach(menu => {
        activateMenuButton(menu, index);
    });
}

// Запускаем инициализацию после полной загрузки DOM
document.addEventListener('DOMContentLoaded', initFromUrl);

// Если скрипт выполняется после DOM, можно вызвать сразу (на случай, если DOM уже готов)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFromUrl);
} else {
    initFromUrl();
}