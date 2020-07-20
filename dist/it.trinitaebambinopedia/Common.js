/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

/* Function to add a "purge" button at the top of the page,
 * usefull for dpl, random and similar things that need the
 * cache of the server.
 *
 * Created by MFH */
var buttonPurge = 1;

function createPurgeButton() {
  if (buttonPurge == 0 || wgCanonicalNamespace == 'Special') return;
  if (document.getElementById('ca-report-problem')) { /* Modifies the "report a problem" button, that is already invisible */
    document.getElementById('ca-report-problem').getElementsByTagName('a')[0].innerHTML = 'Purge';
    document.getElementById('ca-report-problem').getElementsByTagName('a')[0].href = wgServer + wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge';
    document.getElementById('ca-report-problem').setAttribute('id', 'ca-purge');
  }
  else {
    var menuList = document.getElementById('p-cactions').getElementsByTagName('ul')[0];
    var newLi = document.createElement('li');
    newLi.setAttribute('id', 'ca-purge');
    newLi.innerHTML = '<a href="' + wgServer + wgScriptPath + '/index.php?title=' + wgPageName + '&action=purge">Purge</a>';
    menuList.appendChild(newLi);
  }
}