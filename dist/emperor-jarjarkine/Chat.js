var users = ["Emperor_Jarjarkine","Flightmare","Cheatcodechamp","Atvelonis"];
if(jQuery.inArray(wgUserName,users) > -1) {
    $(".ChatHeader").addClass("admin");
}
 
// Import Chat features
importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:!mods/code.js"
    ]
});