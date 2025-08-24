 $(document).ready(function() {
    $('.wds-comment').each(function() {
        // Находим дату комментария
        var dateText = $(this).find('.wds-comment__header .wds-time').text();
        if (!dateText) return;

        // Преобразуем текст даты в объект Date
        var commentDate = new Date(dateText);
        if (isNaN(commentDate)) return;

        var now = new Date();
        var diffDays = (now - commentDate) / (1000 * 60 * 60 * 24);

        if (diffDays > 180) {
            // Скрываем форму ответа
            $(this).find('.reply-form').hide();
            // Добавляем сообщение о закрытии
            $(this).append('<p style="color:red;">Комментарии закрыты (старше 180 дней)</p>');
        }
    });
});