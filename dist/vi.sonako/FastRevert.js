$(function(){
    fasttoken = mw.user.tokens.values.editToken;
    dspan = '<span style="font-weight:bold;">(Xong!)</span>';
    specName = {
        ar: ['نقل_صفحة', 'استرجاع'],
        en: ['MovePage','Undelete'],
        es: ['MoverPágina','Restaurar'],
        fr: ['Renommer_une_page','Restaurer'],
        de: ['Verschieben','Wiederherstellen'],
        pl: ['Przenieś','Odtwórz'],
        it: ['Sposta','Ripristina'],
        pt: ['Mover_página','Restaurar'],
        ja: ['移動','復帰'],
        hu: ['Lap_átnevezése','Törölt_lapváltozatok_visszaállítása']
    };
    specName = $.extend(specName.en, specName[wgContentLanguage]);
 
    // Fast Reverting page's rename + Fast Undelete page
    if ($('.mw-logevent-actionlink a').length && ($('.mw-logevent-actionlink a').attr('href').search(encodeURIComponent(specName[0])) > -1 || $('.mw-logevent-actionlink a').attr('href').search(encodeURIComponent(specName[1])) > -1)) {
        $('.mw-logevent-actionlink a').after('&nbsp;|&nbsp;<a class="FAL" style="cursor:pointer;">fast revert</a>');
        $('.FAL').click(function() {
            var revBody = $(this).parent();
            if ($('.mw-logevent-actionlink a').attr('href').search(specName[1]) > -1) {
                var pageToRestore = revBody.find('a:nth-child(1)').attr('href').replace(/.*target=(.+)/,'$1');
                    url = '/wiki/Special:Undelete',
                    data = {
                        action:'submit',
                        wpComment:'Restoring page.',
                        restore:'Restoring page',
                        target:decodeURIComponent(pageToRestore),
                        wpEditToken:fasttoken
                    };
            } else { // Action for renaming
                var getHref = revBody.find('a:nth-child(1)').attr('href'),
                    nameAfter = getHref.replace(/.*wpNewTitle=(.+)&wpReason.*/,'$1'),
                    nameBefore = getHref.replace(/.*wpOldTitle=(.+)&wpNewTitle.*/,'$1'),
                    url = '/wiki/Special:MovePage',
                    data = {
                        action:'submit',
                        wpNewTitleNs:'0',
                        wpNewTitleMain:decodeURIComponent(nameAfter),
                        wpOldTitle:decodeURIComponent(nameBefore),
                        wpReason:'Reverting.',
                        wpMovesubpages:'1',
                        wpMove:'Rename page',
                        wpEditToken:fasttoken
                    };
            }
            $.post(url, data).done(function() {
                revBody.replaceWith(dspan);
            });
        });
    }
 
    // Fast Revert File
    if (wgCanonicalNamespace === 'File') {
        $('td:nth-child(2) > a:nth-child(1)').each(function() {
            $(this).after('\n<a class="FRF" style="cursor:pointer;">revert</a>');
        });
        $('.FRF').click(function() {
            var that = this,
                file = wgTitle.replace(/\s/g,'_'),
                archname = $(this).prev().attr('href').replace(/.*oldimage=(\S+)&.*/,'$1');
            $.post("/api.php", {action:'filerevert', filename:file, archivename:decodeURIComponent(archname), comment:'Reverting.', token:fasttoken}).done(function() {
                $(that).replaceWith(dspan);
            });
        });
    }
});