/*Collapsible tables by User:HaLo2FrEeEk. 
Append 'class="collapsible"' to a table. :)*/
$('table.collapsible').each(function(e) {
  var $t = $(this);
  var $th = $t.find('th');
  var hs = ($t.hasClass('collapsed')) ? '表示' : '隠す';
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
    e.html('隠す');
    } else {
    $elems.hide('fast');
    $t.addClass('collapsed');
    e.html('表示');
    }
  }