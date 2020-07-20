/************************************/
/* PageMakerPro.                    */
/* Written by: Shining-Armor. */
/* License: GPL v2.                 */
/************************************/

(function ($, mw, window) {

	/***************************************************/
	/* i18n: Please contribute translations here only! */
	/***************************************************/

	var i18n = {
		// language list - start
		"be": {
			formTitle: "Стварыць новую старонку",
			formStart: "Стварыць",
			formCancel: "Зачыніць",
			formPage: "Адмысловае:New_Page",
			formMain: "Артыкул",
			formBlog: "Блог",
			formCat: "Катэгорыя",
			formMW: "MediaWiki",
			formTemp: "Шаблон",
			formCont: "Запоўніць старонку",
			formBlank: "Не",
			formPop: "Так"
		},
		"de": {
			formTitle: "Erstelle eine neue Seite",
			formStart: "Erstellen",
			formCancel: "Schließen",
			formPage: "Spezial:Seite_erstellen",
			formMain: "Artikel",
			formBlog: "Blog",
			formCat: "Kategorie",
			formMW: "MediaWiki",
			formTemp: "Vorlage",
			formCont: "Seiteninhalt",
			formBlank: "Leer",
			formPop: "Befüllt"
		},
		"en": {
			formTitle: "Create a New Page",
			formStart: "Create",
			formCancel: "Close",
			formPage: "Special:New_Page",
			formMain: "Main",
			formBlog: "Blog",
			formCat: "Category",
			formMW: "MediaWiki",
			formTemp: "Template",
			formCont: "Page Content",
			formBlank: "Blank",
			formPop: "Populated"
		},
		"es": {
			formTitle: "Crear una nueva página",
			formStart: "Crear",
			formCancel: "Cerrar",
			formPage: "Especial:Nueva_Página",
			formMain: "Portada",
			formBlog: "Blog",
			formCat: "Categoría",
			formMW: "MediaWiki",
			formTemp: "Plantilla",
			formCont: "Contenido",
			formBlank: "En blanco",
			formPop: "Completa"
		},
		"fr": {
			formTitle: "Créer une nouvelle page",
			formStart: "Créer",
			formCancel: "Fermer",
			formPage: "Spécial:Nouvelle_Page",
			formMain: "Principal",
			formBlog: "Blog",
			formCat: "Catégorie",
			formMW: "MediaWiki",
			formTemp: "Modèle",
			formCont: "Contenu de la page",
			formBlank: "Vide",
			formPop: "Complétée"
		},
		"lt": {
			formTitle: "Sukurti naują puslapį",
			formStart: "Sukurti",
			formCancel: "Uždaryti",
			formPage: "Specialus:Naujas_puslapis",
			formMain: "Pagrindinis",
			formBlog: "Blog'as",
			formCat: "Kategorija",
			formMW: "MediaWiki",
			formTemp: "Šablonas",
			formCont: "Lapo turinys",
			formBlank: "Tusčias",
			formPop: "Populiarus"
		},
		"nl": {
			formTitle: "Maak een nieuwe pagina",
			formStart: "Maak",
			formCancel: "Sluit",
			formPage: "Special:New_Page",
			formMain: "Main",
			formBlog: "Blog",
			formCat: "Categorie",
			formMW: "MediaWiki",
			formTemp: "Sjabloon",
			formCont: "Paginainhoud",
			formBlank: "Leeg",
			formPop: "Vol"
		},
		"pl": {
			formTitle: "Utwórz now&#261; stron&#281;",
			formStart: "Utwórz",
			formCancel: "Zamknij",
			formPage: "Specjalna:Utwórz_stron&#281;",
			formMain: "G&#322;ówna",
			formBlog: "Blog",
			formCat: "Kategoria",
			formMW: "MediaWiki",
			formTemp: "Szablon",
			formCont: "Tre&#347;&#263; strony",
			formBlank: "Pusta",
			formPop: "Zape&#322;niona"
		},
		"pt-br": {
			formTitle: "Criar uma Nova Página",
			formStart: "Criar",
			formCancel: "Fechar",
			formPage: "Especial:Nova_Página",
			formMain: "Principal",
			formBlog: "Blog",
			formCat: "Categoria",
			formMW: "MediaWiki",
			formTemp: "Predefinição",
			formCont: "Conteúdo da Página",
			formBlank: "Vazia",
			formPop: "Popular"
		},
		"ru": {
			formTitle: "Создать новую страницу",
			formStart: "Создать",
			formCancel: "Закрыть",
			formPage: "Служебная:New_Page",
			formMain: "Статья",
			formBlog: "Блог",
			formCat: "Категория",
			formMW: "MediaWiki",
			formTemp: "Шаблон",
			formCont: "Заполнить страницу",
			formBlank: "Нет",
			formPop: "Да"
		},
		"tr": {
			formTitle: "Yeni Sayfa Oluştur",
			formStart: "Oluştur",
			formCancel: "Kapat",
			formPage: "Özel:New_Page",
			formMain: "Ana",
			formBlog: "Blog",
			formCat: "Kategori",
			formMW: "MediaWiki",
			formTemp: "Şablon",
			formCont: "Sayfa İçeriği",
			formBlank: "Boş",
			formPop: "Doldurulmuş"
		},
		"uk": {
			formTitle: "Створити нову сторінку",
			formStart: "Створити",
			formCancel: "Відмінити",
			formPage: "Спеціальна:New_Page",
			formMain: "Головна",
			formBlog: "Блог",
			formCat: "Категорія",
			formMW: "MediaWiki",
			formTemp: "Шаблон",
			formCont: "Вміст сторінки",
			formBlank: "Пусто",
			formPop: "Популярне"
		}
		// language list - stop
	};

	/****************************************************/
	/* End of i18n. Please don't change anything below. */
	/****************************************************/

	/* Variables for use in the script */
	var server = mw.config.get("wgServer");
	var skin = mw.config.get("skin");
	var lang = mw.config.get("wgUserLanguage");
	if (i18n[lang] === undefined) {
		lang = 'en';
	}
	var page = mw.config.get("wgPageName");
	var formHTML = '<form class="wikiaform"><fieldset id="page-create-fieldset"><input type="radio" name="namespace" value="main" checked="checked">' + i18n[lang].formMain + '</input><input type="radio" name="namespace" value="blog">' + i18n[lang].formBlog + '</input><input type="radio" name="namespace" value="category">' + i18n[lang].formCat + '</input><input type="radio" name="namespace" value="mediawiki">' + i18n[lang].formMW + '</input><input type="radio" name="namespace" value="template">' + i18n[lang].formTemp + '</input><br/><br/><input type="text" id="NewPageTitle" style="width: 80%;" placeholder="Page title"/><br/><br/><span>' + i18n[lang].formCont + ': </span><input type="radio" name="pagecontent" value="blank" checked="checked">' + i18n[lang].formBlank + '</input><input type="radio" name="pagecontent" value="populated">' + i18n[lang].formPop + '</input><br /><br /></fieldset></form>';
	var monobookHTML = '<fieldset id="page-create-fieldset" style="width: 70%;"><legend>' + i18n[lang].formTitle + '</legend><input type="radio" name="namespace" value="main" checked="checked">' + i18n[lang].formMain + '</input><input type="radio" name="namespace" value="blog">' + i18n[lang].formBlog + '</input><input type="radio" name="namespace" value="category">' + i18n[lang].formCat + '</input><input type="radio" name="namespace" value="mediawiki">' + i18n[lang].formMW + '</input><input type="radio" name="namespace" value="template">' + i18n[lang].formTemp + '</input><br/><br/><input type="text" id="NewPageTitle" style="width: 80%;" placeholder="Page title"/><br/><br/><span>' + i18n[lang].formCont + ': </span><input type="radio" name="pagecontent" value="blank" checked="checked">' + i18n[lang].formBlank + '</input><input type="radio" name="pagecontent" value="populated">' + i18n[lang].formPop + '</input><br /><br /><button id="create-button" style="float: right;">' + i18n[lang].formStart + '</button></fieldset>';

	if (((typeof localStorage === 'object') && localStorage['optoutPageMakerPro']) ||
		$.cookie('optoutPageMakerPro')) { // allow opt-out
		return;
	}

	if (skin == "oasis") {
		$(".wds-community-header__wiki-buttons").find("ul").append('<li id="pagemakerpro"><a href="javascript:void(0)">Create Page<sup>(beta)</sup></a></li>');
		$("#pagemakerpro").click(function () {
			makeForm();
		});
	} else {
		if (page != i18n[lang].formPage) {
			$("#p-tb ul").append('<li><a href="' + mw.util.getUrl(i18n[lang].formPage) + '">' + i18n[lang].formTitle + '</a></li>');
		} else {
			makePage();
		}
	}

	function makeForm() {
		$.showCustomModal(i18n[lang].formTitle, formHTML, {
			id: "page-create",
			width: 500,
			buttons: [{
				id: "page-create-close",
				message: i18n[lang].formCancel,
				handler: function () {
					$("#page-create").closeModal();
				}
			}, {
				id: "page-create-go",
				defaultButton: true,
				message: i18n[lang].formStart,
				handler: function () {
					redirectWindow();
				}
			}]
		});
	}

	function makePage() {
		$("title").text("Page Create");
		$("#bodyContent").html(monobookHTML);
		$("#create-button").click(function () {
			redirectWindow();
		});
	}

	function redirectWindow() {
		var namespace = $("input[name=namespace]:checked").val();
		var target = $("#NewPageTitle").val();
		var populated = $("input[name=pagecontent]:checked").val();
		var link;
		var params = {};

		switch (namespace) {
			case "main":
				link = target;
				params.action = 'edit';

				if (populated == "populated") {
					params.useFormat = '1';
				}
				break;
			case "blog":
				link = 'Special:CreateBlogPage';
				break;
			case "category":
				link = i18n[lang].formCat + ':' + target;
				params.action = 'edit';
				break;
			case "mediawiki":
				link = i18n[lang].formMW + ':' + target;
				params.action = 'edit';
				break;
			case "template":
				link = i18n[lang].formTemp + ':' + target;
				params.action = 'edit';
				break;
			default:
				break;
		}
		window.location = mw.util.getUrl(link, params);
	}
}(this.jQuery, this.mediaWiki, this));