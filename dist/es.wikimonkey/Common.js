importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/switch.js",
        "u:dev:WikiaNotification/code.js",
        'MediaWiki:Common.js/Clases/UtilityTools.js',
        'MediaWiki:Common.js/Clases/PlantillaPlegable.js'
    ]
});

var $UT = UtilityTools;

if (!window.$G){
    window.$G = $UT.get;
}

// Cuantas plantillas plegables se muestran desplegadas, como m�ximo. Si se alcanza el l�mite se pliegan todas.

var MaxDesplegadas = 2;

$(function() {
    var plegables = [],
        nDesplegadas = 0,
        cnPlegables = [],
        tp,
        bc = $UT.get('bodyContent');

    if (window.PlantillaPlegable && !window.disablePlantillaPlegable) {
        cnPlegables = $UT.getElementsByClassName('plegable', 'table', bc);
        for (var i = 0; i < cnPlegables.length; i++) {
            var t = cnPlegables[i];
            if ($UT.hasClass(t, 'plegable-plegada')) {
                tp = new PlantillaPlegable(t, true);
            } else {
                tp = new PlantillaPlegable(t);
                if (!$UT.hasClass(t, 'plegable-desplegada')) {
                    plegables[plegables.length] = tp;
                }
                nDesplegadas++;
            }
        }

		if (MaxDesplegadas != -1 && nDesplegadas > MaxDesplegadas) {
            for (var i = 0; i < plegables.length; i++) {
                plegables[i].cambiarEstado(true);
            }
        }
    }
});