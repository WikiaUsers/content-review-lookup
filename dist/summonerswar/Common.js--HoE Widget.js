/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
  var regions = {
    Global: {
      timeZone: 'America/Los_Angeles',
      offset: -8
    },
    EU: {
      timeZone: 'Europe/Berlin',
      offset: 1
    },
    KR: {
      timeZone: 'Asia/Seoul',
      offset: 9
    },
    Asia: {
      timeZone: 'Asia/Shanghai',
      offset: 8
    }
  }

  var hoeTimezoneKey = 'hoe_timezone';

  function isDST(t) {
    //t is the date object to check, returns true if daylight saving time is in effect.
    var jan = new Date(t.getFullYear(), 0, 1);
    var jul = new Date(t.getFullYear(), 6, 1);

    return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) == t.getTimezoneOffset();
  }

  function initHoEWidget() {
    var wikiaRail = document.getElementById("WikiaRail");
    if (wikiaRail) {
      //get region and timezone
      const region = localStorage.getItem(hoeTimezoneKey) === null ? 'Global' : localStorage.getItem(hoeTimezoneKey);

      // Create widget
      var widget = document.createElement("div");
      widget.id = "hoe_widget";
      widget.setAttribute("style", "border:1px solid #cccccc; margin-bottom: 10px; padding: 20px 0px 20px;");

      // Create img tag to get ready for image to be inserted later
      var hoe_img = document.createElement("img");
      hoe_img.id = "hoe_img";
      hoe_img.setAttribute("style", "display:block; margin:auto;");

      // Create link for image to respective hall's page
      var hoe_imgLink = document.createElement("a");
      hoe_imgLink.id = "hoe_imgLink";
      // Add anchor to img
      hoe_imgLink.appendChild(hoe_img);

      // Create text for time remaining
      var timer = document.createElement("div");
      timer.id = "hoe_timer";
      timer.setAttribute("style", "font-size:120%; text-align:center; border:2px solid black; border-radius: 12px; margin: 3px 35px 8px 35px");

      // Create name for hall
      var hallNameDiv = document.createElement("div");
      hallNameDiv.id = "hoe_title";

      // Add hall name, link, image and timer text to div
      widget.appendChild(hallNameDiv);
      widget.appendChild(hoe_imgLink);
      widget.appendChild(timer);

      //Checkboxes
      var checkbox_string = '';
      for (var region_key in regions) {
        var checked = (region === region_key) ? 'checked="checked"' : '';
        checkbox_string += '<input type="radio" id="hoe_widget_region_' + region_key.toLowerCase() + '" name="hoe_timezone" value="' + region_key + '" ' + checked + '><label for="hoe_widget_region_' + region_key.toLowerCase() + '">' + region_key + '</label>';
      }

      // Add widget to the Wikia Rail
      wikiaRail.insertBefore(widget, wikiaRail.childNodes[0]);

      $('#hoe_widget').append('<div id="hoe_widget_regions" style="text-align: center; margin-bottom: 8px;">' + checkbox_string + '</div>');

      var pdtTime = new Date();
      // If is Daylight Savings, -7, otherwise -8
      var dstDiff = isDST(pdtTime) ? (regions[region].offset + 1) : regions[region].offset;
      pdtTime = new Date(pdtTime.getUTCFullYear(), pdtTime.getUTCMonth(), pdtTime.getUTCDate(), pdtTime.getUTCHours() + dstDiff, pdtTime.getUTCMinutes(), pdtTime.getUTCSeconds());

      var day = pdtTime.toString().slice(0, 3);
      var hour = pdtTime.toString().slice(16, 18);
      var minute = pdtTime.toString().slice(19, 21);
      var second = pdtTime.toString().slice(22, 24);

      var currentTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate(), pdtTime.getHours(), pdtTime.getMinutes(), pdtTime.getSeconds());

      // All Attribute Dungeons Event on? Set it under Mystrile's profile page (hidden at the end)
      var settings = document.createElement("div");
      settings.id = "hoe-widget-data";
      settings.style.display = "none";
      $(settings).load("//summonerswar.wikia.com/wiki/User:M͢ystr͢ile #lazy-hoe-all", function() {
        widget.appendChild(settings);

        // Check if all attribute dungeons open (based on Mystrile's page)
        var allHallsOpen = $("#lazy-hoe-all-open").text() == "true" ? true : false;
        var allHallsYear = parseInt($("#lazy-hoe-all-year").text());
        var allHallsMonth = parseInt($("#lazy-hoe-all-month").text());
        var allHallsDay = parseInt($("#lazy-hoe-all-day").text());
        var allHallsImage = $("#lazy-hoe-all-image").text();
        var allHallsEnd = new Date(allHallsYear, allHallsMonth - 1, allHallsDay);

        if (allHallsOpen && (allHallsEnd - pdtTime >= 0)) {
          hoe_img.src = allHallsImage;
          hoe_img.height = 150;

          // Months are from 0 - 11, so March is 2, not 3
          remainingHallTimeInMs = Date.UTC(allHallsYear, allHallsMonth - 1, allHallsDay, 0, 0, 0);
          $("#hoe_timer").html("Time left: " + differenceInTime(currentTimeInMs, remainingHallTimeInMs));
          hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Cairos_Dungeon#Halls_of_Elements";

          // Remove specific HoE title when all halls open
          $("#hoe_title").remove();
        } else {
          var hallIcon;
          // Remaining time is usually until 12am the next day 
          var remainingHallTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate() + 1, 0, 0, 0);

          switch (day) {
            case "Sun":
              hallNameDiv.innerHTML = "Hall of Light";
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/b/bd/Guardian_of_Light_Symbol.png";
              hoe_img.title = "The Hall of Light is currently open! \n\nThe next hall to open will be Hall of Dark!";
              hoe_img.alt = "The Hall of Light is currently open! \n\nThe next hall to open will be Hall of Dark!";
              hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Hall_of_Light";
              hallNameDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid #ffd023; background-color: #f8f4d2; border-radius: 12px; margin: 3px 35px 8px 35px;");
              break;
            case "Mon":
              hallNameDiv.innerHTML = "Hall of Dark";
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/0/08/Guardian_of_Dark_Symbol.png";
              hoe_img.title = "The Hall of Dark is currently open! \n\nThe next hall to open will be Hall of Fire!";
              hoe_img.alt = "The Hall of Dark is currently open! \n\nThe next hall to open will be Hall of Fire!";
              hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Hall_of_Dark";
              hallNameDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid #4e4758; background-color: #80158b; color: #f3b5eb; border-radius: 12px; margin: 3px 35px 8px 35px;");
              break;
            case "Tue":
              hallNameDiv.innerHTML = "Hall of Fire";
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/c/c2/Guardian_of_Fire_Symbol.png";
              hoe_img.title = "The Hall of Fire is currently open! \n\nThe next hall to open will be Hall of Water!";
              hoe_img.alt = "The Hall of Fire is currently open! \n\nThe next hall to open will be Hall of Water!";
              hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Hall_of_Fire";
              hallNameDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid #fb7302; background-color: #b11d1e; color: #ffd73e; border-radius: 12px; margin: 3px 35px 8px 35px;");
              break;
            case "Wed":
              hallNameDiv.innerHTML = "Hall of Water";
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/3/3f/Guardian_of_Water_Symbol.png";
              hoe_img.title = "The Hall of Water is currently open! \n\nThe next hall to open will be Hall of Wind!";
              hoe_img.alt = "The Hall of Water is currently open! \n\nThe next hall to open will be Hall of Wind!";
              hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Hall_of_Water";
              hallNameDiv.setAttribute("style", "font-size:120%; text-align:center; background-color: #0554aa; color: #6ff5ff; border: 2px solid black; border-radius: 12px; margin: 3px 35px 8px 35px;");
              break;
            case "Thu":
              hallNameDiv.innerHTML = "Hall of Wind";
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/7/75/Guardian_of_Wind_Symbol.png";
              hoe_img.title = "The Hall of Wind is currently open! \n\nThe next hall to open will be Hall of Light!";
              hoe_img.alt = "The Hall of Wind is currently open! \n\nThe next hall to open will be Hall of Light!";
              hoe_imgLink.href = "//summonerswar.wikia.com/wiki/Hall_of_Wind";
              hallNameDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid #605747; border-radius: 12px; background-color: #c7a11e; color: #feeeb1; margin: 3px 35px 8px 35px;");
              break;
            case "Fri":
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/0/05/Guardian_of_Silhouette_Symbol.png";
              hoe_img.title = "The Hall of Elements is currently closed! \n\nThe next hall to open will be Hall of Light!"
              hoe_img.alt = "The Hall of Elements is currently closed! \n\nThe next hall to open will be Hall of Light!"
              remainingHallTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate() + 2, 0, 0, 0);
              break;
            case "Sat":
              hallIcon = "//vignette.wikia.nocookie.net/summoners-war-sky-arena/images/0/05/Guardian_of_Silhouette_Symbol.png";
              hoe_img.title = "The Hall of Elements is currently closed! \n\nThe next hall to open will be Hall of Light!"
              hoe_img.alt = "The Hall of Elements is currently closed! \n\nThe next hall to open will be Hall of Light!"
              break;
          }

          if (hallIcon != "") {
            hoe_img.src = hallIcon;
            hoe_img.height = 150;
            $("#hoe_timer").html("Time left: " + differenceInTime(currentTimeInMs, remainingHallTimeInMs));
          } else {
            $("#hoe_timer").html("Time to next hall: " + differenceInTime(currentTimeInMs, remainingHallTimeInMs));
          }

        }
      });
    }
  }

  initHoEWidget();

  $('#WikiaRail').on('change', 'input[name=hoe_timezone]', function() {
    localStorage.setItem(hoeTimezoneKey, $(this).val());
    $('#hoe_widget').remove();
    initHoEWidget();
  });

});

function differenceInTime(time1, time2) {
  var result = "";

  var difference = Math.floor(Math.abs(time1 - time2) / (60 * 1000));
  var divisors = [1440, 60, 1];
  var formats = ["d", "h", "m"];

  for (i = 0; i < divisors.length; i++) {
    var quotient = Math.floor(difference / divisors[i]) * divisors[i];
    var remainder = difference - quotient;

    if (difference > remainder || i == divisors.length - 1) {
      result += ((difference - remainder) / divisors[i]) + formats[i] + " ";
    } else {
      result += "";
    }

    difference = remainder;
  }

  return result;
}