fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=0&single=true&output=csv")
  .then(r => r.text())
  .then(csv => {
    const stats = {};
    const pantheons = {};
    const lines = csv.split("\n");
    lines.slice(1, 38).forEach(line => {
      const cols = line.split(",");
      if (cols[0] && cols[5]) {
        const pts = parseInt(cols[5].trim());
        if (!isNaN(pts)) {
          const nom = cols[0].trim();
          stats[nom] = pts;
          pantheons[nom] = cols[8] ? cols[8].trim() : "Sovereign";
        }
      }
    });
    const avatars = {
      "Judgment":   "https://imgur.com/ItngIkq.png",
      "Liberty":    "https://imgur.com/bUq30Me.png",
      "Aphrodite":  "https://imgur.com/akBur5s.png",
      "Science":    "https://imgur.com/uymJPHh.png",
      "Artemis":    "https://imgur.com/q9BT9Kt.png",
      "Persephone": "https://imgur.com/maaJy3t.png",
      "Athena":     "https://imgur.com/Nni0Ghn.png",
      "Manifest":   "https://imgur.com/4snkP7t.png",
      "Hades":      "https://imgur.com/sJlepBN.png",
      "NewMedia":   "https://imgur.com/ApmwuWC.png",
      "Entite":     "https://imgur.com/kcmTK8R.png",
      "Ares":       "https://imgur.com/MZP3G81.png",
      "Demeter":    "https://imgur.com/Tzah6O3.png",
      "Wrath":      "https://imgur.com/7LYlt1N.png"
    };
    const avatarDefault = "https://imgur.com/OifGbh4.png";
    const conteneur = document.getElementById("accueil-cartes");
    if (!conteneur) return;

    const ordre = ["Sovereign", "Olympiens", "Shemning"];
    const groupes = { "Sovereign": [], "Olympiens": [], "Shemning": [] };

    Object.entries(stats).forEach(([nom, pts]) => {
      const pantheon = pantheons[nom] || "Sovereign";
      if (groupes[pantheon]) groupes[pantheon].push([nom, pts]);
      else groupes["Sovereign"].push([nom, pts]);
    });

    let html = `<div class="accueil-carousel-outer"><div class="accueil-carousel" id="accueil-carousel-unique">`;

    ordre.forEach(pantheon => {
      const divinites = groupes[pantheon];
      if (!divinites || divinites.length === 0) return;
      const classe = pantheon.toLowerCase();

      divinites.forEach(([nom, pts]) => {
        const avatar = avatars[nom] || avatarDefault;
        const url = `/fr/wiki/${nom}`;
        html += `
          <a href="${url}" class="accueil-carte ${classe}">
            <div class="accueil-carte-cercle" style="background-image:url(${avatar})"></div>
            <span class="accueil-carte-nom">${nom}</span>
            <span class="accueil-carte-pts">${pts} pts</span>
          </a>`;
      });
    });

    html += `</div></div>`;
    conteneur.innerHTML = html;

    const carousel = document.getElementById("accueil-carousel-unique");
    let vitesse = 0.6;
    let pause = false;

    carousel.addEventListener("mouseenter", () => pause = true);
    carousel.addEventListener("mouseleave", () => pause = false);

    function defiler() {
      if (!pause) {
        carousel.scrollLeft += vitesse;
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0;
        }
      }
      requestAnimationFrame(defiler);
    }
    requestAnimationFrame(defiler);
  });