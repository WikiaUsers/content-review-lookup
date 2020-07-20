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
			mlg: "Message Wall Greeting",
			b: "Board",
			bt: "Board Thread",
			ub: "User blog",
			ubc: "User blog comment"
		};
		if (namespaces.hasOwnProperty(m[1])) {
			$(this).val(namespaces[m[1]] + ":" + txt.substr(m[1].length + 2));
		}
	}
});