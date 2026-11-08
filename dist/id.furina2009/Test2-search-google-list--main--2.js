function() {	// List of hand-picked target pages
	let list = ['Furina2009:Sandbox', 'Furina2009:Sandbox2', 'Furina2009:Sandbox/wikiapi'];
	// List pages in [[Category:Chemical_elements]]
	let listMembers = await wiki.categorymembers(''); // array of titles
	// List intra-wiki links in [[ABC]]
	let listLinks = await wiki.redirects_here('ABC');  // array of titles
	// List of transcluded pages {{w:en:Periodic table}}
	let listTranscluded = await wiki.embeddedin('Template:Periodic table');
	// List of searched pages with expression in its title name
	let listSearch = await wiki.search(' dragon');  // array of titles
};