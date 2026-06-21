$(document).ready(function () {

    function updateStockTimer() {
        const now = new Date();
        const utcMs = now.getTime();

        // 2‑hour cycle = 7,200,000 ms
        const cycle = 2 * 60 * 60 * 1000;

        // Find the next 2‑hour boundary after the current UTC time
        const nextReset = Math.ceil(utcMs / cycle) * cycle;

        // Ensure the next reset is in the *next hour* (not the current hour)
        // If the nextReset is in the same hour, push it to the next boundary
        const currentHour   = Math.floor(utcMs / (60 * 60 * 1000));
        const resetHour     = Math.floor(nextReset / (60 * 60 * 1000));
        if (resetHour === currentHour) {
            // already in the same hour => jump to the *next* 2‑hour slot
            nextReset += cycle;
        }

        const diff    = nextReset - utcMs;
        const hours   = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        $(".stock-timer").each(function () {
            this.innerHTML =
                "Next Stock Reset: " +
                hours + "h " +
                minutes + "m " +
                seconds + "s";
        });
    }

    updateStockTimer();
    setInterval(updateStockTimer, 1000);
});

$(function() {

    $('#filter-sea').html(
        '<select id="filterSea">' +
            '<option value="">All Seas</option>' +
            '<option value="sea-1">Sea 1</option>' +
            '<option value="sea-2">Sea 2</option>' +
            '<option value="sea-3">Sea 3</option>' +
        '</select>'
    );

});

$(function() {
	$('#filter-rarity').html(
		'<select id="filterrarity"<option value="common">Common</option>><option value="uncommon">Uncommon</option><option value="rare">Rare</option><option value="legendary">Legendary</option><option value="mythical">Mythical</option></select>');
});

$(function() {
	$('#accessoriesBackground').html(`
		<div style="display: flex; margin: 10px;">
        <select>'
        <option value="AllSeas">All Seas</option>
        <option value="1st Sea">1st Sea</option>
        <option value="2nd Sea">2nd Sea</option>
        <option value="3rd Sea">3rd Sea</option>
        </select>
        <select>
        <option value="AllRarities">All Rarities</option>
        <option value="Common">Commons</option> 
        <option value="Uncommon">Uncommons</option> 
        <option value="Rare">Rares</option> 
        <option value="Legendary">Legendaries</option> 
        <option value="Mythical">Mythicals</option> 
        </select> 
        <form> 
        <input type="text" id="fname" name="fname"> 
        </form> 
        </div>`
        );
});