$(function () {
	switch ( mw.config.get('wgPageName') ) {
	    case 'Дом':
    		importScript('MediaWiki:HouseOriginEgg.js');
	        break;
        case 'Парк_Мечты':
    		importScript('MediaWiki:BallsEgg.js');
	        break;
        case 'Шарики_с_Фигурами':
    		importScript('MediaWiki:BallsEgg.js');
	        break;
        case 'Масштабируемый_Шарик':
    		importScript('MediaWiki:BallsEgg.js');
	        break;
	}
});