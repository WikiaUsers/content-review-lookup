/* Any JavaScript here will be loaded for all users on every page load. */

window.tooltips_config = {
    waitForImages: true,
    noCSS: false,
};

window.tooltips_list = [
  {
    classname: 'tooltip-link',
    parse: '{' + '{:<#content#>}}',
    delay: 500,
  }
];