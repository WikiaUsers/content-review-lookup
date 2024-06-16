importArticles({
	type: "script",
	articles: [
		"u:nkch:MediaWiki:ExploreMenuIcons.js",
		"u:nkch:MediaWiki:nkchSlider.js",
		"u:nkch:MediaWiki:Snippet/ExternalLinksInNewWindow.js",
		"u:nkch:MediaWiki:Snippet/SpecificLinksInNewWindow.js"
	]
});

//Тесты
document.addEventListener('DOMContentLoaded', function() {
  var tabContainers = document.querySelectorAll('.tab-container');

  tabContainers.forEach(function(container) {
    var tabHeaders = container.querySelectorAll('.tab-headers > div');
    var tabContents = container.querySelectorAll('.tab-content');

    tabHeaders.forEach(function(header, index) {
      header.addEventListener('click', function() {
        tabHeaders.forEach(function(header) {
          header.classList.remove('active');
        });
        tabContents.forEach(function(content) {
          content.classList.remove('active');
        });

        header.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });

    if (tabHeaders.length > 0 && tabContents.length > 0) {
      tabHeaders[0].classList.add('active');
      tabContents[0].classList.add('active');
    }
  });
});