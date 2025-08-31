/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
mw.loader.using('mediawiki.util', function() {
    console.log("Script MediaWiki chargé et prêt !");

    const collapsible = document.querySelector(".collapsible-section");
    if (collapsible && !collapsible.classList.contains("open-section")) {
        console.log("Collapsible trouvé, ouverture simulée.");

        collapsible.classList.add("open-section");
        collapsible.setAttribute("aria-pressed", "true");
        collapsible.setAttribute("aria-expanded", "true");

        const content = collapsible.querySelector(".collapsible-content");
        if (content) {
            content.style.display = "block";
            console.log("Contenu affiché.");
        }
    }
});

// Traducteur Paztek compatible Desktop + Mobile (navigateur web)
mw.hook("wikipage.content").add(function($content) {
    if (mw.config.get("wgPageName") !== "Traducteur_Paztek") return;
    if ($("#traducteur-paztek").length) return;
   const dictionnaire = {
   	tonalites : {
      "Apissa": "Ton d’extrême politesse",
      "Balla": "Ton amoureux",
      "Ballu": "Ton de séduction",
      "Bradu": "Amertume",
      "Chuba": "Peur",
      "Delulla": "Méfiance",
      "Galla": "Ton enthousiaste",
      "Lulla": "Incompréhension",
      "Nabala": "Ton illuminé (religieux)",
      "Nalla": "Ton neutre",
      "Niapu": "Dégoût",
      "Pravuk": "Supplication",
      "Tachuba": "Horreur",
      "Tatumu": "Grande tristesse",
      "Tchala": "Ton amical / Salut",
      "Teg": "Fatigue",
      "Tsuma": "Étonnement",
      "Tumu": "Tristesse",
      "Turtta": "Ton impérieux / Ordre",
      "Varch": "Hostilité",
      "Vina": "Inquiétude",
      "Vizteg": "Épuisement",
      "Vurtag": "Détermination"
    },
    adjectifs: {
      "Berk": "Vert",
      "Jon": "Sanguin",
      "Madouf": "Affamé (lié à manger)",
      "Teg": "Fatigué",
      "Vizteg": "Épuisé"
    },
    objets: {
      "Pada": "Crâ",
      "Gali": "Crocodaille",
      "Tikka": "Soleil",
      "Shibal": "Lune / Mère",
      "Chaklaz": "Piraniak",
      "Pazteka": "Pastèque",
      "Kagali Shibal": "Mère Ecailleuse",
      "Malavin": "Mouette",
      "Zofiau": "Gupin",
      "Omin": "Koalak",
      "Kaztek": "Couvre-chef à visière",
      "Dodoune": "Plume de dodu",
      "Kakapikez": "Moskitoz",
      "Araknaz": "Araknes",
      "Chariza": "Nourriture",
      "Batchi": "Livre",
      "Dzabud": "Dieu",
      "Flora": "Plante/Fleur",
      "Fratra": "Frère",
      "Frutta": "Fruit",
      "Frutanda": "Citrouille",
      "Illumina nui": "Île de l'Ascension",
      "Jo": "Sang",
      "Mako": "Maison",
      "Parta": "Pierre",
      "Partunra": "Pierre tombale",
      "Patriak": "Peuple",
      "Pazaka": "Portail magique",
      "Pazako": "Accordéon",
      "Plok": "Eau",
      "Poti": "Pied",
      "Pozion": "Potion",
      "Pradik": "Reclus du monde",
      "Sabra": "Lieu",
      "Sabrunra": "Cimetière",
      "Skruta": "Nuage",
      "Sobo": "Ombre",
      "Stutan": "Clef",
      "Tabou": "Temple",
      "Tinka": "Chose",
      "Tink": "Petite chose",
      "Tita": "Lit",
      "Tobika": "Statue",
      "Vadizek": "Prêtre(sse)",
      "Vidaba": "Soufre",
      "Vidana": "Aventurier",
      "Vida": "Vie",
      "Zarbra": "Esprit",
      "Zo": "Bientôt"
    },
    verbes: {
      "Adjada": "Commencer / Approcher",
      "Aela": "S'envoler",
      "Aruta": "Aider",
      "Bakama": "Chercher",
      "Bananiab": "Trouver",
      "Bartina": "Récompenser",
      "Biadoub": "Dormir",
      "Bifak": "Sentir (odeur)",
      "Birmak": "Savoir",
      "Birna": "Créer",
      "Blataro": "Être chassé",
      "Bolab": "Boire",
      "Chabla": "Chanter",
      "Chistat": "Vivre",
      "Chizarba": "Hanter",
      "Chubaku": "Effrayer",
      "Coppoki": "Remercier",
      "Djaba": "Ciel",
      "Djaplok": "Pleuvoir",
      "Floracha": "Pousser (plante)",
      "Ille": "Soigner",
      "Jariva": "Souffler du tumulte",
      "Jaruba": "Vent de la peur",
      "Kabasko": "Préserver",
      "Kakiba": "Être / Se trouver",
      "Kanif": "Couper",
      "Kasmak": "Vouloir",
      "Kaspik": "Comprendre",
      "Kazkoul": "Tuer",
      "Krissa": "Crier",
      "Krousti": "Casser",
      "Lakira": "Grandir",
      "Loki": "Voir",
      "Lutima": "Libérer",
      "Madana": "Amener / Accompagner",
      "Madouf": "Manger",
      "Markat": "Fonctionner",
      "Mataka": "Jouer de la musique",
      "Milak": "Toucher",
      "Mutatcha": "Danser",
      "Nass": "Je",
      "Niab": "Faire",
      "Niandda": "Partir",
      "Niandem": "Arriver",
      "Niandemko": "Retourner",
      "Niaparu": "Puer",
      "Nibak": "Mentir",
      "Nindara": "Connaître",
      "Parida": "Détester",
      "Parikaz": "Se battre",
      "Parama": "Échapper",
      "Pakal": "Être inconnu",
      "Poki": "Remercier",
      "Potrot": "Venir de",
      "Radja": "Voler (s’approprier)",
      "Ranik": "Entendre",
      "Rida": "Aimer",
      "Rokosok": "Rejoindre",
      "Sartan": "Envahir",
      "Shitask": "Prendre garde",
      "Skrakina": "Brûler",
      "Tachipa": "Dire / Parler",
      "Talab": "Prier",
      "Talik": "Lire",
      "Taraba": "Maudire",
      "Tatarka": "Empoisonner",
      "Tibab": "Avoir",
      "Tindara": "Connaître (personne)",
      "Torimak": "Offrir",
      "Varana": "Souffler",
      "Variga": "Réussir",
      "Volek": "Choisir",
      "Vurtagama": "Inciter"
    },
    grammaire: {
      "Bor": "Négation (fin de phrase)",
      "Jadi": "Marque du passé",
      "Tur": "Marque du futur",
      "Til": "Interrogation",
      "Z/Ez": "Pluriel",
      "Ko": "Réitération"
    },
    nombres: { "Pa": 1, "Tsu": 2, "Batti": 3, "Vare": 4, "Chad": 5, "Sata": 6, "Sate": 7, "Po": 8, "Pavera": 10 },
    directions: { "Nar": "Nord", "Sad": "Sud", "Etta": "Est", "Otta": "Ouest" },
    saisons: { "Tafruttaz": "Printemps", "Takka": "Été", "Takoz": "Automne", "Taratch": "Hiver" }
  }


    // Interface avec input + datalist (autocomplétion)
    const traducteur = $(`
        <div id="traducteur-paztek" style="padding:1em; border:2px solid #444; border-radius:10px; background:#f9f9f9; margin:1em 0;">
          <h2>Traducteur Paztek</h2>

          <label>Tonalité :</label><br>
          <input list="tonalite" id="input-tonalite">
          <datalist id="tonalite"></datalist><br>

          <label>Adjectif :</label><br>
          <input list="adjectif" id="input-adjectif">
          <datalist id="adjectif"></datalist><br>

          <label>Objet (COD/COI) :</label><br>
          <input list="objet" id="input-objet">
          <datalist id="objet"></datalist><br>

          <label>Verbe :</label><br>
          <input list="verbe" id="input-verbe">
          <datalist id="verbe"></datalist><br>

          <label>Sujet :</label><br>
          <input list="sujet" id="input-sujet">
          <datalist id="sujet"></datalist><br>

          <label>Mot de grammaire (facultatif) :</label><br>
          <input list="grammaire" id="input-grammaire">
          <datalist id="grammaire"></datalist><br>

          <br>
          <button id="btn-traduire" style="margin-top:0.5em; padding:0.4em 0.8em; border-radius:5px; border:1px solid #333; background:#ddd; cursor:pointer;">
            Traduire
          </button>

          <p><b>Phrase en Paztek :</b> <span id="resultat-paztek" style="color:#006600;"></span></p>
          <p><b>Traduction en français :</b> <span id="resultat-francais" style="color:#0000aa;"></span></p>
        </div>
    `);

    $content.prepend(traducteur);

    // Remplissage des datalist
    function remplirDatalist(id, obj) {
        const dl = $(`#${id}`);
        dl.empty();
        Object.entries(obj).forEach(([mot, trad]) => {
            dl.append(`<option value="${mot}">${mot} (${trad})</option>`);
        });
    }

    remplirDatalist("tonalite", dictionnaire.tonalites);
    remplirDatalist("adjectif", dictionnaire.adjectifs);
    remplirDatalist("objet", dictionnaire.objets);
    remplirDatalist("verbe", dictionnaire.verbes);
    remplirDatalist("sujet", dictionnaire.objets);
    remplirDatalist("grammaire", dictionnaire.grammaire);

// Traduction
$("#btn-traduire").click(function() {
    const tonalite = $("#input-tonalite").val().trim();
    const adjectif = $("#input-adjectif").val().trim();
    const objet = $("#input-objet").val().trim();
    const verbe = $("#input-verbe").val().trim();
    const sujet = $("#input-sujet").val().trim();
    const motGrammaire = $("#input-grammaire").val().trim();

    if (!tonalite || !objet || !verbe || !sujet) {
        $("#resultat-paztek").text("⚠️ Il manque des éléments !");
        $("#resultat-francais").text("");
        return;
    }

    // Phrase Paztek (simple concaténation comme avant)
    let phrasePaztek = tonalite;
    if (adjectif) phrasePaztek += " " + adjectif;
    phrasePaztek += " " + objet + " " + verbe + " " + sujet;
    if (motGrammaire) phrasePaztek += " " + motGrammaire;

    // Traduction FR
    let tonaliteFr = dictionnaire.tonalites[tonalite] || tonalite;
    let sujetFr = dictionnaire.objets[sujet] || sujet;
    let verbeFr = dictionnaire.verbes[verbe] || verbe;
    let objetFr = dictionnaire.objets[objet] || objet;
    let adjectifFr = dictionnaire.adjectifs[adjectif] || adjectif;

    let phraseFr = sujetFr + " " + verbeFr + " ";
    if (adjectifFr) phraseFr += "une " + objetFr + " " + adjectifFr;
    else phraseFr += "une " + objetFr;

    if (motGrammaire) phraseFr += " " + (dictionnaire.grammaire[motGrammaire] || motGrammaire);

    phraseFr = "(Intonation : " + tonaliteFr + ") " + phraseFr;

    // Affichage
    $("#resultat-paztek").text(phrasePaztek);
    $("#resultat-francais").text(phraseFr);
});

});