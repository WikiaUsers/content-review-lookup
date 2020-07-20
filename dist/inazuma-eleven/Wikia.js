importScriptPage('MediaWiki:Wikia.js/editCount.js','inazuma-eleven');

$(function() {
  if (mw.config.get('wgUserGroups').indexOf('staff') == -1) { // if you wish to skip it from the staff
    $('.nav li:first-child .subnav-2 .subnav-2-item:first-child').after('<li class="subnav-2-item"><a class="subnav-2a" href="/wiki/Project:Manual_of_Style">Manual of Style</a></li>');
  }
});