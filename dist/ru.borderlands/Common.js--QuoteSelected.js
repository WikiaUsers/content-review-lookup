// AdvancedQuoting
// License: WTFPL
$(function () {
    function getSelectedText(target) {   
        var selection;
        var selectedElement;
        var selectedText = '';    
        if (window.getSelection) {   
            selection = window.getSelection();
        }    
        else if (document.getSelection) {    
            selection = document.getSelection();
        }     
        else {
            return null;
        }
 
        if (selection.rangeCount > 0) {
            selectedElement = selection.getRangeAt(0).startContainer.parentNode;
        }
        if (selectedElement && $(target).find($(selectedElement)).length) {
            selectedText = selection.toString();
            return selectedText;
        } else {
            return null;
        }
    }
 
    if (mw.config.get('wgNamespaceNumber') === 1201) {
        $('.message-main').each(function () {
            $this = $(this);
            $this.find('.quote-button').click(function () {
                $this.find('.wikiaEditor').val('');
                var selectedText = getSelectedText($this);
                if (selectedText === null) {
                    return;
                }
                var username = $(this).parents('.MiniEditorWrapper').find('.edited-by').text().trim();
                var quoteText = '<div class="quote">\n' +
                    'От ' + username + ':\n' +
                    selectedText.trim() + '\n' +
                    '</div>';
                var editorLoadedInterval = setInterval(function () {
                    if ($this.find('.wikiaEditor').val().length) {
                        clearInterval(editorLoadedInterval);
                        $this.find('.wikiaEditor').val(quoteText);
                    }
                }, 100);
            });
        });
    }
});