/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// выполнение при готовности страницы
$(document).ready(function()
{  
	// если страница редактируется
	if (wgAction == 'edit' || wgAction == 'submit') 
	{
    // выполнить функцию добавления новых кнопок
		$.when( mw.loader.using( 'ext.wikiEditor' ), $.ready).then( SetToolbar );
	}
});

// функция добавления новых кнопок
function SetToolbar() 
{
	// добавление панели "Больше[+]"
	$('#wikiEditor-section-main div.group-codemirror').prepend(
		'<span onclick="ShowEditTools();" class="tool oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement" id="btn_EditTools"><a class="oo-ui-buttonElement-button" role="button" title="Вставка вики-текста" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon"></span></a></span>'
	); 

	// добавление чёрной подложки для панели "Больше[+]"
	$('div.mw-editTools').after('<div id="EditTools_LayerBG"></div>').addClass('EditTools_FadeIn');

	// добавление заголовка на панель "Больше[+]"
	$('#editpage-specialchars').prepend('<h2>Вставка вики-текста</h2>');

    // прищелчке по фоную или по выбранному символу
	$('div.mw-editTools a, #EditTools_LayerBG').click(function()
	{
		$('div.mw-editTools, #EditTools_LayerBG').css('display', 'none');
	})

}

// функция появления панели "Больше[+]"
function ShowEditTools()
{
  $('div.mw-editTools, #EditTools_LayerBG').fadeIn(150);
}