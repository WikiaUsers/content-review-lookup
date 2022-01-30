
function hide(){
	var line = document.getElementsByClassName("mw-changeslist-line");
	for (var i = 0; i < line.length; i++) {
		if (line[i].innerHTML.search("Script: ") != -1) {
			line[i].classList.add("hidden-script");
		}
	}
	setInterval(function(){
		if (document.getElementsByClassName("mw-rcfilters-ui-filterTagItemWidget")[0] === undefined) {
			var hidden = document.getElementsByClassName("hidden-script");
			for (var i = 0; i < hidden.length; i++) {
				hidden[i].classList.remove("hidden-script");
			}
		}
	},840);
	
}

setTimeout(function(){
	if (document.getElementsByClassName("mw-rcfilters-ui-filterTagItemWidget")[0] !== undefined) {hide()}
}, 500);