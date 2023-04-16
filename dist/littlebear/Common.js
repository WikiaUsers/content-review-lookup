/* Any JavaScript here will be loaded for all users on every page load. */

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber')===0){
  document.getElementsByClassName('page-header__page-subtitle')[0].style.display='none';
}