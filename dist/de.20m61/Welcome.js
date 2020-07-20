if (localStorage.newUser !== "true") {

MessageText = ''
+ '<form class="WikiaForm" method="" name="">'
  + '<fieldset>'
    + '<h1>Hallo und Willkommen, Harry Potter-Fan!</h1>'
    + 'Wir haben dich als neuen Benutzer erkannt und freuen uns, Dich im Wiki willkommen zu heißen.'
    + '<p>'
    + 'Bevor Du mit Lesen und Schreiben beginnst, bitten wir Dich, einen Blick auf unsere <a href="http://de.harrypotter.wikia.com/wiki/Project:Richtlinien">Richtlinien</a> und auf <a href=http://de.harrypotter.wikia.com/wiki/Project:Informationen_zum_Community_Portal">Informationen zum Community Portal</a> zu werfen.'
    + '</p>'
    + '<p>'
    + 'Warum nicht anhalten und <a href="http://de.harrypotter.wikia.com/wiki/Spezial:Chat" target="_blank">mit uns chatten</a>, während Du gerade dabei bist?'
    + '</p>'
    + '<p>'
    + 'WICHTIG: Um Probleme zu vermeiden, bitte KEINE Texte aus dem <a href=http://de.harry-potter.wikia.com/wiki/Hauptseite>Schwester-Wiki kopieren und auch KEINE Texte aus dem <a href=http://harrypotter.wikia.com/wiki/Main_Page>englischen Wiki einfach nur übersetzen!'
    + '</p>'
  + '</fieldset>'
+ '</form>'
+ '';

        $.showCustomModal("Willkommen im Harry-Potter-Lexikon!", MessageText, {
 
           id: "newuser-modal",
           width: 650,
           buttons: [{
               id: "submit",
               defaultButton: true,
               message: "Okay, ich bin bereit, fortzufahren!",
               handler: function () {
                    localStorage.newUser = "true";
                    $('#newuser-modal').closeModal();
                }
            }]
        });
}