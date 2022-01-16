// This was reverse-engineered from https://ark.gamepedia.com/Widget:SpawnMap
// It is used to create an interactive target finder on [[Postal service]]
  
RLQ.push(['jquery', function () {
  
  if(document.getElementById("postal-map")){
    var input = document.createElement("input");
    input.setAttribute("id", "postal-input");
    input.setAttribute("placeholder", "Delivery target");
  
	  mw.loader.getScript("https://temtem.fandom.com/wiki/Mediawiki:Postal_map.js/data.js?action=raw\u0026ctype=text/javascript").then(function() {  

      var $select = $('<select id="postal-dropdown">')
          .append($('<option>').val('').text('Select a delivery target'))
          .change(function () {
              // when the dropdown updates, update the map and the input
              showLocation($(this).val());
              input.value = $(this).val();
          });
    
      // When the input updates, update the map and the dropdown
      input.addEventListener("input", function (e) {
        showLocation(this.value);
        $select.val(this.value);
      });

      // sort the target list by name
      targets.sort(function(a,b) {
        (a.name > b.name) ? 1 : -1;
      })
    
      // Create the list of names
      names = []
      targets.forEach(function (target) {
        names.push(target.name);
      });
      // Add the list of names to the dropdown menu
      names.forEach(function (name) {
        $select.append($('<option>').text(name));
      });
    
      // Add the input and dropdown menu to the legend
      $('#legend-container').prepend($select);
      $('#postal-autocomplete').prepend(input);
    
      // start the autocomplete script
      postalAutocomplete(input, names);
      
      //Allows for use of # anchors in the url to start the map with that item selected
      var urlHash = decodeURIComponent(window.location.hash);
      if (urlHash) {
          input.value = urlHash.substr(1);
          showLocation(input.value);
      }
      
      function showLocation(name) {
        var $mapContainer = $('#postal-map').find('#map-container');
    
      
        // clear notes
        var description = document.querySelector("#legend-container .description");
        var locationLabel = document.querySelector("#legend-container .location");
        description.innerHTML = "";
        locationLabel.innerHTML = "";
    
        // clear the map
        $mapContainer.children('.delivery-target').remove();
        if (!name || !(names.includes(name))){
          // clear the # in the URL, but also keep the page from jumping back to the top
          lastPos = $(window).scrollTop();
          window.location.hash = '';
          $(window).scrollTop(lastPos);
          return;
        }
        else {
          $mapContainer.children('.selected').removeClass('selected');
        }
      
        // draw point to the map
      
        var $target = targets.find(function(t){return t.name === name});
        var pointSize = 10;
      
      // Remove all spaces and question marks (for The Highbelow?) in the target's location so we can get a valid HTML id
      // then find the map with that id and mark it as selected
        $mapContainer.children('#' + $target.map.replace(/ |\?/g, '')).addClass('selected');
      
        $mapContainer.prepend($('<div>').addClass('delivery-target')
          .css({'left': 'calc(' + $target.x + '%' + ' - ' + (pointSize / 2) + 'px)',
            'top': 'calc(' + $target.y + '%' + ' - ' + (pointSize / 2) + 'px)',
            'width': pointSize,
            'height': pointSize})
        );
    
        locationLabel.innerHTML = $target.map;
    
        if ($target.note != undefined){
          description.innerHTML=$target.note;
        }
    
        window.location.hash = name;
      };
      
      // autcomplete functionality was copied with modification from https://www.w3schools.com/howto/howto_js_autocomplete.asp
      function postalAutocomplete(inp, arr) {
        // the autocomplete function takes two arguments, the text field element and an array of possible autocompleted values:
    
        var currentFocus;
    
        // execute a function when someone writes in the text field:
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value.toLowerCase();
    
            var maxResults = 10;
    
            // close any already open lists of autocompleted values
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
    
            // create a div element that will contain the items (values):
            a = document.createElement("div");
            a.setAttribute("id", "postal-autocomplete-list");
            a.setAttribute("class", "postal-autocomplete-items");
    
            // append the div element as a child of the autocomplete container:
            this.parentNode.appendChild(a);
    
            // bottomStart is going to point to the bottom element of the half of the list that contains
            // the results that start with the input. We use this to sort this half of the list alphabetically
            var bottomStart = null
            // for each item in the array...
            for (i = 0; i < arr.length; i++) {
              var currentName = arr[i].toLowerCase();
              if(targets[i].normalized){
                currentName = targets[i].normalized.toLowerCase();
              }
              // check if the item starts with or contains the same letters as the text field value:
              if (currentName.substr(0, val.length) == val || currentName.includes(val)) {
                // create a div element for each matching element:
                b = document.createElement("div");
    
                // make the matching letters bold:
                var index = currentName.indexOf(val);
                b.innerHTML = arr[i].substr(0, index) + "<strong>" + arr[i].substr(index, val.length) + "</strong>" + arr[i].substr(index + val.length);
    
                // insert an input field that will hold the current array item's value:
                // Replace apostrophes with their html entity so they don't end the string
                b.innerHTML += "<input type='hidden' value='" + arr[i].replace("\'", "&#39;") + "'>";
    
                // execute a function when someone clicks on the item value (DIV element):
                b.addEventListener("click", function(e) {
                  // insert the value for the autocomplete text field:
                  inp.value = this.getElementsByTagName("input")[0].value;
    
                  showLocation(document.getElementById("postal-input").value);
    
                  // close the list of autocompleted values
                  closeAllLists();
                });
    
                // Add the suggestion to the list, prioritizing starting with over containing
                if(index == 0) {
                  // if our input is at the start of the string
                  if(!bottomStart){
                    a.prepend(b);
                    bottomStart = b;
                  }
                  else {
                    bottomStart.insertAdjacentElement('afterend', b);
                    bottomStart = b;
                  }
                }
                else if (a.children.length <= maxResults) {
                  // if our input is within the string, but not at the start, and we haven't reached results cap
                  a.append(b);
                }
    
                // show no more than 10 suggestions at once
                if(a.children.length > maxResults) {
                  a.lastChild.remove();
                }
              }
            }
        });
    
        // execute a function when a key is pressed:
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById("postal-autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              // If the arrow DOWN key is pressed, increase the currentFocus variable:
              currentFocus++;
              // and make the current item more visible:
              addActive(x);
            } else if (e.keyCode == 38) {
              //If the arrow UP key is pressed, decrease the currentFocus variable:
              currentFocus--;
              // and make the current item more visible:
              addActive(x);
            } else if (e.keyCode == 13) {
              // If the ENTER key is pressed, prevent the form from being submitted,
              e.preventDefault();
              if (currentFocus > -1) {
                // and simulate a click on the "active" item:
                if (x) x[currentFocus].click();
              }
            }
        });
    
        function addActive(x) {
          // classify an item as "active":
          if (!x) return false;
    
          //start by removing the "active" class on all items:
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
    
          // add class "postal-autocomplete-active":
          x[currentFocus].classList.add("postal-autocomplete-active");
        }
    
        function removeActive(x) {
          // remove the "active" class from all autocomplete items:
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("postal-autocomplete-active");
          }
        }
    
        function closeAllLists(elmnt) {
          // close all autocomplete lists in the document, except the one passed as an argument:
          var x = document.getElementsByClassName("postal-autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
    
        // close the autocomplete when someone clicks in the document:
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
    });
  }
}]);