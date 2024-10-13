/* Any JavaScript here will be loaded for all users on every page load.                      */

var pagename = mw.config.get("wgPageName")

$(function() {
  var x
  var y

//---------------------------------------- Hyperbolic
//---------------------------------------- Stun Grenade, Tougher Times, Old Guillotine, Sentient Meat Hook
  if ((pagename == "Stun_Grenade") || (pagename == "Tougher_Times") || (pagename == "Old_Guillotine") || (pagename == "Sentient_Meat_Hook")) {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out"></span></td></tr>')
    
    if (pagename == "Stun_Grenade")
      x = 0.05
    else if (pagename == "Tougher_Times")
      x = 0.15
    else if (pagename == "Old_Guillotine")
      x = 0.13
    else if (pagename == "Sentient_Meat_Hook")
      x = 0.2
      
    $("#mx-calc").on("input", function() {
      y = Math.min(((1 - 1 / (1 + x * Number($("#mx-calc").val()))) * 100).toFixed(1), 99.9)
      $("#mx-out").text(y + "%")
    })
  }
  
//---------------------------------------- Hyperbolic
//---------------------------------------- Little Disciple
  if (pagename == "Little_Disciple") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      y = Math.max((1 / (1/(35/3) * Number($("#mx-calc").val()))).toFixed(2), 0.01)
      $("#mx-out").text(y + "s")
    })
  }
  
//---------------------------------------- Exponential
//---------------------------------------- Genesis Loop
  else if (pagename == "Genesis_Loop") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      y = Math.max((30 / (Number($("#mx-calc").val()) + 1)).toFixed(2), 0.01)
      $("#mx-out").text(y + "s")
    })
  }
  
//---------------------------------------- Exponential
//---------------------------------------- Alien Head
  else if (pagename == "Alien_Head") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out1"></span></td><td><span id="mx-out2"></span></td><td><span id="mx-out3"></span></td><td><span id="mx-out4"></span></td><td><span id="mx-out5"></span></td><td><span id="mx-out6"></span></td><td><span id="mx-out7"></span></td><td><span id="mx-out8"></span></td><td><span id="mx-out9"></span></td><td><span id="mx-out10"></span></td></tr>')
    $("#calc-table th:last").before('<th><input id="mx-calc-cd" type="number" min="0.5" step="0.5" style="width:54px"> s</th>')
    $("#calc-table tr").each(function() {
      $("td:last", this).before('<td><span class="mx-outr"></span></td>')
    })
    
    $("#mx-calc").on("input", function() {
      x = Math.pow(0.75, Number($("#mx-calc").val()))
      $("#mx-out1").text(Math.max(parseFloat((2 * x).toFixed(2)), 0.5))
      $("#mx-out2").text(Math.max(parseFloat((3 * x).toFixed(2)), 0.5))
      $("#mx-out3").text(Math.max(parseFloat((4 * x).toFixed(2)), 0.5))
      $("#mx-out4").text(Math.max(parseFloat((5 * x).toFixed(2)), 0.5))
      $("#mx-out5").text(Math.max(parseFloat((6 * x).toFixed(2)), 0.5))
      $("#mx-out6").text(Math.max(parseFloat((7 * x).toFixed(2)), 0.5))
      $("#mx-out7").text(Math.max(parseFloat((8 * x).toFixed(2)), 0.5))
      $("#mx-out8").text(Math.max(parseFloat((10 * x).toFixed(2)), 0.5))
      $("#mx-out9").text(Math.max(parseFloat((12 * x).toFixed(2)), 0.5))
      $("#mx-out10").text(parseFloat(((1 - x) * 100).toFixed(1)) + "%")

      if ($("#mx-calc-cd").val())
        $(".mx-outr:last").text(Math.max(parseFloat((Number($("#mx-calc-cd").val()) * x).toFixed(2)), 0.5))
    })
    
    $("#mx-calc-cd").on("input", function() {
      if ($("#mx-calc-cd").val()) {
        x = Number($("#mx-calc-cd").val())
        y = $(".mx-outr").length

        $(".mx-outr").each(function(i) {
          i++

          if (i == y) {
            if ($("#mx-calc").val())
              x = Number($("#mx-calc").val())
            else {
              $(this).text("")
              return false
            }
          }

          $(this).text(Math.max(parseFloat((x * Math.pow(0.75, i)).toFixed(2)), 0.5))
        })
      }
      else
        $(".mx-outr").text("")
    })
  }
  
//---------------------------------------- Exponential (Equipment)
//---------------------------------------- Fuel Cell, Gesture of the Drowned
  else if ((pagename == "Fuel_Cell") || (pagename == "Gesture_of_the_Drowned")) {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out1"></span></td><td><span id="mx-out2"></span></td><td><span id="mx-out3"></span></td><td><span id="mx-out4"></span></td><td><span id="mx-out5"></span></td><td><span id="mx-out6"></span></td><td><span id="mx-out7"></span></td><td><span id="mx-out8"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      x = Number($("#mx-calc").val())

      if (pagename == "Fuel_Cell")
        x = Math.pow(0.85, x)
      else
        x = 0.5 * Math.pow(0.85, x - 1)

      $("#mx-out1").text(parseFloat((15 * x).toFixed(1)))
      $("#mx-out2").text(parseFloat((20 * x).toFixed(1)))
      $("#mx-out3").text(parseFloat((30 * x).toFixed(1)))
      $("#mx-out4").text(parseFloat((45 * x).toFixed(1)))
      $("#mx-out5").text(parseFloat((60 * x).toFixed(1)))
      $("#mx-out6").text(parseFloat((100 * x).toFixed(1)))
      $("#mx-out7").text(parseFloat((140 * x).toFixed(1)))
      $("#mx-out8").text(parseFloat(((1 - x) * 100).toFixed(1)) + "%")
    })
  }
  
//---------------------------------------- Special
//---------------------------------------- Bandolier
  else if (pagename == "Bandolier") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      y = Math.min(((1 - 1 / Math.pow(1 + Number($("#mx-calc").val()), 0.33)) * 100).toFixed(1), 99.9)
      $("#mx-out").text(y + "%")
    })
  }
  
//---------------------------------------- Special
//---------------------------------------- Shipping Request Form
  else if (pagename == "Shipping_Request_Form") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" min="1" style="width:54px"></td><td><span id="mx-out1"></span></td><td><span id="mx-out2"></span></td><td><span id="mx-out3"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      x = Number($("#mx-calc").val())
      y = 79 + 20*x + Math.pow(x, 2)
      $("#mx-out1").text((79 / y * 100).toFixed(2) + "%")
      $("#mx-out2").text((20*x / y * 100).toFixed(2) + "%")
      $("#mx-out3").text((Math.pow(x, 2) / y * 100).toFixed(2) + "%")
    })
  }
  
//---------------------------------------- Armor
  else if (pagename == "Armor") {
    $("#calc-table tr:last").after('<tr><td><input id="mx-calc" type="number" step="10" style="width:54px"></td><td><span id="mx-out1"></span></td><td><span id="mx-out2"></span></td></tr>')
    
    $("#mx-calc").on("input", function() {
      x = Number($("#mx-calc").val())
      x = 1 - x / (100 + Math.abs(x))
      x = Math.min(Math.max(x, 0.0001), 1.9999).toFixed(4)
      y = ((1 - x) * 100).toFixed(2)
      $("#mx-out1").text(y + "%")
      $("#mx-out2").text(x)
    })
  }
})

//---------------------------------------- Item tooltips
$(function() {
  // Update tooltip position
  $(".tooltip").mousemove(function() {
    var x = Math.min(event.clientX, windowWidthMax)

    $(".tooltip-block", this).css({
      "left": x + 10 + "px",
      "top": event.clientY + 20 + "px"
    })
  })
  
  windowWidthMax = $(window).width() - 555
  // Links' titles
  $(".notitle, .tooltip").find("a").attr("title", "")
})

//---------------------------------------- Lore page filter
$(function() {
  if (pagename == "Lore") {
    // filter()
    var filter = function() {
      var search = $("#search").val().toLowerCase()
      // Remove previous highlights
      $(".lore-highlight").contents().unwrap()
      
      if (search) {
        // Set URL "?s=" param to search value
        history.replaceState(null, "", "Lore?s=" + encodeURI(search))
        
        // Show matching entries & hide non-matching
        var c = 0
        $(".lore").each(function() {
          if ($(this).text().toLowerCase().includes(search)) {
            // Highlight matching text
            $(this).html($(this).html().replace(/<span class="mono">/g, String.fromCharCode(1)).replace(/<\/span>/g, String.fromCharCode(2)).replace(new RegExp("(" + search.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&") + ")", "gi"), '<span class="lore-highlight">$1</span>').replace(new RegExp(String.fromCharCode(1), "g"), '<span class="mono">').replace(new RegExp(String.fromCharCode(2), "g"), "</span>"))
            $(this).parent().show()
            c++
          }
          else
            $(this).parent().hide()
        })
        
        // Display results count
        $("#count").text("(" + c + " results)")
      }
      // Set everything back to default
      else {
        history.replaceState(null, "", "Lore")
        $(".lore").parent().show()
        $("#count").text("")
      }
    }

    // Create input & button
    $("#filter-hook").after('<br><br><input id="search" style="width:15em"> <button id="filter" style="width:4em">Filter</button> <span id="count" style="color:#808080"></span>')
    var total = $(".lore").length
    
    // Get URL "?s=" param & filter it
    var s = new URLSearchParams(location.search).get("s")
    if (s) {
      $("#search").val(decodeURI(s))
      filter()
    }
    
    // Bind events
    $("#filter").click(filter)
    $("#search").keyup(function(e) {
      if (e.keyCode == 13)
        filter()
    })
  }
})