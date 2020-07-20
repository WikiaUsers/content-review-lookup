console.log('custom settings menu');
if(wgPageName == 'Spezial:Einstellungen') {
    $('ul#preftoc').append(
        $('<li />').addClass('tab-custom').append(
            $('<a />').attr({'id':'preftab-custom','href':'#mw-prefsection-custom'}).text('Wikispezifische Einstellungen')
        )
    );
    $('.jsprefs#preferences').append(
        $('<fieldset />').addClass('prefsection').attr('id','mw-prefsection-custom').html('<h1>Wikispezifische Einstellungen</h1>')
    );
    $('fieldset#mw-prefsection-custom').hide();
}
if(wgPageName == 'Spezial:Einstellungen' && location.hash == '#mw-prefsection-custom') {
    console.log('hier');
    $('fieldset#mw-prefsection-custom').siblings().hide();
    $('fieldset#mw-prefsection-custom').show();
    $('ul#preftoc li.tab-custom').siblings().removeClass('selected');
    $('ul#preftoc li.tab-custom').addClass('selected');
}