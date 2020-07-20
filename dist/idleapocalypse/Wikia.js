/* Any JavaScript here will be loaded for all users on every page load. */


/*Used to load Infobox Images within a panel script */
$('body').on('click', '.pi-section-tab', $.fn.trigger.bind($(window), 'scroll'));