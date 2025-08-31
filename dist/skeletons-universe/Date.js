function updateClock() {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();
	const day = now.getDate();
	const hour = now.getUTCHours();
	const minute = now.getUTCMinutes();
	const second = now.getUTCSeconds();
	const formatted = `${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
	const elements = document.querySelectorAll(".date");
	if(elements.length === 0) return;
	for(const element of elements) {
		element.innerText = formatted;
	}
}
setInterval(updateClock, 1000);