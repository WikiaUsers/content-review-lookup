/* <nowiki> */

/**
 * jQuery AJAX patrol links
 * Script by User:Grunny (http://dev.wikia.com)
 * Source: http://dev.wikia.com/wiki/AjaxPatrol
 */

function ajaxPatrolLinks() {
   var patrolLinks = $('.patrollink');

   if(!patrolLinks.length) {
      return;
   }

   patrolLinks.click(function (e) {
      var curLink = $(this);
      var curURL = curLink.children('a').attr('href');

      e.preventDefault();
      curLink.html(vaultConfig.loadIndicator);
      $.get(curURL, function (data) {
         curLink.css('color', 'grey').text('[Marked as patrolled]');
      });
   });
}

jQuery(function($) {
   ajaxPatrolLinks();
});

/* </nowiki> */