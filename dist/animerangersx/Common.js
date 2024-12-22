/* Any JavaScript here will be loaded for all users on every page load. */
// JavaScript: Filtering Logic
document.addEventListener("DOMContentLoaded", () => {
  const filterOptions = document.querySelectorAll(".filter-option");
  const rangerCards = document.querySelectorAll(".ranger-card");

  filterOptions.forEach(option => {
    option.addEventListener("click", function () {
      // Remove 'active' class from all options
      filterOptions.forEach(opt => opt.classList.remove("active"));

      // Add 'active' class to the clicked option
      this.classList.add("active");

      // Get the selected rarity
      const selectedRarity = this.getAttribute("data-rarity");

      // Show or hide ranger cards based on rarity
      rangerCards.forEach(card => {
        const cardRarity = card.getAttribute("data-rarity");

        if (selectedRarity === "all" || cardRarity === selectedRarity) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});