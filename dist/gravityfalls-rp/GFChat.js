
// GRAVITY FALLS: UN WIKI DE MISTERIOS (Versión 2.0 - Fase final)
// Códigos JS- oficiales creados por  el [[Usuario:DeviantSalens]]
// Adaptaciones oficiales realizadas por  [[Usuario:Deviantserpent]]
// PROHIBIDO COPIAR EL CÓDIGO, ESTO ES EXCLUSIVO PARA es.gravityfalls
//  USO LEGÍTIMO PARA ESTE WIKI, EVITE SANCIONES POR LOS TDU DE WIKIA 
 
/* Notificación de los cambios recientes (Parte 1 de 3)
var notifyChanges = function (d) {
        var name = d.query.recentchanges[0].user,
            title = d.query.recentchanges[0].title,
            comment = d.query.recentchanges[0].comment,
            revid = d.query.recentchanges[0].revid,
            title2 = title.replace(/\?/g, '%3F'),
            comment2 = comment.replace(/"/g, '\''),
            name2;
 
        if (name === mw.config.get('wgUserName')) {
            name2 = 'You';
        } else {
            name2 = '<a href="' + localStorage.getItem('notifyChanges') + '/wiki/User:' + name + '" target="_blank">' + name + '</a>';
        }
 
        $('.watchlist').html(name2 + ' cambió <a href="' + localStorage.getItem('notifyChanges') + '/wiki/' + title2 + '" target="_blank" title="' + comment2 + '" style="text-decoration: none; border-bottom: 1px dotted; cursor: help;">' + title + '</a></span> (<a href="' + localStorage.getItem('notifyChanges') + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">cambios</a>)');
    };
 
(function ($, mw) {
    "use strict";
    // Variables (Para configurar)
    var un = mw.config.get('wgUserName'),
        ttl = 'Chat — Gravity Falls Wiki',
        wk = 'http://es.gravityfalls.wikia.com',
        ytmnthnm = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        ytname;
 
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
        if (localStorage.getItem('notify') !== 'november') {
            $.showCustomModal('<span style="font-weight: bold">Sé bienvenido</span> a nuestro chat', '<div style="font-size: 14px;"><h2>Nuevas Cosas:</h2>Te notifica del cambio más reciente el el wiki<br /><br /><h2>Cambios:</h2>Debido a los cambios en los comentarios de YouTube, sólo se mostrarán <span style="font-weight: bold">los comentarios más populares</span> y no los más recientes.<br />Posibilidad de ver los usuarios conectados y la cantidad de mensajes<br />Opciones avanzadas y la posibilidad de ignorar usuarios.<br /><br /><span style="float: right; font-weight: bold;"><a href="' + wk + '/wiki/Project:Administración" target="_blank">#JuntosPorUnaWikiaMejor</a></span><br /></div>', {
                id: 'notify',
                buttons: [
                    {
                        defaultButton: true,
                        message: 'OK',
                        handler: function () {
                            $('#notify').closeModal();
                        }
                    }
                ]
            });
            localStorage.setItem('notify', 'november');
        }
 
        importStylesheet('MediaWiki:GfChat.css');
 
        // Título del chat
        document.title = ttl;
 
        // Te verás a ti mismo en el chat, y no es tu cuenta títere :P
        $('li#user-' + un).attr('style', 'display: block !important');
 
        // Notificación de los cambios recientes (Parte 2 de 3)
        if (!localStorage.getItem('notifyChanges')) {
            localStorage.setItem('notifyChanges', wk);
        }
 
        var watchList = function () {
                if (localStorage.getItem('notifyChanges') === wk) {
                    $.getJSON(wk + '/api.php', {
                        action: 'query',
                        list: 'recentchanges',
                        rclimit: 1,
                        rcdir: 'older',
                        rctype: 'edit',
                        rcprop: 'ids|user|title|comment',
                        format: 'json'
                    }, function (data) {
                        var name = data.query.recentchanges[0].user,
                            title = data.query.recentchanges[0].title,
                            comment = data.query.recentchanges[0].comment,
                            revid = data.query.recentchanges[0].revid,
                            title2 = title.replace(/\?/g, '%3F'),
                            comment2 = comment.replace(/"/g, '\''),
                            name2;
 
                        if (name === un) {
                            name2 = 'Usted';
                        } else {
                            name2 = '<a href="' + wk + '/wiki/User:' + name + '" target="_blank">' + name + '</a>';
                        }
 
                        $('.watchlist').html(name2 + ' cambió <a href="' + wk + '/wiki/' + title2 + '" target="_blank" title="' + comment2 + '" style="text-decoration: none; border-bottom: 1px dotted; cursor: help;">' + title + '</a></span> (<a href="' + wk + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">cambios</a>)');
                    });
                } else {
                    mw.loader.load(localStorage.getItem('notifyChanges') + '/api.php?action=query&list=recentchanges&rclimit=1&rcprop=ids|user|title|comment&rcdir=older&rctype=edit&format=json&callback=notifyChanges');
                }
            };
 
        $(function () {
            $('.ChatHeader').append('<div class="watchlist"></div>');
            watchList();
        });
 
        setInterval(watchList, 20000);
 
        // Mensajes y ediciones de usuarios
        $('.Rail h1.wordmark').before('<div class="count"><span class="messages-icon"></span><span class="messages"></span>      <span class="users-icon"></span><span class="users"></span></div>');
 
        setInterval(function () {
            // Contador de mensajes
            $('.messages').html($('#Chat_' + mw.config.get('roomId') + ' .message').length);
 
            // Contador de ediciones de usuario
            $('.users').html($('.WikiChatList li.User:not(.ui-sortable-placeholder)').length);
        }, 1);
 
        // Fijo algunos bugs
        var bgfxs = function (chat) {
                $('.continued:first-child').removeClass('continued');
                $('.inline-alert').next('li.continued:not(.inline-alert)').removeClass('continued');
            };
 
        mainRoom.model.chats.bind('afteradd', bgfxs);
 
        var rlct = setInterval(function () {
                if ($('.WikiaSearch').length) {
                    $('.WikiaSearch').css('left', '250px');
                    clearInterval(rlct);
                }
            }, 1);
 
        // Remover lo siguiente
        var rmv = setInterval(function () {
                if ($('.chattopic').length) {
                    $('.chattopic').remove();
                    clearInterval(rmv);
                }
            }, 1);
 
        // Rebootear esto
        $('.WikiChatList').wrap('<div id="WikiChat" />');
        $('.PrivateChatList').wrap('<div id="PrivateChat" />');
 
        mw.loader.using('jquery.ui.sortable', function () {
            $('.WikiChatList').sortable({
                revert: true,
                containment: '#WikiChat',
                handle: 'img',
                axis: 'y',
                cursor: 'ns-resize',
                start: function (e, ui) {
                    ui.placeholder.height(ui.item.height());
                }
            });
 
            $('.PrivateChatList').sortable({
                revert: true,
                containment: '#PrivateChat',
                handle: 'img',
                axis: 'y',
                cursor: 'ns-resize',
                start: function (e, ui) {
                    ui.placeholder.height(ui.item.height());
                }
            });
        });
 
        $('.WikiChatList, .PrivateChatList').on('click', 'li.User', function () {
            // Enlace hacia la página del usuario
            $('.info .username').each(function () {
                var user = $(this).text(),
                    user2 = user.replace(/\?/g, '%3F');
                $(this).replaceWith('<li class="username"><a href="' + wk + '/wiki/User:' + user2 + '" target="_blank">' + user + '</a></li>');
            });
 
            // Enlace hacia las ediciones del usuario
            $('.info .edits').each(function () {
                var user = $(this).siblings('.username').text(),
                    user2 = user.replace(/\?/g, '%3F');
                $(this).replaceWith('<li class="edits"><a href="' + wk + '/wiki/Special:Editcount/' + user2 + '" target="_blank">' + $(this).text() + '</a></li>');
            });
        });
 
        // Acciones y enlaces personalizables
        $('.WikiChatList').on('click', 'li#user-' + un, function () {
            if (!$('.custom').length) {
                $(this).children('.UserStatsMenu').children('.actions').prepend('<ul class="custom"><li><a class="ignore">Ignorar usuarios...</a></li><li><a class="changes">Notificar de cambios...</a></li><hr class="separator" /><li><a href="' + wk + '/wiki/Special:WikiActivity" target="_blank">Wiki actividad</a></li><li><a href="' + wk + '/wiki/Special:RecentChanges" target="_blank">Toda la actividad</a></li><li><a href="' + wk + '/wiki/Special:Preferences" target="_blank">Tus preferecias</a></li></ul><hr class="separator" />');
            }
        });
 
        // Ignorar usuarios
        var aa = JSON.parse(localStorage.getItem('block')),
            bb,
            i;
        if (!localStorage.getItem('block') || localStorage.getItem('block') === 'undefined') {
            bb = '';
        } else {
            for (i in aa) {
                if (aa.hasOwnProperty(i)) {
                    $('head').append('<style type="text/css" id="block4">.Chat li[data-user="' + aa[i] + '"]{display: none;}.Rail li[data-user="' + aa[i] + '"] span.username{text-decoration: line-through !important;}</style>');
                }
            }
        }
 
        $('body').on('click', '.ignore', function () {
            if (localStorage.getItem('block')) {
                aa = JSON.parse(localStorage.getItem('block'));
                bb = aa.join('\n');
            }
 
            $.showCustomModal('Ignorar usuarios', '<div style="text-align: center">Por favor inserta el nombre de los usuarios que quieres ignorar<br />Separados por enter.<br />Los usuarios que estás ignorando aparecen <span style="text-decoration: line-through">tachados</span>.<br /><textarea id="block2" autofocus="autofocus" style="height: 300px; width: 400px; resize: none;">' + bb + '</textarea></div>', {
                id: 'block3',
                buttons: [
                    {
                        message: 'Cancelar',
                        handler: function () {
                            $('#block3').closeModal();
                        }
                    }, {
                        message: "Limpiar",
                        handler: function () {
                            $('#block2').val('');
                        }
                    }, {
                        defaultButton: true,
                        message: 'Ignorar',
                        handler: function () {
                            var a = $('#block2').val(),
                                b = a.split('\n'),
                                c;
 
                            for (i = b.length; i--;) {
                                if (b[i] === '') {
                                    b.splice(i, 1);
                                }
 
                                if (b[i] === un) {
                                    b.splice(i, 1);
                                }
                            }
 
                            c = b.filter(function (elem, pos) {
                                return b.indexOf(elem) === pos;
                            });
 
                            localStorage.setItem('block', JSON.stringify(c));
 
                            $('head #block4').each(function () {
                                $(this).remove();
                            });
 
                            for (var j = 0; j < c.length; j++) {
                                $('head').append('<style type="text/css" id="block4">.Chat li[data-user="' + c[j] + '"]{ display: none; } .Rail li[data-user="' + c[j] + '"] span.username{ text-decoration: line-through !important; }</style>');
                            }
 
                            $('#block3').closeModal();
                            mainRoom.viewDiscussion.scrollToBottom();
                        }
                    }
                ]
            });
 
            // Ocultar
        }).on('click', '.info li a, .custom li a', function () {
            $('.UserStatsMenu').hide();
 
            // Notificación de los cambios recientes (Parte 3 de 3)
        }).on('click', '.changes', function () {
            $.showCustomModal('Notify changes', '<div style="text-align: center">Por favor inserta el wiki del que quieres recibir los últimos cambios.<br />Las notificaciones de los cambios recientes aparecen en menos de 20 segundos.<br /><input id="change" autofocus="autofocus" placeholder="' + localStorage.getItem('notifyChanges').replace('http://', '').replace('.wikia.com', '') + '" style="width: 400px;"></div>', {
                id: 'change2',
                buttons: [
                    {
                        message: 'Cancelar',
                        handler: function () {
                            $('#change2').closeModal();
                        }
                    }, {
                        defaultButton: true,
                        message: 'Cambiar',
                        handler: function () {
                            if ($('#change').val()) {
                                localStorage.setItem('notifyChanges', 'http://' + $('#change').val() + '.wikia.com');
                                $('#change2').closeModal();
                            }
                        }
                    }
                ]
            });
        });
 
        ChatView.prototype.render = function (type) {
            if (this.model.get('text') === '') {
                var params = this.model.get('msgParams');
                params.unshift(this.model.get('wfMsg'));
                var i18nText = $.msg.apply(null, params);
                this.model.set({
                    text: i18nText
                });
            }
 
            var msg = this.model.toJSON(),
                originalTemplate = this.template;
 
            msg.text = this.processText(msg.text, this.model.get('isInlineAlert'));
 
            if (this.model.get('isInlineAlert')) {
                this.template = this.inlineTemplate;
                $(this.el).html(this.template(msg));
                this.template = originalTemplate;
            } else {
                if (msg.text.indexOf('/me ') === 0) {
                    msg.text = msg.text.substr(4);
                    this.template = this.meMessageTemplate;
                    $(this.el).html(this.template(msg));
                    this.template = originalTemplate;
                } else {
                    if (msg.text.indexOf('//me ') === 0) {
                        msg.text = msg.text.substr(1);
                    }
                    $(this.el).html(this.template(msg));
                }
            }
 
            $(this.el).attr('id', 'entry-' + this.model.cid);
 
            if (this.model.get('name')) {
                $(this.el).attr('data-user', this.model.get('name'));
            }
 
            if (type === 'change' || typeof (type) === 'undefined') {
                if (this.model.get('continued') === true) {
                    $(this.el).addClass('continued');
                }
            }
 
            if (this.model.get('name') === un) {
                $(this.el).addClass('you');
            }
 
            var date = new Date(),
                minutes = (date.getMinutes().toString().length === 1) ? '0' + date.getMinutes() : date.getMinutes(),
                seconds = (date.getSeconds().toString().length === 1) ? '0' + date.getSeconds() : date.getSeconds(),
                hours;
 
            if (date.getHours() === 0) {
                hours = 12;
            } else if (date.getHours() > 12) {
                hours = date.getHours() - 12;
            } else {
                hours = date.getHours();
            }
 
            if (this.model.get('timeStamp').toString().match(/^\d+$/)) {
                $(this.el).find('.time').text(hours + ':' + minutes + ':' + seconds);
            }
 
            if (this.model.get('isInlineAlert') === true) {
                // Alerta
                $(this.el).addClass('inline-alert').append('<span class="inline-time">' + hours + ':' + minutes + ':' + seconds + '</span>');
            } else {
                // Archivos
                $(this.el).children('.message').children('a[href$=".bmp"], .message a[href$=".gif"], .message a[href$=".jpeg"], .message a[href$=".JPG"], .message a[href$=".jpg"], .message a[href$=".PNG"], .message a[href$=".png"], .message a[href$=".svg"], .message a[href$=".webp"]').each(function () {
                    var image = $(this).attr('href');
 
                    if (!image.match(/\/wiki\/File:/g) && !image.match(/File:/g)) {
                        $(this).after('<br /><div style="overflow-x: auto; padding-top: 5px;"><img src="' + image + '" /></div>');
                    }
                });
 
                // YouTube
                $(this.el).children('.message').children('a[href*="www.youtube.com/watch?"], a[href*="m.youtube.com/watch?"], a[href*="youtu.be/"]').each(function () {
                    var $this = $(this).text(),
                        result,
                        res,
                        ult,
                        result2,
                        result3,
                        result4,
                        result5,
                        link,
                        link2;
 
                    if (/www\.youtube\.com\/watch\?/.test($this) || /m\.youtube\.com\/watch\?/.test($this)) {
                        if ($this.indexOf('http://') === 0) {
                            result = $this.slice(7);
                        } else if ($this.indexOf('https://') === 0) {
                            result = $this.slice(8);
                        }
 
                        res = result.indexOf('watch?');
                        ult = result.indexOf('v=');
                        result2 = result.slice(0, res + 6) + result.slice(ult);
                        result3 = result2.indexOf('&');
                        result4 = result2.substring(0, result3 !== -1 ? result3 : result2.length);
 
                        if (/www\.youtube\.com\/watch\?/.test($this)) {
                            result5 = result4.replace('www.youtube.com/watch?v=', 'www.youtube.com/embed/');
                        } else {
                            result5 = result4.replace('m.youtube.com/watch?v=', 'www.youtube.com/embed/');
                        }
 
                        link = result5.slice(0, 33);
                        link2 = link.slice(22);
                    } else {
                        if ($this.indexOf('http://youtu.be/') === 0) {
                            result = $this.slice(16);
                        } else if ($this.indexOf('https://youtu.be/') === 0) {
                            result = $this.slice(17);
                        }
 
                        link = 'www.youtube.com/embed/' + result;
                        link2 = result.slice(0, 11);
                    }
 
                    $(this).after('<br /><table><tbody><tr><td><iframe width="560" height="315" src="http://' + link + '?rel=0" frameborder="0" allowfullscreen="allowfullscreen" style="padding-top: 5px"></iframe></td></tr></tbody></table>');
 
                    var $el = $(this).parent('.message').children('table').children('tbody').children('tr').children('td').children('#comments');
                    $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + link2 + '/comments', {
                        v: 2,
                        alt: 'json',
                        'max-results': 50
                    }, function (data) {
                        $(data.feed.entry).each(function () {
                            $(this.author).each(function () {
                                ytname = this.name.$t;
                            });
                            var ytid = this.yt$channelId.$t,
                                ytimage = ytid.slice(2),
                                ytpblshd = this.published.$t,
                                ytdt = ytpblshd.replace(/T/g, ' ').slice(0, 19),
                                ytmnth = ytdt.slice(5, 7),
                                ytyr = ytdt.slice(0, 4),
                                ytdy = ytdt.slice(8, 10),
                                yttm = ytdt.slice(11);
                            $($el).append('<div><img src="https://i1.ytimg.com/i/' + ytimage + '/1.jpg" style="float: right; height: 40px; width: 40px; padding: 5px;" /><div style="padding: 5px;"><span style="font-weight: bold;">' + ytname + '</span><br /><span style="font-size: 80%; font-style: italic;">' + ytmnthnm[ytmnth - 1] + ' ' + ytdy + ', ' + ytyr + ' • ' + yttm + ' (UTC)</span><br /><span>' + this.content.$t + '</span></div><br />');
                        });
                    });
                });
 
                // Reducir el tamaño de los emoticonos
                $(this.el).children('.message').children('img').each(function () {
                    var $src = $(this).attr('src');
 
                    if (EMOTICONS.match($src)) {
                        $(this).removeAttr('height width').attr('style', 'height: 16px !important; width: 16px !important;');
                    }
                });
            }
 
            return this;
        };
 
        // Mostrar/Ocultar (YouTube)
        $('body').on('click', '#show-hide', function () {
            var $c = $(this).siblings('#comments');
            if ($($c).is(':hidden')) {
                $(this).text('Mostrar los comentarios de YouTube');
                $($c).slideDown();
            } else {
                $(this).text('Ocultar los comentarios de YouTube');
                $($c).slideUp();
            }
        });
    }
}(this.jQuery, this.mediaWiki));
 
// GRAVITY FALLS: UN WIKI DE MISTERIOS (Versión 2.0 - Fase final)
// PROHIBIDO COPIAR EL CÓDIGO, ESTO ES EXCLUSIVO PARA es.gravityfalls
//  USO LEGÍTIMO PARA ESTE WIKI, EVITE SANCIONES POR LOS TDU DE WIKIA