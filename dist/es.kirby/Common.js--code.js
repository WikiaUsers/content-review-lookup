/* <pre> */


/** Para UploadInPage **/
window.needsLicense = true;

/* Imports */
window.RevealAnonIP = {
    permissions : ['sysop']
};

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Plantillas', order: 102 },
		bureaucrat: { u: 'Burócrata', order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'José Dedede': ['csshelper', 'templatehelper', 'jshelper'],
	'Clear Arrow': ['csshelper', 'jshelper']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
 
if (mw.config.get('skin') != 'oasis') { // Not if skin == "monobook" if somebody comes and uses skin uncyclopedia
    importScript('MediaWiki:Common.js/Categories.js');
}
// Ajax de dev wiki
ajaxPages = ["Especial:CambiosRecientes","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones","Especial:WikiActivity"];
AjaxRCRefreshText = 'Actualizar automáticamente';
AjaxRCRefreshHoverText = 'Automáticamente refresca la página';
var ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

 /* Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME. */
 function UserNameReplace() {
     if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
     $("span.insertusername").html(wgUserName);
  }
  $(UserNameReplace);

/** No permitir que suban archivos en Special:Images **/
function especialUpload () {
	$('#page-header-add-new-photo').click(function() {
		window.location.replace('/es/wiki/Special:Upload');
	});
}
if (wgCanonicalSpecialPageName == "Images") {$(especialUpload);}

/* A veces si buscamos por alguna razón no nos sugiere nada */
$(function() {
	if (!mw.config.get('wgMWSuggestTemplate') && mw.loader.getVersion('mediawiki.legacy.mwsuggest')) {
		mw.config.set('wgMWSuggestTemplate', mw.util.wikiScript('api') + '?action=opensearch&search={searchTerms}&namespace={namespaces}&suggest');
		mw.config.set('wgSearchNamespaces', [0, 6, 10, 14, 110]);
		importScriptURI(mw.config.get('stylepath') + '/common/mwsuggest.js');
		window.setTimeout(function() {
			if (window.os_MWSuggestInit) {
				window.os_MWSuggestInit();
			}
		}, 1000);
	}
});

/**** Más botones en el editor ****/
if ({ edit:1, submit:1 }[mw.config.get('wgAction')]) {
	mw.loader.using('mediawiki.action.edit', function () {
		if (mw.toolbar) {
			mw.toolbar.addButton(
				'https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png',
				'Proponer para borrar',
				'\{\{Borrar|',
				'\}\}',
				'Razón',
				'mw-editbutton-borrar'
			);
		}
	});
}

$(function () {
    if (mw.config.get('skin', '') == "oasis") {
        $('#mw-editbutton-borrar').insertAfter("#mw-editbutton-vet");
    }
});

/** Para que el "editar sección" se vea mejor **/
function moveEditSection(){
	if (window.oldEditsectionLinks) return;
	$('span.editsection').each(function() {
		var $span = $(this), h = $span.closest('h1,h2,h3,h4,h5,h6');
		if (h.length) {
			$span.addClass('editsection-nf').appendTo(h);
		}
	});
}
$(moveEditSection);

/** Link Preview **/
window.pPreview = {
	RegExp: {
		prep: [/<table[\s\S]*?<\/table>/mig],
		ilinks: [/catego.*?:.*?/gim] // Ignorar categorías
	},
	noimage: 'https://vignette.wikia.nocookie.net/kirby/images/4/45/Kirby-reversor.png/revision/latest?cb=20121209183717'
}

/* </pre> */