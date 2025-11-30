const enemies = {
    aqualarirugue: {
      name: "Aqualari Rugue",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/9/9f/Aqualari_Rugue.png",
      type: "Alpha",
      info: "A warrior caste born from the ancient race of the Aqualari. Abandoned by their tribe as punishment for their crime, they wander around the sea looking for a new place to settle. ",
      location: "Undine",
      locationLink: "/wiki/Undine_(Island)",
      drops: []
    },

    boar: {
      name: "Boar",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/6/6f/Boar.png",
      type: "Wild",
      info: "The wild boar is one of the most basic of the basic monsters in this vast world. The Cait Sith often uses them for majority of their needs such as food, clothes and as hunting animals.",
      location: "Global",
      locationLink: "/wiki/Islands",
      drops: []
    },
    chimecrusher: {
      name: "Chime Crusher",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/6/63/Chime_Crusher.png",
      type: "Boss",
      info: "WIP",
      location: "Pooka",
      locationLink: "/wiki/Pooka (Island)",
      drops: []
    },

    cow: {
      name: "Cow",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/8/84/Cow.png",
      type: "Wild",
      info: "Moooooooooooo....",
      location: "Global",
      locationLink: "/wiki/Islands",
      drops: []
    },

    crocodile: {
      name: "Crocodile",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/d/d6/Crocodile.png",
      type: "Wild",
      info: "...",
      location: "Global",
      locationLink: "/wiki/Islands",
      drops: []
    },

    darkling: {
      name: "Darkling",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/d/d0/Darkling.png",
      type: "Wild",
      info: "A descendant of a forgotten race. Their predecessors, in an attempt to preserve the race, went into hiding within deep caves slowly adapting to their environment. No one really knows how these “things” function however it is a common fact that they won’t leave even bones behind.",
      location: "Imp",
      locationLink: "/wiki/Imp (Island)",
      drops: []
    },

    dusthorn: {
      name: "Dusthorn",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/a/af/Dusthorn.png",
      type: "Boss",
      info: "WIP",
      location: "Cait Sith",
      locationLink: "/wiki/Cait Sith (Island)",
      drops: []
    },

    equilus: {
      name: "Equilus",
      image: "https://static.wikia.nocookie.net/grand-alfheim/images/8/86/Equilus.png",
      type: "Boss",
      info: "The Equilus is a towering, gentle herbivore known for its striking horned appearance and shimmering coat. Legends speak of the Equilus as a sacred beast, supposedly blessed by the Alfs. Alchemist and mages once sought its horns for their alchemical and magical properties, leading to near extinction in some regions. If it weren’t for Mira’s announcement for their protection, we might have seen them roam Alfeim again.",
      location: "Undine",
      locationLink: "/wiki/Undine (Island)",
      drops: []
    },
  };

  const enemyImage     = document.getElementById("enemyImage");
  const enemyType      = document.getElementById("enemyType");
  const enemyInfo      = document.getElementById("enemyInfo");
  const enemyLocation  = document.getElementById("enemyLocation");
  const enemyDrops     = document.getElementById("enemyDrops");

document.querySelectorAll(".enemy-item").forEach(item => {
  item.addEventListener("click", () => {

    const key = item.dataset.enemy;
    const e = enemies[key];
    if (!e) return;

    document.querySelectorAll(".enemy-item").forEach(i =>
      i.classList.remove("active")
    );
    item.classList.add("active");

    enemyImage.src = e.image;
    enemyImage.alt = e.name;
    enemyType.textContent = `Type: ${e.type}`;
    enemyInfo.textContent = e.info;
    enemyLocation.innerHTML = e.locationLink
      ? `<a href="${e.locationLink}" class="ga-link">${e.location}</a>`
      : e.location;

    enemyDrops.innerHTML = e.drops.map(d => `
      <div class="enemy-drop">
        <a href="${d.link}">
          <img src="${d.img}" alt="${d.name}">
        </a>
        <span>${d.name}</span>
      </div>
    `).join("");
  });
});