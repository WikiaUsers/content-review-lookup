/* Any JavaScript here will be loaded for all users on every page load. */

// No edit intros on .css/.js pages
if (mw.config.get('wgAction') == 'edit' && mw.config.get('wgTitle').search(/.css|.js/g) !== -1) {
  $('#EditPageIntro').remove();
}