const wikis = Object.freeze( require( './global.json' ).wikis );
const wikiList = Object.freeze( Object.values( wikis ) );

function localization( i18nData ) {
	const i18n = {};
	
	mw.language.getFallbackLanguageChain().forEach( function(lang) {
		if ( !i18nData.hasOwnProperty( lang ) ) return;
		getAllKeys(i18nData[lang], i18n);
	} );
	
	return i18n;
}

function getAllKeys(data, target) {
	Object.keys(data).forEach( function(key) {
		if ( !data.hasOwnProperty( key ) ) return;
		if ( target.hasOwnProperty( key ) ) {
			if ( typeof target[key] === 'object' && !Array.isArray(target[key]) && target[key] !== null
			&& typeof data[key] === 'object' && !Array.isArray(data[key]) && data[key] !== null ) {
				getAllKeys(data[key], target[key]);
			}
			return;
		}
		target[key] = structuredClone(data[key]);
	} );
}

class MessageParser {
	constructor( i18nData, resolved ) {
		this.map = new mw.Map();
		if ( resolved ) this.map.set( i18nData );
		else this.map.set( localization( i18nData ) );
	}
	message( key, ...parameters ) {
		return new mw.Message( this.map, key, parameters );
	}
	msg( key, ...parameters ) {
		return this.message( key, ...parameters ).text();
	}
}

module.exports = {
	wikis,
	wikiList,
	localization,
	MessageParser
};