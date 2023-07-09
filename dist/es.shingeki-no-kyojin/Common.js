mw.hook('wikipage.content').add(function() {
	var wgUserName = mw.config.get('wgUserName');
	if (wgUserName) {
		var spans = document.getElementsByClassName("insertusername");

		for (var i = 0; i < spans.length; i++) {
			spans[i].innerHTML = wgUserName;
		}
	}
});

// AutoRefreshing //
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];

/* Añadir botones extra de edición */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	// Add a hook handler.
	mw.hook( 'wikiEditor.toolbarReady' ).add( function ( $textarea ) {
		// Configure a new toolbar entry on the given $textarea jQuery object.
		$textarea.wikiEditor( 'addToToolbar', {
			sections: {
				plantillas: {
					type: 'toolbar',
					label: 'Plantillas'
				}
			}
		} );
		$textarea.wikiEditor( 'addToToolbar', {
			section: 'plantillas',
			groups: {
				default: {
					label: ''
				}
			}
		} );
		$textarea.wikiEditor( 'addToToolbar', {
			section: 'plantillas',
			group: 'default',
			tools: {
				'character-infobox': {
					type: 'button',
					label: 'Insertar infobox de personaje',
					icon: 'https://images.wikia.com/esstarwars/images/2/29/Button_user.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Infobox Personaje \n|Nombre = ',
							post: '\n|Imagen = \n|Japonés = \n|Rōmaji = \n|Debutmanga = \n|Debutanime =  \n|Aparición = \n|Seiyū = \n|Edad = \n|Genero = \n|Especie = \n|Estado = \n|Altura = \n|Peso = \n|Rango = \n|Ocupación = \n|Clasificación = \n|Afiliación = \n|Familia = \n|Armas = \n}}'
						}
					}
				},
				'episode-infobox': {
					type: 'button',
					label: 'Insertar infobox de episodio',
					icon: 'https://images.wikia.com/esstarwars/images/f/fd/Button_blockquote.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Infobox Episodio \n|Episodio   = ',
							post: '\n|Imagen     = \n|Japonés      = \n|Rōmaji     = \n|Ingles     = \n|Numero     = \n|Manga      = \n|Japon      = \n|España     = \n|EE.UU      = \n|Anterior   = \n|Siguiente  = \n|Personajes = \n|Objetos    = \n}}'
						}
					}
				},
				'chapter-infobox': {
					type: 'button',
					label: 'Insertar infobox de capítulo',
					icon: 'https://images.wikia.com/esstarwars/images/0/05/Bot%C3%B3n_novela.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Infobox Capítulo \n|Nombre          = ',
							post: '\n|Imagen          = \n|Japonés           = \n|Rōmaji          = \n|Ingles          = \n|Número          = \n|Episodio        = \n|Páginas Totales = \n|Japón           = \n|Anterior        = \n|Siguiente       = \n}}'
						}
					}
				},
				'deletion': {
					type: 'button',
					label: 'Proponer que el artículo sea borrado',
					icon: 'https://images.wikia.com/esstarwars/images/8/8c/Button_RedX.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Borrar',
							post: '|Motivo}}'
						}
					}
				},
				'sketch-notice': {
					type: 'button',
					label: 'Insertar aviso de Esbozo',
					icon: 'https://images.wikia.com/esstarwars/images/f/f1/Button_info-1.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Esbozo',
							post: '}}'
						}
					}
				},
				'construction-notice': {
					type: 'button',
					label: 'Insertar aviso de construyendo',
					icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Enobras',
							post: '|Usuario}}'
						}
					}
				},
				'spoiler': {
					type: 'button',
					label: 'Insertar aviso de Spoiler',
					icon: 'https://images.wikia.com/avatar/images/4/4d/Merge_Button.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Spoiler',
							post: '}}'
						}
					}
				},
				'reconnaissance-members': {
					type: 'button',
					label: 'Insertar plantilla miembros Legión de Reconocimiento',
					icon: 'https://images.wikia.com/shingeki-no-kyojin/es/images/thumb/2/25/Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png/32px-Emblema_de_la_Legi%C3%B3n_de_Reconocimiento.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Miembros de la Legión de Reconocimiento',
							post: '}}'
						}
					}
				},
				'stationary-troops': {
					type: 'button',
					label: 'Insertar plantilla miembros Tropas Estacionarias',
					icon: 'https://images.wikia.com/shingeki-no-kyojin/es/images/thumb/5/54/Emblema_de_las_Tropas_Estacionarias.png/32px-Emblema_de_las_Tropas_Estacionarias.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Miembros de las Tropas Estacionarias',
							post: '}}'
						}
					}
				},
				'military-police': {
					type: 'button',
					label: 'Insertar plantilla miembros Policía Militar',
					icon: 'https://images.wikia.com/shingeki-no-kyojin/es/images/thumb/e/ee/Emblema_de_la_Polic%C3%ADa_Militar.png/32px-Emblema_de_la_Polic%C3%ADa_Militar.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '{{Miembros de la Policía Militar',
							post: '}}'
						}
					}
				}
			}
		} );
	} );
}

// Etiqueta Inactivo
window.InactiveUsers = {
    text: 'En el mundo exterior'
};

/* Código para eliminar los comentarios en las desambiguaciones gracias a BranDaniMB por desarrolarlo */
$(window).load(function() {
    if (mediaWiki.config.get('wgNamespaceNumber') === 0) {
        var Categories = mediaWiki.config.get('wgCategories');

        if (Categories.includes("Desambiguación")) {
            $('#article-comm').attr('disabled', 'disabled');
            $('#article-comm').attr('placeholder', 'Se han desactivado los comentarios para esta página.');
        }
    }
});

// Para la plantilla ImageMapHighlight

window.imagemap.hightlightfill = 'rgba(255, 255, 255)';