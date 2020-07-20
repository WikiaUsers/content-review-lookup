/********************* this comment is 80 characters long *********************/
 
(function () {
 
"use strict";
if (window.andrewds1021 && window.andrewds1021.category_css
    && window.andrewds1021.category_css.has_run) return;
if (!window.andrewds1021) {
    window.andrewds1021 = {
        category_css: {}
    };
} else if (!window.andrewds1021.category_css) {
    window.andrewds1021.category_css = {};
}
window.andrewds1021.category_css.has_run = true;
if (!window.andrewds1021.category_css.category_styles) {
    window.andrewds1021.category_css.category_styles = {};
}
 
var list = window.andrewds1021.category_css.category_styles;
var list_keys = Object.keys(list); // get categories
 
if (list_keys.length <= 0) return;
 
/*
generate API request
*/
 
console.log("CategoryCSS.js: Attempting to generate API request.");
var request = {
    action: "query",
    titles: mw.Title.getPrefixedText(),
    prop: "categories",
    cllimit: 1,
    clcategories: "Category:"+list_keys.join("|Category:")
};
 
/*
send API request, check results, and import CSS
*/
 
console.log("CategoryCSS.js: Waiting for \"mediawiki.api\".");
mw.loader.using("mediawiki.api").then(function () {
    console.log("CategoryCSS.js: \"mediawiki.api\" has been loaded. Attempting"
        +" to send API request.");
    return new mw.Api().get(request);
}).then(function (reply) {
    console.log("CategoryCSS.js: An API reply has been received. Attempting to"
        +" extract data.");
    if (reply["query-continue"] && reply["query-continue"].categories) {
        console.log("CategoryCSS.js: There was more than one (1) category"
            +" match. Only the first one will be used.");
    }
    if (reply.query && reply.query.pages && reply.query.pages[0]
        && reply.query.pages[0].categories
        && reply.query.pages[0].categories[0]) {
        var key = reply.query.pages[0].categories[0].title;
        key = key.substring(key.indexOf(":")+1);
        value = list[key] ? list[key] : list[key.replace(/\s/g, "_")];
        if (!value) {
            console.log("CategoryCSS.js: \""
                +reply.query.pages[0].categories[0].title+"\" could not be"
                +" matched to an entry in the list. No additional CSS has been"
                +" imported.");
        } else {
            console.log("CategoryCSS.js: Attempting to import additional CSS.");
            importArticles({
                type: "style",
                article: value
            });
        }
    } else {
        console.log("CategoryCSS.js: There was an issue retrieving category"
            +" data for \""+mw.Title.getPrefixedText()+"\". No additional CSS"
            +" has been imported.");
    }
});
 
})();