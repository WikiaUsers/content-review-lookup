// [bild, page-name/class]
var ostereier = [[
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/2/26/Farbenfroher_Sturzfl%C3%BCgler.png/revision/latest?cb=20150429135609&path-prefix=de",
        "Farbenfroher_Sturzflügler" // start page -> insert image in next element
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/b/ba/Todsinger_Ei_Serie_-_NBG.png/revision/latest?cb=20180317182343&path-prefix=de",
        "Todsinger_Spezies"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/9/90/%C3%9Cberwildatem_Ei_AvB_-_NBG.png/revision/latest?cb=20181230120622&path-prefix=de",
        "Kältegronckel"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/7/79/Gro%C3%9Fer_%C3%9Cberwilder_Ei_Serie_-_NBG.png/revision/latest?cb=20180317182212&path-prefix=de",
        "Großer_Überwilder"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/f/f3/Klingenpeitschling_Ei_SoD_NBG.png/revision/latest?cb=20170410094020&path-prefix=de",
        "Klingenpeitschling"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/f/fc/Knospenbeißer_Ei_AvB_-_NBG.png/revision/latest?cb=20180930084929&path-prefix=de",
        "Krallenkrabbler"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/8/86/S%C3%A4belzahnknirscher_Ei_SoD_-_NBG.png/revision/latest?cb=20180908134911&path-prefix=de",
        "Säbelzahnknirscher"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/8/89/Krawall_Ei_AvB_-_NBG.png/revision/latest?cb=20180907185906&path-prefix=de",
        "Donnerklaue"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/2/2f/Feuerschrapper_Ei_AvB_-_NBG.png/revision/latest?cb=20180826143047&path-prefix=de",
        "Riesenhafter_Alptraum_Filmuniversum"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/0/02/Keule_Ei_AvB_-_NBG.png/revision/latest?cb=20181008152951&path-prefix=de",
        "Rüstungsflügler"
    ], [
        "https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/0/05/Wechselfl%C3%BCgler_Ei_Serie_-_NBG.png/revision/latest?cb=20180317182412&path-prefix=de",
        "Wechselflügler" // last eg (no egg on this page)
    ]];

var positions = [".wds-community-header__local-navigation", ".page-header", ".activity-module", 
".page-header__contribution", ".article-categories"];

function addEier () {
    console.log('Eier wurden hinzugefügt!');
    var id = setInterval(function() {
        if ($('[class*="page"]').length > 0) {
            clearInterval(id);
            for (var i = 0, j = 0; i < ostereier.length - 1; i++, j++) {
                if (j === positions.length) 
                    j = 0;
                if ($(".page-" + ostereier[i][1]).length > 0)
                    addEi(".page-" + ostereier[i][1] + " " + positions[j], ostereier[i + 1][0]);
            }
        }
    }, 10);
}



window.onload = function() {addEier();};
    
function addEi (position, bild) {
    var id = setInterval(function() {
        if ($(position).length > 0) {
            console.log('Ei wurde hinzugefügt')
            $(position).append('<div class="osterei" style="background-image: url(' + bild + ')"></div>');
            clearInterval(id);
        }
    }, 10);
}