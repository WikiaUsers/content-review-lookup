window.addEventListener("load", function () {
  console.log("Page fully loaded");

  const container = document.querySelector(".community-header-wrapper");

  if (!container) {
    console.log("Container not found");
    return;
  }

  console.log("Container found");

  // Prevent duplicates
  if (document.getElementById("UTCClock")) return;

  const clock = document.createElement("a");
  clock.id = "UTCClock";
  clock.href = "?action=purge";
  clock.title = "UTC Clock";

  container.appendChild(clock);

  function updateClock() {
    const now = new Date();

    const time = now.toUTCString().split(" ")[4];
    const date = now.toUTCString().split(" ").slice(1, 4).join(" ");

    clock.textContent = time + " " + date + " (UTC)";
  }

  updateClock();
  setInterval(updateClock, 1000);
});