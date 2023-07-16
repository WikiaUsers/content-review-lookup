var element = document.getElementsByClassName("pullout-content").item(0);
element.classList.add("mw-collapsed");
element.classList.add("hide-pullout-content");
var element = document.getElementsByClassName("pullout-spacer").item(0);
element.classList.remove("mw-collapsed");
var element = document.getElementsByClassName("pullout-left-arrow").item(0);
element.classList.remove("mw-collapsed");
element.style.display = "unset";
var element = document.getElementsByClassName("pullout-right-arrow").item(0);
element.classList.add("mw-collapsed");
$(document).ready(function(){
	$('.pullout-content').each(function(i, obj) {
	    $(obj).attr("aria-hidden","true");
	    var toggle = $(".pullout-handle");
		$(toggle).attr("title","Show editor notices");
		$(toggle).attr("aria-label","Show editor notices");
	});
});