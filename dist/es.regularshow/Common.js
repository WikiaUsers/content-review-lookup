window.dev = window.dev || {}; window.dev.editSummaries = { css: '#stdSummaries { width: 264px }', select: 'MediaWiki:Standard Edit Summary' };

window.SpoilerAlert = {
    question: 'Este artículo contiene adelantos y/o tramas de episodios aún no estrenados. ¿Desea continuar?',
    yes: 'Si, quiero continuar',
    no: 'No, gracias',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};

// TimeCircles - funcionamiento y diseño
 
var timeCrirclesDivs = document.getElementsByClassName("TimeCirclesDiv");
 
for (var i = 0; i < timeCrirclesDivs.length; i++) {
	var dateTime = timeCrirclesDivs[i].innerHTML.substring(1).split("]")[0];
 
	var width = "100%";
 
	var height = Math.round(timeCrirclesDivs[i].offsetWidth / 4) + "px";
 
	timeCrirclesDivs[i].innerHTML = '<iframe scrolling="no" src="http://spongebobia.com/ESB/TimeCircle/TimeCirclesImport.php?dateTime=' + dateTime + '" style="width:' + width + '; height:' + height + ';"></iframe>'; 
}

$("#TimeCirclesDiv").TimeCircles({
    "animation": "smooth",
    "bg_width": 1.2,
    "fg_width": 0.1,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Días",
            "color": "#FFCC66",
            "show": true
        },
        "Hours": {
            "text": "Horas",
            "color": "#99CCFF",
            "show": true
        },
        "Minutes": {
            "text": "Minutos",
            "color": "#BBFFBB",
            "show": true
        },
        "Seconds": {
            "text": "Segundos",
            "color": "#FF9999",
            "show": true
        }
    }
});

// Precaución MediaWiki by User:MaciekP42 (pl.cw-dc)
function setWikiCookie( cookie_name, data ) {
	var domain = wgServer.split("//")[1];
	document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
}
function getWikiCookie( cookie_name, pos ) {
	var x, y, cookie_array = document.cookie.split(";");
	for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
			var style_objects = y.split(", ");
			return unescape(style_objects[pos]);
		}
	}
}
var wikiCodeWarn = getWikiCookie('wikiCodeWarnCookie', 0);

$(function(){
    if (wikiCodeWarn != 1) {
        if (wgNamespaceNumber == 8) {
            var $userWelcomeBox = $.showCustomModal("¡Advertencia!", '<p>Cuidado! Está entrando a una página que contienen códigos responsables de la apariencia de Un Show Más Wiki. Si desea usarlo en su comunidad, pida autorización a un administrador! De lo contrario, puede que tenga problemas en el futuro...! (si esta página es MediaWiki:Emoticons, simplemente cierre para ver)</p>', {
            id: "userWelcomeBox",
            width: 600,
            buttons: [
            {
                id: "submit-not-show",
                defaultButton: false,
                message: "Anular",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='http://es.regularshow.wikia.com';
                }
            },
            {
                id: "submit",
                defaultButton: true,
                message: "Pedir autorización",
                handler: function() {
                   $('#userWelcomeBox').closeModal(); 
                   window.location='http://es.regularshow.wikia.com/wiki/Un_Show_Más_Wiki:Administración';
                }
            }
            ]
        });
	}
    }
});
 
function cancelWelcomeBox(){
    $('#userWelcomeBox').closeModal(); 
}
function setTheWikiCookies() {
    setWikiCookie('wikiCodeWarnCookie', wikiCodeWarn); 
}

// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        },
        threadmoderador: {
            link: 'Special:ListUsers/threadmoderador'
        },
        park: {
            link: 'Special:ListUsers'
        },
        
        
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'threadmoderador',
            'bot'
        ],
        newuser: true
    }
};

// Etiqueta Inactivo
window.InactiveUsers = { text: 'Flojeando' };

// **************************************************
// NOMBRE DEL USUARIO
// **************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:Nombreusuario]]
// Traída desde Creepypasta Wiki corregida
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// **************************************************
 
$(function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
});

// *************************************************
// Reescribir título, usada por Plantilla:Titulo (De MLP Wiki)
// *************************************************
 
$(function(){
  var newTitle = $("#title-meta").html();
  if (!newTitle) return;
  $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
});

// Refrescar automáticamente WikiActivity y CambiosRecientes
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];