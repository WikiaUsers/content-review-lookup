/* Any JavaScript here will be loaded for all users on every page load. */
$('li.nav-item').eq(1).addClass('marked');
setTimeout(function() { $('li.nav-item').eq(1).find('ul.subnav-2').css('display', 'block'); }, 1000);