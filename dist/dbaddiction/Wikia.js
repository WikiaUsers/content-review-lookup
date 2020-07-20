$(document).ready(function() {
    var newSection = '<section id="activities" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

$(function() {
    if(mw.config.get('wgCanonicalSpecialPageName') !== "Upload") {
        return;
    }
    $.get("/wiki/MediaWiki:Uploadtext", { action: "render" }, function(d) {
        $("#uploadtext").html(d);
    });
});

/*mw.hook('DiscordIntegrator.added').add(function() {
    new mw.Api().get({
        action: 'parse',
        text: '{{Sidebar}}'
    }, function(data) {
        $(
            $('<section>')
                .attr({
                    id: 'activities',
                    class: 'module'
                })
                .html(data.parse.text['*'])
        ).insertBefore('.DiscordIntegratorModule');
    });
});*/

/** Tabbers Java **/

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}