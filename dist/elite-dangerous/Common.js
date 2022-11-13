/* Any JavaScript here will be loaded for all users on every page load. */

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

/* START - switching images for the main page navigation buttons */

$("#ShipsButton img").hover(function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/9/9b/Ships_Selected.png");}, function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/1/19/Ships_Default.png");});

$("#OutfittingButton img").hover(function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/7/76/Outfitting_Selected.png");}, function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/f/fc/Outfitting_Default.png");});

$("#EngineersButton img").hover(function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/d/da/Engineers_Selected.png");}, function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/9/96/Engineers_Default.png");});

$("#RanksButton img").hover(function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/8/80/Ranks_Selected.png");}, function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/f/f3/Ranks_Default.png");});

$("#FactionsButton img").hover(function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/d/de/Factions_Selected.png");}, function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/b/bc/Factions_Default.png");});

$("#StarsButton img").hover(function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/9/9b/Stars_Selected.png");}, function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/9/90/Stars_Default.png");});

$("#PlanetsButton img").hover(function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/8/8d/Planets_Selected.png");}, function() {$(this).attr("src", "https://vignette.wikia.nocookie.net/elite-dangerous/images/a/a3/Planets_Default.png");});

$("#RolesButton img").hover(function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/0/01/Roles_Selected.png");}, function() {$(this).attr("src", "https://images.wikia.nocookie.net/elite-dangerous/images/4/4d/Roles_Default.png");});

/* END - switching images for the main page navigation buttons */