// Interactive Wasteland map
// Makes locations in the interactive main page map clickable

document.querySelectorAll("#MP-map .map-location").forEach(function(location) {
    const id = location.id;
    location.addEventListener("click", function() {
        if (id === "location-lm") {
            window.location = "/wiki/Lonesome_Manor";
        }
        if (id === "location-potw") {
            window.location = "/wiki/Pirates_of_the_Wasteland";
        }
        if (id === "location-ms") {
            window.location = "/wiki/Mean_Street";
        }
        if (id === "location-gv") {
            window.location = "/wiki/Gremlin_Village";
        }
        if (id === "location-dbc") {
            window.location = "/wiki/Dark_Beauty_Castle";
        }
        if (id === "location-ot") {
            window.location = "/wiki/OsTown";
        }
        if (id === "location-mjm") {
            window.location = "/wiki/Mickeyjunk_Mountain";
        }
        if (id === "location-tc") {
            window.location = "/wiki/Tomorrow_City";
        }
    });
});