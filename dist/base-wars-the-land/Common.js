/* Any JavaScript here will be loaded for all users on every page load. */

/* Rail Module */
window.AddRailModule = [
	  'Template:AdminList'
];
/* Gradiented Text Strokes */
document.querySelectorAll('.GradientedTextStroke').forEach((element) => {
  const direction = element.dataset.gradient.toLowerCase();
  const colors = element.dataset.colors.toLowerCase();
  const width = element.dataset.width;  

  if (colors.includes('url') || colors.includes('element') || colors.includes('paint') || direction.includes('url') || direction.includes('element') || direction.includes('paint')) {

    element.style.background = "none";
    element.style.backgroundClip = "initial";
    element.style.webkitTextFillColor = "";
    element.style.webkitTextStrokeColor = "";
    element.style.webkitTextStrokeWidth = "";
  } else {

    element.style.background = `linear-gradient(${direction}, ${colors})`;
    element.style.setProperty("--data-text", `"${element.dataset.textstroke}"`);
    element.style.backgroundClip = "text";
    element.style.webkitTextFillColor = "transparent";
    element.style.webkitTextStrokeColor = "transparent";
    element.style.webkitTextStrokeWidth = `${width}px`;
    element.style.position = "absolute";
  }
});

//Special Script
(function () {
  const LetterSpeed = 100;
  const ActiveTime = 160;
  const IntervalTime  = 160;

  function initRandomColors(el) {
    const text = el.textContent;
    el.textContent = '';

    const letters = [...text].map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      el.appendChild(span);
      return span;
    });

    const color = el.dataset.color || '#7c1af5';

    let lastIndex = -1;
    let active = true;

    setInterval(() => {
      if (lastIndex !== -1) {
        letters[lastIndex].style.color = '';
        lastIndex = -1;
      }

      if (!active) return;

      let index;
      do {
        index = Math.floor(Math.random() * letters.length);
      } while (letters[index].textContent === ' ');

      letters[index].style.color = color;
      lastIndex = index;
    }, LetterSpeed);

    setInterval(() => {
      active = !active;

      if (!active) {
        letters.forEach(l => (l.style.color = ''));
        lastIndex = -1;
      }
    }, ActiveTime + IntervalTime);
  }

  document.querySelectorAll('.ColorChange-CCRTV')
    .forEach(initRandomColors);
})();
/* YUYOCORP DATA TERMINAL ENTRIES */
(function ($, mw) {
	"use strict";

	var categories = [
		"YCSMasochistMode",
		"YCMasochistMode",
		"YCHardMode",
		"YCNormalMode",
		"YCEasyMode"
	];

	function normalize(name) {
		return name.replace(/ /g, "_");
	}

	function applyTheme() {
		var pageCategories = mw.config.get("wgCategories") || [];
		var pageTitle = normalize(mw.config.get("wgTitle") || "");

		var isTargetCategory =
			mw.config.get("wgNamespaceNumber") === 14 &&
			categories.indexOf(pageTitle) !== -1;

		var isCategoryMember = pageCategories.some(function (category) {
			return categories.indexOf(normalize(category)) !== -1;
		});

		if (document.body && (isTargetCategory || isCategoryMember)) {
			document.body.classList.add("rootpage-YuyoCorp_Data_Records");
		}
	}

	$(applyTheme);
	mw.hook("wikipage.content").add(applyTheme);
})(jQuery, mediaWiki);