// Level scaling elements in Template:NPC infobox
// Based off of https://warframe.fandom.com/wiki/MediaWiki:EnemyInfoboxSlider.js
// Adjusted to work under ES2 on fandom
$(function() {
  // -------- Add style for slider elements -------------
  // We need to do this because the custom css files for
  // infoboxes do not allow for pseudo browser specific
  // style declarations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = '#npc-infobox .level-slider-container input::-webkit-slider-thumb {'+
                              'appearance: none;'+
                              'width: 9px;'+
                              'height: 9px;'+
                              'transform: scale(1.4);'+
                              'rotate: 45deg;'+
                              'background: #ffffff;'+
                              'cursor: pointer; }'+
                            '#npc-infobox .level-slider-container input::-moz-range-thumb {'+
                              'appearance: none;'+
                              'width: 10px;'+
                              'height: 10px;'+
                              'background-color: #ffffff;'+
                              'border-radius: 0;'+
                              'border: 1px solid #fff;'+
                              'rotate: 45deg;'+
                              'cursor: grab;}';
  document.head.appendChild(styleSheet);
  
  // ------------- Actual functionality -----------------
  
  // Get the main elements for interaction
  var infobox = $("aside.portable-infobox");
  var slider = $("#npc-level-slider");
  var eliteDiv = $("#npc-elite");
  var difficultyDiv = $("#npc-difficulty");
  
  if (slider.length) {

    // Create object from slider element
    slider.npcInfoboxScaler = {};
    var scaler = slider.npcInfoboxScaler;
    
    // Find, store and initialize all stat elements into the scaler object
    scaler.init = function () {
      
      // Npc level element, should empty
      this.level = $("#header-level"); 
      
      // Base value for scaling      
      this.npcStatVals = $(infobox).find("[id^=npc-stat-val-]");
      this.baseStats = [];
      for (i = 0; i < this.npcStatVals.length; i++) {
        this.baseStats.push(parseFloat(this.npcStatVals.eq(i).html(), 10));
      }  
      
      // Check if the enemy is elite, if not, hide the option
      this.canBeElite = $(".can-be-elite").length != 0;
      if (!this.canBeElite) {
          $("[data-item-name='scaling-tier']").addClass("stats-hidden");
      }
      
      // Faction dependant elite scaling
      var factionName = $("[data-item-name='factionname'] div").html()
      this.factionFactor = 1.8
      if (factionName == "Okkar" || factionName == "Okkar Prime" || factionName == "Redeemer") {
        this.factionFactor = 1.6
      }
      
      // Show scaling elements hidden by default
      $("#header-level-container").removeClass("stats-hidden");
      $("[data-item-name='levelScaling']").removeClass("stats-hidden");
    };

    // Level scaling calculation
    // (base_value + ((level-1)^3 * base_value * 0.04)) * difficulty_factor * elite_factor = new value
    scaler.calc = function (baseValue, level, difficultyFactor, eliteFactor) {
      return (baseValue + (Math.pow(level-1, 3) * baseValue * 0.004)) * difficultyFactor * eliteFactor
    };
    
    // When slider is updated, use stat element arrays and base values to change innerHTML of stat elements based on unique scaling info	above
    scaler.update = function () {
      //get input value
      var currentLevel = +$("#level-slider").val();
      var difficultyFactor = +$("input[name='difficulty-group']:checked").val();
      var isElite = $("input[name='elite-group']:checked").val() == "elite"
      
      // Show or hide the elite badge
      var eliteFactor = isElite? this.factionFactor : 1.0
      if (this.canBeElite && isElite) {
        $("#header-elite-container").removeClass("stats-hidden");
      }
      else {
        $("#header-elite-container").addClass("stats-hidden");
      }
      
      // Calculate and set the scaled values
      for (i = 0; i < this.npcStatVals.length; i++) {
        var value = Math.floor(this.calc(this.baseStats[i], currentLevel, difficultyFactor, eliteFactor))
        if (value > 10000) {
          value = (value / 1000).toFixed(1) + 'k';
        }
        this.npcStatVals.eq(i).html(value)
      } 
      this.level.html(currentLevel); //update displayed level
    }
    
    // Update the value of the slider with the entered value of the number input
    // limits the value to max >= value >= min.
    scaler.updateSliderFromInput = function(input, range, min, max) {
      // Only accept numbers as input
      if (isNaN(input.value)) {
        input.value = range.value;
        return;
      }
      
      // Limit to min/max values
      if (input.value < min) {
        input.value = min;
      }
      else if (input.value> max) {
        input.value = max;
      }
      
      range.value = input.value;
      slider.npcInfoboxScaler.update();
      range.updateTrack();
    }
    
    // Create input range element (slider) with display of min level (1) on the left and max level (30) on the right
    slider.html(
      "<div>1</div>"+
      "<div class='level-slider-container'>"+
        "<input type='range' min='1' max='30' value='1' name ='level-slider' id='level-slider'/>"+
      "</div>"+
      "<div>30</div>"+
      "<input type='text' class='pi-range-number-input' min='1' max='30' value='1' id='level-input'/>"
    );
    
    eliteDiv.html(
      "<div class='pi-group' data-item-name='levelscaling'>" +
        "<input type='radio' name='elite-group' id='elite_normal' value='normal' checked/>" +
        "<label for='elite_normal'>" +
          "<span>Normal</span>" +
        "</label>" +
        "<input type='radio' name='elite-group' id='elite' value='elite'/>" +
        "<label for='elite'>" +
          "<span class='tooltip' title='Hitpoints are increased by 60% - 80%'>"+
            "<img class='elite-icon' alt='Elite' src='https://static.wikia.nocookie.net/everspace_gamepedia/images/4/4a/ES2-Icon-EliteSkull.png' width='16' height='16'>"+
            "Elite"+
          "</span>" +
        "</label>" +
      "</div>"
    );
    
    difficultyDiv.html(
      "<div class='pi-group' data-item-name='levelscaling'>" +
        "<input type='radio' name='difficulty-group' id='veryeasy' value='0.3'/>" +
        "<label for='veryeasy'>" +
          "<span class='tooltip' title='Hitpoints are at 30%'>Very Easy</span>" +
        "</label>" +
        "<input type='radio' name='difficulty-group' id='easy' value='0.7'/>" +
        "<label for='easy'>" +
          "<span class='tooltip' title='Hitpoints are at 70%'>Easy</span>" +
        "</label>" +
        "<input type='radio' name='difficulty-group' id='normal' value='1.0' checked/>" +
        "<label for='normal'>" +
          "<span class='tooltip' title='Hitpoints are at 100%'>Normal</span>" +
        "</label>" +
        "<input type='radio' name='difficulty-group' id='hard' value='1.5'/>" +
        "<label for='hard'>" +
          "<span class='tooltip' title='Hitpoints are at 150%'>Hard</span>" +
        "</label>" +
        "<input type='radio' name='difficulty-group' id='veryhard' value='2.0'/>" +
        "<label for='veryhard'>" +
          "<span class='tooltip' title='Hitpoints are at 200%'>Very Hard</span>" +
        "</label>" +
        "<input type='radio' name='difficulty-group' id='nightmare' value='3.45'/>" +
        "<label for='nightmare'>" +
          "<span class='tooltip' title='Hitpoints are at 345%'>Nightmare</span>" +
        "</label>" +
      "</div>"
    );
    
    // -------- Event listener for input changes --------
    
    $("#level-slider").on("input", function () {
      document.getElementById("level-input").value = document.getElementById("level-slider").value
      slider.npcInfoboxScaler.update();
    });
    
    $("#level-input").on("change", function () {
      var input = document.getElementById("level-input");
      var range = document.getElementById("level-slider");
      slider.npcInfoboxScaler.updateSliderFromInput(input, range, 1, 30);
      slider.npcInfoboxScaler.update();
    });
    
    $("input[type='radio']").change(function () {
      slider.npcInfoboxScaler.update();
    });
    
    // Drawing effect of filled slider bar
    document.querySelectorAll(".level-slider-container").forEach(function(ctrl) {
      var range = ctrl.querySelector('input');        
      var newPoint, newPlace, offset;
      
      // Method to update the track from external inputs
      range.updateTrack = function(){
        // colorize step options
        ctrl.querySelectorAll("option").forEach(function(opt) {
          opt.style.backgroundColor = (opt.value <= range.valueAsNumber)? '#FFF' : '#666';
        });
        
        // colorize before and after
        var valPercent = (range.valueAsNumber  - parseInt(range.min)) / (parseInt(range.max) - parseInt(range.min));            
        var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop('+
          valPercent + ', #FFFA), color-stop(' +
          valPercent + ', #555));';
        range.style = style;
      }
            
      range.oninput = function(){
        range.updateTrack();
      };
      
      range.oninput();    
    });
    
    //initialize the scaler
    scaler.init();
    
    //update the scaler initially
    scaler.update();
  }
});