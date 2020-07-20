(function(mw, $){
    var Fandom = $.extend({}, window.Fandom);
    Fandom.getWikiFeaturesObject = function(){
        return new Promise(function(resolve, reject){
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/wikia.php',
                data: {
                    'controller': 'WikiFeaturesSpecialController',
                    'method': 'index',
                    'format': 'json'
                },
                success: function(data){
                    if (!data.error){
                        var features = data.features;
                        resolve(features);
                    } else { reject(data.error); }
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    };
    Fandom.WikiFeatures = $.extend({}, Fandom.WikiFeatures);
    Fandom.getWikiFeaturesObject().then(function(features){
        for (var i = 0; i < features.length; i++){
            var feature = features[i],
                name = feature.name,
                enabled = feature.enabled;
            Fandom.WikiFeatures[name] = {
                enabled: enabled
            };
        }
    });
    Fandom.wikiFeatureInterval = function(){
        var interval = setInterval(function(){
            var keys = Object.keys(Fandom.WikiFeatures);
            if (keys.length > 0){
                mw.hook('Fandom.dev').fire(Fandom);
                clearInterval(interval);
            }
        }, 500);
    };
    $(Fandom.wikiFeatureInterval);
}(this.mediaWiki, this.jQuery));