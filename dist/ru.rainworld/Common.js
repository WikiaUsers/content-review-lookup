//Кастом блок в рельсе
window.AddRailModule = [{page: 'Template:RailModuleMain', prepend: true}, 'Шаблон:RailModuleBlog'];

//Добавление обложки для страниц Клен и Лиса
$(function () {
	var class_value = $(document.body)[0].classList.value;

	if (class_value.indexOf("Klen_s_flame") != -1) {
		$(document.body).addClass("page-Klen_s_flame");
	}

	if (class_value.indexOf("Foxengton") != -1) {
		$(document.body).addClass("page-Foxengton");
	}
});

$(function () {
	var buttons = document.getElementsByClassName("button-toggle");
	for (i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.innerHTML = "Показать";

		if (button.children)
			for (k = 0; k < button.children.length; k++)
				button.children[k].style = "pointer-events: none;";

		var toogle = document.getElementById(button.id + "-toggle");
		toogle.classList.add("display-none");

		toogle.id = button.id + i + "-toggle";
		button.id = button.id + i;
	}
});

//Добавление стилей для категории "Downpour"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Rain World: Downpour' ) !== -1 || p.indexOf('Klen\'s flame') != -1) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Downpour.css'
        });
    }
}( jQuery, mediaWiki );


//Добавление стилей для категории "Модификации"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
 
    if ( a.indexOf( 'Модификации' ) !== -1 || p == 'Категория:Модификации' ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Mods.css'
        });
    }
}( jQuery, mediaWiki );

//Починка ссылок
$(function () {
	var elems = document.querySelectorAll("a[href^='http://rainworld.fandom.com/wiki/']");
	
	for (var i = 0, l = elements.length; i < l; i++) {
	  var elem = elems[i];
	  eleminnerHTML = elem.innerHTML.replace(/fandom.com/g, 'miraheze.org');
	}
});

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