let isAwaken = false;

document.getElementById("fruit_awk_btn").addEventListener("click", function () {
    const defaultSkills = document.querySelectorAll(".default-skills");
    const awakenSkills = document.querySelectorAll(".awaken-skills");

    // Toggle the state
    isAwaken = !isAwaken;

    if (isAwaken) {
        // Show Awaken Skills
        defaultSkills.forEach(skill => skill.style.display = "none");
        awakenSkills.forEach(skill => skill.style.display = "block");
    } else {
        // Show Default Skills
        defaultSkills.forEach(skill => skill.style.display = "block");
        awakenSkills.forEach(skill => skill.style.display = "none");
    }
});