(function ($, mw) {
    "use strict";
    var un = mw.config.get('wgUserName')
        
        var aa = JSON.parse(localStorage.getItem('block')),
            bb,
            i;
        if (!localStorage.getItem('block') || localStorage.getItem('block') === 'undefined') {
            bb = '';
        } else {
            for (i in aa) {
                if (aa.hasOwnProperty(i)) {
                    $('head').append('<style type="text/css" id="block4">.Chat li[data-user="' + aa[i] + '"]{display: none;}#WikiChatList li[data-user="' + aa[i] + '"] { background: url(http://i.imgur.com/2iFbyk8.png) no-repeat right top; background-size: 55px; background-position-y: 7px; transition: all 0.4s; filter: grayscale(100%); } #WikiChatList li[data-user="' + aa[i] + '"]:hover { background: url(http://i.imgur.com/2iFbyk8.png) no-repeat right top; background-size: 32px; background-position-y: 1px; filter: grayscale(50%); } .Rail li[data-user="' + aa[i] + '"] span.username { text-decoration: line-through !important; font-weight: bold !important; } #Rail .User[data-user="' + aa[i] + '"] .username:before { background: #222; }</style>');
                }
            }
        }
 
        $('body').on('click', '.ignore', function () {
            if (localStorage.getItem('block')) {
                aa = JSON.parse(localStorage.getItem('block'));
                bb = aa.join('\n');
            }
 
            $.showCustomModal('Ignorar Usuario', '<div>Introduce el nickname del usuario(s) que desea ignorar.<br /><textarea id="block2" autofocus="autofocus" style="height: 300px; width: 400px; resize: none;">' + bb + '</textarea><div style="background: rgba(0,0,0,0.40); padding: 5px; border-radius: 5px;">Este script se utiliza para ignorar a los usuarios, haciendo que sus mensajes desaparezcan del chat y que aparezca tachado en la lista de conectados. </div></div>', {
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
                        message: 'Guardar',
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
                                $('head').append('<style type="text/css" id="block4">.Chat li[data-user="' + c[j] + '"]{display: none;}#WikiChatList li[data-user="' + c[j] + '"] { background: url(http://i.imgur.com/2iFbyk8.png) no-repeat right top; background-size: 55px; background-position-y: 7px; transition: all 0.4s; filter: grayscale(100%); } #WikiChatList li[data-user="' + c[j] + '"]:hover { background: url(http://i.imgur.com/2iFbyk8.png) no-repeat right top; background-size: 32px; background-position-y: 1px; filter: grayscale(50%); } .Rail li[data-user="' + c[j] + '"] span.username { text-decoration: line-through !important; font-weight: bold !important; } #Rail .User[data-user="' + c[j] + '"] .username:before { background: #222; }</style>');
                            }
 
                            $('#block3').closeModal();
                            mainRoom.viewDiscussion.scrollToBottom();
                        }
                    }
                ]
            });
        });
}(this.jQuery, this.mediaWiki));