/* Tout JavaScript présent ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

mw.loader.load('https://www.gstatic.com/charts/loader.js');

var data_niveau;

function drawChartNiveau() {
    
  if (data_niveau == null && typeof google !== null) {
    data_niveau = new google.visualization.arrayToDataTable([
      ['Niveau', 'XP (Total)', 'XP par niveau'],
      //[1, 0, 0], // pas besoin d'afficher ce niveau
      [2, 1500, 1500],
      [3, 3200, 1700],
      [4, 5200, 2000],
      [5, 7500, 2300]
    ]);
  }
  
  if(typeof google !== null) {
    var options = {
      series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
      },
      vAxes: {
        // Adds titles to each axis.
        0: {title: 'XP (Total)', minValue: 2},
        1: {title: 'XP par niveau', minValue: 2, scaleType: 'log', logscale: true}
      },
      hAxis: {title: 'Niveaux',  titleTextStyle: {color: '#333'}},
      'width':600,
      'height':400
    };
 
    var chart = new google.visualization.LineChart(document.getElementById  ('chart_niveau'));
    chart.draw(data_niveau, options);
  }
}

$(function() /* équivalent de document.Ready */ { 

  if ($('#total_building').length) /* si notre balise est présente */ {
    /* on la remplace avec un input de type nombre */
    $("#total_building").replaceWith("<input type='number' maxlength='3' size='3' min='0' max='999' id='total_building'   value='5'>");
    
    /* si la valeur de l'input change */
    $("#total_building").change(function()
    {
      var total = 5000; /* valeur par défaut */
      var max = $("#total_building").val(); /* le numéro de valeur souhaité  */
      for(i = 1; i <= max; i++)
      {
        total += Math.pow(2,(i - 1)) * 1000;
      }
      
      /* on affiche le résultat */
      $("#construction_cost_result").text(total.toLocaleString());
    });
  }
    
  if ($('#total_title').length) /* si notre balise est présente */ {
    /* on la remplace avec un input de type nombre */
    $("#total_title").replaceWith("<input type='number' maxlength='3' size='3' min='5' max='999' id='total_title' value  ='7'>");
    
    /* si la valeur de l'input change */
    $("#total_title").change(function()
    {
      var total = 50000; /* valeur par défaut */
      var max = $("#total_title").val() - 5; /* le numéro de valeur souhaité  */
      for(i = 1; i <= max; i++)
      {
      total += Math.pow(2,(i - 1)) * 10000;
      }
      
      /* on affiche le résultat */
      $("#title_cost_result").text(total.toLocaleString());
    });
  }
  
  
  if ($('#niveau').length) /* si notre balise est présente */ {
    var xp_total = [0, 0, 1500, 3200, 5200, 7500]; /* les valeurs fixes par défaut, double 0 au début */
    
    /* on la remplace avec un input de type nombre */
    $("#niveau").replaceWith("<input type='number' maxlength='3' size='3' min='1' max='999' id='niveau' value='5'>");
    
    /* si la valeur de l'input change */
    $("#niveau").change(function()
    {
      var niveau = $("#niveau").val(); /* le niveau souhaité */
      
      if (niveau < 1 || niveau > 999) /* au cas ou */
      {
        $("#xp_total" ).text(xp_total[1]);
        $("#xp_needed").text(xp_total[1]);
      }
      else /* notre formule */
      {
        /* calcul les niveaux   intermédiaires jusqu'au niveau souhaité uniquement s'ils nont jamais été   calculés */
        for (i = xp_total.length; i <= niveau; i++)
        {
          xp_total[i] = (xp_total[i - 5] / 100 + Math.round(100 * Math.pow(2,(i - 6  )/5))) * 100;
          if(typeof google !== null)
          {
            data_niveau.addRow([i, xp_total[i], (xp_total[i] - xp_total[i - 1])]);
          }
        }
        
        /* on affiche le résultat */
        $("#xp_total" ).text(xp_total[niveau].toLocaleString());
        $("#xp_needed").text((xp_total[niveau] - xp_total[niveau - 1]).toLocaleString());
        
        drawChartNiveau(); // maj du graphique
      }
    });
  }
  
  if ($('#chart_niveau').length) /* si notre balise est présente */ {
    var show_lvl_graph = false;
    
    $('#chart_niveau').before( "<button id='show_hide_lvl_graph'> Afficher/Cacher le graphique des Niveaux</button>" );
    
    $("#show_hide_lvl_graph").click(function()
    {
      show_lvl_graph = !show_lvl_graph;
      
      if(typeof google !== null)
      {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChartNiveau);
      }
      
      if (show_lvl_graph == true)
      {
        $('#chart_niveau').show("fast");
      }
      else
      {
        $('#chart_niveau').hide("fast");
      }
    }); 
  }
});