importArticles({
	type: 'script',
	article: 'u:dev:MediaWiki:LinkPreview/code.js'
});

/* settings */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.wholepage = true;
window.pPreview.defimage = 'https://static.wikia.nocookie.net/tower-defense-sim/images/f/f7/Place.png/revision/latest?cb=20221016125746';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/tower-defense-sim/images/c/c7/PlaceC.png/revision/latest?cb=20250407174935';
window.pPreview.RegExp.noinclude = ['.notice', '.tds-tabs', '.bubble-box', '.quote', '.quote-container', '.toc', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.mainheader', '.galleryheader', '.tds-navbox', '.sectionheader', '.mw-collapsible-content', '.mw-references-wrap', '.navbox-label-wide', '.navbox-label-thin', '.navbox-data', '.navbox-header', '.mobile-only', '.edit-float', '.wikia-slideshow-image-caption', '.wikia-slideshow-toolbar-counter', '.wds-tabs__tab-label', '.link-preview-hide'];
window.pPreview.RegExp.iclasses = ['image lightbox', 'video'];
window.pPreview.tlen = 250;
window.pPreview.RegExp.iimages = [/Coin\.png/, /HardcoreGem\.png/, /Cash Icon\.png/, /Exp\.png/, /RobuxIcon\.svg/,  /ArticleIcon\.png/, /FileIcon\.png/, /HistoryIcon\.png/, /SaleIcon\.png/, /StoryIcon\.png/, /AdvancedStatsIcon\.png/, /QuestionIcon\.png/, /Netherlands\.png/, /Australia\.png/, /Belgium\.png/, /UK\.png/];
window.pPreview.RegExp.onlyinclude = ['.link-preview'];
window.pPreview.RegExp.ilinks = [new RegExp('Template:|User:|Module:|Talk:|MediaWiki:|User_blog:|Message_Wall:|Blog:|Special:|Project:|Tower_Defense_Simulator_Wiki:|Category:|Map:|File:')];