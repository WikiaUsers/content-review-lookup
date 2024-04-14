/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

window.SpoilerAlertJS = {
    question: 'Spoilers Ahead! Proceed Anyway?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:CollapsiblePageTools.js',
		]
});

//Search the Wiki for relavant content
async function searchWiki(term) {
  const endpoint = `https://${location.hostname}/api.php`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: term,
      srprop: 'size',
    }),
  });

  const result = await response.json();
  return result.query.search;
}

//Copy those paragraphs
function copyMatchingParagraphs(searchResults, term) {
  const paragraphs = [];
  searchResults.forEach(result => {
    const doc = new DOMParser().parseFromString(result.snippet, 'text/html');
    const pageParagraphs = doc.querySelectorAll('p');
    pageParagraphs.forEach(paragraph => {
      if (paragraph.textContent.includes(term)) {
        paragraphs.push(paragraph.textContent);
      }
    });
  });
  return paragraphs;
}

// Paste the paragraphs 
function pasteArticle(articleText) {
  const editor = document.querySelector('.cke_editable.cke_editable_themed');
  editor.innerHTML = articleText;
}

// Generate an article on ChatGPT
function generateArticle(paragraphs) {
  return _generateArticle.apply(this, arguments);
}

function _generateArticle() {
  _generateArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(paragraphs) {
    var endpoint, headers, body, response, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = 'https://api.openai.com/v1/chatgpt';
            headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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',
            };
            body = {
              prompt: "Please write a Fandom wiki article about this topic, based on the following information:\n".concat(paragraphs.join('\n')),
              temperature: 0.5,
              max_tokens: 1000,
            };
            _context.next = 5;
            return fetch(endpoint, {
              method: 'POST',
              headers: headers,
              body: body
            });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            result = _context.sent;
            return _context.abrupt("return", result.response);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateArticle.apply(this, arguments);
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}



// Add an event listener to all redlinks on the page
const redlinks = document.querySelectorAll('.new');
redlinks.forEach(redlink => {
  redlink.addEventListener('click', () => {
    // Get the page name of the redlink
    const pageName = redlink.innerText;

    // Search the wiki for information related to the page name
    const searchResults = searchWiki(pageName);

    // Copy any paragraphs containing the page name
    const paragraphs = copyMatchingParagraphs(searchResults, pageName);

// Send the paragraphs to ChatGPT and ask it to write a wiki article
generateArticle(paragraphs).then(function(articleText) {
  // Do something with the article text here
});


    // Copy and paste the article text into the editor for the redlink article
    pasteArticle(articleText);
  });
});

function searchWiki(pageName) {
  // TODO: Implement search function
}

function copyMatchingParagraphs(searchResults, pageName) {
  // TODO: Implement paragraph copying function
}

async function generateArticle(paragraphs) {
  const apiKey = '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';
  const endpoint = 'https://api.chatgpt.com/generate';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      paragraphs: paragraphs,
    }),
  });

  const result = await response.json();
  return result.article;
}

function pasteArticle(articleText) {
  // TODO: Implement paste function
}

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a[href*="/products/"]');
    links.forEach(function(link) {
        link.href = link.href.replace(/_/g, '-');
    });
});

//Create a box when hovering over reference tags! 
document.addEventListener('DOMContentLoaded', function() {
    // Select all <sup> elements with class 'reference'
    const refs = document.querySelectorAll('sup.reference');

    refs.forEach(ref => {
        ref.addEventListener('mouseenter', function() {
            // Get the reference id
            const refId = this.id;

            // Find the corresponding content element by looking for an element with an id that starts with 'cite_note-'
            const refContentId = refId.replace('cite_ref', 'cite_note');
            const refContentElement = document.getElementById(refContentId);

            if (refContentElement) {
                const refContent = refContentElement.innerHTML;

                // Create and show the tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'ref-tooltip';
                tooltip.innerHTML = refContent;
                this.appendChild(tooltip);
                tooltip.style.opacity = 1;
            }
        });

        ref.addEventListener('mouseleave', function() {
            // Remove the tooltip on mouse leave
            const tooltip = this.querySelector('.ref-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});