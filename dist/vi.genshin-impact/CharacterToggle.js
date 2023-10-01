$( function() {
	var wgPageName = mw.config.get( 'wgPageName' )
	if ( wgPageName !== 'Wiki_Genshin_Impact' && !wgPageName.endsWith( '/sandbox' ) ) return
	
	initializeDropdown( {
		id: 'dropdown-elements',
		label: 'Nguyên Tố',
		options: [
			{ className: 'Anemo', name: 'Phong' },
			{ className: 'Cryo', name: 'Băng' },
			{ className: 'Dendro', name: 'Thảo' },
			{ className: 'Electro', name: 'Lôi' },
			{ className: 'Geo', name: 'Nham' },
			{ className: 'Hydro', name: 'Thủy' },
			{ className: 'Pyro', name: 'Hỏa' }
		],
		prefix: 'element',
		targetId: 'filterable-characters'
	} )
	initializeDropdown( {
		id: 'dropdown-weapons',
		label: 'Vũ Khí',
		options: [ 'Cung', 'Pháp Khí', 'Kiếm Đơn', 'Vũ Khí Cán Dài', 'Trọng Kiếm' ],
		prefix: 'weapon',
		targetId: 'filterable-characters'
	} )
	initializeDropdown( {
		id: 'dropdown-nations',
		label: 'Quốc Gia',
		options: [ 'Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan', 'Snezhnaya', 'Khaenri&apos;ah' ],
		prefix: 'nation',
		targetId: 'filterable-characters'
	} )
	
	var timeoutId = null
	var intervalId = null
	var timeoutDuration = 1000
	var intervalSteps = 10
	var loadingBar = document.getElementById( 'loading-bar' )
	
	function initializeDropdown( settings ) {
		var id = settings.id
		var label = settings.label
		var options = settings.options
		var prefix = settings.prefix
		var targetId = settings.targetId
	
	
		var container = document.getElementById( id )
		container.classList.add( 'dropdown-check-list' )
		container.dataset.prefix = prefix
		var anchor = document.createElement( 'span' )
		anchor.classList.add( 'anchor' )
		anchor.appendChild( document.createTextNode( 'Chọn tất cả' + label ) )
		container.appendChild( anchor )
	
		var items = document.createElement( 'ul' )
		items.classList.add( 'dropdown-items' )
		container.appendChild( items )
	
		for ( var i = 0; i < options.length; i++ ) {
			var option = typeof options[ i ] === 'string' ? { name: options[ i ] } : options[ i ]
			var className = ( option.className || 'option-' + option.name ).toLowerCase()
			var image = option.image || option.name + '.png'
			var li = document.createElement( 'li' )
			li.classList.add( className )
			items.appendChild( li )
			
			var checkbox = document.createElement( 'input' )
			checkbox.type = 'checkbox'
			checkbox.autocomplete = 'off'
			checkbox.checked = 'checked'
			checkbox.value = option.name
			checkbox.dataset.image = image
			li.appendChild( checkbox )
	
			var img = document.createElement( 'img' )
			img.src = 'https://genshin-impact.fandom.com/vi/wiki/Special:Filepath/' + image
			img.width = 24
			li.appendChild( img )
	
			li.appendChild( document.createTextNode( option.name ) )
	
			li.addEventListener( 'click', function () {
				this.querySelector( 'input' ).click()
			} )
	
			checkbox.addEventListener( 'change', function () {
				var checked = Array.from( this.closest( 'ul' ).querySelectorAll( 'input' ) ).filter( function( cb ) {
					return cb.checked
				} ).map( function ( cb ) {
					var img = document.createElement( 'img' )
					img.src = 'https://genshin-impact.fandom.com/vi/wiki/Special:Filepath/' + cb.dataset.image
					img.width = 24
					img.alt = cb.value
					img.title = cb.value
					return img.outerHTML
				} )
				var cbAnchor = this.closest( '.dropdown-check-list' ).querySelector( '.anchor' )
				cbAnchor.innerHTML = label + ': '
				if ( checked.length === 0 ) {
					cbAnchor.innerHTML += 'Không có'
				} else if ( checked.length === options.length ) {
					cbAnchor.innerHTML += 'đang chọn tất cả'
				} else {
					cbAnchor.innerHTML += checked.join( ' ' )
				}
	
				if ( timeoutId ) clearTimeout( timeoutId )
				if ( intervalId ) clearInterval( intervalId )
				loadingBar.dataset.width = 0
				loadingBar.style.width = '0%'
	
				var cb = this
				timeoutId = setTimeout( triggerGlobalUpdate.bind( cb ), timeoutDuration )
				intervalId = setInterval( function () {
					loadingBar.dataset.width = parseInt( loadingBar.dataset.width ) + 100 / intervalSteps
					loadingBar.style.width = loadingBar.dataset.width + '%'
				}, timeoutDuration / intervalSteps )
			} )
		}
	
		anchor.addEventListener( 'click', function () {
			container.classList[ container.classList.contains( 'visible' ) ? 'remove' : 'add' ]( 'visible' )
		} )
	
		function triggerGlobalUpdate() {
			var cb = this
			clearInterval( intervalId )
			loadingBar.dataset.width = 100
			loadingBar.style.width = '100%'
	
			var allFilters = {}
			var dropdowns = Array.from( cb.closest( '.dropdown-container' ).querySelectorAll( '.dropdown-check-list' ) )
			for ( var i = 0; i < dropdowns.length; i++ ) {
				var dropdown = dropdowns[ i ]
				var filter = new Set()
				var checkboxes = Array.from( dropdown.querySelectorAll( 'input' ) ).filter( function ( c ) {
					return c.checked
				} ).forEach( function ( c ) {
					filter.add( c.value.toLowerCase() )
				} )
				allFilters[ dropdown.dataset.prefix ] = filter
			}
	
			var filterableContainer = document.querySelector( '#' + targetId )
			filterableContainer.querySelectorAll( '.characterbox' ).forEach( function( item ) {
				var $item = $( item )
				var show = true
				for ( var prefix in allFilters ) {
					var filter = allFilters[ prefix ]
					var prefixClass = $item.attr( 'class' ).split( / /g ).find( function( i ) {
						return i.startsWith( prefix )
					} )
					if ( !prefixClass ) break
					var prefixValue = prefixClass.split( '-' ).at( 1 )
					if ( !filter.has( prefixValue ) ) show = false
				}
				$item[ show ? 'fadeIn' : 'fadeOut' ]()
			} )
	
			loadingBar.dataset.width = 0
			loadingBar.style.width = '0%'
		}
	}
} )