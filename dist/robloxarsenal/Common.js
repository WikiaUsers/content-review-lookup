/* Any JavaScript here will be loaded for all users on every page load. */
$wgNamespacesWithSubpages = [
	NS_MAIN => true,
	NS_TEMPLATE => true
];

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

/* dev:BackToTopButton/code.js features */
window.BackToTopModern = true;
window.BackToTopArrow = true;
window.BackToTopStart = 200;