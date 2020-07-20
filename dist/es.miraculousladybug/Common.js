/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Hacer funcionar la plantilla {{Username}} */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Actualizar';
 AjaxRCRefreshHoverText = 'Actualiza la página automáticamente';
 ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:PáginasSinCategorizar","Especial:Todas"];
 importArticles({
    type: "script",
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:UserTags/code.js',
    ]
});

/** Desactivar comentarios en blogs viejos */
window.LockOldBlogs = {
    expiryDays: 15,
    expiryMessage: "Este blog es considerado 'archivado' porque nadie ha comentado hace <expiryDays> días."
    };

/** Desactivar la opción de edicion en temas archivados *****************
 * Desactiva la opción de edicion en temas del foro archivados para prevenir que gente nueva comente en temas viejos.
 * La página aún así puede ser editada a través de la opción de historial, o al escribir en la dirección manualmente.
 * por el usuario [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {
 
    function disableOldForumEdit() {
        if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning')) {
            return;
        }
 
        if (skin == 'oasis') {
            $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
            return;
        }
        if (!document.getElementById('ca-edit')) {
            return;
        }
        var editLink = null;
        if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
        } else {
            return;
        }
 
        editLink.removeAttribute('href', 0);
        editLink.removeAttribute('title', 0);
        editLink.style.color = 'gray';
        editLink.innerHTML = 'Archived';
 
        $('span.editsection-upper').remove();
 
    }
    addOnloadHook(disableOldForumEdit);
}

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
    var now = new Date(),
        tpm,
        then = timers[i].eventdate,
        diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    tpm = ' ';
  } else {
    tpm = ' ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' segundos';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutos ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' horas ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' días ' + left;
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


/* Spoiler Alert */
// Based on SpoilerAlert by pecoes & Gguigui1: http://dev.wikia.com/wiki/SpoilerAlert
 
/* Enables the alerts only in articles within the category "Spoiler" */
if ($.inArray("Spoiler", wgCategories) > -1) {
 
    $(function () {
        "use strict";
 
/* Alert */
        var alert =
        '<div id="spoiler-container" style="bottom: 0px; left: 0px; position: absolute; right: 0px; top: 0px; z-index: 2000000001;">' +
            '<table id="spoiler-alert" border="0" style="background-color:  rgba(255, 255, 255, 0.4); border: 4px dashed darkred;  box-shadow: 3px 3px 10px; border-radius: 20px; font-size: 13px; line-height: 22px; margin: 150px auto 0; width: 430px;">' +
                '<tbody>' +
                    '<tr>' +
                        '<td rowspan="2" style="padding: 0px;">' +
                            '<img width="70" height="82" src="https://vignette.wikia.nocookie.net/lady-bug/images/a/a7/Ladybug_Render_6.png/revision/latest?cb=20160821013259" alt="¡Cuidado, spoiler!">' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;" colspan="2"><strong style="font-weight: bold;">¡Advertencia, spoilers!</strong><br>Este artículo muestra spoilers, ¿seguro que quieres continuar?</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="yes">Si</button>' +
                        '</td>' +
                        '<td style="border-style: none; padding: 5px; text-align: center;">' +
                            '<button id="no">No</button>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>' + 
            '</table>' +
        '</div>';
 
/* Inserts the alert */
        var lastVisit = window.localStorage.getItem('spoilerCache') // Gets the timestamp of the last visit stored in the cache
        var thisVisit = Date.now(); // Returns the current time in milliseconds
        var howLong = thisVisit - lastVisit; // Checks how much time has passed since the last visit
        if (howLong > 2592000000) { // Inserts the alert if it's been more than one month since the last visit or the user has never visited the site 
            $('#WikiaMainContentContainer').before(alert);
            document.getElementById("WikiaMainContentContainer").style.filter = "blur(15px)"; // Sets a blurring of 15px
            document.getElementById("WikiaMainContentContainer").style.WebkitFilter = "blur(15px)"; // Sets blurring in Webkit browsers
            var opacity = $('#WikiaPageBackground').css('opacity'); // Saves the original value of the opacity of the background
            document.getElementById("WikiaPageBackground").style.opacity = "1"; // Temporarily disables the opacity
 
            /* Actions when clicking yes or no */
            $('#yes').click(function () {
                $('#spoiler-container').remove();
                document.getElementById("WikiaMainContentContainer").style.filter = "none"; // Removes the blurring
                document.getElementById("WikiaMainContentContainer").style.WebkitFilter = "none"; // Removes the blurring in Webkit browsers
                document.getElementById("WikiaPageBackground").style.opacity = opacity; // Restores the original opacity
                localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
            });
            $('#no').click(function () {
                $('#spoiler-alert').remove();
            });
        }
 
    });
}


/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor 
= $('.WikiaPageHeader .comments').css('border-top-color');
	var server 
= wgServer.replace("http://","");
	var html 
= '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags 
= {};
	flags['de'] 
= '<img class="de-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="Alemán">';
	flags['en'] 
= '<img class="en-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="Inglés">';
	flags['es'] 
= '<img class="es-image" style="width:20px; height:15px; border-radius:3px" src="https://vignette.wikia.nocookie.net/central/images/a/a8/Flag_ES-MX.png/revision/latest?cb=20160421140723" alt="Español">';
	flags['fr'] 
= '<img class="fr-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/fr.svg" alt="Francés">';
	flags['ja'] 
= '<img class="ja-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/jp.svg" alt="Japonés">';
    flags['ko'] 
= '<img class="ko-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/kr.svg" alt="Coreano">';
	flags['pl'] 
= '<img class="pl-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pl.svg" alt="Polaco">';
	flags['pt'] 
= '<img class="pt-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/pt.svg" alt="Portugués">';
	flags['pt-br'] 
= '<img class="pt-br-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/br.svg" alt="Portugués Brasileño">';
    flags['ro'] 
= '<img class="ro-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ro.svg" alt="Rumano">';
	flags['ru'] 
= '<img class="ru-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/ru.svg" alt="Ruso">';
 
	$('.WikiaPageHeader .comments').after(html);
 
	languages 
= {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull 
= $(this).text();
		var href 
= $(this).attr('href');
		var pageNameArray 
= href.split('/')
		var pageName 
= pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
		    case "Deutsch":
			    languages['de'] 
= href;
			    break;
			case "English":
				languages['en'] 
= href;
				break;
			case "Español":
				languages['es'] 
= href;
				break;
			case "Français":
				languages['fr'] 
= href;
				break;
			case "日本語":
				languages['ja'] 
= href;
				break;
			case "한국어":
				languages['ko'] 
= href;
				break;
				
			case "Polski":
				languages['pl'] 
= href;
				break;
			case "Português":
				languages['pt'] 
= href;
				break;
			case "Português do Brasil":
				languages['pt-br'] 
= href;
				break;
			case "Русский":
				languages['ru'] 
= href;
				break;
			case "Română":
				languages['ro'] 
= href;
				break;
		}
	});
 
	var language 
= wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key 
=== language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') 
=== false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that 
= this;
		var timeOut 
= setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
/**  END Language dropdown **/