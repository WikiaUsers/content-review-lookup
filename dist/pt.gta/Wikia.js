var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');

// Escrito por Usuário:Rappy_4187, Aion Wiki
// Suporte adicionado para Especial:Contribuições por Foodbandlt
 
$(function () {
    var rights = {};
    var admin = "Administrador";
    var bureaucrat = "Burocrata";
    var chatmoderator = "Moderador do Chat";
    var rollback = "Rollback"
    var wikiastar = "Estrela do Fandom"
 
    // Começo da lista de contas que recebem ícones de direitos de usuário extras
    //
    // Certifique-se de que a última linha listada pelos direitos modificados é seguida por um ponto e vírgula em vez de uma vírgula.
 
   //Burocrata
 
    rights["MatheusCormac"]           = [bureaucrat];
    rights["EliVanilla"]              = [bureaucrat];
    
   //Administrador
    
    rights["General9913"]             = [admin];
    rights["TheKamikatsu17"]          = [admin];
 
    // Fim da lista de contas que recebem ícones de direitos de usuário extras
 
 
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

//Special side boxes

$(function(){
    $('<section class="RandomModule module"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Template:RandomModule&action=render');
});