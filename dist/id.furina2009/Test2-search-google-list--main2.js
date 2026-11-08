// Load Wikiapi module
const Wikiapi = require('wikiapi');

// OPEN ASYNC DOMAIN:
(async () => {

	// LOGIN IN: In any wiki, any language
	const wiki = new Wikiapi('id');		// or new Wikiapi('https://furina2009.fandom.com/id/api.php')
	await wiki.login('user', 'password');		// get your own account and password on your target wiki.


	/* ***************************************************** */
	/* READ ONLY ******************************************* */
	// load page
	let page_data = await wiki.page('Universe', {});
	console.log('page_data: ', page_data);
	console.log('page_data.text: ', page_data.wikitext);

	// Get multi revisions (ex: 2)
	let page_data = await wiki.page('Universe', { revisions: 2 });
	console.log('page_data: ', page_data);
	console.log('page_data.text: ', page_data.wikitext);

	/* ***************************************************** */
	/* EDITING ********************************************* */
	/* Note: .page() then .edit() ************************** */
	// Edit page: append content, as bot.
	let page_data = await wiki.page('Universe'),
		newContent = page_data.wikitext + '\nTest edit using wikiapi.';
	await wikia.edit(
		function (page_data) { return newContent; },		// new content
		{ bot: 1, summary: 'Test edit.' }			// options
	);

	// Edit page: replace content, with more options.
	let page_data = await wiki.page('Universe'),
		newContent = page_data.wikitext.replace(/Test edit using wikiapi/g, 'Test: replace content was successful!');
	await idwiki.edit(
		function (page_data) { return newContent; },  // new content
		{ bot: 1, minor: 1, nocreate: 1, summary: 'Test: replace content.' } // more options
	);

	// Edit page: wipe clean, replace by string
	let page_data = await wiki.page('Universe');
	await wiki.edit(
		'{{Speedy|reason=Vandalism}}',
		{ bot: 1, minor: 0, nocreate: 1, summary: 'Test: wipe clean, please delete.' }
	);

	/* edit_page(): a more direct method ******************* */
	// Edit page: 
	await wiki.edit_page('Test2-search-google-list', function (page_data) {
		return page_data.wikitext + '\nTest edit using {{Testing Javascript}}.';
	}, { bot: 1, nocreate: 1, minor: 1, summary: 'Test: edit page via .edit_page().' });


	/* ***************************************************** */
	/* PROVIDE MANY **************************************** */
	// List of hand-picked target pages
	let list = ['Test2-search-google-list'];
	// List pages in [[Category:Chemical_elements]]
	let listMembers = await wiki.categorymembers('');  // array of titles
	// List intra-wiki links in [[ABC]]
	let listLinks = await wiki.redirects_here('Test2');  // array of titles
	// List of transcluded pages {{w:en:Periodic table}}
	let listTranscluded = await wiki.embeddedin('');

	// List of searched pages with expression in its title name
	let listSearch = await wiki.search('Test2-ggl');  // array of titles

	/* ***************************************************** */
	/* MULTI-read/edit ************************************* */
	// Multi edit, members of category
	await wiki.for_each_page(
		listMembers,
		page_data => { return `{{Testing Javascript}}\n` + page_data.wikitext; },
		{ summary: 'Test: multi-edits', minor: 1 }
	);

	// Multi read, following intra-wiki links
	await wiki.for_each_page(
		listLinks,			// array of targets
		page_data => {
			console.log(page_data.title);		// print page title
			return Wikiapi.skip_edit;		// skip edit, just read, return nothing to edit with.
		}, // no edit therefore no options
	);

	// Edit page and parse
	const parsed = await wiki.page('Test2-search-google-list').parse();
	parsed.each('template', template_token => {/* modify token */ });
	await wiki.edit(parsed.toString(), { bot: 1, minor: 1, nocreate: 1 });
});