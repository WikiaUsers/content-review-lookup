;(function($, mw){
    if (mw.config.get('wgNamespaceNumber') != 0 && mw.config.get('wgNamespaceNumber') != 116) {
        return;
    }

    var data = {
  "Shannon Messenger": {
    "initial": "Oh c’est moi ! Regardez comme je suis belle sur la photo !",
    "options": [],
    "response": []
  },
  "RANDOM1": {
    "initial": "Je vis avec plein de chats chez moi. En même temps, c’est logique, il y a « Sha » dans mon prénom !",
    "options": [],
    "response": []
  },
  "RANDOM2": {
    "initial": "Saviez-vous que je me suis parfois inspirée de l’univers d’Harry Potter pour écrire mes livres ? Ça vous étonne, n’est-ce pas ?",
    "options": [],
    "response": []
  },
  "RANDOM3": {
    "initial": "Vous pensez qu’il faut faire quelles études pour devenir écrivain ?",
    "options": [
      "Des études qui apprennent à être écrivain",
      "Des études d’ingénieur"
    ],
    "response": [
      "Hein ? Pour quoi faire ?",
      "Si tu veux mon avis, il n’y a rien de mieux que d’apprendre des trucs sur le dessin et le cinéma pour écrire des livres. Mais j’ai beaucoup hésité avec des études d’ingénieur, c’est vrai."
    ]
  },
  "RANDOM4": {
    "initial": "Voulez-vous que je vous apprenne à écrire un article ?",
    "options": [
      "Oui ! ",
      "Non."
    ],
    "response": [
      "Alors lisez <a href='https://gdcp.fandom.com/fr/Aide:Contribuer_sur_le_wiki'>cette page</a> Pour savoir comment faire ! Attendez, vous croyiez que j’allais vous l’expliquer moi-même ?",
      "Vous avez bien raison. Écrire, c’est vraiment un truc de nazes."
    ]
  },
  "RANDOM5": {
    "initial": "Saviez-vous que j’ai envisagé de devenir animatrice chez Disney ? C’est vrai quoi, pourquoi écrire des livres quand on peut être payée pour être déguisée en Donald ?",
    "options": [],
    "response": []
  },
  "RANDOM6": {
    "initial": "Avez-vous entendu parler du tome 11, qui sort l’année prochaine ?",
    "options": [
      "Bien sûr !"
    ],
    "response": [
      "Incroyable, parce que je suis la dame qui écrit cette série, et je n’en ai jamais entendu parler !",
    ]
  },
  "RANDOM7": {
    "initial": "Saviez-vous que certains de mes lecteurs ont acheté le tome 8.5, puis l’ont racheté pour les 20 pages de nouvelle inutile que j’ai ajouté sur Linh ? ✨ Business is business ✨",
    "options": [],
    "response": []
  },
  "RANDOM8": {
    "initial": "Tu as envie de savoir comment écrire des livres ?",
    "options": [
      "Oui",
      "Non"
    ],
    "response": [
      "Eh bien, moi aussi. Préviens-moi quand tu sauras, ça pourrait m’être utile.",
      "Moi-même, je ne sais pas vraiment comment on fait."
    ]
  },
  "RANDOM9": {
    "initial": "Saviez-vous que le tome 10 sort en automne prochain ?",
    "options": [
      "J’ai hâte !",
    ],
    "response": [
      "Poisson d’avril haha, il sort en 2039 !",
    ]
  },
  "RANDOM10": {
    "initial": "Saviez-vous qu’il y a trois emojis à mon effigie sur le <a href='https://dsc.gg/wikigdcp'>Discord du wiki</a> ? Ils doivent vraiment m’adorer ! ",
    "options": [],
    "response": []
  },
  "RANDOM11": {
    "initial": "Dis, tu me trouves sympa ?",
    "options": [
    	"T’es ma BFF, Shannon"
    ],
    "response": [
    	"Wow, merci beaucoup ! Tiens, <a href='https://gdcp.fandom.com/fr/Spécial:Ma_page?action=edit&preload=Modèle:SM&section=new'>voici un cadeau</a> pour te remercier !"
    ]
  },
  "RANDOM12": {
    "initial": "Vous êtes plutôt Sophitz ou Sokeefe ?",
    "options": [
      "Sophitz",
      "Sokeefe"
    ],
    "response": [
      "Haha, je sens votre seum d’ici !",
      "…comme 80% des lecteurs. La seule raison pour laquelle je vous préfère, on va pas se mentir."
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
        var key = "RANDOM" + (Math.floor(Math.random() * 12) + 1);
        conversation = data[key]
    }
    
    var $div = $("<div id=\"shannon\" style='color: white; z-index: 999999999; position: fixed;bottom: 20px;left: 30px;'><div id=\"shannon-speech\" style='  position: fixed;bottom: 140px;left: 15px;background-color: #5656F1;width: 175px;border-radius: 15px 15px 15px 0;'><div id=\"shannon-speech-text\" style='  margin: 7px 10px;font-family: Rubik;font-size: 13px;'></div></div><div id=\"shannon-img\"></div></div>")

    var $buttons = $("<div id=\"shannon-speech-buttons\" style='  font-family: Rubik;font-size: 14px;position: relative;text-align: center;border-top: 1px solid #C2C2C2;bottom: 0;margin: 7px 7px 10px 7px;'></div>")

    var $button = $("<button class=\"shannon-button\" style='  background-color: #fff;border: 1px solid #C2C2C2;border-radius: 3px;padding: 5px 12px;margin: 10px 5px 0 5px;'>No</button>")
    mw.log(conversation.initial)
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
        butt.text(conversation.options[i])
        butt.attr("data-response", conversation.response[i])
        butt.click(onClick);
        $("#shannon-speech-buttons").append(butt);
    }


})(jQuery, mw);