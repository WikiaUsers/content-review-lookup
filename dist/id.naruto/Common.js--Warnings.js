(function ($, mwConfig) {
    "use strict";

    // Spoiler Warning For edit
    if (mwConfig.wgAction === 'Clasic editor') {
        $('#mw-content-text').prepend('<div class=warningmessage><center><big><strong style="color:red; font-size:120%">Jangan</strong> menambahkan informasi manga baru untuk wiki ini sampai seluruh bab manga tersedia.</big></center></div>');
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