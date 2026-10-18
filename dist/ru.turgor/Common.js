/* Слайдер  */
$(function () {	
	if (mw.config.get('wgCategories').includes('Цвет')) {
	    $(function () {
	        importScriptPage('MediaWiki:Color-slider.js');
		 	importArticles({
	            type: 'style',
	            article: 'MediaWiki:Color-slider.css'
	        });
		 });
	}
});