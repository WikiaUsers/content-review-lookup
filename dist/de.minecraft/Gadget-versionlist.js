;(function($, mw) {
	'use strict';

	const i18n = {
		pageName: 'Minecraft_Wiki:Versionsliste',
		
		version: 'Version',
		type: 'Typ',
		time: 'Zeit',
		released: 'Erschienen',
		url: 'URL',
		info: 'Info',
		load: 'Laden',
		
		assets: 'Assets',
		client: 'Client',
		server: 'Server',
		client_obf: 'Client Mappings',
		server_obf: 'Server Mappings',
		
		loading: 'Laden...',
		loadingFailed: 'Versionsinfo laden fehlgeschlagen.',
		loadingError: 'Ein Fehler ist beim laden der Versionsinfo aufgetreten.'
	};
	
	const config = mw.config.get([
		'wgArticlePath',
		'wgPageName'
	]);
	
	if ( config.wgPageName != i18n.pageName ) return;
	
	function addInfo(link, label) {
		return '<div class="list_versions_version_info_' + label + '">' +
			'<div class="list_versions_version_info_' + label + '_title">' + i18n[label] + ':</div>' +
			'<div class="list_versions_version_info_' + label + '_url">' +
				'<a href="' + link + '">' + link + '</a>' +
			'</div>' +
		'</div>';
	}
	
	$( '.list_versions_form' ).show();
	$( '.list_versions_disabled' ).hide();
	$.getJSON( 'https://launchermeta.mojang.com/mc/game/version_manifest.json' ).done(
		function( data ) {
			$( '.list_versions_loading' ).hide();
			$( '.list_versions_list' ).append(
				'<div class="list_versions_header">' +
					'<div class="list_versions_version_desc">' +
						'<div class="list_versions_version_id">' + i18n.version + '</div>' +
						'<div class="list_versions_version_type">' + i18n.type + '</div>' +
						'<div class="list_versions_version_time">' + i18n.time + '</div>' +
						'<div class="list_versions_version_url">' + i18n.url + '</div>' +
						'<div class="list_versions_header_loadinfo">' + i18n.info + '</div>' +
					'</div>' +
				'</div>'
			);
			
			$.each( data.versions, function( i, version ) {
				$( '.list_versions_list' ).append(
					'<div class="list_versions_version">' +
						'<div class="list_versions_version_desc">' +
							'<div class="list_versions_version_id">' +
								'<a href=' + config.wgArticlePath.replace('$1', version.id) + ' title=' + version.id + '>' +
									version.id +
								'</a>' +
							'</div>' +
							'<div class="list_versions_version_type">' + version.type + '</div>' +
							'<div class="list_versions_version_time">' + version.time + '<br><b>' + i18n.released + ':</b><br>' + version.releaseTime + '</div>' +
							'<div class="list_versions_version_url">' + 
								'<a href="' + version.url + '">' + version.url + '</a>' +
							'</div>' +
							'<div class="list_versions_version_loadinfo" data-versionurl="' + version.url + '">[' + i18n.load + ']</div>' +
						'</div>' +
					'</div>'
				);
			} );
			
			$('.list_versions_version_loadinfo').click(function() {
				var info_button = $(this);
				if ( info_button.hasClass( 'list_versions_version_loadinfo_loaded' ) ) return;
				$.ajax({
					url: info_button.attr( 'data-versionurl' ),
					crossDomain: true,
					method: 'GET',
					dataType: 'json',
					success: function (data) {
						var assetIndex = data.assetIndex === undefined ? undefined : data.assetIndex.url,
							client = data.downloads.client === undefined ? undefined : data.downloads.client.url,
							server = data.downloads.server === undefined ? undefined : data.downloads.server.url,
							client_obf = data.downloads.client_mappings === undefined ? undefined : data.downloads.client_mappings.url,
							server_obf = data.downloads.server_mappings === undefined ? undefined : data.downloads.server_mappings.url;
						
						var version_info = $('<div class="list_versions_version_info">');
						
						if (assetIndex !== undefined) version_info.append( addInfo(assetIndex, 'assets') );
						if (client !== undefined) version_info.append( addInfo(client, 'client') );
						if (server !== undefined) version_info.append( addInfo(server, 'server') );
						if (client_obf !== undefined) version_info.append( addInfo(client_obf, 'client_obf') );
						if (server_obf !== undefined) version_info.append( addInfo(server_obf, 'server_obf') );
						
						info_button.closest( '.list_versions_version_desc' ).after( version_info );
						info_button.addClass( 'list_versions_version_loadinfo_loaded' ).html( '' );
					},
					error: function() {
						info_button.closest( '.list_versions_version_desc' ).after(
							'<div class="list_versions_version_info">' +
								'<div class="list_versions_version_info_fail">' + i18n.loadingFailed + '</div>' +
							'</div>'
						);
						info_button.html( '[' + i18n.load + ']' );
					}
				});
			info_button.html( i18n.loading );
		});
	}).fail( function() {
		$( '.list_versions_loading' ).hide();
		$( '.list_versions_list' ).html( i18n.loadingError );
	});
})(window.jQuery, window.mediaWiki);