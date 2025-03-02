/* Any JavaScript here will be loaded for all users on every page load. */
switch (mw.config.get('wgPageName')) {
    case 'Story':
document.addEventListener("DOMContentLoaded", function () {
    // Stage data for each map
    const mapStages = {
        "map1": ["Stage 1-1", "Stage 1-2", "Stage 1-3"],
        "map2": ["Stage 2-1", "Stage 2-2", "Stage 2-3"],
        "map3": ["Stage 3-1", "Stage 3-2", "Stage 3-3"]
    };

    // Select all map boxes
    const mapBoxes = document.querySelectorAll(".map-box");
    const chapterSelection = document.querySelector(".chapter-selection");

    // Function to update stages based on selected map
    function updateStages(mapKey) {
        chapterSelection.innerHTML = "<h3>Chapter Selection</h3>"; // Reset

        if (mapStages[mapKey]) {
            mapStages[mapKey].forEach(stage => {
                let stageDiv = document.createElement("div");
                stageDiv.classList.add("stage");
                stageDiv.textContent = stage;
                chapterSelection.appendChild(stageDiv);
            });
        }
    }

    // Add click event to all map boxes
    mapBoxes.forEach(box => {
        box.addEventListener("click", function () {
            // Get map ID from data attribute
            let selectedMap = this.getAttribute("data-map");
            
            // Update stages
            updateStages(selectedMap);

            // Highlight the selected map
            mapBoxes.forEach(box => box.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});

        break;
    case 'some other page':
        // JS here will be applied to "some other page"
        break;
}