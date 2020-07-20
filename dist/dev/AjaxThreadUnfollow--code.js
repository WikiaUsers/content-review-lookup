/*
 * AjaxThreadUnfollow
 * Allows to quickly unfollow threads directly from your notifications
 * Personal use only
 * @author Dorumin
 */

(function() {
    var i18n,
    overriden = {
        read: [],
        unfollowed: []
    };
    
    function unfollow(page, wiki) {
        return $.ajax({
            type: 'POST',
            dataType: 'text',
            url: 'https://' + wiki + '.wikia.com/api.php',
            method: 'POST',
            data: {
                action: 'watch',
                unwatch: 1,
                title: page,
                token: mw.user.tokens.get('watchToken')
            },
            xhrFields: {
                withCredentials: true
            },
            crossdomain: true
        });
    }
    
    function mark_as_read(url) {
        return $.Deferred(function(def) {
            $.get(url).done(function() {
                def.resolve();
            }).fail(function() { // iframe magic
                var iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.style.display = 'none';
                iframe.onload = function() {
                    def.resolve();
                    document.body.removeChild(iframe);
                };
                document.body.appendChild(iframe);
            });
        });
    }
    
    function wiki_page_from_url(url) {
        var match = url.match(/https?:\/\/(.+?)\.wikia\.com\/(?:wiki\/)?(.+)/);
        if (!match) return null;
        return [match[1], decodeURIComponent(match[2])];
    }
    function init(_i18n) {
        i18n = _i18n;

        $('#notifications').on('mouseover', '.notification.unread', function() {
            this.title = i18n.msg('title').plain();
        }).on('click', '.notification.unread', function(e) {
            var $this = $(this),
            url = $this.children().attr('href'),
            match = wiki_page_from_url(url);
            if (e.shiftKey && e.ctrlKey) {
                e.preventDefault();
                
                unfollow(match[0], match[1]).always(function() {
                    mark_as_read(url).done(function() {
                        overriden.unfollowed.push(url);
                        $this.replaceWith(
                            $('<li>', {
                                'class': 'notification read',
                                append: $('<div>', {
                                    class: 'notfication-message',
                                    css: {
                                        textAlign: 'center',
                                    },
                                    text: i18n.msg('unfollowed').plain()
                                })
                            })
                        );
                    });
                });
            } else if (e.shiftKey) {
                
                e.preventDefault();
                
                mark_as_read(url).done(function() {
                    overriden.read.push(url);
                    $this.replaceWith(
                        $('<li>', {
                            'class': 'notification read',
                            append: $('<div>', {
                                class: 'notfication-message',
                                css: {
                                    textAlign: 'center',
                                },
                                text: i18n.msg('read').plain()
                            })
                        })
                    );
                });
            }
        });
        
        if (!window.MutationObserver) return;
        
        var notifications = document.getElementById('notifications'),
        observer = new MutationObserver($.throttle(100, function(mutations) {
            overriden.read.forEach(function(url) {
                var a = document.querySelector('#notificationsContainer a[href="' + url + '"]');
                if (!a) return;
                
                $(a.parentElement).replaceWith(
                        $('<li>', {
                            'class': 'notification read',
                            append: $('<div>', {
                                class: 'notfication-message',
                                css: {
                                    textAlign: 'center',
                                },
                                text: i18n.msg('read').plain()
                            })
                        })
                    );
            });
            overriden.unfollowed.forEach(function(url) {
                var a = document.querySelector('#notificationsContainer a[href="' + url + '"]');
                if (!a) return;
                
                $(a.parentElement).replaceWith(
                    $('<li>', {
                        'class': 'notification read',
                        append: $('<div>', {
                            class: 'notfication-message',
                            css: {
                                textAlign: 'center',
                            },
                            text: i18n.msg('unfollowed').plain()
                        })
                    })
                );
            });
        }));
    
        if (!notifications) return;
    
        observer.observe(notifications,  {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    
    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('AjaxThreadUnfollow').then(init);
    });
    
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
})();