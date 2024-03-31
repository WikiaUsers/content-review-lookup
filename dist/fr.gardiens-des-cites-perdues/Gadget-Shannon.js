// Événement du Premier avril
;(function($, mw){
    if (mw.config.get('wgNamespaceNumber') != 0 && mw.config.get('wgNamespaceNumber') != 116) {
        return;
    }

    var data = {
  "Shannon Messenger": {
    "initial": "Oh c’est moi ! Incroyable, je suis sur le Wiki Gardiens des Cités Perdues !",
    "options": [],
    "response": []
  },
  "Keefe Sencen": {
  	"initial": "Oh, bonjour chers lecteurs ! Sachez que je vous Keefe ! (Keefe, Kiffe... bon je retourne écrire moi.)",
  	"options": [],
  	"response": []
  },
  "Pernille": {
  	"initial": "Pourquoi l'impératrice Pernille ne joue pas aux jeux vidéos ? Parce qu'elle n'arrête pas de troller tout le monde !",
  	"options": [],
  	"response": []
  },
  "Sandor": {
  	"initial": "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
  	"options": [],
  	"response": []
  },
  "Gobelin": {
  	"initial": "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
  	"options": [],
  	"response": []
  },
  "Elfe": {
  	"initial": "Pourquoi dit-on que les elfes sont suisses ? Parce qu'ils font partie de la confédération elf-étique !",
  	"options": [],
  	"response": []
  },
  "Verdi": {
  	"initial": "Que fait Verdi quand il n'arrive pas à choisir ce qu'il va manger ? Un tirajosaure",
  	"options": [],
  	"response": []
  },
  "Tyrannosaure": {
  	"initial": "Que fait Verdi quand il n'arrive pas à choisir ce qu'il va manger ? Un tirajosaure",
  	"options": [],
  	"response": []
  },
  "Sanctuaire": {
  	"initial": "Oh non, la porte du sanctuaire est cassée ! Comment la réparer ? Ah, je sais : utilisons une argenta-visse !",
  	"options": [],
  	"response": []
  },
  "Gardiens des Cités perdues (série littéraire)": {
  	"initial": "Arrêter d'écrire les Gardiens des Cités Perdues ?! Ah sha non !",
  	"options": [],
  	"response": []
  },
  "Iggy": {
  	"initial": "Quelle chanson de Dalida les lutins adorent-ils par dessus tout ? Iggy l'amoroso !",
  	"options": [],
  	"response": []
  },
  "Kaléïde": {
  	"initial": "Non, ce n'est pas le chanteur de Aïcha...",
  	"options": [],
  	"response": []
  },
  "Amisi": {
  	"initial": "Je ne me rappelle plus avoir écrit créé ce personnage... Ah mi si !",
  	"options": [],
  	"response": []
  },
  "Chargeur": {
  	"initial": "Non, il ne va pas recharger ton téléphone !",
  	"options": [],
  	"response": []
  },
  "RANDOM1": {
    "initial": "Je vis avec plein de chats chez moi. En même temps, c’est logique, il y a « Sha » dans mon prénom !",
    "options": [],
    "response": []
  },
  "RANDOM2": {
    "initial": "Voulez-vous que je vous apprenne à écrire un article ?",
    "options": [
      "Oui ! ",
      "Non."
    ],
    "response": [
      "Alors demandez à l’équipe administrative, ou lisez <a href='https://gdcp.fandom.com/fr/Aide:Contribuer_sur_le_wiki'>ce truc</a> Pour savoir comment faire ! Attendez, vous croyiez vraiment que j’allais vous l’expliquer moi-même ?",
      "Bon ben au revoir alors !"
    ]
  },
  "RANDOM3": {
    "initial": "Avez-vous entendu parler du tome 11, qui sort l’année prochaine ?",
    "options": [
      "Bien sûr !"
    ],
    "response": [
      "Incroyable, parce que je suis la dame qui écrit cette série, et je n’en ai jamais entendu parler !",
    ]
  },
  "RANDOM4": {
    "initial": "Saviez-vous que le tome 10 sort en automne prochain ?",
    "options": [
      "J’ai hâte !"
    ],
    "response": [
      "Poisson d’avril haha, il sort en 2039 !",
    ]
  },
  "RANDOM5": {
    "initial": "Saviez-vous qu’il y a trois emojis à mon effigie sur le <a href='https://dsc.gg/wikigdcp'>Discord du wiki</a> ? Ils doivent vraiment m’adorer ! ",
    "options": [],
    "response": []
  },
  "RANDOM6": {
    "initial": "Dis, tu me trouves sympa ?",
    "options": [
    	"T’es ma BFF, Shannon"
    ],
    "response": [
    	"Wow, merci beaucoup ! Tiens, <a href='https://gdcp.fandom.com/fr/Spécial:Ma_page?action=edit&preload=Modèle:Cadeau_Shannon&section=new'>voici un cadeau</a> pour te remercier !"
    ]
  },
  "RANDOM7": {
  	"initial": "Toc toc",
  	"options": [
  		"Qui est là ?"
  	],
  	"response": [
  		"Pas le tome 10 en tout cas !"
  	]
  },
  "RANDOM8": {
  	"initial": "Connais-tu l'histoire de l'elfe qui faisait un saut lumineux ?",
  	"options": [
  		"Non"
  	],
  	"response": [
  		"Trop tard, il est parti !"
  	]
  },
  "RANDOM9": {
  	"initial": "Tu aimes les paillettes ?",
  	"options": [
  		"Oui",
  		"Non"
  	],
  	"response": [
  		"Oh moi aussi, j'adore ! Faisons un club !",
  		"Tu as tort, les paillettes c'est la vie !"
  	]
  },
  "RANDOM10": {
  	"initial": "Toc toc",
  	"options": [
  		"Qui est là ?"
  	],
  	"response": [
  		"Encore un nouveau tome dans 18 mois !"
  	]
  }
}

    var pagename = mw.config.get('wgTitle');
    var namespace = mw.config.get('wgCanonicalNamespace');
    var categories = mw.config.get('wgCategories');

    var conversation = null;
    if (data[pagename] !== undefined) {
        conversation = data[pagename];
    } else {
        var key = "RANDOM" + (Math.floor(Math.random() * 10) + 1);
        conversation = data[key];
    }
    
    var $div = $("<div id=\"shannon\" style='color: white; z-index: 999999999; position: fixed;bottom: 20px;left: 30px;'><div id=\"shannon-speech\" style='  position: fixed;top: 50vh;left: 15px;background-color: #5656F1;width: 175px;border-radius: 15px 15px 15px 0;'><div id=\"shannon-speech-text\" style='  margin: 7px 10px;font-family: Rubik;font-size: 13px;'></div></div><div id=\"shannon-img\"></div></div>");

    var $buttons = $("<div id=\"shannon-speech-buttons\" style='  font-family: Rubik;font-size: 14px;position: relative;text-align: center;border-top: 1px solid #C2C2C2;bottom: 0;margin: 7px 7px 10px 7px;'></div>");

    var $button = $("<button class=\"shannon-button\" style='  background-color: #fff;border: 1px solid #C2C2C2;border-radius: 3px;padding: 5px 12px;margin: 10px 5px 0 5px;'>No</button>");
    mw.log(conversation.initial);
    $('#firstHeading').after($div);
    $("#shannon-speech-text").html(conversation.initial);
    if (conversation.options.length > 0) {
        $("#shannon-speech-text").after($buttons);
    }

    var onClick = function(event) {
        $("#shannon-speech-text").html($(event.target).attr('data-response'));
        $("#shannon-speech-buttons").remove();
    }
    for (var i = 0; i < conversation.options.length; i++) {
        var butt = $button.clone();
        butt.text(conversation.options[i]);
        butt.attr("data-response", conversation.response[i]);
        butt.click(onClick);
        $("#shannon-speech-buttons").append(butt);
    }


})(jQuery, mw);