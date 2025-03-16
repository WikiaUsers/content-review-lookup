/* MiniSearchZone.js - Simple Search Utility */
(function(window) {
    'use strict';
    
    var MiniSearchZone = {
        // Основной метод инициализации поиска
        init: function(config) {
            this.searchToggle = document.querySelector(config.searchToggleSelector);
            this.searchContainer = document.querySelector(config.searchContainerSelector);
            this.searchInput = document.querySelector(config.searchInputSelector);
            this.contentArea = document.querySelector(config.contentAreaSelector);
            
            if (!this.searchToggle || !this.searchContainer || !this.searchInput || !this.contentArea) {
                console.error('MiniSearchZone: Не все элементы найдены');
                return;
            }
            
            this.originalContent = this.contentArea.innerHTML;
            
            this.bindEvents();
        },
        
        // Привязка событий
        bindEvents: function() {
            var self = this;
            
            // Обработчик клика по кнопке поиска
            this.searchToggle.addEventListener('click', function() {
                self.toggleSearchContainer();
            });
            
            // Обработчик ввода в поле поиска
            this.searchInput.addEventListener('input', function() {
                self.performSearch(this.value);
            });
        },
        
        // Переключение видимости контейнера поиска
        toggleSearchContainer: function() {
            if (this.searchContainer.style.display === 'none' || this.searchContainer.style.display === '') {
                this.searchContainer.style.display = 'block';
                this.searchToggle.style.display = 'none';
            } else {
                this.searchContainer.style.display = 'none';
                this.searchToggle.style.display = '';
            }
        },
        
        // Выполнение поиска
        performSearch: function(searchText) {
            if (!searchText) {
                this.contentArea.innerHTML = this.originalContent;
                return;
            }
            
            // Экранирование специальных символов
            searchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Создание регулярного выражения для поиска
            var regex = new RegExp('(' + searchText + ')', 'gi');
            
            // Замена найденного текста
            var highlightedContent = this.originalContent.replace(regex, '<mark class="mini-search-highlight">$1</mark>');
            
            this.contentArea.innerHTML = highlightedContent;
        }
    };
    
    // Добавление глобального объекта
    window.MiniSearchZone = MiniSearchZone;
})(window);

// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    MiniSearchZone.init({
        searchToggleSelector: '.mini-search-toggle',
        searchContainerSelector: '.mini-search-container',
        searchInputSelector: '.mini-search-input',
        contentAreaSelector: '.content-area'
    });
});