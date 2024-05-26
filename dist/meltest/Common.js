/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

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