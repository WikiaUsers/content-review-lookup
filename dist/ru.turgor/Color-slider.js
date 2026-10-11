mw.hook('wikipage.content').add(function($content) { 
    $content.find('.custom-range-slider-container-0').each(function() { 
        var $container = $(this); 
        var min = $container.data('min') || 0; 
        var max = $container.data('max') || 100; 
        // Создаем элемент ползунка 
        var $slider = $('<input>', { 
            type: 'range', 
            min: min, 
            max: max, 
            value: min 
        }); 

        // Вычисляем стартовое значение
        var initialValue = (min / 100 * 1 + 1).toFixed(2);
        var $output = $('<span>').text(initialValue); 
        var $percent = $('<span>').text(min); 

        $slider.on('input', function() { 
            // Вычисляем текущее значение
            var calculatedValue = (parseInt($(this).val(), 10) / 100 * 1 + 1);
            $output.text(calculatedValue.toFixed(2));
            $percent.text($(this).val());
        }); 

        $container.empty().append($percent, $slider, $output); 
    }); 
});


mw.hook('wikipage.content').add(function($content) { 
    $content.find('.custom-range-slider-container-1').each(function() { 
        var $container = $(this); 
        var min = parseFloat($container.data('min')) || 0; 
        var max = parseFloat($container.data('max')) || 100; 

        // Создаем поле для ввода пользовательского числа
        var $customInput = $('<input>', {
		    type: 'number',
		    min: 0,
		    max: 999,
		    value: 1, // Значение по умолчанию
		    style: 'width: 60px; margin: 0 10px;' 
        });

        // Создаем элемент ползунка 
        var $slider = $('<input>', { 
            type: 'range', 
            min: min, 
            max: max, 
            value: min 
        }); 

        var $output = $('<span>'); 
        var $percent = $('<span>').text(min); 

        // Функция пересчета значений
        function updateCalculations() {
            var sliderVal = parseInt($slider.val(), 10) || 0;
            // Берем значение из числового поля (если пусто — считаем за 0)
            var multiplier = parseFloat($customInput.val()) || 0; 
            
            var calculatedValue = (sliderVal / 100 * multiplier + multiplier);

            $output.text(calculatedValue.toFixed(2));
            $percent.text(sliderVal);
        }

        // Навешиваем обработчики событий на оба ввода
        $slider.on('input', updateCalculations);
        $customInput.on('input', updateCalculations);

        // Инициализируем первое отображение
        updateCalculations();

        // Добавляем все элементы в контейнер
        $container.empty().append(
            $percent, 
            $slider, 
            $output,
            $('<br><span>Потрачено Цвета: </span>'), // Текстовая подсказка
            $customInput
        ); 
    }); 
});

mw.hook('wikipage.content').add(function($content) { 
    $content.find('.custom-range-slider-container-2').each(function() { 
        var $container = $(this); 
        var min = parseFloat($container.data('min')) || 0; 
        var max = parseFloat($container.data('max')) || 100; 

        // Создаем поле для ввода пользовательского числа
        var $customInput = $('<input>', {
		    type: 'number',
		    min: 0,
		    max: 999,
		    value: 1, // Значение по умолчанию
		    style: 'width: 60px; margin: 0 10px;' 
        });

        // Создаем элемент ползунка 
        var $slider = $('<input>', { 
            type: 'range', 
            min: min, 
            max: max, 
            value: min 
        }); 

        var $output = $('<span>'); 
        var $percent = $('<span>').text(min); 

        // Функция пересчета значений
        function updateCalculations() {
            var sliderVal = parseInt($slider.val(), 10) || 0;
            // Берем значение из числового поля (если пусто — считаем за 0)
            var multiplier = parseFloat($customInput.val()) || 0; 
            
            var calculatedValue = (multiplier - (sliderVal / 100 * multiplier/2));

            $output.text(calculatedValue.toFixed(2));
            $percent.text(sliderVal);
        }

        // Навешиваем обработчики событий на оба ввода
        $slider.on('input', updateCalculations);
        $customInput.on('input', updateCalculations);

        // Инициализируем первое отображение
        updateCalculations();

        // Добавляем все элементы в контейнер
        $container.empty().append(
            $percent, 
            $slider, 
            $output,
            $('<br><span>Потрачено Цвета: </span>'), // Текстовая подсказка
            $customInput
        ); 
    }); 
});