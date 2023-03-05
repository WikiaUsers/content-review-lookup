//скрипт підтягує локацію Баро Кі’Тіра з api.warframestat.us та виводить рядок

const NW_PAGE_NAME = mw.config.get("wgPageName");
const WHITELIST_BARO_PAGES = [
		"Шаблон:Баро/Таймер",
		"Баро_Кі’Тір",
	];
Object.freeze(WHITELIST_BARO_PAGES);

if (WHITELIST_BARO_PAGES.includes(NW_PAGE_NAME)) {
	$.get( "https://api.warframestat.us/pc/voidTrader/?language=uk", function( data ) {
		$( "span#baroLocation" ).append( data.location.replace('Реле', 'реле'));
	}, "json" );
}