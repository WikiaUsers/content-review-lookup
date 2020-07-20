/** <nowiki>
 * @name: Destacados
 * @description: Crea un formulario para destacados
 * @author: bola (basado en el trabajo de Lil' Miss Rarity y Jr Mime)
 */
require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], function ($, mw, BannerNotification, ui) {
    if (mw.config.get('wgPageName') !== 'Grand_Theft_Encyclopedia:Propuestas_para_destacados' ) { return;
    }
    var userName = mw.config.get("wgUserName");
    $('.WikiaArticle #lang-ES')
        .attr('class', 'wds-button gran-btn')
        .text('Hacer una propuesta')
        .wrap($('<center>'))
        .css('cursor', 'pointer')
        .on('click', function () {
            ui.init(['modal']).then(function (modal) {
                modal.createComponent({
                    vars: {
                        id: "requestWindow",
                        size: 'medium',
                        title: 'Hacer una propuesta',
                        content: '<form class="WikiaForm" id="propuesta" method="" name=""><div class="form-section" id="propuesta-tipo"><label for "tipo"><span class="fandom-icons icon-pages"></span> Tipo de propuesta: </label> <select id="tipo" name="tipo" required><option disabled selected value="empty">Seleccionar aquí</option><option value="n">Artículo común</option><option value="m">Misión</option><option value="d">Diálogo</option><option value="g">Guía</option><option value="h">Historia</option><option value="i">Imagen</option></select></div><div class="form-section" id="propuesta-nombre"> <label for="nombre"><span class="fandom-icons icon-article"></span> Nombre del artículo/imagen: </label> <input name="nombre" id="nombre" placeholder="Tommy Vercetti / Nombre.jpg" type="text" required></div> <div class="form-section" id="propuesta-usuario"> <label for="user"><span class="fandom-icons icon-user"></span> Usuario que propone:</label> <input type="text" disabled id="user" name="user" value="' + userName + '"> </div> <div class="form-section" id="propuesta-razones"> <label for="motivos"><span class="fandom-icons icon-reply"></span> Razones: </label> <textarea id="motivos" name="" placeholder="Indica aquí cuáles son tus razones para proponer este artículo/imagen para destacado/a. No es necesario firmar, la firma se añade automáticamente." required></textarea> </div></form>',
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
                        var $form = $('#propuesta'),
                            tipo = $form.find('#tipo').val(),
                            nombre = $form.find('#nombre').val(),
                            user = $form.find('#user').val(),
                            motivos = $form.find('#motivos').val();
                        if (tipo.trim() === "empty") {
                            alert('¡No has seleccionado el tipo de artículo!');
                            return;
                        } else if (nombre.trim() === "") {
                            alert('No has ingresado el nombre del artículo o imagen ¿cómo van a saber los demás lo que propones?');
                            return;
                        } else if (motivos.trim() === "") {
                            alert('No has incluído ninguna razón. Justifica por qué estás realizando esta propuesta.');
                            return;
                        }
                        var pagecontent = '{{PPD\n|var1		= {{subst:#time:U}} <!-- NO EDITAR -->\n|var2		= {{subst:#time:U|+7days }} <!-- NO EDITAR -->\n|tipo		=' + tipo + '<!-- NO EDITAR n/m/d/g/h  -->\n |propone	=' + userName + '\n|estado	= nuevo <!-- NO EDITAR aceptado/rechazado/anulado  -->\n |nombre	=' + nombre + '\n |motivos	=' + motivos + '-- [[user:' + userName + '|' + userName + ']] ~~~~~}}', 
                            date = new Date(),
                            day = ('0' + date.getDate()).slice(-2),
                            month = ('0' + (date.getMonth() + 1)).slice(-2),
                            year = date.getFullYear(),
                            timestamp = '(' + day + '-' + month + '-' + year + ')',
                            pagetitle = 'Grand Theft Encyclopedia:Propuestas para destacados/' + nombre + ' ' + timestamp,
                            pagetitleid = pagetitle.get;
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
                                            'Propuesta enviada correctamente. Redirigiendo en unos instantes...',
                                            'confirm',
                                            $('.banner-notifications-placeholder')
                                        ).show();
                                        window.location.replace(mw.util.wikiGetlink(pagetitle));
                                    }).fail(function () {
                                        new BannerNotification(
                                            'Hubo problemas para enviar tu propuesta',
                                            'error',
                                            $('.banner-notifications-placeholder')
                                        ).show();
                                    });
                                } else {
                                new BannerNotification(
                                    'Gracias por tu interés para proponer ' + nombre + ' para ser destacado/a. Desgraciadamente no se puede proponer el mismo artículo o imagen dos veces la misma semana <a href="' + mw.util.wikiGetlink(pagetitle) + '">¿por qué no revisas quién realizó la propuesta y ofreces tu opinión al respecto?</a> ¡Gracias!',
                                    'notify',
                                    $('.banner-notifications-placeholder')
                                ).show();
                                }
                            }).fail(function () {
                                new BannerNotification(
                                    'Hubo problemas para enviar tu propuesta',
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