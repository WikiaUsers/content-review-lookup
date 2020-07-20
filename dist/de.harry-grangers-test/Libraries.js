aviableLibraries = {
    "underscore": {
        "name": "underscore",
        "dev": "http://underscorejs.org/underscore.js",
        "production": "http://underscorejs.org/underscore-min.js"
    },
    "backbone": {
        "name": "backbone",
        "dev": "http://backbonejs.org/backbone.js",
        "production": "http://backbonejs.org/backbone-min.js"
    },
    "marionette": {
        "name": "marionette",
        "core": {
            "dev": "http://marionettejs.com/downloads/core/backbone.marionette.js",
            "production": "http://marionettejs.com/downloads/core/backbone.marionette.min.js"
        },
        "umd": {
            "dev": "http://marionettejs.com/downloads/backbone.marionette.js",
            "production": "http://marionettejs.com/downloads/backbone.marionette.min.js"
        }
    },
    "angular": {
        "name": "angular",
        "dev": "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.js",
        "production": {
            "file": "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.min.js",
            "map": "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.min.js.map"
        }
    },
    "proccessing": {
        "name": "proccessing",
        "dev": "https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.16/processing.js",
        "production": "https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.16/processing.min.js"
    },
    "moment": {
        "name": "moment",
        "dev": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.0/moment.js",
        "production": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.0/moment.min.js"
    },
    "prettydate": "http://ejohn.org/files/pretty.js"
}
 
function loadLibraries(activateLibraries) {
    console.warn('Lade Libraries...');
    var deferred = $.Deferred();
    mode = arguments[1] ? arguments[1] : 'dev';

    for(i in arguments) {
         console.log('load library "' + aviableLibraries[activateLibraries[i]].name + '"');
         $.get(aviableLibraries[activateLibraries[i]][mode]).always(function(data,textStatus,xhr) {
             if(xhr.status == 200) {
                 console.warn('Library "' + aviableLibraries[activateLibraries[i]].name + '" was successfully load');
             }
             else {
                 console.error('Library "' + aviableLibraries[activateLibraries[i]].name + '" caused an error:' + xhr.responseText);
             }
         });
    }
    deferred.resolve(true);
    //deferred.reject();
}
 
function onStart(callback) {
    deferred.done(callback);
}