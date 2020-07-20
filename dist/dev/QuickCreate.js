$('.wds-community-header__wiki-buttons .createpage')
    .off()
    .wrap($('<div />', {
        class: 'wds-dropdown'
    }))
    .addClass('wds-dropdown__toggle')
    .removeAttr('href data-tracking')
    .removeClass('createpage')
    .css('border-right', 'none')
    .append('<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wds-icons-dropdown-tiny"></use></svg>')
    .after(
        $('<div />', {
            class: 'wds-dropdown__content'
        }).append(
            $('<ul />', {
                class: 'wds-list wds-is-linked'
            }).append(
                $('<li />').html(
                    $('<a />', {
                        href: '/wiki/Special:CreateBlogPage'
                    }).text('Blog')
                ),
                $('<li />').html(
                    $('<a />', {
                        href: '/wiki/Special:CreatePage'
                    }).text('Article')
                ),
                $('<li />').html(
                    $('<a />', {
                        href: '/wiki/Special:Upload'
                    }).text('Image').click(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
 
                        loadAssets({
                            name: 'uploadImage',
                            scripts: ['upload_photos_dialog_js'],
	                    styles: '//extensions/wikia/WikiaNewFiles/styles/UploadPhotoDialog.scss',
                            callback: function() {
                                UploadPhotos.showDialog();
                            }
                        })
                    })
                ),
                $('<li />').html(
                    $('<a />', {
                        href: '/wiki/Special:Videos'
                    }).text('Video').click(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
 
                        loadAssets({
                            scripts: ['ace_editor_plugins_js','mini_editor_js'],
                            name: 'uploadVideo',
                            callback: function() {
                                WikiaEditor.load('VideoEmbedTool').done(function() {
                                    window.vetWikiaEditor({
                                        target: {
                                            id: 'mw-editbutton-vet'
                                        }
                                    });
                                })
                            }
                        });
                    })
                )
            )
        )
    )
 
$.nirvana.sendRequest({
    controller: 'UploadPhotos',
	method: 'Index',
	format: 'html',
	cb:0,
    title: 'Spezial:Bilder',
    uselang: 'de'
})
 
function loadAssets(options) {
    if (typeof window['loaded' + options.name] == 'undefined') {
        if(options.hasOwnProperty('scripts') && options.scripts.length && $.type(options.scripts) == 'array') {
            options.scripts = options.scripts.join(',')
        }
        params = {};
        ['scripts', 'styles', 'sassParams', 'templates', 'messages', 'mustache'].forEach(function(type) {
            if(options.hasOwnProperty(type) && options[type].length) {
                params[type] = options[type];
            }
        });
        $.nirvana.getJson('AssetsManagerController', 'getMultiTypePackage', params, function(res) {
            if (res.hasOwnProperty('scripts') && res.scripts.length || res.hasOwnProperty('styles') && res.styles.length) {
                if (res.hasOwnProperty('scripts') && res.scripts.length) {
                    res.scripts.forEach(function(script) {
                        $(document.body).append($('<script />', {
                            id: 'user-loaded-scripts'
                        }).text(script));
                    });
                }
                if (res.hasOwnProperty('styles') && res.styles.length) {
                    $(document.body).append($('<style />', {
                        id: 'user-loaded-styles'
                    }).text(res.styles));
                }
                options.callback();
                console.log('successful');
                window['loaded' + options.name] = true;
            }
            else {
                console.error('something went wrong');
            }
        });
    } else {
        options.callback();
    }
}