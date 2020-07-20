var quotes = [
    "quote1",
    "quote2",
    "quote3",
    "quote4",
    "quote5",
    ];

var i = 0;

setInterval(function() {
$("#textslide").html(quotes[i]);
    if (i == quotes.length) {
        i = 0;
    }
    else {
        i++;
    }
}, 10 * 1000);