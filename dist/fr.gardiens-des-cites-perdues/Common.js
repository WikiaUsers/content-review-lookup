/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/***** Customisation *****/
/*** AddRailModule (Dev Wiki) ***/
window.AddRailModule = [{ prepend: true }];

/*** Modification de la page d'import de fichier ***/
$(function () {
  if (mw.config.get("wgPageName") != "Spécial:Téléverser") {
    return;
  }
  $("#wpUploadDescription").text(
    "{{Fichier\r\n|description=\r\n|licence=\r\n|source=\r\n|autre=}}"
  );
  $(".mw-htmlform-field-HTMLTextAreaField .mw-input").append(
    '<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">'
  );
  $("#button-italic").click(function () {
    richEditor("''", "''");
  });
  $("#button-bold").click(function () {
    richEditor("'''", "'''");
  });
  $("#button-link").click(function () {
    richEditor("[[", "]]");
  });

  function richEditor(primier, segond) {
    var textarea = document.getElementById("wpUploadDescription");
    if ("selectionStart" in textarea) {
      if (textarea.selectionStart != textarea.selectionEnd) {
        var newText =
          textarea.value.substring(0, textarea.selectionStart) +
          primier +
          textarea.value.substring(
            textarea.selectionStart,
            textarea.selectionEnd
          ) +
          segond +
          textarea.value.substring(textarea.selectionEnd);
        textarea.value = newText;
      }
    } else {
      var textRange = document.selection.createRange();
      var rangeParent = textRange.parentElement();
      if (rangeParent === textarea) {
        textRange.text = primier + textRange.text + segond;
      }
    }
  }
});

/*** Forcer le favicon à s'afficher lors de bugs ***/

(function () {
  // Remettre le favicon s'il n'est pas chargé
  var headTitle = document.querySelector("head"),
    favIcons = [
      { rel: "apple-touch-icon" },
      { rel: "apple-touch-startup-image" },
      { rel: "shortcut icon" },
    ];
  favIcons.forEach(function (favIcon) {
    var setFavicon = document.createElement("link");
    setFavicon.setAttribute("rel", favIcon.rel);
    setFavicon.setAttribute(
      "href",
      "https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/6/64/Favicon.ico/revision/latest?cb=20201126084739&path-prefix=fr"
    );
    headTitle.appendChild(setFavicon);
  });
})();

/***** Modèles *****/

/*** USERNAME ***/
function substUsername() {
  $(".insertusername").text(
    '<a href="/wiki/Modèle:USERNAME" style="color: #d5d4d4">' +
    mw.config.get("wgUserName") +
    "</a>"
  );
  $(".insertusername:hover").css("text-decoration", "none");
}

function substUsernameTOC() {
  var toc = document.getElementById("toc");
  var userpage = document.getElementById("pt-userpage");

  if (!userpage || !toc) return;

  var username = userpage.firstChild.firstChild.nodeValue;
  var elements = getElementsByClass("toctext", toc, "span");

  for (var i = 0; i < elements.length; i++)
    elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace(
      "<insert name here>",
      username
    );
}
$(function () {
  $(".insertusername").text(mw.config.get("wgUserName"));
});

/*** Slider ***/
mw.loader.using(["jquery.cookie"]);
mw.loader.using(["jquery.ui.tabs"], function () {
  $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
  $(".portal_vtab > ul > li")
    .removeClass("ui-corner-top")
    .addClass("ui-corner-left");
  var $tabs = $("#portal_slider").tabs({
    fx: {
      opacity: "toggle",
      duration: 100,
    },
  });

  $(".portal_sliderlink").click(function () {
    // binding click event
    $tabs.tabs("select", this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $(".portal_next").click(function () {
    // binding click event
    var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected + 1); // switch to next tab
    return false;
  });
  $(".portal_prev").click(function () {
    // binding click event
    var selected = $tabs.tabs("option", "selected");
    $tabs.tabs("select", selected - 1); // switch to previous tab
    return false;
  });
});

// DiscordWidget sur Wiki Gardiens des Cités Perdues:Discord/Portail
function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}
var portal = document.getElementById('discord-portal');
if (portal) {
  var widgetBot = document.createElement('div');
  widgetBot.innerHTML = '<widgetbot server="719085354514251877" channel="719215577994100766" width="800" height="600"></widgetbot>';
  portal.appendChild(widgetBot);
  loadScript('https://cdn.jsdelivr.net/npm/@widgetbot/html-embed');
}

// Retrait des [GDCP] dans les sommaires
$(function () {
  var LISTE = document.getElementById("toc");
  var content = String(LISTE.innerHTML);
  content = content
    .replace(
      /(?:<sup>)?\[(?:(?:GDCP\d)|(?:GDCP8\.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))[^\]]*\]?(?:<\/sup>)?/g,
      ""
    )
    .replace(
      /\[(?:(?:GDCP\d)|(?:GDCP8.5)|(?:RDK)|(?:UCD)|(?:IDF)|(?:TPI))\]/g,
      ""
    );
  document.getElementById("toc").innerHTML = content;
});

/*** Module de progression ***/
var username;
if (!mw.config.get("wgPageName").includes("Utilisateur") && !mw.config.get("wgPageName").includes("Utilisatrice") && !mw.config.get("wgPageName").includes("User")) { username = mw.config.get("wgUserName"); }
else {
  username = mw.config
    .get("wgPageName")
    .split("/")[0]
    .split(":")
    .slice(1)
    .join(":");
}

// Texte et image de présentation
function FoxfireTexte(text, imageUrl, imageAlt) {
  var imageWrapper = document.createElement("div");
  imageWrapper.className = "center";
  var imageDiv = document.createElement("div");
  imageDiv.className = "floatnone";
  var imageLink = document.createElement("a");
  imageLink.href = imageUrl;
  imageLink.className = "image";
  var image = document.createElement("img");
  image.alt = imageAlt;
  image.src = imageUrl;
  image.loading = "lazy";
  image.width = 150;
  image.height = 150;
  imageLink.appendChild(image);
  imageDiv.appendChild(imageLink);
  imageWrapper.appendChild(imageDiv);
  var textElement = document.createElement("center");
  textElement.style.fontSize = "larger";
  textElement.style.textAlign = "center";
  textElement.innerHTML = "<b>" + text + "</b>";

  imageWrapper.appendChild(textElement);
  return imageWrapper;
}

// Sélectionner le niveau
function trouverNiveau(element, nombre) {
  var replacementElement;
  var number = parseInt(nombre);
  if (number === 0) {
    // Texte spécifique pour le niveau "Bienvenue à Foxfire"
    var foxfireHTML;
    if (username !== mw.config.get("wgUserName")) {
      foxfireHTML =
        '<center style="text-align:center;"><div class="center"><div class="floatnone"><a href="https://static.wikia.nocookie.net/meltan/images/b/ba/Foxfire_logo.png/revision/latest?cb=20230831212624&format=original&path-prefix=fr" class="image"><img alt="Niveau 0" src="https://static.wikia.nocookie.net/meltan/images/b/ba/Foxfire_logo.png/revision/latest?cb=20230831212624&format=original&path-prefix=fr" loading="lazy" width="150" height="150"></a></div><center style="font-size: larger; text-align: center;"><b>Niveau 0</b></center></div></center><p>' +
        username +
        " vient d'arriver sur le wiki et n'a donc pas encore effectué sa première modification pour intégrer le niveau 1 et commencer sa scolarité à Foxfire.</p>";
    } else {
      foxfireHTML =
        '<center style="text-align:center;"><div class="center"><div class="floatnone"><a href="https://static.wikia.nocookie.net/meltan/images/b/ba/Foxfire_logo.png/revision/latest?cb=20230831212624&format=original&path-prefix=fr" class="image"><img alt="Bienvenue à Foxfire" src="https://static.wikia.nocookie.net/meltan/images/b/ba/Foxfire_logo.png/revision/latest?cb=20230831212624&format=original&path-prefix=fr" loading="lazy" width="150" height="150"></a></div><center style="font-size: larger; text-align: center;"><b>Bienvenue à Foxfire</b></center></div></center><p>Bienvenue sur le wiki. Effectuez votre première modification pour intégrer le niveau 1 et commencez votre scolarité à Foxfire&nbsp;!</p>';
    }
    // Faire disparaître le texte des niveaux 1 et plus
    var foxfireCommence = document.querySelector(".foxfire-commencé");
    if (foxfireCommence) {
      foxfireCommence.style.display = "none";
    }
    // Insérer le HTML dans l'élément
    element.innerHTML = foxfireHTML;
  } else if (number > 0 && number <= 50) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 1",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/5/51/Gremlin-1.png/revision/latest?cb=20190202222004&format=original",
        "Niveau 1"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 1",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/5/51/Gremlin-1.png/revision/latest?cb=20190202222004&format=original",
        "Niveau 1"
      );
    }
  } else if (number > 50 && number <= 100) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 2",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/d/d4/Halcyon2.png/revision/latest?cb=20190202222548&format=original",
        "Niveau 2"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 2",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/d/d4/Halcyon2.png/revision/latest?cb=20190202222548&format=original",
        "Niveau 2"
      );
    }
  } else if (number > 100 && number <= 200) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 3",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/e/ef/Mastodon.png/revision/latest?cb=20190202222830&format=original",
        "Niveau 3"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 3",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/e/ef/Mastodon.png/revision/latest?cb=20190202222830&format=original",
        "Niveau 3"
      );
    }
  } else if (number > 200 && number <= 350) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 4",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/c/c7/Dragon.png/revision/latest?cb=20190202223141&format=original",
        "Niveau 4"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 4",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/c/c7/Dragon.png/revision/latest?cb=20190202223141&format=original",
        "Niveau 4"
      );
    }
  } else if (number > 350 && number <= 500) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 5",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/a/ae/Tiger.png/revision/latest?cb=20190202223422&format=original",
        "Niveau 5"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 5",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/a/ae/Tiger.png/revision/latest?cb=20190202223422&format=original",
        "Niveau 5"
      );
    }
  } else if (number > 500 && number <= 750) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 6",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/7/7d/Yeti.png/revision/latest?cb=20190202223641&format=original",
        "Niveau 6"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 6",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/7/7d/Yeti.png/revision/latest?cb=20190202223641&format=original",
        "Niveau 6"
      );
    }
  } else if (number > 750 && number <= 1000) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 7",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/3/39/Flareadon.png/revision/latest?cb=20190202223922&format=original",
        "Niveau 7"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 7",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/3/39/Flareadon.png/revision/latest?cb=20190202223922&format=original",
        "Niveau 7"
      );
    }
  } else if (number > 1000 && number <= 1500) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est au Niveau 8",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/7/7e/Unicorn.png/revision/latest?cb=20190202224206&format=original",
        "Niveau 8"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes au Niveau 8",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/7/7e/Unicorn.png/revision/latest?cb=20190202224206&format=original",
        "Niveau 8"
      );
    }
  } else if (number > 1500 && number <= 2000) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est diplômé(e) de Foxfire",
        "https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/c/c0/Dipl%C3%B4m%C3%A9Badge.png/revision/latest?cb=20210214102526&path-prefix=fr",
        "Diplômé(e) de Foxfire"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes diplômé(e) de Foxfire",
        "https://static.wikia.nocookie.net/gardiens-des-cites-perdue/images/c/c0/Dipl%C3%B4m%C3%A9Badge.png/revision/latest?cb=20210214102526&path-prefix=fr",
        "Diplômé(e) de Foxfire"
      );
    }
  } else if (number > 2000) {
    if (username !== mw.config.get("wgUserName")) {
      replacementElement = FoxfireTexte(
        username + " est Mentor à Foxfire",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/d/d9/Mentorpic.png/revision/latest?cb=20190310100116",
        "Mentor"
      );
    } else {
      replacementElement = FoxfireTexte(
        "Vous êtes Mentor à Foxfire",
        "https://vignette.wikia.nocookie.net/lost-cities-keeper/images/d/d9/Mentorpic.png/revision/latest?cb=20190310100116",
        "Mentor"
      );
    }
  }
  // Remplacer valeur par niveau
  if (replacementElement) {
    element.innerHTML = "";
    element.appendChild(replacementElement);
  }
}

// Ajout d'un timeout pour laisser le temps au RailModule de se charger
setTimeout(function () {
  $.ajax({
    url: mw.util.wikiScript("api"),
    data: {
      action: "parse",
      format: "json",
      text: "{{Special:Editcount/" + username + "/0}}",
      prop: "text",
      disablepp: 1,
    },
    dataType: "json",
  }).then(function (json) {
    var modifs = $(json.parse.text["*"]).text().replace(/[^\d]/g, "");
    var compteurDeModifications = modifs;
    if (modifs) {
      var palier;
      if (modifs < 20) {
        palier = 20;
      } else if (modifs < 50) {
        palier = 50;
      } else if (modifs < 100) {
        palier = 100;
      } else if (modifs < 200) {
        palier = 200;
      } else if (modifs < 350) {
        palier = 350;
      } else if (modifs < 500) {
        palier = 500;
      } else if (modifs < 750) {
        palier = 750;
      } else if (modifs < 1000) {
        palier = 1000;
      } else if (modifs < 1500) {
        palier = 1500;
      } else if (modifs < 2000) {
        palier = 2000;
      } else if (modifs < 2500) {
        palier = 2500;
      } else if (modifs < 3000) {
        palier = 3000;
      } else if (modifs < 4000) {
        palier = 4000;
      } else {
        palier = 10000;
      }
      var calc = (modifs / palier) * 100,
        color;
      if (calc <= 25) {
        color = "red";
      } else if (calc <= 50) {
        color = "orange";
      } else if (calc <= 75) {
        color = "yellow";
      } else {
        color = "green";
      }
      document.querySelectorAll(".progressmodifs").forEach(function (item) {
        var newItem = document.createElement("div");
        newItem.innerHTML =
          "<center>" +
          "<center>" +
          Math.round(calc) +
          "% de " +
          palier +
          '</center>\n<center><div style="width: 75%; height: 20px; background-image: linear-gradient(to right, ' +
          color +
          " " +
          calc +
          '%, #FFF 0%); border: 3px solid #3A3A3A"></div></center>';
        item.appendChild(newItem);
      });
      // Sélectionner tous les éléments avec la classe "niveaux-foxfire"
      document.querySelectorAll(".niveaux-foxfire").forEach(function (element) {
        trouverNiveau(element, modifs);
      });
      document.querySelectorAll(".mainmodifs").forEach(function (mainmodifs) {
        if (username !== mw.config.get("wgUserName")) {
          mainmodifs.innerText =
            mainmodifs.innerText
              .replace("Vous avez", username + " a")
              .replace("des", compteurDeModifications.toString())
              .split(".")[0] +
            ". Plus que " +
            (palier - modifs).toString() +
            " modifications des articles avant le niveau suivant !";
        } else {
          mainmodifs.innerText = mainmodifs.innerText.replace(
            "des",
            compteurDeModifications.toString()
          );
        }
        mainmodifs.appendChild(mainmodifs);
      });
    }
  });
}, 4000);

/*** Discord ***/
mw.hook("wikipage.content").add(function ($content) {
  if (!mw.util.$content) {
    return;
  }
  mw.util.$content.find(".dchat").each(function () {
    var $this = $(this),
      widget = true,
      css = {
        width: "100%",
        height: "800",
        border: 0,
      };
    $this.html(
      $("<iframe>", {
        src: "https://e.widgetbot.io/channels/719085354514251877/719215577994100766",
        css: css,
      })
    );
  });
});

/*** Discuter avec Messenger sur Messeger ([[Spécial:ShannonMessenger]]) ***/
(function ($, mw) {
  if (mw.config.get("wgPageName") != "Spécial:ShannonMessenger" && mw.config.get("wgPageName") != "Special:ShannonMessenger") {
    return;
  }

  var data = {
    RANDOM1: {
      initial:
        "Oh, bonjour chers lecteurs ! Sachez que je vous Keefe ! (Keefe, Kiffe... bon je retourne écrire moi.)",
      options: [],
      response: [],
    },
    RANDOM2: {
      initial:
        "Pourquoi l'impératrice Pernille ne joue pas aux jeux vidéos ? Parce qu'elle n'arrête pas de troller tout le monde !",
      options: [],
      response: [],
    },
    RANDOM3: {
      initial:
        "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
      options: [],
      response: [],
    },
    RANDOM4: {
      initial:
        "Saviez-vous que Sandor avait été viré de son travail de cuisinier ? En effet, à chaque fois qu'il sortait un ingrédient du placard, il le gob-elin-ait !",
      options: [],
      response: [],
    },
    RANDOM5: {
      initial:
        "Pourquoi dit-on que les elfes sont suisses ? Parce qu'ils font partie de la confédération elf-étique !",
      options: [],
      response: [],
    },
    RANDOM6: {
      initial:
        "Que fait Verdi quand il n'arrive pas à choisir ce qu'il va manger ? Un tirajosaure",
      options: [],
      response: [],
    },
    RANDOM7: {
      initial:
        "Oh non, la porte du sanctuaire est cassée ! Comment la réparer ? Ah, je sais : utilisons une argenta-visse !",
      options: [],
      response: [],
    },
    RANDOM8: {
      initial:
        "Arrêter d'écrire les Gardiens des Cités Perdues ?! Ah sha non !",
      options: [],
      response: [],
    },
    RANDOM9: {
      initial:
        "Quelle chanson de Dalida les lutins adorent-ils par dessus tout ? Iggy l'amoroso !",
      options: [],
      response: [],
    },
    RANDOM10: {
      initial:
        "Je vis avec plein de chats chez moi. En même temps, c’est logique, il y a « Sha » dans mon prénom !",
      options: [],
      response: [],
    },
    RANDOM11: {
      initial: "Voulez-vous que je vous apprenne à écrire un article ?",
      options: ["Oui ! ", "Non."],
      response: [
        "Alors demandez à l’équipe administrative, ou lisez <a href='https://gdcp.fandom.com/fr/Aide:Contribuer_sur_le_wiki'>ce truc</a> Pour savoir comment faire ! Attendez, vous croyiez vraiment que j’allais vous l’expliquer moi-même ?",
        "Bon ben au revoir alors !",
      ],
    },
    RANDOM12: {
      initial:
        "Avez-vous entendu parler du tome 11, qui sort l’année prochaine ?",
      options: ["Bien sûr !"],
      response: [
        "Incroyable, parce que je suis la dame qui écrit cette série, et je n’en ai jamais entendu parler !",
      ],
    },
    RANDOM13: {
      initial: "Saviez-vous que le tome 10 sort en automne prochain ?",
      options: ["J’ai hâte !"],
      response: ["Poisson d’avril haha, il sort en 2039 !"],
    },
    RANDOM14: {
      initial:
        "Saviez-vous qu’il y a trois emojis à mon effigie sur le <a href='https://dsc.gg/wikigdcp'>Discord du wiki</a> ? Ils doivent vraiment m’adorer ! ",
      options: [],
      response: [],
    },
    RANDOM15: {
      initial: "Dis, tu me trouves sympa ?",
      options: ["T’es ma BFF, Shannon"],
      response: [
        "Wow, merci beaucoup ! Tiens, <a href='https://gdcp.fandom.com/fr/Spécial:Ma_page?action=edit&preload=Modèle:Cadeau_Shannon&section=new'>voici un cadeau</a> pour te remercier !",
      ],
    },
    RANDOM16: {
      initial: "Toc toc",
      options: ["Qui est là ?"],
      response: ["Pas le tome 10 en tout cas !"],
    },
    RANDOM17: {
      initial: "Connais-tu l'histoire de l'elfe qui faisait un saut lumineux ?",
      options: ["Non"],
      response: ["Trop tard, il est parti !"],
    },
    RANDOM18: {
      initial: "Tu aimes les paillettes ?",
      options: ["Oui", "Non"],
      response: [
        "Oh moi aussi, j'adore ! Faisons un club !",
        "Tu as tort, les paillettes c'est la vie !",
      ],
    },
    RANDOM19: {
      initial: "Toc toc",
      options: ["Qui est là ?"],
      response: ["Encore un nouveau tome dans 18 mois !"],
    },
  };
  var conversation = null;
  var key = "RANDOM" + (Math.floor(Math.random() * 19) + 1);
  conversation = data[key];

  var $div = $(
    '<div id="full-shannon"><div id="shannon-speech"><div id="message-container-pos"><div id="commencer-bas"><div id="full-message-container"><div id="shannon-speech-texte"></div></div></div></div></div><div id="shannon-image-pos"><div id="shannon-image-container"><div id="shannon-image"></div></div></div></div>'
  );
  var $buttons = $(
    '<div id="shannon-speech-boutons" style="font-family: Rubik;font-size: 14px;position: relative;text-align: center;border-top: 1px solid #C2C2C2;bottom: 0;margin: 7px 7px 10px 7px"></div>'
  );
  var $button = $(
    '<button class="shannon-bouton" style="background-color: #fff;border: 1px solid #C2C2C2;border-radius: 3px;padding: 5px 12px;margin: 10px 5px 0 5px">No</button>'
  );
  mw.log(conversation.initial);
  var $contentContainer = $("#content"),
    $pageTitle = $(".page-header__title");
  $contentContainer.empty();
  $pageTitle.text("Discuter avec Messenger sur Messenger");
  $contentContainer.append($div);
  $("#shannon-speech-texte").html(conversation.initial);
  if (conversation.options.length > 0) {
    $("#shannon-speech-texte").after($buttons);
  }
  var onClick = function (event) {
    $("#shannon-speech-texte").html($(event.target).attr("data-response"));
    $("#shannon-speech-boutons").remove();
  };
  for (var i = 0; i < conversation.options.length; i++) {
    var butt = $button.clone();
    butt.text(conversation.options[i]);
    butt.attr("data-response", conversation.response[i]);
    butt.click(onClick);
    $("#shannon-speech-boutons").append(butt);
  }
})(jQuery, mw);