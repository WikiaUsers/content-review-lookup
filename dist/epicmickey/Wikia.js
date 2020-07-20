// New Applicable Games template
// Uses Template:Applicable Games to add navigation icons to the article title bar. Height of the icons is 25px and should conform to Fandom's customization guidelines.

const templateExists = $("#applicable-games").length;
const emImg = ["//vignette.wikia.nocookie.net/epicmickey/images/9/91/Em-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/c/ca/Em-1.png/revision/latest"];
const em2Img = ["//vignette.wikia.nocookie.net/epicmickey/images/7/73/Em2-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/a/af/Em2-1.png/revision/latest"]
const poiImg = ["//vignette.wikia.nocookie.net/epicmickey/images/c/ce/Poi-0.png/revision/latest", "//vignette.wikia.nocookie.net/epicmickey/images/7/71/Poi-1.png/revision/latest"]
 
function validateGameInput(val) {
	if(val !== undefined && (val === 1 || val === 0)) {
		return val;
	} else {
		return 0;
	}
}
 
const em = validateGameInput($("#applicable-games").data("one"));
const em2 = validateGameInput($("#applicable-games").data("two"));
const poi = validateGameInput($("#applicable-games").data("poi"));
 
if (templateExists) {
	$(".page-header__contribution div:not([class])").prepend("<div style='vertical-align:middle;display:inline-block;text-align:right;opacity:0.9'><a href='/wiki/Epic_Mickey'><img style='margin-right:4px;' src='"+emImg[em]+"'></a><a href='/wiki/Epic_Mickey_2:_The_Power_of_Two'><img style='margin-right:4px;' src='"+em2Img[em2]+"'></a><a href='/wiki/Epic_Mickey:_Power_of_Illusion'><img src='"+poiImg[poi]+"'></a></div>");
}