/* Скрипт для конвертації часу в місцевий */
function applyLocalTime() {
    $('.local-time').each(function() {
        var $this = $(this);
        var $dataTag = $this.find('data');
        var dateVal = $dataTag.attr('value');
        var tz = $this.data('timezone') || "GMT+0900";
        
        // Перевірка на заповненість і відсутність необроблених параметрів шаблону
        if (dateVal && dateVal.indexOf('{{{') === -1 && !$this.hasClass('time-processed')) {
            var date = new Date(dateVal.replace(/-/g, "/") + " " + tz);
            
            if (!isNaN(date.getTime())) {
                var localTimeString = date.toLocaleString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                $this.attr('title', 'Ваш місцевий час: ' + localTimeString);
                $this.css({
                    'border-bottom': '2px dotted #46afd7',
                    'cursor': 'help'
                }).addClass('time-processed');
                
                console.log("LocalTime: успішно оброблено " + dateVal);
            }
        }
    });
}

// Запуск після завантаження сторінки через MediaWiki hook
mw.hook('wikipage.content').add(function() {
    applyLocalTime();
});