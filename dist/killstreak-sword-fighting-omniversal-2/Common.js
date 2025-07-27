/* Any JavaScript here will be loaded for all users on every page load. */
window.AddRailModule = [{prepend: true}];

$(document).ready(function () {
  const keywordData = {
    "Quacamovie": {
      link: "Quacamovie",
      style: "background:linear-gradient(45deg,Purple,Pink); -webkit-background-clip:text !important; -webkit-text-fill-color:transparent; font-weight: bold;"
    }
 };

const currentPage = window.location.pathname.split('/').pop();
  const content = document.getElementById("mw-content-text");
  if (!content) return;

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  for (const [keyword] of Object.entries(keywordData)) {
    const elements = content.querySelectorAll("a, span");
    for (const el of elements) {
      if (el.textContent.trim().toLowerCase() === keyword.toLowerCase()) {
        const textNode = document.createTextNode(el.textContent);
        el.replaceWith(textNode);
      }
    }
  }

function processNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    for (let child of Array.from(node.childNodes)) {
      processNode(child);
    }
  }

if (node.nodeType === Node.TEXT_NODE && node.parentNode && !node.parentNode.closest('.keyword-replaced')) {
  let originalText = node.nodeValue;
  let parent = node.parentNode;
  let container = document.createElement('span');

  const sortedKeywordEntries = Object.entries(keywordData).sort((a, b) => b[0].length - a[0].length);

  let replaced = false;

  for (const [keyword, { link, style }] of sortedKeywordEntries) {
    const escapedKeyword = escapeRegExp(keyword);
    const needsBoundaries = /^[\w\s]+$/.test(keyword) && !/[:()]/.test(keyword);

    const regex = new RegExp(
      needsBoundaries
        ? "(\\`)?\\b(" + escapedKeyword + ")\\b(?!-)"
        : "(\\`)?(" + escapedKeyword + ")(?!-)",
      "gi"
    );

    if (regex.test(originalText)) {
      const newHTML = originalText.replace(regex, (match, backtick, keywordMatch) => {
        if (backtick) return keywordMatch;

        const content = (link.toLowerCase() === currentPage.toLowerCase())
          ? `<span class="keyword-replaced" style="${style}">${keywordMatch}</span>`
          : `<a class="keyword-replaced" href="/wiki/${link}" style="${style}">${keywordMatch}</a>`;

        return content;
      });

      container.innerHTML = newHTML;
      parent.replaceChild(container, node);
      replaced = true;
      break;
    }
  }

  if (!replaced && originalText.includes('`')) {
    const cleanedText = originalText.replace(/\`(?=\w)/g, '');
    if (cleanedText !== originalText) {
      const cleanedNode = document.createTextNode(cleanedText);
      parent.replaceChild(cleanedNode, node);
    }
  }
}
}

  processNode(content);
});