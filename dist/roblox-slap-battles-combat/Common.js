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
      style: "background: linear-gradient(85deg, #db7093, #f2f3f4, #b0e0e6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;"
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
      style: "background:linear-gradient(45deg,grey,red,grey);-webkit-background-clip:text !important;-webkit-text-fill-color:transparent;font-weight: bold;"
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
      style: "background:linear-gradient(25deg,red,white,black); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
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
      style: "background:linear-gradient(25deg,black,white,black); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Mimic": {
      link: "Mimic",
      style: "background:linear-gradient(135deg,#ff0000,#aa00ff); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Maow": {
      link: "Maow",
      style: "text-shadow: 0 0 5px tan; color: tan; font-weight: bold;"
    },
     "Coil": {
      link: "Coil",
      style: "text-shadow: 0 0 5px #eff2ff; color: #f1f3ff; font-weight: bold;"
    },
     "Reaper (Combat)": {
      link: "Reaper_(Combat)",
      style: "background:linear-gradient(-25deg,red,black,red); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Darkheart": {
      link: "Darkheart",
      style: "text-shadow: 0 0 5px black; color: purple; font-weight: bold;"
    },
     "Infector": {
      link: "Infector",
      style: "background:linear-gradient(25deg,#008000,#32cd32); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Telekinesis": {
      link: "Telekinesis",
      style: "text-shadow: 0 0 5px #02fbff; color: #02fbff; font-weight: bold;"
    },
     "Calastroclysm's Essence": {
      link: "Calastroclysm's_Essence",
      style: "background:linear-gradient(-45deg,#add8e6,yellow,cyan,#add8e6,yellow,cyan); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Megalomaniac": {
      link: "Megalomaniac",
      style: "background:linear-gradient(90deg,#ffffff,#0f70b7,#f087b6); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Insanity": {
      link: "Insanity",
      style: "background:linear-gradient(40deg,red,black); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "410": {
      link: "410",
      style: "background:linear-gradient(90deg,red,white,black); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Subspace": {
      link: "Subspace",
      style: "text-shadow: 0 0 7px #bea2fb; color: #764cfd; font-weight: bold;"
    },
     "Eternal": {
      link: "Eternal",
      style: "text-shadow: 0 0 7px purple; color: magenta; font-weight: bold;"
    },
     "Troll": {
      link: "Troll",
      style: "text-shadow: 0 0 2px #000000; color: #FFFFFF; font-weight: bold;"
    },
     "Reaper: Pure Darkness": {
      link: "Reaper:_Pure_Darkness",
      style: "text-shadow: 0 0 5px black; color: black; font-weight: bold;"
    },
     "R:PD": {
      link: "Reaper:_Pure_Darkness",
      style: "text-shadow: 0 0 5px black; color: black; font-weight: bold;"
    },
     "Stability": {
      link: "Stability",
      style: "background:linear-gradient(180deg,blue,cyan); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Unstability: Stabilization Incarnate": {
      link: "Unstability:_Stabilization_Incarnate",
      style: "background:linear-gradient(50deg,red,blue,cyan); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "U:SI": {
      link: "Unstability:_Stabilization_Incarnate",
      style: "background:linear-gradient(50deg,red,blue,cyan); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Lifetime: Chronicles": {
      link: "Lifetime:_Chronicles",
      style: "text-shadow: 0 0 5px #4b0082; color: #0000FE; font-weight: bold;"
    },
     "L:C": {
      link: "Lifetime:_Chronicles",
      style: "text-shadow: 0 0 5px #4b0082; color: #0000FE; font-weight: bold;"
    },
     "Twilight": {
      link: "Twilight",
      style: "text-shadow: 0 0 5px white; color:black; font-weight: bold;"
    },
     "MAOW: Destroyer Of Worlds": {
      link: "MAOW:_Destroyer_Of_Worlds",
      style: "text-shadow: 0 0 5px yellow; color: yellow; font-weight: bold;"
    },
     "MAOW: DOW": {
      link: "MAOW:_Destroyer_Of_Worlds",
      style: "text-shadow: 0 0 5px yellow; color: yellow; font-weight: bold;"
    },
     "Immunities": {
      link: "Mechanics#Immunities",
      style: "font-weight: bold;"
    },
     "Soulless": {
      link: "Mechanics#Soulless",
      style: "text-shadow: 0 0 5px Black; background:linear-gradient(90deg,White,Grey); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    },
     "Waterwalk": {
      link: "Mechanics#Waterwalk",
      style: "font-weight: bold;"
    },
     "Speedwalk": {
      link: "Mechanics#Speedwalk",
      style: "font-weight: bold;"
    },
     "Hitwalk": {
      link: "Mechanics#Hitwalk",
      style: "font-weight: bold;"
    },
     "Timer of Doom": {
      link: "Mechanics#Timer_of_Doom",
      style: "text-shadow: 0 0 5px red; color: black; font-weight: bold;"
    },
     "Mark of Death": {
      link: "Mechanics#Mark_of_Death",
      style: "text-shadow: 0 0 5px red; color: black; font-weight: bold;"
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
      if (currentNode.nodeValue.trim() && !currentNode.parentNode.closest("a, span, b, strong, i, em")) {
        textNodes.push(currentNode);
      }
    }
    return textNodes;
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  const textNodes = walkTextNodes(content);
  
  const sortedKeywordEntries = Object.entries(keywordData).sort((a, b) => b[0].length - a[0].length);

for (const textNode of textNodes) {
  let originalText = textNode.nodeValue;
  let replacedParts = [originalText];

  for (const [keyword, { link, style }] of sortedKeywordEntries) {
    const escapedKeyword = escapeRegExp(keyword);
	const needsBoundaries = /^[\w\s]+$/.test(keyword) && !/[:()]/.test(keyword);
	const regex = new RegExp(
	 needsBoundaries ? `\\b(${escapedKeyword})\\b(?!-)` : `(${escapedKeyword})(?!-)`,
	 "gi"
	);


    replacedParts = replacedParts.flatMap(part => {
      if (part.startsWith("<") && part.endsWith(">")) {
        return [part];
      }
      
      const splitParts = [];
      let lastIndex = 0;
      part.replace(regex, (match, p1, offset) => {
        splitParts.push(part.slice(lastIndex, offset));
        const replacement = (link.toLowerCase() === currentPage.toLowerCase())
          ? `<span style="${style}">${p1}</span>`
          : `<a href="/wiki/${link}" style="${style}">${p1}</a>`;
        splitParts.push(replacement);
        lastIndex = offset + p1.length;
      });
      splitParts.push(part.slice(lastIndex));
      return splitParts;
    });
  }

  const replacedText = replacedParts.join("");

  if (replacedText !== originalText) {
    const span = document.createElement("span");
    span.innerHTML = replacedText;
    textNode.parentNode.replaceChild(span, textNode);
  }
}

});