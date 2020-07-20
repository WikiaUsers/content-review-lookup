/*This is borrowed from the Dev Wiki, but additional namespace is customized, so this script is a must in this wiki, especially for easiersearching*/
$('.wds-global-navigation__search-input').on('keyup', function(){
	var txt = $(this).val(),
		m = txt.match(/^\!([a-z]+) /),
		namespaces;
	if (m) {
		namespaces = {
			t: "Template",
			mw: "MediaWiki",
			s: "Special",
			h: "Help",
			m: "Module",
			f: "File",
			u: "User",
			p: "Project",
			c: "Category",
			me: "Message Wall",
			/*This is a custom namespace*/
			l: "Level",
			/* Message Wall Greeting is required*/
			mlg: "Message Wall Greeting"
 
		};
		if (namespaces.hasOwnProperty(m[1])) {
			$(this).val(namespaces[m[1]] + ":" + txt.substr(m[1].length + 2));
		}
	}
});