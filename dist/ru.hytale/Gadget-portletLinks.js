//// --------------------------------------------------------
//// Portlet Links
//// This script adds additional/custom links to the sidebar, 
//// and additional/custom tabs at the top-right next to the Search Box.
//// https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addPortletLink
//// https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.util-method-addPortletLink
//// --------------------------------------------------------


var action = mw.config.get("wgAction"),
    server = mw.config.get("wgServer"),
    pageName = mw.config.get("wgPageName"),
    canonicalNamespace = mw.config.get("wgCanonicalNamespace");

// --------------------------------------------------------
// last diff
// Adds a tab which gives the latest diff for a page.
// --------------------------------------------------------
if ( canonicalNamespace != 'Служебная' 
     && action != 'edit' 
     && action != 'delete' 
     && action != 'watch' 
     && action != 'unwatch' 
     && action != 'protect' ){
	
	$(document).ready(function(){
		
		mw.util.addPortletLink(
			"p-cactions",            // Класс вкладки
			server + "/index.php?title=" + encodeURIComponent(pageName) + "&diff=cur&oldid=prev", 
			"Последняя правка",                  // Название вкладки
			"ca-last",               // ID
			"Показать последние изменения на странице", // Всплывающее сообщение
			'2'                      // Ключ доступа
		);
		
	});
	
}

// --------------------------------------------------------
// Highlight Redirects
// Adds a tab to the top of pages; when clicked it highlights all links on the page that are redirects.
// Notes: https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addCSS
// --------------------------------------------------------
if ( canonicalNamespace != 'Служебная' 
     && action != 'history' 
     && action != 'delete' 
     && action != 'watch' 
     && action != 'unwatch' 
     && action != 'protect' 
     && action != 'markpatrolled' 
     && action != 'rollback' ){
	
	$(document).ready( function(){
		
		var highlightRedirectsCss = mw.util.addCSS(
			'a.mw-redirect { color:black; background-color:yellow; }' +
			'a.mw-redirect:visited { color:dimgrey; background-color:yellow; }'
		); 
		highlightRedirectsCss.disabled = true;
		
		var portletLink = mw.util.addPortletLink(
			'p-cactions', '#',	'Перенаправления', 'ca-redirects',
			'Выделяет все ссылки, являющиеся перенаправлениями', 'r'
		);
		$( portletLink ).click( function(e){
			e.preventDefault();
			highlightRedirectsCss.disabled = !highlightRedirectsCss.disabled;
		});
		
	});
	
}

// --------------------------------------------------
// Page logs 
// Because they're not just for admins :P
// Adds a link in the Tools section of the sidebar.
// --------------------------------------------------
if (canonicalNamespace != "Служебная") {
	
	$(document).ready(function(){
		mediaWiki.util.addPortletLink("p-tb", 
			"https://hytale-ru.gamepedia.com/index.php?title=Служебная%3AЖурналы&type=&user=&page=" + pageName, 
			"Журналы", 
			"t-logs", 
			"Показать все недавние записи этой страницы", 
			'3'
		);
	});
	
}

// --------------------------------------------------
// Restyle the Purge tab from the current "Refresh"
// --------------------------------------------------

$(document).ready(function(){
	
	$("#ca-purge a")
		.attr("title","Очистить сетевой кэш и принудительно обновить эту страницу [alt-shift-0]")
		.attr("accesskey","0")
		.text("Обновить");
		
});

// --------------------------------------------------------
// Frozen Animations
// Replaces images with the first frame
// Uses html5 canvas https://caniuse.com/#search=canvas
// Notes: https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addCSS
// --------------------------------------------------------
if ( canonicalNamespace != 'Служебная'
     && action != 'history'
     && action != 'delete'
     && action != 'watch'
     && action != 'unwatch'
     && action != 'protect'
     && action != 'markpatrolled'
     && action != 'rollback' ){
	
	$(document).ready( function(){
		$("#bodyContent .image").each(function(){
			var $this = $(this)
			  , img = $this.children()[0]
			  , $cvs = $('<canvas/>').appendTo($this)
			  , ctx = $cvs[0].getContext('2d');
			//$this.addClass('frozen-animations');
			$cvs.attr('width', img.naturalWidth);
			$cvs.attr('height',img.naturalHeight);
			ctx.drawImage(img,0,0);
			$cvs.css('width', img.clientWidth);
			$cvs.css('height',img.clientHeight);
		});
		//var frozenAnimationsCss   = mw.util.addCSS('#bodyContent .frozen-animations > img { display: none; }')
		//  , unfrozenAnimationsCss = mw.util.addCSS('#bodyContent .frozen-animations > canvas { display: none; }'); 
		var frozenAnimationsCss   = mw.util.addCSS('#bodyContent .image > img { display: none !important; }' +
		                                           '#bodyContent .image { display: flex; }' +
		                                           '#bodyContent .image > canvas { margin-left: auto; margin-right: auto; }')
		  , unfrozenAnimationsCss = mw.util.addCSS('#bodyContent .image > canvas { display: none; }'); 
		frozenAnimationsCss.disabled = true;
		
		var portletLink = mw.util.addPortletLink(
			'p-cactions', '#',	'Заморозить', 'ca-frozen',
			'Заменить все анимации на странице на их первый неподвижный кадр', 'f'
		);
		$( portletLink ).click( function(e){
			e.preventDefault();
			frozenAnimationsCss.disabled = !frozenAnimationsCss.disabled;
			unfrozenAnimationsCss.disabled = !unfrozenAnimationsCss.disabled;
		});
		
	});
	
}