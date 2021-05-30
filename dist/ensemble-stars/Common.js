/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
window.ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
window.AjaxRCRefreshText = 'Auto-refresh';
 
var oggPlayerButtonOnly = false;
 
var tooltips_config = {
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: true,
};

/* discord banner */
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'bdbGujg2tM',
    prependToRail: true,
};

/* rail modules */
window.AddRailModule = [
	{prepend: true},
    'Template:RailModule2',
];
 
/*Story Render Themes*/
console.log("Script version 1.1.0 is running!");
console.log("Contact XinChun93 on Twitter if there are any questions or concerns!");
console.log("https://github.com/yaycupcake/enstars-wiki-js");
var d = document;
var fontPref = "1em";
if (localStorage.getItem("fP")) {
    fontPref = localStorage.getItem("fP");
}
 
function toggleFontSize() {
    if (fontPref === "1em") {
        fontPref = "1.2em";
    } else {
        fontPref = "1em";
    }
    localStorage.setItem("fP",fontPref);
}
 
var activator = d.createElement("button");
activator.classList.add("activator");
activator.style.height = "75px";
activator.textContent = "Activate Immersive Chapter View (Experimental)";
activator.addEventListener("click", activateTheme);
activator.setAttribute("id", "themeJump");
var activatorJumpLink = d.createElement("a");
activatorJumpLink.href = "#flytabs_0-content-wrapper";
activatorJumpLink.appendChild(activator);
 
var fontToggler = d.createElement("button");
fontToggler.classList.add("font-toggler");
fontToggler.textContent = "Change Font Size, current is " + fontPref;
fontToggler.addEventListener("click",toggleFontSize);
fontToggler.style.height = "24px";
fontToggler.style.color = "white";
fontToggler.style.background = "#1d3dc7";
fontToggler.style.width = "100%";
fontToggler.style.borderRadius = "0px";

var jumpToTop = d.createElement("button");
jumpToTop.classList.add("jumpToTop");
jumpToTop.style.height = "75px";
jumpToTop.textContent = "Jump To Chapter List";
var jumpToTopLink = d.createElement("a");
jumpToTopLink.href = "#themeJump";
jumpToTopLink.appendChild(jumpToTop);
var body = d.querySelector("body");
body.style.position = "relative";
activator.style.width = "100%";
jumpToTop.style.width = "100%";
var tabBar = d.querySelector(".newStoryTable #flytabs_0");
if (tabBar) {
  tabBar.insertAdjacentElement("beforebegin", activatorJumpLink);
//   tabBar.insertAdjacentElement("beforebegin", fontToggler);
  tabBar.insertAdjacentElement("afterend", jumpToTopLink);
}
 
function activateTheme() {
  var charArray = [
    "Kohaku Oukawa",
    "Aira Shiratori",
    "Tomoya Mashiro",
    "Yuta Aoi",
    "Hinata Aoi",
    "Tori Himemiya",
    "Hiiro Amagi",
    "Mitsuru Tenma",
    "Midori Takamine",
    "Hajime Shino",
    "Sora Harukawa",
    "Tetora Nagumo",
    "Shinobu Sengoku",
    "Tsukasa Suou",
    "Mao Isara",
    "Arashi Narukami",
    "Natsume Sakasaki",
    "Tatsumi Kazehaya",
    "Mika Kagehira",
    "Hokuto Hidaka",
    "Ibara Saegusa",
    "Yuzuru Fushimi",
    "Adonis Otogari",
    "Jun Sazanami",
    "Koga Oogami",
    "HiMERU",
    "Subaru Akehoshi",
    "Mayoi Ayase",
    "Makoto Yuuki",
    "Souma Kanzaki",
    "Wataru Hibiki",
    "Kuro Kiryu",
    "Eichi Tenshouin",
    "Kaoru Hakaze",
    "Izumi Sena",
    "Shu Itsuki",
    "Nagisa Ran",
    "Niki Shiina",
    "Ritsu Sakuma",
    "Chiaki Morisawa",
    "Keito Hasumi",
    "Kanata Shinkai",
    "Tsumugi Aoba",
    "Hiyori Tomoe",
    "Madara Mikejima",
    "Leo Tsukinaga",
    "Nazuna Nito",
    "Rei Sakuma",
    "Rinne Amagi",
    "Akiomi Kunugi",
    "Jin Sagami",
    "Seiya Hidaka",
    "Anzu"
  ];
 
  function removeBorders() {
    var tableCells = d.querySelectorAll(".article-table td");
    tableCells.forEach(function(cell) {
      cell.style.border = "none";
    });
  }
  removeBorders();
 
  function adjustImages() {
    var storyImgs = d.querySelectorAll("img[data-image-name*='Render']");
    storyImgs.forEach(function(img, index) {
      img.style.maxWidth = "100px";
      img.style.height = "auto";
      img.classList.add("story-image");
      var charFileName = img.getAttribute("data-image-name");
      var charName = findCharName(charFileName);
      var speakerNameClass = "speaker-name_" + index;
      var speakerNameClassSelector = "." + speakerNameClass;
      if (!d.querySelector(speakerNameClassSelector)) {
        var nameNode = d.createElement("p");
        nameNode.classList.add(speakerNameClass);
        nameNode.textContent = charName;
        if (window.matchMedia("(max-width: 700px)").matches) {
          nameNode.style.textAlign = "left";
          nameNode.textContent += ":";
        }
        img.insertAdjacentElement("afterend", nameNode);
      }
      //select td parent of image
      var parentTd = img.closest("td");
      var nextTd = parentTd.nextSibling;
      if (nextTd) {
        nextTd.classList.add("nextTd");
      }
      else {
        return;
      }
      parentTd.style.verticalAlign = "top";
      parentTd.style.paddingTop = "1em";
      parentTd.style.fontSize = fontPref;
      parentTd.style.lineHeight = "1.2em";
      // console.log("showing contents")
      var dialogueBox = d.createElement("div");
      dialogueBox.classList.add("dialigue-box");
      var contents = nextTd.innerHTML;
      dialogueBox.innerHTML = contents;
      parentTd.appendChild(dialogueBox);
      nextTd.remove();
      var parentRow = parentTd.parentNode;
      //make every other row a different background color
      if (index % 2 === 0) {
        parentRow.style.backgroundColor = "rgba(220,220,210,0.4)";
      }
      else {
        parentRow.style.backgroundColor = "rgba(215,215,220,0.6)";
      }
      //remove borders
      parentTd.style.border = "none";
      parentRow.style.border = "none";
      parentTd.style.display = "flex";
      parentTd.style.alignItems = "flex-start";
      parentTd.style.justifyContent = "flex-start";
      if (window.matchMedia("(max-width: 700px)").matches) {
        parentTd.style.flexDirection = "column";
      }
      if (window.matchMedia("(min-width: 701px)").matches) {
        parentTd.style.flexDirection = "row";
      }
      var imageDiv = img.parentNode.parentNode;
      if (window.matchMedia("(min-width: 701px)").matches) {
        imageDiv.style.width = "150px";
        imageDiv.style.flex = "0 0 150px";
        dialogueBox.style.paddingLeft = "2em";
      }
    });
    if (window.matchMedia("(max-width: 700px)").matches) {
      storyImgs.forEach(function(img) {
        img.style.display = "none";
      });
    }
    if (window.matchMedia("(min-width: 701px)").matches) {
      storyImgs.forEach(function(img) {
        img.style.display = "static";
      });
    }
  }
  adjustImages();
  // Function for parsing file names for each character
  function findCharName(file) {
    if (file.includes("Render")) {
      var name = "";
      var parseName = function(file, chName) {
        if (file.includes(chName)) {
          name = chName;
        }
        return name;
      };
      charArray.forEach(function(chName) {
        if (parseName(file, chName)) {
          return name;
        }
      });
      return name;
    }
  }
}

/* Back to Top Arrow (Main code in MediaWiki:ImportJS) */
window.BackToTopModern = true;