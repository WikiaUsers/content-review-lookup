    // autosigner by Pecoes:
$(function () {
    talkNameSpaces = [1,3,5,7,9,11,13,15,110,111,114,401,500,501,502,503];
    if (-1 < $.inArray(wgNamespaceNumber, talkNameSpaces) && 'edit' == $.getUrlVar('action')) {
        appendSignature = function () {
            if ($('input#wpMinoredit').is(':checked')) return;
            var sig = '-- ~~' + String.fromCharCode(126) + '~';
            switch (editorInstance.mode) {
                case 'wysiwyg':
                    editorInstance.getEditbox().append(sig);
                break;
                case 'source':
                    editorInstance.setContent(editorInstance.getContent() + sig);
                break;
            }
        }
        $('input#wpSave').click(appendSignature);
        $('a#publish').click(appendSignature);
    }
});