//-----Devotion Day
window.onload = function() {
    // Set the date we're counting down to
    var countDownDate = new Date("Feb 19, 2019 21:00:00").getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get todays date and time
      var now = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      document.getElementById("devotion-day").innerHTML = days + " 天 " + hours + " 時 "
      + minutes + " 分 " + seconds + " 秒 ";
    
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("devotion-day").innerHTML = "0 天 0 時 0 分 0 秒";
      }
    }, 1000);
}

//-----Rail
window.AddRailModule = [{prepend: true}];

//-----Steam Widget
$("#steam-store-widget").replaceWith('<iframe src="https://store.steampowered.com/widget/1006510/" frameborder="0" width="100%" height="190"></iframe>');