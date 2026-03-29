
// Any JavaScript here will be loaded for all users on every page load.
$(function () {
    var conf = mw.config.get([
            'wgAction',
            'wgNamespaceNumber'
        ]);
 
	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <https://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if (conf.wgNamespaceNumber === 1201 && $('.mw-geshi').length) {
		mw.loader.load('ext.geshi.local');
	}
 
	if (
            conf.wgAction === 'edit' &&
            conf.wgNamespaceNumber === 0
        ) {
            // causing some duplication bugs atm, will revisit soon TM
            // importScript('MediaWiki:CodeEditor.js');
	}
});



/* --- SCRIPT PARA CARRUSEL AUTOMÁTICO --- */
/* --- AUTO-PLAY PARA TABBER --- */
/* Empujoncito para el CustomSlider */
$(window).on('load', function() {
    setTimeout(function() {
        if ($('.custom-slider').length && !$('.custom-slider').hasClass('initialized')) {
            // Forzar disparo del evento de redimensionado para que el slider despierte
            window.dispatchEvent(new Event('resize'));
        }
    }, 5000);
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CustomSlider.js',
    ]
})