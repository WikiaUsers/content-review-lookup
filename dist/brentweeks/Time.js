function getTimeframe(timezone) {
    // Check if a timezone is provided, default to UTC if not
    if (!timezone || timezone === "") {
        timezone = "UTC";
    }

    // Define the API URL for the specified timezone
    var apiUrl = "http://worldtimeapi.org/api/timezone/" + timezone;

    // Make an HTTP request to the WorldTimeAPI using Fetch API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract the current time from the response
            var time = data.utc_datetime;

            // Display the time on the page
            document.getElementById("time-display").textContent = time;
        })
        .catch(error => {
            console.error("Error fetching time:", error);
        });
}

// Call the getTimeframe function with the provided timezone
getTimeframe("{{#if:{{{1|}}}|{{{1}}}|UTC}}");