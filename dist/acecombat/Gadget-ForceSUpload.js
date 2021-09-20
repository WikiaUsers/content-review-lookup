$(function(){
	// Add upload images button to Special:NewFiles
	if($("body.page-Special_NewFiles").length){
		var buttonArea = ".page-header__buttons";
		$(buttonArea).append("<a class='wds-button' href='/wiki/Special:Upload'><svg class='wds-icon wds-icon-small'><use xlink:href='#wds-icons-image'></use></svg><span>Add new image</span></a>");
	}
});