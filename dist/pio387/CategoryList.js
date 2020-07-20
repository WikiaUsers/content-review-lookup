/**************************************************
* Author: http://c.wikia.com/wiki/User:Callofduty4*
* Uses:                                           *
* Displays category lists without the use of DPL  *
**************************************************/
 
var answeredOffsetArray = [''];
var unansweredOffsetArray = [''];
var currentOffsetIndex = 0;
var answeredOverLimit = true;
var unansweredOverLimit = true;
 
if (mw.config.get('wgCanonicalNamespace') == 'Category') {
	DisplayButtons();
	GetCategoryLists('forward');
}
 
function GetCategoryLists(direction) {
	if (currentOffsetIndex < 1) {
		$('#prevButton').hide();
	}
	else {
		$('#prevButton').show();
	}
	$('.catlist').each(function() {
		var elem = $(this);
		var catData = elem.data();
		var category1 = mw.config.get('wgPageName');
		var category2 = catData.category2;
		var catlimit = catData.limit;
		var type = catData.type;
		console.log(currentOffsetIndex);
		var listHTML = '';
		if (type == 'answered')
		{
			$.getJSON("/api.php", {action: "query", list: "categoryintersection", limit: catlimit, categories: category1 + "|" + category2, "continue": answeredOffsetArray[currentOffsetIndex], format: "json"}, function(json) {
				listHTML = ParseCategoryData(json, direction, type);
				elem.html(listHTML);
			});
		}
		if (type == 'unanswered')
		{
			$.getJSON("/api.php", {action: "query", list: "categoryintersection", limit: catlimit, categories: category1 + "|" + category2, "continue": unansweredOffsetArray[currentOffsetIndex], format: "json"}, function(json) {
				listHTML = ParseCategoryData(json, direction, type);
				elem.html(listHTML);
			});
		}
		if (answeredOverLimit == false && unansweredOverLimit == false)
		{
			RemoveButtons();
		}
	});
}
 
function ParseCategoryData(categoryData, direction, type) {
	var html = "<ol>";
	var pageList = categoryData.query.categoryintersection;
	for (i = 0; i < pageList.length; i++) {
		var newListItem = '<li><a href="/' + encodeURIComponent(pageList[i].title) + '">' + pageList[i].title + '</a></li>';
		html += newListItem;
	}
	html += '</ol>';
	if (categoryData['query-continue'])
	{
		var nextOffset = categoryData['query-continue'].categoryintersection['continue'];
		if (direction == 'forward') {
			if (type == 'answered') {
				answeredOffsetArray[currentOffsetIndex + 1] = nextOffset;
			}
			if (type == 'unanswered') {
				unansweredOffsetArray[currentOffsetIndex + 1] = nextOffset;
			}
		}
	}
	else
	{
		if (type == 'answered') {
			answeredOverLimit = false;
		}
		if (type == 'unanswered') {
			unansweredOverLimit = false;
		}
	}
	return html;
}
 
function NextButtonPress() {
	currentOffsetIndex++;
	GetCategoryLists('forward');
}
 
function PreviousButtonPress() {
	currentOffsetIndex--;
	GetCategoryLists('backward');
}
 
function DisplayButtons() {
	$('#catNavButtons').html('<a class="wikia-button" id="prevButton" onclick="PreviousButtonPress()">Previous</a>&nbsp;&nbsp;<a class="wikia-button" id="nextButton" onclick="NextButtonPress()">Next</a>'); 
}
 
function RemoveButtons() {
	$('#catNavButtons').remove();
}