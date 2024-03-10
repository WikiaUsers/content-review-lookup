var i18n = {
	activate: 'Ativar',
	activateTitle: 'Ativar o modo noturno',
	activatedLabel: 'Modo noturno ativado',
	deactivate: 'Desativar',
	deactivateTitle: 'Desativar o modo noturno',
	deactivatedLabel: 'Modo noturno desativado'
};

function changeSkin() {
	var a = new mw.Api();
	if ( $('.skin-hydra').length ) {
		a.postWithToken('csrf', {
			action : 'options',
			change : 'skin=hydradark'
		});
		$('<link/>', {rel: 'stylesheet', id: 'hydradark-skin-file', href: '/load.php?lang=pt-br&modules=skins.z.hydra.dark.styles%7Cskins.z.hydra.dark.syntaxhighlight.monokai.styles&only=styles&skin=hydradark'}).insertAfter('#hydra-skin-file');
	}
	if ( $('.skin-hydradark').length ) {
		a.postWithToken('csrf', {
			action : 'options',
			change : 'skin=hydra'
		});
		$('#hydradark-skin-file').remove();
	}
	$('body').toggleClass('skin-hydra');
	$('body').toggleClass('skin-hydradark');
}

$( '.portal:not(#p-socialProfiles):not(#p-sitePromos)' ).last().after(
	$( '<div>', { 'class': 'portal persistent', 'id': 'p-nightmode' } ).append(
		$( '<h3>', { 'id': 'p-nightmode-label' } ).html( $('.skin-hydradark').length ? i18n.activatedLabel : i18n.deactivatedLabel ),
		$( '<div>', { 'class': 'body' } ).append(
			$( '<ul>', { 'id': 'p-nightmode-list' } ).append(
				$( '<li>', { 'class': 'nightmode-toggle' } ).append(
					$( '<a>',
						{
							'title': ( $('.skin-hydradark').length ? i18n.deactivateTitle : i18n.activateTitle),
							'href': ''
						} )
					.html( $('.skin-hydradark').length ? i18n.deactivate : i18n.activate )
					.hover( function() {
						if ( !( $('#hydra-skin-file').length || $('#hydradark-skin-file').length ) ) {
							var skinFile = $('link[href*="skins.z.hydra.light.styles"]');
							if ( skinFile.attr('href').includes('skins.z.hydra.dark') ) {
								skinFile.attr('id', 'hydradark-skin-file');
								$('<link/>', {rel: 'stylesheet', id: 'hydra-skin-file', href: skinFile.attr('href').replace('%7Cskins.z.hydra.dark.styles%7Cskins.z.hydra.dark.syntaxhighlight.monokai.styles','')}).insertBefore('#hydradark-skin-file');
							} else skinFile.attr('id', 'hydra-skin-file');
						}
					} )
					.click( function( e ) {
						e.preventDefault();
						changeSkin();
					} )
				)
			)
		)
	)
);