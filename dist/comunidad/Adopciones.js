/** <nowiki>
 * @name: Adopciones
 * @description: Añade un formulario para adopciones
 * @author: Unai01 (basado en el trabajo de Lil' Miss Rarity, Jr Mime y bola
 */
require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], function ($, mw, BannerNotification, ui) {
    if (mw.config.get('wgPageName') !== 'Comunidad_Central:Adopciones') {
        return;
    }
    var userName = mw.config.get("wgUserName");
    $('.WikiaArticle #lang-ES')
        .attr('class', 'wds-button gran-btn')
        .text('Solicitar una adopción')
        .wrap($('<center>'))
        .css('cursor', 'pointer')
        .on('click', function () {
            ui.init(['modal']).then(function (modal) {
                modal.createComponent({
                    vars: {
                        id: "requestWindow",
                        size: 'medium',
                        title: 'Solicitud de adopción',
                        content: '<form class="WikiaForm" id="adoption" method="" name=""> <div class="form-section"> <label for="wikiname"><span class="fandom-icons icon-community"></span> Nombre de la comunidad</label> <input name="wikiname" id="wikiname" placeholder="Kirbipedia" type="text" required> </div> <div class="form-section"> <label for="interwiki"><span class="fandom-icons icon-link"></span> Enlace</label> http:// <input name="interwiki" id="interwiki" placeholder="es.kirby" type="text" required>.wikia.com </div> <div class="form-section"> <label for="user"><span class="fandom-icons icon-user"></span> Usuario solicitante:</label> <input type="text" disabled id="user" name="user" value="' + userName + '" required> </div> <div class="form-section"> <label for "tipo"><span class="fandom-icons icon-flag"></span> Rango que deseas</label> <select id="tipo" name="tipo"><option disabled selected value="">Tipo de solicitud</option><option value="Administrador">Administrador</option><option value="Burócrata">Burócrata</option> </select> </div> <div class="form-section"> <label for="comment"><span class="fandom-icons icon-reply"></span> Comentarios</label> <textarea id="comment" name="" placeholder="Comentarios que quieres hacer acerca de la solicitud"></textarea></div></form>',
                        buttons: [{
                            vars: {
                                id: "submitButton",
                                value: 'Enviar',
                                classes: ['normal', 'primary'],
                                data: [{
                                    key: 'event',
                                    value: 'send'
                                }]
                            }
                        },
                        {
                            vars: {
                                id: "cancelButton",
                                value: 'Cancelar',
                                data: [{
                                    key: 'event',
                                    value: 'close'
                                }]
                            }
                        }
                        ]
                    }
                }, function (requestModal) {
                    requestModal.bind('send', function () {
                        var $form = $('#adoption'),
                            wikiname = $form.find('#wikiname').val(),
                            url = $form.find('#interwiki').val(),
                            user = $form.find('#user').val(),
                            tipo = $form.find('#tipo').val(),
                            comentarios = $form.find('#comment').val();
                        if (wikiname.trim() === "") {
                            alert('No has ingresado el nombre de la wiki');
                            return;
                        }
                        if (url.trim() === "") {
                            alert('No has ingresado la url de la wiki');
                            return;
                        }
                        if (tipo.trim() === "") {
                            alert('No has ingresado el tipo de solicitud');
                            return;
                        }
                        if (comentarios.trim() === "") {
                            alert('No has añadido ningún comentario, aunque no es obligatorio, recuerda que puedes incluir aquí los enlaces a las discusiones en tu comunidad, serán requeridas para otorgarte el rango, gracias.')
                        }
                        var pagecontent = '{{Solicitud/encabezado|Adopciones}}\n' + '==' + wikiname + '==\n{{Solicitud de adopción\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Tipo	 =' + tipo + '\n|Usuario =' + userName + '\n|Comentarios =' + comentarios + '~~~~}}',
                            date = new Date(),
                            day = ('0' + date.getDate()).slice(-2),
                            month = ('0' + (date.getMonth() + 1)).slice(-2),
                            year = date.getFullYear(),
                            timestamp = year + '' + month + '' + day,
                            pagetitle = 'Solicitud:' + wikiname + ' a' + timestamp;
                        requestModal.trigger('close');
                        mw.loader.using('mediawiki.api', function () {
                            new mw.Api().get({
                                action: 'query',
                                titles: pagetitle,
                                format: 'json'
                            }).done(function (data) {
                                if ('-1' in data.query.pages) {
                                    new mw.Api().post({
                                        action: 'edit',
                                        title: pagetitle,
                                        text: pagecontent,
                                        token: mw.user.tokens.get('editToken')
                                    }).done(function () {
                                        new BannerNotification(
                                            'Solicitud enviada correctamente. Redirigiendo en unos instantes...',
                                            'confirm',
                                            $('.banner-notifications-placeholder')
                                        ).show();
                                        window.location.replace(mw.util.wikiGetlink(pagetitle));
                                    }).fail(function () {
                                        new BannerNotification(
                                            'Hubo problemas para enviar tu solicitud',
                                            'error',
                                            $('.banner-notifications-placeholder')
                                        ).show();
                                    });
                                } else {
                                    new BannerNotification(
                                        'Gracias por tu interés para adoptar la comunidad ' + wikiname + '. No se puede realizar una solicitud de adopción para la misma comunidad dos veces el mismo día y hoy ya se ha realizado una solicitud para esta comunidad <a href="' + mw.util.wikiGetlink(pagetitle) + '">¿por qué no revisas quién la realizó y ofreces tu opinión al respecto?</a> ¡Gracias!',
                                        'notify',
                                        $('.banner-notifications-placeholder')
                                    ).show();
                                }
                            }).fail(function () {
                                new BannerNotification(
                                    'Hubo problemas para enviar tu solicitud',
                                    'error',
                                    $('.banner-notifications-placeholder')
                                ).show();
                            });
                        });
                    });
                    requestModal.show();
                });
            });
        });
});