var rights = {},
    icons = {},
    user = wgTitle;

rights["Ruhan.Rikin3"]        = ["Dono", "Desenvolvedor", "Gerente"],
rights["MestreCorrida"]       = ["Gerente"],
rights["Ghhghgh"]             = ["Gerente"];

icons["Administrador"]        = "3/34/Emblema-Administrador.png",
icons["AWB"]                  = "6/62/COM11.gif",
icons["Bloqueado"]            = "2/27/UsuárioBloqueado.png",
icons["Moderador do Chat"]    = "7/79/NWB.gif",
icons["Desenvolvedor"]        = "d/d5/Emblema-Dev.png",
icons["Anfitrião de Eventos"] = "3/32/Emblema-Evento.png";
icons["Gerente Geral"]        = "f/fc/Fã-site.png",
icons["Inativo"]              = "5/54/US0R.png",
icons["Gerente"]              = "7/7c/Emblema-Gerência.png",
icons["Dono"]                 = "a/aa/Emblema-Dono.png";

if(user.indexOf("Contribuições/") != -1)
    user = title.replace("Contribuições/", "");
if(typeof rights[user] != "undefined")
    for(var i = 0, len = rights[user].length; i < len; i++)
        $('<span class="tag" style="margin-left: 10px !important">' + rights[user][i] + '</span>').appendTo('.masthead-info hgroup');

$('.tag').each(function() {
    if(typeof icons[$(this).html()] != "undefined") {
        $(this).addClass("Rank-" + $(this).html());	
        $(this).prepend("<img src='https://images.wikia.nocookie.net/habbo/pt/images/" + icons[$(this).html()] + "' />");
    }
});