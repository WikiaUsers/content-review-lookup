/* Any JavaScript here will be loaded for all users on every page load. */

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber')===0){
  document.getElementsByClassName('page-header__page-subtitle')[0].style.display='none';
}

/* Customizing text of auto-created user pages */

window.AutoCreateUserPagesConfig = {
  content: '{{Welcome}}',
  notify: '<a href="/wiki/User:$2">Welcome to the Little Bear Wiki!</a>'
}