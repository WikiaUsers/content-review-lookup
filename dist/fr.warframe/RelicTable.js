// Permet de définir automatiquement l'image des boutons de relique
$(document).ready(function relicType() {
  // définir les liens d'images pour chaque relique :
  var intactImg =
    "https://static.wikia.nocookie.net/warframe/images/5/5a/Relique-Upg0.png/revision/latest?cb=20210824011031&path-prefix=fr";
  var exceptionnalImg =
    "https://static.wikia.nocookie.net/warframe/images/e/e6/Relique-Upg1.png/revision/latest?cb=20210824011050&path-prefix=fr";
  var flawlessImg =
    "https://static.wikia.nocookie.net/warframe/images/8/84/Relique-Upg2.png/revision/latest?cb=20210824011106&path-prefix=fr";
  var radiantImg =
    "https://static.wikia.nocookie.net/warframe/images/0/00/Relique-Upg3.png/revision/latest?cb=20210824011125&path-prefix=fr";

  // définir les type d'ID de relique
  var relicBtn = ".upg-btns span";

  // intact
  var relicIntact = ".upg-btns span#relic-intact-button";
  // exceptional
  var relicExceptional = ".upg-btns #relic-exceptional-button";
  // flawless
  var relicFlawless = ".upg-btns #relic-flawless-button";
  // radiant
  var relicRadiant = ".upg-btns #relic-radiant-button";

  // conditions
  if ($(relicBtn).is("#relic-intact-button")) {
    $(relicIntact).css("background-image", "url(" + intactImg + ")");
  };
  if ($(relicBtn).is("#relic-exceptional-button")) {
    $(relicExceptional).css("background-image", "url(" + exceptionnalImg + ")");
  };
  if ($(relicBtn).is("#relic-flawless-button")) {
    $(relicFlawless).css("background-image", "url(" + flawlessImg + ")");
  };
  if ($(relicBtn).is("#relic-radiant-button")) {
    $(relicRadiant).css("background-image", "url(" + radiantImg + ")");
  };
});



// exceptionnal func
$(document).ready(function exceptionnal() {
    // sur hover de ".upg-btns .upg1", déclenche les fonctions d'ajout de classe "exceptionnal" / "flawless" / "radiant",
    // Classes qui possèdent de la CSS embarquée,
    // Les valeurs des pseudo-elements sont déjà enregistrées (ligne "Relic reward" dans la stylesheet)
    $(".upg-btns .upg1").hover(
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).addClass("exceptionnal");
        },
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).removeClass("exceptionnal");
        }
    );
});

// flawless func
$(document).ready(function flawless() {
    $(".upg2").hover(
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).addClass("flawless");
        },
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).removeClass("flawless");
        }
    );
});

// radiant func
$(document).ready(function radiant() {
    $(".upg3").hover(
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).addClass("radiant");
        },
        function () {
            $(
                ".relic-box.one, .relic-box.two, .relic-box.three, .relic-box.four, .relic-box.five, .relic-box.six"
            ).removeClass("radiant");
        }
    );
});