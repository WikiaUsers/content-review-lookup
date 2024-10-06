mw.hook("wikipage.content").add(function () {
	var themeID = document.getElementById("CustomTheme");
	if (themeID) {
		document.body.classList.add(themeID.innerHTML.replaceAll(' ','_'));
	}
});