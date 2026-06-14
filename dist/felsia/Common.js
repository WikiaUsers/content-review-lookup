/* ==========================================================================
   Avionics Flight Deck Instrumentation Controls
   ========================================================================== */
$(function() {
    // Only mount cockpit systems if they aren't already built
    if ($('#cockpit-primary-console').length === 0) {
        
        // 1. Create the Master Instrument Panel Housing
        var $consoleFrame = $('<div id="cockpit-primary-console"></div>');
        
        // 2. Build the Analog Gauge Matrix
        var $gaugeCluster = $('<div class="hud-gauge-cluster"></div>');
        var $radarGauge = $('<div class="hud-gauge radar-scope" title="Radar Sweep"><div class="radar-line"></div></div>');
        var $pitchGauge = $('<div class="hud-gauge horizon-indicator" title="Pitch Indicator"><div class="horizon-disc"></div></div>');
        
        $radarGauge.on('click', function() {
            $(this).toggleClass('gauge-overclock');
            triggerConsoleAlert("RADAR RANGE MODIFIED");
        });
        
        $pitchGauge.on('click', function() {
            $(this).toggleClass('horizon-tilt');
            triggerConsoleAlert("ATTITUDE RE-ALIGNED");
        });
        
        $gaugeCluster.append($radarGauge, $pitchGauge);

        // 3. Build the Hardware Toggle Switch Deck
        var $switchDeck = $('<div class="hud-switch-deck"></div>');
        var switches = [
            { id: 'hud-pwr', label: 'SYS PWR' },
            { id: 'hud-wpn', label: 'ARM WPN' },
            { id: 'hud-tac', label: 'TAC NET' }
        ];

        switches.forEach(function(sw) {
            var $toggle = $('<div class="cockpit-switch-wrapper"><div class="switch-label">' + sw.label + '</div><button class="cockpit-toggle" id="' + sw.id + '"><span class="switch-knob"></span></button></div>');
            
            $toggle.find('.cockpit-toggle').on('click', function() {
                $(this).toggleClass('switch-engaged');
                var isSet = $(this).hasClass('switch-engaged');
                
                // Trigger specific console feedback based on switch flipped
                if (sw.id === 'hud-pwr') {
                    $('#content').toggleClass('avionics-shutdown');
                    triggerConsoleAlert(isSet ? "SYSTEM POWER NOMINAL" : "CRITICAL WARNING: CRT SHUTDOWN");
                } else {
                    triggerConsoleAlert(sw.label + " " + (isSet ? "ENGAGED" : "DISENGAGED"));
                }
            });
            
            $switchDeck.append($toggle);
        });

        // 4. Assemble and Mount onto the Wiki Body Container
        $consoleFrame.append($gaugeCluster, $switchDeck);
        $('#content').prepend($consoleFrame);
    }

    // Helper function to update the live digital screen text
    function triggerConsoleAlert(message) {
        var $screen = $('.hud-digital-readout-screen');
        if ($screen.length) {
            $screen.text(">> " + message);
            $screen.addClass('screen-flash');
            setTimeout(function() { $screen.removeClass('screen-flash'); }, 200);
        }
    }
});

<script>
/* ATTITUDE INDICATOR */
function setAttitude(pitch, bank) {
  document.querySelector(".horizon").style.transform =
    `rotate(${bank}deg) translateY(${pitch}px)`;
}

/* ALTITUDE NEEDLE */
function setAltitude(feet) {
  const deg = (feet % 10000) / 10000 * 360;
  document.querySelector(".needle-alt").style.transform =
    `rotate(${deg}deg)`;
}

/* AIRSPEED NEEDLE */
function setAirspeed(knots) {
  const deg = (knots % 400) / 400 * 360;
  document.querySelector(".needle-speed").style.transform =
    `rotate(${deg}deg)`;
}

/* SWITCH */
function toggleSwitch(el) {
  const handle = el.querySelector(".switch-handle");
  const active = handle.classList.toggle("active");
  handle.style.transform = active ? "translateY(-20px)" : "translateY(0)";
}

/* KNOB */
function rotateKnob(el) {
  const dot = el.querySelector(".knob-dot");
  let current = parseInt(dot.dataset.rot || "0");
  current += 30;
  dot.dataset.rot = current;
  dot.style.transform = `rotate(${current}deg)`;
}

/* DEMO MOTION */
setInterval(() => {
  setAltitude(Math.random() * 10000);
  setAirspeed(Math.random() * 400);
  setAttitude((Math.random() * 40) - 20, (Math.random() * 60) - 30);
}, 1200);
</script>