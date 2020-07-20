// =====================================
//              Imports
// =====================================
 
// Veure MediaWiki:ImportJS

// Ajax Auto-Refrescar
AjaxRCRefreshText = 'Refrescar';
AjaxRCRefreshHoverText = 'Refresca automàticament la pàgina';
ajaxPages = ["Especial:Canvis_recents","Especial:WikiActivity", "Especial:Pàgines_noves", "Especial:Images"];

// InactiveUsers: Etiqueta per inactius 
InactiveUsers = { text: 'Inactiu' };

// Etiqueta amb el flag
    (function () {
        "use strict";
        var userRightsList = {
            "BroOkBot": ["Bot"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());

// WAM
window.railWAM = {
    logPage:"Project:WAM Log"
};

// ======================================
// Botons addicionals a la caixa d'edició
// ======================================
 
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Codi font",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Codi font"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Plantilles",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enllaç a usuari",
     "tagOpen": "[[user:",
     "tagClose": "|]]",
     "sampleText": "Usuari"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/6/64/Bot%C3%B3n_categor%C3%ADa.png",
     "speedTip": "Categoria",
     "tagOpen": "[[Category:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nom de la categoria"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162729/es.gta/images/c/c2/Enobras.png",
     "speedTip": "Advertir que s'està editant l'article",
     "tagOpen": "{{Article_sense_acabar|",
     "tagClose": "}}",
     "sampleText": "Nom d'usuari"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_broom2.png",
     "speedTip": "Article amb plantilla incorrecte",
     "tagOpen": "{{Plantilla_Incorrecte}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20111227131921/onepiece-cat/ca/images/3/33/Article_incomplet.png",
     "speedTip": "Indicar l'article com a Esbós",
     "tagOpen": "{{Esbós}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/brookproves/ca/images/thumb/e/ec/Obres.jpg/50px-Obres.jpg",
     "speedTip": "Indicar l'article com a Article Incomplet",
     "tagOpen": "{{Article_Incomplet}}",
     "tagClose": "",
     "sampleText": ""};
 }

// ==================================================
//          Resums d'edició personalitzats
// ==================================================
 
// Editor font
 
$(function() {
    var $label = "";
    if (skin == 'oasis') {
        $label = $('#edit_enhancements_toolbar #wpSummaryLabel');
        if (!$label.size()) { return; }
    }
 
    if (skin == 'monobook') {
        $label = $('.editOptions #wpSummaryLabel');
        if (!$label.size()) { return; }
    }
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val !== '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
    $label.prepend('<br />').prepend($combo).prepend('Summaries: ');
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
});
 
// Editor Visual

 
$(function() {
	var $label = $('.module_content #wpSummaryLabel');
	if (!$label.size()) {
		return;
	}
 
	$combo = $('<select />').attr('id', 'stdSummaries').change(function() {
		var val = $(this).val();
		if (val !== '') {
			$('#wpSummaryEnhanced,#wpSummary').val(val);
		}
	});
 
	$label.after($combo);
 
	$.ajax({
		'dataType': 'text',
		'data': {
			'title': 'Template:Stdsummaries',
			'action': 'raw',
			'ctype': 'text/plain'
		},
		'url': wgScript,
		'success': function(data) {
			var lines = data.split("\n");
			for (var i in lines) {
				var val = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
				var text = (lines[i].indexOf('-- ') === 0) ? '&nbsp;&nbsp;' + lines[i].substring(3) : lines[i];
				var disable = (lines[i].indexOf('-- ') === 0 || lines[i].indexOf('(') === 0) ? '' : 'disabled';
				var $opt = '<option value="' + val + '" ' + disable + '>' + text + '</option>';
				$combo.append($opt);
			}
		}
	});
	$('.module_content #wpSummary').css({"margin-bottom": '8px'});
	$('.module_content #stdSummaries').css({"width": '258px'});
	$('.module_content #stdSummaries').css({"margin-bottom": '5px'});
});
 
// ==================================================
//              Countdown Timer (by Splarka)
//                  Versió 0.0.3 
// ==================================================
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date(),
        then = timers[i].eventdate,
        diff = count = Math.floor((then.getTime() - now.getTime()) / 1000),
        tpm;

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        tpm = '';
    } else {
        tpm = '';
    }

    // calcuate the diff
    var left = (diff % 60) + ' segons';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minuts ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hores ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' dies ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

// ==================================================
//              Mostra el nom d'usuari
//          per a [[Plantilla:Nom usuari]] 
// ==================================================
 
$(function UserNameReplace(){
    if (wgUserName){
        var spans = getElementsByClassName(document, "span", "insertusername");
        for (var i = 0; i < spans.length; i++){
            spans[i].innerHTML = wgUserName;
        }
    }
});

// ==================================================
//   Slider de la [[Portada]] by User:Tierrie
// ==================================================

mw.loader.using(['jquery.ui.tabs'], function () {
    $(function () {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function () { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function () {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function () { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

// ===============================
//  Càrrega de fitxers
//  [[Especial:Carrega]]
// ===============================
// Afegeix una descripció predeterminada durant la càrrega de fitxers
$(function preloadUploadDesc() {
    if ( wgCanonicalSpecialPageName != 'Upload' || $.getUrlVar('wpForReUpload') ) { return; }
 
    if ($('#wpUploadDescription').length) {
        $('#wpUploadDescription').append('== Llicència ==\n' +
            '{{Fairuse'         +
            '}}');
    }
});