// Replace sans-serif fonts
function replaceSansFonts(newFont) {
  document.querySelectorAll("*").forEach(function (element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;

    // Use a regular expression to match whole words
    if (/\bsans-serif\b/.test(fontFamily)) {
      element.style.fontFamily = fontFamily.replace(/\bsans-serif\b/g, newFont + ", sans-serif");
    }
  });
}

// Replace serif fonts
function replaceSerifFonts(newFont) {
  document.querySelectorAll("*").forEach(function (element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;

    // Use a regular expression to match whole words
    if ((/\bserif\b/.test(fontFamily)) && (!(/\bsans-serif\b/.test(fontFamily)))) {
      element.style.fontFamily = fontFamily.replace(/\bserif\b/g, newFont + ", serif");
    }
  });
}

// Replace monospace fonts
function replaceMonospaceFonts(newFont) {
  document.querySelectorAll("*").forEach(function (element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;
    const fontSize = computedStyle.fontSize; // Get the current font size

    // Match any font stack containing monospace, like "monospace", "monospace, monospace", or "(font), monospace"
    if (/(\bmonospace\b)/.test(fontFamily)) {
      element.style.fontFamily = fontFamily.replace(/\bmonospace\b/g, newFont + ", monospace"); // Replace all instances of "monospace"
      element.style.fontSize = fontSize; // Preserve the font size
    }
  });
}

// Replace cursive fonts
function replaceCursiveFonts(newFont) {
  document.querySelectorAll("*").forEach(function (element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;

    // Use a regular expression to match whole words
    if (/\bcursive\b/.test(fontFamily)) {
      element.style.fontFamily = fontFamily.replace(/\bcursive\b/g, newFont + ", cursive");
    }
  });
}

// Replace fantasy fonts
function replaceFantasyFonts(newFont) {
  document.querySelectorAll("*").forEach(function (element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;

    // Use a regular expression to match whole words
    if (/\bfantasy\b/.test(fontFamily)) {
      element.style.fontFamily = fontFamily.replace(/\bfantasy\b/g, newFont + ", fantasy");
    }
  });
}

// Replace fallback fonts
function replaceFallbackFonts(newFont) {
  // Helper function to check if a font is truly undeclared or falls back to browser defaults
  function isNoFontDeclared(element) {
    const tempElement = document.createElement("span");
    document.body.appendChild(tempElement);

    tempElement.style.all = "unset"; // Remove any styles or inheritance
    tempElement.style.visibility = "hidden"; // Keep it invisible
    tempElement.style.fontFamily = "initial"; // Force the browser default font

    const defaultFontFamily = window.getComputedStyle(tempElement).fontFamily;
    const elementFontFamily = window.getComputedStyle(element).fontFamily;

    document.body.removeChild(tempElement); // Clean up
    return elementFontFamily === defaultFontFamily;
  }

  // Apply fallback font logic
  document.querySelectorAll("*").forEach(function(element) {
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;

    // If the font is undeclared (matches browser default), apply the fallback font
    if (!fontFamily || fontFamily.trim() === "" || fontFamily === "initial" || isNoFontDeclared(element)) {
      element.style.fontFamily = newFont; // Set fallback font
    } else if (!fontFamily.includes(newFont)) {
      // Append the fallback font if it's not already in the font stack
      element.style.fontFamily = `${fontFamily}, ${newFont}`;
    }
  });
}