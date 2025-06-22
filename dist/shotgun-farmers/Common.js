/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
  const container = document.querySelector('.sf-weekly-reset');
  if (!container) return; // fail safe if element not present

  function getNextFridayMidnightUTC() {
    const now = new Date();
    const day = now.getUTCDay();
    const daysUntilFriday = (5 - day + 7) % 7 || 7; // always positive, never 0
    const nextFriday = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysUntilFriday,
      0, 0, 0, 0
    ));
    return nextFriday;
  }

  function updateCountdown() {
    const now = new Date();
    const target = getNextFridayMidnightUTC();
    const diff = target - now;

    if (diff <= 0) {
      container.textContent = 'Rotating...';
      setTimeout(updateCountdown, 5000); // wait 5 seconds, then reset
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    container.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    setTimeout(updateCountdown, 1000);
  }

  updateCountdown();
})();