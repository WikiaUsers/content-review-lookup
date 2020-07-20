// credit goes to andrewds1021
(function () {
    
    "use strict";
    if (window.categoryCSSActive) {
        console.log("CategoryCSS: Already running");
        return;
    }
    
    window.categoryCSSActive = true;
    if (typeof window.categoryCSS === undefined) {
        console.log("CategoryCSS: Map is undefined");
        return;
    }
    
    var list = window.categoryCSS;
    var list_keys = Object.keys(list); // get categories
    if (list_keys.length <= 0) return;
    
    var importCSS = [];
    var categories = mw.config.get("wgCategories");
    
    for (var index in categories) {
        var key = categories[index];
        
        var value = list[key];
        
        if (!value) {
            console.log("CategoryCSS: No match found for category " + key);
        } else {
            importCSS.push(value);
            
            console.log("CategoryCSS: Match found for category " + key);
        }
    }
    
    if (importCSS.length > 0) {
        importArticles({
            type: "style",
            articles: importCSS
        });
    } else {
        console.log("CategoryCSS: No CSS to import");
        return;
    }
})();