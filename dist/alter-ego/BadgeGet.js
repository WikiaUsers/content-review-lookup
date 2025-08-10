// working approved implementation at https://tds.fandom.com/wiki/MediaWiki:Common.js
// Find all elements with a class that contains "id" followed by digits (e.g., id2124475816)
document.querySelectorAll('[class*="id"]').forEach(el => {
  const match = el.className.match(/id(\d{5,})/); // extract the badge ID from the class name
  if (!match) return; // skip if no match found

  const badgeId = match[1]; // extracted badge ID
  const script = document.createElement('script');
  script.src = 'https://occulticnine.vercel.app/badges?id=' + badgeId;

  document.head.appendChild(script); // Append badge count to class
});