// Link preview adapted for Wookieepedia. Originally from [[w:c:dev:LinkPreview]]
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.noinclude = ['.quote', '.headertemplate', '.caption', '.noprint', '.stub', '.reference', '.references', '#title-eraicons', '#canontab'];
window.pPreview.RegExp.iimages = [
	/Alongtimeago\.png/,
	/Anakinandmom\.jpg/,
	/Blue-exclamation-mark\.png/,
	/Blue-question-mark\.png/,
	/BobaFettMain2\.jpg/,
	/Bobawhere\.jpg/,
	/CA-Icon\.svg./,
	/Char-stub\.png/,
	/Copyright\.svg/,
	/DarkLord\.png/,
	/Davish_krail\.jpg/,
	/Dialog-warning\.svg/,
	/Ewokdirector\.jpg/,
	/FA-Icon\.svg./,
	/Firespeeders\.jpg/,
	/GA-Icon\.svg./,
	/Got_A_Bad_feeling\.jpg/,
	/GoToCanon\.png/,
	/GoToLegends\.png/,
	/Han1_edited\.jpg/,
	/HanChewie-repairs\.jpg/,
	/Help\.jpg/,
	/Hkhkinfactory\.jpg/,
	/I_find_your_lack_of_faith_disturbing\.png/,
	/Information_icon\.svg/,
	/Inq-Redux\.jpg/,
	/Jar_Jar_meets_Jedi\.png/,
	/Kenobi_Binks\.png/,
	/Leia_holo\.png/,
	/Lott_Dodd_thumb\.png/,
	/Luke_whining\.jpg/,
	/Malakcropdel\.png/,
	/Merge-arrow\.svg/,
	/Obiwanarchives\.jpg/,
	/OnACanonArticle\.png/,
	/OnALegendsArticle\.png/,
	/Piett_btm\.jpg/,
	/Premium-/,
	/R2 repair\.png/,
	/R5BlownMotivator-Ep4HD\.jpg/,
	/Rayshields\.png/,
	/Rexhelmetoff\.png/,
	/Saw_Gerrera_Rogue_One\.png/,
	/ShieldsUp\.png/,
	/Stormtrooper_Corps\.png/,
	/Tab-/,
	/Thrawn\.jpg/,
	/TPMCGYoda\.jpg/,
	/Tremayne-DSSB\.png/,
	/Under-Construction\.png/,
	/Vader's revelation\.png/,
	/Vader1\.jpg/,
	/Vergere_NEC\.jpg/,
	/We\'redoomed\.jpg/,
	/Wiki-shrinkable\.png/,
	/YodaPrognosticating-ESBHD\.jpg/,
	/Z-95_Headhunter\.jpg/
	];
window.pPreview.RegExp.iclasses = ['image', 'info-icon'];
window.pPreview.dock = '#mw-content-text';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/starwars/images/d/d2/No-Image.png/revision/latest?cb=20221005234209&format=original';
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function () {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:LinkPreview/code.js',
	    ]
	});
});