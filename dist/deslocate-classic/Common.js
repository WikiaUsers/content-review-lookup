/* Any JavaScript here will be loaded for all users on every page load. */
/* Скрипт для приветствия по времени суток */
$(function() {
    // Получаем текущий час (от 0 до 23)
    var currentHour = new Date().getHours();
    var greeting = "";

    // Определяем приветствие
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning"; // Утро (с 5 до 12)
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon"; // День (с 12 до 18)
    } else if (currentHour >= 18 && currentHour < 23) {
        greeting = "Good evening"; // Вечер (с 18 до 23)
    } else {
        greeting = "Good night"; // Ночь (с 23 до 5)
    }

    // Ищем место на странице, куда вставить приветствие
    // Если на странице есть элемент с классом "user-greeting", вставляем туда
    var greetingElement = document.querySelector('.user-greeting');
    
    if (greetingElement) {
        // Если элемент найден, вставляем текст: "Good evening, Имя!"
        // Мы используем mw.user.getName(), чтобы получить ник зашедшего
        greetingElement.innerText = greeting + ", " + mw.user.getName() + "!";
    }
});