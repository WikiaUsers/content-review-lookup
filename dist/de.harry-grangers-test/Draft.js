if(!!$('.draft').length && !!$('.published').length) {
    user = $('.draft').attr('data-user') ? $('.draft').attr('data-user') : '';
    console.log((wgUserName !== user ? 'isn\'t' : 'is') + 'draft editor');
    if(wgUserName !== user) {
        $('a#ca-edit, a#ca-edit ~ ul li a').filter('[href]').each(function(key,val) {
            $(val).attr('href',$(val).attr('href').replace(wgPageName,wgPageName + '/published'));
        });
        $('.draft').detach();
    }
    else {
        $('#ca-edit ~ ul').prepend(
            $('<li />').append(
                $('<a />').attr({
                    'href': '/wiki/' + wgPageName + '/draft?action=edit',
                    'data-id': 'draft-edit',
                    'id': 'ca-draft-edit'
                }).text('Entwurf bearbeiten')
            )
        );
    }
}

if(/(.*)\/(draft|published)/.test(wgPageName) && !!$('.draft').length + !!$('.published').length == 1) {
    mode = /(.*)\/(draft|published)/.exec(wgPageName)[2];
    article = /(.*)\/(draft|published)/.exec(wgPageName)[1];
    console.warn('article content of',article,'for',mode,'mode');
    user = $('.' + mode).attr('data-user') ? $('.' + mode).attr('data-user') : '';
    if(wgUserName !== user) {
        $('a#ca-edit').closest('.wikia-menu-button').detach();        
        $('.draft').html(
            $('<i />').append('Dieser Artikel befindet sich im Entwurfsmodus. Du kannst dir nur ').append(
                $('<a />').attr('href','/wiki/' + article).text('die veröffentliche Version')
            ).after(' ansehen!')
        );
    }
}