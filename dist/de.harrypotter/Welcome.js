if (localStorage.newUser !== "true") {
    
    $.get('/api.php?action=parse&page=MediaWiki:Custom-Welcome-Lightbox-Text&format=json',function(data) {
        MessageText = $('<form />').addClass('WikiaForm').append(
            $('<fieldset />').html(data.parse.text['*'])  
        );
 
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
    });
}