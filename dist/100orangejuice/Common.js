/* Any JavaScript here will be loaded for all users on every page load. */

//Import scripts that are needed without MediaWiki:ImportJS to prevent useless downloading
mw.hook('wikipage.content').add(function($content) {
	var articles = [];

	if ($content.find('#calculator')[0]) articles.push('MediaWiki:Calculator.js');
	if ($content.find('.customCountdown')[0]) articles.push('MediaWiki:Countdown.js');

	if (articles.length) importArticle({type: 'script', articles: articles});

	//Gif Hover
	$content.find("img", "#gifs-rows").hover(function() {
		$content.find('.preset-file').toggle();
		$content.find('.gif-file').toggle();
	});

	// Audio can only play 1 element at a time
    $content.find('audio').on('play', function() {
        $content.find('audio').not(this).each(function(index, audio) {
            audio.pause();
        });
    });
});

//Auto change theme by month function
var monthcss = 'MediaWiki:' + [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
][new Date().getMonth()] + '.css';

importArticle({
	type: 'style',
	article: monthcss
});

/* Custom Tooltips for use with the Tooltips/code.js */
window.tooltips_list = [
	{
		classname: 'card-icon',
		parse: '{'+'{Tooltip/Card|<#card#>}}'
	},{
		classname: 'character-icon',
		parse: '{'+'{Tooltip/Card2|<#card2#>}}'
	},{
		classname: 'panel-icon',
		parse: '{'+'{Tooltip/Panel|<#panel#>}}'
	},{
		classname: 'fieldevents-icon',
		parse: '{'+'{Tooltip/FieldEvents|<#fieldevents#>}}'
	}
];