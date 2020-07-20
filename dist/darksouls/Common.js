/* Any JavaScript here will be loaded for all users on every page load. */

/***********************/
/*** MASTHEAD RIGHTS ***/
/***********************/

$(function() {
 var rights = {};

/* Bureaucrats */
rights["Matsczon"]                    = ["Bureaucrat"];


/* Administrators */
rights["ShadowBeast109"]              = ["Administrator"];


/*Content Moderators*/

/* Bots */

 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});



/* JavaScript for collapsible tables from http://elderscrolls.wikia.com/wiki/MediaWiki:Common.js/collapse.js */

$('table.collapsible').each(function(e) {
  var $t = $(this);
  var $th = $t.find('th');
  var hs = ($t.hasClass('collapsed')) ? 'show' : 'hide';
  $th.append("<span class=\"collapseLink\">[<a href=\"#\">" + hs + "</a>]</span>");
  if($t.hasClass('collapsed')) {
    $t.find('td').parent().hide();
    }
  });
 
$('.collapseLink > a').click(function(e) {
  e.preventDefault();
  collapseTable($(this));
  });
 
collapseTable = function (e) {
  $t = e.closest('table');
  $elems = $t.find('td').parent();
  if($t.hasClass('collapsed')) {
    $elems.show('fast');
    $t.removeClass('collapsed');
    e.html('hide');
    } else {
    $elems.hide('fast');
    $t.addClass('collapsed');
    e.html('show');
    }
  }

function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}

/* Countdown Timer Code */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

// </syntax>


/** Autoplay for Moment of Triumph video **/
$(window).load(function() {
    $('.mw-content-text .autoplay .play-circle').each(function() {
        $(this).click();
    });
});