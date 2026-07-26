mw.loader.using(['mediawiki.util'], function () {
    function initCheckboxes() {
        document.querySelectorAll('.wiki-checkbox').forEach(function(checkbox) {
            // Удаляем старые обработчики, чтобы не было дублей
            checkbox.removeEventListener('click', toggleCheckbox);
            checkbox.addEventListener('click', toggleCheckbox);
        });
    }
    
    function toggleCheckbox(e) {
        e.preventDefault();
        this.classList.toggle('checked');
        console.log('Checkbox toggled:', this.classList.contains('checked'));
    }
    
    // Запускаем при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckboxes);
    } else {
        initCheckboxes();
    }
});