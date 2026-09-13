/* Any JavaScript here will be loaded for all users on every page load. */
const params = new URLSearchParams(window.location.search);
const disabledScripts = params.has('disableScripts') ? params.get('disableScripts').split(',') : []
mw.loader.load('//en.wikipedia.org/w/index.php?title=User:MusikAnimal/massRollback.js&action=raw&ctype=text/javascript');


const pageName = mw.config.get('wgPageName');
console.log(`pagename = ${pageName}`);

importScript('MediaWiki:Countdowns.js');

If you are admin please put it in discussion if you want to delete this page because I want to use mediawiki:importjs on my wiki