// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
window.DisplayClockJS = '%2I:%2M:%2S %p, %B %2d, %Y (UTC)';

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js',
		'w:c:dev:DisplayClock/code.js',
		'w:c:dev:ExtendedNavigation/code.js',
        'w:c:dev:FixMultipleUpload/code.js'
    ]
});