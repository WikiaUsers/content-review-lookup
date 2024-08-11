;(function ($,mw) {
	var themeID = document.getElementById("CustomTheme");
	if (themeID) {
		document.body.classList.add(themeID.innerHTML.replaceAll(' ','_'));
	}
})(this.jQuery,this.mediaWiki);