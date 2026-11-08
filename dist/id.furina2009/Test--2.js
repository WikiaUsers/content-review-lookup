// Load Wikiapi module
const Wikiapi = require('wikiapi');

// OPEN ASYNC DOMAIN:
(async () => {

	// LOGIN IN: In any wiki, any language
	const wiki = new Wikiaapi('id');		// or new Wikiapi('https://furina2009.fandom.com/id/api.php')
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
		newContent = page_data.wikitext + '\nTest edit using wikiaapi.';
	await wikia.edit(
		function (page_data) { return newContent; },		// new content
		{ bot: 1, summary: 'Test edit.' }			// options
	);

	// Edit page: replace content, with more options.
	let page_data = await wikia.page('Universe'),
		newContent = page_data.wikitext.replace(/Test edit using wikiapi/g, 'Test: replace content was successful!');
	await enwiki.edit(
		function (page_data) { return newContent; },  // new content
		{ bot: 1, minor: 1, nocreate: 1, summary: 'Test: replace content.' } // more options
	);

	// Edit page: wipe clean, replace by string
	let page_data = await wikia.page('Universe');
	await wiki.edit(
		'{{Speedy|reason=Vandalism}}',
		{ bot: 1, minor: 0, nocreate: 1, summary: 'Test: wipe clean, please delete.' }
	);

	/* edit_page(): a more direct method ******************* */
	// Edit page: 
	await wikia.edit_page('Furina2009:Sandbox', function (page_data) {
		return page_data.wikitext + '\nTest edit using {{GitHub|kanasimi/wikiapi}}.';
	}, { bot: 1, nocreate: 1, minor: 1, summary: 'Test: edit page via .edit_page().' });


	/* ***************************************************** */
	/* PROVIDE MANY **************************************** */
	// List of hand-picked target pages
	let list = ['Furina2009:Sandbox', 'Furina2009:Sandbox2', 'Furina2009:Sandbox/wikiapi'];
	// List pages in [[Category:Chemical_elements]]
	let listMembers = await wiki.categorymembers('');  // array of titles
	// List intra-wiki links in [[ABC]]
	let listLinks = await wiki.redirects_here('ABC');  // array of titles
	// List of transcluded pages {{w:en:Periodic table}}
	let listTranscluded = await wiki.embeddedin('Template:Periodic table');
	// List of searched pages with expression in its title name
	let listSearch = await wiki.search(' dragon');  // array of titles

	/* ***************************************************** */
	/* MULTI-read/edit ************************************* */
	// Multi edit, members of category
	await wiki.for_each_page(
		listMembers,
		page_data => { return `{{stub}}\n` + page_data.wikitext; },
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


	/* ***************************************************** */
	/* MOVE PAGE (RENAME) ********************************** */
	// Move page once.
	result = await wiki.move_page('Wikipedia:Sanbox/Wikiapi', 'Wikipedia:Sanbox/NewWikiapi',
		{ reason: 'Test: move page (1).', noredirect: true, movetalk: true }
	);
	// Reverse move
	result = await wiki.move_page('Wikipedia:Sanbox/NewWikiapi', 'Wikipedia:Sanbox/Wikiapi',
		{ reason: 'Test: move page (2).', noredirect: true, movetalk: true }
	);


	/* ***************************************************** */
	/* PARSE *********************************************** */
	// Read Infobox templates, convert to JSON.
	const page_data = await wiki.page('JavaScript');
	// `page_data.parse(options)` will startup the parser process, create page_data.parsed. After .parse(), we can use parsed.each().
	const parsed = page_data.parse();
	let infobox;
	parsed.each('template', template_token => {
		if (template_token.name.startsWith('Infobox')) {
			infobox = template_token.parameters;
			return parsed.each.exit;
		}
	});
	for (const [key, value] of Object.entries(infobox))
		infobox[key] = value.toString();
	// print json of the infobox
	console.log(infobox);

	// Edit page and parse
	const parsed = await wiki.page('Wikipedia:Sandbox').parse();
	parsed.each('template', template_token => {/* modify token */ });
	await wiki.edit(parsed.toString(), { bot: 1, minor: 1, nocreate: 1 });

	let page_data = await wiki.page('Universe');
	// See all type in wiki_toString @ https://github.com/kanasimi/CeJS/tree/master/application/net/wiki/parser.js
	// List all template name.
	page_data.parse().each('template',
		token => console.log(token.name));

	/* ***************************************************** */
	/* MONITORING ****************************************** */
	// Listen to new edits, check every 2 minutes
	wiki.listen(function for_each_row() {
		// ...
	}, {
		// 檢查的延遲時間。
		delay: '2m',
		filter: function filter_row(row) {
			// row is the same format as page_data
		},
		// also get diff
		with_diff: { LCS: true, line: true },
		// only for articles (0:main namespace) and talk pages
		namespace: '0|talk',
	});

	/* ***************************************************** */
	/* FILES *********************************************** */
	// Set upload parameters, maily for licensing reasons.
	// Note: parameter `text`, filled with the right wikicode `{{description|}}`, can replace most parameters.
	let options = {
		description: 'Photo of Osaka',
		date: new Date() || '2021-01-01',
		source_url: 'https://github.com/kanasimi/wikiapi',
		author: '[[User:user]]',
		permission: '{{cc-by-sa-2.5}}',
		other_versions: '',
		other_fields: '',
		license: ['{{cc-by-sa-2.5}}'],
		categories: ['[[Category:test images]]'],
		bot: 1,
		tags: "tag1|tag2",
	};

	// Upload file from local path
	let result = await wiki.upload({
		file_path: '/local/file/path',
		filename: 'New_Osaka_Photograph.jpg',  // default : keep filename
		comment: '',
		ignorewarnings: 1,  // overwrite
		...options
	});

	// Upload file from URL
	result = await wiki.upload({
		media_url: 'https://media.url/Thunder-Dragon.ogg',
		text: "Her eis wikicode to replave the page's content instead of various other parameters.",
		comment: 'Thunder Dragon audio from vacation in Philipines. Page uses custom template.',
		ignorewarnings: 1,  // overwrite
		...options
	});


	/* ***************************************************** */
	/* WIKIDATA, WIKIBASES ********************************* */
	// Read Qid Q1 (Universe), print Chinese label
	const wiki = new Wikiapi('https://wikidata.org/w/api.php')
	let page_data = await wiki.data('Q1');
	function(){ 
		page_data.labels.id 
		}// '宇宙'

	// Read, access by title (English), access property P1419
	// Get P1419 of wikidata entity: 'Universe'
	let data = await wiki.data('Universe', 'P1419');
	// assert: {Array}data = [ 'shape of the universe', '...', ... ]
	console.assert(data.includes('shape of the universe'));

	// update wikidata
	// Get https://test.wikidata.org/wiki/Q7
	let entity = await wiki.data('Q7');
	// search [ language, label ]
	//entity = await wiki.data(['en', 'Earth']);

	// Update claim
	await entity.modify({ claims: [{ P17: 'Q213280' }] });
	// Update claim: set country (P17) to 'Test Country 1' (Q213280) ([language, label] as entity)
	await entity.modify({ claims: [{ language: 'en', country: [, 'Test Country 1'] }] });
	// Remove country (P17) : 'Test Country 1' (Q213280)
	await entity.modify({ claims: [{ language: 'en', country: [, 'Test Country 1'], remove: true }] });

	// Update label
	await entity.modify({ labels: [{ language: 'zh-tw', value: '地球' }] });

	// CLOSE ASYNC DOMAIN:
})();