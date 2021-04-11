$(function() {
  var cgn_color = window.getComputedStyle(document.querySelector('.wds-community-header__sitename a'), null).getPropertyValue('color');
  var cgn_background = window.getComputedStyle(document.querySelector('.wds-community-header'), null).getPropertyValue('background-color');
  var cgn_wrapper = document.querySelector('.wds-global-navigation-wrapper').style;
  cgn_wrapper.setProperty('--cgn-color-background', cgn_background);
  cgn_wrapper.setProperty('--cgn-color-text', cgn_color);
  cgn_wrapper.setProperty('--cgn-color-text-secondary', cgn_color);
  cgn_wrapper.setProperty('--cgn-color-accent', cgn_color);
  cgn_wrapper.setProperty('--cgn-color-chevron', cgn_color);
});