mw.loader.using( 'mediawiki.api', function () {
	mw.hook( 'wikipage.content' ).add( function () {
		mw.hook( 'dev.banners' ).add( function ( BannerNotification ) {
			var hasRightRail = document.querySelector( '.page.has-right-rail' );
			if ( !hasRightRail ) return;

			var cache = mw.config.get( [ 'wgCategories', 'wgPageName' ] );
			var categories = cache.wgCategories.filter( function ( category ) {
				return category.startsWith( 'Mantenimiento: ' );
			} ).map( function ( category ) {
				return category.substring( 'Mantenimiento: '.length );
			} );

			var config = require( './maintenance.json' );

			var attempts = 0;
			var interval = setInterval( function() {
				if ( attempts > 10 ) {
					return;
				}
				var modules = document.querySelector( '.sticky-modules-wrapper' );
				if ( !modules ) {
					attempts++;
					return;
				}

				clearInterval( interval );

				var maintenance = document.createElement( 'section' );
				maintenance.classList.add( 'rail-module' );
				maintenance.id = 'custom-maintenance-module';

				var header = document.createElement( 'h2' );
				header.classList.add( '.rail-module__header' );
				header.append( 'Administrar categorías de mantenimiento' );

				var content = document.createElement( 'ul' );
				content.classList.add( 'rail-module__list', 'is-condensed-list' );
				for ( var property in config ) {
					if ( property === 'default' ) continue;
					var item = document.createElement( 'li' );
					var checkbox = document.createElement( 'input' );
					checkbox.type = 'checkbox';

					var hasCategory = categories.find( function ( category ) {
						return category === property;
					} );
					if ( hasCategory ) {
						checkbox.checked = true;
						item.dataset.default = true;
					}
					item.append( checkbox );

					item.addEventListener( 'click', function ( event ) {
						event.preventDefault();
						var li = event.target;
						var cb = li.querySelector( 'input' );
						cb.checked = !cb.checked;

						var defaultStatus = Boolean( li.dataset.default );
						if ( defaultStatus === cb.checked ) {
							li.classList.remove( 'maintenance__diff' );
						} else {
							li.classList.add( 'maintenance__diff' );
						}
					} );

					item.insertAdjacentText( 'beforeend', property );
					content.append( item );
				}

				var button = document.createElement( 'button' );
				button.classList.add( 'wds-button', 'wds-is-full-width' );
				button.insertAdjacentText( 'beforeend', 'Guardar cambios' );
				button.addEventListener( 'click', function () {
					var diff = document.querySelector( '#custom-maintenance-module .maintenance__diff' );
					if ( !diff ) {
						new BannerNotification( 'No hay ningún cambio para guardar.', 'warn' ).show();
						return;
					}

					var items = document.querySelectorAll( '#custom-maintenance-module li' );
					var categoriesToRemove = [];
					var categoriesToAdd = [];
					for ( var i = 0; i < items.length; i++ ) {
						var item = items[ i ];

						if ( item.classList.contains( 'maintenance__diff' ) ) {
							var defaultStatus = Boolean( item.dataset.default );
							var currentStatus = item.querySelector( 'input' ).checked;
							var category = 'Mantenimiento: ' + item.innerText;

							if ( defaultStatus && !currentStatus ) {
								categoriesToRemove.push( category );
							} else {
								// <nowiki>
								categoriesToAdd.push( '[[Categoría:' + category + ']]' );
								// </nowiki>
							}
						}

						var disabled = item.cloneNode( true );
						var cb = disabled.querySelector( 'input' );
						cb.disabled = true;
						item.parentNode.replaceChild( disabled, item );
					}

					var removeRegexes = categoriesToRemove.map( function ( category ) {
						return '\\[\\[categor(y|ía):' + category.replace( /( |_)/, '( |_)' ) + '\\]\\]';
					} );
					var regex = new RegExp( '(' + removeRegexes.join( '|' ) + ')', 'gi' );

					var api = new mw.Api();
					api.get( {
						action: 'query',
						format: 'json',
						formatversion: 2,
						prop: 'revisions',
						rvprop: 'content',
						rvslots: '*',
						titles: cache.wgPageName
					} ).then( function ( revisions ) {
						var content = revisions.query.pages[ 0 ].revisions[ 0 ].slots.main.content;
						content = content.replace( regex, '' ) + '\n' + categoriesToAdd.join( '\n' );
						api.postWithToken( 'csrf', {
							action: 'edit',
							minor: true,
							summary: 'Actualización de categorías de mantenimiento',
							text: content,
							title: cache.wgPageName
						} ).then( function() {
							new BannerNotification( 'Se han guardado tus cambios exitosamente. La página será recargada en unos segundos.', 'confirm' ).show();
							setTimeout( function() {
								window.location.reload();
							}, 2000 );
						} );
					} );
				} );

				maintenance.append( header );
				maintenance.append( content );
				maintenance.append( button );
				modules.prepend( maintenance );
			}, 1000 );
		} );

		importArticle( {
			article: 'u:dev:MediaWiki:BannerNotification.js',
			type: 'script'
		} );
	} );
} );