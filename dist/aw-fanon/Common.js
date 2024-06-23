/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
 
window.tooltips_list = [
    {
        classname: 'link-tooltip',
        parse: '{'+'{<#tooltip#>|tt=<#tt#>|show=no}}',
    }
];

/* ------------------------------------------------- */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* MapsExtended global config */
window.mapsExtendedConfig = {
    "minimalLayout": true,
    "enableSidebar": true,
    "iconAnchor": "center",
    "enableSearch": true,
    "openPopupsOnHover": false,
    "useCustomPopups": true,
    "enableTooltips": true,
    "enableFullscreen": true,
    "fullscreenMode": "window",
    "mapControls": [
                    [],
                    [
                        "zoom",
                        "fullscreen"
                    ],
                    [
                        "edit"
                    ],
                    []
                ],
    "collectibleCategories": [""],
    "collectibleCheckboxStyle": "fandom",
    "sortMarkers": "category",
    "categoryGroups": [
        {
            "label": "The Interior",
            "children": [
                "interior_planets",
                "interior_moons",
                "interior_asteroids"
            ]
        },
        {
            "label": "Trailing Sectors",
            "children": [
                "trailing_sectors_planets",
                "trailing_sectors_moons",
                "trailing_sectors_asteroids"
            ]
        },
        {
            "label": "The Slice",
            "children": [
                "slice_planets",
                "slice_moons",
                "slice_asteroids"
            ]
        },
        {
            "label": "New Territories",
            "children": [
                "territories_planets",
                "territories_moons",
                "territories_asteroids"
            ]
        },
        {
            "label": "Western Reaches",
            "children": [
                "western_reaches_planets",
                "western_reaches_moons",
                "western_reaches_asteroids"
            ]
        },
        {
            "label": "Unknown Regions",
            "children": [
                "unknown_regions_planets",
                "unknown_regions_moons",
                "unknown_regions_asteroids"
            ]
        },
        {
            "label": "Others",
            "children": [
                "space_stations"
            ]
        }
    ]
};