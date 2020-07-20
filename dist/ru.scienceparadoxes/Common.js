/* <pre><nowiki> */

function importScript(page) {
    var url = wgScriptPath + '/index.php?title='
                           + encodeURIComponent(page.replace(' ','_'))
                           + '&action=raw&ctype=text/javascript&dontcountme=s';
    var s = document.createElement('script');
    s.src = url;
    s.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
}

if(wgAction)
{
    if(wgAction == 'edit' || wgAction == 'submit')
    {
        importScript("MediaWiki:Edit.js");
    }
}

function onPageInit()
{
    disableOldForumEdit()

    if(typeof onPageLoad != "undefined")
    {
        onPageLoad();
    }
}

/** Отключение редактирования старых тем форума *************************************
 * Отключает кнопку «Вандализировать» для старых обсуждений на форуме.
 * Страницу можно редактировать из Журнала откатов (там кнопка доступна),
 * или напечатав адрес редактирования вручную.
 * Автор — Spang
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if( !document.getElementById('ca-edit') || !document.getElementById('old-forum-warning') )
		return;
	editLink = document.getElementById('ca-edit').firstChild;
	editLink.removeAttribute('href', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'не править';
}
addOnloadHook(disableOldForumEdit);

/* </nowiki></pre> */