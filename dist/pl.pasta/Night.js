/* Zmiany w tym pliku pojawią się NATYCHMIASTOWO. */

var admins=["Py64",
            "Luzerka1212",
            "Astriś032"];
var avatars=["https://vignette.wikia.nocookie.net/common/avatars/8/8e/24157665.png/revision/latest/scale-to-width/150?cb=1409582453&format=jpg",
             "https://vignette.wikia.nocookie.net/common/avatars/6/64/14992725.png/revision/latest/scale-to-width/150?cb=1410020191&format=jpg",
             "https://vignette.wikia.nocookie.net/common/avatars/6/6f/26200237.png/revision/latest/scale-to-width/150?cb=1428693046&format=jpg"]
var groups=["Biurokrata · Opiekun Projektu", "Biurokratka", "Administratorka"]
for(x=0;x<admins.length;x++){
    $('.page-Pasta_Wiki_Administratorzy_new .Administratorzy').append('<div class="UserBlock"><div class="User"><div class="UserAvatar" id="'+admins[x]+'-avatar"></div><span class="UserNickname">'+admins[x]+'</span><p class="UserGroups">'+groups[x]+'</p></div></div>');
    $('.UserAvatar#'+admins[x]+'-avatar').css("background",'url('+avatars[x]+') rgba(10,13,5,0.30)');
}