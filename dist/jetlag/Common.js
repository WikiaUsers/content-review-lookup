function displayCurrentTime() {
  var clockElement = document.getElementById("clock");
  var now = new Date();
  var hours = now.getHours();

  // Convert to 12-hour format
  var amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;  // Convert 0 to 12 and handle hours between 12-23

  clockElement.textContent = hours + " " + amPm;
}

// Call the function to display the time initially
displayCurrentTime();