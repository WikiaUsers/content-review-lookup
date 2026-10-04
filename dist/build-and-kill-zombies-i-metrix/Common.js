/* BAKZ Metrix Lab Visual Calculator (Fandom Edition) */
mw.hook('wikipage.content').add(function($content) {
    if ($content.find('#metrix-visual-calc').length) {
        
        function updateVisualCalc() {
            var totalCapacity = 0;
            var totalConsumption = 0;
            var maxBaseSpeed = 0;
            var engineCount = 0;

            $('#active-fuels .remove-item').each(function() {
                totalCapacity += parseFloat($(this).attr('data-mfu')) || 0;
            });

            $('#active-engines .remove-item').each(function() {
                totalConsumption += parseFloat($(this).attr('data-mfu')) || 0;
                var spd = parseFloat($(this).attr('data-speed')) || 0;
                
                if (spd > maxBaseSpeed) maxBaseSpeed = spd;
                engineCount++;
            });

            var time = totalConsumption > 0 ? (totalCapacity / totalConsumption) : 0;
            var finalSpeed = engineCount > 0 ? Math.round(maxBaseSpeed * Math.pow(engineCount, 0.45)) : 0;

            if (totalCapacity === 0 && engineCount === 0) {
                $('#calc-display-capacity').text('0 MFU (0.0 seconds)');
                $('#calc-display-speed').text('Max Speed: 0 studs/s');
            } else {
                var engWord = engineCount === 1 ? 'engine' : 'engines';
                $('#calc-display-capacity').text(
                    totalCapacity.toLocaleString('en-US') + ' MFU (' + time.toFixed(1) + ' seconds with ' + engineCount + ' ' + engWord + ')'
                );
                $('#calc-display-speed').text('Max Speed: ' + finalSpeed + ' studs/s');
            }
        }

        // Прив'язуємо кліки до кнопок, які є в контенті
        $content.find('.valid-item').off('click').on('click', function() {
            var type = $(this).attr('data-type');
            var newItem = $(this).clone();
            
            newItem.removeClass('palette-item valid-item').addClass('remove-item');
            newItem.attr('title', 'Click to remove this part');

            if (type === 'engine') {
                $('#active-engines').append(newItem);
            } else {
                $('#active-fuels').append(newItem);
            }
            
            updateVisualCalc();
        });

        $content.find('.undiscovered-item').off('click').on('click', function() {
            alert("Data missing! We are still hunting for this item in Metrix Lab. Check back later once it drops!");
        });

        // Видалення предмета
        $('#active-engines, #active-fuels').off('click', '.remove-item').on('click', '.remove-item', function() {
            $(this).remove();
            updateVisualCalc();
        });
        
        // Початковий підрахунок
        updateVisualCalc();
    }
});