/**
 * To facilitate the addition of templates to the image pages.
 * Trial version - September 26 2018
 *
 * - Original version by User:BranDaniMB
 * - Based in Adopciones.js
 * 
 * License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
**/
// <nowiki>

if (wgNamespaceNumber === 6 && (wgUserGroups.includes('staff') || wgUserGroups.includes('helper') || wgUserGroups.includes('vstf') || wgUserGroups.includes('sysop') || wgUserGroups.includes('content-moderator') || wgUserGroups.includes('threadmoderator'))) {
    $(".WikiaArticle").append("<div class=\"gran-bn boton-solicitud\" id=\"boton-categorizar\" style=\"text-align:center; position: fixed; right: 10px; bottom: 50px;\"></div>");
}

$('.WikiaArticle #boton-categorizar')
    .attr('class', 'wds-button gran-btn')
    .text('Categorizar')
    .wrap($('<center>'))
    .css('cursor', 'pointer')
    .on('click', function () {
        require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], function ($, mw, BannerNotification, ui) {
            if (wgNamespaceNumber !== 6) {
                return;
            }
            ui.init(['modal']).then(function (modal) {
                modal.createComponent({
                    vars: {
                        id: "requestWindow",
                        size: 'medium',
                        title: 'Categorizar',
                        content: '<form class="WikiaForm" id="catOptions" method="" name=""><div class="form-section"> <label for="mode"><span class="fandom-icons icon-controls"></span>  Modo</label><select id="mode" name="mode"><option disabled selected value="ambas">Ambas</option><option value="licencia">Licencia</option><option value="uso">Uso de imagen</option></select></div><div class="form-section"> <label for="licence-options"><span class="fandom-icons icon-unlock"></span>  Opciones de licencia</label><select id="license-options" name="license-options"><option disabled selected value="{{Sin licencia}}">Sin licencia</option><option value="{{Sin licencia}}">No conozco la licencia</option><option value="{{GFDL}}">Esta bajo la licencia GFDL</option><option value="{{GPL}}">Esta bajo la licencia GPL</option><option value="{{LGPL}}">Esta bajo la licencia LGPL</option><option value="{{cc-by}}">Esta bajo la licencia Creative Commons Attribution 2.5</option><option value="{{cc-sa}}">Esta bajo la licencia Creative Commons ShareAlike 1.0</option><option value="{{CC-BY-SA}}">Esta bajo la licencia Creative Commons Attribution ShareAlike 2.5</option><option value="{{DP}}">Ha sido liberada al dominio público por el dueño de los derechos de autor</option><option value="{{FANDOM-copyright}}">Copyright de FANDOM, usado para logotipos de FANDOM, etc</option><option value="{{Capturas de pantalla de FANDOM}}">Captura de pantalla de una página alojada en FANDOM</option><option value="{{Fairuse}}">Puede usar ya que está cualificada como fair use bajo las leyes estadounidenses</option><option value="{{Permiso}}">Tiene copyright, pero se permite su uso por parte del dueño</option><option value="{{CopyrightedFreeUse}}">Tiene copyright, pero el uso está permitido sin condiciones</option><option value="{{CopyrightedFreeUseProvidedThat}}">Tiene copyright, pero el uso está permitido con condiciones específicas.</option></select></div><div class="form-section"> <label for="use-options"><span class="fandom-icons icon-information"></span>   Opciones de uso</label><select id="use-options" name="use-options"><option disabled selected value="sin_uso">Sin uso</option><option value="general">Imágenes de uso general (MediaWiki, Foro e hilos)</option><option value="ayuda">Imágenes de páginas de ayuda.</option><option value="blogs">Imágenes de blogs del Equipo de FANDOM.</option><option value="comunidades">Imágenes de descripciones de comunidades.</option><option value="spotlights">Imágenes de solicitudes de Spotlights.</option><option value="usuario">Imágenes usadas en el espacio de nombres de usuario.</option><option value="movil">Imágenes de portada en móviles.</option></select></div></form>',
                        buttons: [{
                            vars: {
                                id: "submitButton",
                                value: 'Aplicar',
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
                        var $form = $('#catOptions'),
                            mode = $form.find('#mode').val(),
                            license_option = $form.find('#license-options').val(),
                            use_option = $form.find('#use-options').val(),
                            pagecontent;
                        if (mode === 'ambas') {
                            if (use_option === "general") {
                                pagecontent = '==Licencia==\n' + license_option + '\n{{Usoimagen}}';
                            } else {
                                pagecontent = '==Licencia==\n' + license_option + '\n{{Usoimagen|' + use_option + '}}';
                            }
                        } else if (mode === 'licencia') {
                            pagecontent = '==Licencia==\n' + license_option;
                        } else {
                            if (use_option === "general") {
                                pagecontent = '{{Usoimagen}}';
                            } else {
                                pagecontent = '{{Usoimagen|' + use_option + '}}';
                            }
                        }
                        pagetitle = mw.config.get('wgPageName');
                        requestModal.trigger('close');
                        mw.loader.using('mediawiki.api', function () {
                            new mw.Api().get({
                                action: 'query',
                                titles: pagetitle,
                                format: 'json'
                            }).done(function (data) {
                                new mw.Api().post({
                                    action: 'edit',
                                    title: pagetitle,
                                    text: pagecontent,
                                    summary: 'Añadiendo categorías',
                                    minor: true,
                                    token: mw.user.tokens.get('editToken')
                                }).done(function () {
                                    new BannerNotification(
                                        'Editando página, recargando...',
                                        'confirm',
                                        $('.banner-notifications-placeholder')
                                    ).show();
                                    window.location.replace(mw.util.wikiGetlink(pagetitle));
                                }).fail(function () {
                                    new BannerNotification(
                                        'Hubo problemas al editar la página...',
                                        'error',
                                        $('.banner-notifications-placeholder')
                                    ).show();
                                });
                            }).fail(function () {
                                new BannerNotification(
                                    'Hubo problemas al editar la página...',
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

// </nowiki>