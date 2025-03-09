$(() => {
	let root;
	const action = mw.config.get('wgAction');
	const sectionClass = 'page-section';
	
	if (mw.config.get('skin') === 'fandommobile'){
		return;
	}
	
	mw.loader.load('/load.php?only=styles&mode=articles&articles=MediaWiki:Sections.css', 'text/css');
	mw.hook('wikipage.content').add(() => {
		if (action !== 'submit' && action !== 'view'){
			return;
		}
		
		if (action === 'submit'){
			root = $('#wikiPreview > div > .mw-parser-output');
		} else {
			root = $('#mw-content-text > .mw-parser-output');
		}
		
		createSections(root);
	});
	
	mw.hook('ve.activationComplete').add(() => {
		root = $('#content > div > div > div > div > .ve-ce-rootNode');
		root.addClass('mw-parser-output');
		createSections(root);
	});
	
	function createSections(content){
		createSection('1', content);
		createSection('2', content);
		createSection('3', content);
		createSection('4', content);
		createSection('5', content);
		createSection('6', content);
		
		content.children(`:not(.${sectionClass})`).wrapAll($('<section>').addClass([sectionClass, 'opening-section']));
		mw.hook('userjs.loadSectionTags.done').fire(content);
		console.log('Section tags added');
	}
	
	function createSection(level, content){
		content.find(`h${level}:has(.mw-headline), h${level}.ve-ce-headingNode`).each((index, heading) => {
			const sectionWrapper = $('<section>').addClass([sectionClass, `section-level-${level}`]);
			$(heading).nextUntil($('h' + level)).add($(heading)).wrapAll(sectionWrapper);
		});
	}
});