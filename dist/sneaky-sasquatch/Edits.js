// Replace CSS placeholder with real edit count on profile pages
(function () {
  // Only run on user pages
  if (!mw.config.get('wgIsProfile')) return;

  // Get username from the profile page
  const username = mw.config.get('wgTitle');

  // Fetch the edit count via Fandom's API
  fetch(
    `https://${mw.config.get('wgDBname')}.fandom.com/api.php?action=query&list=users&ususers=${encodeURIComponent(
      username
    )}&usprop=editcount&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const userInfo = data?.query?.users?.[0];
      if (!userInfo || userInfo.editcount === undefined) return;

      // Find your stat element (CSS placeholder)
      const stat = document.querySelector(
        '#userProfileApp ul.user-identity-stats > li:first-child'
      );

      if (stat) {
        // Remove CSS "1234 edits" placeholder
        stat.innerHTML = '';

        // Create new elements for real edit count
        const countEl = document.createElement('strong');
        countEl.textContent = userInfo.editcount;

        const textEl = document.createElement('span');
        textEl.textContent = ' edits';

        // Add them into the profile stats
        stat.appendChild(countEl);
        stat.appendChild(textEl);
      }
    })
    .catch((e) => console.error('Failed loading edit count', e));
})();