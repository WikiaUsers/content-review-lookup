/* Script crée par @Think D. Solucer */

$(function()
  {
      'use strict';
var i; /* Indice */
var p=2; /* Pour la boucle for: selection du bon fils */
var personnage = new Array(); /* Tous les perso */
var info_section_personnage = new Array(); /* La variable la plus importante, à modifier avec du bon contenu */
var ceci = new Array();  /* Va avec le tableau ci dessous */
var selecteur_afficheur = new Array(); /* Selection pour le fadeIn/Out */
var selecteur_guide = new Array(); /* Repere pour l'append */

      
        /* Les personnages */ 
personnage = ['Onizuka',
              'Tokiwa',
              'Uehara',
              'Fujiyoshi',
              'Murai',
              'Wakui',
              'Aizawa',
              'Yoshikawa',
              'Kusano',
              'Nomura',
              'Kanzaki',
              'Uchiyamada',
              'Kikuchi',
              'Fuyutsuki',
              'Fukuroda',
              'Teshigawara',
              'Sakurada'
             ];   
      
        /* Les infos à mettre */
      
info_section_personnage = ['<section id="Onizuka-info"><header><h1 class="Onizuka-titre">Le GTO !</h1></header><p>Personnage principal, pervers et drôle, le prof parfait !</p></section>',
                           /* Deuxieme élément */
'<section id="Tokiwa-info"><header><h1 class="Tokiwa-titre">l\'ange victimisé</h1></header><p>Gentille et angélique, son histoire beaucoup moins...</p></section>',
                           /* Etc. */
'<section id="Uehara-info"><header><h1 class="Uehara-titre">La meneuse</h1></header><p>Déteste Onizuka et compte trop sur ses parents.</p></section>',
                           /* */
'<section id="Fujiyoshi-info"><header><h1 class="Fujiyoshi-titre">La marionnette</h1></header><p>Se fait manipuler, issu d\'une famille modeste mais a le coeur grand comme l\’océan.</p></section>',
                           /* */
'<section id="Murai-info"><header><h1 class="Murai-titre">L\'abruti</h1></header><p>Abruti a ses débuts mais il est bien plus que ça...</p></section>',
                           /* */
'<section id="Wakui-info"><header><h1 class="Wakui-titre">Le blond</h1></header><p>Considéré comme un cauchemar vivant parmi les élèves de la 3e 4.</p></section>',
                           /* */
'<section id="Aizawa-info"><header><h1 class="Aizawa-titre">La peste</h1></header><p>Jeune fille qui sera l\'élève la plus redoutable dans la classe d\'Onizuka.</p></section>',
                           /* */
'<section id="Yoshikawa-info"><header><h1 class="Yoshikawa-titre">La victime</h1></header><p>C\'est un élève réservé, petit et faible.</p></section>',
                           /* */
'<section id="Kusano-info"><header><h1 class="Kusano-titre">Le forever alone</h1></header><p>Il cherche désespérément une copine.</p></section>',
                           /* */
'<section id="Nomura-info"><header><h1 class="Nomura-titre">Tomo-conne</h1></header><p>Jeune fille dont l\'énorme tour de poitrine est à l\'inverse de son intelligence.</p></section>',
                           /* */
'<section id="Kanzaki-info"><header><h1 class="Kanzaki-titre">La terroriste</h1></header><p>Jeune fille possède une intelligence hors norme mais...</p></section>',
                           /* */
'<section id="Uchiyamada-info"><header><h1 class="Uchiyamada-titre">La fille du sous directeur</h1></header><p>Fille du célèbre sous-directeur, elle rencontre Onizuka (qu\'elle surnomme affectueusement Oni-Oni) lorsque celui-ci la drague lors d\'une soirée. </p></section>',
                           /* */
'<section id="Kikuchi-info"><header><h1 class="Kikuchi-titre">Le génie</h1></header><p>Jeune garçon surdoué au QI de 180 de la classe d\'Onizuka, il tentera au début de piéger plus d\'une fois Onizuka.</p></section>',
                           /* */
'<section id="Fuyutsuki-info"><header><h1 class="Fuyutsuki-titre">Prof modèle</h1></header><p>Jeune femme du même âge qu\'Onizuka, elle est engagée en même temps que lui au collège Kissho en tant que professeur.</p></section>',
                           /* */
'<section id="Fukuroda-info"><header><h1 class="Fukuroda-titre">Le gros vicelard</h1></header><p>Professeur de sport de l\'école Kisshō, âgé de 32 ans, surnommé Hokuroda.</p></section>',
                           /* */
'<section id="Teshigawara-info"><header><h1 class="Teshigawara-titre">Le psychopathe</h1></header><p>Professeur de mathématiques du collège Kisshō, âgé de 24 ans, diplômé de la plus grande université du Japon.</p></section>',
                           /* */
'<section id="Sakurada-info"><header><h1 class="Sakurada-titre">le Groin</h1></header><p>Professeur d\'anglais du collège Kisshō, âgé de 42 ans, il est très loin de maîtriser la langue qu\'il enseigne mais...</p></section>'];

function Infos_personnage(info_section_personnage, selecteur_afficheur,ceci,selecteur_guide)
{
$(selecteur_guide).append(info_section_personnage);
$(selecteur_afficheur).mouseover(function(){$(ceci).fadeIn("slow")});
$(selecteur_afficheur).mouseout(function(){$(ceci).fadeOut("slow")});
};
                           /* Début code */
      if ( wikiaPageType == "home" )
      {
          for(i=0;i<personnage.length;i++)
            {
                if ( i == 0 )
                    selecteur_guide[i] = '#gallery-0 .wikia-gallery-item'; 
                else if ( i == 1 )
                    selecteur_guide[i] = '#gallery-1 .wikia-gallery-item';
                else if ( i == 13 )
                    selecteur_guide[i] = '#gallery-2 .wikia-gallery-item';
                else if ( i > 13 )
                {
                    selecteur_guide[i] = '#gallery-2 .wikia-gallery-item:nth-child('+p+')';
                     p++;
                }
                else
                    selecteur_guide[i] = '#gallery-1 .wikia-gallery-item:nth-child('+i+')';
                
                        selecteur_afficheur[i]= '.'+personnage[i]+'-accueil';
                        ceci[i] = "#"+personnage[i]+"-info";
            }
          /* On affiche pour tous */
          for(i=0;i<personnage.length;i++)
                Infos_personnage(info_section_personnage[i], selecteur_afficheur[i],ceci[i],selecteur_guide[i]);
      }

/* Fin */
});

/* Changement du Texte de la Galerie */
window.galleryButtonText = 'Ajouter une image ici.';
 
importScriptPage('GalleryButtonCustomText/code.js', 'dev');

/* code smiley bouton */

$(function()
{
    // Adding neccessary CSS
    mw.util.addCSS(".kockaEmoticonsIcon{width:19px;height:19px;border:1px solid black;padding: 10px;border-radius: 5px;background:#5F2C60;}.kockaEmoticonsIcon:hover{background:#823C83;}#kockaEmoticonsModalMain{height:400px;overflow-y:auto;}");
 
    // Initializing variables
    var obj = window.kockaEmoticons || {};
    obj.emoticons = {};
    obj.vocab = obj.vocab || {};
 
    // Parsing emoticons
    EMOTICONS.split("\n").forEach(function(el, index, arr) { if(el[0] === "*" && el[1] !== "*") obj.emoticons[arr[index + 1].substring(2).trim()] = el.substring(1).trim(); }, this);
 
    /**
     * Function for creating an emoticon element
     * @param [String] emote - Emote code
     * @method
     */
    function createEmoteElement(emote)
    {
        var el = document.createElement("img");
        el.className = "kockaEmoticonsIcon";
        el.src = obj.emoticons[emote];
        el.setAttribute('title', emote);
        el.onclick = function()
        {
            var ap = $(".message textarea").last();
            ap.val(ap.attr("value") + " " + emote);
            $("#kockaEmoticonsModal").closeModal();
        };
        $("#kockaEmoticonsModalMain").append(el);
    }
 
    // Creating Emoticons button
    var button = document.createElement("button");
    button.innerHTML = obj.vocab.emoticons || "Emoticons";
    button.className = "kockaEmoticonsSpan";
    button.onclick = function()
    {
        // Show modal
        // TODO: Fix double-initializing to make the modal loading faster.
        $.showCustomModal(obj.vocab.emoticons || "Emoticons", "<span class='kockaEmoticonsHelp'>" + (obj.help || "Choose an emoticon by clicking on it.") + "</span><div id='kockaEmoticonsModalMain'></div>",
        {
            id: "kockaEmoticonsModal",
            buttons: [{
                id: "kockaEmoticonsClose",
                defaultButton: true,
                message: obj.vocab.close || "Close",
                handler: function(){ $("#kockaEmoticonsModal").closeModal(); }
            }]
        });
 
        // Adding emoticons to modal
        for(var emote in obj.emoticons) if(obj.emoticons.hasOwnProperty(emote)) createEmoteElement(emote);
    };
 
    // Adding button to title
    // Steven Universe Wiki is an exception, as requested by [[User:Dorumin]]
    if(wgServer === "http://steven-universe.wikia.com") $('#chatOptionsButton + .chat-button').after(button);
    else $('.public.wordmark').first().append(button);
});