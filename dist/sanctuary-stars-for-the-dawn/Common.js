/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    console.log('JS loaded');
    var initialSymbol = '▶';
    var successSymbol = '✔';
    var duration = 2000;
    var wikiBaseUrl = 'https://sanctuary-stars-for-the-dawn.fandom.com/wiki/';

    function checkButtons() {
        var $buttons = $('.copy-to-clipboard-button');
        if ($buttons.length > 0) {
            $buttons.off('click').on('click', function(e) {
                e.stopImmediatePropagation();
                var $button = $(this);
                var originalText = $button.text();
                var content = $button.data('content') || '';

                // Приводим content к строке
                if (typeof content !== 'string') {
                    content = String(content || '');
                }

                if (content) {
                    if (content.match(/^Template:Copytxt\//)) {
                        // Это подстраница, подгружаем через ?action=raw
                        var pageTitle = content;
                        $.get(wikiBaseUrl + pageTitle + '?action=raw', function(rawText) {
                            // Удаляем <pre> и </pre>
                            var text = rawText.replace(/<\/?pre>/g, '').trim();
                            if (text) {
                                console.log('Loaded raw text from wiki:', text.substring(0, 100) + '...');
                                copyText(text, $button, originalText);
                            } else {
                                console.error('No content on page:', pageTitle);
                                $button.text('Empty page');
                                setTimeout(function() {
                                    $button.text(originalText);
                                }, duration);
                            }
                        }).fail(function(jqXHR, textStatus, error) {
                            console.error('Raw text load error:', textStatus, error, 'for page:', pageTitle);
                            $button.text('Error loading text');
                            setTimeout(function() {
                                $button.text(originalText);
                            }, duration);
                        });
                    } else {
                        // Простой текст, копируем напрямую
                        console.log('Direct text:', content.substring(0, 100) + '...');
                        copyText(content, $button, originalText);
                    }
                } else {
                    console.error('No content to copy');
                    $button.text('No text available');
                    setTimeout(function() {
                        $button.text(originalText);
                    }, duration);
                }
            });
            console.log('Buttons found and bound:', $buttons.length);
        } else {
            console.log('No copy-to-clipboard-button elements found, retrying...');
            setTimeout(checkButtons, 500);
        }
    }

    function copyText(text, $button, originalText) {
        if (text) {
            // Заменяем табы на пробелы для PotPlayer
            text = text.replace(/\t/g, ' ').trim();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        console.log('Copy successful');
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
                    console.log('Fallback copy successful');
                    $button.text(originalText.replace(initialSymbol, successSymbol));
                    setTimeout(function() {
                        $button.text(originalText);
                    }, duration);
                } else {
                    console.error('Fallback copy failed');
                }
            }
        } else {
            console.error('No text to copy');
            $button.text('No text available');
            setTimeout(function() {
                $button.text(originalText);
            }, duration);
        }
    }

    checkButtons();
});