// Traducteur Paztek compatible Desktop + Mobile (navigateur web)
mw.hook("wikipage.content").add(function($content) {
    // Vérifie qu'on est sur la bonne page
    if (mw.config.get("wgPageName") !== "Traducteur_Paztek") return;

    // Évite d'injecter 2 fois
    if ($("#traducteur-paztek").length) return;

    const dictionnaire = {
        tonalites: { "Nalla": "neutre", "Zirra": "colère" },
        adjectifs: { "rad": "rouge", "sil": "vert" },
        objets: { "pada": "pomme", "mora": "pain" },
        verbeSujets: { "madoufnass": "je mange", "lirafnass": "je lis" }
    };

    // Construction de l'UI
    const traducteur = $(`
        <div id="traducteur-paztek" style="padding:1em; border:2px solid #444; border-radius:10px; background:#f9f9f9; margin:1em 0;">
          <h2>Traducteur Paztek</h2>

          <label>Tonalité :</label><br>
          <select id="tonalite"></select><br>

          <label>Adjectif :</label><br>
          <select id="adjectif"></select><br>

          <label>Objet :</label><br>
          <select id="objet"></select><br>

          <label>Verbe + Sujet :</label><br>
          <select id="verbeSujet"></select><br>

          <br>
          <button id="btn-traduire" style="margin-top:0.5em; padding:0.4em 0.8em; border-radius:5px; border:1px solid #333; background:#ddd; cursor:pointer;">
            Traduire
          </button>

          <p><b>Phrase en Paztek :</b> <span id="resultat-paztek" style="color:#006600;"></span></p>
          <p><b>Traduction en français :</b> <span id="resultat-francais" style="color:#0000aa;"></span></p>
        </div>
    `);

    // Injection dans le contenu (desktop et mobile web)
    $content.prepend(traducteur);

    // Fonction pour remplir les selects
    function remplirSelect(id, obj, ajouterOptionVide = true) {
        const select = $(`#${id}`);
        select.empty();
        if (ajouterOptionVide) select.append(`<option value="">--</option>`);
        Object.entries(obj).forEach(([mot, trad]) => {
            select.append(`<option value="${mot}">${mot} (${trad})</option>`);
        });
    }

    // Remplissage
    remplirSelect("tonalite", dictionnaire.tonalites, false); // obligatoire
    remplirSelect("adjectif", dictionnaire.adjectifs);
    remplirSelect("objet", dictionnaire.objets, false); // obligatoire
    remplirSelect("verbeSujet", dictionnaire.verbeSujets, false); // obligatoire

    // Traduction
    $("#btn-traduire").click(function() {
        const tonalite = $("#tonalite").val().trim();
        const adjectif = $("#adjectif").val().trim();
        const objet = $("#objet").val().trim();
        const verbeSujet = $("#verbeSujet").val().trim();

        if (!tonalite || !objet || !verbeSujet) {
            $("#resultat-paztek").text("⚠️ Il manque des éléments !");
            $("#resultat-francais").text("");
            return;
        }

        // Phrase en Paztek
        let phrasePaztek = tonalite;
        if (adjectif) phrasePaztek += " " + adjectif;
        phrasePaztek += " " + objet + " " + verbeSujet;

        // Phrase en français
        let phraseFr = dictionnaire.tonalites[tonalite] || tonalite;
        if (adjectif) phraseFr += " " + (dictionnaire.adjectifs[adjectif] || adjectif);
        phraseFr += " " + (dictionnaire.objets[objet] || objet);
        phraseFr += " " + (dictionnaire.verbeSujets[verbeSujet] || verbeSujet);

        $("#resultat-paztek").text(phrasePaztek);
        $("#resultat-francais").text(phraseFr);
    });
});