const specialPages = {
    "The_First_Concept": {
        color: "#000000",
        font: "Orbitron"
    },

    "Supreme": {
        color: "#c000ff",
        font: "Impact"
    }
};

let css = "";

for (const [page, data] of Object.entries(specialPages)) {
    css += `
    .search-app__suggestion-link[href$="/wiki/${page}"],
    a[data-tracking-label="whatlinkshere"][href$="/${page}"],
    a[data-tracking-label="recentchangeslinked"][href$="/${page}"] {
        color: ${data.color} !important;
        font-family: "${data.font}" !important;
        font-weight: bold;
        text-shadow: 0 0 5px ${data.color};
    }
    `;
}

mw.util.addCSS(css);