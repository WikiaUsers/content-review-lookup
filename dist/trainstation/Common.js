/* Any JavaScript here will be loaded for all users on every page load. */

/* Allow direct link to Tabber */
 
tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ').replace('%20', ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      delete currentTabber;
    }
  }
};

window.tooltips_list = [
    {
        classname: 'info-tooltip',
        parse: '{'+'{InfoTip|<#info#>|<#type#>}}',
    },
]

/**
 * Automatically highlight the highest value in the "Ratio" column.
 * Target tables must have the class "highlight-highest".
 */
$(".highlight-highest").each(function() {
    var $table = $(this);
    
    // Ratio is the 5th column (index 4)
    var ratioColumnIndex = 4; 
    
    var maxVal = -Infinity;
    var $maxCell = null;

    // Loop through each row that contains data (td)
    $table.find("tr").each(function() {
        var $cell = $(this).find("td").eq(ratioColumnIndex);
        
        if ($cell.length) {
            // Remove any non-numeric characters except the decimal point
            var valText = $cell.text().trim().replace(/[^0-9.]/g, '');
            var val = parseFloat(valText);
            
            if (!isNaN(val) && val > maxVal) {
                maxVal = val;
                $maxCell = $cell;
            }
        }
    });

    // Apply the highlight style
    if ($maxCell) {
        $maxCell.css({
            "background-color": "#ccffcc", // Light green
            "color": "#000",               // Ensure text is black/readable
            "font-weight": "bold",
            "border": "2px solid #2ecc71"
        });
    }
});