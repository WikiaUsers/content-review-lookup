document.addEventListener("DOMContentLoaded", () => {
    const toDoButton = document.querySelector(".uwe-todo-button");
    const toDoText = document.querySelector(".uwe-todo-text");

    if (toDoButton && toDoText) { 
        toDoButton.addEventListener("click", () => {
            toDoText.classList.toggle("hidden");
        });
    } else {
        console.error("toDoButton & toDoText not found");
    }
});