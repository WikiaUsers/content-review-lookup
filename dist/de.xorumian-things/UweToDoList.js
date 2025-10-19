setTimeout(() => {
	const toDoButton = document.querySelector(".uwe-todo-button");
	const toDoText = document.querySelector(".uwe-todo-text");
	
	toDoButton.addEventListener("click", () => {
	    toDoText.classList.toggle("hidden");
	});
}, 5000);