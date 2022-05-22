/* Love Live topic interwiki links */
$(function() {
var elements = '#LoveLiveLink';
if ($('.page-header__languages').length) {
	$(elements).prependTo(".page-header__languages").css({"display": "inline-block"});
}else {
	$(elements).appendTo(".page-header__top").css({"display": "inline-block"});
}
});