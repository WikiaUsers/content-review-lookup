/* Не даёт выбрать защиту 'move=autoconfirmed', т.к. в ней нет никакого смысла: перемещать
   страницы могут только участники с флагом rollback, которые "круче", чем autoconfirmed.
*/
function disable_move_semiprotection()
{
  var div = document.getElementById('mwProtect-level-move');
  if(!div) return;
  var opts = div.getElementsByTagName('option');
  if(!opts) return;
  if(!opts[1]) return;
  opts[0].innerHTML = "Без защиты (только откатывающие)";
  if(opts[1].selected)
  {
    opts[1].disabled = true;
    opts[1].innerHTML = "Защита autoconfirmed (бесполезна)";
  }
  else div.removeChild(opts[1]);
}

if(wgAction == 'delete')
    importScript('MediaWiki:Cdelreason.js');
if(wgAction == 'block')
    {}
if(wgAction == 'protect' || wgAction == 'unprotect')
  addOnloadHook(disable_move_semiprotection);