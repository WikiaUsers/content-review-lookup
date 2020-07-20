/*
  Szybki podgląd zmian na MonoBooku.
  Źródło: [[w:c:runescape:User:Quarenon/quickpreview.js]].
  Przetłumaczone.
*/
if (skin == 'monobook' && (wgAction == 'edit' || wgAction == 'submit')) {
        $(document).ready(function() {
                var attrs = {
                        tabindex: 6,
                        accesskey: 'g',
                        id: 'dlQuickPreview',
                        title: 'Preview your changes'
                };
                var $button = $('<input type="button" />').val('Szybki podgląd').attr(attrs).click(function() {
                        $(this).val('Pobieranie podglądu').attr('disabled', 'disabled');

                        var f = document.editform;

                        $.ajax({
                                data: {
                                        'wpMinoredit': f.wpMinoredit.checked,
                                        'wpWatchthis': f.wpWatchthis.checked,
                                        'wpStarttime': f.wpStarttime.value,
                                        'wpEdittime': f.wpEdittime.value,
                                        'wpAutoSummary': f.wpAutoSummary.value,
                                        'wpEditToken': f.wpEditToken.value,
                                        'wpSummary': 'Quick preview',
                                        'wpTextbox1': f.wpTextbox1.value
                                },
                                dataType: 'text',
                                type: 'POST',
                                url: wgArticlePath.replace('$1',escape(wgPageName)) + document.location.search.replace('&action=edit', '&action=submit') + '&wpPreview=true&live=true',
                                success: function(response) {
                                        $('#wikiPreview').css('display', 'block').html(response.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
                                        $('#dlQuickPreview').val('Szybki podgląd').removeAttr('disabled');
                                }
                        });

                });

                $('.editOptions .editButtons input').eq(1).after($button);
        });
}