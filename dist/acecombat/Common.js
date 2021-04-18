/* These codes are run on every page load for all users. */

// AddRailModule configuration
window.AddRailModule = [
	{page: 'Template:Discord', prepend: true}
];

// Tooltip Configuration
window.tooltips_config = {
	offsetX: 5,
	offsetY: 5,
};

// Add upload images button to Special:NewFiles
$(function(){
	if($("body.page-Special_NewFiles").length){
		$(".page-header__contribution-buttons").append("<a class='wds-button' href='/wiki/Special:Upload'><svg class='wds-icon wds-icon-small'><use xlink:href='#wds-icons-image'></use></svg><span>Add new image</span></a>");
	}
});