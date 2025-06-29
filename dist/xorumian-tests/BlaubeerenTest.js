// Dieses JavaScript bitte nicht supmiten!

document.addEventListener("DOMContentLoaded", () => {
  // Entferne unerwünschte Bereiche
  const toRemove = ["games", "tv", "movies", "anime"];
  toRemove.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  // Alte Inhalte in .cta löschen
  const cta = document.querySelector(".cta");
  if (cta) {
    cta.innerHTML = "";

    const sections = [
      { title: "Xorum Wiki DE", link: "https://xorumian-things.fandom.com/de/wiki/" },
      { title: "Xorum Wiki Test", link: "https://xorumian-tests.fandom.com/wiki/" },
      { title: "Xorum Wiki Cosplay", link: "https://xorumian-cosplays.fandom.com/de/wiki/" }
    ];

    sections.forEach(section => {
      const heading = document.createElement("h2");
      heading.textContent = section.title;

      const button = document.createElement("a");
      button.textContent = "Zur Website";
      button.href = section.link;
      button.className = "xorum-button";

      cta.appendChild(heading);
      cta.appendChild(button);
    });
  }
});