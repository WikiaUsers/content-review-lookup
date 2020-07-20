/* ChatLinkPreview
 *
 * Renders previews for links pasted in chat using Wikia's OpenGraph service endpoint
 *
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') != 'Chat' ||
        !window.Promise
    ) return;

    window.ChatLinkPreview = $.extend({
        previewLocalLinks: false,
        maxDescription: 200,
        maxHeight: 300,
        maxWidth: 400,
        // For managing resources
        _preload: 0,
        preload: function() {
            if (++this._preload == 3) {
                this.init();
            }
        },
        // Utility
        promisify: function(deferred) {
            // Yes, I do need promises from deferred to chain after failures with Promise.all because $.when sucks
            return new Promise(function(resolve, reject) {
                deferred.done(resolve).fail(reject);
            });
        },
        getRoom: function(roomId) {
            return mainRoom.chats.privates[roomId] || mainRoom;
        },
        // Taken directly from ChatView.prototype.processText
        linkRegex: /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig,
        onMessage: function(model) {
            var links = this.matchLinks(model.attributes.text),
            entry = document.getElementById('entry-' + model.cid),
            roomId = entry
                ? $(entry).closest('.Chat').attr('id').slice(5)
                : mainRoom.roomId,
            room = this.getRoom(roomId);

            if (!this.previewLocalLinks) {
                links = _.uniq(links.filter(function(link) {
                    // Pretty funny to see indexOf being used as a boolean, but it works so
                    return link.indexOf(mw.config.get('wgServer'));
                }));
            }

            Promise.all(links.map(this.loadLinkData.bind(this))).then(function(pages) {
                pages = pages.filter(function(page) {
                    return !page.error;
                });

                if (!pages.length) return;

                var vd = room.viewDiscussion,
                div = vd.chatDiv.get(0),
                shouldScroll = div.scrollHeight - div.scrollTop - div.clientHeight < 100;
                dev.ui({
                    type: 'div',
                    classes: ['link-previews'],
                    children: pages.map(this.buildPreview.bind(this)),
                    parent: entry
                });

                if (shouldScroll) {
                    div.offsetHeight; /* Trigger reflow */
                    vd.scrollToBottom();
                }
            }.bind(this));
        },
        matchLinks: function(text) {
            this.linkRegex.lastIndex = 0;
            var links = [],
            m;
            while (m = this.linkRegex.exec(text)) {
                links.push(m[0]);
            }
            return links;
        },
        // Note: url encoding necessary (facepalm)
        loadLinkData: function(url) {
            return this.promisify($.ajax({
                url: 'https://services.fandom.com/opengraph?uri=' + encodeURIComponent(url),
                xhrFields: {
                    withCredentials: true
                }
            }))['catch'](function(res) {
                return $.extend(JSON.parse(res.responseText), {
                    error: true
                });
            });
        },
        getDimensions: function(height, width, maxHeight, maxWidth) {
            maxHeight = maxHeight || this.maxHeight;
            maxWidth = maxWidth || this.maxWidth;
            var h = height / maxHeight,
            w = width / maxWidth,
            max = Math.max(h, w);

            return {
                height: Math.min(height, height / max),
                width: Math.min(width, width / max)
            };
        },
        buildPreview: function(og) {
            switch (og.type.split('.').shift()) {
                case 'image':
                    return this.buildImage(og);
                default:
                    return this.buildPage(og);
            }
        },
        buildMedia: function(og, thumb) {
            if (og.videoSecureUrl && og.videoType == 'text/html') return this.buildVideo(og);
            return this.buildImage(og, thumb);
        },
        buildVideo: function(og) {
            return {
                type: 'div',
                classes: ['ChatLinkPreview-preview'],
                children: [
                    this.buildImage(og),
                    this.buildVideoControls(og)
                ]
            };
        },
        buildVideoControls: function(og) {
            return {
                type: 'div',
                classes: ['ChatLinkPreview-controlsWrapper'],
                children: [
                    {
                        type: 'div',
                        classes: ['ChatLinkPreview-controls'],
                        children: [
                            dev.wds.icon('play'),
                            {
                                type: 'a',
                                classes: ['ChatLinkPreview-external'],
                                attr: {
                                    href: og.url,
                                    rel: 'noreferrer noopener',
                                    target: '_blank'
                                },
                                children: [
                                    dev.wds.icon('external')
                                ]
                            }
                        ]
                    }
                ],
                events: {
                    click: function(e) {
                        var $target = $(e.target),
                        dimensions = this.getDimensions(og.imageHeight, og.imageWidth);
                        if ($target.closest('a').exists()) return;

                        $target.closest('.ChatLinkPreview-preview').empty().append(
                            dev.ui({
                                type: 'iframe',
                                attr: {
                                    src: this.getVideoURL(og.videoSecureUrl),
                                    allow: 'fullscreen; autoplay',
                                    allowfullscreen: 1,
                                    frameborder: 0,
                                    height: dimensions.height,
                                    width: dimensions.width
                                }
                            })
                        );
                    }.bind(this)
                }
            };
        },
        getVideoURL: function(url) {
            if (url.indexOf('youtube.com/embed/') != -1) {
                return url + '?autoplay=1&auto_play=1';
            }
            return url;
        },
        ellipsis: function(text) {
            if (!text) return text;
            if (text.length > this.maxDescription - 3) return text.slice(0, this.maxDescription - 3).trim().replace(/[:;\.,]+$/, '') + '...';
            return text;
        },
        buildImage: function(og, thumb) {
            var dimensions = this.getDimensions(og.imageHeight, og.imageWidth, thumb ? 80 : null, thumb ? 80 : null);
            return {
                type: 'img',
                classes: ['ChatLinkPreview-image'].concat(thumb ? ['thumbnail'] : []),
                attr: {
                    src: og.imageUrl
                },
                style: {
                    width: dimensions.width + 'px',
                    height: dimensions.height + 'px'
                },
                events: {
                    click: this.showImageModal.bind(this, og)
                },
                condition: og.imageUrl && og.imageHeight && og.imageWidth
            };
        },
        buildPage: function(og) {
            var aspectRatio = og.imageHeight / og.imageWidth,
            thumb = aspectRatio > .9 && aspectRatio < 1.1;
            return {
                type: 'div',
                classes: ['ChatLinkPreview-page'].concat(thumb ? ['thumbnail'] : []),
                attr: {
                    'data-site': og.url.split('//')[1].split('/')[0].replace(/^www\./i, '')
                },
                children: [
                    {
                        type: 'div',
                        classes: ['ChatLinkPreview-content'],
                        style: {
                            'max-width': this.maxWidth + 'px'
                        },
                        children: [
                            {
                                type: 'div',
                                classes: ['ChatLinkPreview-metadata'],
                                children: [
                                    {
                                        type: 'div',
                                        classes: ['sitename'],
                                        condition: og.siteName,
                                        children: [
                                            {
                                                type: 'a',
                                                classes: ['sitename-link'],
                                                attr: {
                                                    href: og.url.split('/').slice(0, 3).join('/')
                                                },
                                                text: og.siteName
                                            }
                                        ]
                                    },
                                    {
                                        type: 'div',
                                        classes: ['title'],
                                        condition: og.title,
                                        children: [
                                            {
                                                type: 'a',
                                                classes: ['title-link'],
                                                attr: {
                                                    href: og.url
                                                },
                                                text: og.title
                                            }
                                        ]
                                    },
                                    {
                                        type: 'div',
                                        classes: ['description'],
                                        text: this.ellipsis(og.description),
                                        condition: og.description
                                    }
                                ]
                            },
                            this.buildMedia(og, thumb)
                        ]
                    }
                ]
            };
        },
        showImageModal: function(og) {
            if (!og.imageUrl) return {};
            var dimensions = this.getDimensions(og.imageHeight, og.imageWidth, innerHeight / 3 * 2, innerWidth / 3 * 2),
            modal = dev.ui({
                type: 'div',
                classes: ['ChatLinkPreview-modal'],
                children: [
                    {
                        type: 'a',
                        attr: {
                            target: '_blank',
                            href: og.type == 'image' ? og.originalUrl : og.imageUrl
                        },
                        children: [
                            {
                                type: 'img',
                                classes: ['ChatLinkPreview-modalImage'],
                                attr: {
                                    src: og.imageUrl
                                },
                                style: {
                                    width: dimensions.width + 'px',
                                    height: dimensions.height + 'px'
                                }
                            }
                        ]
                    }
                ],
                events: {
                    click: function() {
                        modal.classList.add('reset-animation');
                        modal.offsetHeight; /* trigger reflow */
                        modal.classList.remove('reset-animation');
                        modal.classList.add('fading-out');
                        setTimeout(function() {
                            document.body.removeChild(modal);
                        }, 1000);
                    }
                },
                parent: document.body
            });
        },
        bindToMessages: function(fn) {
            mainRoom.model.chats.models.forEach(function(model) {
                fn(model, true);
            });
            mainRoom.model.chats.bind('afteradd', fn);
            for (var id in mainRoom.chats.privates) {
                var room =  mainRoom.chats.privates[id];
                room.model.chats.models.forEach(function(model) {
                    fn(model, true);
                });
                room.model.chats.bind('afteradd', fn);
            }
            mainRoom.model.privateUsers.bind('add', function (u) {
                var id = u.attributes.roomId,
                room =  mainRoom.chats.privates[id];
                room.model.chats.models.forEach(function(model) {
                    fn(model, true);
                });
                room.model.chats.bind('afteradd', fn);
            });
        },
        init: function() {
            this.bindToMessages(this.onMessage.bind(this));
        }
    }, window.ChatLinkPreview);

    
    mw.hook('dev.ui').add(ChatLinkPreview.preload.bind(ChatLinkPreview));
    mw.hook('dev.wds').add(ChatLinkPreview.preload.bind(ChatLinkPreview));
    mw.hook('dev.chat.render').add(ChatLinkPreview.preload.bind(ChatLinkPreview));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:WDSIcons/code.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:Chat-js.js'
        ]
    }, {
        type: 'style',
        articles: [
            'u:dev:MediaWiki:ChatLinkPreview.css'
        ]
    });
})();