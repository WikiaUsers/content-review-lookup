window.AddRailModule = [{page: 'Template:RailModuleMain', prepend: true}, 'Шаблон:RailModuleBlog'];
//Добавление стилей для категории "Twittus"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Twittus.376.21' ) !== -1 || p == 'Категория:Twittus.376.21' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Twittus.css'
        });
    }
}( jQuery, mediaWiki );

//Добавление стилей для категории "Fortress"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Fortress.812.15' ) !== -1 || p == 'Категория:Fortress.812.15' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Fortress.css'
        });
    }
}( jQuery, mediaWiki );

//Добавление стилей для категории "Hermanos"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Hermanos.510.2' ) !== -1 || p == 'Категория:Hermanos.510.2' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Hermanos.css'
        });
    }
}( jQuery, mediaWiki );

//Добавление стилей для категории "Antimat"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Antimat.218.22' ) !== -1 || p == 'Категория:Antimat.218.22' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Antimat.css'
        });
    }
}( jQuery, mediaWiki );

//Добавление стилей для категории "Bizarre"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Bizarre.416.2' ) !== -1 || p == 'Категория:Bizarre.416.2' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Bizarre.css'
        });
    }
}( jQuery, mediaWiki );

//Отображение/скрытие элементов
$(".button-toggle").click(function () {
	var id = document.getElementById(this.id);
	var toggle = document.getElementById(this.id + "-toggle");

	if (toggle.classList.contains("display-none")) {
		id.innerHTML = "Скрыть";
		toggle.classList.remove("display-none");
	} else {
		id.innerHTML = "Показать";
		toggle.classList.add("display-none");
	}
});

	//Переключение элементов
	$(function() {
		var tabbers = document.getElementsByClassName("rw-tabber");
		for (i = 0; i < tabbers.length; i++) {
			var tabber = tabbers[i].id;

			document.getElementById(tabber + "-buttons").id = tabber + "-" + i + "-buttons";
			document.getElementById(tabber + "-tabs").id = tabber + "-" + i + "-tabs";
			document.getElementById(tabber).id = tabber + "-" + i;

			var tabber = tabbers[i].id;

			var tabber_buttons = document.getElementById(tabber + "-buttons").children;
			var tabber_tabs = document.getElementById(tabber + "-tabs").children;

			for (j = 0; j < tabber_buttons.length; j++) {
				var tabber_button = tabber_buttons[j];
				var tabber_tab = tabber_tabs[j];
				var button_id = tabber + "-" + j;
				var tab_id = button_id + "-tab";

				tabber_button.classList.add("button-tabber");
				tabber_button.id = button_id;
				tabber_button.setAttribute('tabber', tabber);
				tabber_button.addEventListener('click', button_tabber_click);
				tabber_tab.id = tab_id;

				if (j === 0) tabber_button.classList.add("button-active");
				else $(tabber_tab).hide();

				if (tabber_button.children)
					for (k = 0; k < tabber_button.children.length; k++)
						tabber_button.children[k].style = "pointer-events: none;";
			}
		}
	});

	function button_tabber_click() {
		var attr_tabber = this.getAttribute('tabber');
		var tab_id = this.id + "-tab";
		var tabber_tabs = document.getElementById(attr_tabber + "-tabs").children;

		console.log('tab_id:', tab_id);

		document.querySelector(".button-active[tabber=" + attr_tabber + "]").classList.remove("button-active");
		this.classList.add("button-active");

		for (i = 0; i < tabber_tabs.length; i++) {
			var tabber_tab = tabber_tabs[i];

			if (tabber_tab.id == tab_id) {
				$(tabber_tab).show();
			} else {
				$(tabber_tab).hide();
			}
		}
	}