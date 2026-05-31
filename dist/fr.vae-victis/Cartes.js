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

    let html = `
      <div class="accueil-carousel-wrapper" style="
        position: relative;
        display: flex;
        align-items: center;
      ">
        <button id="carousel-btn-left" aria-label="Précédent" style="
          position: absolute; left: 8px; z-index: 10;
          background: rgba(0,0,0,0.60);
          border: none; cursor: pointer;
          color: #fff; font-size: 1.3rem;
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        ">&#8592;</button>

        <div class="accueil-carousel-outer" style="overflow: hidden; flex: 1;">
          <div class="accueil-carousel" id="accueil-carousel-unique">`;

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

    html += `
          </div>
        </div>

        <button id="carousel-btn-right" aria-label="Suivant" style="
          position: absolute; right: 8px; z-index: 10;
          background: rgba(0,0,0,0.60);
          border: none; cursor: pointer;
          color: #fff; font-size: 1.3rem;
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        ">&#8594;</button>
      </div>`;

    conteneur.innerHTML = html;

    const carousel = document.getElementById("accueil-carousel-unique");
    carousel.innerHTML += carousel.innerHTML;

    let vitesse = 0.4;
    let pause = false;
    let position = 0;
    const PAS_FLECHE = 220;

    carousel.addEventListener("mouseenter", () => pause = true);
    carousel.addEventListener("mouseleave", () => pause = false);

    const btnLeft  = document.getElementById("carousel-btn-left");
    const btnRight = document.getElementById("carousel-btn-right");

    [btnLeft, btnRight].forEach(btn => {
      btn.addEventListener("mouseenter", () => btn.style.background = "rgba(0,0,0,0.85)");
      btn.addEventListener("mouseleave", () => btn.style.background = "rgba(0,0,0,0.60)");
    });

    btnLeft.addEventListener("click", () => {
      pause = true;
      position -= PAS_FLECHE;
      if (position < 0) position += carousel.scrollWidth / 2;
      carousel.scrollTo({ left: position, behavior: "smooth" });
      setTimeout(() => pause = false, 600);
    });

    btnRight.addEventListener("click", () => {
      pause = true;
      position += PAS_FLECHE;
      if (position >= carousel.scrollWidth / 2) position -= carousel.scrollWidth / 2;
      carousel.scrollTo({ left: position, behavior: "smooth" });
      setTimeout(() => pause = false, 600);
    });

    function defiler() {
      if (!pause) {
        position += vitesse;
        if (position >= carousel.scrollWidth / 2) position = 0;
        carousel.scrollLeft = position;
      }
      requestAnimationFrame(defiler);
    }
    requestAnimationFrame(defiler);
  });