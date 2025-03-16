/*  fix the search bar for the custom theme  */
var htwcomnav = document.getElementById("community-navigation");
const observer = new MutationObserver(() => {
    htwcomnav.removeAttribute("inert");
    console.log("removed inert");
});
observer.observe(htwcomnav, {
  attributes: true,
  attributeFilter: ["inert"]
});