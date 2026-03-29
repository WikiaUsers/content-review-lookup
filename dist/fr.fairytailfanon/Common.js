/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Corrige le décalage des graphiques ECharts dans les infobox collapsed
   oblige le resize après ouverture et 100ms de délai */
$(document).on('click', '.pi-header', function() {
  setTimeout(function() {
    if (window.echarts) {
      document.querySelectorAll('div').forEach(function(el) {
        let chart = echarts.getInstanceByDom(el);
        if (chart) {
          chart.resize();
        }
      });
    }
  }, 100);
});