$(function() { 
    Object.assign(window, {
    // Actividad que se actualiza sola
    AjaxRCRefreshText: 'Actividad automatizada',
    AjaxRCRefreshHoverText: 'Con la casilla marcada esta página se actualizará automáticamente',
    ajaxPages: [
        "Especial:CambiosRecientes",
        "Especial:WikiActivity",
        "Especial:PáginasNuevas",
        "Especial:Seguimiento"
    ],
    // Mostrar IP de anónimos para usuarios con ciertos permisos
    RevealAnonIP: {
        permissions: ['rollback', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
    }
});


mw.loader.using(['jquery.ui.tabs'], function() {
    $("[class^=portal_vtab]").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("[class^=portal_vtab] li").removeClass("ui-corner-top").addClass("ui-corner-left");

    var $tabs = $("#portal_slider").tabs({
        fx: {
            opacity: 'toggle',
            duration: 100
        }
    });
    $("[class*=portal_sliderlink]").click(function() { // bind click event to link
        $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
        console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
        return false;
    });
    $('#portal_next').click(function() {
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
        return false;
    });
    $('#portal_prev').click(function() { // bind click event to link
        $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
        return false;
    });
});
});

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // reduce modulo period if necessary
    if (timers[i].period > 0) {
        if (diff < 0) diff = timers[i].period - ((-diff) % timers[i].period);
        else diff = diff % timers[i].period;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' segundos';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutos ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' horas ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' días ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var ii in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate');
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var iii in timers) {
        var str = timers[i].firstChild.nodeValue;
        var j = str.indexOf('|');
        if (j == -1) timers[i].period = 0;
        else {
            timers[i].period = parseInt(str.substr(0, j));
            if (isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
            str = str.substr(j + 1);
        }
        timers[i].eventdate = new Date(str);
        updatetimer(i); //start it up
    }
}

addOnloadHook(checktimers);