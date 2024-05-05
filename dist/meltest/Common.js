/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Barre de progression de modifications
var username = mw.config.get("wgUserName");
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
    var item = document.getElementById("progressmodifs");
    var newItem = document.createElement("div");
    newItem.innerHTML =
      "<center>Voici la progression de l'utilisateur " +
      username +
      " :\n" +
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
    document.querySelectorAll(".mainmodifs").forEach(function (mainmodifs) {
      mainmodifs.innerText = compteurDeModifications.toString();
      mainmodifs.appendChild(mainmodifs);
    });
  }
});