/* Any JavaScript here will be loaded for all users on every page load. */
window.AddRailModule = [{prepend: true}];

$(document).ready(function () {
  const keywordData = {
    "Midas": {
      link: "Midas",
      style: "text-shadow: 0 0 10px #ffd700; color: #ffd700; font-weight: bold; text-decoration: none;"
    },
    "Serene Grace": {
      link: "Serene_Grace",
      style: `
        background: linear-gradient(85deg, #db7093, #f2f3f4, #b0e0e6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
      `
    },
    "Killstreak (Extension)": {
      link: "Killstreak_(Extension)",
      style: "text-shadow: 0 0 10px #FF00FF; color: #ff00ff; font-weight: bold;"
    },
    "Infernal": {
      link: "Infernal",
      style: "text-shadow: 0 0 5px #FFA500; color: #FFA500; font-weight: bold;"
    },
    "Lifetime": {
      link: "Lifetime",
      style: "text-shadow: 0 0 5px #0148fe; color: #0148fe; font-weight: bold;"
    },
     "Chronomatic": {
      link: "Chronomatic",
      style: "text-shadow: 0 0 5px #b81afc; color: #b81afc; font-weight: bold;"
    },
     "Anti": {
      link: "Anti",
      style: `
        background:linear-gradient(45deg,grey,red,grey);
        -webkit-background-clip:text !important;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      `
    },
     "Absolution": {
      link: "Absolution",
      style: "text-shadow: 0 0 5px yellow; color: Orange; font-weight: bold;"
    },
     "Glitched": {
      link: "Glitched",
      style: "color: #0d1f2a; font-weight: bold;"
    },
     "Unstability": {
      link: "Unstability",
      style: `
        background:linear-gradient(25deg,red,white,black);
        -webkit-background-clip:text !important;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      `
    },
     "Silence's Soul": {
      link: "Silence's_Soul",
      style: "text-shadow: 0 0 5px white; color:white; font-weight: bold;"
    },
     "Devourer of Souls": {
      link: "Devourer_of_Souls",
      style: "text-shadow: 0 0 5px black; color: magenta; font-weight: bold;"
    },
     "Divinus": {
      link: "Divinus",
      style: "text-shadow: 0 0 5px white; color: yellow; font-weight: bold;"
    },
     "Naptime": {
      link: "Naptime",
      style: `
        background:linear-gradient(25deg,black,white,black);
        -webkit-background-clip:text !important;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      `
    },
     "Mimic": {
      link: "Mimic",
      style: `
        background:linear-gradient(135deg,#ff0000,#aa00ff);
        -webkit-background-clip:text !important;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      `
    },
     "Maow": {
      link: "Maow",
      style: "text-shadow: 0 0 5px tan; color: tan; font-weight: bold;"
    },
     "Coil": {
      link: "Coil",
      style: "text-shadow: 0 0 5px #eff2ff; color: #f1f3ff; font-weight: bold;"
    }
  };

  const currentPage = window.location.pathname.split('/').pop();
  console.log("Current page: ", currentPage);
  const content = document.getElementById("mw-content-text");

  if (!content) return;

  function walkTextNodes(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (
        currentNode.nodeValue.trim() &&
        !currentNode.parentNode.closest("a")
      ) {
        textNodes.push(currentNode);
      }
    }

    return textNodes;
  }

  const textNodes = walkTextNodes(content);

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  for (const textNode of textNodes) {
    const originalText = textNode.nodeValue;
    let replaced = originalText;

    for (const [keyword, { link, style }] of Object.entries(keywordData)) {
  const escapedKeyword = escapeRegExp(keyword);

  const useWordBoundary = /^[\w\s]+$/.test(keyword);
  const regex = new RegExp(useWordBoundary ? `\\b(${escapedKeyword})\\b` : `(${escapedKeyword})`, "gi");

  console.log(`Checking for keyword: ${keyword}`);
  console.log(`Regex: ${regex}`);

  if (link.toLowerCase() === currentPage.toLowerCase()) {
    replaced = replaced.replace(regex, `<span style="${style}">$1</span>`);
  } else {
    replaced = replaced.replace(regex, `<a href="/wiki/${link}" style="${style}">$1</a>`);
  }
}

    if (replaced !== originalText) {
      const span = document.createElement("span");
      span.innerHTML = replaced;
      textNode.parentNode.replaceChild(span, textNode);
    }
  }
});