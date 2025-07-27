/* Topic block log settings */
TBL_GROUP = "roblox-en";

window.SeeMoreActivityButtonRC = true;

/* Link preview settings */
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

// For [[Module:CSS]]; [[Template:CSS]] dependency
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        var css = mw.util.addCSS($(this).attr("data-css"));
        $(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
    });
});

// This function gets the badge ID and the awarded count, then updates all elements with class "id{badgeId}"
window.__updateBadgeCount = function(id, count) {
  document.querySelectorAll('.id' + id).forEach(el => {
    el.textContent = count.toLocaleString(); // Format number with commas (e.g., 12,345)
  });
};

// Find all elements with a class that contains "id" followed by digits (e.g., id2124475816)
document.querySelectorAll('[class*="id"]').forEach(el => {
  const match = el.className.match(/id(\d{5,})/); // extract the badge ID from the class name
  if (!match) return; // skip if no match found

  const badgeId = match[1]; // extracted badge ID
  const script = document.createElement('script');
  script.src = 'https://occulticnine.vercel.app/badges?id=' + badgeId;

  document.head.appendChild(script); // Append badge count to class
});