//// Autocompletion 
Units = [];
UnitsLabels = [];
function RedirectEvent ($container) {
    return function ( event, ui ) { 
        var url = '/wiki/'+encodeURIComponent(ui.item.label);
        var target = ( $container.find('.autocomplete-units-link-target').prop('checked') ? '_blank' : '_self' );
        var win = window.open(url,target);
        if (win) {
            // Browser has allowed it to be opened
            win.focus();
        } else {
            // Broswer has blocked it
            alert("Merci d'autoriser ce site à ouvrir des pop-up afin d'obtenir cet fonctionalité.");
        }
    }
}
function AutocompleteInit(){
    console.log('jQueryUI-Autocomplete: initialisation ...');
    $('.autocomplete-ui img').prop('src','//i.imgur.com/G4P7PER.gif')
    
    if (sessionStorage) { 
        Units = JSON.parse(sessionStorage.getItem("Units"));
        UnitsLabels = JSON.parse(sessionStorage.getItem("UnitsLabels"));
    }
    if (Units && UnitsLabels) {
        console.log('jQueryUI-Autocomplete: Units retrieved from sessionStorage');
        AutocompleteReady(Units);
    } else {
        console.log('jQueryUI-Autocomplete: fetching {{RéférencesUnités}} ...');
        Units = [];
        UnitsLabels = [];
        $.getJSON('/api.php?format=json&action=parse&text={{:RéférencesUnités}}', function(data) {
            var code = data.parse.text['*'];
            lines = code.split(' <br />');
            $.each(lines,function(k,v){
                var line = v.split(' &#160; = &#160; ');
                // only labels
                UnitsLabels.push(line[1]); 
                // ID + labels : { value: ID , label: label }
                if (k===0) line[0] = line[0].split('<p>')[1]; // first line contains a '<p>'
                Units.push({value:parseInt(line[0]),label:line[1]})
            });
            // last line parsed is garbage
            Units.pop(); 
            UnitsLabels.pop();
            // store values
            if (sessionStorage) { 
                sessionStorage.setItem("Units",JSON.stringify(Units)); 
                sessionStorage.setItem("UnitsLabels",JSON.stringify(UnitsLabels));
                console.log('jQueryUI-Autocomplete: Units saved to sessionStorage');
            }
            AutocompleteReady();
        });
    }
}
function AutocompleteReady() {
    console.log('jQueryUI-Autocomplete: autocomplete ready');
    $('.autocomplete-ui img').prop('src','//i.imgur.com/QK78lTQ.png');
    Autocomplete();
}
function Autocomplete() { 
    $("input.autocomplete-units-id").autocomplete({ source: Units });
    $("input.autocomplete-units-name").autocomplete({ source: UnitsLabels });
    $("input.autocomplete-units-redirect").autocomplete({
        source: UnitsLabels,
        select: function( event, ui ) { 
            window.location = '/wiki/'+encodeURIComponent(ui.item.label); 
        }
    });
    var $container = $('.autocomplete-units');
    $container.find("input.autocomplete-units-link").autocomplete({
        source: UnitsLabels,
        select: RedirectEvent($container)
    });
    var $container = $('#sidebar-units-autocomplete')
    $container.find("input.autocomplete-units-link").autocomplete({
        source: UnitsLabels,
        select: RedirectEvent($container)
    });
}
//*/

// highest version compatible with wikia jquery 1.8.2
$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js')
.done(function( data, textStatus, jqxhr ) {
    // plugins depending on jQueryUI
    AutocompleteInit();
});