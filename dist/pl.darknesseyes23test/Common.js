function toggleDropdown(id) {
	var dropdown = document.getElementById(id);
	if (!dropdown) return;
	
	dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}