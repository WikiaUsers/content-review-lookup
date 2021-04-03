/* Any JavaScript here will be loaded for all users on every page load. */
let objects = document.querySelectorAll("#modify");
let atdInput = document.querySelector("#atdInput");

function modifyValues(value) {
	if (objects.length > 0) {
		objects.forEach((obj) => {
			let base = Number(objects.dataset.base);
			let modifier = Number(objects.dataset.modifier);
			let damage = atdInput && atdInput.value ? Number(atdInput.value) : 40;
			
			obj.innerText = base + damage * modifier;
		});
	}
}

modifyValues(atdInput.value);
atdInput.addEventListener("blur", (event) => modifyValues(event.target.value))