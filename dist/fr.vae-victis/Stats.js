fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS3YihqiaMrry5ksybGNmpyn3zsFVlztk6hAtdZLQj55bkxCgXhLBr29ap_tFmNq__M7Nvjt6f5ZPxQ/pub?gid=0&single=true&output=csv")
  .then(r => r.text())
  .then(csv => {
    const stats = {};
    csv.split("\n").forEach(line => {
      const cols = line.split(",");
      if (cols[0] && cols[5]) {
        stats[cols[0].trim()] = parseInt(cols[5].trim());
      }
    });

    // spans stat-X
    for (const [nom, pts] of Object.entries(stats)) {
      const el = document.getElementById("stat-" + nom);
      if (el) el.innerText = pts;
    }

    // conflits
    document.querySelectorAll(".conflit-module").forEach(module => {
      const spanA = module.querySelector(".conflit-stat-a");
      const spanB = module.querySelector(".conflit-stat-b");
      const barre = module.querySelector(".conflit-barre-g");
      const pctA  = module.querySelector(".conflit-pct-a");
      const pctB  = module.querySelector(".conflit-pct-b");
      if (!spanA || !spanB) return;
      const nomA = spanA.dataset.dieu;
      const nomB = spanB.dataset.dieu;
      const ptsA = stats[nomA] || 0;
      const ptsB = stats[nomB] || 0;
      const total = ptsA + ptsB;
      module.querySelectorAll(".conflit-stat-a").forEach(el => el.innerText = ptsA);
      module.querySelectorAll(".conflit-stat-b").forEach(el => el.innerText = ptsB);
      if (total > 0) {
        const pa = Math.round(ptsA / total * 100);
        const pb = Math.round(ptsB / total * 100);
		const largeur = Math.round(ptsA / total * 80 + 10);
        if (pctA) pctA.innerText = pa;
        if (pctB) pctB.innerText = pb;
        if (barre) barre.style.width = largeur + "%";
      }
    });

    // influences
    document.querySelectorAll(".influence-module").forEach(module => {
      const dieu = module.dataset.dieu;
      const pts = stats[dieu] || 0;
      const chiffre = module.querySelector(".influence-chiffre");
      if (chiffre) chiffre.innerText = pts;
      const barre = module.querySelector(".influence-jauge-barre");
      if (barre) barre.style.width = Math.min(pts * 2, 100) + "%";
      const niveau = module.querySelector(".influence-niveau");
      if (niveau) {
        let niv = "I";
        if (pts > 40) niv = "V";
        else if (pts > 30) niv = "IV";
        else if (pts > 20) niv = "III";
        else if (pts > 10) niv = "II";
        niveau.innerText = "Niveau " + niv;
      }
    });
    
    // Puissance
    document.querySelectorAll(".puissance-module").forEach(module => {
      const dieu = module.dataset.dieu;
      const pts = stats[dieu] || 0;

      // Barre verticale
      const barre = module.querySelector(".puissance-barre-fill");
      if (barre) barre.style.height = Math.min(pts * 2, 100) + "%";

      // Niveaux
      module.querySelectorAll(".puissance-niveau").forEach(niveau => {
        const min = parseInt(niveau.dataset.min);
        const max = parseInt(niveau.dataset.max);
        const badge = niveau.querySelector(".puissance-niveau-badge-actuel");

        niveau.classList.remove("verrouille", "actuel", "atteint");

        if (pts >= min && pts <= max) {
          niveau.classList.add("actuel");
          if (badge) badge.style.display = "";
        } else if (pts > max) {
          niveau.classList.add("atteint");
          if (badge) badge.style.display = "none";
        } else {
          niveau.classList.add("verrouille");
          if (badge) badge.style.display = "none";
        }
      });
    });

  }); // ← tout est bien à l'intérieur
  
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

    // spans stat-X
    for (const [nom, pts] of Object.entries(stats)) {
      const el = document.getElementById("stat-" + nom);
      if (el) el.innerText = pts;
    }

    // conflits
    document.querySelectorAll(".conflit-module").forEach(module => {
      const spanA = module.querySelector(".conflit-stat-a");
      const spanB = module.querySelector(".conflit-stat-b");
      const barre = module.querySelector(".conflit-barre-g");
      const pctA  = module.querySelector(".conflit-pct-a");
      const pctB  = module.querySelector(".conflit-pct-b");
      if (!spanA || !spanB) return;
      const nomA = spanA.dataset.dieu;
      const nomB = spanB.dataset.dieu;
      const ptsA = stats[nomA] || 0;
      const ptsB = stats[nomB] || 0;
      const total = ptsA + ptsB;
      module.querySelectorAll(".conflit-stat-a").forEach(el => el.innerText = ptsA);
      module.querySelectorAll(".conflit-stat-b").forEach(el => el.innerText = ptsB);
      if (total > 0) {
        const pa = Math.round(ptsA / total * 100);
        const pb = Math.round(ptsB / total * 100);
        const largeur = Math.round(ptsA / total * 80 + 10);
        if (pctA) pctA.innerText = pa;
        if (pctB) pctB.innerText = pb;
        if (barre) barre.style.width = largeur + "%";
      }
    });

    // influences
    document.querySelectorAll(".influence-module").forEach(module => {
      const dieu = module.dataset.dieu;
      const pts = stats[dieu] || 0;
      const chiffre = module.querySelector(".influence-chiffre");
      if (chiffre) chiffre.innerText = pts;
      const barre = module.querySelector(".influence-jauge-barre");
      if (barre) barre.style.width = Math.min(pts * 2, 100) + "%";
      const niveau = module.querySelector(".influence-niveau");
      if (niveau) {
        let niv = "I";
        if (pts > 40) niv = "V";
        else if (pts > 30) niv = "IV";
        else if (pts > 20) niv = "III";
        else if (pts > 10) niv = "II";
        niveau.innerText = "Niveau " + niv;
      }
    });

    // puissance
    document.querySelectorAll(".puissance-module").forEach(module => {
      const dieu = module.dataset.dieu;
      const pts = stats[dieu] || 0;
      const barre = module.querySelector(".puissance-barre-fill");
      if (barre) barre.style.height = Math.min(pts * 2, 100) + "%";
      module.querySelectorAll(".puissance-niveau").forEach(niveau => {
        const min = parseInt(niveau.dataset.min);
        const max = parseInt(niveau.dataset.max);
        const badge = niveau.querySelector(".puissance-niveau-badge-actuel");
        niveau.classList.remove("verrouille", "actuel", "atteint");
        if (pts >= min && pts <= max) {
          niveau.classList.add("actuel");
          if (badge) badge.style.display = "";
        } else if (pts > max) {
          niveau.classList.add("atteint");
          if (badge) badge.style.display = "none";
        } else {
          niveau.classList.add("verrouille");
          if (badge) badge.style.display = "none";
        }
      });
    });

    // classement graphique
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

const conteneur = document.getElementById("accueil-classement");
    if (conteneur) {
      const sorted = Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      const maxPts = sorted[0][1];

      let html = '<span class="accueil-graph-wrap">';
      sorted.forEach(([nom, pts], i) => {
        const hauteur = Math.round(pts / maxPts * 200);
        const avatar = avatars[nom] || avatarDefault;
        const url = `/fr/wiki/${nom}`;
		const pantheon = pantheons[nom] || "sovereign";
		const couleur = pantheon === "Olympiens" ? "olympiens" : pantheon === "Shemning" ? "shemning" : "sovereign";
		const medaille = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
		html += `
  <a href="${url}" class="accueil-graph-col pantheon-${couleur}" title="${nom} — ${pts} pts">
    <span class="accueil-graph-pts">${pts}</span>
    <span class="accueil-graph-avatar-wrap">
      <span class="accueil-graph-avatar" style="background-image:url(${avatar})"></span>
    </span>
    <span class="accueil-graph-barre pantheon-${couleur}" style="height:${hauteur}px"></span>
	<span class="accueil-graph-nom">${i + 1}. ${nom}</span>
  </a>`;
      });
      html += '</span>';
      conteneur.innerHTML = html;
    }


    // effet reveal lore au scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    }, { threshold: 0.2 });
    document.querySelectorAll(".accueil-lore-reveal").forEach(el => observer.observe(el));

  });