/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Config for [[MediaWiki:Gridfiltering.js]] */
gridContainer = '#champion-grid'
gridFilters = {
    'name': 'search',
    'role': [ '- klasa -',
        [null, 'obrońcy'],
        ['inicjator', '&nbsp; inicjatorzy'],
        ['strażnik', '&nbsp; strażnicy'],
        [null, 'wojownicy'],
        ['moloch', '&nbsp; molochy'],
        ['szturmowiec', '&nbsp; szturmowcy'],
        [null, 'pogromcy'],
        ['zabójca', '&nbsp; zabójcy'],
        ['zwadźca', '&nbsp; zwadźcy'],
        [null, 'magowie'],
        ['mag eksplozywny', '&nbsp; eksplozywni'],
        ['mag bitewny', '&nbsp; bitewni'],
        ['mag dalekosiężny', '&nbsp; dalekosiężni'],
        [null, 'kreatorzy'],
        ['zaklinacz', '&nbsp; zaklinacze'],
        ['łapacz', '&nbsp; łapacze'],
        ['strzelec','strzelcy'],
        ['specjalista','specjaliści'],
    ],
    'type': [ '- typ ataku -',
        ['wręcz','walczący wręcz'],
        ['dystans','walczący z dystansu'],
    ],
}

/* Config for [[w:c:dev:PreloadFileDescription]] */
PFD_templates = [
    {
        label:   'Domyślny',
        desc:    '{'+'{Plik\n| Opis = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}\n['+'[Kategoria:Obrazy]]',
    },
    'Ikony:',
    {
        label:   'Ikona bohatera',
        desc:    '{'+'{Plik/ikona bohatera\n| Bohater = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Bohater</span>Square.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona postaci',
        desc:    '{'+'{Plik/ikona postaci\n| Postać = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Postać</span>Square.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona postaci PT',
        desc:    '{'+'{Plik/ikona postaci PT\n| Postać = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa postaci PT</span> postać TF.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona umiejętności',
        desc:    '{'+'{Plik/ikona umiejętności\n| Bohater = \n| Umiejętność = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Bohater</span>.<span class="zmienna">Umiejętność</span>.png</code>.<br />Można pominąć dwa pierwsze parametry, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona przedmiotu',
        desc:    '{'+'{Plik/ikona przedmiotu\n| Przedmiot = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa przedmiotu</span> przedmiot.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona przedmiotu PT',
        desc:    '{'+'{Plik/ikona przedmiotu PT\n| Przedmiot = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa przedmiotu PT</span> przedmiot PT.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona grupy',
        desc:    '{'+'{Plik/grupa\n| Grupa = \n| Opis = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa grupy</span>.grupa.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona pozycji',
        desc:    '{'+'{Plik/pozycja\n| Pozycja = \n| Opis = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa pozycji</span>.pozycja.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona runy',
        desc:    '{'+'{Plik/runa\n| Runa = \n| Opis = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa runy</span>.runa.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona specjalizacji',
        desc:    '{'+'{Plik/ikona specjalizacji\n| Specjalizacja = \n| Sezon = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa specjalizacji</span>.specjalizacja.s<span class="zmienna">#</span>.png</code>.<br />Można pominąć dwa pierwsze parametry, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona czaru przywoływacza',
        desc:    '{'+'{Plik/ikona czaru\n| Czar = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa czaru</span>.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Ikona efektu',
        desc:    '{'+'{Plik/ikona efektu\n| Efekt = \n| Stara = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Nazwa efektu</span>.png</code>.<br />Można pominąć pierwszy parametr, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    'Skórki:',
    {
        label:   'Obraz skórki',
        desc:    '{'+'{Plik/skórka\n| Bohater = \n| Skórka = \n| Typ = Skórka\n| Stary = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Bohater</span>.<span class="zmienna">Nazwa skórki</span>.skórka.jpg</code>.<br />Można pominąć trzy pierwsze parametry, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    {
        label:   'Portret skórki',
        desc:    '{'+'{Plik/skórka\n| Bohater = \n| Skórka = \n| Typ = Portret\n| Stary = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany pod nazwą: <code><span class="zmienna">Bohater</span>.<span class="zmienna">Nazwa skórki</span>.portret.jpg</code>.<br />Można pominąć trzy pierwsze parametry, jeśli plik ma poprawną nazwę.',
        license: 'fairuse-riot',
    },
    'Inne:',
    {
        label:   'Dubbing',
        desc:    '{'+'{Plik/dubbing\n| Postać = \n| Skórka = \n| Data = \n| Źródło = \n| Autor = \n| Inne wersje = \n}}',
        tip: 'Plik powinien być przesłany w formacie OGG pod nazwą: <code><span class="zmienna">Postać/Skórka</span>.<span class="zmienna">opis</span>.ogg</code>.',
        license: 'fairuse-riot',
    },
]
PFD_discourageEditorFileUpload = true
PFD_requireLicense = true

/* Config for [[w:c:dev:Tooltips]] */
var tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    events: ['RotationModule'],
}
var tooltips_list = [
    {
        classname: 'character-icon',
        parse: '{'+'{Tooltip/Bohater|<#character#>|<#skin#>}}',
    },
    {
        classname: 'ability-icon',
        parse: '{'+'{Tooltip/Umiejętność/<#champion#>/<#ability#>}}',
    },
    {
        classname: 'item-icon',
        parse: '{'+'{Tooltip/Przedmiot|<#item#>|<#variant#>}}',
    },
    {
        classname: 'spell-icon',
        parse: '{'+'{Tooltip/Czar/<#spell#>}}',
    },
    {
        classname: 'mastery-icon',
        parse: '{'+'{Tooltip/Specjalizacja|<#mastery#>|<#season#>}}',
    },
    {
        classname: 'effect-icon',
        parse: '{'+'{Tooltip/Efekt/<#effect#>}}',
    },
    {
        classname: 'rune-icon',
        parse: '{'+'{Tooltip/Runa|<#rune#>}}',
    },
];

/* Oznaczenie szablonów w kategoriach za pomocą {{}} */
$(function () {
    $('.ns-14 #mw-pages a[href*="/Szablon:"]').each(function() { 
        $(this).html($(this).html().replace(/^Szablon\:/, '')).before('{'+'{').after('}}')
    })
});

/* Karty w szablonie umiejętności */
mw.hook('wikipage.content').add(function(elem) {
    $(elem).find('.skill-tabs:not(.made-skill-tabs)').each(function() {
        var tabs = $(this).addClass('made-skill-tabs');
        var dts = $(this).find('> dt');
        if(dts.length === 2) tabs.addClass('toggle-tabs');
        dts.each(function(i) {
            var dt = $(this);
            if(i > 0) {
                dt.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                dt.prepend($('<span class="prev-tab">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* Stream, Strona Główna */
if($('#twitch-embed').length) {
    $.getScript('https://embed.twitch.tv/embed/v1.js', function() {
        new Twitch.Embed('twitch-embed', {
            width: '100%',
            height: '100%',
            channel: 'riotgames',
            layout: 'video',
            muted: true,
            theme: 'dark'
        });
    });
}