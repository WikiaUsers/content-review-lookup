(function() {
  const preferredMaxWidth = "700px"; // this is for the width of the image

  function waitForTierlistImage(callback) {
    const img = document.querySelector(".tierlist-image img");
    if (img) callback(img);
    else setTimeout(() => waitForTierlistImage(callback), 100);
  }

  waitForTierlistImage(previewImg => {
    const container = previewImg.closest(".tierlist-image");

    const originalOffset = container.getBoundingClientRect().top + window.scrollY;
    const offset = 0.00 * document.body.scrollHeight;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      container.style.position = "relative";
      container.style.top = (scrollY > originalOffset - offset) ? (scrollY - originalOffset + offset) + "px" : "0px";
    });
    
    previewImg.style.maxWidth = preferredMaxWidth;
    previewImg.style.height = "auto";
    previewImg.style.display = "block";
    previewImg.style.float = "right";
    previewImg.style.marginLeft = "1em";

    let captionDiv = container.querySelector(".lightbox-caption");
    if (!captionDiv) {
      captionDiv = document.createElement("div");
      captionDiv.className = "lightbox-caption";
      container.appendChild(captionDiv);
    }
    captionDiv.textContent = "";

    const captionLink = document.createElement("a");
    captionLink.href = previewImg.src;
    captionLink.target = "_blank";
    captionLink.textContent = previewImg.title || "View Image";
    captionDiv.appendChild(captionLink);

    const tierlist = document.getElementById("tierlist");
    if (!tierlist) return;
    const ul = tierlist.querySelector("ul");
    if (!ul) return;

    const storedFavs = JSON.parse(localStorage.getItem("tierlistFavorites") || "[]");

    const items = [...ul.querySelectorAll("li")];
    items.forEach((li, index) => li.dataset.originalIndex = index);

    storedFavs.forEach(favText => {
      const li = items.find(li => li.textContent.trim() === favText);
      if (li) ul.insertBefore(li, ul.firstChild);
    });

    items.forEach((li, index) => {
      const text = li.textContent.trim();
      li.textContent = "";

      const button = document.createElement("button");
      button.textContent = text;
      button.style.marginRight = "0.5em";
      button.style.cursor = "pointer";
      button.style.fontSize = "20px";

      button.addEventListener("click", () => {
        const fileName = text + ".png";
        const apiUrl = `https://undertale-timeline-corruption.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json`;
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
            const page = Object.values(data.query.pages)[0];
            if (page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
              previewImg.src = page.imageinfo[0].url;

              previewImg.style.maxWidth = preferredMaxWidth;
              previewImg.style.height = "auto";
              previewImg.style.display = "block";
              previewImg.style.float = "right";
              previewImg.style.marginLeft = "1em";

              captionLink.href = previewImg.src;
            }
          })
          .catch(err => console.error("Error fetching image:", err));
      });

      const star = document.createElement("span");
      star.innerHTML = "☆";
      star.style.cursor = "pointer";
      star.style.fontSize = "24px";
      star.style.marginLeft = "0.5em";
      star.style.userSelect = "none";
      star.style.color = "orange";

      star.addEventListener("mouseenter", () => { star.style.color = "yellow"; });
      star.addEventListener("mouseleave", () => { star.style.color = "orange"; });

      if (storedFavs.includes(text)) {
        star.classList.add("favorited");
        star.innerHTML = "★";
      }

      star.addEventListener("click", e => {
        e.stopPropagation();
        star.classList.toggle("favorited");
        star.innerHTML = star.classList.contains("favorited") ? "★" : "☆";

        let favs = JSON.parse(localStorage.getItem("tierlistFavorites") || "[]");
        if (star.classList.contains("favorited")) {
          favs.push(text);
          ul.insertBefore(li, ul.firstChild);
        } else {
          favs = favs.filter(f => f !== text);

          const allLis = [...ul.querySelectorAll("li")].filter(l => l !== li);
          const targetIndex = parseInt(li.dataset.originalIndex, 10);
          let inserted = false;
          for (let i = 0; i < allLis.length; i++) {
            const otherIndex = parseInt(allLis[i].dataset.originalIndex, 10);
            if (otherIndex > targetIndex) {
              ul.insertBefore(li, allLis[i]);
              inserted = true;
              break;
            }
          }
          if (!inserted) ul.appendChild(li);
        }
        localStorage.setItem("tierlistFavorites", JSON.stringify(favs));
      });

      li.appendChild(button);
      li.appendChild(star);
    });
  });
})();