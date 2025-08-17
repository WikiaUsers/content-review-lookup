// working approved implementation at https://tds.fandom.com/wiki/MediaWiki:Common.js
// Collect unique badge IDs to deduplicate them later
const badgeIds = new Set();

// Find all elements with a class that contains "id" followed by digits (e.g., id2124475816)
document.querySelectorAll('[class*="id"]').forEach(el => {
  const match = el.className.match(/id(\d{5,})/); // extract the badge ID from the class name
  if (match) badgeIds.add(match[1]); // add unique badge ID to Set
});

// Then fetch each unique ID
badgeIds.forEach(badgeId => {
  const script = document.createElement('script');
  script.src = 'https://occulticnine.vercel.app/badges?id=' + badgeId;
  document.head.appendChild(script); // Append badge count to class
});