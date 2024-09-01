(function() {
    if (window.innerWidth > 600) return;

    var calendarContainer = document.getElementById("calendar-container-m");

    if (!calendarContainer) return;

    var message = document.createElement("p");
    message.textContent = "JS работает на мобилках";
    message.style.color = "green";
    message.style.fontSize = "20px";
    calendarContainer.appendChild(message);
})();