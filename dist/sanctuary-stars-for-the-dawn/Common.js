/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    console.log('JS loaded');
    const debug = true; // Переключатель отладки
    const initialSymbol = '▶';
    const successSymbol = '✔';
    const duration = 2000;
    const corsProxy = 'https://api.allorigins.win/raw?url='; // Прокси для обхода CORS

    function checkButtons(attempts = 5) {
        var $buttons = $('.copy-to-clipboard-button');
        if ($buttons.length > 0) {
            $buttons.each(function() {
                var $button = $(this);
                // Убеждаемся, что data-symbol установлен
                if (!$button.attr('data-symbol')) {
                    $button.attr('data-symbol', initialSymbol);
                    if (debug) console.log('Initialized data-symbol for button:', $button.text());
                }
                // Установка title, если не задан
                if (!$button.attr('title')) {
                    $button.attr('title', $button.data('content') || 'No content');
                    if (debug) console.log('Initialized title for button:', $button.attr('title'));
                }
            });

            $buttons.off('click').on('click', function(e) {
                e.stopImmediatePropagation();
                var $button = $(this);
                var baseText = $button.text();
                var content = $button.data('content') || '';

                if (typeof content !== 'string') {
                    content = String(content || '');
                }

                if (content) {
                    if (content.match(/^https:\/\/pastebin\.com\/raw\//)) {
                        if (debug) console.log('Loading Pastebin:', content);
                        $.get(corsProxy + encodeURIComponent(content), function(data) {
                            var text = (typeof data === 'string' ? data : data.contents || '').trim();
                            if (text) {
                                if (debug) console.log('Loaded text from Pastebin:', text.substring(0, 100) + '...');
                                copyText(text, $button, baseText);
                            } else {
                                if (debug) console.error('No content from Pastebin:', content);
                                handleError($button, baseText, 'No content from Pastebin');
                            }
                        }).fail(function(jqXHR, textStatus, error) {
                            if (debug) console.error('Pastebin load error:', textStatus, error, 'for URL:', content);
                            handleError($button, baseText, 'Pastebin load error: ' + textStatus);
                        });
                    } else {
                        if (debug) console.log('Direct text:', content.substring(0, 100) + '...');
                        copyText(content, $button, baseText);
                    }
                } else {
                    if (debug) console.error('No content to copy');
                    handleError($button, baseText, 'No content to copy');
                }
            });
            if (debug) console.log('Buttons found and bound:', $buttons.length);
        } else if (attempts > 0) {
            if (debug) console.log('No copy-to-clipboard-button elements found, retrying... (' + attempts + ' attempts left)');
            setTimeout(() => checkButtons(attempts - 1), 500);
        }
    }

    function copyText(text, $button, baseText) {
        if (text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        if (debug) console.log('Copy successful');
                        updateButton($button, baseText, successSymbol);
                    })
                    .catch(err => console.error('Error copying text: ', err));
            } else {
                var $input = $('<textarea>').val(text).appendTo('body').select();
                var success = document.execCommand('Copy');
                $input.remove();
                if (success) {
                    if (debug) console.log('Fallback copy successful');
                    updateButton($button, baseText, successSymbol);
                } else {
                    if (debug) console.error('Fallback copy failed');
                }
            }
        } else {
            if (debug) console.error('No text to copy');
            handleError($button, baseText, 'No text to copy');
        }
    }

    function updateButton($button, baseText, symbol) {
        $button.attr('data-symbol', symbol); // Меняем символ через data-symbol
        setTimeout(() => {
            $button.attr('data-symbol', initialSymbol); // Возвращаем исходный символ
        }, duration);
    }

    function handleError($button, baseText, message) {
        if (debug) console.error(message);
        $button.text(message);
        setTimeout(() => {
            $button.text(baseText); // Возвращаем базовый текст
            $button.attr('data-symbol', initialSymbol); // Восстанавливаем стрелочку
        }, duration);
    }

    // Запуск проверки сразу и повтор при необходимости
    checkButtons();
    // Перезапуск после изменений DOM (например, предпросмотр)
    $(document).on('DOMSubtreeModified', function() {
        if (debug) console.log('DOM changed, reinitializing buttons.');
        checkButtons();
    });
});