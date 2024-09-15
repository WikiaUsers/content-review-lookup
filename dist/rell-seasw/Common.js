/* Any JavaScript here will be loaded for all users on every page load. */

if (mw.config.get('wgPageName') === 'User:XxImMortalV1ruSxX' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}
// Scroll bar
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ScrollUpButton.js',
    ]
});

// Template:Tabs
function openTab(tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}
//end