window.addEventListener("load", function () {
  console.log("✅ Window fully loaded");

  const container = document.querySelector(".community-header-wrapper");

  if (!container) {
    console.log("header container not found");
    return;
  }

  console.log("found header container");

  // Prevent duplicates
  if (document.getElementById("UTCClock")) return;

  const clock = document.createElement("div");
  clock.id = "UTCClock";

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