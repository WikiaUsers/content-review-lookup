var pageURL = document.URL;
if (pageURL.includes("redlink=1")) {
	if (pageURL.includes("action=edit")) {
		pageURL = pageURL.replace('redlink=1','');
		window.location.href = pageURL.replace('action=edit','');
}else {
		window.location.href = pageURL.replace('redlink=1','');
} 
}//working JS!? by ME!?
//ok, it only works on usersubpages.
//moderators, if you want make edits to this. I honestly don't know how to use this.