function loadConRPStats() {
  fetch('https://conrp-stats-bot-production.up.railway.app/api/stats')
    .then(res => res.json())
    .then(data => {
      const discordEl = document.getElementById('conrp-discord-stats');
      const youtubeEl = document.getElementById('conrp-youtube-stats');

      if (discordEl) {
        discordEl.textContent = data.discord.online + ' online / ' + data.discord.total + ' total';
      }
      if (youtubeEl) {
        youtubeEl.textContent = data.youtube.subscribers + ' subscribers';
      }
    })
    .catch(err => console.error('ConRP stats fetch failed:', err));
}

if (document.getElementById('conrp-discord-stats') || document.getElementById('conrp-youtube-stats'))
  loadConRPStats();