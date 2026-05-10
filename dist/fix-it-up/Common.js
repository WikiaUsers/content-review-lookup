// Applies color to the spawn rates of new cars
$(document).ready(function () {

    function classifySpawnRate(elem) {
        const raw = elem.getAttribute("data-spawn");
        if (!raw) return;

        const value = parseFloat(raw);
        if (isNaN(value)) return;

        // Apply rarity classes based on your ranges
        if (value >= 3000 && value <= 5000) {
            elem.classList.add("rarity-common");
        } else if (value >= 1100 && value < 3000) {
            elem.classList.add("rarity-uncommon");
        } else if (value >= 200 && value < 1100) {
            elem.classList.add("rarity-rare");
        } else if (value >= 50 && value < 200) {
            elem.classList.add("rarity-veryrare");
        } else if (value >= 10 && value < 50) {
            elem.classList.add("rarity-superrare");
        } else if (value >= 1 && value < 10) {
            elem.classList.add("rarity-ultrarare");
        }
    }
    function classifyPrice(elem) {
        const price = elem.getAttribute("data-price");
        if (!price) return;

        const text = price.toLowerCase();

        if (text.includes("robux")) {
            elem.classList.add("rarity-epic");
        } else if (text.includes("event")) {
            elem.classList.add("rarity-legendary");
        } else if (text.includes("moderator")) {
            elem.classList.add("rarity-staff")
        } else if (text.includes("hr")) {
        	elem.classList.add("rarity-hr")
        } else if (text.includes("offsale")) {
        	elem.classList.add("offsale-txt")
        } else if (text.includes("auction")) {
        	elem.classList.add("auction")
        } else if (text.includes("market")) {
        	elem.classList.add("market")
        } else if (text.includes("barnfind")) {
        	elem.classList.add("rarity-barnfind")
        }
    }

    // Process spawn rates
    document.querySelectorAll(".carrow-spawn[data-spawn]").forEach(el => {
        classifySpawnRate(el);
    });

    // Process price rarities
    document.querySelectorAll(".carrow-price[data-price]").forEach(el => {
        classifyPrice(el);
    });

});

// Logic for date and time shown at /Car_Values
function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return "th";
  return ["th","st","nd","rd"][n % 10] || "th";
}

document.querySelectorAll(".unix-time").forEach(el => {
  const ts = Number(el.dataset.ts) * 1000;
  const d = new Date(ts);

  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  const month = d.toLocaleString(undefined, { month: "long" });

  el.textContent = `${month} ${day}${ordinal(day)}, ${hours}:${minutes}`;
});


// Function for showing game stats on the main page

(function () {
  var API_BASE = "https://project-fezug.vercel.app/api/gamestats";

  var REFRESH_INTERVAL = 300000; // 5 minutes

  function formatNumber(num) {
    if (num === undefined || num === null) return "0";
    return num.toLocaleString("en-US");
  }

  function loadGameStats(container, universeId) {
    if (!universeId) return;

    fetch(API_BASE + "?universeId=" + universeId)
      .then(function (res) {
        if (!res.ok) {
          console.error("Failed to fetch game stats");
          return;
        }
        return res.json();
      })
      .then(function (data) {
        if (!data) return;

        var mapping = {
          players: data.playing,
          visits: data.visits,
          favorites: data.favorites
        };

        for (var key in mapping) {
          var el = container.querySelector("#" + key);
          if (el) {
            el.innerText = formatNumber(mapping[key]);
          }
        }
      })
      .catch(function (err) {
        console.error("Error loading Roblox stats:", err);
      });
  }

  function start(container, universeId) {
    loadGameStats(container, universeId);

    if (REFRESH_INTERVAL) {
      setTimeout(function () {
        loadGameStats(container, universeId);

        setInterval(function () {
          loadGameStats(container, universeId);
        }, REFRESH_INTERVAL);

      }, Math.random() * REFRESH_INTERVAL);
    }
  }

  function init() {
    var containers = document.querySelectorAll("[data-universeid]");

    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var universeId = container.getAttribute("data-universeid");
      start(container, universeId);
    }
  }

  mw.hook("wikipage.content").add(init);
})();

// Function that adds a search bar to a specific page
$(function () {
  const mount = document.getElementById("local-page-search");
  if (!mount) return;

  const input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search...";
  input.className = "local-search-box";
  mount.appendChild(input);

  const cards = document.querySelectorAll(".car-header");

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function removeHighlights(root) {
    root.querySelectorAll("mark.search-highlight").forEach(mark => {
      mark.replaceWith(document.createTextNode(mark.textContent));
    });
    root.normalize();
  }

  function highlightMatches(root, query) {
    if (!query) return;

    const regex = new RegExp(escapeRegExp(query), "gi");

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (node.parentElement.closest("mark.search-highlight")) {
            return NodeFilter.FILTER_REJECT;
          }
          return regex.test(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      const frag = document.createDocumentFragment();
      const text = node.nodeValue;
      let lastIndex = 0;

      text.replace(regex, (match, offset) => {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, offset)));

        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = match;
        frag.appendChild(mark);

        lastIndex = offset + match.length;
      });

      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      node.replaceWith(frag);
    });
  }

  input.addEventListener("input", function () {
    const q = input.value.trim();

    cards.forEach(card => {
      removeHighlights(card);

      const text = card.textContent.toLowerCase();
      const match = !q || text.includes(q.toLowerCase());

      card.style.display = match ? "" : "none";

      if (match && q) {
        highlightMatches(card, q);
      }
    });
  });
});