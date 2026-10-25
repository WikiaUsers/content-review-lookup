/ Any JavaScript here will be loaded for all users on every page load. /

// applying knight order colors inline - see KnightHighlights.css

//unneeded, can detect fandom light or dark css class
// const rootElement = document.documentElement;
// const bgColor = getComputedStyle(rootElement).getPropertyValue("--theme-page-background-color").trim();
//  console.log(bgColor)
//these come from the defined theme!
// const bgIsLightMode = bgColor ? "#edeee8" : "#1e1c12";

document.querySelectorAll('a[href="/wiki/Knights_Adamant"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Adamant"]').forEach(a => {
    a.classList.add("adamant-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Jubilant"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Jubilant"]').forEach(a => {
    a.classList.add("jubilant-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Mystic"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Mystic"]').forEach(a => {
    a.classList.add("mystic-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Vigilant"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Vigilant"]').forEach(a => {
    a.classList.add("vigilant-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Radiant"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Radiant"]').forEach(a => {
	a.classList.add("radiant-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Resplendent"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Resplendent"]').forEach(a => {
	a.classList.add("resplendent-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_of_the_Mother"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_of_the_Mother"]').forEach(a => {
	a.classList.add("mother-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Discordant"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Discordant"], a[href="/wiki/Knights_Angelic_(defected)"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Angelic_(Defected)"]').forEach(a => {
	a.classList.add("angelic-original-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Angelic_(reformed)"], a[href="/wiki/Holy_Orders_of_Knighthood#Knights_Angelic_(Reformed)"]').forEach(a => {
	a.classList.add("angelic-reformed-highlight");
});

document.querySelectorAll('a[href="/wiki/Knights_Angelic"]').forEach(a => {
	a.classList.add("angelic-disambig-highlight");
});

document.querySelectorAll('a[href="/wiki/Diarchy_Armed_Forces"]').forEach(a => {
	a.classList.add("diarchy-armed-forces-highlight");
});