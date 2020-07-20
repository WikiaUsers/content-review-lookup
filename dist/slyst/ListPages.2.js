$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Allpages' &&
       $.getUrlVar('from') &&
       $.getUrlVar('to') &&
       $('.mw-allpages-table-chunk').length
    ) {
        $('.mw-allpages-table-chunk').before('<textarea id="listpages" rows="5" cols="100"></textarea>');
        $('.mw-allpages-table-chunk td').each(function() {
            $('#listpages').append($(this).find('a').text() + '\n');
        });
    }
});