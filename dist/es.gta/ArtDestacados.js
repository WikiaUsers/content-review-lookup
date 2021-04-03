/** <nowiki>
 * @name: Destacados
 * @description: Crea un formulario para destacados
 * @author: bola (basado en el trabajo de Lil' Miss Rarity y Jr Mime)
 */
mw.loader.using(['jquery.client', 'mediawiki.base']).then(function() {
    if (mw.config.get('wgPageName') !== 'Grand_Theft_Encyclopedia:Propuestas_para_destacados') {
        return;
    }
    var userName = mw.config.get('wgUserName');

    mw.hook('dev.modal').add(function(modal) {
        var featuredModal = new window.dev.modal.Modal({
            title: 'Hacer una propuesta',
            content: '<form class="WikiaForm" id="propuesta" method="" name=""><div class="form-section" id="propuesta-tipo"><label for "tipo"><span class="fandom-icons icon-pages"></span> Tipo de propuesta: </label> <select id="tipo" name="tipo" required><option disabled selected value="empty">Seleccionar aquí</option><option value="n">Artículo común</option><option value="m">Misión</option><option value="d">Diálogo</option><option value="g">Guía</option><option value="h">Historia</option><option value="i">Imagen</option></select></div><div class="form-section" id="propuesta-nombre"> <label for="nombre"><span class="fandom-icons icon-article"></span> Nombre del artículo/imagen: </label> <input name="nombre" id="nombre" placeholder="Tommy Vercetti / Nombre.jpg" type="text" required></div> <div class="form-section" id="propuesta-usuario"> <label for="user"><span class="fandom-icons icon-user"></span> Usuario que propone:</label> <input type="text" disabled id="user" name="user" value="' + userName + '"> </div> <div class="form-section" id="propuesta-razones"> <label for="motivos"><span class="fandom-icons icon-reply"></span> Razones: </label> <textarea id="motivos" name="" placeholder="Indica aquí cuáles son tus razones para proponer este artículo/imagen para destacado/a. No es necesario firmar, la firma se añade automáticamente." required></textarea> </div></form>',
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
                    var $form = $('#propuesta'),
                        tipo = $form.find('#tipo').val(),
                        nombre = $form.find('#nombre').val(),
                        user = $form.find('#user').val(),
                        motivos = $form.find('#motivos').val();
                    if (tipo.trim() === "") {
                            alert('¡No has seleccionado el tipo de artículo!');
                            return;
                    } 
                    if (nombre.trim() === "") {
                            alert('No has ingresado el nombre del artículo o imagen ¿cómo van a saber los demás lo que propones?');
                            return;
                    }
                    if (motivos.trim() === "") {
                            alert('No has incluído ninguna razón. Justifica por qué estás realizando esta propuesta.');
                            return;
                    }
                    var pagecontent = '{{PPD\n|var1		= 1612665774 <!-- NO EDITAR -->\n|var2		= 1613270574 <!-- NO EDITAR -->\n|tipo		=' + tipo + '<!-- NO EDITAR n/m/d/g/h  -->\n |propone	=' + userName + '\n|estado	= nuevo <!-- NO EDITAR aceptado/rechazado/anulado  -->\n |nombre	=' + nombre + '\n |motivos	=' + motivos + '-- [[user:' + userName + '|' + userName + ']] 02:42 7 feb 2021 (UTC)}}', 
                        date = new Date(),
                        day = ('0' + date.getDate()).slice(-2),
                        month = ('0' + (date.getMonth() + 1)).slice(-2),
                        year = date.getFullYear(),
                        timestamp = '(' + day + '-' + month + '-' + year + ')',
                        pagetitle = 'Grand Theft Encyclopedia:Propuestas para destacados/' + nombre + ' ' + timestamp;
                    featuredModal.hide();
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
                                    mw.notify('Propuesta enviada correctamente. Redirigiendo en unos instantes...');
                                    window.location.replace(mw.util.getUrl(pagetitle));
                                }).fail(function () {
                                    mw.notify('Hubo problemas para enviar tu propuesta');
                                });
                            } else {
                                mw.notify('Gracias por tu interés para proponer ' + nombre + ' para ser destacado/a. Desgraciadamente no se puede proponer el mismo artículo o imagen dos veces la misma semana <a href="' + mw.util.wikiGetlink(pagetitle) + '">¿por qué no revisas quién realizó la propuesta y ofreces tu opinión al respecto?</a> ¡Gracias!');
                            }
                        }).fail(function () {
                            mw.notify('Hubo problemas para enviar tu propuesta');
                        });
                    });
                }
            }
        });
        featuredModal.create();
        $('.WikiaMainContentContainer #lang-ES')
            .attr('class', 'wds-button gran-btn')
            .text('Hacer una propuesta')
            .wrap($('<center>'))
            .css('cursor', 'pointer')
            .on('click', function() {
                featuredModal.show();
            });
    });

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
    });
});