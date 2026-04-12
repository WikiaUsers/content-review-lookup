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

// Logic for retrieving and showing data from the game
(function () {
  var API_BASE = "https://project-fezug.vercel.app/api/gamestats";
  var REFRESH_INTERVAL = 5000;

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

  function startAutoRefresh(container, universeId) {
    loadGameStats(container, universeId);
    setInterval(function () {
      loadGameStats(container, universeId);
    }, REFRESH_INTERVAL);
  }

  function initGameStatsContainers() {
    var containers = document.querySelectorAll("[data-universeid]");
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];
      var universeId = container.getAttribute("data-universeid");
      startAutoRefresh(container, universeId);
    }
  }

  mw.hook("wikipage.content").add(initGameStatsContainers);
})();