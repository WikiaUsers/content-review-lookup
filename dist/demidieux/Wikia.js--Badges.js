/*##################################
  ## Personnalisation des Badges ###
  ##################################*/
var IScookieHideBadgesGIF = document.cookie.indexOf('HideBadgesGIF=true');

if(wgNamespaceNumber === 2) {
    if(IScookieHideBadgesGIF===-1) {
        var timerGIF = setInterval(GIFbadges, 1000);
    }
    else{$('#WikiaRail').prepend('<p style="font-style:italic; text-align: right;"><a href="#" onclick="delBadgesCookie()"><img src="https://cdnd.icons8.com/wp-content/uploads/2014/01/running_rabbit-128.png" alt="Chargement normal" width="25" height="25"><br>Mode Chargement Lent</a></p>')}
}

var default_class = 'module AchievementsModule UserProfileAchievementsModule';
$('body').prepend('<div style="background-image:url(https://vignette.wikia.nocookie.net/wpj-test-code/images/f/f1/Coffre_au_tr%C3%A9sor_ouverture.gif/revision/latest?cb=20161024153116&path-prefix=fr); display:none"></div>');
function OpenChest() {
    $('#OpeningChest').attr('class', default_class+' opened');
    setTimeout(function() {$('#OpeningChest').attr({'id':'', 'onclick':''})}, 4000);
}
function GIFbadges() {
    if($('.AchievementsModule').html() !== undefined || $('.WikiaBadgeNotification').html() !== undefined) {
        $('img[alt="Demi-Dieu reconnu - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/d/d4/Badge-introduction.gif/revision/latest?cb=20161015184309&path-prefix=fr");
        $('img[alt="Présentations - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/9/9f/Badge-picture-0.gif/revision/latest?cb=20161015101003&path-prefix=fr");
        $('img[alt="Créatures fantastiques - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/e/e1/Badge-picture-1.gif/revision/latest?cb=20161015101051&path-prefix=fr");
        $('img[alt="Premiers frissons - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/c/c8/Badge-picture-2.gif/revision/latest?cb=20161015100954&path-prefix=fr");
        $('img[alt="L\'Oracle de Delphes - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/0/05/Badge-picture-3.gif/revision/latest?cb=20161015100955&path-prefix=fr");
        $('img[alt="Première bataille - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/0/0a/Badge-picture-4.gif/revision/latest?cb=20161015100955&path-prefix=fr");
        $('img[alt="Rendez-vous avec Hadès - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/f/f3/Badge-picture-5.gif/revision/latest?cb=20161015100956&path-prefix=fr");
        $('img[alt="Renaissance - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/6/61/Badge-picture-6.gif/revision/latest?cb=20161015100956&path-prefix=fr");
        $('img[alt="Dieux de l\'Olympe - Souvenir"]').attr("src", "https://vignette.wikia.nocookie.net/wpj-test-code/images/5/5e/Badge-picture-7.gif/revision/latest?cb=20161015100957&path-prefix=fr");
 
        $('ul.badges-icons.badges').after('<p style="text-align: right;"><a href="#" onclick="setBadgesCookie()"><img src="https://cdnd.icons8.com/wp-content/uploads/2014/01/turtle-1281.png" alt="Accélérer le chargement" width="25" height="25"></a></p>');
        
        $('.module.AchievementsModule.UserProfileAchievementsModule:nth-child(2)').attr('id', 'OpeningChest');
        $('#OpeningChest').attr('class', default_class+' closed');
        $('#OpeningChest').attr('onclick', 'OpenChest()');
    
        clearInterval(timerGIF);
    }
    else{}
}
GIFbadges();

function setBadgesCookie() {
    var userreturn = confirm("Si le chargement de cette page est trop long, vous pouvez accélerer le prochain chargement en désactivant les badges GIFS. Pour cela, un cookie sera créé sur votre navigateur");
    if(userreturn===true){
        var duration = new Date();
            duration.setTime(duration.getTime() + ((365/2)*24*60*60*1000));
        duration = "expires="+ duration.toUTCString();
        document.cookie="HideBadgesGIF=true;"+duration;
    }
    else{}
}

function delBadgesCookie() {
    var userreturn = confirm("Le chargement des badges GIFS a été désactivé. Voulez-vous réactiver leur exécution ? (le prochain chargement de la page pourrait être plus long)");
    if(userreturn===true){
        document.cookie="HideBadgesGIF=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
    else{}
}