// Script to pull mw-recentchangeslist so we don't have to include the other noise that gets transcluded with {{Special:RecentChanges/n}} where n is the number of changes to show

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById('recent-changes-container');
    if (container) {

      fetch('/wiki/Special:RecentChanges')
        .then(response => response.text())
        .then(data => {
          // Extracting mw-changeslist...
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          var changesList = doc.querySelector('.mw-changeslist');

          // Inserting our extracted mw-changeslist into container...
          if (changesList) {
            container.innerHTML = '';
            container.appendChild(changesList);
          } else {
            container.innerHTML = 'Failed to load recent changes.';
          }
        })
        .catch(error => {
          console.error('Error loading recent changes:', error);
          container.innerHTML = 'Failed to load recent changes.';
        });
    }
  });
})();