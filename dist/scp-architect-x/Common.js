function getNextSaturdayTarget() {
  const now = new Date();
  const target = new Date(now);

  // Set target time to 11:00:00.000
  target.setHours(11, 0, 0, 0);

  // Calculate days until the next Saturday (Saturday is 6)
  // (6 - currentDay + 7) % 7 gives days until next Saturday
  let daysAhead = (6 - now.getDay() + 7) % 7;

  // If today is Saturday and it's already past 11:00 AM, target next week's Saturday
  if (daysAhead === 0 && now >= target) {
    daysAhead = 7;
  }

  target.setDate(now.getDate() + daysAhead);
  return target;
}

function updateCountdown() {
  const now = new Date().getTime();
  const targetTime = getNextSaturdayTarget().getTime();
  const difference = targetTime - now;

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Output the result (Replace this with your UI update logic)
  console.log(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);

  // Optional: Trigger an event when the countdown hits zero
  if (difference <= 0) {
    console.log("It's Saturday 11:00 AM!");
  }
}

// Run the countdown every second
setInterval(updateCountdown, 1000);

// Run immediately on load
updateCountdown();