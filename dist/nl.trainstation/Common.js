/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

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
];
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

/* =========================================================================
     GLOBAL RESOURCE CALCULATOR ENGINE (DATA-DRIVEN)
    ========================================================================= */
function triggerTSCalculator() {
    // Failsafe check: Fetch personal progress variables from the logged-in user page.
    // Falls back seamlessly to 100% false (gross prices) for guests or users without a setup.
    var TS_Bonuses = { sam: false, alan: false, cornelius: false, exchange: false };
    
    if (typeof window.TS_Personal_Bonuses !== 'undefined') {
        TS_Bonuses = window.TS_Personal_Bonuses;
    }

    var wikiLang = mw.config.get('wgContentLanguage') || 'nl';
    var numberSeparator = (wikiLang === 'nl') ? '.' : ',';

    // Dit zijn de standaard multipliers op basis van de persoonlijke instellingen van de gebruiker
    var multipliers = {
        bld:  TS_Bonuses.sam       ? 0.85 : 1.00, // Sam Discount (-15%)
        myst: TS_Bonuses.alan      ? 0.90 : 1.00, // Alan Discount (-10%)
        flg:  TS_Bonuses.cornelius ? 0.75 : 1.00, // Cornelius Discount (-25%)
        thm:  TS_Bonuses.exchange  ? 0.80 : 1.00, // Theme input (Stock Exchange -20%)
        ext:  TS_Bonuses.exchange  ? 0.80 : 1.00, // Extension input (Stock Exchange -20%)
        none: 1.00                                // Force 100% gross prices (Contractors)
    };

    // NIEUW: Dit zijn de vaste kortingen die we ALTIJD gebruiken als de parameter is geforceerd
    var forcedMultipliers = {
        bld:  0.85,
        myst: 0.90,
        flg:  0.75,
        thm:  0.80,
        ext:  0.80,
        none: 1.00
    };

    function formatNumber(num, sep) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }

    // Always clear the compact discbadge wrapper to prevent double badges on AJAX page updates
    $('.discbadge').empty();
    
    var activeHoverText = ""; // Failsafe scope storage for the single header tooltip

    // Scan the DOM for all resource spans generated server-side by the Lua module
    $('.ts-data').each(function() {
        var $this = $(this);
        var dtype = $this.attr('data-type');
        var baseValue = parseFloat(/\d+/.exec($this.attr('data-base')));
        
        // Controleer of de Lua-module heeft aangegeven dat de parameter gebruikt is
        var isForced = $this.attr('data-force') === 'true';

        // Bepaal welke multiplier we gebruiken: de geforceerde óf de persoonlijke
        var currentMultiplier = isForced ? forcedMultipliers[dtype] : multipliers[dtype];

        if (!isNaN(baseValue) && currentMultiplier) {
            var calculatedValue = Math.round(baseValue * currentMultiplier);
            
            // Overwrite purely the text node to maintain perfect visual table alignment
            $this.text(formatNumber(calculatedValue, numberSeparator));

            // FIXED: Removed hardcoded fallback strings. Pulls strictly from the server attribute!
            if (currentMultiplier < 1.00 && activeHoverText === "") {
                activeHoverText = $this.attr('data-title') || "";
            }
        }
    });

    // Inject the [!] badge exactly ONCE outside the loop if a server tooltip was found!
    if (activeHoverText !== "") {
        $('.discbadge').html('<span class="ts-bonus-label" title="' + mw.html.escape(activeHoverText) + '">[!]</span>');
    }
}

// Executes instantly on standard DOM ready and handles asynchronous page updates
$(document).ready(function() {
    triggerTSCalculator();
});
mw.hook('wikipage.content').add(function() {
    triggerTSCalculator();
});