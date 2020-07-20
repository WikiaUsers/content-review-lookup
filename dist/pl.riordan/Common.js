/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// InactiveUsers
    window.InactiveUsers = {
        text: {
            unknown: 'Dusza na łąkach asfodelowych',
            female: 'Dusza na łąkach asfodelowych'
        }
    };

///Skrypt na nazwę użytkownika
if (wgUserName != null/* && span.insertusername != undefined*/) {
 $(".insertusername").html(wgUserName);
};
 
 importArticles({
     type: 'script',
     articles: [
         // ...
         'u:kocka:MediaWiki:Emoticons/code.js',
         // ...
     ]
 });

/* Ostrzeżenie o braku licencji */
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
    if(window.emptyLicenseWarningDelivered) return true;
    if($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
        $(elem).attr('title',$(elem).attr('alt'));
    });
    $(".wikia-gallery-item .image").each(function(i,elem) {
        $(elem).attr('title',$(elem).attr('alt'));
});




        // Add Discord widget code from the English Bloodborne Wiki
        // WidgetBot: https://github.com/widgetbot-io/widgetbot
        // Crate: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
        ;(function () {
            var regex = /"(\w+)":/g;
 
            var crateOptions = {
                channel: '401122331222605868',
                server: '401122331222605865',
                shard: 'https://e.widgetbot.io',
                color: '#1a202c',
                location: ['bottom', 'right']
            };
 
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
            var popupData = {
                content: 'Chcesz porozmawiać z innymi herosami? Zapraszamy na nasz server discord!',
                timeout: 10000,
                avatar: 'https://vignette.wikia.nocookie.net/polskapersopedia/images/a/a5/PJ_IKONKA_DLA_DYNO_NA_DSC.png/revision/latest?cb=20200423122358&path-prefix=pl'
            };
 
            var popup = JSON.stringify(popupData, null, 4);
            popup = popup.replace(regex, '$1:');
 
            var script = document.createElement('script');
            script.setAttribute('id', 'WidgetCrate');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            script.textContent = 'var crate = new Crate(' + options + ');\n\n';
            script.textContent += 'crate.notify(' + popup + ')';
 
            DOMTools.appendTo(document.head, script);
        })();