;(function(mw, $, mediaViewer){
    var mw_config = mw.config.get([
            'skin',
            'wgPageName',
            'wgCanonicalSpecialPageName',
            'wgUserName'
        ]),
        settings = $.extend(mediaViewer, {
            isOasis: (
                typeof Array.prototype.some !== 'undefined' ?
                Array.prototype.some.call(['oasis', 'wikia'], function(s){
                    return mw_config.skin == s;
                }) :
                ['oasis', 'wikia'].indexOf(mw_config.skin) > -1
            ),
            isImages: mw.config.wgCanonicalSpecialPageName == 'Images',
            noop: false
        });
    
    if (!settings.isOasis || !settings.isImages){
        settings.noop = true;
    }
    
    if (settings.noop) return;
    else {
        $(document).ready(function(){
            if (!$('.wikia-gallery-item').length) return;
            $('.wikia-gallery-item').each(function(index){
                var $item = $(this),
                    $lightbox = $item.find('a.image.lightbox'),
                    $caption = $item.find('.lightbox-caption');
                $lightbox.on('click', function(event){
                    event.preventDefault();
                    var $mediaViewer = $('<section />', { 'class': 'media-viewer', 'id': 'media-viewer'}),
                        $mvWrapper = $('<figure />', { 'class': 'media-viewer-wrapper mw-wrapper', 'id': 'media-viewer-wrapper'}),
                        link = $(event.target).attr('href'),
                        image_src = $(event.target).find('img').prop('src'),
                        user = $caption.find('.wikia-gallery-item-user').text();
                    $mvWrapper.html(function(){
                        var $mvImage = $('<img />', { 'class': 'media-viewer-image mv-image', 'src': image_src }),
                            $mvDescription = $('<figcaption />', { 'class': 'media-viewer-description mv-description'});
                        $mvDescription.html(function(){
                            var $descHeader = $('<h2 />', { 'class': 'description-header', 'id': 'description-header', html: $(event.target).find('img').attr('data-image-name') }),
                                $descContent = $('<div />', { 'class': 'description', 'id': 'description-content' });
                            $descContent.html([
                                $('<div />', { 'class': 'description-user' })
                                    .html(function(){
                                        var $avatar = $('<img />', { 'class': 'description-avatar'}),
                                            $user = $('<span />', { 'class': 'description-user', text: user });
                                        $.ajax({
                                            method: 'GET',
                                            dataType: 'json',
                                            url: mw.util.wikiScript('wikia'),
                                            data: {
                                                controller: 'UserProfilePageController',
                                                method: 'renderUserIdentityBox',
                                                title: 'User:' + user,
                                                format: 'json'
                                            }
                                        }).done(function(data){
                                            if (!data.error || typeof data.error !== 'undefined'){
                                                var avatar_src = data.user.avatar;
                                                $avatar.attr('src', avatar_src);
                                            }
                                        });
                                        
                                        return [$avatar, $user];
                                    }),
                                $('<a />', { 'class': 'wds-button', 'href': link, text: 'More details'})
                            ]);
                            
                            return [$descHeader, $descContent];
                        });
                        
                        return [$mvImage, $mvDescription];
                    });
                    $mediaViewer.html($mvWrapper);
                    $('.WikiaSiteWrapper').append($mediaViewer);
                });
            });
        });
    }
})(this.mediaWiki, this.jQuery, this.MediaViewer = this.MediaViewer || {});