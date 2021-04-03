// Pages along with their namespace (if any) will go here.
var pages = ['Utilisateur:John_Trololo'];
 
// URL of the images will go here.
// Remember URL of the logo of 'My Page 1' will be the first, 'My Page 2' will be the second and so on.
var wordmarks = ['http://sournoishack.com/uploads/992284328Wiki_wordmarkJohn.png'];

//****************************************/
//    Message forum                      */
//****************************************/

$(function() {
  $('.boards').prepend("<div class=warn3><div id=wh><center>Bienvenue sur le forum du wiki V pour Valek.<br>Avant de poster, nous vous invitons à lire les <a href='http://fr.vpourvalek.wikia.com/wiki/Wiki_VpourValek:Règles'><strong>Règles.</strong></a> <br/> On serait vraiment <strong><i>super-content</i></strong> si vous vous crééiez un compte utilisateur,<br/>cela vous permettra d'être lié avec votre compte VpourValek, et modifier sans divulguer votre IP. <a href='http://fr.vpourvalek.wikia.com/wiki/Special:Signup'><strong>Inscrivez-vous !</center></strong></a><br>Pour les smileys, c'est facile, pour en utiliser, il vous suffit de mettre<br>par exemple : {{hap}}, et ça affichera le smiley :hap:</p></div>");
});


/* Modif a propos */

$(function(){

/* deb jq */

$(".global-footer li:first-child").html("<li><a href=\"http://www.youtube.com/watch?v=2FzyLOVbgW4\">À propos des FDP</a></li>");

/* fin jq */

});

/* Ajout d'un div */
$(".WikiaMainContent").prepend("<div class=\"apparition\"></div>");
 
var k = 0;
var selecteur_courant = ".apparition";
$(selecteur_courant).text("Coucou Hulothe");
 
function disp()
{
    $(selecteur_courant).hide();
}
function apparition()
{    
    for(i=0;i<6 && k == 0;i++){
        $(selecteur_courant).animate({marginLeft:80*i},800)
        if ( i == 5 )
        { 
            k = 1 ; 
             $(selecteur_courant).animate({marginLeft:-800*i},800)
        }
    }
 
 
}
 
setInterval(apparition(),1500);
 
 
/* fin jq */
 
});