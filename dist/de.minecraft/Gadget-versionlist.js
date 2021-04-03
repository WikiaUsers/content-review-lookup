$( document ).ready( function( $ ) {
	var pagename = mw.config.get( 'wgPageName' );
	if ( pagename != 'Minecraft_Wiki:Versionsliste' ) return;
	
	$( '.list_versions_form' ).show();
	$( '.list_versions_disabled' ).hide();
	$.getJSON( 'https://launchermeta.mojang.com/mc/game/version_manifest.json' ).done(
		function( data ) {
			$( '.list_versions_loading' ).hide();
			$( '.list_versions_list' ).append(
				$( '<div>' ).addClass( 'list_versions_header' ).append(
					$( '<div>' ).addClass( 'list_versions_version_desc' ).append(
						$( '<div>' ).addClass( 'list_versions_version_id' ).html( 'Version' ),
						$( '<div>' ).addClass( 'list_versions_version_type' ).html( 'Type' ),
						$( '<div>' ).addClass( 'list_versions_version_time' ).html( 'Time' ),
						$( '<div>' ).addClass( 'list_versions_version_releasetime' ).html( 'Released' ),
						$( '<div>' ).addClass( 'list_versions_version_url' ).html( 'URL' ),
						$( '<div>' ).addClass( 'list_versions_header_loadinfo' ).html( 'Info' )
					)
				)
			);
			
			$.each( data.versions, function( i, version ) {
				$( '.list_versions_list' ).append(
					$( '<div>' ).addClass( 'list_versions_version' ).append(
						$( '<div>' ).addClass( 'list_versions_version_desc' ).append(
							$( '<div>' ).addClass( 'list_versions_version_id' ).append(
								$( '<a>' ).attr( 'href', '/' + version.id ).attr( 'title', version.id ).html( version.id )
							),
							$( '<div>' ).addClass( 'list_versions_version_type' ).html( version.type ),
							$( '<div>' ).addClass( 'list_versions_version_time' ).html( version.time ),
							$( '<div>' ).addClass( 'list_versions_version_releasetime' ).html( version.releaseTime ),
							$( '<div>' ).addClass( 'list_versions_version_url' ).append(
								$ ( '<a>' ).attr( 'href', version.url ).html( version.url )
							),
							$( '<div>' ).addClass( 'list_versions_version_loadinfo' ).attr( 'data-versionurl', version.url ).html( '[Load]' ).click( function() {
								var info_button = $( this );
								if ( info_button.hasClass( 'list_versions_version_loadinfo_loaded' ) ) return;
								$.getJSON( info_button.attr( 'data-versionurl' ) ).done( function( data ) {
										var assetIndex = data.assetIndex == undefined ? undefined : data.assetIndex.url,
											client = data.downloads.client == undefined ? undefined : data.downloads.client.url,
											server = data.downloads.server == undefined ? undefined : data.downloads.server.url,
											client_obf = data.downloads.client_mappings == undefined ? undefined : data.downloads.client_mappings.url,
											server_obf = data.downloads.server_mappings == undefined ? undefined : data.downloads.server_mappings.url;
										
										var version_info = $( '<div>' ).addClass( 'list_versions_version_info' );
										
										if (assetIndex !== undefined) version_info.append(
											$( '<div>' ).addClass( 'list_versions_version_info_assets' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_assets_title' ).html( 'Assets:' ),
												$( '<div>' ).addClass( 'list_versions_version_info_assets_url' ).append(
													$ ( '<a>' ).attr( 'href', assetIndex ).html( assetIndex )
												)
											)
										);
										if (client !== undefined) version_info.append(
											$( '<div>' ).addClass( 'list_versions_version_info_client' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_client_title' ).html( 'Client:' ),
												$( '<div>' ).addClass( 'list_versions_version_info_client_url' ).append(
													$ ( '<a>' ).attr( 'href', client ).html( client )
												)
											)
										);
										if (server !== undefined) version_info.append(
											$( '<div>' ).addClass( 'list_versions_version_info_server' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_server_title' ).html( 'Server:' ),
												$( '<div>' ).addClass( 'list_versions_version_info_server_url' ).append(
													$ ( '<a>' ).attr( 'href', server ).html( server )
												)
											)
										);
										if (client_obf !== undefined) version_info.append(
											$( '<div>' ).addClass( 'list_versions_version_info_client_obf' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_client_obf_title' ).html( 'Client Mappings:' ),
												$( '<div>' ).addClass( 'list_versions_version_info_client_obf_url' ).append(
													$ ( '<a>' ).attr( 'href', client_obf ).html( client_obf )
												)
											)
										);
										if (server_obf !== undefined) version_info.append(
											$( '<div>' ).addClass( 'list_versions_version_info_server_obf' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_server_obf_title' ).html( 'Server Mappings:' ),
												$( '<div>' ).addClass( 'list_versions_version_info_server_obf_url' ).append(
													$ ( '<a>' ).attr( 'href', server_obf ).html( server_obf )
												)
											)
										);
										
										info_button.closest( '.list_versions_version_desc' ).after( version_info );
										info_button.addClass( 'list_versions_version_loadinfo_loaded' ).html( '' );
									} ).fail( function() {
										info_button.closest( '.list_versions_version_desc' ).after(
											$( '<div>' ).addClass( 'list_versions_version_info' ).append(
												$( '<div>' ).addClass( 'list_versions_version_info_fail' ).html( 'Loading version info failed.' )
											)
										);
										info_button.html( '[Load]' );
									} );
								info_button.html( 'Loading...' );
							} )
						)
					)
				);
			} );
		}
	).fail( function() {
		$( '.list_versions_loading' ).hide();
		$( '.list_versions_list' ).html( 'An error occurred while loading version info.' );
	} );
} );