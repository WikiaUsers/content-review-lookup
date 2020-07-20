/* Fonction pour créer le formulaire de recherche, et ouvrir la page selectionné dans l'onglet actif ou un nouveau onglet */
function sidebar() {
  var $rail = $('#WikiaRail');
 
  if ($rail.length === 0) return;
 
  $('<section id="wiki-custom-search" class="module">'+
        '<h2 style="margin-bottom: 0;">'+
            '<span class="autocomplete-ui" style="float: right;">'+
                '<img src="//i.imgur.com/G4P7PER.gif" style="width: 20px; vertical-align: middle;"/>'+
            '</span>'+
            '<span class="mw-headline">Ouvrir la page d\'une unité</span>'+
        '</h2>'+
        '<div style="clear: both" id="sidebar-units-autocomplete">'+
            '<form id="redirect-to-unit-page-form">'+
                '<p style="padding-top: 5px; clear:both;">'+
                    '<input class="autocomplete-units-name" style="width:97%;">'+
                '</p>'+
                '<p style="margin-top: 5px;">'+
                    '<input title="Ouvrir dans une nouvelle page" class="autocomplete-units-name-target" id="autocomplete-units-name-target" type="checkbox" style="vertical-align: middle;">'+
                    '<label for="autocomplete-units-name-target">dans une nouvelle page</label>'+
                    '<input type="submit" value="Go !" style="float: right;">'+
                '</p>'+
            '</form>'+
        '</div>'+
    '</section>')
    .appendTo($rail);
 
    var $container = $('#wiki-custom-search');
    $container.on('submit','#redirect-to-unit-page-form',function ( event ) { 
        var unitName = $(this).find('.autocomplete-units-name').val();
        var url = '/wiki/'+encodeURIComponent(unitName);
        var target = ( $(this).find('.autocomplete-units-name-target').prop('checked') ? '_blank' : '_self' );
        var win = window.open(url,target);
        if (win) {
            win.focus();
        } else {
            alert("Merci d'autoriser ce site à ouvrir des pop-up afin d'obtenir cet fonctionalité.");
        }
        event.preventDefault();
    });
}
 
/* 
** Fonction pour
**   généré le cache à partir du modèle: Dictionnaire 
**   ou chargé le dictionnaire de recherche dans le cache
*/
Units = [];
function AutocompleteInit(){
    console.log('jQueryUI-Autocomplete: initialisation ...');
    $('.autocomplete-ui img').prop('src','//i.imgur.com/G4P7PER.gif');
 
    var autocompleteLaunched = false;
    if (localStorage && localStorage.getItem("Units")) { 
        Units = JSON.parse(localStorage.getItem("Units"));
        console.log('jQueryUI-Autocomplete: units fetched with localStorage');
        autocompleteLaunched = true;
        AutocompleteReady();
    }
    if (sessionStorage && sessionStorage.getItem("autocomplete-units-loaded") === 'true') {
        console.log('jQueryUI-Autocomplete: units already updated during session');
    } else {
        var parseUnitData = function(data) {
            var units = [];
            var code  = data.parse.text['*'];
            lines = code.split('<br />');
            lines.pop(); // last line parsed is garbage
            $.each(lines,function(k,v){
                var line = v.split('|'); 
                // first line contains a '<p>'
                if (k===0) line[0] = line[0].split('<p>')[1]; 
                units.push({label: line[0], image: line[1], rarity: line[2], type: line[3]});
 
            });
            return { units: units };
        };
        console.log('jQueryUI-Autocomplete: updating units by fetching {'+'{Dictionnaire}} ...');
        var dico    = $.getJSON('/api.php?format=json&action=parse&text={'+'{Dictionnaire}}').then(parseUnitData);
        $.when(dico)
         .then(function(dico) {
            Units = [].concat(dico.units);
            if (localStorage) { 
                localStorage.setItem("Units",JSON.stringify(Units));
            }
            if (sessionStorage) {
                sessionStorage.setItem("autocomplete-units-loaded",true);
            }
            if (!autocompleteLaunched) {
                AutocompleteReady();
            }
        });
    }
}

/*
** Cette fonction a pour but d'avertir l'utilisateur quand le module de recherche est près en changeant l'image G4P7PER.gif (une petite carriole de chargement) par QK78lTQ.png (un 'V' signe de validation).
** Puis elle l'apelle la fonction d'autocompletion.
*/
function AutocompleteReady() {
    $('.autocomplete-ui img').prop('src','//i.imgur.com/QK78lTQ.png');
    Autocomplete($('#WikiaRail'));
}
 
/*
** Fonction pour recherché les pages correspondant a la recherche
** Cette autocompletion demande un minimum de 3 charactère. Les premieres et derniers espace d'une chaine de charactères sont ne sont pas compté.
** L'autocompletion permets une recherche avancé avec 3 paramètre. Le nom, la rareté et le type du personnage.
** Les résultat de recherche sont affiché avec leur miniature juste a coté afin d'être sur de trouver le personnage recherché.
** Cette fonction prends en paramètre le l'élément html auquelles sera greffé le module d'autocompletion.
*/
function Autocomplete( container ) {
    var accentMap = {
        "À": "A", "Â": "A", "É": "E", "È": "E", "Ê": "E", "Ë": "E",
        "Ï": "I", "Î": "I", "Ô": "O", "Ö": "O", "Û": "U", "Ù": "U",
        "Ü": "U", "Æ": "AE", "Œ": "OE", 
        "à": "a", "â": "a", "é": "e", "è": "e", "ê": "e", "ë": "e",
        "ï": "i", "î": "i", "ô": "o", "ö": "o", "û": "u", "ù": "u",
        "ü": "u", "æ": "ae", "œ": "oe",
    };
    var normalize = function( term ) {
      var res = "";
      for ( var i = 0; i < term.length; i++ ) {
        res += accentMap[ term.charAt(i) ] || term.charAt(i);
      }
      return res;
    };
 
    var source = function(list) {
        return function( request, response ) {
 
            rarity = $container.find("select#autocomplete-units-rarity").val();
            type = $container.find("select#autocomplete-units-type").val();
            expr = request.term.trim();
            if (expr.length < 3) {
                return [];
            }
            JSON.stringify ( expr );
            exprs = expr.split(" ");
 
            var responses = list;
            var matcher;
 
            exprs.forEach( function ( element) {
                var matcher = new RegExp ( $.ui.autocomplete.escapeRegex( element ), "i");
                responses = $.grep( responses, function ( value ) {
                    value = value.lbal || value.label || value;
                    return ( matcher.test ( value) || matcher.test (normalize (value) ));
                });
            });
 
            if (rarity) {
                matcher = new RegExp ( rarity, "gi");
                responses = $.grep( responses, function ( value ) {
                    value = value.lbal || value.rarity || value;
                    return ( matcher.test ( value ));
                });
            }
 
            if (type) {
                matcher = new RegExp ( type, "gi");
                responses = $.grep( responses, function ( value ) {
                    value = value.lbal || value.type || value;
                    return (matcher.test (value));
                });
            }
 
            response( responses );
        };
    };
    
    var $container = $(container);
    if ($container.length === 0) return;
    
    $container.find("input.autocomplete-units-name").autocomplete({
        source: source(Units),
        minLength: 3
     })
    .data('uiAutocomplete')._renderItem = function( ul, item ) 
       {
         return $( '<li class="autocomplete-result">' )
         .append( 
            '<a>' + 
                '<span>' + 
                    item.label +
                '</span>' +
            "</a>"
             )
         .appendTo( ul );
       };
}
 
/* Fonction pour lancé le module d'autocompletion qui a besoin de jquery */
$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js')
.done(function( data, textStatus, jqxhr ) {
    AutocompleteInit();
});

/* Fonction pour exécuter d'autre script après chargement de la page. */
$(function(){
    sidebar();
});