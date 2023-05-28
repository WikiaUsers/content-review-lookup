/* Any JavaScript here will be loaded for all users on every page load. */

//Gif Hover
$("img", "#gifs-rows").hover(function() {
  $('.preset-file').toggle();
  $('.gif-file').toggle();
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

function importMWCSS(title) {
	var url = mw.config.get('wgScript') + ('?title='+title+'&action=raw&ctype=text/css');
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	document.getElementsByTagName('head') [0].appendChild(link);
};

importMWCSS(monthcss);

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

// Audio can only play 1 element at a time
$(function(){
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
        });
    });
});