importScriptPage('ExternalImageLoader/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

//*G�n�rateur de pseudo pour l'�nigme du nouvel an chinois 2016*//


$("span.asciipseudo").replaceWith('<input type="text" id="asciipseudo"/> <div id="asciiresult">')

$("#asciipseudo").on("change keyup paste", function(){
    str = $("#asciipseudo").val().toLowerCase();
    newstr = "";
    for (var i = 0, len = str.length; i < len; i++) {
      newstr += String.fromCharCode((str[i].charCodeAt(0) + 2));
    }
    $("#asciiresult").html(newstr);
})