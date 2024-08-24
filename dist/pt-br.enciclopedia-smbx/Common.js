/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/*jshint camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: single, trailing: true, undef: true, unused: true, bitwise: true, forin: true, regexp: true, strict: true, onevar: true, laxbreak: true */
/*global mediaWiki, jQuery, importScript, importStylesheet */
/*jslint white: true */
/*global mw, $ */
if ( $.inArray( mw.config.get( 'wgPageName' ), [
	'Project:Propostas'
        'Project:Fórum'
] ) > -1 ) {
	mw.loader.load( 'MediaWiki:Commons.js/untitled' );
}

	importScript( 'MediaWiki:Common.js/IEFixes.js' );
}