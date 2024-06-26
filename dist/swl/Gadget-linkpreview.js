// Link preview adapted for Legacy Wiki. Originally from [[w:c:dev:LinkPreview]]
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.noinclude = ['.quote', '.headertemplate', '.caption', '.noprint', '.stub', '.reference', '.references', '#title-eraicons', '#canontab'];
window.pPreview.RegExp.iimages = [/Premium-/, /Tab-/, /OnACanonArticle\.png/, /OnALegendsArticle\.png/, /GoToCanon\.png/, /GoToLegends\.png/, /Information_icon\.svg/, /Blue-exclamation-mark\.png/, /Blue-question-mark\.png/, /Kenobi_Binks\.png/, /Han1_edited\.jpg/, /Vergere_NEC\.jpg/, /Bobawhere\.jpg/, /Stormtrooper_Corps\.png/, /R2 repair\.png/, /Dialog-warning\.svg/, /Luke_whining\.jpg/, /We\'redoomed\.jpg/, /TPMCGYoda\.jpg/, /Firespeeders\.jpg/, /Merge-arrow\.svg/, /I_find_your_lack_of_faith_disturbing\.png/, /DarkLord\.png/, /Anakinandmom\.jpg/, /Vader1\.jpg/, /Ewokdirector\.jpg/, /HanChewie-repairs\.jpg/, /Help\.jpg/, /ShieldsUp\.png/, /Obiwanarchives\.jpg/, /Got_A_Bad_feeling\.jpg/, /Under-Construction\.png/, /Davish_krail\.jpg/, /Alongtimeago\.png/, /Jar_Jar_meets_Jedi\.png/, /Z-95_Headhunter\.jpg/, /Hkhkinfactory\.jpg/, /Copyright\.svg/, /Malakcropdel\.png/, /Rayshields\.png/, /BobaFettMain2\.jpg/, /R5BlownMotivator-Ep4HD\.jpg/, /Piett_btm\.jpg/, /Thrawn\.jpg/, /Inq-Redux\.jpg/, /Tremayne-DSSB\.png/, /Lott_Dodd_thumb\.png/, /Leia_holo\.png/, /Got_A_Bad_feeling\.jpg/, /Saw_Gerrera_Rogue_One\.png/, /Rexhelmetoff\.png/, /Blue-question-mark\.png/, /Char-stub\.png/, /YodaPrognosticating-ESBHD\.jpg/, /TPMCGYoda\.jpg/, /Vader's revelation\.png/, /Wiki-shrinkable\.png/, /I find your lack of faith disturbing\.png/ ];
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