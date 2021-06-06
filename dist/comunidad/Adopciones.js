/** <nowiki>
 * @name: Adopciones
 * @description: Añade un formulario para adopciones
 * @author: Unai01 (basado en el trabajo de Lil' Miss Rarity, Jr Mime y bola
 */
mw.loader.using(['jquery.client', 'mediawiki.base']).then(function() {
    if (mw.config.get('wgPageName') !== 'Comunidad_Central:Adopciones') {
        return;
    }
    var userName = mw.config.get('wgUserName');

    mw.hook('dev.modal').add(function(modal) {
        var adoptionModal = new window.dev.modal.Modal({
            title: 'Solicitud de adopción',
            content: '<form class="WikiaForm" id="adoption" method="" name=""> <div class="form-section"> <label for="wikiname"><span class="fandom-icons icon-community"></span> Nombre de la comunidad</label> <input name="wikiname" id="wikiname" placeholder="Kirbipedia" type="text" required> </div> <div class="form-section"> <label for="interwiki"><span class="fandom-icons icon-link"></span> Enlace</label> http:// <input name="interwiki" id="interwiki" placeholder="es.kirby" type="text" required>.wikia.com </div> <div class="form-section"> <label for="user"><span class="fandom-icons icon-user"></span> Usuario solicitante:</label> <input type="text" disabled id="user" name="user" value="' + userName + '" required> </div> <div class="form-section"> <label for "tipo"><span class="fandom-icons icon-flag"></span> Rango que deseas</label> <select id="tipo" name="tipo"><option disabled selected value="">Tipo de solicitud</option><option value="Administrador">Administrador</option><option value="Burócrata">Burócrata</option> </select> </div> <div class="form-section"> <label for="comment"><span class="fandom-icons icon-reply"></span> Comentarios</label> <textarea id="comment" name="" placeholder="Comentarios que quieres hacer acerca de la solicitud"></textarea></div></form>',
            id: 'requestWindow',
            size: 'medium',
            buttons: [{
                id: 'submitButton',
                text: 'Enviar',
                primary: true,
                event: 'submitForm'
            }],
            closeTitle: 'Cancelar',
            events: {
                submitForm: function () {
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
                        alert('No has añadido ningún comentario, aunque no es obligatorio, recuerda que puedes incluir aquí los enlaces a las discusiones en tu comunidad, serán requeridas para otorgarte el rango, gracias.');
                    }
                    var pagecontent = '{{Solicitud/encabezado|Adopciones}}\n' + '==' + wikiname + '==\n{{Solicitud de adopción\n|Estado  = <!-- NO EDITAR concedido/declinado/pendiente  -->\n|Wiki	 =' + wikiname + '\n|Enlace  =' + url + '\n|Tipo	 =' + tipo + '\n|Usuario =' + userName + '\n|Comentarios =' + comentarios + '~~' + '~~}}',
                        date = new Date(),
                        day = ('0' + date.getDate()).slice(-2),
                        month = ('0' + (date.getMonth() + 1)).slice(-2),
                        year = date.getFullYear(),
                        timestamp = year + '' + month + '' + day,
                        pagetitle = 'Solicitud:' + wikiname + ' a' + timestamp;
                    adoptionModal.hide();
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
                                    token: mw.user.tokens.get('csrfToken')
                                }).done(function () {
                                    mw.notify('Solicitud enviada correctamente. Redirigiendo en unos instantes...');
                                    window.location.replace(mw.util.getUrl(pagetitle));
                                }).fail(function () {
                                    mw.notify('Hubo problemas para enviar tu solicitud');
                                });
                            } else {
                                mw.notify('Gracias por tu interés para adoptar la comunidad ' + wikiname + '. No se puede realizar una solicitud de adopción para la misma comunidad dos veces el mismo día y hoy ya se ha realizado una solicitud para esta comunidad <a href="' + mw.util.getUrl(pagetitle) + '">¿por qué no revisas quién la realizó y ofreces tu opinión al respecto?</a> ¡Gracias!');
                            }
                        }).fail(function () {
                            mw.notify('Hubo problemas para enviar tu solicitud');
                        });
                    });
                }
            }
        });
        adoptionModal.create();
        $('#mw-content-text #adopciones')
            .attr('class', 'wds-button gran-btn')
            .text('Solicitar una adopción')
            .wrap($('<div>').css('text-align', 'center'))
            .css('cursor', 'pointer')
            .on('click', function() {
                adoptionModal.show();
            });
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
    });
});