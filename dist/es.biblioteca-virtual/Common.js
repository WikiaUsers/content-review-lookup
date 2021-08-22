// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges,"Especial:Comunidad"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';
importScriptPage("MediaWiki:AjaxRC/code.js", "dev");

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}

	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');

	fillPreloads();
	substUsername();
	substUsernameTOC();
	rewriteTitle();

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js",
        "u:dev:MediaWiki:GlobalEditcount/code.js",
    ]
});

//Invitacion para usar discusiones
$(window).load(function() {
$('<p style="color: #fff; font-size: 15px; display: block; text-align: center; margin-top: 10px; margin-bottom: 10px;">Hola, si quieres hacer alguna pregunta sobre biografías en general o sobre libros, te invitamos a usar <a href="http://es.biblioteca-virtual.wikia.com/d/f">discusiones</a>.</p>').insertBefore('.WikiaPage .article-comments');
});



window.MessageWallUserTags = {
    users: {
        'Csuarezllosa': 'Burocrata  • Administrador',
    }
};

// Ultima edición - CONFIGURACIÓN.
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
};

// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:PáginasNuevas",
    "Especial:Seguimiento"
];

// Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Inactivo' };

// Mostrar IP de anónimos para usuarios con ciertos permisos
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
};

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Este foro se considera archivado ya que no se ha respondido en <expiryDays> días.",
};

// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
    'summary': 'mantenimiento',
    'label': 'mantenimiento'
};
fdButtons[fdButtons.length] = {
    'summary': '[[Ayuda:Vandalismo|vandalismo]]',
    'label': 'vandalismo'
};
fdButtons[fdButtons.length] = {
    'summary': '[[Ayuda:Spam|spam]]',
    'label': 'spam'
};
fdButtons[fdButtons.length] = {
    'summary': '[[:Políticas de la Biblioteca Virtual Fandom|Políticas]]',
    'label': 'Incump. artículos'
};
fdButtons[fdButtons.length] = {
    'summary': 'A petición del mismo autor',
    'label': 'a petición'
};
fdButtons[fdButtons.length] = {
    'summary': 'Duplicado',
    'label': 'duplicado'
};
fdButtons[fdButtons.length] = {
    'summary': 'Irrelevante/Innecesario',
    'label': 'irrelevante'
};
 
// NOMBREUSUARIO
$(function UserNameReplace(){
    if (wgUserName){
        var spans = getElementsByClassName(document, "span", "insertusername");
 
        for (var i = 0; i < spans.length; i++){
            spans[i].innerHTML = wgUserName;
        }
    }
});

// 7. Botones extras
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Insertar plantilla",
        "tagOpen": "\{\{",
        "tagClose": "\}\}",
        "sampleText": "Plantilla"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
        "speedTip": "Proponer el artículo para ser borrado",
        "tagOpen": "\{\{borrar|",
        "tagClose": "\}\}",
        "sampleText": "Motivo"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
        "speedTip": "Usuario",
        "tagOpen": "\{\{usuario|",
        "tagClose": "\}\}",
        "sampleText": "nombre"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_wikipedia.png",
        "speedTip": "Artículo existente en Wikipedia",
        "tagOpen": "\{\{WP|",
        "tagClose": "\}\}",
        "sampleText": "artículo"
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/17/Button_indevelopment.png",
        "speedTip": "Marcar el artículo en construcción",
        "tagOpen": "\{\{Construccion|Usuario:",
        "tagClose": "\}\}",
        "sampleText": "tu nombre de usuario"
    };
 
}
/*==================*/
/*** Tag personalizado ***/
/*==================*/
 
UserTagsJS = {
    modules: {
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ]
    }
};
 
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
UserTagsJS = {
	modules: {},
	tags: {
		Burócrata: { u:'Burócrata' }
	}
};
UserTagsJS.modules.custom = {
	'Csuarezllosa': ['Burócrata']
};
UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: false
};
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;

importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/DupImageList.js',  // Mostrar imágenes duplicadas
        'MediaWiki:Parallax.js',

        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:FastDelete/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:Standard_Edit_Summary/code.js',  // Resumenes predefinidos
        'u:dev:TopEditors/code.js',
		'u:dev:UserTags/code.js',
        'u:dev:VisualSpellCheck/code.js',       // SpellCheck en el editor visual
        'u:dev:WikiaNotification/code.js',

        'u:es.pokemon:MediaWiki:Common.js/Clases/PlantillaPlegable.js',
    ]
});

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  } 
  addOnloadHook( createNavigationBarToggleButton );