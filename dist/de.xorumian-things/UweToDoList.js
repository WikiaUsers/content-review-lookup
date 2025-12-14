setTimeout(() => {
    const toDoButton = document.querySelector(".uwe-todo-button");
    const toDoText = document.querySelector(".uwe-todo-text");

    // check status
    const savedState = localStorage.getItem("uwe-todo-hidden");

    if (savedState === "true") {
        toDoText.classList.add("hidden");
    } else if (savedState === "false") {
        toDoText.classList.remove("hidden");
    }

    // toggle and save status
    toDoButton.addEventListener("click", () => {
        toDoText.classList.toggle("hidden");

        // save new staus
        const isHidden = toDoText.classList.contains("hidden");
        localStorage.setItem("uwe-todo-hidden", isHidden);
    });
}, 5000);