/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    console.log('JS loaded');
    var initialSymbol = '▶';
    var successSymbol = '✔';
    var duration = 2000;

    function checkButtons() {
        var $buttons = $('.copy-to-clipboard-button');
        if ($buttons.length > 0) {
            $buttons.off('click').on('click', function(e) {
                e.stopImmediatePropagation();
                var $button = $(this);
                var originalText = $button.text();
                var text = $button.data('text');
                
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text)
                        .then(() => {
                            $button.text(originalText.replace(initialSymbol, successSymbol));
                            setTimeout(function() {
                                $button.text(originalText);
                            }, duration);
                        })
                        .catch(err => console.error('Error copying text: ', err));
                } else {
                    var $input = $('<textarea>').val(text).appendTo('body').select();
                    var success = document.execCommand('Copy');
                    $input.remove();
                    if (success) {
                        $button.text(originalText.replace(initialSymbol, successSymbol));
                        setTimeout(function() {
                            $button.text(originalText);
                        }, duration);
                    }
                }
            });
            console.log('Buttons found and bound');
        } else {
            console.log('No copy-to-clipboard-button elements found, retrying...');
            setTimeout(checkButtons, 500); // Проверяем каждые 500 мс
        }
    }

    // Запускаем проверку
    checkButtons();
});