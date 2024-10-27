$(function(){
	var root;
	var action = mw.config.get('wgAction');
	
	mw.hook('wikipage.content').add(function(){
		root = (action === 'submit') ? $('#wikiPreview > div > .mw-parser-output') : $('#mw-content-text > .mw-parser-output');
		
		if (action !== 'submit' && action !== 'view'){
			return;
		}
		
		createSections(root);
	});
	
	mw.hook('ve.activationComplete').add(function(){
		root = $('#content > div > div > div > div > .ve-ce-rootNode');
		root.addClass('mw-parser-output');
		createSections(root);
	});
	
	function createSections(content){
		createSection('1');
		createSection('2');
		createSection('3');
		createSection('4');
		createSection('5');
		createSection('6');
		
		content.children(':not(.page-section)').wrapAll($('<section class="page-section opening-section">'));
		mw.hook('userjs.loadSectionTags.done').fire(content);
		console.log('Section tags added');
		
		function createSection(level){
			content.find('h' + level + ':has(.mw-headline), h' + level + '.ve-ce-headingNode').each(function(){
				$(this).nextUntil($('h' + level)).add($(this)).wrapAll($('<section class="page-section">').addClass('section-level-' + level));
			});
		}
	}
});