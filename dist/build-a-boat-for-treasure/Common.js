/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * HTML escaper
 * @param {string|number} rawtext the text to strip
 * @returns {string}
 */
function escapeHTML(rawtext) {
    return rawtext
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "%quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Creates the ordinal suffix for
 * a given number, up to 31.
 * @param {number} num number to create suffix for
 * @returns the appropirate ordinal suffix
 */
function getOrdinalSuffix(num) {
    // https://stackoverflow.com/a/15397495
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

/**
 * Appends string of time to time unit array.
 * If it is the first unit, but equals 0, it
 * will be omitted.
 * @param {string[]} timeUnitArray array holding all the calculated units of time left
 * @param {number} timeLeft the amount of time left
 * @param {string} unit the unit of time in singular form
 * @returns {string[]} updated array containing the units of time left
 */
function buildTimeString(timeUnitArray, timeLeft, unit) {
    if (timeLeft > 0) {
        var timeLeftString = " " + timeLeft + " " + unit;
        if (timeLeft != 1) {
            timeLeftString += 's';
        }
        timeUnitArray.push(timeLeftString);
    } else if (timeUnitArray.length > 0) {
        timeUnitArray.push("0 "+unit);
    }

    return timeUnitArray;
}

/**
 *  Places countdown text regarding the wiki's anniversary inside
 *  of an HTML element with the id `wikia-anniversary-countdown`.
 */
function wikiAnniversaryCountdown() {
    var anniversaryCountdownElement = document.getElementById("wikia-anniversary-countdown");
    if (anniversaryCountdownElement === null) {
        return;
    }

	// mw.config.get('wgMainPageTitle') is null when this script runs
	// probably need to wait. might as well just hard-code instead.
    var wikiName = "Build A Boat For Treasure Wiki";
    var currentYear = new Date().getFullYear();
    var dateOfFirstEdit = new Date(currentYear + "-08-14T23:40Z");
    var yearsSinceFirstEdit = currentYear - 2017;
    var ordinalAnniversaryString = yearsSinceFirstEdit + getOrdinalSuffix(yearsSinceFirstEdit);
    var setAnniversaryText = setInterval(function () {
        var timeUntilAnniversary = dateOfFirstEdit.getTime() - new Date().getTime();
        var timeUnitArray = [];

        timeUnitArray = buildTimeString(timeUnitArray, Math.floor(timeUntilAnniversary / 86400000), "day");
        timeUnitArray = buildTimeString(timeUnitArray, Math.floor((timeUntilAnniversary % 86400000) / 3600000), "hour");
        timeUnitArray = buildTimeString(timeUnitArray, Math.floor((timeUntilAnniversary % 3600000) / 60000), "minute");
        timeUnitArray = buildTimeString(timeUnitArray, Math.floor((timeUntilAnniversary % 60000) / 1000), "second");

        var completeTimeString = "";
        if (timeUnitArray.length > 0) {
            var lastUnit = timeUnitArray.pop();
            completeTimeString += timeUnitArray.join(", ") + " and " + lastUnit + ", ";
        } else {
            completeTimeString += timeUnitArray[0];
        }

        if (timeUntilAnniversary > 0) {
            anniversaryCountdownElement.textContent = "In" + completeTimeString + wikiName + " will celebrate its " + ordinalAnniversaryString + " anniversary!";
        } else {
            anniversaryCountdownElement.textContent = wikiName+ " celebrated its " + ordinalAnniversaryString + " anniversary on " + dateOfFirstEdit.toLocaleString() + "!";
            clearInterval(setAnniversaryText);
        }
    }, 100);
}

/**
 * @typedef {object} dotStyles
 * @property {string} text The text content of the dot
 * @property {string} class Additional classes to apply to the dot
 */

/** 
 * @type {{ [s: string]: dotStyles }} dotStyeList
 * @todo rewrite to avoid dict. it made more sense
 *       when dots were styled inline.
 */
var dotCustomization = {
    "0": {
        text: "?",
        class: "boat-class-0"
    },
    "1": {
        text: "1",
        class: "boat-class-1"
    },
    "2": {
        text: "2",
        class: "boat-class-2"
    },
    "3": {
        text: "3",
        class: "boat-class-3"
    },
    "3.14": {
        text: "π",
        class: "boat-class-3"
    },
    "4": {
        text: "4",
        class: "boat-class-4"
    },
    "5": {
        text: "5",
        class: "boat-class-5"
    },
    "6": {
        text: "6",
        class: "boat-class-6"
    },
    "7": {
        text: "7",
        class: "boat-class-7"
    },
    "8": {
        text: "8",
        class: "boat-class-8"
    },
    "9": {
        text: "9",
        class: "boat-class-9"
    },
    "10": {
        text: "10",
        class: "boat-class-10"
    },
    "11": {
        text: "11",
        class: "boat-class-11"
    },
    "12": {
        text: "12",
        class: "boat-class-12"
    }
};

function comboatSliderHandler() {
    var containerElement = document.getElementById("community-boat-container");

    if (containerElement === null) {
        return;
    }

    var boatList = /** @type {HTMLCollectionOf<HTMLElement>}*/(containerElement.getElementsByClassName("community-boat"));
    var boatCount = boatList.length;

    // refers to "00/xx" part of the slider counter
    var totalCounterElement = document.getElementById("community-boat-container-counter");
    totalCounterElement.textContent = escapeHTML(boatCount);

    var slideIndex = 0;
    var dots = /** @type {HTMLCollectionOf<HTMLElement>}*/(document.getElementById("seven-dot").getElementsByClassName("dot"));

    /**
     * Updates the dot navigation and the current boat
     * @param {number} nextIndex the index to update the slider to
     */
    var slideDisplay = function (nextIndex) {
        // Loop back slideIndex when it goes past boat count.
        if (nextIndex >= boatCount)
            slideIndex = nextIndex - boatCount;
        else if (nextIndex < 0)
            slideIndex = boatCount + nextIndex;

        // handle an index error from clicking on
        // edge nav dots while boatCount <= 2.
        if (slideIndex >= boatCount)
            slideIndex = 0;
        else if (slideIndex < 0)
            slideIndex = boatCount - 1;

        // Need to clear off any current boat flags before
        // we can reveal the new current boat
        for (var i = 0; i < boatCount; i++) {
            boatList[i].classList.remove("is-current");
        }
        boatList[slideIndex].classList.add("is-current");

        // refers to the "xx/00" part of the slider counter
        var currentCounterElement = document.getElementById("current-boat");
        if (currentCounterElement !== null)
            currentCounterElement.textContent = escapeHTML(slideIndex + 1);

        // Update dots
        if (dots.length > 0) {
            for (var k = 0; k < dots.length; k++) {
                var centerDotIndex = Math.floor(dots.length / 2);
                var dotIndex = ((boatCount * 2) + slideIndex + k - centerDotIndex) % boatCount;
                var classNumber = boatList[dotIndex].getAttribute("data-class");
                var customizations = dotCustomization[classNumber];
                if (customizations === undefined)
                    customizations = dotCustomization[0];

                var dotElement = dots[k];
                dotElement.textContent = customizations.text;
                // we'd need to clear off each boat class explicitly
                // if we used classList so might as well just set the whole thing
                dotElement.className = "dot " + customizations.class;

                // Comboat.css can handle the normal seven dots length, but not beyond
                if (dots.length !== 7) {
                    // should be same falloff rate as regular seven dots
                    var opacityFalloff = (1 - (Math.abs(centerDotIndex - k)) / (1 + centerDotIndex)).toString();
                    // different from regular - fall off ends at 0.5
                    var scaleFalloff = (1 - (Math.abs(centerDotIndex - k)) / (2 * centerDotIndex)).toString();
                    dotElement.style.opacity = opacityFalloff;
                    dotElement.style.transform = "scale(" + scaleFalloff + ")";
                }
            }
        }
    };

    /**
     * Functions to control slider progression 
     */
    var sliderControls = {
        /**
         * For manually clicking the dot
         * @param {number} change amount of slides to move 
         */
        manual: function (change) {
            slideDisplay(slideIndex += change);
        },
        prev: function () {
            sliderControls.manual(-1);
        },
        next: function () {
            sliderControls.manual(1);
        }
    };

    // the buttons on the left and right of the slider
    var previousButton = document.getElementsByClassName("prev")[0];
    var nextButton = document.getElementsByClassName("next")[0];
    if (previousButton)
        previousButton.addEventListener('click', sliderControls.prev);
    if (nextButton)
        nextButton.addEventListener('click', sliderControls.next);
    // seven dot navigation
    for (var k = 0; k < dots.length; k++) {
        // Need to create a new function scope
        // so we can copy the value of k instead
        // of passing a reference
        (function (kDot) {
            dots[kDot].addEventListener("click", function () {
                // new index will be relative to the middle
                // dot which should be the current boat
                sliderControls.manual(kDot - Math.floor(dots.length / 2));
            });
        })(k);
    }

    // Collect 'duplicate' boats together for sorting purposes
    /** @type {HTMLElement[][]} */
    var allBoats = [[]];
    for (var i = 0; i < boatCount; i++) {
        allBoats[allBoats.length - 1].push(boatList[i]);
        if (boatList[i].getAttribute("data-precede") !== "1" && i !== boatCount - 1) {
            allBoats.push([]);
        }
    }

    /**
     * @callback sortingFunc
     * @param {HTMLElement[]} a
     * @param {HTMLElement[]} b
     * @returns {number}
     */

    // sort algorithms
    var sortingAlgos = {
        /**
         * sort by class
         * @type {sortingFunc}
         */
        class: function (a, b) {
            return parseInt(a[0].getAttribute("data-class")) - parseInt(b[0].getAttribute("data-class"));
        },
        /**
         * sort by name
         * @type {sortingFunc}
         */        name: function (a, b) {
            if (a[0].getAttribute("data-boatname").toLowerCase() < b[0].getAttribute("data-boatname").toLowerCase())
                return -1;
            if (a[0].getAttribute("data-boatname").toLowerCase() > b[0].getAttribute("data-boatname").toLowerCase())
                return 1;
            return 0;
        },
        /**
         * sort by creator
         * @type {sortingFunc}
         */
        creator: function (a, b) {
            if (a[0].getAttribute("data-creator").toLowerCase() < b[0].getAttribute("data-creator").toLowerCase())
                return -1;
            if (a[0].getAttribute("data-creator").toLowerCase() > b[0].getAttribute("data-creator").toLowerCase())
                return 1;
            return 0;
        }
    };

    /**
     * Generic sorting function
     * @param {sortingFunc} sortAlgo sorting function to determine order of the boats
     */
    var sortBoats = function (sortAlgo) {
        var sortArea = document.getElementById("sort-boat");
        sortArea.innerHTML = "";
        allBoats.sort(sortAlgo);
        for (var i = 0; i < allBoats.length; i++) {
            for (var j = 0; j < allBoats[i].length; j++)
                sortArea.appendChild(allBoats[i][j]);
        }
        slideDisplay(1);
    };

    var sortFunctions = {
        class: function () { sortBoats(sortingAlgos.class); },
        creator: function () { sortBoats(sortingAlgos.creator); },
        name: function () { sortBoats(sortingAlgos.name); },
        // random shuffle
        shuffle: function () {
            var sortArea = document.getElementById("sort-boat");
            sortArea.innerHTML = "";
            var placeholder = allBoats.slice();
            while (placeholder.length > 0) {
                var randomBoat = Math.floor(Math.random() * placeholder.length);
                for (var j = 0; j < placeholder[randomBoat].length; j++)
                    sortArea.appendChild(placeholder[randomBoat][j]);
                placeholder.splice(randomBoat, 1);
            }
            slideDisplay(1);
        }
    };

    // slider intialization
    if (containerElement.getAttribute("data-auto-shuffle") === "1")
        // initial random shuffling
        sortFunctions.shuffle();
    else
        slideDisplay(0);
    
    // these buttons are optional, so we need to check if each exists
    var sortButtonClass = document.getElementById("sort-class");
    var sortButtonName = document.getElementById("sort-name");
    var sortButtonCreator = document.getElementById("sort-creator");
    var sortButtonShuffle = document.getElementById("shuffle");

    if (sortButtonClass !== null)
        sortButtonClass.addEventListener("click", sortFunctions.class);
    if (sortButtonName !== null)
        sortButtonName.addEventListener("click", sortFunctions.name);
    if (sortButtonCreator !== null)
        sortButtonCreator.addEventListener("click", sortFunctions.creator);
    if (sortButtonShuffle !== null)
        sortButtonShuffle.addEventListener("click", sortFunctions.shuffle);
}

$(function () {
    comboatSliderHandler();
    wikiAnniversaryCountdown();
});