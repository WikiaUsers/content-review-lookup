/* Any JavaScript here will be loaded for all users on every page load. */
// Discord Banner settings 
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'disneyspeedstorm',
    prependToRail: true,
    noRail: false
};


/*----------------------------------------*/
// Extra modules for the right rail
window.AddRailModule = [
    {page: 'Template:WikiRules', prepend: true},
    'Template:ExtraDiscord',
    'Template:Calculator'
];

/*----------------------------------------*/
// Replace the HOME button with a pic
const welcomeCustom = document.querySelector('.welcome'); //check if it's the main page by the class

const picCustom = '<img alt="Crikee sticker.png" src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" decoding="async" width="150" height="63" data-image-name="Crikee sticker.png" data-image-key="Crikee_sticker.png" data-src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" class=" lazyloaded" draggable="false">';

const linksCustom = '<div class="page-header__languages" style="float: right; padding-top: 15px;"><div class="wds-dropdown"><div class="wds-dropdown__toggle">English<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content"><ul class="wds-list wds-is-linked"><li><a href="https://speedstorm.fandom.com/es/wiki/" data-tracking-label="lang-es">español</a></li></ul></div></div></div>';

const headerCustom = document.querySelector('.page-header__title-wrapper'); //find the header
const headerHide = document.querySelector('.page-header__title');
const functionCustomVar = function () {
	headerCustom.insertAdjacentHTML('afterbegin', picCustom); //insert the pic to the header
};
const functionDeleteHeader = function() {
    headerHide.classList.add('hide');
    };

const addLanguageLinks = function () {
	headerCustom.insertAdjacentHTML('beforeend', linksCustom);
};

if (welcomeCustom) {
    functionCustomVar(); 
    functionDeleteHeader();
    addLanguageLinks();
}
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/

// Adding the list of the last new page creations 
$.ajax({
    url: "https://speedstorm.fandom.com/api.php?action=query&format=json&list=logevents&formatversion=2&leprop=title&letype=create&lenamespace=0&lelimit=5",
    type: 'GET',
    dataType: 'json',
    success: function(res) {
        var newPageList = '<ul>';
        if (res && res.query && res.query.logevents) {
    		res.query.logevents.forEach(function(e) {
        if (e.title) {
            newPageList += '<li><a href="/wiki/' + e.title + '">' + e.title + '</a></li>';
        	}
			 });
			}
        newPageList += '</ul>';
        $( '#recent-changes-api' ).html(newPageList);
    }
});

/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/* Racer upgrade calculator */
(function () {
    "use strict";

    const fragmentsPerStar = 5;
    const costsByStar = [
        { shards: 3, coins: 300 },
        { shards: 5, coins: 500 },
        { shards: 7, coins: 700 },
        { shards: 9, coins: 900 },
        { shards: 13, coins: 1300 },
        { shards: 15, coins: 1500 }
    ];
    const maxProgress = costsByStar.length * fragmentsPerStar;

    function formatNumber(value) {
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function progressLabel(progress) {
        const stars = Math.floor(progress / fragmentsPerStar);
        const fragments = progress % fragmentsPerStar;
        let label = stars + (stars === 1 ? " Star" : " Stars");

        if (fragments > 0) {
            label += " + " + fragments;
            label += fragments === 1 ? " Fragment" : " Fragments";
        }

        return label;
    }

    function createProgressSelect(selectedProgress) {
        const select = document.createElement("select");

        for (let progress = 0; progress <= maxProgress; progress++) {
            const option = document.createElement("option");
            option.value = String(progress);
            option.textContent = progressLabel(progress);
            select.appendChild(option);
        }

        select.value = String(selectedProgress);
        return select;
    }

    function initializeCalculator(calculator) {
        const inside = calculator.querySelector("#calculator-inside");

        if (!inside || calculator.dataset.starCalculatorReady === "true") {
            return;
        }

        const fromSelect = createProgressSelect(0);
        const toSelect = createProgressSelect(maxProgress);
        const fromLabel = document.createElement("label");
        const toLabel = document.createElement("label");
        const button = document.createElement("button");
        const resultText = document.createElement("div");

        fromLabel.append("From: ", fromSelect);
        toLabel.append("To: ", toSelect);
        button.type = "button";
        button.textContent = "Calculate";
        resultText.className = "upgrade-calculator-result";
        resultText.setAttribute("role", "status");

        function calculateResources() {
            const from = Number(fromSelect.value);
            const to = Number(toSelect.value);

            if (
                fromSelect.value === "" || toSelect.value === "" ||
                !Number.isInteger(from) || !Number.isInteger(to) ||
                from < 0 || to < 0 || from > maxProgress || to > maxProgress
            ) {
                resultText.textContent = "Please select valid starting and target progress.";
                return;
            }

            if (from > to) {
                resultText.textContent = "Target progress must be at or above starting progress.";
                return;
            }

            let totalShards = 0;
            let totalCoins = 0;

            for (let progress = from + 1; progress <= to; progress++) {
                const cost = costsByStar[Math.floor((progress - 1) / fragmentsPerStar)];
                totalShards += cost.shards;
                totalCoins += cost.coins;
            }

            resultText.textContent = "Result: " + formatNumber(totalShards) +
                " Racer Shards, " + formatNumber(totalCoins) + " Tune Coins";
        }

        inside.replaceChildren(fromLabel, " ", toLabel, " ", button);
        calculator.appendChild(resultText);
        calculator.dataset.starCalculatorReady = "true";
        button.addEventListener("click", calculateResources);
        fromSelect.addEventListener("change", calculateResources);
        toSelect.addEventListener("change", calculateResources);
        calculateResources();
    }

    function initialize(root) {
        if (root.nodeType === 1 && root.matches("#calculator")) {
            initializeCalculator(root);
        }

        root.querySelectorAll("#calculator").forEach(initializeCalculator);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            initialize(document);
        });
    } else {
        initialize(document);
    }

    if (typeof mw !== "undefined" && typeof mw.hook === "function") {
        mw.hook("wikipage.content").add(function ($content) {
            initialize($content && $content[0] ? $content[0] : document);
        });
    }
}());