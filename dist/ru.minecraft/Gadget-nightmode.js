/* Night mode for Minecraft wiki by violine1101, 2017 */
var i18n = {
	activate: 'Включить',
	activateTitle: 'Включить ночной режим',
	activatedLabel: 'Включён ночной режим',
	deactivate: 'Выключить',
	deactivateTitle: 'Выключить ночной режим',
	deactivatedLabel: 'Ночной режим выключен',
	settings: 'Настройки',
	settingsTitle: 'Настроить ночной режим',
	settingsDialogTitle: 'Настройки тёмного режима',
	settingsEnabled: 'Включить ночной режим',
	settingsEnableAuto: 'Автоматическое включение',
	settingsTime1: 'Включать тёмный стиль между',
	settingsTime2: 'и',
	settingsTime3: '',
	settingsInfo: 'Настройки сохраняются только для вашего браузера и устройства.',
	settingsSave: 'Сохранить',
	settingsCancel: 'Оставить как было'
};

var windowManager = new OO.ui.WindowManager();

function getCookieValue(a) {
	var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
}

function loadSettings() {
	var cookie = document.cookie.match('(^|;)\\s*nightmode\\s*=\\s*([^;]+)');
	s = cookie ? JSON.parse( cookie.pop() ) : {
		enabled: false,
		auto: false,
		time: [ 0, 12 ]
	};
	if ( s.enabled == null ) s.enabled = false;
	if ( s.auto == null ) s.auto = false;
	if ( s.time == null ) s.time = [ 0, 12 ];
	
	if ( s.auto ) {
		var d = new Date();
		var n = d.getHours() * 2 + Math.floor( d.getMinutes() / 30 );
		
		if ( 
			( s.time[0] <= s.time[1] && n >= s.time[0] && n < s.time[1] )
			|| ( s.time[0] > s.time[1] && ( n >= s.time[0] || n < s.time[1] ) )
		) s.enabled = true;
		else s.enabled = false;
		
		document.cookie = 'nightmode=' + JSON.stringify( s ) + ';path=/';
	}
	return s;
}

var settings = loadSettings();

function NightmodeSettings( config ) {
	NightmodeSettings.super.call( this, config );
	var enabledOption;
	var autoOption;
	var beginSelect;
	var endSelect;
}
OO.inheritClass( NightmodeSettings, OO.ui.ProcessDialog ); 

NightmodeSettings.static.name = 'nightmode-settings';
NightmodeSettings.static.title = i18n.settingsTitle;
NightmodeSettings.static.actions = [
	{ action: 'save', label: i18n.settingsSave, flags: [ 'primary', 'constructive' ] },
	{ label: i18n.settingsCancel, flags: [ 'safe', 'destructive' ] }
];

function makeItems() {
	var arr = [];
	for ( var i = 0; i < 48; i++ ) arr[i] = Math.floor( i / 2 ) + ':' + ( i % 2 == 0 ? '00' : '30' );
	
	return arr.map( function ( val, i ) {
		return new OO.ui.MenuOptionWidget( {
			data: i,
			label: val
		} );
	} );
}

NightmodeSettings.prototype.initialize = function () {
	NightmodeSettings.super.prototype.initialize.apply( this, arguments );
	
	var dialog = this;
	
	this.enabledOption = new OO.ui.ToggleSwitchWidget( {
		value: settings.enabled,
		label: i18n.settingsEnabled
	} );

	this.autoOption = new OO.ui.ToggleSwitchWidget( {
		value: settings.auto,
		label: i18n.settingsEnabled
	} ).on( 'change', function( v ) {
		dialog.beginSelect.setDisabled( !v );
		dialog.endSelect.setDisabled( !v );
	} );
	
	this.beginSelect = new OO.ui.DropdownWidget( {
		menu: {
			items: makeItems()
		},
		$overlay: this.$overlay
	} );
	this.beginSelect.setDisabled( !this.autoOption.getValue() );
	this.beginSelect.$element.css( { 'width': '15%', 'min-width': '80px', 'vertical-align': 'middle' } );
	this.beginSelect.getMenu().selectItemByData( settings.time[0] );
	this.beginSelect.getMenu().$element.css( { 'z-index': 10 } );

	this.endSelect = new OO.ui.DropdownWidget( {
		menu: {
			items: makeItems()
		},
		$overlay: this.$overlay
	} );
	this.endSelect.getMenu().$element.css( { 'z-index': 10 } );
	this.endSelect.$element.css( { 'width': '15%', 'min-width': '80px', 'vertical-align': 'middle' } );
	this.endSelect.getMenu().selectItemByData( settings.time[1] );
	this.endSelect.setDisabled( !this.autoOption.getValue() );

	var infoLayout = new OO.ui.PanelLayout( {
		expanded: false,
		padded: true
	} );
	infoLayout.$element.append(
		new OO.ui.IconWidget( {
			icon: 'info'
		} ).$element,
		new OO.ui.LabelWidget( { label: $( '<i>' ).html( i18n.settingsInfo ) } ).$element
	);
	
	var fieldset = new OO.ui.FieldsetLayout();
	fieldset.addItems( [ 
		new OO.ui.FieldLayout( this.enabledOption, {
			label: i18n.settingsEnabled,
			align: 'inline'
		} ),
		new OO.ui.FieldLayout( this.autoOption, {
			label: i18n.settingsEnableAuto,
			align: 'inline'
		} ),
		new OO.ui.HorizontalLayout( {
			items: [
				new OO.ui.LabelWidget( { label: i18n.settingsTime1 } ),
				this.beginSelect,
				new OO.ui.LabelWidget( { label: i18n.settingsTime2 } ),
				this.endSelect,
				new OO.ui.LabelWidget( { label: i18n.settingsTime3 } )
			]
		} ),
		infoLayout
	] );
	
	this.content = new OO.ui.PanelLayout( {
		scrollable: false,
		padded: true
	} );
	this.content.$element.append(
		fieldset.$element
	);
	
	this.$body.append( this.content.$element );
};

NightmodeSettings.prototype.getActionProcess = function ( action ) {
	var dialog = this;
	if ( action ) {
		settings = {
			enabled: this.enabledOption.getValue(),
			auto: this.autoOption.getValue(),
			time: [ this.beginSelect.getMenu().getSelectedItem().getData(), this.endSelect.getMenu().getSelectedItem().getData() ]
		};
		document.cookie = 'nightmode=' + JSON.stringify( settings ) + ';path=/';
		updateNightmode();
		return new OO.ui.Process( function () {
			dialog.close( { action: action } );
		} );
	}
	return NightmodeSettings.super.prototype.getActionProcess.call( this, action );
};

var nightmodeSettings = new NightmodeSettings( {
	size: 'large'
} );

function updateNightmode() {
	$( 'body' ).toggleClass( 'nightmode', settings.enabled );
	if ( settings.enabled ) {
		$( '#p-nightmode-label' ).html( i18n.activatedLabel );
		$( '.nightmode-toggle a' ).attr( 'title', i18n.deactivateTitle ).html( i18n.deactivate );
	}
	else {
		$( '#p-nightmode-label' ).html( i18n.deactivatedLabel );
		$( '.nightmode-toggle a' ).attr( 'title', i18n.activateTitle ).html( i18n.activate );
	}
}

windowManager.addWindows( [ nightmodeSettings ] );
$( 'body' ).append( windowManager.$element );

if ( settings.enabled ) $( 'body' ).addClass( 'nightmode' );

var portals = $( '.portal:not(#p-socialProfiles):not(#p-sitePromos)' );

$( portals[portals.length - 1] ).after(
	$( '<div>', { 'class': 'portal persistent', 'id': 'p-nightmode' } ).append(
		$( '<h3>', { 'id': 'p-nightmode-label' } ).html( settings.enabled ? i18n.activatedLabel : i18n.deactivatedLabel ),
		$( '<div>', { 'class': 'body' } ).append(
			$( '<ul>', { 'id': 'p-nightmode-list' } ).append(
				$( '<li>', { 'class': 'nightmode-toggle' } ).append(
					$( '<a>',
						{
							'title': ( settings.enabled ? i18n.deactivateTitle : i18n.activateTitle),
							'href': ''
						} )
					.html( settings.enabled ? i18n.deactivate : i18n.activate )
					.click( function( e ) {
						e.preventDefault();
						settings.enabled = !settings.enabled;
						document.cookie = 'nightmode=' + JSON.stringify( settings ) + ';path=/';
						updateNightmode();
					} )
				),
				$( '<li>', { 'class': 'nightmode-settings' } ).append(
					$( '<a>', { 'title': i18n.settingsTitle, 'href': '' } ).html( i18n.settings ).click( function( e ) {
						e.preventDefault();
						
						settings = loadSettings();
						windowManager.openWindow( nightmodeSettings );
					} )
				)
			)
		)
	)
);