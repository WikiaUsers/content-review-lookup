window.UserTagsJS = {
	modules: {},
	tags: {
		hello: {u: 'No Gender Set' } ,
		Rédacteur_de_commentaire: { u:'Rédacteur de commentaire'},
		Rédacteur_de_contenu: { u:'Rédacteur de contenu'},
        Graphiste: { u:'Graphiste'},
        Quality_checker: { u:'Quality checker'},
        Agent_technique: { u:'Agent technique'},
        Gérant_du_discord: { u:'Gérant du discord'},
	}
};

UserTagsJS.modules.custom = {
	'Ykoren': ['Rédacteur_de_commentaire'],
	'Genkay2': ['Rédacteur_de_contenu'],
	'Iiiik "King Escafag"': ['Graphiste' , 'Gérant_du_discord'],
	'Shiva Garland': ['Agent_technique'],
	'TwisteR Bl4cK' : ['Agent_technique'],
};
//// Configuration for Tooltip
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};
var updateScrollIntervals = [];
var tooltips_list = [
    {
        classname: 'js-tooltip-unit',
        parse: '{'+'{Tooltip/Unit|<#id#>}}',
        onParsed: function() { EnhanceMarquee($(this)); },
        onShow:   function() { EnhanceMarquee($(this)); },
        onHide:   function() { while (updateScrollIntervals.length !== 0) { clearInterval(updateScrollIntervals.pop()) } }
    },
    {
        classname: 'js-tooltip-item',
        parse: '{'+'{Tooltip/Item|<#name#>}}',
    },
]


/* Configuration de l'extension AjaxRC.js */
AjaxRCRefreshText = 'Actualisation automatique';
AjaxRCRefreshHoverText = 'Actualisation automatique de la page';
ajaxSpecialPages = ["WikiActivity","Recentchanges"];

/* Fonction pour générer l'élément contenant l'horloge sur toutes les pages. */
function initClock() {
  var $rail = $('#WikiaRail');
  
  if ($rail.length === 0) return;
  
  $('<section id="wiki-custom" class="module">' +
        '<div class="clock" style="float: left;">'+
            '<b>Paris</b> <br/>' +
            '<span id="clockUTC" style="font-size:20px;">' + 
            '</span>'+
        '</div>' +
        '<div class="clock" style="float: right;">' +
            '<b>Martinique</b> <br/>' +
            '<span id="clockAST" style="font-size:20px;">' + 
            '</span>'+
        '</div>' +
        '<div style="clear: both"></div>' +
    '</section>')
  .appendTo($rail);
  
  setInterval( function () {
        clock();
        }, 1000
    );
}

/* Fonction pour généré l'heure dans un element possédant l'ID: Clock. */
function clock()
{
        date = new Date().toLocaleString('fr', { timeZone: 'Europe/Paris' });
        arrayDate = date.split(" à ");
        document.getElementById("clockUTC").innerHTML = arrayDate[1] + '<br/>' + arrayDate[0];
        
        dateAST = new Date().toLocaleString('fr', { timeZone: 'America/Martinique' });
        arrayDateAST = dateAST.split(" à ");
        document.getElementById("clockAST").innerHTML = arrayDateAST[1] + '<br/>' + arrayDateAST[0];
        
        return true;
}

/* Fonction pour exécuter d'autre script après chargement de la page. */
$(function(){
   initClock();
});



/* loading modules (with auto initialisation) */

/* Replaces {{Username}} with the name of the user browsing the page.
   Requires copying Template:Username. */
function UserNameReplace($container) {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $container.find("span.insertusername").html(wgUserName);
}
/* End of the {{Username}} replacement */


// modules without dependencies
PurgeButtonText = 'Actualiser';

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips.js',
        'u:dev:OggPlayer.js',
        'u:dev:YoutubePlayer/code.js',
        'u:dev:DiscordIntegrator/code.js',
        'u:dev:WikiaNotification/code.js',
        'u:dev:PurgeButton/code.js',
    ]
});

//// Sidebar
function Sidebar () {
    var $rail = $('#WikiaRail');
    if ($rail.length === 0) return;
    
    $('<section id="frwikiabf-activities" class="module">'+
        '<h2 style="margin-bottom: 0;">'+
            '<span class="autocomplete-ui" style="float: right;">'+
                '<img src="//i.imgur.com/G4P7PER.gif" style="width: 20px; vertical-align: middle;"/>'+
            '</span>'+
            '<span class="mw-headline">Ouvrir la page d\'une unité</span>'+
        '</h2>'+
        '<div id="sidebar-units-autocomplete">'+
            '<form id="redirect-to-unit-page-form">'+
                '<p>'+
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
    
    var $container = $('#frwikiabf-activities');
    $container.on('submit','#redirect-to-unit-page-form',function ( event ) { 
        var unitName = $(this).find('.autocomplete-units-name').val();
        var url = '/wiki/'+encodeURIComponent(unitName);
        var target = ( $(this).find('.autocomplete-units-name-target').prop('checked') ? '_blank' : '_self' );
        var win = window.open(url,target);
        if (win) {
            // Browser has allowed it to be opened
            win.focus();
        } else {
            // Broswer has blocked it
            alert("Merci d'autoriser ce site à ouvrir des pop-up afin d'obtenir cet fonctionalité.");
        }
        event.preventDefault();
    });
}
//*/

//// Autocompletion 
UnitsIDs   = [];
UnitsNames = [];
function AutocompleteInit(){
    console.log('jQueryUI-Autocomplete: initialisation ...');
    $('.autocomplete-ui img').prop('src','//i.imgur.com/G4P7PER.gif')
    
    var autocompleteLaunched = false;
    if (localStorage) { 
        UnitsIDs   = JSON.parse(localStorage.getItem("UnitsIDs"));
        UnitsNames = JSON.parse(localStorage.getItem("UnitsNames"));
        console.log('jQueryUI-Autocomplete: units fetched with localStorage');
        autocompleteLaunched = true;
        AutocompleteReady();
    }
    if (sessionStorage && sessionStorage.getItem("autocomplete-units-loaded") === 'true') {
        console.log('jQueryUI-Autocomplete: units already updated during session');
    } else {
        var parseUnitData = function(data) {
            var names = [];
            var ids   = [];
            var code  = data.parse.text['*'];
            lines = code.split('<br />');
            lines.pop(); // last line parsed is garbage
            $.each(lines,function(k,v){
                // line = stars | ID | name
                var line = v.split('|'); 
                // first line contains a '<p>'
                if (k===0) line[0] = line[0].split('<p>')[1]; 
                var rarity = (isNaN(parseInt(line[0])) ? 'Omni' : parseInt(line[0])+'★');
                ids  .push({value:parseInt(line[1]),label:'('+rarity+') '+line[2]})
                names.push({value:line[2],label:'('+rarity+') '+line[2]}); 
            });
            return { ids: ids, names: names };
        }
        console.log('jQueryUI-Autocomplete: updating units by fetching {'+'{UnitsRefExe}} ...');
        var promiseFire    = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Feu}}').then(parseUnitData);
        var promiseWater   = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Eau}}').then(parseUnitData);
        var promiseEarth   = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Terre}}').then(parseUnitData);
        var promiseThunder = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Foudre}}').then(parseUnitData);
        var promiseLight   = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Lumière}}').then(parseUnitData);
        var promiseDark    = $.getJSON('/api.php?format=json&action=parse&text={'+'{UnitsRefExe/Ténèbres}}').then(parseUnitData);
        $.when(promiseFire,promiseWater,promiseEarth,promiseThunder,promiseLight,promiseDark)
         .then(function(fire,water,earth,thunder,light,dark) {
            UnitsIDs   = [].concat(fire.ids).concat(water.ids).concat(earth.ids).concat(thunder.ids).concat(light.ids).concat(dark.ids);
            UnitsNames = [].concat(fire.names).concat(water.names).concat(earth.names).concat(thunder.names).concat(light.names).concat(dark.names);
            // store values
            if (localStorage) { 
                localStorage.setItem("UnitsIDs"  ,JSON.stringify(UnitsIDs)); 
                localStorage.setItem("UnitsNames",JSON.stringify(UnitsNames));
                console.log('jQueryUI-Autocomplete: units saved to localStorage');
            }
            // don't update anymore (just one time during a session)
            if (sessionStorage) {
                sessionStorage.setItem("autocomplete-units-loaded",true);
            }
            if (!autocompleteLaunched) {
                AutocompleteReady();
            }
        });
    }
}
function AutocompleteReady() {
    console.log('jQueryUI-Autocomplete: autocomplete ready');
    $('.autocomplete-ui img').prop('src','//i.imgur.com/QK78lTQ.png');
    Autocomplete($('#WikiaRail'));
}
function Autocomplete(container) {
    // http://stackoverflow.com/questions/15117106/jquery-autocomplete-to-accept-matches-with-speacial-characters
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
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex( request.term ), "i" );
            var responses = $.grep( list, function( value ) {
              value = value.label || value.value || value;
              return matcher.test( value ) || matcher.test( normalize( value ) );
            });
            response( responses );
        }
    }
    var $container = $(container);
    $container.find("input.autocomplete-units-id").autocomplete({ source: source(UnitsIDs) });
    $container.find("input.autocomplete-units-name").autocomplete({ source: source(UnitsNames) });
}
// highest version compatible with wikia jquery 1.8.2
$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js')
.done(function( data, textStatus, jqxhr ) {
    // plugins depending on jQueryUI
    AutocompleteInit();
});
//*/

function InsertIframe($container) {
    $container.find('.insert-iframe').each(function(){
        var $this = $(this);
        $this.append(
            $('<iframe>')
                .attr('src', $this.data('iframe-url'))
                .css('position', 'absolute')
                .css('left',   $this.data('iframe-left'))
                .css('top',    $this.data('iframe-top'))
                .css('width',  $this.data('iframe-width'))
                .css('height', $this.data('iframe-height'))
        );
    });
}

// used to insert content that should not appear on mobile
function InsertTemplate($container) {
    $container.find('.js-insert-template:not(.js-insert-loaded)').each(function(){
        var $this = $(this); 
        var template = $this.data('insert-template');
        var type = $this.data('insert-type');
        if ($.inArray(type, ['html','text','append','prepend']) === -1) {
            type = 'append';
        }
        
        // list of params are passed via data-insert-parameters="name,1,2"
        var parameters_data = '' + $this.data('insert-parameters');
        var parameters_list = parameters_data.split(',');
        var parameters_hash = {};
        var parameters_str  = '';
        var i;
        
        // get all parameters value into a hash { param_name => param_value }
        for (i = 0; i < parameters_list.length; i++) {
            var name  = parameters_list[i];
            var value = $this.data('insert-parameter-' + name);
            if (typeof value !== 'undefined') {
                parameters_hash[name] = value;
            } else {
                console.error('InsertTemplate: parameter ' + name + ' not found')
            }
            
        }
        // convert all unnamed params into string
        i = 1;
        while(typeof parameters_hash[i] !== 'undefined') {
            parameters_str += '|' + parameters_hash[i];
            delete parameters_hash[i];
            i++;
        }
        // convert all named params into string
        for (var prop in parameters_hash) {
          if( parameters_hash.hasOwnProperty( prop ) ) {
            parameters_str += '|' + prop + '=' + parameters_hash[prop];
          } 
        }
       
        // retrieve template for insertion
        $.getJSON('/api.php?format=json&action=parse&text={'+'{'+template+parameters_str+'}}', function(data) {
            var html = data.parse.text['*'];
            $this[type](html);
            $this.find('.js-collapsible-collapsed').hide();
            $this.addClass('js-insert-loaded');
        });
    });
}

/** 
 * used to collapse/expand elements
 * better API than mw-customtoggle
 **/ 
function EnableCollapsible($container) {
    $container.find('.js-collapsible-collapsed').hide();
    $container.on('click','.js-collapsible-trigger',function(e){
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        var showing = $this.data('collapsible-show');
        if (typeof showing !== 'undefined') { $(showing).show(); }
        var hidding = $this.data('collapsible-hide');
        if (typeof hidding !== 'undefined') { $(hidding).hide(); }
        var toggling = $this.data('collapsible-toggle');
        if (typeof toggling !== 'undefined') { $(toggling).toggle(); }
        var collapsing = $this.data('collapsible-collapse');
        if (typeof collapsing !== 'undefined') { $(collapsing).hide('slow'); }
        var expanding = $this.data('collapsible-expand');
        if (typeof expanding !== 'undefined') { $(expanding).show('slow'); }
        var slowToggling = $this.data('collapsible-toggle-slow');
        if (typeof slowToggling !== 'undefined') { $(slowToggling).toggle('slow'); }
    });
}

function EnhanceMarquee($container) {
    // marquee behavior done only with CSS
    $container.find('.marquee-scroller').each(function(){
        var $el = $(this);
        // this should only be text, no html, no wiki markup, so we need to parse it
        var tmp = $el.data('text');
        // delete images like [[Fichier:icone multi.png|17px|link=]]
        tmp = tmp.replace(/\[\[(?:File|Fichier)(.+?)\]\]/g, '');
        // replace "[[link|text]]" by "text"
        tmp = tmp.replace(/\[\[(.+?)\|(.+?)\]\]/g, '$2');
        // replace "[[text]]" by "text"
        tmp = tmp.replace(/\[\[(.+?)\]\]/g, '$1');
        // replace "'''text'''" by "text"
        tmp = tmp.replace(/'''(.+?)'''/g, '$1');
        // replace "''text''" by "text"
        tmp = tmp.replace(/''(.+?)''/g, '$1');
        $el.attr('data-text', tmp);
        // var $container = $(this).parent();
        // var $ctrl = $el.find('.marquee-scroller-ctrl');
        // var duration = parseInt($ctrl.css('animationDuration'));
        // var duration = ($el.width() + $container.width()) / $container.width() * duration;
        // $ctrl.css('animationDuration', duration + 's')
    });
    // marquee behavior done only with this JS
    $container.find('.tooltip-unit-skill-desc-buffs').each(function(){
        var $parent = $(this);
        var $child = $parent.find('.list-with-icons');
        if ($child.length === 0) { return }
        var widthParent = $parent.width();
        var widthChild  = $child.width();
        if (widthChild <= widthParent) { return }
        var scroll = 0;
        var scrollDelay;
        var scrollDir = 'right';
        var deltaTime = 50;
        var waitingTime = 1000;
        function updateScroll() {
            switch(scrollDir) {
                case 'right':
                    if (widthParent + scroll === widthChild) {
                        scrollDelay = waitingTime
                        scrollDir = 'waiting'
                    } else {
                       scroll += 1
                       $child.css('margin-left', - scroll + 'px')
                    }
                    break;
                case 'waiting':
                    if (scrollDelay === 0) {
                        scrollDir = scroll === 0 ? 'right' : 'left'
                    } else {
                        scrollDelay -= deltaTime
                    }
                    break;
                case 'left': 
                    if (scroll === 0) {
                        scrollDelay = waitingTime
                        scrollDir = 'waiting'
                    } else {
                       scroll -= 1 
                       $child.css('margin-left', - scroll + 'px')
                    }
                    break;
            }
        }
        updateScrollIntervals.push(setInterval(updateScroll, deltaTime))
    });
}

function addClassToInfoboxes($container) {
    $container.find('.item-container-left').closest('#WikiaArticle').addClass('item-page');
}

function addHook(elem) {
    var $container = $(elem);
    EnableCollapsible($container);
    InsertTemplate($container);
    UserNameReplace($container);
    InsertIframe($container);
    EnhanceMarquee($container);
    addClassToInfoboxes($container);
}

// functions to launch on startup
$(function(){
    Sidebar();
    mw.hook('wikipage.content').add(addHook);
});