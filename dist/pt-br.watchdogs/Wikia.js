var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');

// Escrito por Usu�rio:Rappy_4187, Aion Wiki
// Suporte adicionado para Especial:Contribui��es por Foodbandlt
 
$(function () {
    var rights = {};
    var admin = "Administrador";
    var bureaucrat = "Burocrata";
    var chatmoderator = "Moderador do Chat";
    var rollback = "Rollback"
    var wikiastar = "Estrela do Fandom"
 
    // Come�o da lista de contas que recebem �cones de direitos de usu�rio extras
    //
    // Certifique-se de que a �ltima linha listada pelos direitos modificados � seguida por um ponto e v�rgula em vez de uma v�rgula.
 
   //Burocrata
 
    rights["MatheusCormac"]           = [bureaucrat];
 
    // Fim da lista de contas que recebem �cones de direitos de usu�rio extras
 
 
    if (wgPageName.indexOf("Especial:Contribui\u00e7\u00f5es") != -1) {
        newTitle = fbReturnToTitle.replace("Especial:Contribui\u00e7\u00f5es/", "");
        unfinishedTitle = newTitle;
 
        while (unfinishedTitle.search("_") > 0) {
            unfinishedTitle = unfinishedTitle.replace("_", " ");
        }
 
        userName = unfinishedTitle;
 
    } else {
        userName = wgTitle;
        userName.replace("Usu\u00e1rio:", "");
    }
 
    if (typeof rights[userName] != "undefined") {
        // remove direitos antigos
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[userName].length; i < len; i++) {
            // adiciona novos direitos
            $('<span style="margin-left: 10px;" class="tag">' + rights[userName][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
});