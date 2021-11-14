//// --------------------------------------------------------
//// Staff Portlet Links
//// This script adds additional/custom links to the sidebar, 
//// and additional/custom tabs at the top-right next to the Search Box.
//// https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addPortletLink
//// https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.util-method-addPortletLink
//// --------------------------------------------------------

$(document).ready(function(){
	
	mw.util.addPortletLink(
		"p-tb",                              // Боковая панель (где?)
		"/Служебная:Развёртка_шаблонов", // URL-ссылка
		"Развернуть шаблоны",                  // Название вкладки
		"ca-exptem",                         // ID
		"Служебная:Развёртка шаблонов"            // Всплывающее сообщение
	);
	console.log("Добавлена ссылка развёртки шаблонов");
	
	mw.util.addPortletLink(
		"p-tb",
		"/Special:ReplaceText",
		"Заменить текст",
		"ca-reptex",
		"Special:ReplaceText"
	);
	console.log("Добавлена ссылка замены текста");
	
});