/* Das folgende JavaScript wird für alle Benutzer geladen. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

function showTab(tabId) {
  const tabContents = document.querySelectorAll('.tab-content');
  for (const content of tabContents) {
    content.classList.remove('show');
  }

  const tabContentToShow = document.getElementById(tabId);
  tabContentToShow.classList.add('show');
}