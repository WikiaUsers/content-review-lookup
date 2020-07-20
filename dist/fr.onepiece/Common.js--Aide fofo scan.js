/*********************************************************
 * Aide pour poster une réponse sur le topic des scans ***
 * Auteur : @Think D. Solucer                          ***
 * Sur remarque de : @Timetime                         ***
*********************************************************/
var ug                    =	wgUserGroups.join(' ');

function animerEnbas(cible)
    {
        $('html,body').animate({
                       scrollTop: cible.prev().offset().top
                   }, 1000);
    }
if  (   wgTransactionContext.namespace == 1201
        &&
        $(".BreadCrumbs:contains('Scan')")[0] // Si le fil contient le mot "Scan" = fil de scan
        &&
        ug.indexOf('*') === 0
        &&
        !$.cookie('Aide_Poster_MSG_SCAN')
    )
{
    var message_aide_poster='<div style="border:1px solid orange;\
    border-radius:2em; padding:1.5%; width:15%;position: fixed;\
    bottom: 50%; right: 10%;overflow: visible;\
    background:-moz-linear-gradient(right, red, blue);\
    background:-webkit-linear-gradient(right, white, blue);\
    background:-o-linear-gradient(right, red, blue);\
    background:-khtml-linear-gradient(right, red, blue);\
    background:-ms-linear-gradient(right, red, blue);\
    background:linear-gradient(to left, red, white);">\
    Et toi, que penses-tu de chapitre ? <a style="cursor:pointer;\
    class="reponse_scan">Clique ici !</a><br />N\'hésites pas à t\'inscrire\
    en cliquant <a href="http://fr.onepiece.wikia.com/wiki/Sp%C3%A9cial:\
    UserSignup" class="inscription_reponse_scan" style="color: green;\
    font-weight: bold;cursor: pointer;font-size: 26px;margin-left: 40%;\
    ">ici</a></div>';
    var cible_repondre_msg=$('li.SpeechBubble.new-reply');
    
    
    $(".WikiHeader").append(message_aide_poster);
    $(".reponse_scan").click(function()
    {
        animerEnbas(cible_repondre_msg);
    });
    $.cookie('Aide_Poster_MSG_SCAN', true);
}