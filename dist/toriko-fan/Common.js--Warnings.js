(function ($, mwConfig) {
    "use strict";

    // Spoiler Warning For forms
    if (mwConfig.wgAction === 'formedit') {
        $('#mw-content-text').prepend('<div class=warningmessage>Do <strong>NOT</strong> add new manga information to the wiki until the entire chapter is available.</div>');
    }

    if (mwConfig.wgNamespaceNumber > 0 && mwConfig.wgNamespaceNumber % 2 === 1 && /\/[Aa]rchive[^\/]*$/.test(mwConfig.wgTitle)) {
        $(function ($) {
            var $editLink;
            if (mwConfig.skin === 'oasis') {
                // Remove edit links whilst preserving Rename and Protect
                $('li > a#ca-edit').parent().remove();
                $editLink = $('#WikiaPageHeader .wikia-menu-button > a');
                if (mwConfig.wgAction === 'edit') {
                    var $n = $('<li>This is an archive, it is <strong>NOT</strong> a talkpage. Please refrain from editing it without a good reason.</li>');
                    $('#EditPageEditor .editpage-notices ul').empty().append($n);
                }
            } else { // Monobook
                $('#ca-addsection').remove();
                $editLink = $('#ca-edit a');
            }
            $editLink.removeAttr('href').prop('title', 'This page is an archive and should not be edited.').text('Archive').css('color', '#bbb');
        });
    }
}(jQuery, mediaWiki.config.values));