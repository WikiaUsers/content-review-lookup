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

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
	]
});