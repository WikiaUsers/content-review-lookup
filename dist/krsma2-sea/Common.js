/* Any JavaScript here will be loaded for all users on every page load. */

// Create and set timezone for display clock
var timezone = 8; // 8 -> UTC +8, 0 -> UTC, -8 -> UTC -8

switch (mw.config.get('wgPageName')) {
    case '3D_Boss':
        window.DisplayClockJS = '%2d/%m/%Y (GMT +8)<br />%2I:%2M:%2S %p';
        importArticles({
	        type: 'script',
	        articles: [
		        // Modified DisplayClock with configurable timezone support
		        'DisplayClock.js',
	        ]
        });
    break;
    case '2D_Boss':
        window.DisplayClockJS = '%2d/%m/%Y (GMT +8)<br />%2I:%2M:%2S %p';
        importArticles({
	        type: 'script',
	        articles: [
		        // Modified DisplayClock with configurable timezone support
		        'DisplayClock.js',
	        ]
        });
    break;
}