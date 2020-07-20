pageNames = [
    'PAGENAMEWITHOUTPREFIX',
    'ANOTHERPAGENAMEWITHOUTPREFIX'
];
pageData = [
    'DATAFORFIRSTPAGEINABOVELIST',
    'DATAFORSECONDPAGEINABOVELIST'
];
pagePurpose = [
    'PURPOSEOFFIRSTPAGE',
    'PURPOSEOFSECONDPAGE'
];
importScriptPage('Mediawiki:CreateSpecialPage/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'w:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});

 importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});

/* ====================================================================== *\
	# custom edit buttons
\* ====================================================================== */
 
if (mwCustomEditButtons) {  
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAXNSR0IArs4c6QAAAk9QTFRFAAAAgAAAAIAAgIAAAACAgACAAICAwMDAwNzApsrwAAAAQ1l4SGB7a3uQdYijhpixkKO9k6bAl6rEmq3HnrHLo7bQqLvVrb/YsMPds8bgus3nvc/owdTuxNjzydz20uT91+f+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTECL3QDwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCQccCQrY7AcAAACHSURBVCjPfchZDsMgEATR+jfOhldsSLj/JdNJjIRHKE+IHhW5qSe/Whz52dKRU4Jk/ekxQrTU9x12S33bYLPUQ4Bgqa8rrJb6ssBiqc8zzJb6NMFUlEt9HGEsyqk+DMBwKKe6954TBa/+kFP/BPV7Tfm76rca/Fb9WuNY9UuLo3ddVz194vo3NB0oZdoKj8sAAAAASUVORK5CYII=",
		"speedTip": "Redirect",// will affect <span class="ChatLogsList"></span> in subpages of [[
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
		"speedTip": "Highlight",
		"tagOpen": "<span style='background:yellow'>",
		"tagClose": "</span>",
		"sampleText": "Highlighted text here."};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/56/Button_big.png",
		"speedTip": "Large Text",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Insert Text Here"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
		"speedTip": "Small Text",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Insert Text Here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_underline.png",
		"speedTip": "<u>Underline Selected Text</u>",
		"tagOpen": "<u> ",
		"tagClose": " </u>",
		"sampleText": "Insert text to underline!"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90GCBEoGHtVh6UAAAAMaVRYdENvbW1lbnQAAAAAALyuspkAAAIYSURBVDjLtVW7ihRBFD13uvYxa2hmICIo4scIJgqCoOAPmAhGfoEYGGxiIisL/oCIoIEiGGhiZKDsKLg7jbrs4AxOd92HQVXPw77twqKVnOCcunWq7rkUmZnhP6w797YQBvuAmYGIXARwJO7j7jeEKI3xLjwaFytFr65qTKsai3j71k3cuHYFg8GgxTW4/eghrl+9jGdPn7gaM0MwSoct4mDnE0YHBxiPfyYvjmZv9yvK4R7KctihIQRmbXcj31DFIKJuw5oYqPoaMkNgjm6jAECUIcJuw8w0FxdXQ0QIIgwygxHN0LJ1ZYbEeombaVTzDdTXGBBULZ+GGc6dG1iXuQY139AMrgYwhLqOnW9elkMUYcV988lkkgyIIEZ2FIQgIl21sXn/7qGTmBrarkGE9OZd1s+eO4+NjWNu0S+fd7D/43t6c7cGchRzNmeYrV+4eAknT51e5jJubz3Am9cvoWpg0ZZGU/Ho7QUAMDNijC2OAGhOi6j4GjOEyJxanto8RwDCAo6xzRHBNMdV1NeAEIS5wzcgqnn62ndrhk3/oslp+WPjLAmak9DeOM+5uRoiQmARENJUNti4FxGIyBLX4Hz81deYITSNWVxFEVJWewRRcWPW6xVZW3RoCLT5+EXrm2NmqAhW19Y6h8dMUU0rrPf7Lv/81TuE0WjcWeDXNB46oVXt719dLxDevv/wzz/nlX7AmRPH8RuTxxRrcgmtcAAAAABJRU5ErkJggg==",
		"speedTip": "History table",
		"tagOpen": "{|class=\"wikitable sortable\"\n! scope=\"col\"| Catalog\n! scope=\"col\"| Available from\n! scope=\"col\"| Available until\n|-\n|catalog goes here\n|starting date\n|ending date\n|}",
	};
}